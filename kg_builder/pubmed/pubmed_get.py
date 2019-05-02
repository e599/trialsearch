import re
import urllib.request
import urllib.error
import gzip
import shutil
import os
from kg_builder.pubmed.xml_to_csv_pubmed_parse import xml_to_csv_pubmed_parser
from kg_builder.conf.config import get_sys_config


def download_extract_pubmed():
    # get file paths that will be used
    kg_env = os.environ.get('KG_ENV')
    output_path = get_sys_config('tmp_folder', kg_env)
    csv_path = get_sys_config('pubmed_csv_files_location', kg_env) + '/articles'
    csv_filelist = ''

    # build string containing csv files
    #csv
    for r, d, f in os.walk(csv_path):
        for filename in f:
            if 'article.csv' in filename:
#                print(filename)
                csv_filelist = csv_filelist + str(filename) + ','

    csv_filelist = csv_filelist.replace('_article.csv', '.xml.gz')

    # article index to start parsing at
    pubmed_index_start = 350
    num_pubmed_inex_skipped = 0

    # store as variable
    url = "ftp://ftp.ncbi.nlm.nih.gov/pubmed/baseline/"

    # get a list of all xml.gz files
    gz_list = str(urllib.request.urlopen(url).read()).replace('\\r', ' ')

    ftp_file_list = re.findall(r'[0-9a-zA-Z]+[.]xml[.]gz ', gz_list)

    if ftp_file_list:
        for filename in ftp_file_list:
            # strip remaining space at end of regex
            filename = filename.strip()
            # don't process the file if it has already been processed
            if csv_filelist.__contains__(filename):
                print(filename.replace('.xml.gz', '') + 'exists in csv format! skipping')
                continue

            # insert try except here
            article_index = int(filename.replace('pubmed19n', '').replace('.xml.gz', ''))

            # do not process older articles
            if article_index < pubmed_index_start:
                num_pubmed_inex_skipped = num_pubmed_inex_skipped + 1
                continue

            file_out_download_path = output_path + '/' + filename
            file_out_extract_path = output_path + '/' + filename.replace('.gz', '')

            # attempt to download each file
            print("downloading: " + filename)
            try:
                urllib.request.urlretrieve(url+filename, file_out_download_path)
            except urllib.error.HTTPError as e:
                print("could not download " + filename + " error code: " + e.code)
                continue
            except urllib.error.URLError as e:
                print("could not download " + filename + " " + e.reason)
                continue

            # unzip each file
            with gzip.open(file_out_download_path, 'rb') as f_in:
                with open(file_out_extract_path, 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)

            # call XMLtoCSV_Pubmed_Parse.py on each
            filename = filename.replace('.xml.gz', '')
            print("xml_to_csv_pubmed_parser " + filename)
            xml_to_csv_pubmed_parser(filename)

            # clean up files that were just downloaded
            os.remove(file_out_download_path)
            os.remove(file_out_extract_path)
    else:
        print("PUBMED DOWNLOAD FAILED! Could not download archive at " + url)

