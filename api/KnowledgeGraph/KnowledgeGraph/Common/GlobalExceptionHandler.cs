using KnowledgeGraph.DataTransferObjects;
using KnowledgeGraph.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace KnowledgeGraph
{
    /// <summary>
    /// A global exception handler.
    /// </summary>
    public class GlobalExceptionHandler : IExceptionFilter
    {
        private readonly ILogger<KGException> m_oLogger;

        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="logger">Dependency injected Logger.</param>
        public GlobalExceptionHandler(ILogger<KGException> logger) {
            m_oLogger = logger;
        }

        /// <summary>
        /// The method called on an exception.  If the error is a known type then serialize it to the 
        /// ErrorResponse object and return it.  If it's not a known type then create a 500 error Exception
        /// and return that.  Log any errors.
        /// </summary>
        /// <param name="context">The context of the exception.</param>
        public void OnException(ExceptionContext context) {
            HttpResponse oHttpResponse = context.HttpContext.Response;
            oHttpResponse.ContentType = "application/json";

            KGException oKGException = null;

            if (context.Exception is KGException) {
                oKGException = context.Exception as KGException;
            } else {
                oKGException = new ServerErrorKGException(context.Exception, nameof(GlobalExceptionHandler), nameof(OnException));
            }
            oHttpResponse.StatusCode = oKGException.StatusCode;
            ErrorResponse oErrorResponse = oKGException.CreateErrorResponse();
            oKGException.LogError(m_oLogger);

            string sJsonResult = JsonConvert.SerializeObject(oErrorResponse, Formatting.Indented);

            context.ExceptionHandled = true;
            oHttpResponse.WriteAsync(sJsonResult).ConfigureAwait(false);
        }
    }
}
