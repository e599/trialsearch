"""Text cleaning functions, mostly."""

import re


def get_valid_text(text):
    """Returns trimmed, non-whitespace-only text."""
    text = text.strip()
    if text and not text.isspace():
        return text
    return None


def is_missing_field(field_name, xml_path_set_dict, tree):
    """Returns True if field_name is missing from tree."""
    content = tree.find(xml_path_set_dict[field_name])
    return content is None or content.text.isspace()


def remove_duplicate_spaces(string):
    """Removes duplicate spaces from a string."""
    return re.sub(" +", " ", string)


def remove_newline(string):
    """Removes newlines from a string."""
    return re.sub("\n", "", string)


def trim(string):
    """Removes leading and trailing spaces from a string."""
    return string.strip()


def clean(string):
    """Returns trimmed, single-spaced string w/o newline chars."""
    return trim(
        remove_newline(
            remove_duplicate_spaces(string)
        )
    )
