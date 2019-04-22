using KnowledgeGraph.Common;
using KnowledgeGraph.DataTransferObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;

namespace KnowledgeGraph.Exceptions
{
    /// <summary>
    /// 
    /// </summary>
    public class DatabaseConnectionKGException : KGException
    {
        private const int c_iErrorNumber = 4;
        private string m_sCallingObject;
        private string m_sCallingRoutine;
        private Exception m_oException;

        /// <summary>
        /// The status code to return to the caller
        /// </summary>
        public override int StatusCode { get { return StatusCodes.Status500InternalServerError; } }

        /// <summary>
        /// Construct the exception
        /// </summary>        
        public DatabaseConnectionKGException(Exception ex, string callingObject, string callingRoutine) : base() {
            m_oException = ex;
            m_sCallingObject = callingObject;
            m_sCallingRoutine = callingRoutine;
        }

        /// <summary>
        /// Create the response to return to the caller
        /// </summary>
        /// <returns>The error response</returns>        
        public override ErrorResponse CreateErrorResponse() {
            
            ErrorResponse oErrorResponse;
            if (Constants.CurrentEnvironment == eEnvironment.Production) {
                oErrorResponse = new ErrorResponse() {
                    ErrorNumber = c_iErrorNumber,
                    ParameterName = null,
                    ParameterValue = null,
                    ErrorDescription = "Error connecting to the data source."
                };
            } else {
                oErrorResponse = new ErrorResponse() {
                    ErrorNumber = c_iErrorNumber,
                    ParameterName = m_sCallingObject,
                    ParameterValue = m_sCallingRoutine,
                    ErrorDescription = m_oException.Message
                };
            }

            return oErrorResponse;
        }

        /// <summary>
        /// Log the exception.
        /// </summary>
        /// <param name="logger">The logger object.</param>
        public override void LogError(ILogger<KGException> logger) {
            logger.LogInformation(c_iErrorNumber, $"{c_iErrorNumber}: Error connecting to the data source.");
        }
    }
}
