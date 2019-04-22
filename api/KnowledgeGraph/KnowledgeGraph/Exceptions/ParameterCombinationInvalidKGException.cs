using KnowledgeGraph.DataTransferObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace KnowledgeGraph.Exceptions
{
    /// <summary>
    /// An exception class to handle a missing required parameter.
    /// </summary>
    public class ParameterCombinationInvalidKGException : KGException
    {
        private const int c_iErrorNumber = 7;
        private readonly string m_sParameterName;
        private readonly string m_sDescription;

        /// <summary>
        /// The status code to return to the caller
        /// </summary>
        public override int StatusCode { get { return StatusCodes.Status400BadRequest; } }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="description"></param>
        /// <param name="parameterNames"></param>
        public ParameterCombinationInvalidKGException(string description, params string[] parameterNames) : base() {
            m_sParameterName = string.Join(", ",parameterNames);
            m_sDescription = description;
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
                ErrorDescription = "The parameter combination is invalid: " + m_sDescription
            };
            return oErrorResponse;
        }

        /// <summary>
        /// Log the exception.
        /// </summary>
        /// <param name="logger">The logger object.</param>
        public override void LogError(ILogger<KGException> logger) {
            logger.LogInformation(c_iErrorNumber, $"{c_iErrorNumber}: ParameterNames=[{m_sParameterName}] are invalid. The parameter combination is invalid: {m_sDescription}");
        }
    }
}
