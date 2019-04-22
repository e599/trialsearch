import os
import shutil
import csv
import hashlib

from kg_builder.kg_path import project_path
from kg_builder.kg_path import csv_output_folder
from kg_builder.ctxml.specs import ct_spec_dict
from kg_builder.ctxml.parsers import parse_node
from kg_builder.ctxml.parsers import parse_relationship

combine_headers_and_values = True
print_clinical_trial_node_write_counts = True
print_relationship_write_counts = False
clinical_trial_nodes_written = 0
relationships_written = 0

ctxml_stage_path = os.path.join(project_path, csv_output_folder)
writer_dict = {}


def set_output_folder():
    if os.path.isdir(ctxml_stage_path):
        shutil.rmtree(ctxml_stage_path)
    os.mkdir(ctxml_stage_path)


def get_uuid(string):
    return hashlib.md5(string.encode()).hexdigest()


def increment_clinical_trial_nodes_written():
    global clinical_trial_nodes_written
    clinical_trial_nodes_written += 1
    print("node:         ", clinical_trial_nodes_written)


def increment_relationships_written():
    global relationships_written
    relationships_written += 1
    print("relationship: ", relationships_written)


def initialize_node_writer_dict():
    for node_label in ct_spec_dict:
        writer_dict[node_label] = {}
        writer_dict[node_label]["last_id_written"] = None


def get_writer(node_label):
    try:
        return writer_dict[node_label]["writer"]
    except KeyError:
        node_writer_dict = {}
        node_label_spec_dict = ct_spec_dict[node_label]
        filename_prefix = node_label_spec_dict["csv_filename_prefix"]
        fieldnames = node_label_spec_dict["field_names"]

        if combine_headers_and_values:
            filename_suffix = ".csv"
        else:
            filename_suffix = "-data.csv"

        node_writer_dict["file"] = open(
            ctxml_stage_path
            + "/"
            + filename_prefix
            + filename_suffix, "w"
        )
        writer = csv.DictWriter(
            node_writer_dict["file"],
            fieldnames=fieldnames,
            quoting=csv.QUOTE_NONNUMERIC,
        )

        if combine_headers_and_values:
            writer.writeheader()
        else:
            header_file = open(
                ctxml_stage_path
                + "/"
                + filename_prefix
                + "-header.csv", "w"
            )
            csv.DictWriter(
                header_file,
                fieldnames=fieldnames,
                quoting=csv.QUOTE_NONNUMERIC,
            ).writeheader()
            header_file.close()

        node_writer_dict["writer"] = writer
        writer_dict[node_label] = node_writer_dict
        return writer


def close_node_output_files():
    for node_label in writer_dict:
        writer_dict[node_label]["file"].close()


def write_node(
    node_label,
    xml_path_set,
    tree,
    required_fields=[],
    require_one_of_fields=[],
    fields_to_clean=[],
):
    data_dict = parse_node(
        node_label,
        xml_path_set,
        tree,
        required_fields,
        require_one_of_fields,
        fields_to_clean,
    )
    if data_dict:
        to_hash = ""
        for name in ct_spec_dict[node_label]["field_names"]:
            if name in data_dict:
                to_hash += data_dict[name]
            else:
                to_hash += "[missing_field]"
        node_id = get_uuid(to_hash + node_label)
        data_dict["new_id:ID"] = node_id
        data_dict[":LABEL"] = node_label
        write_csv_row(node_label, data_dict)
        writer_dict[node_label]["last_id_written"] = node_id
        if node_label == "ClinicalTrial":
            if print_clinical_trial_node_write_counts:
                increment_clinical_trial_nodes_written()
        return node_id
    writer_dict[node_label]["last_id_written"] = None
    return None


def write_xml_relationship(
    subject_node_label,
    relationship_xml_path,
    tree,
    default_relationship,
    predicate_node_label,
):
    relationship_type = parse_relationship(
        relationship_xml_path,
        tree,
    )
    if relationship_type is None:
        relationship_type = default_relationship
    write_relationship(
        subject_node_label,
        relationship_type,
        predicate_node_label,
    )


def write_relationship(
    subject_node_label,
    relationship_type,
    predicate_node_label,
):
    subject_node_id = writer_dict[subject_node_label]["last_id_written"]
    predicate_node_id = writer_dict[predicate_node_label]["last_id_written"]
    if subject_node_id and predicate_node_id:
        write_relationship_via_ids(
            writer_dict[subject_node_label]["last_id_written"],
            relationship_type,
            writer_dict[predicate_node_label]["last_id_written"],
        )


def write_relationship_via_ids(
        subject_node_id,
        relationship_type,
        predicate_node_id,
):
    d = {
        ":START_ID": subject_node_id,
        ":END_ID": predicate_node_id,
        ":TYPE": relationship_type,
    }
    write_csv_row("Relationship", d)
    if print_relationship_write_counts:
        increment_relationships_written()


def write_csv_row(
    node_label,
    data_dict,
):
    get_writer(node_label).writerow(data_dict)
