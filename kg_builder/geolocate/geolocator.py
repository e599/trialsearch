import csv
import sys
import collections
import re
import geocoder
import string

from kg_builder.util.kg_path import gps_filepath


# geolocator.py
# Constructor: gpsfile=<location of gps filepath>, key=<bing maps api key>):
# Creates a dictionary of lat lon locations from a file path. Performs a bing lookup if unsuccessful
# Query examples:
#     Find by (<location name>, <city>, <state>, <country>, <zip>
#     find_gps_name('University of Occupational and Environmental Health', 'KitakyushuYahatanishikuIseigaoka11',
#                   'Fukuoka', 'Japan', '8070804')
#     Directly Query Bing: <raw string to pass to Bing>
#     find_gps_from_geocoder(addr='JOHN HARVARD STATUE')
def remove_punctuation_from_str(val):
    return val.translate(str.maketrans('', '', string.punctuation))


def filter_invalid_dictionary_responses(dict_resp):
    if not isinstance( dict_resp, dict):
        return None

    if 'ADDR' in dict_resp:
        name = dict_resp['ADDR']
    else:
        return None

    if 'LAT' in dict_resp:
        try:
            lat = float(dict_resp['LAT'])
        except Exception:
            return None
        if lat < -90:
            return None
        if lat > 90:
            return None
    else:
        return None

    if 'LNG' in dict_resp:
        try:
            lng = float(dict_resp['LNG'])
        except Exception:
            return None
        if lng < -180:
            return None
        if lng > 180:
            return None
    else:
        return None

    return dict_resp


# > reads a csv file to obtain a dictionary of gps coordinates
# > if a value is not available, it can be looked up using google maps api
# > values that are looked up are written back to the csv file
# > class also can obtain distance between two coordinates
class Geolocator:
    def __init__(self, gpsfile=gps_filepath, key='<MAPS_API_KEY>'):
        self.gpsDictionary = collections.OrderedDict()
        self.key = key
        self.gpsfile = gpsfile
        self.parse_gps_file()

    # imports a gps csv into a dictionary
    def parse_gps_file(self):
        try:
            with open(self.gpsfile, 'r', encoding="utf8") as userFile:
                gpsread = csv.DictReader(userFile)
                for row in gpsread:
                    # print(row)
                    self.gpsDictionary[list(row.items())[0][1]] = row

        except Exception:
            print(self.gpsfile + " does not exist for geolocation! exiting")
            sys.exit()

    # returns just a zip code if string ends with ##### or #####-####
    # otherwise returns
    def get_reduced_zip(self, address):
        # strip trailing white space
        address = address.rstrip()

        # address must end with ##### or #####-####
        m = re.search(r'\d\d\d\d\d-\d\d\d\d$', address)
        if m:
            return address[m.pos:m.pos+5]

        m = re.search(r'\d\d\d\d\d$', address)
        if m:
            return address[m.pos:m.pos+5]

        return address

    # i have often walked upon that street before. but that pavement always stayed beneath my feet before
    def find_gps_name(self, name='', city='', state='', country='', ziplocation =''):
        # 'nan' will not access the correct value
        if name == 'nan':
            name = ''
        if city == 'nan':
            city = ''
        if state == 'nan':
            state = ''
        if country == 'nan':
            country = ''
        if ziplocation == 'nan':
            ziplocation = ''

        # only use the lowercase of the generated string
        key = remove_punctuation_from_str(name) + '|' + remove_punctuation_from_str(city) + '|' + \
            remove_punctuation_from_str(state) + '|' + remove_punctuation_from_str(country) + '|' + \
            remove_punctuation_from_str(ziplocation)

        # check dictionary for an entry
        dictionary_access = self.gpsDictionary.get(key)

        # if it exists, return it
        if dictionary_access is not None:
            return filter_invalid_dictionary_responses(dictionary_access)
        # else perform a lookup
        else:
            print("FINDING GPS FOR: " + key)
            with open(self.gpsfile, "a", encoding="utf8") as outfile:
                gps = self.find_gps_from_geocoder(addr=key)
                if gps and "LAT" in gps and "LNG" in gps:
                    # if a value was returned, write it to end of file and add it to dictionary
                    outfile.write('\n' + key + ',' + str(gps.get('LAT')) + ',' + str(gps.get('LNG')))
                    self.gpsDictionary[key] = gps
                    return filter_invalid_dictionary_responses(gps)
                else:
                    outfile.write('\n' + key + ',,')
                return None

    def find_gps_from_geocoder(self, addr='大阪市|osaka|japan'):
        try:
            g = geocoder.bing(addr, key=self.key)
            retval = collections.OrderedDict([('ADDR', addr), ('LAT', g.latlng[0]), ('LNG', g.latlng[1])])
        except Exception as e:
            print(e)
            return None
        return retval

    def find_gps_zip(self, ziplocation):
        reduced_zip = self.get_reduced_zip(ziplocation)

        # check dictionary for an entry
        return filter_invalid_dictionary_responses(self.gpsDictionary.get(reduced_zip))

