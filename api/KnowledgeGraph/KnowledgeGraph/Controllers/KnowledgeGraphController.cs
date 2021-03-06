﻿using KnowledgeGraph.DatabaseInterface;
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
    /// The trialsearch api.
    /// </summary>
    [Produces("application/json")]
    [Route("/v1")]
    public class KnowledgeGraphController : ControllerBase
    {
        private readonly Settings m_oSettings;

        /// <summary>
        /// Contructor with dependency injected strongly typed settings.
        /// </summary>
        /// <param name="settings"></param>
        public KnowledgeGraphController(IOptions<Settings> settings) {
            m_oSettings = settings.Value;

        }

        /// <summary>
        /// The Clinical Trial Search endpoint.  This endpoint takes a search term in the URL and many
        /// querystring parameters.  All schema for searches is outlined in the autogenerated 
        /// WireModels.cs file.
        /// </summary>
        /// <param name="search_term">The term to search Neo4j for.</param>
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
        /// The Clinical Trial Detail endpoint.  This endpoint takes an id of a Clinical Trial
        /// (gathered using the other endpoint) and returns all information about that trial.
        /// </summary>
        /// <param name="new_id">The id of the trial.</param>
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
