using KnowledgeGraph.DataTransferObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace KnowledgeGraph.Exceptions
{
    /// <summary>
    /// An exception class to handle a missing required parameter.
    /// </summary>
    public class ParameterNotRecognizedKGException : KGException
    {
        private const int c_iErrorNumber = 5;
        private string m_sParameterName;
        private string m_sParameterValue;

        /// <summary>
        /// The status code to return to the caller
        /// </summary>
        public override int StatusCode { get { return StatusCodes.Status400BadRequest; } }

        /// <summary>
        /// Construct the exception
        /// </summary>
        /// <param name="parameterName">The parameter that failed.</param>
        /// <param name="parameterValue">The parameter value that caused the failure.</param>
        public ParameterNotRecognizedKGException(string parameterName, string parameterValue) : base() {
            m_sParameterName = parameterName;
            m_sParameterValue = parameterValue;
        }

        /// <summary>
        /// Create the response to return to the caller
        /// </summary>
        /// <returns>The error response</returns>        
        public override ErrorResponse CreateErrorResponse() {

            ErrorResponse oErrorResponse = new ErrorResponse() {
                ErrorNumber = c_iErrorNumber,
                ParameterName = m_sParameterName,
                ParameterValue = m_sParameterValue,
                ErrorDescription = "The parameter name is invalid.  Unrecognized parameter."
            };
            return oErrorResponse;
        }

        /// <summary>
        /// Log the exception.
        /// </summary>
        /// <param name="logger">The logger object.</param>
        public override void LogError(ILogger<KGException> logger) {
            logger.LogInformation(c_iErrorNumber, $"{c_iErrorNumber}: ParameterName=[{m_sParameterName}] is unrecognized. ParameterValue=[{m_sParameterValue}] was provided.");
        }
    }
}
