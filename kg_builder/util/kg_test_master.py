import os
import threading
import time

from kg_builder.conf.config import get_sys_config
from kg_builder.util.kg_data import extract
from kg_builder.util.kg_utils import download_and_unzip
from kg_builder.util.kg_load import load
from kg_builder.util.kg_test import run_test
from kg_builder.pubmed.pubmed_get import process_pubmed


def init():
    """Master function to build the graph database from a
    fresh download of clinicaltrials.gov's complete set of XML files."""
    kg_env = os.environ.get('KG_ENV')
    download_src_files = get_sys_config('download_src_files', kg_env)
    download_url = get_sys_config('download_url', kg_env)

    if download_src_files:

        # Downloads the file from the web (and overwrites, if necessary).
        print("Downloading source files...")
        #download_and_unzip(url=download_url)

    # Extract and munge (transform).
    print("Extract...")
    #extract()
    
    # Load.
    print("Load graph...")
    #load()

    # Process Pubmed nodes
    process_pubmed()

os.environ['BUILDSTART']=str(time.time())
t = threading.Thread(target=init)
t.start()
t.join()
print('kg build complete, initiating pytest')

run_test()

