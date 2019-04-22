import re


def get_valid_text(text):
    text = text.strip()
    if text and not text.isspace():
        return text
    return None


def is_missing_field(field_name, xml_path_set_dict, tree):
    content = tree.find(xml_path_set_dict[field_name])
    return content is None or content.text.isspace()


def remove_duplicate_spaces(string):
    return re.sub(" +", " ", string)


def remove_newline(string):
    return string.replace("\n", "")


def trim(string):
    return string.strip()


def clean(string):
    return trim(
        remove_newline(
            remove_duplicate_spaces(string)
        )
    )
