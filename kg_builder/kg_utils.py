import os
import shutil
from kg_builder.conf.config import get_sys_config
import urllib.request
import zipfile

# Downloads and unzips a file from a url
#download_and_unzip(url='http://danericweiner.com/AllPublicXML.zip')


#output file: file that url zip will be named
#output_path: location of extracted zip
def download_and_unzip(url):
    kg_env = os.environ.get('KG_ENV')
    output_file = get_sys_config('source_files_location', kg_env) + "/output.zip"
    output_path = get_sys_config('source_files_location', kg_env)

    if os.path.isdir(output_path):
        shutil.rmtree(output_path)
    os.mkdir(output_path)

    try:
        urllib.request.urlretrieve(url, output_file)
    except Exception as e:
        print('DownloadAndUnzip download failed! ' + str(e))
        return

    zip_ref = zipfile.ZipFile(output_file, 'r')
    zip_ref.extractall(output_path)
    zip_ref.close()


