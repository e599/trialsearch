import os
import shutil
import pandas as pd

from kg_builder.ctxml.writers import get_uuid

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_02
from kg_builder.util.kg_path import munge_stage_04

from kg_builder.util.kg_path import condition_mesh_term_filename
from kg_builder.util.kg_path import intervention_mesh_term_filename
from kg_builder.util.kg_path import mesh_term_filename
from kg_builder.util.kg_path import mesh_term_type_filename
from kg_builder.util.kg_path import relationships_filename

munge_dest_stage_path = os.path.join(project_path, munge_stage_04)


def process_data():
    """Master function that executes the module."""
    create_mesh_term_to_mesh_term_type_relationships()


def create_mesh_term_to_mesh_term_type_relationships():
    """Creates the MeshTermType enum nodes, converts the
    ConditionMeshTerm and InterventionMeshTerm nodes to MeshTerm nodes,
    and create MeshTerm to MeshTermType relationships."""

    # Fetches the ConditionMeshTerm nodes.
    df_condition_mesh_term = pd.read_csv(
        project_path
        + "/"
        + munge_stage_01
        + "/"
        + munge_stage_01
        + "_"
        + condition_mesh_term_filename,
    )
    df_condition_mesh_term = df_condition_mesh_term.replace({":LABEL": {"ConditionMeshTerm": "MeshTerm"}})

    # Fetches the InterventionMeshTerm nodes.
    df_intervention_mesh_term = pd.read_csv(
        project_path
        + "/"
        + munge_stage_01
        + "/"
        + munge_stage_01
        + "_"
        + intervention_mesh_term_filename,
    )
    df_intervention_mesh_term = df_intervention_mesh_term.replace({":LABEL": {"InterventionMeshTerm": "MeshTerm"}})

    # Creates and exports the MeshTerm nodes.
    df_mesh_term = pd.concat([df_condition_mesh_term, df_intervention_mesh_term])
    df_mesh_term = df_mesh_term.sort_values(by=["mesh_term"])
    df_mesh_term.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + mesh_term_filename,
        index=False,
    )

    # Fetches the Condition and Intervention IDs.
    df_condition_id = get_uuid("Condition")
    df_intervention_id = get_uuid("Intervention")

    # Creates and exports the MeshTermType enum nodes.
    df_mesh_term_type = pd.DataFrame.from_dict({
        "new_id:ID": [df_intervention_id, df_condition_id],
        "mesh_term_type": ["Condition", "Intervention"],
        ":LABEL": "MeshTermType",
    })
    df_mesh_term_type = df_mesh_term_type.sort_values(by=["mesh_term_type"])
    df_mesh_term_type.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + mesh_term_type_filename,
        index=False,
    )

    # Creates the relationships from condition MeshTerm to MeshTermType.
    df_condition_mesh_term_type_relationships = pd.DataFrame(df_condition_mesh_term, columns=["new_id:ID"])
    df_condition_mesh_term_type_relationships = df_condition_mesh_term_type_relationships.rename(
        index=str,
        columns={
            "new_id:ID": ":START_ID",
        }
    )
    df_condition_mesh_term_type_relationships[":END_ID"] = df_condition_id
    df_condition_mesh_term_type_relationships[":TYPE"] = "HAS_MESH_TERM_TYPE"

    # Creates the relationships from intervention MeshTerm to MeshTermType.
    df_intervention_mesh_term_type_relationships = pd.DataFrame(df_intervention_mesh_term, columns=["new_id:ID"])
    df_intervention_mesh_term_type_relationships = df_intervention_mesh_term_type_relationships.rename(
        index=str,
        columns={
            "new_id:ID": ":START_ID",
        }
    )
    df_intervention_mesh_term_type_relationships[":END_ID"] = df_intervention_id
    df_intervention_mesh_term_type_relationships[":TYPE"] = "HAS_MESH_TERM_TYPE"

    df_mesh_term_relationships = pd.concat([
        df_condition_mesh_term_type_relationships,
        df_intervention_mesh_term_type_relationships,
    ])

    # Makes a copy of the raw relationships file for appending to.
    shutil.copyfile(
        project_path
        + "/"
        + munge_stage_02
        + "/"
        + munge_stage_02
        + "_"
        + relationships_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
    )

    # Reads the file into memory.
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
        "r",
    )

    # Stack Overflow citation for the next two lines of code
    # #https://medium.com/@itylergarrett.tag/find-and-replace-in-a-csv-using-python-f983f950acfb

    # Performs in-place replacement to use the new relationship label.
    f = ''.join([i for i in f]) \
        .replace("HAS_CONDITION_MESH_TERM", "HAS_MESH_TERM")

    # Opens the same file in write mode, and performs the replacement.
    x = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
        "w",
    )
    x.writelines(f)
    x.close()

    # Reads the file into memory.
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
        "r",
    )

    # Stack Overflow citation for the next two lines of code
    # #https://medium.com/@itylergarrett.tag/find-and-replace-in-a-csv-using-python-f983f950acfb

    # Performs in-place replacement to use the new relationship label.
    f = ''.join([i for i in f]) \
        .replace("HAS_INTERVENTION_MESH_TERM", "HAS_MESH_TERM")

    # Opens the same file in write mode, and performs the replacement.
    x = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
        "w",
    )
    x.writelines(f)
    x.close()

    # Appends the MeshTerm to MeshTermType relationships to the relationships file
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationships_filename,
        "a",
    )
    df_mesh_term_relationships.to_csv(f, header=False, index=False)
    f.close()
