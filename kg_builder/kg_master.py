from kg_builder.kg_data import extract
from kg_builder.kg_utils import download_and_unzip
from kg_builder.conf.config import get_sys_config
from kg_builder.kg_load import load
import os


def init():
    kg_env = os.environ.get('KG_ENV')
    download_src_files = get_sys_config('download_src_files', kg_env)
    download_url = get_sys_config('download_url', kg_env)

    if download_src_files:
        # download the file from the web - overwrite if necessary
        print("Downloading source files...")
        download_and_unzip(url=download_url)

    # extract
    print("Extract...")
    extract()

    # transform
    print("Transform...")
    
    # load
    print("Load graph...")
    load()


init()
