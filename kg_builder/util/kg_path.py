"""Filename and filepath depot."""

import os
from kg_builder.conf.config import get_sys_config

kg_env = os.environ.get('KG_ENV')

# Allows someone to run/develop/test locally using alternate filepaths
if not kg_env or kg_env == 'LOCAL':
    e599_path = "/Users/ilandor/Documents/CSCI_E599"
    kg_builder_path = "KG/e599-KGraph/kg_builder"
    project_path = os.path.join(e599_path, kg_builder_path)
    ctxml_input_path = os.path.join(e599_path, "LittlePublicXML")
    load_csv_path = os.path.join(e599_path, "load_csv")
    gps_filepath = os.path.join(project_path, "geolocate/gps_file.csv")
else:
    project_path = get_sys_config("tmp_folder", kg_env)
    ctxml_input_path = get_sys_config("source_files_location", kg_env)
    load_csv_path = get_sys_config("ct_csv_files_location", kg_env)
    gps_filepath = get_sys_config('gps_file_path', kg_env)


# Munge process stages
# (Excludes munge's delete_existing stage
# since that one doesn't produce files)
ctxml_extract_stage = "00_initial_extract"
munge_stage_01 = "01_dedup"
munge_stage_02 = "02_age_range_sex"
munge_stage_03 = "03_geolocate"
munge_stage_04 = "04_mesh_term_type"
munge_stage_05 = "05_year"
munge_stage_06 = "06_phase"
munge_stage_98 = "98_pick_fields"
munge_stage_99 = "99_to_load_csv"

# All base filenames produced at any point
# during CT XML extraction or munging.
# All interim files will have a prefix
# denoting the stage but the final "stage_99"
# files will use (the relevant subset of)
# the unprefixed names below.
agency_filename = "node_agency.csv"
agency_class_filename = "node_agency_class.csv"
age_range_filename = "node_age_range.csv"
clinical_trial_filename = "node_clinical_trial.csv"
condition_filename = "node_condition.csv"
condition_mesh_term_filename = "node_condition_mesh_term.csv"
contact_filename = "node_contact.csv"
enrollment_status_filename = "node_enrollment_status.csv"
healthy_volunteers_filename = "node_healthy_volunteers.csv"
intervention_filename = "node_intervention.csv"
intervention_mesh_term_filename = "node_intervention_mesh_term.csv"
intervention_type_filename = "node_intervention_type.csv"
location_filename = "node_location.csv"
mesh_term_filename = "node_mesh_term.csv"
mesh_term_type_filename = "node_mesh_term_type.csv"
phase_filename = "node_phase.csv"
sex_filename = "node_sex.csv"
study_type_filename = "node_study_type.csv"
year_filename = "node_year.csv"
relationships_filename = "relationship_all.csv"
