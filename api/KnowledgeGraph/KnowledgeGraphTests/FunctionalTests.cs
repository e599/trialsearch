using KnowledgeGraphSdk;
using KnowledgeGraphSdk.Models;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Rest;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;

namespace KnowledgeGraphTests
{
    [TestClass]
    public class FunctionalTests
    {
        private const string c_sAppUrl = "http://localhost:53936";
        private const string c_sAppToken = "[Token]";

        [TestMethod]
        public async System.Threading.Tasks.Task VerifySuccessAsync() {
            HttpResponseMessage responseMessage;
            SearchResponse response;

            // Arrange
            ServiceClientCredentials serviceClientCredentials = new TokenCredentials(c_sAppToken);
            KnowledgeGraphSdkClient client = new KnowledgeGraphSdkClient(new Uri(c_sAppUrl), serviceClientCredentials);

            // Get            
            responseMessage = await client.HttpClient.GetAsync($"{c_sAppUrl}/v1/search/test");
            Assert.AreEqual(responseMessage.StatusCode, HttpStatusCode.OK);
            response = JsonConvert.DeserializeObject<SearchResponse>(responseMessage.Content.AsString());
            Assert.IsTrue(response.Page == 0); // TODO
        }
    }
}
