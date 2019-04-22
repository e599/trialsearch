import pandas as pd

from kg_builder.kg_path import project_path
from kg_builder.kg_path import load_csv_path
from kg_builder.kg_path import munge_stage_01
from kg_builder.kg_path import munge_stage_02
from kg_builder.kg_path import munge_stage_04
from kg_builder.kg_path import munge_stage_05
from kg_builder.kg_path import munge_stage_98

clinical_trial_filename = "node_clinical_trial.csv"
enrollment_status_filename = "node_enrollment_status.csv"
phase_filename = "node_phase.csv"
study_type_filename = "node_study_type.csv"
healthy_volunteers_filename = "node_healthy_volunteers.csv"
age_range_filename = "node_age_range.csv"
sex_filename = "node_sex.csv"
location_filename = "node_location.csv"
agency_filename = "node_agency.csv"
agency_class_filename = "node_agency_class.csv"
condition_filename = "node_condition.csv"
contact_filename = "node_contact.csv"
intervention_filename = "node_intervention.csv"
intervention_type_filename = "node_intervention_type.csv"
mesh_term_filename = "node_mesh_term.csv"
mesh_term_type_filename = "node_mesh_term_type.csv"
year_filename = "node_year.csv"

relationship_filename = "relationship_all.csv"


def process_data():

    # M2 nodes
    to_load_csv(munge_stage_01, enrollment_status_filename)
    to_load_csv(munge_stage_01, phase_filename)
    to_load_csv(munge_stage_01, study_type_filename)
    to_load_csv(munge_stage_01, healthy_volunteers_filename)
    to_load_csv(munge_stage_02, age_range_filename)
    to_load_csv(munge_stage_02, sex_filename)
    to_load_csv(munge_stage_98, location_filename)
    to_load_csv(munge_stage_98, clinical_trial_filename)

    # M3 nodes
    to_load_csv(munge_stage_01, agency_filename)
    to_load_csv(munge_stage_01, agency_class_filename)
    to_load_csv(munge_stage_01, condition_filename)
    to_load_csv(munge_stage_01, contact_filename)
    to_load_csv(munge_stage_01, intervention_filename)
    to_load_csv(munge_stage_01, intervention_type_filename)
    to_load_csv(munge_stage_04, mesh_term_filename)
    to_load_csv(munge_stage_04, mesh_term_type_filename)
    to_load_csv(munge_stage_05, year_filename)

    # relationships
    to_load_csv(munge_stage_05, relationship_filename)


def to_load_csv(munge_stage_file_prefix, filename):
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_file_prefix
        + "/"
        + munge_stage_file_prefix
        + "_"
        + filename,
        na_filter=False,
    )
    df.to_csv(load_csv_path + "/" + filename, index=False)
