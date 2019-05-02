using KnowledgeGraphSdk;
using KnowledgeGraphSdk.Models;
using Microsoft.Rest;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Net;
using System.Threading.Tasks;

namespace KnowledgeGraphTests
{
    /// <summary>
    /// Test all objects returned from the API via a Search.
    /// </summary>
    [TestClass]
    public class Tests_Search
    {
        private KnowledgeGraphSdkClient Client { get; } = new KnowledgeGraphSdkClient(new Uri(TestConstants.BaseUrl), new TokenCredentials("[Token]"));

        [TestMethod]
        public async Task Parameters_SearchTerm() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("cancer");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);

            Assert.IsTrue(oSearch.SearchResponse.LastPage == false);
            Assert.IsTrue(oSearch.SearchResponse.Page == 1);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
            Assert.IsTrue(oSearch.SearchResponse.Results.Count == 25);

            ListClinicalTrial oClinicalTrial = oSearch.SearchResponse.Results[0];
            Assert.IsTrue(oClinicalTrial.BriefSummary.Length > 0);
            Assert.IsTrue(oClinicalTrial.BriefTitle.Length > 0);
            Assert.IsTrue(oClinicalTrial.CriteriaText.Length > 0);
            Assert.IsTrue(oClinicalTrial.MaximumAge.Length > 0);
            Assert.IsTrue(oClinicalTrial.MinimumAge.Length > 0);
            Assert.IsTrue(oClinicalTrial.NctId.Length > 0);
            Assert.IsTrue(oClinicalTrial.NewId.Length > 0);
            Assert.IsTrue(oClinicalTrial.OfficialTitle.Length > 0);
            Assert.IsTrue(oClinicalTrial.OrgStudyId.Length > 0);
            Assert.IsTrue(oClinicalTrial.OverallStatus.Length > 0);
            Assert.IsTrue(oClinicalTrial.StartDate.Length > 0);
            Assert.IsTrue(oClinicalTrial.StartYear.Length > 0);
            Assert.IsTrue(oClinicalTrial.StudyType.Length > 0);
            Assert.IsTrue(oClinicalTrial.Url.Length > 0);
            Assert.IsTrue(oClinicalTrial.Locations.Count > 0);

            ListLocation oLocation = oClinicalTrial.Locations[0];
            Assert.IsTrue(oLocation.Latitude != 0);
            Assert.IsTrue(oLocation.Longitude != 0);
        }

        [TestMethod]
        public async Task Parameters_AgeRange() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?age_range=child,adult,older_adult");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_ConditionId() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("cancer?condition_id=16ebc802e10b2dba16d063910f2b9ae5");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_HealthyVolunteers() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?healthy_volunteers=true");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_InterventionType() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?intervention_type=behavioral,biological,combination_product,device,diagnostic_test,dietary_supplement,drug,genetic,other,procedure,radiation");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_LatLngLatBottomLngRight() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?lat=42&lng=-95&lat_bottom=-90&lng_right=100");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_LatLngRadius() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?lat=42&radius=100&lng=-95");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults > 0);
        }

        [TestMethod]
        public async Task Parameters_LocationId() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("cancer?location_id=b9dafdefde857003bbdab867597b96c3");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_Paging() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?page=9");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.LastPage == true);
            Assert.IsTrue(oSearch.SearchResponse.NumResults < 25);
        }

        [TestMethod]
        public async Task Parameters_Phase() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?phase=n_a,phase1,phase2,phase3,phase4");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_Results() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?results=12");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.LastPage == false);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 12);
        }

        [TestMethod]
        public async Task Parameters_Sex() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?sex=male,female");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_SponsorId() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("cancer?sponsor_id=dd52021a3f94e16ab212d19bb5186d7d");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_StartYear() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?start_year=2015,2016");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_Status() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("rhinosinusitis?status=active_not_recruiting,completed,enrolling_by_invitation,not_yet_recruiting,recruiting,suspended,terminated,withdrawn,available,no_longer_available,temporarily_not_available,approved_for_marketing,withheld,unknown_status");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 25);
        }

        [TestMethod]
        public async Task Parameters_AllNonId() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("metastatic%20cancer?page=1&status=available,completed&phase=phase1,phase2,phase3&age_range=adult, child&lat=42&radius=100&lng=-95&results=25&intervention_type=behavioral&sex=female,male&start_year=2015&healthy_volunteers=false");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 1);
            Assert.IsTrue(oSearch.SearchResponse.Page == 1);
            Assert.IsTrue(oSearch.SearchResponse.LastPage == true);
            Assert.IsTrue(oSearch.SearchResponse.Results.Count == 1);
        }

        [TestMethod]
        public async Task Parameters_ProperlyEscaped() {
            SearchResponseInfo oSearch = await Client.GetSearchResponseAsync("''***'?condition_id=%26^%26*(%26^(*%26$%%26^%*%26'&sponsor_id=%26^%26*(%26^(*%26$%%26^%*%26'&location_id=%26^%26*(%26^(*%26$%%26^%*%26'");
            Assert.AreEqual(oSearch.StatusCode, HttpStatusCode.OK);
            Assert.IsTrue(oSearch.SearchResponse.NumResults == 0);
            Assert.IsTrue(oSearch.SearchResponse.Page == 1);
            Assert.IsTrue(oSearch.SearchResponse.LastPage == true);
            Assert.IsTrue(oSearch.SearchResponse.Results.Count == 0);
        }

        [TestMethod]
        public async Task Parameters_FailedUnrecognized() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("cancer/?notvalid=test");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 5);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "notvalid");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "test");
        }

        [TestMethod]
        public async Task Parameters_SearchTerm_FailedEmpty() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.NotFound);
        }

        [TestMethod]
        public async Task Parameters_SearchTerm_FailedNull() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync(" /");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 1);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "search_term");
        }

        [TestMethod]
        public async Task Parameters_AgeRange_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("cancer?age_range=child,adult,older_adultXX");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "age_range");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "older_adultXX");
        }

        [TestMethod]
        public async Task Parameters_ConditionId_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("cancer?condition_id=");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "condition_id");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "");
        }

        [TestMethod]
        public async Task Parameters_HealthyVolunteers_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?healthy_volunteers=truevalue");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "healthy_volunteers");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "truevalue");
        }

        [TestMethod]
        public async Task Parameters_InterventionType_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?intervention_type=behavioral,biological,combination_productX,device,diagnostic_test,dietary_supplement,drug,genetic,other,procedure,radiation");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "intervention_type");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "combination_productX");
        }

        [TestMethod]
        public async Task Parameters_LatLngLatBottomLngRight_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?lat=-180&lng=-95&lat_bottom=-90&lng_right=100");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "lat");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "-180");
        }

        [TestMethod]
        public async Task Parameters_LatLngRadius_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?lat=42&radius=10000&lng=-95");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "radius");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "10000");
        }

        [TestMethod]
        public async Task Parameters_LatLngRadius_FailedCombination() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?lat=42&radius=100&lng_right=100");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 7);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "lat, lng, radius, lat_bottom, lng_right");
        }

        [TestMethod]
        public async Task Parameters_LocationId_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("cancer?location_id=");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "location_id");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "");
        }

        [TestMethod]
        public async Task Parameters_Paging_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?page=0");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "page");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "0");
        }

        [TestMethod]
        public async Task Parameters_Phase_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?phase=n_a,phase1,phase2,phase3X,phase4");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "phase");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "phase3X");
        }

        [TestMethod]
        public async Task Parameters_Results_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?results=101");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "results");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "101");
        }

        [TestMethod]
        public async Task Parameters_Sex_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?sex=maleX,female");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "sex");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "maleX");
        }

        [TestMethod]
        public async Task Parameters_SponsorId_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("cancer?sponsor_id=");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "sponsor_id");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "");
        }

        [TestMethod]
        public async Task Parameters_StartYear_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?start_year=two,2016");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "start_year");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "two");
        }

        [TestMethod]
        public async Task Parameters_Status_FailedInvalid() {
            ErrorResponseInfo oError = await Client.GetSearchErrorResponseAsync("rhinosinusitis?status=active_not_recruiting,completed,enrolling_by_invitation,not_yet_recruiting,recruiting,suspended,terminated,withdrawn,available,no_longer_available,temporarily_not_available,approved_for_marketing,withheld,Xunknown_status");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 3);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "status");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "Xunknown_status");
        }
    }
}
