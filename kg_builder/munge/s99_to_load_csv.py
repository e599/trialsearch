import pandas as pd

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_02
from kg_builder.util.kg_path import munge_stage_04
from kg_builder.util.kg_path import munge_stage_05
from kg_builder.util.kg_path import munge_stage_06
from kg_builder.util.kg_path import munge_stage_98
from kg_builder.util.kg_path import load_csv_path

from kg_builder.util.kg_path import agency_filename
from kg_builder.util.kg_path import agency_class_filename
from kg_builder.util.kg_path import age_range_filename
from kg_builder.util.kg_path import clinical_trial_filename
from kg_builder.util.kg_path import condition_filename
from kg_builder.util.kg_path import contact_filename
from kg_builder.util.kg_path import enrollment_status_filename
from kg_builder.util.kg_path import healthy_volunteers_filename
from kg_builder.util.kg_path import intervention_filename
from kg_builder.util.kg_path import intervention_type_filename
from kg_builder.util.kg_path import location_filename
from kg_builder.util.kg_path import mesh_term_filename
from kg_builder.util.kg_path import mesh_term_type_filename
from kg_builder.util.kg_path import phase_filename
from kg_builder.util.kg_path import sex_filename
from kg_builder.util.kg_path import study_type_filename
from kg_builder.util.kg_path import year_filename
from kg_builder.util.kg_path import relationships_filename


def process_data():
    """Master function that executes the module."""

    # Nodes.
    to_load_csv(munge_stage_01, agency_filename)
    to_load_csv(munge_stage_01, agency_class_filename)
    to_load_csv(munge_stage_02, age_range_filename)
    to_load_csv(munge_stage_98, clinical_trial_filename)
    to_load_csv(munge_stage_01, condition_filename)
    to_load_csv(munge_stage_01, contact_filename)
    to_load_csv(munge_stage_01, enrollment_status_filename)
    to_load_csv(munge_stage_01, healthy_volunteers_filename)
    to_load_csv(munge_stage_01, intervention_filename)
    to_load_csv(munge_stage_01, intervention_type_filename)
    to_load_csv(munge_stage_98, location_filename)
    to_load_csv(munge_stage_04, mesh_term_filename)
    to_load_csv(munge_stage_04, mesh_term_type_filename)
    to_load_csv(munge_stage_06, phase_filename)
    to_load_csv(munge_stage_02, sex_filename)
    to_load_csv(munge_stage_01, study_type_filename)
    to_load_csv(munge_stage_05, year_filename)

    # Relationships.
    to_load_csv(munge_stage_06, relationships_filename)


def to_load_csv(munge_stage_file_prefix, filename):
    """Exports the final version of each file
    to the Neo4j import folder."""
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
