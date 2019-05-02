from kg_builder.conf.config import get_sys_config
from py2neo import Graph
import os
import time


folder = '/home/kgadmin/efs/data/pubmed/mesh'

kg_env = os.environ.get('KG_ENV')
m_host = get_sys_config('host', kg_env)
m_user = get_sys_config('user', kg_env)
m_pwd = get_sys_config('password', kg_env)

start = time.time()
graph = Graph(host=m_host, user=m_user, password=m_pwd)

graph_size = graph.run("MATCH (n:PubMedArticle) RETURN count(*)").data()[0]['count(*)']

print((graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:PubMedArticle) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:PubMedArticle) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))
