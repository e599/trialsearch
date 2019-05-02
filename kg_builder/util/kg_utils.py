import os
import shutil

import urllib.request
import zipfile

from kg_builder.conf.config import get_sys_config


def download_and_unzip(url):
    """ Downloads and unzips a file from a url."""
    kg_env = os.environ.get('KG_ENV')

    # File that url zip will be named.
    output_file = get_sys_config('source_files_location', kg_env) + "/output.zip"

    # Location of extracted zip.
    output_path = get_sys_config('source_files_location', kg_env)

    if os.path.isdir(output_path):
        shutil.rmtree(output_path)
    os.mkdir(output_path)

    try:
        urllib.request.urlretrieve(url, output_file)
    except Exception as e:
        print('DownloadAndUnzip download failed! ' + str(e))
        return

    # Stack Overflow citation for next 3 lines:
    # https://stackoverflow.com/questions/54747460/how-to-decode-an-encoded-zipfile-using-python
    zip_ref = zipfile.ZipFile(output_file, 'r')
    zip_ref.extractall(output_path)
    zip_ref.close()
