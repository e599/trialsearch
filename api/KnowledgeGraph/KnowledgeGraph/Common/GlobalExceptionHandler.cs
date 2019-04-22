using KnowledgeGraph.DataTransferObjects;
using KnowledgeGraph.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace KnowledgeGraph
{
    /// <summary>
    /// 
    /// </summary>
    public class GlobalExceptionHandler : IExceptionFilter
    {
        private readonly ILogger<KGException> m_oLogger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        public GlobalExceptionHandler(ILogger<KGException> logger) {
            m_oLogger = logger;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
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
