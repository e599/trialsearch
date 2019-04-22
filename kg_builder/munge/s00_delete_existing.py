import os
import shutil

from kg_builder.kg_path import project_path
from kg_builder.kg_path import munge_stage_01
from kg_builder.kg_path import munge_stage_02
from kg_builder.kg_path import munge_stage_03
from kg_builder.kg_path import munge_stage_04
from kg_builder.kg_path import munge_stage_05
from kg_builder.kg_path import munge_stage_50
from kg_builder.kg_path import munge_stage_98
from kg_builder.kg_path import load_csv_path


def process_data():
    delete_existing_data_munging_output()


def set_output_folder(folder):
    if os.path.isdir(folder):
        shutil.rmtree(folder)
    os.mkdir(folder)


def delete_existing_data_munging_output():
    set_output_folder(os.path.join(project_path, munge_stage_01))
    set_output_folder(os.path.join(project_path, munge_stage_02))
    set_output_folder(os.path.join(project_path, munge_stage_03))
    set_output_folder(os.path.join(project_path, munge_stage_04))
    set_output_folder(os.path.join(project_path, munge_stage_05))
    set_output_folder(os.path.join(project_path, munge_stage_50))
    set_output_folder(os.path.join(project_path, munge_stage_98))
    set_output_folder(load_csv_path)
