from py2neo import Graph, database, Node, Relationship, NodeMatcher, RelationshipMatcher
import csv
import time
import os
import random
from kg_builder.conf.config import get_sys_config

def load_pubmed_mesh_ontology_relationships():

    # get environmental variables
    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_user = get_sys_config('user', kg_env)
    m_pwd = get_sys_config('password', kg_env)
    folder = get_sys_config('pubmed_csv_files_location', kg_env) + '/mesh'
    graphdb_folder = get_sys_config('pubmed_csv_files_location_graphdb_rel', kg_env) + '/mesh'
    print("Searching in : ", folder)

    # connect to graph db
    graph = Graph(host=m_host, user=m_user, password=m_pwd)

    for dirname, dirs, files in os.walk(folder):
        print(dirname)
        for filename in files:
            print(filename)
            filename_without_extension, extension = os.path.splitext(filename)
            if extension == '.csv':
                pubmed_mesh_query_1 = ''' 
                USING PERIODIC COMMIT 5000 
                LOAD CSV WITH HEADERS FROM "file:///''' + graphdb_folder  + '/' + filename + '''" AS row
                MATCH (mesh:Resource {skos__prefLabel: row.mesh_term}),
                (pm:PubMedArticle {pmid: row.pmid})
                MERGE (pm)-[:HAS_MESH_ONTOLOGY]->(mesh)
                '''
                try:
                    graph.run(pubmed_mesh_query_1)
                except database.DatabaseError:
                    print("Unable to import file : " + filename)
                    continue
