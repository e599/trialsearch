import os
import xml.etree.ElementTree as ET

from kg_builder.util.kg_path import ctxml_input_path
from kg_builder.ctxml.writers import set_and_clear_output_folder
from kg_builder.ctxml.writers import initialize_node_writer_dict
from kg_builder.ctxml.writers import initialize_node_writer_dict_ids
from kg_builder.ctxml.writers import close_node_output_files
from kg_builder.ctxml.traverse import extract_xml_file


def process_data():
    """Top-level function that extracts XML files into CSV files."""
    try:
        set_and_clear_output_folder()
        initialize_node_writer_dict()
        print(ctxml_input_path)
        for dirname, dirs, files in os.walk(ctxml_input_path):
            for filename in files:
                _, extension = os.path.splitext(filename)
                if extension != '.xml':
                    continue
                initialize_node_writer_dict_ids()
                with open(os.path.join(dirname, filename), 'r', encoding="utf8") as f:
                    tree = ET.parse(f)
                    root = tree.getroot()

                    extract_xml_file(root)
    finally:
        close_node_output_files()
