import os
import xml.etree.ElementTree as ET

from kg_builder.kg_path import ctxml_input_path
from kg_builder.ctxml.writers import set_output_folder
from kg_builder.ctxml.writers import initialize_node_writer_dict
from kg_builder.ctxml.writers import close_node_output_files
from kg_builder.ctxml.traverse import extract_xml_file_to_csv


def extract_xml_to_csv():
    try:
        set_output_folder()
        initialize_node_writer_dict()
        print(ctxml_input_path)
        for dirname, dirs, files in os.walk(ctxml_input_path):
            for filename in files:
                _, extension = os.path.splitext(filename)
                if extension != '.xml':
                    continue
                with open(os.path.join(dirname, filename), 'r', encoding="utf8") as f:
                    tree = ET.parse(f)
                    root = tree.getroot()

                    extract_xml_file_to_csv(root)
    finally:
        close_node_output_files()
