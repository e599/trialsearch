using KnowledgeGraph.DataTransferObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace KnowledgeGraph.Exceptions
{
    /// <summary>
    /// An exception class to handle a missing required parameter.
    /// </summary>
    public class ParameterCannotBeNullKGException : KGException
    {
        private const int c_iErrorNumber = 1;
        private string m_sParameterName;

        /// <summary>
        /// The status code to return to the caller
        /// </summary>
        public override int StatusCode { get { return StatusCodes.Status400BadRequest; } }

        /// <summary>
        /// Construct the exception
        /// </summary>
        /// <param name="parameterName">The parameter that failed.</param>        
        public ParameterCannotBeNullKGException(string parameterName) : base() {
            m_sParameterName = parameterName;
        }

        /// <summary>
        /// Create the response to return to the caller
        /// </summary>
        /// <returns>The error response</returns>        
        public override ErrorResponse CreateErrorResponse() {

            ErrorResponse oErrorResponse = new ErrorResponse() {
                ErrorNumber = c_iErrorNumber,
                ParameterName = m_sParameterName,
                ParameterValue = null,
                ErrorDescription = "The parameter cannot be null"
            };
            return oErrorResponse;
        }

        /// <summary>
        /// Log the exception.
        /// </summary>
        /// <param name="logger">The logger object.</param>
        public override void LogError(ILogger<KGException> logger) {
            logger.LogInformation(c_iErrorNumber, $"{c_iErrorNumber}: ParameterName=[{m_sParameterName}] cannot be null.");
        }
    }
}
