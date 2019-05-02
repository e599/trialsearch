import os
import pandas as pd

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import ctxml_extract_stage
from kg_builder.util.kg_path import munge_stage_01

from kg_builder.util.kg_path import agency_filename
from kg_builder.util.kg_path import agency_class_filename
from kg_builder.util.kg_path import clinical_trial_filename
from kg_builder.util.kg_path import condition_filename
from kg_builder.util.kg_path import condition_mesh_term_filename
from kg_builder.util.kg_path import contact_filename
from kg_builder.util.kg_path import enrollment_status_filename
from kg_builder.util.kg_path import healthy_volunteers_filename
from kg_builder.util.kg_path import intervention_filename
from kg_builder.util.kg_path import intervention_mesh_term_filename
from kg_builder.util.kg_path import intervention_type_filename
from kg_builder.util.kg_path import location_filename
from kg_builder.util.kg_path import phase_filename
from kg_builder.util.kg_path import study_type_filename
from kg_builder.util.kg_path import relationships_filename

munge_source_stage_path = os.path.join(project_path, ctxml_extract_stage)
munge_dest_stage_path = os.path.join(project_path, munge_stage_01)

node_filename_list = [
    agency_filename,
    agency_class_filename,
    clinical_trial_filename,
    condition_filename,
    condition_mesh_term_filename,
    contact_filename,
    enrollment_status_filename,
    healthy_volunteers_filename,
    intervention_filename,
    intervention_mesh_term_filename,
    intervention_type_filename,
    location_filename,
    phase_filename,
    study_type_filename,
]


def process_data():
    """Master function that executes the module."""
    remove_exact_duplicate_rows()


def remove_exact_duplicate_rows():
    """Deduplicates exact nodes/relationships."""
    # Drops exact node duplicates on new_id
    # (composed of hash of all fields concatenated).
    for filename in node_filename_list:
        df = pd.read_csv(
            munge_source_stage_path
            + "/"
            + ctxml_extract_stage
            + "_"
            + filename,
            na_filter=False,
        )
        df_deduped = df.drop_duplicates(subset=["new_id:ID"])

        # Sorts single-attribute nodes.
        column_names = list(df_deduped)
        if len(column_names) == 3:
            df_deduped = df_deduped.sort_values(by=[column_names[1]])

        df_deduped.to_csv(
            munge_dest_stage_path
            + "/"
            + munge_stage_01
            + "_"
            + filename,
            index=False,
        )

    # Drops exact relationship duplicates.
    df = pd.read_csv(
        munge_source_stage_path
        + "/"
        + ctxml_extract_stage
        + "_"
        + relationships_filename
    )
    df = df.dropna(how="all")
    df = df.drop_duplicates(subset=[":START_ID", ":END_ID", ":TYPE"])
    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_01
        + "_"
        + relationships_filename,
        index=False,
    )
