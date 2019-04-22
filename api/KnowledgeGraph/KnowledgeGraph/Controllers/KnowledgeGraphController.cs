using KnowledgeGraph.DatabaseInterface;
using KnowledgeGraph.DataTransferObjects;
using KnowledgeGraph.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

//https://localhost:44368/swagger/v1/swagger.json
namespace KnowledgeGraph.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Produces("application/json")]
    [Route("/v1")]
    public class KnowledgeGraphController : ControllerBase
    {
        private readonly Settings m_oSettings;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="settings"></param>
        public KnowledgeGraphController(IOptions<Settings> settings) {
            m_oSettings = settings.Value;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="search_term"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("search/{search_term}")]
        [ProducesResponseType(typeof(SearchResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult ListClinicalTrials(string search_term) {
            try {
                SearchRequestParser oSearchRequestParser = new SearchRequestParser(search_term, HttpContext.Request.Query);

                Neo4jInterface oNeo4JInterface = new Neo4jInterface(m_oSettings);
                SearchResponse oSearchResponse = oNeo4JInterface.GetClinicalTrialsList(oSearchRequestParser.SearchRequest);

                return new ObjectResult(oSearchResponse);
            } catch (Exception ex) when (NotKGException(ex)) {
                throw new ServerErrorKGException(ex, nameof(KnowledgeGraphController), nameof(ListClinicalTrials));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="new_id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("trial/{new_id}")]
        [ProducesResponseType(typeof(DetailResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
        public IActionResult ClinicalTrialDetail(string new_id) {
            try {
                if (new_id == null) { throw new ParameterCannotBeNullKGException(nameof(new_id)); }
                if (new_id.Trim().Length < 1) { throw new ParameterRequiredKGException(nameof(new_id), new_id); }

                Neo4jInterface oNeo4JInterface = new Neo4jInterface(m_oSettings);
                DetailResponse oDetailResponse = oNeo4JInterface.GetClinicalTrialDetail(new_id);

                return new ObjectResult(oDetailResponse);
            } catch (Exception ex) when (NotKGException(ex)) {
                throw new ServerErrorKGException(ex, nameof(KnowledgeGraphController), nameof(ListClinicalTrials));
            }
        }

        private bool NotKGException(Exception e) {
            return !(e is KGException);
        }
    }
}
