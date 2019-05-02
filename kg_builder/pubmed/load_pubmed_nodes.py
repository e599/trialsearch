from py2neo import Graph, database, Node, Relationship, NodeMatcher, RelationshipMatcher
import csv
import time
import os
import random
from kg_builder.conf.config import get_sys_config

def load_pubmed_nodes():
    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_user = get_sys_config('user', kg_env)
    m_pwd = get_sys_config('password', kg_env)
    folder = get_sys_config('pubmed_csv_files_location', kg_env) + '/articles'
    graphdb_folder = get_sys_config('pubmed_csv_files_location_graphdb_rel', kg_env) + '/articles'
    print("Searching in : ", folder)

    start = time.time()
    graph = Graph(host=m_host, user=m_user, password=m_pwd)

    for dirname, dirs, files in os.walk(folder):
        print(dirname)
        for filename in files:
            print(filename)
            filename_without_extension, extension = os.path.splitext(filename)
            if extension == '.csv':
                pubmed_query_1 = ''' 
                USING PERIODIC COMMIT 5000 
                LOAD CSV WITH HEADERS FROM "file:///''' + graphdb_folder  + '/' + filename + '''" AS row
                CREATE (:PubMedArticle {pmid: row.pmid, url: row.url, title: row.title, journal: row.journal,  pub_date_year: row.pub_date_year, pub_date_month: row.pub_date_month, pub_date_day: row.pub_date_day });
                '''
                try:
                    graph.run(pubmed_query_1)
                except database.DatabaseError:
                    print("Unable to import file : " + filename)
                    continue
    pubmed_query_2 = '''
    CREATE INDEX ON :PubMedArticle(pmid);
    '''

    graph.run(pubmed_query_2)
