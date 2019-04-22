using KnowledgeGraph.DataTransferObjects;
using Microsoft.Extensions.Logging;
using System;

namespace KnowledgeGraph.Exceptions
{
    /// <summary>
    /// An abstract exception class to handle all application errors.
    /// </summary>
    public abstract class KGException : Exception
    {
        /// <summary>
        /// The status code to return to the caller
        /// </summary>
        public abstract int StatusCode { get; }
        /// <summary>
        /// Create the response to return to the caller
        /// </summary>
        /// <returns>The error response</returns>
        public abstract ErrorResponse CreateErrorResponse();
        /// <summary>
        /// Log the exception.
        /// </summary>
        /// <param name="logger">The logger object.</param>
        public abstract void LogError(ILogger<KGException> logger);
    }
}
