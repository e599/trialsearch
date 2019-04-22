import os
import shutil
import pandas as pd

from kg_builder.kg_path import project_path
from kg_builder.kg_path import munge_stage_01
from kg_builder.kg_path import munge_stage_02
from kg_builder.kg_path import munge_stage_04
from kg_builder.ctxml.writers import get_uuid

munge_dest_stage_path = os.path.join(project_path, munge_stage_04)

condition_mesh_term_filename = "node_condition_mesh_term.csv"
intervention_mesh_term_filename = "node_intervention_mesh_term.csv"
mesh_term_filename = "node_mesh_term.csv"
mesh_term_type_filename = "node_mesh_term_type.csv"

relationship_filename = "relationship_all.csv"


def process_data():
    create_mesh_term_to_mesh_term_type_relationships()


def create_mesh_term_to_mesh_term_type_relationships():

    # Fetch ConditionMeshTerm IDs
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

    # Fetch InterventionMeshTerm IDs
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

    # Create MeshTerm node data
    df_mesh_term = pd.concat([df_condition_mesh_term, df_intervention_mesh_term])
    df_mesh_term.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + mesh_term_filename,
        index=False,
    )

    # Fetch the Condition and Intervention ids
    df_condition_id = get_uuid("Condition")
    df_intervention_id = get_uuid("Intervention")

    # Create MeshTermType node data
    df_mesh_term_type = pd.DataFrame.from_dict({
        "new_id:ID": [df_intervention_id, df_condition_id],
        "mesh_term_type": ["Condition", "Intervention"],
        ":LABEL": "MeshTermType",
    })
    df_mesh_term_type.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + mesh_term_type_filename,
        index=False,
    )

    # Create relationships from condition MeshTerm to MeshTermType
    df_condition_mesh_term_type_relationships = pd.DataFrame(df_condition_mesh_term, columns=["new_id:ID"])
    df_condition_mesh_term_type_relationships = df_condition_mesh_term_type_relationships.rename(
        index=str,
        columns={
            "new_id:ID": ":START_ID",
        }
    )
    df_condition_mesh_term_type_relationships[":END_ID"] = df_condition_id
    df_condition_mesh_term_type_relationships[":TYPE"] = "HAS_MESH_TERM_TYPE"

    # Create relationships from intervention MeshTerm to MeshTermType
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

    # Make copy of raw relationship file for appending to
    shutil.copyfile(
        project_path
        + "/"
        + munge_stage_02
        + "/"
        + munge_stage_02
        + "_"
        + relationship_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
    )

    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
        "r",
    )
    f = ''.join([i for i in f]) \
        .replace("HAS_CONDITION_MESH_TERM", "HAS_MESH_TERM")
    x = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
        "w",
    )
    x.writelines(f)
    x.close()

    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
        "r",
    )
    f = ''.join([i for i in f]) \
        .replace("HAS_INTERVENTION_MESH_TERM", "HAS_MESH_TERM")
    x = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
        "w",
    )
    x.writelines(f)
    x.close()

    # Append MeshTermType relationships to relationship file
    f = open(
        munge_dest_stage_path
        + "/"
        + munge_stage_04
        + "_"
        + relationship_filename,
        "a",
    )
    df_mesh_term_relationships.to_csv(f, header=False, index=False)
    f.close()
