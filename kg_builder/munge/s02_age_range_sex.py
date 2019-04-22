import os
import shutil
import pandas as pd

from kg_builder.kg_path import project_path
from kg_builder.kg_path import munge_stage_01
from kg_builder.kg_path import munge_stage_02
from kg_builder.ctxml.writers import get_uuid

munge_dest_stage_path = os.path.join(project_path, munge_stage_02)

clinical_trial_filename = "node_clinical_trial.csv"
age_range_filename = "node_age_range.csv"
sex_filename = "node_sex.csv"

relationship_filename = "relationship_all.csv"


def process_data():
    convert_age_strings_to_numbers()
    create_clinical_trial_to_sex_relationships()
    create_clinical_trial_to_age_range_relationships()


def get_minimum_age(row):
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

    # Fetch CT ids with min/max age values from XML
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
    # df = pd.DataFrame(df, columns=["new_id:ID", "minimum_age", "maximum_age"])
    values = {"minimum_age": "0 Years", "maximum_age": "1000 Years"}
    df = df.fillna(value=values)

    df["minimum_age"] = df.apply(get_minimum_age, axis=1)
    df["maximum_age"] = df.apply(get_maximum_age, axis=1)

    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + clinical_trial_filename,
        index=False,
    )


def is_child(row):
    return row["maximum_age"] >= 0 and row["minimum_age"] <= 17


def is_adult(row):
    return row["maximum_age"] >= 18 and row["minimum_age"] <= 64


def is_older_adult(row):
    return row["maximum_age"] >= 65 and row["minimum_age"] <= 1000


def create_clinical_trial_to_age_range_relationships():

    # Fetch CT ids with min/max age values from XML
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_02
        + "/"
        + munge_stage_02
        + "_"
        + clinical_trial_filename,
    )

    # Fetch the Child, Adult, OlderAdult ids
    df_child_id = get_uuid("Child")
    df_adult_id = get_uuid("Adult")
    df_older_adult_id = get_uuid("Older Adult")

    # Create the AgeRange node
    df_age_range = pd.DataFrame.from_dict({
        "new_id:ID": [df_child_id, df_adult_id, df_older_adult_id],
        "age_range": ["Child", "Adult", "Older Adult"],
        ":LABEL": "AgeRange",
    })
    df_age_range.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + age_range_filename,
        index=False,
    )

    # Get df with numerical ages for all CT ids
    df_age_range = pd.DataFrame(df, columns=["new_id:ID", "minimum_age", "maximum_age"])

    # Get boolean values for all AgeRange nodes for all CT ids
    df_age_range["is_child"] = df.apply(is_child, axis=1)
    df_age_range["is_adult"] = df.apply(is_adult, axis=1)
    df_age_range["is_older_adult"] = df.apply(is_older_adult, axis=1)

    df_is_child = df_age_range[df_age_range.is_child]
    df_is_child = pd.DataFrame(df_is_child, columns=["new_id:ID"])

    df_is_child = df_is_child.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_is_child[":END_ID"] = df_child_id
    df_is_child[":TYPE"] = "HAS_INCLUSION_CRITERION"

    df_is_adult = df_age_range[df_age_range.is_adult]
    df_is_adult = pd.DataFrame(df_is_adult, columns=["new_id:ID"])

    df_is_adult = df_is_adult.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_is_adult[":END_ID"] = df_adult_id
    df_is_adult[":TYPE"] = "HAS_INCLUSION_CRITERION"

    df_is_older_adult = df_age_range[df_age_range.is_older_adult]
    df_is_older_adult = pd.DataFrame(df_is_older_adult, columns=["new_id:ID"])

    df_is_older_adult = df_is_older_adult.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_is_older_adult[":END_ID"] = df_older_adult_id
    df_is_older_adult[":TYPE"] = "HAS_INCLUSION_CRITERION"

    # Append relationships to relationship file
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + relationship_filename,
        "a",
    )
    df_is_child.to_csv(f, header=False, index=False)
    df_is_adult.to_csv(f, header=False, index=False)
    df_is_older_adult.to_csv(f, header=False, index=False)
    f.close()


def create_clinical_trial_to_sex_relationships():

    # Fetch CT IDs with gender enum values from XML (All, Female, Male)
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

    # Set aside the "Female" and "Male" CTs
    df_female_or_male = df[df.gender.isin(["Female", "Male"])]

    # Create two copies of the "All" CTs: one set to "Female", one set to "Male"
    df_all = df[df.gender == "All"]
    df_all_to_female = df_all.replace({"gender": {"All": "Female"}})
    df_all_to_male = df_all.replace({"gender": {"All": "Male"}})

    # Union the original Male and Female CT new_id:IDs
    # with the new Male and Female CT new_id:IDs replacing the "All" ids
    df = pd.concat([df_female_or_male, df_all_to_female, df_all_to_male])

    # Fetch the Male and Female ids
    df_male_id = get_uuid("Male")
    df_female_id = get_uuid("Female")

    # Create the Sex node
    df_sex = pd.DataFrame.from_dict(
        {"new_id:ID": [df_female_id, df_male_id], "gender": ["Female", "Male"], ":LABEL": "Sex"}
    )
    df_sex.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + sex_filename,
        index=False,
    )

    # Rename the CT new_id:ID and Sex value columns
    # to the start/end id column names used by the relationship file
    df = df.rename(index=str, columns={"new_id:ID": ":START_ID", "gender": ":END_ID"})

    # Replace the Sex values with their ids
    df = df.replace({":END_ID": {"Female": df_female_id, "Male": df_male_id}})

    # Add the 3rd and last column needed for relationships
    # and populate it with the one for ClinicalTrial to Sex
    df[":TYPE"] = "HAS_INCLUSION_CRITERION"

    # Make copy of raw relationship file for appending to
    shutil.copyfile(
        project_path
        + "/"
        + munge_stage_01
        + "/"
        + munge_stage_01
        + "_"
        + relationship_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + relationship_filename,
    )

    # Append relationships to relationship file
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_02
        + "_"
        + relationship_filename,
        "a",
    )
    df.to_csv(f, header=False, index=False)
    f.close()
