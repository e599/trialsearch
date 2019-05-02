import pandas as pd
import os
from kg_builder.conf.config import get_sys_config

def parse_ct_mesh_relation():
    kg_env = os.environ.get('KG_ENV')

    
    ct_folder = get_sys_config('ct_csv_files_location', kg_env)
    ctnode_filename =  ct_folder + "/node_clinical_trial.csv"

    print("reading ct nodes from ", ctnode_filename)
    meshnode_filename = ct_folder + "/node_mesh_term.csv"
    print("reading mesh nodes from ", meshnode_filename)
    relationship_filename = ct_folder + "/relationship_all.csv"
    print("reading relationship data from ", relationship_filename)

    pubmed_folder = get_sys_config('pubmed_csv_files_location', kg_env)
    import pandas as pd
    import numpy as np

    dfCT = pd.read_csv(ctnode_filename)
    dfMesh = pd.read_csv(meshnode_filename)
    dfRel = pd.read_csv(relationship_filename)
    dfRel.rename(columns={':START_ID': 'START_ID',
                          ':END_ID': 'END_ID',
                          ':TYPE': 'TYPE'}, inplace=True)

    CTMeshRel = dfRel.loc[dfRel['TYPE'] == "HAS_MESH_TERM"]
    print(CTMeshRel)

    dfCT.rename(columns={'new_id:ID': 'new_id'}, inplace=True)
    print(dfCT)
    dfMesh.rename(columns={'new_id:ID': 'new_id'}, inplace=True)
    print(dfMesh)

    dfRelKeys = pd.merge(CTMeshRel, dfMesh, left_on=['END_ID'], right_on=['new_id'], how='right')

    output_relationship = pubmed_folder + '/ct_mesh_relationship.csv'
    print("writing to", output_relationship)
    dfRelKeys.to_csv(output_relationship, sep=',', index=None, header=True)  # Don't forget to add '.csv' at the end of the path
