"""CSV file writing functions."""

import os
import shutil
import csv
import hashlib

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import ctxml_extract_stage
from kg_builder.ctxml.specs import full_spec_dict
from kg_builder.ctxml.parsers import parse_node
from kg_builder.ctxml.parsers import parse_relationship

print_parent_node_write_counts = True
print_relationship_write_counts = False
print_frequency = 1000
parent_nodes_written = 0
relationships_written = 0

xml_path = os.path.join(project_path, ctxml_extract_stage)
parent_node_label = None
writer_dict = {}


def set_and_clear_output_folder():
    """Creates or empties the CSV output file folder."""
    if os.path.isdir(xml_path):
        shutil.rmtree(xml_path)
    os.mkdir(xml_path)


def get_uuid(string):
    """Provides a unique ID for each distinct input string
    Used to identify distinct nodes and relationships.
    Identical nodes/relationships will get identical IDs."""
    return hashlib.md5(string.encode()).hexdigest()


def print_parent_nodes_written():
    """Prints parent nodes written."""
    global parent_nodes_written
    parent_nodes_written += 1
    if parent_nodes_written % print_frequency == 0:
        print("node:         ", parent_nodes_written)


def print_relationships_written():
    """Prints relationships written."""
    global relationships_written
    relationships_written += 1
    if relationships_written % print_frequency == 0:
        print("relationship: ", relationships_written)


def initialize_node_writer_dict():
    """Since each node type has its own CSV output file,
    this function creates a key for each node label in the writer dict."""
    for node_label in full_spec_dict:
        writer_dict[node_label] = {}


def initialize_node_writer_dict_ids():
    """Prior to traversing each XML file, we need to clear out all IDs
    from the previous XML file so that a relationship cannot be
    actively created between two nodes from different files.
    (We say "actively" because relationships with degrees of separation
    will form between different XML files will as we traverse them)."""
    for node_label in full_spec_dict:
        writer_dict[node_label]["last_id_written"] = None


def get_writer(node_label):
    """Creates or retrieves the file writer for the node type."""
    try:
        return writer_dict[node_label]["writer"]
    except KeyError:
        node_writer_dict = {}
        node_spec_dict = full_spec_dict[node_label]

        # Knowledge of which node is the parent node is used
        # to optionally print the number of parent nodes written.
        if "is_parent_node" in node_spec_dict:
            global parent_node_label
            parent_node_label = node_label

        filename_prefix = node_spec_dict["csv_filename_prefix"]
        fieldnames = node_spec_dict["field_names"]
        filename_suffix = ".csv"
        node_writer_dict["file"] = open(
            xml_path
            + "/"
            + ctxml_extract_stage
            + "_"
            + filename_prefix
            + filename_suffix, "w"
        )
        writer = csv.DictWriter(
            node_writer_dict["file"],
            fieldnames=fieldnames,
            quoting=csv.QUOTE_NONNUMERIC,
        )
        writer.writeheader()
        node_writer_dict["writer"] = writer
        writer_dict[node_label] = node_writer_dict
        return writer


def close_node_output_files():
    """Closes all CSV output files."""
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
    """Writes parsed XML data to the node's CSV file."""
    data_dict = parse_node(
        node_label,
        xml_path_set,
        tree,
        required_fields,
        require_one_of_fields,
        fields_to_clean,
    )

    # data_dict will come back empty if none of the node's attributes
    # are found in the xml_path_set or if one of the validations
    # based on the optional parameters fails. See parse_node.
    if data_dict:

        # A hash of all the node's attributes concatenated
        # is used to produce identical hash values for identical nodes.
        # This practice allows for easy deduplication in post-processing.
        to_hash = ""
        for name in full_spec_dict[node_label]["field_names"]:
            if name in data_dict:
                to_hash += data_dict[name]
            else:
                to_hash += "[missing_field]"

        # Includes node label in the hash to produce different hash values
        # for identical attribute sets under different node labels.
        # (Doesn't apply currently but still good to set it up that way now).
        node_id = get_uuid(to_hash + node_label)
        data_dict["new_id:ID"] = node_id
        data_dict[":LABEL"] = node_label
        write_csv_row(node_label, data_dict)
        writer_dict[node_label]["last_id_written"] = node_id
        if print_parent_node_write_counts and node_label == parent_node_label:
            print_parent_nodes_written()
        return node_id

    # If the xml_path_set is empty for a node, we must clear the last ID written
    # for that type of node so that a new relationship does not get formed with the
    # most recent node of the same type that didn't come back empty.
    writer_dict[node_label]["last_id_written"] = None
    return None


def write_xml_relationship(
    subject_node_label,
    relationship_xml_path,
    tree,
    default_relationship,
    predicate_node_label,
):
    """Writes parsed XML data to the relationships CSV file."""
    relationship_type = parse_relationship(
        relationship_xml_path,
        tree,
    )

    if relationship_type is None:

        # We still want to write the relationship even
        # though we didn't have the XML data
        # to tell us the more precise sub-type of it.
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
    """Writes to the relationships CSV file
    a relationship between the respective last nodes traversed
    of the subject and predicate node types."""
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
    """Writes a relationship between two node IDs to the relationships CSV file."""
    d = {
        ":START_ID": subject_node_id,
        ":END_ID": predicate_node_id,
        ":TYPE": relationship_type,
    }
    write_csv_row("Relationship", d)
    if print_relationship_write_counts:
        print_relationships_written()


def write_csv_row(
    node_label,
    data_dict,
):
    """Writes data to the node's (or all-relationships') CSV file."""
    get_writer(node_label).writerow(data_dict)
