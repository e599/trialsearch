import os
import pandas as pd

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_03
from kg_builder.util.kg_path import munge_stage_05
from kg_builder.util.kg_path import munge_stage_98

from kg_builder.util.kg_path import clinical_trial_filename
from kg_builder.util.kg_path import location_filename

munge_dest_stage_path = os.path.join(project_path, munge_stage_98)


def process_data():
    """Master function that executes the module."""
    pick_fields(
        munge_stage_03,
        location_filename,
        ["new_id:ID", "name", "city", "state", "country", "zip", "lat", "lng", ":LABEL"],
        {"lat": 6, "lng": 6},
    )
    pick_fields(
        munge_stage_05,
        clinical_trial_filename,
        [
            "new_id:ID",
            "nct_id",
            "org_study_id",
            "url",
            "brief_title",
            "official_title",
            "brief_summary",
            "overall_status",
            "phase",
            "study_type",
            "minimum_age",
            "maximum_age",
            "start_date",
            "start_year",
            "criteria_text",
            ":LABEL",
        ],
    )


def pick_fields(
    munge_stage_file_prefix,
    filename,
    fields_in_order,
    field_rounding_dict={},
):
    """Exports the requested fields and order into a new file."""
    df = pd.read_csv(
        project_path
        + "/"
        + munge_stage_file_prefix
        + "/"
        + munge_stage_file_prefix
        + "_"
        + filename,
    )
    df = df.reindex(columns=fields_in_order)

    # Optionally rounds fields since pandas sometimes adds extra decimal places.
    for k, v in field_rounding_dict.items():
        df[k] = df[k].apply(lambda x: round(x, v))

    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_98
        + "_"
        + filename,
        index=False,
    )
