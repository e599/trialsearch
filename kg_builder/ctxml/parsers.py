"""XML parsing functions."""

from kg_builder.ctxml.specs import full_spec_dict
from kg_builder.ctxml.specs import relationship_enum_dict
from kg_builder.ctxml.helpers import get_valid_text
from kg_builder.ctxml.helpers import is_missing_field
from kg_builder.ctxml.helpers import clean


def fetch_node_from_tree(xml_path_set_dict, tree):
    """Returns a node's element names and values from an XML tree."""
    d = {}
    for k, v in xml_path_set_dict.items():
        text = fetch_xml_from_tree(v, tree)
        if text:
            d[k] = text
    return d


def fetch_xml_from_tree(xml_path, tree):
    """Returns the value of an element in an XML tree."""
    element = tree.find(xml_path)
    if element is None:
        return None
    text = element.text
    text = get_valid_text(text)
    if text is None:
        return None
    return text


def parse_node(node_label, xml_path_set, tree,
               required_fields=[], require_one_of_fields=[], fields_to_clean=[]):
    """Provides a wrapper for fetch_node_from_tree with optional validation and cleaning."""
    xml_path_set_dict = full_spec_dict[node_label]["xml_path_sets"][xml_path_set]

    # All required fields must be present.
    for field in required_fields:
        if is_missing_field(field, xml_path_set_dict, tree):
            return None

    # At least one require_one_of_fields fields must be present.
    if require_one_of_fields:
        has_field = False
        for field in require_one_of_fields:
            if not is_missing_field(field, xml_path_set_dict, tree):
                has_field = True
                break

        if not has_field:
            return None

    # Fetches node only after passing optional validation.
    node_content_dict = fetch_node_from_tree(xml_path_set_dict, tree)

    # Cleans requested fields.
    for field in fields_to_clean:
        if field in node_content_dict:
            node_content_dict[field] = clean(node_content_dict[field])

    return node_content_dict


def parse_relationship(relationship, tree):
    """Fetches relationship from XML."""
    text = fetch_xml_from_tree(
        full_spec_dict["Relationship"]["relationship_xml_paths"][relationship],
        tree,
    )
    if text in relationship_enum_dict:
        return relationship_enum_dict[text]
    else:
        return text
