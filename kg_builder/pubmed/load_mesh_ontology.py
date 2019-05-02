from py2neo import Graph, Node, Relationship, NodeMatcher, RelationshipMatcher
import csv
import time
import os
import random
from kg_builder.conf.config import get_sys_config

def load_mesh_ontology():

    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_user = get_sys_config('user', kg_env)
    m_pwd = get_sys_config('password', kg_env)

    filepath = get_sys_config('pubmed_mesh_ontology', kg_env)
    
    start = time.time()
    graph = Graph(host=m_host, user=m_user, password=m_pwd)

    mesh_ont_query_1a = ''' 
    CREATE INDEX ON :Resource(uri) 
    '''
    mesh_ont_query_1b = ''' 
    CREATE INDEX ON :URI(uri)
    '''
    mesh_ont_query_1c = ''' 
    CREATE INDEX ON :BNode(uri) 
    '''
    mesh_ont_query_1d = ''' 
    CREATE INDEX ON :Class(uri)
    '''

    mesh_ont_query_1e = ''' 
    CREATE INDEX ON :Resource(skos__prefLabel)
    '''

    mesh_ont_query_2 = ''' 
    CALL semantics.importRDF("file:///''' + filepath + '''","Turtle", { shortenUrls: true, typesToLabels: true, commitSize: 5000 }) 
    '''
    start = time.time()
    graph.run(mesh_ont_query_1a)
    graph.run(mesh_ont_query_1b)
    graph.run(mesh_ont_query_1c)
    graph.run(mesh_ont_query_1d)
    graph.run(mesh_ont_query_1e)
    graph.run(mesh_ont_query_2)
    end = time.time()
    print(end - start)
