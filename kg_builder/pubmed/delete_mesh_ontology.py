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

graph_size = graph.run("MATCH (n:Resource) RETURN count(*)").data()[0]['count(*)']
print('Deleting Resource : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:Resource) WITH n LIMIT 1000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:Resource) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))

graph_size = graph.run("MATCH (n:Class) RETURN count(*)").data()[0]['count(*)']
print('Deleting Class : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:Class) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:Class) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))
    
graph_size = graph.run("MATCH (n:BNode) RETURN count(*)").data()[0]['count(*)']
print('Deleting BNode : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:BNode) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:BNode) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))

graph_size = graph.run("MATCH (n:URI) RETURN count(*)").data()[0]['count(*)']
print('Deleting URI : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:URI) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:URI) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))
    
graph_size = graph.run("MATCH (n:owl__Class) RETURN count(*)").data()[0]['count(*)']
print('Deleting owl__Class : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:owl__Class) WITH n LIMIT 1000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:owl__Class) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))

graph_size = graph.run("MATCH (n:owl__DatatypeProperty) RETURN count(*)").data()[0]['count(*)']
print('Deleting owl__DatatypeProperty : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:owl__DatatypeProperty) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:owl__DatatypeProperty) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))
    
graph_size = graph.run("MATCH (n:owl__ObjectProperty) RETURN count(*)").data()[0]['count(*)']
print('Deleting owl__ObjectProperty : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:owl__ObjectProperty) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:owl__ObjectProperty) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))

graph_size = graph.run("MATCH (n:owl__Ontology) RETURN count(*)").data()[0]['count(*)']
print('Deleting owl__Ontology : ', (graph_size))
while graph_size > 0 :
    graph.run("PROFILE MATCH (n:owl__Ontology) WITH n LIMIT 10000 DETACH DELETE n")
    graph_size = graph.run("PROFILE MATCH (n:owl__Ontology) RETURN count(*)").data()[0]['count(*)']
    print((graph_size))
