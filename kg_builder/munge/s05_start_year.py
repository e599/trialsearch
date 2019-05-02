import os
import shutil
import pandas as pd

from kg_builder.ctxml.writers import get_uuid
from kg_builder.munge.str2date import str2date

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_02
from kg_builder.util.kg_path import munge_stage_04
from kg_builder.util.kg_path import munge_stage_05

from kg_builder.util.kg_path import clinical_trial_filename
from kg_builder.util.kg_path import year_filename
from kg_builder.util.kg_path import relationships_filename

munge_dest_stage_path = os.path.join(project_path, munge_stage_05)


def process_data():
    """Master function that executes the module."""
    convert_start_date_to_start_year()
    create_clinical_trial_to_start_year_relationships()


def get_start_year(row):
    """Gets the start year from the start_date attribute."""
    try:
        return str2date(row["start_date"])
    except IndexError:
        return -1
    except ValueError:
        return -1


def get_year_id(row):
    """Gets the ID for the Year node."""
    try:
        return get_uuid(str(row["year"]))
    except IndexError:
        return None
    except ValueError:
        return None


def convert_start_date_to_start_year():
    """Creates a start_year attribute in the CT node data."""

    # Fetches CT data with its original start_dates.
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_02
        + "/"
        + munge_stage_02
        + "_"
        + clinical_trial_filename,
        dtype=object,
    )

    # Prevents pandas from balking at unprocessable date values.
    values = {"start_date": "January 1, -1"}
    df = df.fillna(value=values)

    # Get start_year for all CT nodes.
    df["start_year"] = df.apply(get_start_year, axis=1)
    df["start_year"] = df["start_year"].astype(int)

    # Removes the temporary dummy dates/years
    # as they've now served their purpose.
    df.loc[df.start_year == -1, "start_date"] = None
    df.loc[df.start_year == -1, "start_year"] = None

    # Re-exports CT nodes, now with start_year.
    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + clinical_trial_filename,
        index=False,
    )


def create_clinical_trial_to_start_year_relationships():
    """Creates Year enum nodes and CT relationships to them."""

    # Fetches CT data, now with start_year.
    df_ct = pd.read_csv(
        project_path
        + "/"
        + munge_stage_05
        + "/"
        + munge_stage_05
        + "_"
        + clinical_trial_filename,
    )

    # Creates and exports the Year nodes (and only the ones that apply to the CT data).
    df_year = pd.DataFrame(df_ct["start_year"].unique())
    df_year = df_year.dropna()
    df_year.columns = ["year"]
    df_year["year"] = df_year["year"].astype(int)
    df_year["new_id:ID"] = df_year.apply(get_year_id, axis=1)
    df_year[":LABEL"] = "Year"
    df_year = df_year.reindex(columns=["new_id:ID", "year", ":LABEL"])
    df_year = df_year.sort_values(by=["year"])
    df_year.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + year_filename,
        index=False,
    )

    # Creates the CT to Year relationships.
    df_ct = df_ct.reindex(columns=["new_id:ID", "start_year"])
    df_ct = df_ct.rename(index=str, columns={"new_id:ID": ":START_ID"})
    df_year = df_year.rename(index=str, columns={"new_id:ID": ":END_ID", "year": "start_year"})
    df_ct_to_start_year = pd.merge(
        df_ct,
        df_year,
        on="start_year",
        how="inner",
    )
    df_ct_to_start_year[":TYPE"] = "HAS_START_YEAR"
    df_ct_to_start_year = df_ct_to_start_year.reindex(columns=[":START_ID", ":END_ID", ":TYPE"])

    # Makes a copy of the raw relationships file for appending to.
    shutil.copyfile(
        project_path
        + "/"
        + munge_stage_04
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + relationships_filename,
    )

    # Appends the new relationships to the relationships file
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + relationships_filename,
        "a",
    )
    df_ct_to_start_year.to_csv(f, header=False, index=False)
    f.close()
