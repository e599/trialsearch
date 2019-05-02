using KnowledgeGraphSdk;
using KnowledgeGraphSdk.Models;
using Microsoft.Rest;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace KnowledgeGraphTests
{
    /// <summary>
    /// Class extensions for the Client object used for performing tests.
    /// </summary>
    public static class TestExtensions
    {
        /// <summary>
        /// Make a request to the search endpoint.
        /// </summary>
        /// <param name="knowledgeGraphSdkClient">The client.</param>
        /// <param name="urlComponent">The component to be added to the base url.</param>
        /// <returns>The search response info.</returns>
        public static async Task<SearchResponseInfo> GetSearchResponseAsync(this KnowledgeGraphSdkClient knowledgeGraphSdkClient, string urlComponent) {
            HttpResponseMessage oMessage = await knowledgeGraphSdkClient.HttpClient.GetAsync($"{TestConstants.SearchUrl}/{urlComponent}");
            SearchResponse oResponse = JsonConvert.DeserializeObject<SearchResponse>(oMessage.Content.AsString());
            return new SearchResponseInfo(oResponse, oMessage.StatusCode);
        }

        /// <summary>
        /// Make a request to the detail endpoint.
        /// </summary>
        /// <param name="knowledgeGraphSdkClient">The client.</param>
        /// <param name="urlComponent">The component to be added to the base url.</param>
        /// <returns>The search response info.</returns>
        public static async Task<DetailResponseInfo> GetDetailResponseAsync(this KnowledgeGraphSdkClient knowledgeGraphSdkClient, string urlComponent) {
            HttpResponseMessage oMessage = await knowledgeGraphSdkClient.HttpClient.GetAsync($"{TestConstants.DetailUrl}/{urlComponent}");
            DetailResponse oResponse = JsonConvert.DeserializeObject<DetailResponse>(oMessage.Content.AsString());
            return new DetailResponseInfo(oResponse, oMessage.StatusCode);
        }

        /// <summary>
        /// Make a request to the search endpoint that will likely result in an error.
        /// </summary>
        /// <param name="knowledgeGraphSdkClient">The client.</param>
        /// <param name="urlComponent">The component to be added to the base url.</param>
        /// <returns>The error response info.</returns>
        public static async Task<ErrorResponseInfo> GetSearchErrorResponseAsync(this KnowledgeGraphSdkClient knowledgeGraphSdkClient, string urlComponent) {
            HttpResponseMessage oMessage = await knowledgeGraphSdkClient.HttpClient.GetAsync($"{TestConstants.SearchUrl}/{urlComponent}");
            ErrorResponse oResponse = JsonConvert.DeserializeObject<ErrorResponse>(oMessage.Content.AsString());
            return new ErrorResponseInfo(oResponse, oMessage.StatusCode);
        }

        /// <summary>
        /// Make a request to the detail endpoint that will likely result in an error.
        /// </summary>
        /// <param name="knowledgeGraphSdkClient">The client.</param>
        /// <param name="urlComponent">The component to be added to the base url.</param>
        /// <returns>The error response info.</returns>
        public static async Task<ErrorResponseInfo> GetDetailErrorResponseAsync(this KnowledgeGraphSdkClient knowledgeGraphSdkClient, string urlComponent) {
            HttpResponseMessage oMessage = await knowledgeGraphSdkClient.HttpClient.GetAsync($"{TestConstants.DetailUrl}/{urlComponent}");
            ErrorResponse oResponse = JsonConvert.DeserializeObject<ErrorResponse>(oMessage.Content.AsString());
            return new ErrorResponseInfo(oResponse, oMessage.StatusCode);
        }
    }
}
