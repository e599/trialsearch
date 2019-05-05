# Use the kg_master.py to kick off building the clinical trials knowledge graph.
# This process will :
# 1. Download the clinical trials source files.
#       The source files will be downloaded based on whether a env variable is turned on 2.
# 2. Convert the downloaded XML files to CSVs
# 3. Load the CSVs into graph db
# 4. Yhe process also runs some sanity tests to validate that process ran successfully


import os
import threading
import time
import datetime

from kg_builder.conf.config import get_sys_config
from kg_builder.util.kg_data import extract
from kg_builder.util.kg_utils import download_and_unzip
from kg_builder.util.kg_load import load
from kg_builder.util.kg_test import run_test
from kg_builder.pubmed.pubmed_get import download_extract_pubmed
from kg_builder.pubmed.load_ct_mesh_ontology_relationships import load_ct_mesh_ontology_relationships
from kg_builder.pubmed.load_ct_pubmed_relationships import load_ct_pubmed_relationships
from kg_builder.pubmed.load_mesh_ontology import load_mesh_ontology
from kg_builder.pubmed.load_pubmed_nodes import load_pubmed_nodes
from kg_builder.pubmed.load_pubmed_mesh_ontology_relationships import load_pubmed_mesh_ontology_relationships
from kg_builder.pubmed.parse_ct_mesh_relation import parse_ct_mesh_relation

def ct_init():
    """Master function to build the clinical trials graph  from a
    fresh download of clinicaltrials.gov's complete set of XML files."""

    print('kg_master ct load start - ', datetime.datetime.now().isoformat())
    kg_env = os.environ.get('KG_ENV')
    download_src_files = get_sys_config('download_src_files', kg_env)
    download_url = get_sys_config('download_url', kg_env)

    if download_src_files:

        # Downloads the file from the web (and overwrites, if necessary).
        print("Downloading source files...")
        download_and_unzip(url=download_url)

    # Extract and munge (transform).
    print("Extract...")
    extract()
    
    # Load.
    print("Load graph...")
    load()

    print('kg_master ct load end - ', datetime.datetime.now().isoformat())

    
# master function to build and link pubmed nodes and mesh ontology to the clinical trials graph    
def pubmed_init():
    print('kg_master pubmed load start - ', datetime.datetime.now().isoformat())
    print("Downloading and Extracting Pubmed Nodes")
    # Download Extract pubmed nodes - only new files extracted. old ones preserved
    download_extract_pubmed()
    # Load Pubmed nodes and Mesh Ontology
    print("Loading Pubmed Nodes")
    load_pubmed_nodes()
    print("Loading Mesh Ontology")
    load_mesh_ontology()
    # Build relationships between Pubmed nodes and Mesh terms
    print("Linking Pubmed and Mesh")
    load_pubmed_mesh_ontology_relationships()
    # Build relationships between CT nodes and Pubmed Articles nodes 
    print("Linking Clinical Trials and Mesh")
    load_ct_pubmed_relationships()
    # merge to find external key for Mesh Terms related to CTs. Then load
    parse_ct_mesh_relation()
    load_ct_mesh_ontology_relationships()
    print('kg_master pubmed load end - ', datetime.datetime.now().isoformat())

def init():
    ct_init()
    pubmed_init()
    
os.environ['BUILDSTART']=str(time.time())
t = threading.Thread(target=init)
t.start()
t.join()
print('kg build complete, initiating pytest')

run_test()
