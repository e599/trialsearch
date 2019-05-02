import os
import csv
import sys
import time
from kg_builder.conf.config import get_sys_config
from py2neo import Graph, database, Node, Relationship, NodeMatcher, RelationshipMatcher

def load_ct_mesh_ontology_relationships():
    # get file paths that will be used
    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_user = get_sys_config('user', kg_env)
    m_pwd = get_sys_config('password', kg_env)

    start = time.time()
    graph = Graph(host=m_host, user=m_user, password=m_pwd)

    csv_folder = get_sys_config('pubmed_csv_files_location', kg_env)
    relationship_file = os.path.join(csv_folder, 'ct_mesh_relationship.csv')
    csv_folder_graphdb = get_sys_config('pubmed_csv_files_location_graphdb_rel', kg_env)
    relationship_file_graphdb = os.path.join(csv_folder_graphdb, 'ct_mesh_relationship.csv')
    
    ct_query_1a = '''
    CREATE INDEX ON :ClinicalTrial(new_id);
    '''

    ct_query_1b = '''
    CREATE INDEX ON :ClinicalTrial(nct_id);
    '''

    ct_mesh_ontology_1 = '''
    USING PERIODIC COMMIT 5000
    LOAD CSV WITH HEADERS FROM "file:///''' + relationship_file_graphdb + ''' " AS row
    MATCH (mesh:Resource {skos__prefLabel: row.mesh_term})
    MATCH (ct:ClinicalTrial{new_id: row.START_ID})
    CREATE (ct)-[:HAS_MESH_ONTOLOGY]->(mesh)
    '''
    print(ct_mesh_ontology_1)
    graph.run(ct_query_1a)
    graph.run(ct_query_1b)
    graph.run(ct_mesh_ontology_1)
