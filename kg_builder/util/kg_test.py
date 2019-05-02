import pytest
import os
import pathlib
import collections
import numpy as np
from py2neo import Graph
from kg_builder.conf.config import get_sys_config
from kg_builder.geolocate.geolocator import Geolocator

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import ctxml_extract_stage
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_02
from kg_builder.util.kg_path import munge_stage_03
from kg_builder.util.kg_path import munge_stage_04
from kg_builder.util.kg_path import munge_stage_05
from kg_builder.util.kg_path import munge_stage_06
from kg_builder.util.kg_path import munge_stage_98
from kg_builder.util.kg_path import load_csv_path

from kg_builder.util.kg_path import agency_filename
from kg_builder.util.kg_path import agency_class_filename
from kg_builder.util.kg_path import age_range_filename
from kg_builder.util.kg_path import clinical_trial_filename
from kg_builder.util.kg_path import condition_filename
from kg_builder.util.kg_path import contact_filename
from kg_builder.util.kg_path import enrollment_status_filename
from kg_builder.util.kg_path import healthy_volunteers_filename
from kg_builder.util.kg_path import intervention_filename
from kg_builder.util.kg_path import intervention_type_filename
from kg_builder.util.kg_path import location_filename
from kg_builder.util.kg_path import mesh_term_filename
from kg_builder.util.kg_path import mesh_term_type_filename
from kg_builder.util.kg_path import phase_filename
from kg_builder.util.kg_path import sex_filename
from kg_builder.util.kg_path import study_type_filename
from kg_builder.util.kg_path import year_filename
from kg_builder.util.kg_path import relationships_filename

path_initial_extract = os.path.join(project_path, ctxml_extract_stage)
path_01 = os.path.join(project_path, munge_stage_01)
path_02 = os.path.join(project_path, munge_stage_02)
path_03 = os.path.join(project_path, munge_stage_03)
path_04 = os.path.join(project_path, munge_stage_04)
path_05 = os.path.join(project_path, munge_stage_05)
path_06 = os.path.join(project_path, munge_stage_06)
path_98 = os.path.join(project_path, munge_stage_98)
path_csv = os.path.join(project_path, load_csv_path)
# path_to_graph_db = os.path.join(project_path, munge_stage_99)

path_01_agency = os.path.join(
    path_01,
    munge_stage_01 + "_" + agency_filename
)
path_01_agency_class = os.path.join(
    path_01,
    munge_stage_01 + "_" + agency_class_filename
)
path_01_clinical_trial = os.path.join(
    path_01,
    munge_stage_01 + "_" + clinical_trial_filename
)
path_01_condition = os.path.join(
    path_01,
    munge_stage_01 + "_" + condition_filename
)

path_01_contact = os.path.join(
    path_01,
    munge_stage_01 + "_" + contact_filename
)

path_01_enrollment_status = os.path.join(
    path_01,
    munge_stage_01 + "_" + enrollment_status_filename
)

path_01_healthy_volunteers = os.path.join(
    path_01,
    munge_stage_01 + "_" + healthy_volunteers_filename
)

path_01_intervention = os.path.join(
    path_01,
    munge_stage_01 + "_" + intervention_filename
)

path_01_intervention_type = os.path.join(
    path_01,
    munge_stage_01 + "_" + intervention_type_filename
)

path_01_location = os.path.join(
    path_01,
    munge_stage_01 + "_" + location_filename
)

path_01_phase = os.path.join(
    path_01,
    munge_stage_01 + "_" + phase_filename
)

path_01_study_type = os.path.join(
    path_01,
    munge_stage_01 + "_" + study_type_filename
)


# is file recent
# is file large enough
list_01 = np.array([[path_01_agency,                                                    10000000],
                    [path_01_agency_class,                                              238],
                    [path_01_clinical_trial,                                            686000000],
                    [path_01_condition,                                                 537000],
                    [os.path.join(path_01, '01_dedup_node_condition_mesh_term.csv'),    280000],
                    [path_01_contact,                                                   50490000],
                    [path_01_enrollment_status,                                         955],
                    [path_01_healthy_volunteers,                                        168],
                    [path_01_intervention,                                              18580000],
                    [os.path.join(path_01, '01_dedup_node_intervention_mesh_term.csv'), 241590],
                    [path_01_intervention_type,                                         708],
                    [path_01_location,                                                  88270000],
                    [path_01_phase,                                                     417],
                    [path_01_study_type,                                                325],
                    [os.path.join(path_01, '01_dedup_relationship_all.csv'),            613990000]])

list_02 = np.array([[os.path.join(path_02, '02_age_range_sex_node_age_range.csv'),      88],
                    [os.path.join(path_02, '02_age_range_sex_node_clinical_trial.csv'), 359228487],
                    [os.path.join(path_02, '02_age_range_sex_node_sex.csv'),            55],
                    [os.path.join(path_02, '02_age_range_sex_relationship_all.csv'),    373086839]])

list_03 = np.array([[os.path.join(path_03, '03_geolocate_node_location.csv'), 60274161]])

list_04 = np.array([[os.path.join(path_04, '04_mesh_term_type_node_mesh_term.csv'),      228776],
                    [os.path.join(path_04, '04_mesh_term_type_node_mesh_term_type.csv'), 73],
                    [os.path.join(path_04, '04_mesh_term_type_relationship_all.csv'),    368665177]])

list_05 = np.array([[os.path.join(path_05, '05_year_node_clinical_trial.csv'),  360276844],
                    [os.path.join(path_05, '05_year_node_year.csv'),            1451],
                    [os.path.join(path_05, '05_year_relationship_all.csv'),     380768683]])

list_98 = np.array([[os.path.join(path_98, '98_pick_fields_node_clinical_trial.csv'), 357877029],
    [os.path.join(path_98, '98_pick_fields_node_location.csv'), 54659113]])

#                                           CSV NAME                        MIN SIZE    DB NODE NAME
list_csv = np.array([[os.path.join(path_csv, 'node_age_range.csv'),         150,        "AgeRange"],
                    [os.path.join(path_csv, 'node_agency.csv'),             10000000,   "Agency"],
                    [os.path.join(path_csv, 'node_agency_class.csv'),       200,        "AgencyClass"],
                    [os.path.join(path_csv, 'node_clinical_trial.csv'),     364968279,  "ClinicalTrial"],
                    [os.path.join(path_csv, 'node_condition.csv'),          5000,       "Condition"],
                    [os.path.join(path_csv, 'node_contact.csv'),            50000,      "Contact"],
                    [os.path.join(path_csv, 'node_enrollment_status.csv'),  500,        "EnrollmentStatus"],
                    [os.path.join(path_csv, 'node_healthy_volunteers.csv'), 100,        "HealthyVolunteers"],
                    [os.path.join(path_csv, 'node_intervention.csv'),       10000,      "Intervention"],
                    [os.path.join(path_csv, 'node_intervention_type.csv'),  500,        "InterventionType"],
                    [os.path.join(path_csv, 'node_location.csv'),           100000000,  "Location"],
                    [os.path.join(path_csv, 'node_mesh_term.csv'),          400,        "MeshTerm"],
                    [os.path.join(path_csv, 'node_mesh_term_type.csv'),     120,        "MeshTermType"],
                    [os.path.join(path_csv, 'node_phase.csv'),              200,        "Phase"],
                    [os.path.join(path_csv, 'node_sex.csv'),                100,        "Sex"],
                    [os.path.join(path_csv, 'node_study_type.csv'),         200,        "StudyType"],
                    [os.path.join(path_csv, 'node_year.csv'),               2000,       "Year"],
                    [os.path.join(path_csv, 'relationship_all.csv'),        394411160,  ""]])


def test_existence_01():
    for item in list_01:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_existence_02():
    for item in list_02:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_existence_03():
    for item in list_03:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_existence_04():
    for item in list_04:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_existence_05():
    for item in list_05:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_existence_98():
    for item in list_98:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_existence_csv():
    for item in list_csv:
        print('does ' + item[0] + ' exist')
        assert os.path.isfile(item[0])


def test_recent_modification_01():
    for item in list_01:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_recent_modification_02():
    for item in list_02:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_recent_modification_03():
    for item in list_03:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_recent_modification_04():
    for item in list_04:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_recent_modification_05():
    for item in list_05:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_recent_modification_98():
    for item in list_98:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_recent_modification_csv():
    for item in list_csv:
        print('was ' + item[0] + ' recently modified')
        assert(os.path.getmtime(item[0]) > float(os.environ['BUILDSTART']))


def test_size_01():
    for item in list_01:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


def test_size_02():
    for item in list_02:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


def test_size_03():
    for item in list_03:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


def test_size_04():
    for item in list_04:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


def test_size_05():
    for item in list_05:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


def test_size_98():
    for item in list_98:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


def test_size_csv():
    for item in list_csv:
        print('is ' + item[0] + ' bigger than ' + item[1])
        assert(os.path.getsize(item[0]) >= int(item[1]))


# ensure at least a certain number of database nodes have been created according to list_csv above
def test_database_node_totals():
    kg_env = os.environ.get('KG_ENV')
    host = get_sys_config('host', kg_env)
    user = get_sys_config('user', kg_env)
    password = get_sys_config('password', kg_env)
    graph = Graph(host=host, user=user, password=password)

    # count length of csv file
    for item in list_csv:
        if item[2]:
            with open(item[0]) as f:
                # get the length of csv node files minus 1 for the header
                csv_length = sum(1 for line in f) - 1
                node_total = graph.evaluate("MATCH (a:" + item[2] + ") RETURN count(a)")
                print(item[0] + ' CSV:' + str(csv_length) + ' NODE TOTAL:' + str(node_total))
                assert(csv_length == node_total)


def test_geocode():
    def check_lat_long_against_known(received, expected):
        if not received:
            assert 0

        if received['LAT'] != expected['LAT']:
            assert 0

        if received['LNG'] != expected['LNG']:
            assert 0

    g = Geolocator()

    # test zip code
    location = g.find_gps_zip('01031         ')
    check_lat_long_against_known(location, collections.OrderedDict([('LAT', '42.329399'), ('LNG', ' -72.198187')]))

    location = g.find_gps_zip('99919-1234    ')
    check_lat_long_against_known(location, collections.OrderedDict([('LAT', '55.645594'), ('LNG', '-132.496820')]))

    # test obtaining a location that exists

    # test gps lookup but do not write to gps file
    location = g.find_gps_from_geocoder(addr='JOHN HARVARD STATUE')
    check_lat_long_against_known(location, collections.OrderedDict([('LAT', 42.37316131591797),
                                                                    ('LNG', -71.11811828613281)]))

    location = g.find_gps_name('University of Occupational and Environmental Health',
                               'KitakyushuYahatanishikuIseigaoka11', 'Fukuoka', 'Japan', '8070804')
    check_lat_long_against_known(location, collections.OrderedDict([('LAT', '33.8600006103516'),
                                                                    ('LNG', '130.759994506836')]))

    # test finding a name that we know is invalid.
    bad = g.find_gps_from_geocoder(addr='')
    assert bad is None


def run_test():
    print(os.environ['BUILDSTART'])
    pytest.main()
