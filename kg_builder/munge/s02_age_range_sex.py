import os
import shutil
import pandas as pd

from kg_builder.ctxml.writers import get_uuid

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_02

from kg_builder.util.kg_path import clinical_trial_filename
from kg_builder.util.kg_path import age_range_filename
from kg_builder.util.kg_path import sex_filename
from kg_builder.util.kg_path import relationships_filename

munge_dest_stage_path = os.path.join(project_path, munge_stage_02)


def process_data():
    """Master function that executes the module."""
    convert_age_strings_to_numbers()
    create_clinical_trial_to_age_range_relationships()
    create_clinical_trial_to_sex_relationships()


def get_minimum_age(row):
    """Gets number age from minimum_age attribute."""
    try:
        age = float(row["minimum_age"].split()[0])
        if "month" in row["minimum_age"].lower():
            age = age / 12.0
        return age
    except IndexError:
        return None
    except ValueError:
        return None


def get_maximum_age(row):
    """Gets number age from maximum_age attribute."""
    try:
        age = float(row["maximum_age"].split()[0])
        if "month" in row["maximum_age"].lower():
            age = age / 12.0
        return age
    except IndexError:
        return None
    except ValueError:
        return None


def convert_age_strings_to_numbers():
    """Converts min/max age strings to numbers."""

    # Fetches CT data with its original min/max age strings.
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_01
        + "/"
        + munge_stage_01
        + "_"
        + clinical_trial_filename,
        dtype=object,
    )
    values = {"minimum_age": "0 Years", "maximum_age": "1000 Years"}
    df = df.fillna(value=values)

    # Replaces the age strings with numbers (in years).
    df["minimum_age"] = df.apply(get_minimum_age, axis=1)
    df["maximum_age"] = df.apply(get_maximum_age, axis=1)

    # Re-exports the CT nodes, now with numbers for min/max ages.
    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + clinical_trial_filename,
        index=False,
    )


def is_child(row):
    """Returns boolean of Child AgeRange enum node applicability."""
    return row["maximum_age"] >= 0 and row["minimum_age"] <= 17


def is_adult(row):
    """Returns boolean of Adult AgeRange enum node applicability."""
    return row["maximum_age"] >= 18 and row["minimum_age"] <= 64


def is_older_adult(row):
    """Returns boolean of OlderAdult AgeRange enum node applicability."""
    return row["maximum_age"] >= 65 and row["minimum_age"] <= 1000


def create_clinical_trial_to_age_range_relationships():
    """Creates AgeRange enum nodes and CT relationships to them."""

    # Fetches CT data with min/max ages (that are now numbers rather than strings).
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_02
        + "/"
        + munge_stage_02
        + "_"
        + clinical_trial_filename,
    )

    # Creates and fetches the Child, Adult, OlderAdult IDs.
    df_child_id = get_uuid("Child")
    df_adult_id = get_uuid("Adult")
    df_older_adult_id = get_uuid("Older Adult")

    # Creates and exports the AgeRange enum nodes.
    df_age_range = pd.DataFrame.from_dict({
        "new_id:ID": [df_child_id, df_adult_id, df_older_adult_id],
        "age_range": ["Child", "Adult", "Older Adult"],
        ":LABEL": "AgeRange",
    })
    df_age_range = df_age_range.sort_values(by=["age_range"])
    df_age_range.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + age_range_filename,
        index=False,
    )

    # Gets a df with the numerical ages for all CT IDs.
    df_age_range = pd.DataFrame(df, columns=["new_id:ID", "minimum_age", "maximum_age"])

    # Gets boolean values for all AgeRange nodes for all CT IDs
    df_age_range["is_child"] = df.apply(is_child, axis=1)
    df_age_range["is_adult"] = df.apply(is_adult, axis=1)
    df_age_range["is_older_adult"] = df.apply(is_older_adult, axis=1)

    # Creates (for the applicable CT IDs) relationships
    # from each CT node to the Child AgeRange node.
    df_is_child = df_age_range[df_age_range.is_child]
    df_is_child = pd.DataFrame(df_is_child, columns=["new_id:ID"])
    df_is_child = df_is_child.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_is_child[":END_ID"] = df_child_id
    df_is_child[":TYPE"] = "HAS_INCLUSION_CRITERION"

    # Creates (for the applicable CT IDs) relationships
    # from each CT node to the Adult AgeRange node.
    df_is_adult = df_age_range[df_age_range.is_adult]
    df_is_adult = pd.DataFrame(df_is_adult, columns=["new_id:ID"])
    df_is_adult = df_is_adult.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_is_adult[":END_ID"] = df_adult_id
    df_is_adult[":TYPE"] = "HAS_INCLUSION_CRITERION"

    # Creates (for the applicable CT IDs) relationships
    # from each CT node to the OlderAdult AgeRange node.
    df_is_older_adult = df_age_range[df_age_range.is_older_adult]
    df_is_older_adult = pd.DataFrame(df_is_older_adult, columns=["new_id:ID"])
    df_is_older_adult = df_is_older_adult.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_is_older_adult[":END_ID"] = df_older_adult_id
    df_is_older_adult[":TYPE"] = "HAS_INCLUSION_CRITERION"

    # Makes a copy of the raw relationships file for appending to.
    shutil.copyfile(
        project_path
        + "/"
        + munge_stage_01
        + "/"
        + munge_stage_01
        + "_"
        + relationships_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + relationships_filename,
    )

    # Appends the new relationships to the relationships file.
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + relationships_filename,
        "a",
    )
    df_is_child.to_csv(f, header=False, index=False)
    df_is_adult.to_csv(f, header=False, index=False)
    df_is_older_adult.to_csv(f, header=False, index=False)
    f.close()


def create_clinical_trial_to_sex_relationships():
    """Creates Sex enum nodes and CT relationships to them."""

    # Fetches CT data with its original gender enum values (All, Female, Male).
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_02
        + "/"
        + munge_stage_02
        + "_"
        + clinical_trial_filename,
    )
    df = pd.DataFrame(df, columns=["new_id:ID", "gender"])

    # Sets aside the "Female" and "Male" CTs.
    df_female_or_male = df[df.gender.isin(["Female", "Male"])]

    # Creates two copies of the "All" CTs: one set to "Female", one set to "Male".
    df_all = df[df.gender == "All"]
    df_all_to_female = df_all.replace({"gender": {"All": "Female"}})
    df_all_to_male = df_all.replace({"gender": {"All": "Male"}})

    # Unions the original Male and Female CT new_id:IDs
    # with the new Male and Female CT new_id:IDs replacing the "All" IDs.
    df = pd.concat([df_female_or_male, df_all_to_female, df_all_to_male])

    # Creates and fetches the Male and Female IDs.
    df_male_id = get_uuid("Male")
    df_female_id = get_uuid("Female")

    # Creates and exports the Sex enum nodes.
    df_sex = pd.DataFrame.from_dict(
        {"new_id:ID": [df_female_id, df_male_id], "gender": ["Female", "Male"], ":LABEL": "Sex"}
    )
    df_sex = df_sex.sort_values(by=["gender"])
    df_sex.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + sex_filename,
        index=False,
    )

    # Renames the CT new_id:ID and Sex value columns
    # to the column names used by the relationships file.
    df = df.rename(index=str, columns={"new_id:ID": ":START_ID", "gender": ":END_ID"})

    # Replaces the Sex values with their IDs.
    df = df.replace({":END_ID": {"Female": df_female_id, "Male": df_male_id}})

    # Adds the 3rd and last column needed for relationships
    # and populate it with the one for ClinicalTrial to Sex.
    df[":TYPE"] = "HAS_INCLUSION_CRITERION"

    # Appends the new relationships to the relationships file.
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + relationships_filename,
        "a",
    )
    df.to_csv(f, header=False, index=False)
    f.close()
