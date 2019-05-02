import os
import shutil
import pandas as pd

from kg_builder.geolocate.geolocator import Geolocator

from kg_builder.util.kg_path import project_path
from kg_builder.util.kg_path import munge_stage_01
from kg_builder.util.kg_path import munge_stage_03

from kg_builder.util.kg_path import location_filename

munge_source_stage_path = os.path.join(project_path, munge_stage_01)
munge_dest_stage_path = os.path.join(project_path, munge_stage_03)

g = Geolocator()

name = 0
ziplocation = 0
city = 0
state = 0
country = 0
noresult = 0
noresult_locations = []


def process_data():
    """Master function that executes the module."""
    add_gps_properties_to_location_nodes()


def get_gps_dict(row):
    """Gets the latitude and longitude for a location."""
    global name
    global ziplocation
    global city
    global state
    global country
    global noresult

    # Tries a complete lookup first.
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

    # Zip code is more precise than city, but only available for U.S.
    if str(row["country"]) == "United States":
        gps_dict = g.find_gps_zip(ziplocation=str(row["zip"]))
        if gps_dict:
            ziplocation += 1
            return gps_dict

    # Tries less precise lookups until a match is made.
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

    # Stores non-matches to print to the console later.
    noresult += 1
    noresult_locations.append({
        "new_id:ID": row["new_id:ID"],
        "name": row["name"],
        "city": row["city"],
        "state": row["state"],
        "country": row["country"],
        "zip": row["zip"],
    })
    return None


def get_lat(row):
    """Gets the latitude from the row's GPS data."""
    gps_dict = row["gps_dict"]
    if gps_dict and "LAT" in gps_dict:
        return gps_dict["LAT"]
    return None


def get_lng(row):
    """Gets the longitude from the row's GPS data."""
    gps_dict = row["gps_dict"]
    if gps_dict and "LNG" in gps_dict:
        return gps_dict["LNG"]
    return None


def add_gps_properties_to_location_nodes():
    """Adds latitude and longitude attributes to the Location nodes."""

    # Fetches the Location node data for us to modify.
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

    # Retrieves the GPS coordinates via the Geolocator module
    # and re-exports the GPS-enhanced Location node data.
    df["gps_dict"] = df.apply(get_gps_dict, axis=1)
    df["lat"] = df.apply(get_lat, axis=1)
    df["lng"] = df.apply(get_lng, axis=1)
    df["lat"] = df["lat"].astype(float)
    df["lng"] = df["lng"].astype(float)
    df.drop(["gps_dict"], axis=1)
    df = df[
        ["new_id:ID", "name", "zip", "city", "state", "country", "lat", "lng", ":LABEL"]
    ]
    df = df.sort_values(by=["name"])
    df.to_csv(
        munge_dest_stage_path
        + "/"
        + munge_stage_03
        + "_"
        + location_filename,
        index=False,
    )

    # Lets us see the overall match type tallies for our Location data.
    print("gps results for name: " + str(name))
    print("gps results for zip: " + str(ziplocation))
    print("gps results for city: " + str(city))
    print("gps results for state: " + str(state))
    print("gps results for country: " + str(country))
    print("no gps results : " + str(noresult))
    for location in noresult_locations:
        print(location)
