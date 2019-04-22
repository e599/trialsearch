import configparser
import os

config = configparser.ConfigParser()

config_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.ini')
config.read(config_path)


def get_sys_config(prop, label='LOCAL'):
    return config.get(label, prop)
