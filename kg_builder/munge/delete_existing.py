"""Munge file/folder deletion depot."""

import os
import shutil

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_02
from kg_builder.util.kg_path import munge_stage_03
from kg_builder.util.kg_path import munge_stage_04
from kg_builder.util.kg_path import munge_stage_05
from kg_builder.util.kg_path import munge_stage_06
from kg_builder.util.kg_path import munge_stage_98
from kg_builder.util.kg_path import load_csv_path


def process_data():
    """Master function that executes the module."""
    delete_existing_data_munging_output()


def set_and_clear_output_folder(folder, is_complete_path=False):
    """Creates or empties the CSV output file folder."""
    if not is_complete_path:
        folder = os.path.join(project_path, folder)
    if os.path.isdir(folder):
        shutil.rmtree(folder)
    os.mkdir(folder)


def delete_existing_data_munging_output():
    """Deletes all existing munge output files."""
    munge_output_folders = [
        munge_stage_01,
        munge_stage_02,
        munge_stage_03,
        munge_stage_04,
        munge_stage_05,
        munge_stage_06,
        munge_stage_98,
    ]

    for folder in munge_output_folders:
        set_and_clear_output_folder(folder)

    # This environmental variable already contains the complete path
    # so it needs to be handled separately from the rest.
    set_and_clear_output_folder(load_csv_path, is_complete_path=True)
