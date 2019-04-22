import os
import shutil
import pandas as pd

from kg_builder.geolocate.geolocator import Geolocator
from kg_builder.kg_path import project_path
from kg_builder.kg_path import munge_stage_01
from kg_builder.kg_path import munge_stage_03

munge_source_stage_path = os.path.join(project_path, munge_stage_01)
munge_dest_stage_path = os.path.join(project_path, munge_stage_03)

location_filename = "node_location.csv"
g = Geolocator()

name = 0
city = 0
state = 0
country = 0
ziplocation = 0
noresult = 0


def process_data():
    add_gps_properties_to_location_nodes()


def get_gps_dict(row):
    global name
    global city
    global state
    global country
    global ziplocation
    global noresult

    gps_dict = g.find_gps_name(
        name=str(row["name"]),
        city=str(row["city"]),
        state=str(row["state"]),
        country=str(row["country"]),
        ziplocation=str(row["zip"]),
    )
    if gps_dict:
        name += 1
        return gps_dict
    gps_dict = g.find_gps_name(
        city=str(row["city"]),
        state=str(row["state"]),
        country=str(row["country"]),
        ziplocation=str(row["zip"]),
    )
    if gps_dict:
        city += 1
        return gps_dict
    gps_dict = g.find_gps_name(
        state=str(row["state"]),
        country=str(row["country"]),
        ziplocation=str(row["zip"]),
    )
    if gps_dict:
        state += 1
        return gps_dict
    gps_dict = g.find_gps_name(
        country=str(row["country"]),
        ziplocation=str(row["zip"]),
    )
    if gps_dict:
        country += 1
        return gps_dict
    gps_dict = g.find_gps_zip(ziplocation=str(row["zip"]))
    if gps_dict:
        zip += 1
        return gps_dict
    noresult += 1
    return None


def get_lat(row):
    gps_dict = row["gps_dict"]
    if gps_dict and "LAT" in gps_dict:
        return gps_dict["LAT"]
    return None


def get_lng(row):
    gps_dict = row["gps_dict"]
    if gps_dict and "LNG" in gps_dict:
        return gps_dict["LNG"]
    return None


def add_gps_properties_to_location_nodes():
    shutil.copyfile(
        munge_source_stage_path
        + "/"
        + munge_stage_01
        + "_"
        + location_filename,
        munge_dest_stage_path
        + "/"
        + munge_stage_03
        + "_"
        + location_filename,
    )
    df = pd.read_csv(
        munge_source_stage_path
        + "/"
        + munge_stage_01
        + "_"
        + location_filename,
    )
    df = pd.DataFrame(
        df,
        columns=["new_id:ID", "name", "zip", "city", "state", "country", ":LABEL"]
    )
    df["gps_dict"] = df.apply(get_gps_dict, axis=1)
    df["lat"] = df.apply(get_lat, axis=1)
    df["lng"] = df.apply(get_lng, axis=1)
    df["lat"] = df["lat"].astype(float)
    df["lng"] = df["lng"].astype(float)
    df.drop(["gps_dict"], axis=1)
    df = df[
        ["new_id:ID", "name", "zip", "city", "state", "country", "lat", "lng", ":LABEL"]
    ]
    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_03
        + "_"
        + location_filename,
        index=False,
    )
    print("gps results for name: " + str(name))
    print("gps results for city: " + str(city))
    print("gps results for state: " + str(state))
    print("gps results for country: " + str(country))
    print("gps results for zip: " + str(ziplocation))
    print("no gps results : " + str(noresult))
