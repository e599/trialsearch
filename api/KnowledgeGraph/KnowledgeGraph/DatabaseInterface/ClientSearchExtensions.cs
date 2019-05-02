using KnowledgeGraph.Common;
using KnowledgeGraph.DatabaseObjects;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using static KnowledgeGraph.Common.CUtilities;

namespace KnowledgeGraph.DatabaseInterface
{
    /// <summary>
    /// 
    /// </summary>
    public static class ClientSearchExtensions
    {
        /// <summary>
        /// Create a cypher query to filter by a radius surrounding a GPS coordinate.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_Radius(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.Radius == null) { return source; }

            string sLatitudeName = JsonName<LocationNode>(nameof(LocationNode.Lat));
            string sLongitudeName = JsonName<LocationNode>(nameof(LocationNode.Lng));

            string sRadius = searchRequest.Radius.ToString();
            string sLatitude = searchRequest.Lat.ToString();
            string sLongitude = searchRequest.Lng.ToString();

            double dMetersPerMile = 1609.34;
            string sMetersPerMile = dMetersPerMile.ToString("#0.00");

            return source.Match($"(l:{Nodes.Location})")
                         .Where($"(distance(point({{latitude: toFloat(l.{sLatitudeName}), longitude: toFloat(l.{sLongitudeName})}}), point({{latitude: {sLatitude}, longitude: {sLongitude}}})) / {sMetersPerMile} < {sRadius})")
                         .Match($"(c)-[:{Rel.HAS_LOCATION}]->(l)")
                         .With("c, arrays{.*,ls:collect(l)}");
        }

        /// <summary>
        /// Create a cypher query to filter by a GPS coordinate bounding box.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_BoundingBox(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.LatBottom == null) { return source; }

            string sLatitudeName = JsonName<LocationNode>(nameof(LocationNode.Lat));
            string sLongitudeName = JsonName<LocationNode>(nameof(LocationNode.Lng));

            string sLatitude = searchRequest.Lat.ToString();
            string sLongitude = searchRequest.Lng.ToString();
            string sLatitudeBottom = searchRequest.LatBottom.ToString();
            string sLongitudeRight = searchRequest.LngRight.ToString();

            return source.Match($"(l:{Nodes.Location})")
                         .Where($"toFloat(l.{sLatitudeName}) < {sLatitude}")
                         .AndWhere($"toFloat(l.{sLatitudeName}) > {sLatitudeBottom}")
                         .AndWhere($"toFloat(l.{sLongitudeName}) > {sLongitude}")
                         .AndWhere($"toFloat(l.{sLongitudeName}) < {sLongitudeRight}")
                         .Match($"(c)-[:{Rel.HAS_LOCATION}]->(l)")
                         .With("c, arrays{.*,ls:collect(l)}");
        }

        /// <summary>
        /// Create a cypher query to gather results into a single object to return.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGWith_CollectResults(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            string sLocationsName = JsonName<ClinicalTrialNode>(nameof(ClinicalTrialNode.Locations));

            ICypherFluentQuery q = source;
            // add location if no location search was done
            if (searchRequest.Radius == null && searchRequest.LatBottom == null) {
                q = q.OptionalMatch($"(c)-[:{Rel.HAS_LOCATION}]->(l:{Nodes.Location})")
                     .With("c, arrays{.*,ls:collect(l)}");
            }
            return q.With($"c{{.*,{sLocationsName}:arrays.ls}}");
        }

        /// <summary>
        /// Create a cypher query to filter by a search term using a lucene index.  The index is created at instantiation
        /// of the Neo4jInterface.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGCallYield_Search(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.SearchTerm == null) { return source.Match($"(c:{Nodes.ClinicalTrial})"); }

            string sEscapedSearchTerm = EscapeSpecialCharacters(searchRequest.SearchTerm);
            return source.Call($"db.index.fulltext.queryNodes('{Constants.TextSearchIndexName}', '{sEscapedSearchTerm}')")
                         .Yield("node AS c")
                         .With("c,{} AS arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by AgeRange relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_AgeRange(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.AgeRange == null) { return source; }

            List<string> lstAgeRangeEnums = new List<string>();
            foreach (DataTransferObjects.AgeRange iAgeRangeRequest in searchRequest.AgeRange) {
                AgeRange iAgeRange;
                switch (iAgeRangeRequest) {
                    case DataTransferObjects.AgeRange.Child: iAgeRange = AgeRange.Child; break;
                    case DataTransferObjects.AgeRange.Adult: iAgeRange = AgeRange.Adult; break;
                    case DataTransferObjects.AgeRange.OlderAdult: iAgeRange = AgeRange.OlderAdult; break;
                    default: throw new Exception($"Unknown Age Range enumerator: {searchRequest.AgeRange.ToString()}");
                }

                new AgeRangeConverter().EnumValue(iAgeRange, out string sAgeRangeEnumValue);
                lstAgeRangeEnums.Add(sAgeRangeEnumValue);
            }

            string sAgeRangeName = JsonName<AgeRangeNode>(nameof(AgeRangeNode.AgeRange));
            return source.Match($"(a:{Nodes.AgeRange})")
                         .Where($"a.{sAgeRangeName} IN [{lstAgeRangeEnums.PrintQuotedDelimited()}]")
                         .Match($"(c)-[:{Rel.HAS_INCLUSION_CRITERION}]->(a)")
                         .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by Gender relationships.
        /// Note: This query is an AND.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_AllGenders(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.Sex == null) { return source; }

            ICypherFluentQuery q = source;
            int i = 0;
            foreach (DataTransferObjects.Sex iSexRequest in searchRequest.Sex) {
                switch (iSexRequest) {
                    case DataTransferObjects.Sex.Male: q = q.KGMatch_OneGender(Gender.Male, $"s{i}"); break;
                    case DataTransferObjects.Sex.Female: q = q.KGMatch_OneGender(Gender.Female, $"s{i}"); break;
                    default: throw new Exception($"Unknown Sex enumerator: {searchRequest.Sex.ToString()}");
                }
                i++;
            }

            return q;
        }

        /// <summary>
        /// Create a cypher query to filter for a single gender.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="gender"></param>
        /// <param name="id"></param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_OneGender(this ICypherFluentQuery source, Gender gender, string id) {
            string sGenderName = JsonName<SexNode>(nameof(SexNode.Gender));
            new GenderConverter().EnumValue(gender, out string sGenderEnumValue);
            return source.Match($"({id}:{Nodes.Sex})")
                 .Where($"{id}.{sGenderName} = '{sGenderEnumValue}'")
                 .Match($"(c)-[:{Rel.HAS_INCLUSION_CRITERION}]->({id})")
                 .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by OverallStatus relationships
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_Status(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.Status == null) { return source; }

            List<string> lstOverallStatusEnums = new List<string>();
            foreach (DataTransferObjects.Status iStatusRequest in searchRequest.Status) {
                OverallStatus iOverallStatus;
                switch (iStatusRequest) {
                    case DataTransferObjects.Status.ActiveNotRecruiting: iOverallStatus = OverallStatus.ActiveNotRecruiting; break;
                    case DataTransferObjects.Status.ApprovedForMarketing: iOverallStatus = OverallStatus.ApprovedForMarketing; break;
                    case DataTransferObjects.Status.Available: iOverallStatus = OverallStatus.Available; break;
                    case DataTransferObjects.Status.Completed: iOverallStatus = OverallStatus.Completed; break;
                    case DataTransferObjects.Status.EnrollingByInvitation: iOverallStatus = OverallStatus.EnrollingByInvitation; break;
                    case DataTransferObjects.Status.NoLongerAvailable: iOverallStatus = OverallStatus.NoLongerAvailable; break;
                    case DataTransferObjects.Status.NotYetRecruiting: iOverallStatus = OverallStatus.NotYetRecruiting; break;
                    case DataTransferObjects.Status.Recruiting: iOverallStatus = OverallStatus.Recruiting; break;
                    case DataTransferObjects.Status.Suspended: iOverallStatus = OverallStatus.Suspended; break;
                    case DataTransferObjects.Status.TemporarilyNotAvailable: iOverallStatus = OverallStatus.TemporarilyNotAvailable; break;
                    case DataTransferObjects.Status.Terminated: iOverallStatus = OverallStatus.Terminated; break;
                    case DataTransferObjects.Status.UnknownStatus: iOverallStatus = OverallStatus.UnknownStatus; break;
                    case DataTransferObjects.Status.Withdrawn: iOverallStatus = OverallStatus.Withdrawn; break;
                    case DataTransferObjects.Status.Withheld: iOverallStatus = OverallStatus.Withheld; break;
                    default: throw new Exception($"Unknown Status enumerator: {searchRequest.Status.ToString()}");
                }

                new OverallStatusConverter().EnumValue(iOverallStatus, out string sOverallStatusEnumValue);
                lstOverallStatusEnums.Add(sOverallStatusEnumValue);
            }

            string sOverallStatusName = JsonName<EnrollmentStatusNode>(nameof(EnrollmentStatusNode.OverallStatus));
            return source.Match($"(e:{Nodes.EnrollmentStatus})")
                        .Where($"e.{sOverallStatusName} IN [{lstOverallStatusEnums.PrintQuotedDelimited()}]")
                        .Match($"(c)-[:{Rel.HAS_ENROLLMENT_STATUS}]->(e)")
                        .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by Phase relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_Phase(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.Phase == null) { return source; }

            List<string> lstPhaseEnums = new List<string>();
            foreach (DataTransferObjects.Phase iPhaseRequest in searchRequest.Phase) {
                Phase iPhase;
                switch (iPhaseRequest) {
                    case DataTransferObjects.Phase.NA: iPhase = Phase.NA; break;
                    case DataTransferObjects.Phase.Phase1: iPhase = Phase.Phase1; break;
                    case DataTransferObjects.Phase.Phase2: iPhase = Phase.Phase2; break;
                    case DataTransferObjects.Phase.Phase3: iPhase = Phase.Phase3; break;
                    case DataTransferObjects.Phase.Phase4: iPhase = Phase.Phase4; break;
                    default: throw new Exception($"Unknown Phase enumerator: {searchRequest.Phase.ToString()}");
                }

                new PhaseConverter().EnumValue(iPhase, out string sPhaseEnumValue);
                lstPhaseEnums.Add(sPhaseEnumValue);
            }

            string sPhaseName = JsonName<PhaseNode>(nameof(PhaseNode.Phase));
            return source.Match($"(p:{Nodes.Phase})")
                        .Where($"p.{sPhaseName} IN [{lstPhaseEnums.PrintQuotedDelimited()}]")
                        .Match($"(c)-[:{Rel.HAS_PHASE}]->(p)")
                        .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by InterventionType relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_InterventionType(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.InterventionType == null) { return source; }

            List<string> lstInterventionTypeEnums = new List<string>();
            foreach (DataTransferObjects.InterventionType iInterventionTypeRequest in searchRequest.InterventionType) {
                InterventionType iInterventionType;
                switch (iInterventionTypeRequest) {
                    case DataTransferObjects.InterventionType.Behavioral: iInterventionType = InterventionType.Behavioral; break;
                    case DataTransferObjects.InterventionType.Biological: iInterventionType = InterventionType.Biological; break;
                    case DataTransferObjects.InterventionType.CombinationProduct: iInterventionType = InterventionType.CombinationProduct; break;
                    case DataTransferObjects.InterventionType.Device: iInterventionType = InterventionType.Device; break;
                    case DataTransferObjects.InterventionType.DiagnosticTest: iInterventionType = InterventionType.DiagnosticTest; break;
                    case DataTransferObjects.InterventionType.DietarySupplement: iInterventionType = InterventionType.DietarySupplement; break;
                    case DataTransferObjects.InterventionType.Drug: iInterventionType = InterventionType.Drug; break;
                    case DataTransferObjects.InterventionType.Genetic: iInterventionType = InterventionType.Genetic; break;
                    case DataTransferObjects.InterventionType.Other: iInterventionType = InterventionType.Other; break;
                    case DataTransferObjects.InterventionType.Procedure: iInterventionType = InterventionType.Procedure; break;
                    case DataTransferObjects.InterventionType.Radiation: iInterventionType = InterventionType.Radiation; break;
                    default: throw new Exception($"Unknown Intervention enumerator: {searchRequest.InterventionType.ToString()}");
                }

                new InterventionTypeConverter().EnumValue(iInterventionType, out string sInterventionTypeEnumValue);
                lstInterventionTypeEnums.Add(sInterventionTypeEnumValue);
            }

            string sInterventionTypeName = JsonName<InterventionTypeNode>(nameof(InterventionTypeNode.InterventionType));
            return source.Match($"(t:{Nodes.InterventionType})")
                         .Where($"t.{sInterventionTypeName} IN [{lstInterventionTypeEnums.PrintQuotedDelimited()}]")
                         .Match($"(c)-[:{Rel.HAS_INTERVENTION}]->({Nodes.Intervention})-[:{Rel.HAS_CATEGORY}]->(t)")
                         .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by HealthyVolunteers relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_HealthyVolunteers(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.HealthyVolunteers == null) { return source; }

            HealthyVolunteers iHealthyVolunteers;
            if ((bool)searchRequest.HealthyVolunteers) {
                iHealthyVolunteers = HealthyVolunteers.AcceptsHealthyVolunteers;
            } else {
                iHealthyVolunteers = HealthyVolunteers.No;
            }
            new HealthyVolunteersConverter().EnumValue(iHealthyVolunteers, out string sHealthyVolunteersEnumValue);
            string sHealthyVolunteersName = JsonName<HealthyVolunteersNode>(nameof(HealthyVolunteersNode.HealthyVolunteers));
            return source.Match($"(h:{Nodes.HealthyVolunteers})")
                        .Where($"h.{sHealthyVolunteersName} = '{sHealthyVolunteersEnumValue}'")
                        .Match($"(c)-[:{Rel.HAS_INCLUSION_CRITERION}]->(h)")
                        .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by Condition relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_ConditionId(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.ConditionId == null) { return source; }

            string sNewIdName = JsonName<ConditionNode>(nameof(ConditionNode.NewId));
            string sEscapedConditionId = EscapeSpecialCharacters(searchRequest.ConditionId);
            return source.Match($"(traverse_condition:{Nodes.Condition})")
                        .Where($"traverse_condition.{sNewIdName} =~ '(?ui){sEscapedConditionId}'")
                        .Match($"(c)-[:{Rel.STUDIES}]->(traverse_condition)")
                        .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by Location relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_LocationId(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.LocationId == null) { return source; }

            string sNewIdName = JsonName<LocationNode>(nameof(LocationNode.NewId));
            string sEscapedLocationId = EscapeSpecialCharacters(searchRequest.LocationId);
            return source.Match($"(traverse_location:{Nodes.Location})")
                        .Where($"traverse_location.{sNewIdName} =~ '(?ui){sEscapedLocationId}'")
                        .Match($"(c)-[:{Rel.HAS_LOCATION}]->(traverse_location)")
                        .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by Sponsor relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_SponsorId(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.SponsorId == null) { return source; }

            string sNewIdName = JsonName<AgencyNode>(nameof(AgencyNode.NewId));
            string sEscapedSponsorId = EscapeSpecialCharacters(searchRequest.SponsorId);
            return source.Match($"(traverse_sponsor:{Nodes.Agency})")
                        .Where($"traverse_sponsor.{sNewIdName} =~ '(?ui){sEscapedSponsorId}'")
                        .Match($"(c)-[:{Rel.HAS_SPONSOR}]->(traverse_sponsor)")
                        .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by StartYear relationships.
        /// </summary>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery KGMatch_StartYear(this ICypherFluentQuery source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            if (searchRequest.StartYear == null) { return source; }

            List<string> lstYears = new List<string>();
            foreach (long iYear in searchRequest.StartYear) {
                lstYears.Add(iYear.ToString());
            }

            string sYearName = JsonName<YearNode>(nameof(YearNode.Year));
            return source.Match($"(yr:{Nodes.Year})")
                         .Where($"yr.{sYearName} IN [{lstYears.PrintQuotedDelimited()}]")
                         .Match($"(c)-[:{Rel.HAS_START_YEAR}]->(yr)")
                         .With("c,arrays");
        }

        /// <summary>
        /// Create a cypher query to filter by Page number and Skip results.  This query performs the requested paging.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="source">The query source.</param>
        /// <param name="searchRequest">The search request schema object.</param>
        /// <returns>The modified query source.</returns>
        public static ICypherFluentQuery<TResult> KGSkipLimit_Paging<TResult>(this ICypherFluentQuery<TResult> source, DataTransferObjects.SearchRequestDefaulted searchRequest) {
            return source.Skip(((int)searchRequest.Page - 1) * (int)searchRequest.Results)
                         .Limit((int)searchRequest.Results + Constants.ExtraResultsForPageIndicator);
        }
    }
}
