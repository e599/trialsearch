import csv
import sys
import collections
import re
import geocoder
import string


api_key = "NOT_A_KEY"
gps_filepath = "geolocate/gps_file.csv"
address_filepath = "geolocate/gps_file.csv"


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
    def __init__(self, gpsfile=gps_filepath, isgoogleapi=False, key='<api_key>'):
        self.gpsDictionary = collections.OrderedDict()
        self.isgoogleapi = isgoogleapi
        self.key = key
        self.gpsfile = gpsfile
        self.parse_gps_file()

    # imports a gps csv into a dictionary
    def load_city_state_country_file(self, allcountry):
        try:
            with open(allcountry, 'r', encoding="utf8") as userFile:
                self.gpsDictionary = csv.DictReader(userFile)
                for row in self.gpsDictionary:
                    print(row)
        except Exception:
            print(self.apikey + " does not exist for api! exiting")
            sys.exit()

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


    # addme
    # imports a gps csv into a dictionary
    #def parse_gps_file(self):

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
                try:
                    # if a value was returned, write it to end of file and add it to dictionary
                    outfile.write('\n' + key + ',' + str(gps.get('LAT')) + ',' + str(gps.get('LNG')))
                    return filter_invalid_dictionary_responses(gps)
                except AttributeError:
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


# print('\n test code here. to use Geolocator, instantiate the class. gpsFile.csv is read in automatically')
# g = Geolocator()
#
# print('\n to look up from the dictionary, use find_gps_zip:')
# print(g.find_gps_zip(address='01031 '))
#
# print("\n it will return an OrderedDict with fields 'ADDR', 'LAT' and 'LNG'")
# print(g.find_gps_zip(address='99919-1234'))
#
# print("\n... or if a key doesn't exist, it currently returns None")
# print(g.find_gps_zip(address='key not here'))
#
#
# print("\nInput files must not include commas in addresses.")

#with open('D:\\KGraph-Milestone3\\kg_builder\\geolocate\\gps_file_to_upload_now.csv', encoding="utf8") as userFile:
#    with open('D:\\KGraph-Milestone3\\kg_builder\\geolocate\\outfile.csv', "a", encoding="utf8") as outfile:
#        g = Geolocator(gpsfile='D:\\KGraph-Milestone3\\kg_builder\\geolocate\gps_file.csv')
#       for row in userFile:
#           row_str = str(row)
#           out_row = str(row).replace('\n', '')
#           print(row_str)
#           #dictionary_string = str(row[2]+'|'+row[3]+'|'+row[5]).lower().replace(',', ' ')
#           gps = g.find_gps_from_geocoder(addr=row_str, key='<key>')
#            outfile.write('\n' + out_row + ',' + str(gps.get('LAT')) + ',' + str(gps.get('LNG')))


# appends a set of dictionary values to a new file
def convert_new_location_file(gps_file):
    try:
        with open(gps_file, 'r', encoding="utf8") as userFile:
            with open('gps_file.csv', "a", encoding="utf8") as output:
                gpsread = csv.DictReader(userFile)
                for row in gpsread:
                    #print(row)
                    if 'name' in row:
                        name = row['name']
                    else:
                        name = ''

                    if 'city' in row:
                        city = row['city']
                    else:
                        city = ''

                    if 'state' in row:
                        state = row['state']
                    else:
                        state = ''

                    if 'country' in row:
                        country = row['country']
                    else:
                        country = ''

                    if 'zip' in row:
                        ziplocation = row['zip']
                    else:
                        ziplocation = ''

                    if 'lat' in row:
                        lat = row['lat']
                    else:
                        lat = ''

                    if 'lng' in row:
                        lng = row['lng']
                    else:
                        lng = ''

                    key = remove_punctuation_from_str(name) + '|' + remove_punctuation_from_str(city) + '|' + \
                        remove_punctuation_from_str(state) + '|' + remove_punctuation_from_str(country) + '|' + \
                        remove_punctuation_from_str(ziplocation)

                    output.write('\n' + key + ',' + str(lat) + ',' + str(lng))

    except Exception as e:
        print(e.__doc__)

#convert_new_location_file('node_location_out_FINAL.csv')

# appends a set of dictionary values to a new file
def test_location_file(gps_file):

    print('test ordered dict values that should fail')
    print( filter_invalid_dictionary_responses( collections.OrderedDict([('ADDR', "abc"), ('LAT', 'dog'), ('LNG', 1)])))
    print( filter_invalid_dictionary_responses( collections.OrderedDict([('ADDR', "abc"), ('LAT', -90.000000001), ('LNG', 1)])))
    print( filter_invalid_dictionary_responses( collections.OrderedDict([('ADDR', "abc"), ('LAT', 90.000000001), ('LNG', 1)])))
    print(filter_invalid_dictionary_responses(collections.OrderedDict([('ADDR', "abc"), ('LAT', 1)])))
    print(filter_invalid_dictionary_responses(collections.OrderedDict([('ADDR', "abc"), ('LNG', 1)])))

    g = Geolocator(gpsfile='gps_file.csv')

    print('test zip codes, should succeed')
    print(g.find_gps_zip('30341'))
    print(g.find_gps_zip('02138'))

    print('test lookup values that should fail')
    print(g.find_gps_name('whoknows1'))
    print(g.find_gps_name('whoknows2'))
    print(g.find_gps_name('whoknows3'))

    print(g.find_gps_name('kansas city'))


    try:
        with open(gps_file, 'r', encoding="utf8") as userFile:

            gpsread = csv.DictReader(userFile)
            for row in gpsread:

                if 'name' in row:
                    name = row['name']
                else:
                    name = ''

                if 'city' in row:
                    city = row['city']
                else:
                    city = ''

                if 'state' in row:
                    state = row['state']
                else:
                    state = ''

                if 'country' in row:
                    country = row['country']
                else:
                    country = ''

                if 'zip' in row:
                    ziplocation = row['zip']
                else:
                    ziplocation = ''

                (g.find_gps_name(name, city, state, country, ziplocation))

    except Exception as e:
        print(e.__doc__)


#test_location_file('node_location_out_FINAL.csv')




# adds "SPACESHIP EARTH to end of file assuming it isn't present
def test_add_to_end():
    g = Geolocator(gpsfile='gps_file.csv', key="<api_key>")
    #try:
    print( g.find_gps_from_geocoder(addr='SPACESHIP EARTH'))
    print(g.find_gps_name('fjf3s90930 j93', 'sdf', '-30', '(*FE*(HF*E', ''))

    print(g.find_gps_name('SPACESHIP EARTH', '', '', '', ''))
    print(g.find_gps_name('HARVARD STATUE', '', '', '', ''))
    print(g.find_gps_name('fjf3s90930 j93', 'sdf', '-30', '(*FE*(HF*E', ''))
    #except Exception as e:
    #    print(e.__doc__)

#test_add_to_end()