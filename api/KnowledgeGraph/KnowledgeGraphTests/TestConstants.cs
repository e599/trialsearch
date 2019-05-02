using KnowledgeGraphSdk.Models;
using System.Net;

namespace KnowledgeGraphTests
{

    /// <summary>
    /// Constants used for all tests.
    /// </summary>
    public static class TestConstants
    {
        public const string BaseUrl = "http://localhost:53936";
        public const string SearchUrl = BaseUrl + "/v1/search";
        public const string DetailUrl = BaseUrl + "/v1/trial";
    }

    /// <summary>
    /// A response object for Search endpoint to hold status and object returned.
    /// </summary>
    public class SearchResponseInfo
    {
        public SearchResponse SearchResponse { get; }
        public HttpStatusCode StatusCode { get; }

        public SearchResponseInfo(SearchResponse searchResponse, HttpStatusCode statusCode) {
            SearchResponse = searchResponse;
            StatusCode = statusCode;
        }
    }

    /// <summary>
    /// A response object for Detail endpoint to hold status and object returned.
    /// </summary>
    public class DetailResponseInfo
    {
        public DetailResponse DetailResponse { get; }
        public HttpStatusCode StatusCode { get; }

        public DetailResponseInfo(DetailResponse detailResponse, HttpStatusCode statusCode) {
            DetailResponse = detailResponse;
            StatusCode = statusCode;
        }
    }

    /// <summary>
    /// A response object for an Error to hold status and object returned.
    /// </summary>
    public class ErrorResponseInfo
    {
        public ErrorResponse ErrorResponse { get; }
        public HttpStatusCode StatusCode { get; }

        public ErrorResponseInfo(ErrorResponse errorResponse, HttpStatusCode statusCode) {
            ErrorResponse = errorResponse;
            StatusCode = statusCode;
        }
    }
}
