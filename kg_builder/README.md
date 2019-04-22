# e599-KGraph

readXML1.py should work. It will create the nodes for sex and agency_class as well as for the clinical trials itself. 
Of note, it will only create a new clinical trial node if there isn't one with the same nct_id.
Also, it checks to ensure that each property field for the clinical trial node is present, if not it replaces it with blank (for now, someone can come up with a better plan later)


