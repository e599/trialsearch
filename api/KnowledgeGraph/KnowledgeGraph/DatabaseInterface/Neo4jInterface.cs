using KnowledgeGraph.Common;
using KnowledgeGraph.DatabaseObjects;
using KnowledgeGraph.Exceptions;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using static KnowledgeGraph.Common.CUtilities;

namespace KnowledgeGraph.DatabaseInterface
{
    /// <summary>
    /// 
    /// </summary>
    public class Neo4jInterface
    {
        private static IGraphClient m_oClient = null;
        private readonly DataTransferObjects.Settings m_oSettings;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="settings"></param>
        public Neo4jInterface(DataTransferObjects.Settings settings) {
            m_oSettings = settings;
            ClientInitialize(settings.DatabaseConnectionString, settings.DatabaseUserName, settings.DatabasePassword);
        }

        private void ClientInitialize(string connection, string username, string password) {
            try {
                if (m_oClient == null) {
                    m_oClient = new GraphClient(new Uri(connection), username, password);
                    m_oClient.Connect();
                    CreateTextSearchIndex(Constants.CurrentEnvironment != eEnvironment.Staging);
                }
            } catch (Exception ex) when (NotKGException(ex)) {
                m_oClient = null;
                throw new DatabaseConnectionKGException(ex, nameof(Neo4jInterface), nameof(ClientInitialize));
            }
        }

        private void CreateTextSearchIndex(bool forceRecreate = false) {
            try {
                bool bIndexExists = IndexExists(Constants.TextSearchIndexName);
                if (bIndexExists && forceRecreate) {
                    m_oClient.Cypher.Call($"db.index.fulltext.drop('{Constants.TextSearchIndexName}')").ExecuteWithoutResults();
                }
                if (!bIndexExists || forceRecreate) {
                    List<string> lstStringFieldNames = JsonNames<ClinicalTrialNode>(typeof(string)).Where(n => $"|{Constants.TextSearchIndexExcludedFields}|".IndexOf($"|{n}|") == -1).ToList<string>();
                    m_oClient.Cypher.Call($"db.index.fulltext.createNodeIndex('{Constants.TextSearchIndexName}',['{Nodes.ClinicalTrial}'],[{lstStringFieldNames.PrintQuotedDelimited()}], {{eventually_consistent: true}})").ExecuteWithoutResults();
                    m_oClient.Cypher.Call($"db.index.fulltext.awaitIndex('{Constants.TextSearchIndexName}')").ExecuteWithoutResults();
                }
            } catch (Exception ex) when (NotKGException(ex)) {
                if (Constants.CurrentEnvironment != eEnvironment.Production) {
                    throw new ServerErrorKGException(ex, nameof(Neo4jInterface), nameof(CreateTextSearchIndex));
                }
            }
        }

        private bool IndexExists(string indexName) {
            try {
                long iCount = m_oClient.Cypher
                                   .Call("db.indexes()")
                                   .Yield("indexName AS name")
                                   .Where($"name = '{indexName}'")
                                   .Return<long>("COUNT(name)")
                                   .Results
                                   .FirstOrDefault();
                return iCount > 0;
            } catch (Exception ex) when (NotKGException(ex)) {
                if (Constants.CurrentEnvironment != eEnvironment.Production) {
                    throw new ServerErrorKGException(ex, nameof(Neo4jInterface), nameof(IndexExists));
                }
                return false;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchRequest"></param>
        /// <returns></returns>
        public DataTransferObjects.SearchResponse GetClinicalTrialsList(DataTransferObjects.SearchRequestDefaulted searchRequest) {
            try {
                ClinicalTrialNode[] oClinicalTrialNodes = GetClinicalTrialNodes(searchRequest);
                DataTransferObjects.SearchResponse oSearchResponse = GetSearchResponse(oClinicalTrialNodes, searchRequest);

                return oSearchResponse;
            } catch (Exception ex) when (NotKGException(ex)) {
                throw new ServerErrorKGException(ex, nameof(Neo4jInterface), nameof(GetClinicalTrialsList));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="new_id"></param>
        /// <returns></returns>
        public DataTransferObjects.DetailResponse GetClinicalTrialDetail(string new_id) {
            try {

                ClinicalTrialDetailNode oClinicalTrialDetailNode = GetClinicalTrialDetailNode(new_id);
                if (oClinicalTrialDetailNode == null) { throw new ResourceNotFoundKGException(nameof(new_id), new_id); }

                DataTransferObjects.DetailResponse oDetailResponse = GetDetailResponse(oClinicalTrialDetailNode);

                return oDetailResponse;
            } catch (Exception ex) when (NotKGException(ex)) {
                throw new ServerErrorKGException(ex, nameof(Neo4jInterface), nameof(GetClinicalTrialDetail));
            }
        }

        private ClinicalTrialNode[] GetClinicalTrialNodes(DataTransferObjects.SearchRequestDefaulted searchRequest) {
            ClinicalTrialNode[] oClinicalTrialNodes = null;

            try {
                CreateTextSearchIndex();

                oClinicalTrialNodes = m_oClient.Cypher
                    .KGCallYield_Search(searchRequest)
                    .KGMatch_Radius(searchRequest)
                    .KGMatch_BoundingBox(searchRequest)
                    .KGMatch_AllGenders(searchRequest)
                    .KGMatch_Status(searchRequest)
                    .KGMatch_Phase(searchRequest)
                    .KGMatch_AgeRange(searchRequest)
                    .KGMatch_InterventionType(searchRequest)
                    .KGMatch_HealthyVolunteers(searchRequest)
                    .KGMatch_ConditionId(searchRequest)
                    .KGMatch_LocationId(searchRequest)
                    .KGMatch_SponsorId(searchRequest)
                    .KGMatch_StartYear(searchRequest)
                    .KGWith_CollectResults(searchRequest)
                    .Return<ClinicalTrialNode>("c")
                    .KGSkipLimit_Paging(searchRequest)
                    .Results.ToArray();
            } catch (Exception ex) when (NotKGException(ex)) {
                if (Constants.CurrentEnvironment != eEnvironment.Production) {
                    throw new ServerErrorKGException(ex, nameof(Neo4jInterface), nameof(GetClinicalTrialNodes));
                }
            }
            return oClinicalTrialNodes;
        }

        private ClinicalTrialDetailNode GetClinicalTrialDetailNode(string new_id) {
            ClinicalTrialDetailNode oClinicalTrialNode = null;
            try {
                oClinicalTrialNode = m_oClient.Cypher
                    .Match($"(c:{Nodes.ClinicalTrial})")
                    .KGWhere_ID(new_id)
                    .KGWith_CollectDetail()
                    .Return<ClinicalTrialDetailNode>("c")
                    .Limit(1)
                    .Results.FirstOrDefault();
            } catch (Exception ex) when (NotKGException(ex)) {
                if (Constants.CurrentEnvironment != eEnvironment.Production) {
                    throw new ServerErrorKGException(ex, nameof(Neo4jInterface), nameof(GetClinicalTrialDetailNode));
                }
            }
            return oClinicalTrialNode;
        }

        private DataTransferObjects.SearchResponse GetSearchResponse(ClinicalTrialNode[] clinicalTrialNodes, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            DataTransferObjects.SearchResponse oSearchResponse = new DataTransferObjects.SearchResponse();

            int lResultsReturned = (clinicalTrialNodes?.Length ?? 0);
            int lNumResults = Math.Min(lResultsReturned, (int)searchRequest.Results);

            oSearchResponse.Results = GetClinicalTrialsResponse(clinicalTrialNodes?.Take(lNumResults).ToArray());
            oSearchResponse.Page = searchRequest.Page;
            oSearchResponse.NumResults = lNumResults;
            oSearchResponse.LastPage = lResultsReturned <= searchRequest.Results;

            return oSearchResponse;
        }

        private DataTransferObjects.ListClinicalTrial[] GetClinicalTrialsResponse(ClinicalTrialNode[] clinicalTrialNodes) {
            List<DataTransferObjects.ListClinicalTrial> lstResults = new List<DataTransferObjects.ListClinicalTrial>();
            if (clinicalTrialNodes == null) { return lstResults.ToArray(); }
            foreach (ClinicalTrialNode oClinicalTrialNode in clinicalTrialNodes) {
                DataTransferObjects.ListClinicalTrial oClinicalTrial = new DataTransferObjects.ListClinicalTrial() {
                    NewId = oClinicalTrialNode.NewId,
                    NctId = oClinicalTrialNode.NctId,
                    OrgStudyId = oClinicalTrialNode.OrgStudyId,
                    Url = oClinicalTrialNode.Url,
                    BriefTitle = oClinicalTrialNode.BriefTitle,
                    OfficialTitle = oClinicalTrialNode.OfficialTitle,
                    BriefSummary = oClinicalTrialNode.BriefSummary,
                    OverallStatus = oClinicalTrialNode.OverallStatus,
                    Phase = oClinicalTrialNode.Phase,
                    StudyType = oClinicalTrialNode.StudyType,                    
                    MinimumAge = oClinicalTrialNode.MinimumAge,
                    MaximumAge = oClinicalTrialNode.MaximumAge,                    
                    StartDate = oClinicalTrialNode.StartDate,
                    StartYear = oClinicalTrialNode.StartYear,                   
                    CriteriaText = oClinicalTrialNode.CriteriaText,
                    Locations = GetListLocationResponse(oClinicalTrialNode.Locations)
                };
                lstResults.Add(oClinicalTrial);
            }
            return lstResults.ToArray();
        }

        private DataTransferObjects.ListLocation[] GetListLocationResponse(LocationElement[] locationElements) {
            if (locationElements == null) { return null; }

            List<DataTransferObjects.ListLocation> lstLocations = new List<DataTransferObjects.ListLocation>();
            foreach (LocationElement oLocationElement in locationElements) {
                if (double.TryParse(oLocationElement.Lat, out double dLatitude)
                && double.TryParse(oLocationElement.Lng, out double dLongitude)) {
                    DataTransferObjects.ListLocation oLocation = new DataTransferObjects.ListLocation() {
                        Latitude = dLatitude,
                        Longitude = dLongitude
                    };
                    lstLocations.Add(oLocation);
                }
            }
            return lstLocations.ToArray();
        }

        private DataTransferObjects.DetailResponse GetDetailResponse(ClinicalTrialDetailNode clinicalTrialDetailNode) {
            return new DataTransferObjects.DetailResponse() {
                NewId = clinicalTrialDetailNode.NewId,
                NctId = clinicalTrialDetailNode.NctId,
                OrgStudyId = clinicalTrialDetailNode.OrgStudyId,
                Url = clinicalTrialDetailNode.Url,
                BriefTitle = clinicalTrialDetailNode.BriefTitle,
                OfficialTitle = clinicalTrialDetailNode.OfficialTitle,
                BriefSummary = clinicalTrialDetailNode.BriefSummary,
                OverallStatus = clinicalTrialDetailNode.OverallStatus,
                Phase = clinicalTrialDetailNode.Phase,
                StudyType = clinicalTrialDetailNode.StudyType,
                MinimumAge = clinicalTrialDetailNode.MinimumAge,
                MaximumAge = clinicalTrialDetailNode.MaximumAge,
                StartDate = clinicalTrialDetailNode.StartDate,
                StartYear = clinicalTrialDetailNode.StartYear,
                CriteriaText = clinicalTrialDetailNode.CriteriaText,
                AgeRanges = GetDetailAgeRangesResponse(clinicalTrialDetailNode.AgeRanges),
                Conditions = GetDetailConditionsResponse(clinicalTrialDetailNode.Conditions),
                Contacts = GetDetailContactsResponse(clinicalTrialDetailNode.Contacts),
                Genders = GetDetailGendersResponse(clinicalTrialDetailNode.Genders),
                HealthyVolunteers = GetDetailHealthyVolunteersResponse(clinicalTrialDetailNode.HealthyVolunteers),
                Interventions = GetDetailInterventionsResponse(clinicalTrialDetailNode.Interventions),                
                Locations = GetDetailLocationsResponse(clinicalTrialDetailNode.Locations),
                MeshTerms = GetDetailMeshTermsResponse(clinicalTrialDetailNode.MeshTerms),
                Sponsors = GetDetailSponsorsResponse(clinicalTrialDetailNode.Sponsors)                                
            };
        }

        private DataTransferObjects.DetailAgeRange[] GetDetailAgeRangesResponse(AgeRangeElement[] ageRangeElements) {
            if (ageRangeElements == null) { return null; }
            List<DataTransferObjects.DetailAgeRange> lstAgeRanges = new List<DataTransferObjects.DetailAgeRange>();
            foreach (AgeRangeElement oAgeRangeElement in ageRangeElements) {                
                DataTransferObjects.DetailAgeRange oAgeRange = new DataTransferObjects.DetailAgeRange() {
                    AgeRange = oAgeRangeElement.AgeRange.ToString()
                };
                lstAgeRanges.Add(oAgeRange);
            }
            return lstAgeRanges.ToArray();
        }

        private DataTransferObjects.DetailCondition[] GetDetailConditionsResponse(ConditionElement[] conditionElements) {
            if (conditionElements == null) { return null; }
            List<DataTransferObjects.DetailCondition> lstConditions = new List<DataTransferObjects.DetailCondition>();
            foreach (ConditionElement oConditionElement in conditionElements) {
                DataTransferObjects.DetailCondition oCondition = new DataTransferObjects.DetailCondition() {
                    NewId = oConditionElement.NewId,
                    Condition = oConditionElement.Condition
                };
                lstConditions.Add(oCondition);
            }
            return lstConditions.ToArray();
        }

        private DataTransferObjects.DetailContact[] GetDetailContactsResponse(ContactElement[] contactElements) {
            if (contactElements == null) { return null; }
            List<DataTransferObjects.DetailContact> lstContacts = new List<DataTransferObjects.DetailContact>();
            foreach (ContactElement oContactElement in contactElements) {
                DataTransferObjects.DetailContact oContact = new DataTransferObjects.DetailContact() {
                    NewId = oContactElement.NewId,
                    FirstName = oContactElement.FirstName,
                    MiddleName = oContactElement.MiddleName,
                    LastName = oContactElement.LastName,
                    Degrees = oContactElement.Degrees,
                    Phone = oContactElement.Phone,
                    PhoneExt = oContactElement.PhoneExt,
                    Email = oContactElement.Email,
                    NameTitle = oContactElement.NameTitle,
                    InvestigatorFullName = oContactElement.InvestigatorFullName,
                    InvestigatorTitle = oContactElement.InvestigatorTitle
                };
                lstContacts.Add(oContact);
            }
            return lstContacts.ToArray();
        }

        private DataTransferObjects.DetailSex[] GetDetailGendersResponse(GenderElement[] genderElements) {
            if (genderElements == null) { return null; }
            List<DataTransferObjects.DetailSex> lstGenders = new List<DataTransferObjects.DetailSex>();
            foreach (GenderElement oGenderElement in genderElements) {
                DataTransferObjects.DetailSex oGender = new DataTransferObjects.DetailSex() {
                    NewId = oGenderElement.NewId,
                    Gender = oGenderElement.Gender.ToString()
                };
                lstGenders.Add(oGender);
            }
            return lstGenders.ToArray();
        }

        private DataTransferObjects.DetailHealthyVolunteers[] GetDetailHealthyVolunteersResponse(HealthyVolunteerElement[] healthyVolunteerElements) {
            if (healthyVolunteerElements == null) { return null; }
            List<DataTransferObjects.DetailHealthyVolunteers> lstHealthyVolunteers = new List<DataTransferObjects.DetailHealthyVolunteers>();
            foreach (HealthyVolunteerElement oHealthyVolunteerElement in healthyVolunteerElements) {
                DataTransferObjects.DetailHealthyVolunteers oHealthyVolunteer = new DataTransferObjects.DetailHealthyVolunteers() {
                    NewId = oHealthyVolunteerElement.NewId,
                    HealthyVolunteers = oHealthyVolunteerElement.HealthyVolunteers.ToString()
                };
                lstHealthyVolunteers.Add(oHealthyVolunteer);
            }
            return lstHealthyVolunteers.ToArray();
        }

        private DataTransferObjects.DetailIntervention[] GetDetailInterventionsResponse(InterventionElement[] interventionElements) {
            if (interventionElements == null) { return null; }
            List<DataTransferObjects.DetailIntervention> lstInterventions = new List<DataTransferObjects.DetailIntervention>();
            foreach (InterventionElement oInterventionElement in interventionElements) {
                DataTransferObjects.DetailIntervention oIntervention = new DataTransferObjects.DetailIntervention() {
                    NewId = oInterventionElement.NewId,
                    InterventionName = oInterventionElement.InterventionName
                };
                lstInterventions.Add(oIntervention);
            }
            return lstInterventions.ToArray();
        }
        
        private DataTransferObjects.DetailLocation[] GetDetailLocationsResponse(LocationElement[] locationElements) {
            if (locationElements == null) { return null; }
            List<DataTransferObjects.DetailLocation> lstLocations = new List<DataTransferObjects.DetailLocation>();
            foreach (LocationElement oLocationElement in locationElements) {
                DataTransferObjects.DetailLocation oLocation = new DataTransferObjects.DetailLocation() {
                    NewId = oLocationElement.NewId,
                    Name = oLocationElement.Name,
                    City = oLocationElement.City,
                    State = oLocationElement.State,
                    Country = oLocationElement.Country,
                    Zip = oLocationElement.Zip,
                    Lat = oLocationElement.Lat,
                    Lng = oLocationElement.Lng
                };
                lstLocations.Add(oLocation);
            }
            return lstLocations.ToArray();
        }

        private DataTransferObjects.DetailMeshTerm[] GetDetailMeshTermsResponse(MeshTermElement[] MeshTermElements) {
            if (MeshTermElements == null) { return null; }
            List<DataTransferObjects.DetailMeshTerm> lstMeshTerms = new List<DataTransferObjects.DetailMeshTerm>();
            foreach (MeshTermElement oMeshTermElement in MeshTermElements) {
                DataTransferObjects.DetailMeshTerm oMeshTerm = new DataTransferObjects.DetailMeshTerm() {
                    NewId = oMeshTermElement.NewId,
                    MeshTerm = oMeshTermElement.MeshTerm
                };
                lstMeshTerms.Add(oMeshTerm);
            }
            return lstMeshTerms.ToArray();
        }

        private DataTransferObjects.DetailAgency[] GetDetailSponsorsResponse(SponsorElement[] sponsorElements) {
            if (sponsorElements == null) { return null; }
            List<DataTransferObjects.DetailAgency> lstSponsors = new List<DataTransferObjects.DetailAgency>();
            foreach (SponsorElement oSponsorElement in sponsorElements) {
                DataTransferObjects.DetailAgency oSponsor = new DataTransferObjects.DetailAgency() {
                    NewId = oSponsorElement.NewId,
                    Agency = oSponsorElement.Agency
                };
                lstSponsors.Add(oSponsor);
            }
            return lstSponsors.ToArray();
        }
            
        private bool NotKGException(Exception e) {
            return !(e is KGException);
        }
    }
}
