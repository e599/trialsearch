
import time

from kg_builder.ctxml import master
from kg_builder.munge import delete_existing
from kg_builder.munge import s01_dedup
from kg_builder.munge import s02_age_range_sex
from kg_builder.munge import s03_geolocate
from kg_builder.munge import s04_mesh_term_type
from kg_builder.munge import s05_start_year
from kg_builder.munge import s06_phase
from kg_builder.munge import s98_pick_fields
from kg_builder.munge import s99_to_load_csv


def extract():
    """Master function to extract and munge CT XML files."""
    munge_process_dict = {
        "extract_all_xml_files": master,
        "delete_existing": delete_existing,
        "s01_dedup": s01_dedup,
        "s02_age_range_sex": s02_age_range_sex,
        "s03_geolocate": s03_geolocate,
        "s04_mesh_term_type": s04_mesh_term_type,
        "s05_start_year": s05_start_year,
        "s06_phase": s06_phase,
        "s98_pick_fields": s98_pick_fields,
        "s99_to_load_csv": s99_to_load_csv,
    }

    start = time.time()
    print("starting kg_data...")

    for message, process in munge_process_dict.items():
        print("start " + message + "...")
        process.process_data()

    end = time.time()
    print("kg_data completed in " + str(end - start) + " seconds.")
