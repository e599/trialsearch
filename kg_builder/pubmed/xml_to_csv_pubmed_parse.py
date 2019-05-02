import os
import xml.etree.ElementTree as ET
import csv
import sys
import time
from lxml import etree
from kg_builder.conf.config import get_sys_config

# get file paths that will be used
kg_env = os.environ.get('KG_ENV')
xml_folder = get_sys_config('tmp_folder', kg_env)
csv_folder = get_sys_config('pubmed_csv_files_location', kg_env)
article_node_folder = csv_folder + '/articles'
article_mesh_folder = csv_folder + '/mesh'
article_ct_folder = csv_folder + '/ct'


def PubmedArticleParser(elem):

    PubMed = {"pmid": "",
              "url": "",
              "title" : "",
              "journal": "",
              "pub_date_year": "",
              "pub_date_month": "",
              "pub_date_day": ""}

    searchTermList = ('patient','Patient','volunteer', 'Volunteer', 'clinical trial', 'Clinical Trial', 'Clinical Trial')
    eligible = 0
    PubMedCTList = []
    PubMedMeshList = []
    # check if it's a valid pubmed article by looking for PMID
    PMID = elem.findtext('MedlineCitation/PMID')
    if PMID != None:
        PubMed['pmid'] = PMID
        # now we check to see if this article is worth including.
        # we include it if one of the search terms are found in the abstract - indicating that the paper references human subjects
        pubYear = elem.findtext('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year')
        if (pubYear != None):
            if (int(pubYear) >= 1990):
                PubMed["pub_date_year"] = pubYear
                abstract = elem.findtext('MedlineCitation/Article/Abstract/AbstractText')
                if abstract != None:
                    if any(term in abstract for term in searchTermList):
                        eligible = 1
                # we also include it if we can find an NCT number in the secondary IDs (with a subheader of clinicaltrials.gov)
                if elem.find('MedlineCitation/Article/DataBankList/DataBank/DataBankName') != None:
                    if elem.find('MedlineCitation/Article/DataBankList/DataBank/DataBankName').text == "ClinicalTrials.gov":
                        accessionNumberList = elem.findall(
                            'MedlineCitation/Article/DataBankList/DataBank/AccessionNumberList/AccessionNumber')
                        for number in accessionNumberList:
                            PubMedCT = {"pmid": PMID,
                                        "nct_id": number.text
                                        }
                            PubMedCTList.append(PubMedCT)
                        eligible = 1

        # if the trial is eligible, we parse out the rest of the fields.
        if eligible == 1:
            ChemicalList= elem.findall('MedlineCitation/ChemicalList/Chemical/NameOfSubstance')
            for chemical in ChemicalList:
                PubMedMesh = {"pmid": PMID,
                              "mesh_term" : chemical.text,
                              "type" : "chemList"
                              }
                PubMedMeshList.append(PubMedMesh)

            SupplMeshList= elem.findall('MedlineCitation/SupplMeshList/SupplMeshName')
            for suppMesh in SupplMeshList:
                PubMedMesh = {"pmid": PMID,
                              "mesh_term" : suppMesh.text,
                              "type" : "suppList"
                              }
                PubMedMeshList.append(PubMedMesh)

            MeshList= elem.findall('MedlineCitation/MeshHeadingList/MeshHeading')
            for mesh in MeshList:
                PubMedMesh = {"pmid": PMID,
                              "mesh_term" : mesh.findtext('./DescriptorName'),
                              "type" : "meshList"
                              }
                PubMedMeshList.append(PubMedMesh)

            PubMed["url"] = "https://www.ncbi.nlm.nih.gov/pubmed/" + PubMed['pmid']
            pubYear = elem.findtext('MedlineCitation/Article/Journal/JournalIssue/PubDate/Year')
            if pubYear != None:
                PubMed["pub_date_year"] = pubYear
            pubMonth = elem.findtext('MedlineCitation/Article/Journal/JournalIssue/PubDate/Month')
            if pubMonth != None:
                PubMed["pub_date_month"] = pubMonth
            pubDay = elem.findtext('MedlineCitation/Article/Journal/JournalIssue/PubDate/Day')
            if pubDay != None:
                PubMed["pub_date_day"] = pubDay
            journal  = elem.findtext('MedlineCitation/Article/Journal/Title')
            if journal != None:
                PubMed["journal"] = journal
            title = elem.findtext('MedlineCitation/Article/ArticleTitle')
            if title != None :
                PubMed["title"] = title
            return PubMed, PubMedCTList, PubMedMeshList
        else:
            return None, None, None
    else :
        return None, None, None


def xml_to_csv_pubmed_parser(filename):

    input_filename = filename +".xml"
    output_filename = filename

    xml_filename = os.path.join(xml_folder, input_filename)
    article_node_filename = os.path.join(article_node_folder, (output_filename + "_article.csv"))
    article_mesh_filename = os.path.join(article_mesh_folder, (output_filename + "_mesh.csv"))
    article_ct_filename = os.path.join(article_ct_folder, (output_filename+ "_ct.csv"))

    article_node_fields = ["pmid","url","title","journal","pub_date_year","pub_date_month","pub_date_day"]
    article_mesh_fields = ["pmid", "mesh_term", "type"]
    article_ct_fields = ["pmid", "nct_id"]


    if not os.path.exists(xml_folder):
        os.makedirs(xml_folder)
    if not os.path.exists(article_node_folder):
        os.makedirs(article_node_folder)
    if not os.path.exists(article_mesh_folder):
        os.makedirs(article_mesh_folder)
    if not os.path.exists(article_ct_folder):
        os.makedirs(article_ct_folder)

    with open (article_node_filename, 'w',encoding="utf-8") as article_node_file,  open (article_mesh_filename , 'w',encoding="utf-8") as article_mesh_file, open (article_ct_filename , 'w',encoding="utf-8") as article_ct_file :
        writer1 = csv.DictWriter(article_node_file, fieldnames=article_node_fields , quoting=csv.QUOTE_NONNUMERIC )
        writer1.writeheader()
        writer2 = csv.DictWriter(article_ct_file, fieldnames=article_ct_fields , quoting=csv.QUOTE_NONNUMERIC)
        writer2.writeheader()
        writer3 = csv.DictWriter(article_mesh_file, fieldnames=article_mesh_fields , quoting=csv.QUOTE_NONNUMERIC)
        writer3.writeheader()

        filename_without_extension, extension = os.path.splitext(input_filename)
        if extension == '.xml':
            with open(xml_filename, 'r',encoding="utf-8") as f:
                print("Processing : " + input_filename)
                start = time.time()
                context = etree.iterparse(xml_filename, tag='PubmedArticle', encoding = 'utf-8')
                for event, elem in context:
                    Pubmed, PubmedCT, PubmedMesh = PubmedArticleParser(elem)

                    if (Pubmed!= None):
                        writer1.writerow(Pubmed)

                    if (PubmedCT != None):
                        for CT in PubmedCT:
                            writer2.writerow(CT)

                    if (PubmedMesh != None):
                        for mesh in PubmedMesh:
                            writer3.writerow(mesh)

                    elem.clear()
                    if elem.getprevious() is not None:
                        del elem.getparent()[0]
                end = time.time()
                print(end-start)
                
