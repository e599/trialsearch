import os
import shutil
import pandas as pd

from kg_builder.kg_path import project_path
from kg_builder.kg_path import munge_stage_02
from kg_builder.kg_path import munge_stage_04
from kg_builder.kg_path import munge_stage_05
from kg_builder.ctxml.writers import get_uuid
from kg_builder.munge.str2date import str2date

munge_dest_stage_path = os.path.join(project_path, munge_stage_05)

clinical_trial_filename = "node_clinical_trial.csv"
year_filename = "node_year.csv"

relationship_filename = "relationship_all.csv"


def process_data():
    convert_start_date_to_start_year()
    create_clinical_trial_to_start_year_relationships()


def get_start_year(row):
    try:
        return str2date(row["start_date"])
    except IndexError:
        return -1
    except ValueError:
        return -1


def get_year_id(row):
    try:
        return get_uuid(str(row["year"]))
    except IndexError:
        return None
    except ValueError:
        return None


def convert_start_date_to_start_year():

    # Fetch CT ids with start_dates from XML
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
    values = {"start_date": "January 1, -1"}
    df = df.fillna(value=values)

    df["start_year"] = df.apply(get_start_year, axis=1)
    df["start_year"] = df["start_year"].astype(int)
    df.loc[df.start_year == -1, "start_date"] = None
    df.loc[df.start_year == -1, "start_year"] = None

    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + clinical_trial_filename,
        index=False,
    )


def create_clinical_trial_to_start_year_relationships():

    # Fetch CT ids with start_years from XML
    df_ct = pd.read_csv(
        project_path
        + "/"
        + munge_stage_05
        + "/"
        + munge_stage_05
        + "_"
        + clinical_trial_filename,
    )

    # Create the Year node
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

    # Make copy of raw relationship file for appending to
    shutil.copyfile(
        project_path
        + "/"
        + munge_stage_04
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + relationship_filename,
    )

    # Append relationships to relationship file
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_05
        + "_"
        + relationship_filename,
        "a",
    )
    df_ct_to_start_year.to_csv(f, header=False, index=False)
    f.close()
