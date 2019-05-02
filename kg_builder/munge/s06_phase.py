import os
import pandas as pd

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_05
from kg_builder.util.kg_path import munge_stage_06

from kg_builder.util.kg_path import phase_filename
from kg_builder.util.kg_path import relationships_filename

munge_dest_stage_path = os.path.join(project_path, munge_stage_06)


def process_data():
    """Master function that executes the module."""
    create_clinical_trial_to_phase_relationships()


def create_clinical_trial_to_phase_relationships():
    """Consolidates the Phase nodes and the CT relationships to them."""

    # Fetches the original Phase nodes for us to consolidate.
    df_phase = pd.read_csv(
        project_path
        + "/"
        + munge_stage_01
        + "/"
        + munge_stage_01
        + "_"
        + phase_filename,
        na_filter=False,
    )

    # Gets all Phase IDs so that we can handle each Phase accordingly.
    phase_early1_id = df_phase.loc[df_phase["phase"] == "Early Phase 1", "new_id:ID"].values[0]
    phase_1and2_id = df_phase.loc[df_phase["phase"] == "Phase 1/Phase 2", "new_id:ID"].values[0]
    phase_2and3_id = df_phase.loc[df_phase["phase"] == "Phase 2/Phase 3", "new_id:ID"].values[0]
    phase_1_id = df_phase.loc[df_phase["phase"] == "Phase 1", "new_id:ID"].values[0]
    phase_2_id = df_phase.loc[df_phase["phase"] == "Phase 2", "new_id:ID"].values[0]
    phase_3_id = df_phase.loc[df_phase["phase"] == "Phase 3", "new_id:ID"].values[0]

    # Fetches our latest relationships file for us to transform
    # vis a vis the consolidation of the Phase nodes.
    df_relationships = pd.read_csv(
        project_path
        + "/"
        + munge_stage_05
        + "/"
        + munge_stage_05
        + "_"
        + relationships_filename,
    )

    # Collects into separate dataframes all Phase relationships
    # that need consolidation.
    df_phase_early1_relationships = \
        df_relationships.loc[
            (df_relationships[":END_ID"] == phase_early1_id)
            & (df_relationships[":TYPE"] == "HAS_PHASE")
        ]
    df_phase_1and2_relationships = \
        df_relationships.loc[
            (df_relationships[":END_ID"] == phase_1and2_id)
            & (df_relationships[":TYPE"] == "HAS_PHASE")
        ]
    df_phase_2and3_relationships = \
        df_relationships.loc[
            (df_relationships[":END_ID"] == phase_2and3_id)
            & (df_relationships[":TYPE"] == "HAS_PHASE")
        ]

    # Sets aside into a single separate dataframe all Phase relationship
    # that don't need consolidation along with all non-Phase relationships.
    df_other_relationships = \
        df_relationships[~df_relationships.isin(pd.concat([
            df_phase_early1_relationships,
            df_phase_1and2_relationships,
            df_phase_2and3_relationships,
        ]))].dropna()

    # Phase 1a relationships are initially "Early Phase 1".
    # These need to be replaced by relationships to "Phase 1".
    df_phase_1a_relationships = \
        df_phase_early1_relationships.copy()

    # Phase 1b relationships are initially "Phase 1/Phase 2".
    # These need to be replaced by relationships to "Phase 1".
    df_phase_1b_relationships = \
        df_phase_1and2_relationships.copy()

    # Creates the new, additional "Phase 1" relationships.
    df_phase_1_relationships = pd.concat([df_phase_1a_relationships, df_phase_1b_relationships])
    df_phase_1_relationships[":END_ID"] = phase_1_id

    # Phase 2a relationships are initially "Phase 1/Phase 2".
    # These need to be replaced by relationships to "Phase 2".
    df_phase_2a_relationships = \
        df_phase_1and2_relationships.copy()

    # Phase 2b relationships are initially "Phase 2/Phase 3".
    # These need to be replaced by relationships to "Phase 2".
    df_phase_2b_relationships = \
        df_phase_2and3_relationships.copy()

    # Creates the new, additional "Phase 2" relationships.
    df_phase_2_relationships = pd.concat([df_phase_2a_relationships, df_phase_2b_relationships])
    df_phase_2_relationships[":END_ID"] = phase_2_id

    # Phase 3 relationships are initially "Phase 2/Phase 3".
    # These need to be replaced by relationships to "Phase 3".
    df_phase_3_relationships = \
        df_phase_2and3_relationships.copy()

    # Creates the new, additional "Phase 3" relationships.
    df_phase_3_relationships[":END_ID"] = phase_3_id

    # Creates a single dataframe with all of the new Phase relationships.
    df_revised_relationships = pd.concat([
        df_other_relationships,
        df_phase_1_relationships,
        df_phase_2_relationships,
        df_phase_3_relationships,
    ])

    # If either assertion below fails, these print statements might be useful
    # print("relationships = other + phase_early1 + phase_1and2 + phase_2and3")
    # print("revised = other + phase_1 + phase_2 + phase_3")
    # print("relationships: ", df_relationships.shape[0])
    # print("other:         ", df_other_relationships.shape[0])
    # print("phase_early1:  ", df_phase_early1_relationships.shape[0])
    # print("phase_1and2:   ", df_phase_1and2_relationships.shape[0])
    # print("phase_2and3:   ", df_phase_2and3_relationships.shape[0])
    # print("phase_1:       ", df_phase_1_relationships.shape[0])
    # print("phase_2:       ", df_phase_2_relationships.shape[0])
    # print("phase_3:       ", df_phase_3_relationships.shape[0])
    # print("revised:       ", df_revised_relationships.shape[0])

    # Asserts a complete, mutually exclusive count
    # of the incoming relationships split
    # into the pre-processed sets.
    assert df_relationships.shape[0] == \
        df_other_relationships.shape[0] \
        + df_phase_early1_relationships.shape[0] \
        + df_phase_1and2_relationships.shape[0] \
        + df_phase_2and3_relationships.shape[0], \
        "Relationship set count mismatch before phase processing!"

    # Asserts a complete, mutually exclusive count
    # of the outgoing relationships split
    # into the post-processed sets.
    assert df_revised_relationships.shape[0] == \
        df_other_relationships.shape[0] \
        + df_phase_1_relationships.shape[0] \
        + df_phase_2_relationships.shape[0] \
        + df_phase_3_relationships.shape[0], \
        "Relationship set count mismatch after phase processing!"

    # Creates and exports the relationships file
    # with all Phase relationships now consolidated.
    df_revised_relationships.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_06
        + "_"
        + relationships_filename,
        index=False,
    )

    # Creates and exports the Phase file
    # with the now-consolidated composite/qualified Phases removed.
    df_revised_phase = df_phase[
        ~df_phase["phase"].isin([
            "Early Phase 1",
            "Phase 1/Phase 2",
            "Phase 2/Phase 3",
        ])
    ]
    df_revised_phase = df_revised_phase.sort_values(by=["phase"])
    df_revised_phase.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_06
        + "_"
        + phase_filename,
        index=False,
    )
