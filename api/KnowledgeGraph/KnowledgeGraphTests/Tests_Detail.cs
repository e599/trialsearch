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
    /// Test all objects returned from the API via a Detail request.
    /// </summary>
    [TestClass]
    public class Tests_Detail
    {
        private KnowledgeGraphSdkClient Client { get; } = new KnowledgeGraphSdkClient(new Uri(TestConstants.BaseUrl), new TokenCredentials("[Token]"));

        [TestMethod]
        public async Task Parameters_Detail() {
            DetailResponseInfo oDetail = await Client.GetDetailResponseAsync("249698aef50fc0f6565cf0004bc1a52e");
            Assert.AreEqual(oDetail.StatusCode, HttpStatusCode.OK);

            DetailResponse oResponse = oDetail.DetailResponse;
            Assert.IsTrue(oResponse.BriefSummary.Length > 0);
            Assert.IsTrue(oResponse.BriefTitle.Length > 0);
            Assert.IsTrue(oResponse.CriteriaText.Length > 0);
            Assert.IsTrue(oResponse.MaximumAge.Length > 0);
            Assert.IsTrue(oResponse.MinimumAge.Length > 0);
            Assert.IsTrue(oResponse.NctId.Length > 0);
            Assert.IsTrue(oResponse.NewId.Length > 0);
            Assert.IsTrue(oResponse.OfficialTitle.Length > 0);
            Assert.IsTrue(oResponse.OrgStudyId.Length > 0);
            Assert.IsTrue(oResponse.OverallStatus.Length > 0);
            Assert.IsTrue(oResponse.StartDate.Length > 0);
            Assert.IsTrue(oResponse.StartYear.Length > 0);
            Assert.IsTrue(oResponse.StudyType.Length > 0);
            Assert.IsTrue(oResponse.Url.Length > 0);
            Assert.IsTrue(oResponse.Locations.Count > 0);

            Assert.IsTrue(oResponse.AgeRanges.Count == 2);
            Assert.IsTrue(oResponse.Conditions.Count == 1);
            Assert.IsTrue(oResponse.Contacts.Count == 1);
            Assert.IsTrue(oResponse.Genders.Count == 2);
            Assert.IsTrue(oResponse.HealthyVolunteers.Count == 1);
            Assert.IsTrue(oResponse.Interventions.Count == 2);
            Assert.IsTrue(oResponse.Locations.Count == 1);
            Assert.IsTrue(oResponse.Sponsors.Count == 1);
        }

        [TestMethod]
        public async Task Parameters_FailedEmpty() {
            DetailResponseInfo oDetail = await Client.GetDetailResponseAsync("");
            Assert.AreEqual(oDetail.StatusCode, HttpStatusCode.NotFound);
        }

        [TestMethod]
        public async Task Parameters_FailedNotFound() {
            ErrorResponseInfo oError = await Client.GetDetailErrorResponseAsync("doesnotexist");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.NotFound);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 6);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "new_id");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "doesnotexist");
        }

        [TestMethod]
        public async Task Parameters_ProperlyEscaped() {
            ErrorResponseInfo oError = await Client.GetDetailErrorResponseAsync("%26^%26*(%26^(*%26$%%26^%*%26");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.NotFound);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 6);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "new_id");
            Assert.IsTrue(oError.ErrorResponse.ParameterValue == "&^&*(&^(*&$%&^%*&");
        }

        [TestMethod]
        public async Task Parameters_FailedNull() {
            ErrorResponseInfo oError = await Client.GetDetailErrorResponseAsync("  ?test");
            Assert.AreEqual(oError.StatusCode, HttpStatusCode.BadRequest);
            Assert.IsTrue(oError.ErrorResponse.ErrorNumber == 1);
            Assert.IsTrue(oError.ErrorResponse.ParameterName == "new_id");
        }
    }
}
