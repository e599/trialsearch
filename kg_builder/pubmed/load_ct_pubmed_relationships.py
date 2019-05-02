from py2neo import Graph, database, Node, Relationship, NodeMatcher, RelationshipMatcher
import csv
import time
import os
import random
from kg_builder.conf.config import get_sys_config

def load_ct_pubmed_relationships():
    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_user = get_sys_config('user', kg_env)
    m_pwd = get_sys_config('password', kg_env)
    folder = get_sys_config('pubmed_csv_files_location', kg_env) + '/ct'
    graphdb_folder = get_sys_config('pubmed_csv_files_location_graphdb_rel', kg_env) + '/ct'
    print("Searching in : ", folder)

    start = time.time()
    graph = Graph(host=m_host, user=m_user, password=m_pwd)

    ct_query_1a = '''
    CREATE INDEX ON :ClinicalTrial(new_id);
    '''

    ct_query_1b = '''
    CREATE INDEX ON :ClinicalTrial(nct_id);
    '''
    graph.run(ct_query_1a)
    graph.run(ct_query_1b)

    

    for dirname, dirs, files in os.walk(folder):
        print(dirname)
        for filename in files:
            print(filename)
            filename_without_extension, extension = os.path.splitext(filename)
            if extension == '.csv':
                pubmed_ct_query_1 = ''' 
                USING PERIODIC COMMIT 5000 
                LOAD CSV WITH HEADERS FROM "file:///''' + graphdb_folder  + '/' + filename + '''" AS row
                MATCH (ct:ClinicalTrial {nct_id: row.nct_id}),
                (pm:PubMedArticle {pmid: row.pmid})
                MERGE (ct)-[:HAS_ARTICLE_LINK]->(pm)
                '''
                try:
                    graph.run(pubmed_ct_query_1)
                except database.DatabaseError:
                    print("Unable to import file : " + filename)
                    continue
