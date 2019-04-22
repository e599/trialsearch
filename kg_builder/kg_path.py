import os
from kg_builder.conf.config import get_sys_config

kg_env = os.environ.get('KG_ENV')

if kg_env == 'STAGE':
    project_path = get_sys_config("tmp_folder", kg_env)
    ctxml_input_path = get_sys_config("source_files_location", kg_env)
    load_csv_path = get_sys_config("csv_files_location", kg_env)
    csv_output_folder = "csv_output"
else:
    project_path = "/Users/ilandor/Documents/CSCI_E599/KG/e599-KGraph/kg_builder"
    ctxml_input_path = "/Users/ilandor/Documents/CSCI_E599/LittlePublicXML"
    load_csv_path = "/Users/ilandor/Documents/CSCI_E599/load_to_csv"
    csv_output_folder = "csv_output"

munge_stage_01 = "01_dedup"
munge_stage_02 = "02_age_range_sex"
munge_stage_03 = "03_geolocate"
munge_stage_04 = "04_mesh_term_type"
munge_stage_05 = "05_year"
munge_stage_50 = "50_join"
munge_stage_98 = "98_pick_fields"
munge_stage_99 = "99_to_load_csv"
