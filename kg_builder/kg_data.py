
import time

from kg_builder.ctxml import to_csv
from kg_builder.munge import s00_delete_existing
from kg_builder.munge import s01_dedup
from kg_builder.munge import s02_age_range_sex
from kg_builder.munge import s03_geolocate
from kg_builder.munge import s04_mesh_term_type
from kg_builder.munge import s05_start_year
# from kg_builder.munge import s50_join
from kg_builder.munge import s98_pick_fields
from kg_builder.munge import s99_to_load_csv


def extract():
    start = time.time()
    print("starting kg_data...")

    # ctxml
    print("start to_csv...")
    to_csv.extract_xml_to_csv()
    print("end to_csv")

    # munge
    print("start s00_delete_existing...")
    s00_delete_existing.process_data()
    print("end   s00_delete_existing")

    print("start s01_dedup...")
    s01_dedup.process_data()
    print("end   s01_dedup")

    print("start s02_age_range_sex...")
    s02_age_range_sex.process_data()
    print("end   s02_age_range_sex")

    print("start s03_geolocate...")
    s03_geolocate.process_data()
    print("end   s03_geolocate")

    print("start s04_mesh_term_type...")
    s04_mesh_term_type.process_data()
    print("end   s04_mesh_term_type")

    print("start s05_start_year...")
    s05_start_year.process_data()
    print("end   s05_start_year")

    # print("start s50_join...")
    # s50_join.process_data()
    # print("end   s50_join")

    print("start s98_pick_fields...")
    s98_pick_fields.process_data()
    print("end   s98_pick_fields")

    print("start s99_to_load_csv...")
    s99_to_load_csv.process_data()
    print("end   s99_to_load_csv")

    end = time.time()
    print("kg_data completed in " + str(end - start) + " seconds.")
