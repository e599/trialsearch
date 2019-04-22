import os
import re
import pandas as pd

from kg_builder.kg_path import project_path
from kg_builder.kg_path import csv_output_folder
from kg_builder.kg_path import munge_stage_01

munge_source_stage_path = os.path.join(project_path, csv_output_folder)
munge_dest_stage_path = os.path.join(project_path, munge_stage_01)

clinical_trial_filename = "node_clinical_trial.csv"

relationship_filename = "relationship_all.csv"


def process_data():
    remove_exact_duplicate_rows()


def remove_exact_duplicate_rows():
    node_filename_list = []
    for dirname, dirs, files in os.walk(munge_source_stage_path):
        for file in files:
            if re.search("^node", file):
                node_filename_list.append(file)

    # Drop exact node duplicates on new_id (composed of hash of all fields concatenated)
    for filename in node_filename_list:
        df = pd.read_csv(munge_source_stage_path + "/" + filename, na_filter=False)
        df_deduped = df.drop_duplicates(subset=["new_id:ID"])
        df_deduped.to_csv(
            munge_dest_stage_path
            + "/"
            + munge_stage_01
            + "_"
            + filename,
            index=False,
        )

    # Drop exact relationship duplicates
    df = pd.read_csv(munge_source_stage_path + "/" + relationship_filename)
    df = df.dropna(how="all")
    df = df.drop_duplicates(subset=[":START_ID", ":END_ID", ":TYPE"])
    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_01
        + "_"
        + relationship_filename,
        index=False,
    )
