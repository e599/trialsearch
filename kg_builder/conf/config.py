# Use config.py to load a property value based on the environment
# the property name along with its value is defined in config.ini

import configparser
import os

config = configparser.ConfigParser()

config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
config.read(config_path)


# function to get a property from config.ini
def get_sys_config(prop, label='LOCAL'):
    return config.get(label, prop)
