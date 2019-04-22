using KnowledgeGraph.Common;
using KnowledgeGraph.Exceptions;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using static KnowledgeGraph.Common.CUtilities;

namespace KnowledgeGraph.DataTransferObjects
{
    /// <summary>
    /// 
    /// </summary>
    public class SearchRequestParser
    {
        private IQueryCollection m_oKeyValuePairs;
        
        /// <summary>
        /// 
        /// </summary>
        public SearchRequestDefaulted SearchRequest { get; } = new SearchRequestDefaulted();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchTerm"></param>
        /// <param name="keyValuePairs"></param>
        public SearchRequestParser(string searchTerm, IQueryCollection keyValuePairs) {
            m_oKeyValuePairs = keyValuePairs;
            ValidateKeyPairs();
            SearchRequest.SearchTerm = ValidateSearchTerm(searchTerm);
            SearchRequest.Sex = ParseSex();
            SearchRequest.AgeRange = ParseAgeRange();
            SearchRequest.HealthyVolunteers = ParseBoolean(nameof(SearchRequest.HealthyVolunteers));
            SearchRequest.Lat = ParseLat(nameof(SearchRequest.Lat));
            SearchRequest.Lng = ParseLng(nameof(SearchRequest.Lng));
            SearchRequest.Radius = ParseLong(nameof(SearchRequest.Radius), 1, 1000);
            SearchRequest.LatBottom = ParseLat(nameof(SearchRequest.LatBottom));
            SearchRequest.LngRight = ParseLng(nameof(SearchRequest.LngRight));            
            SearchRequest.Phase = ParsePhase();
            SearchRequest.Status = ParseStatus();
            SearchRequest.InterventionType = ParseInterventionType();
            SearchRequest.Page = ParseLong(nameof(SearchRequest.Page), 1) ?? Defaults.Page;
            SearchRequest.Results = ParseLong(nameof(SearchRequest.Results), 1, 100) ?? Defaults.Results;
            SearchRequest.ConditionId = ParseString(nameof(SearchRequest.ConditionId));
            SearchRequest.LocationId = ParseString(nameof(SearchRequest.LocationId));
            SearchRequest.SponsorId = ParseString(nameof(SearchRequest.SponsorId));
            SearchRequest.StartYear = ParseLongList(nameof(SearchRequest.StartYear), 1900, 3000);
            ValidateSearchRequestDefaulted();
        }

        private bool? ParseBoolean(string propertyName) {                        
            string sValueName = JsonName<SearchRequest>(propertyName);
            if (!GetComponent(sValueName, out string sValue)) { return null; }
            if (!bool.TryParse(sValue, out bool bValue)) {
                throw new ParameterInvalidKGException(sValueName, sValue);
            }
            return bValue;
        }

        private string ParseString(string propertyName) {            
            string sValueName = JsonName<SearchRequest>(propertyName);
            if (!GetComponent(sValueName, out string sValue)) { return null; }
            return sValue;
        }

        private long? ParseLong(string propertyName, long? lowerBound = null, long? upperBound = null) {                        
            string sValueName = JsonName<SearchRequest>(propertyName);
            if (!GetComponent(sValueName, out string sValue)) { return null; }
            if (!long.TryParse(sValue, out long lValue)) {
                throw new ParameterInvalidKGException(sValueName, sValue);
            }
            if (lowerBound != null && lValue < lowerBound) {
                throw new ParameterInvalidKGException(sValueName, sValue);
            }
            if (upperBound != null && lValue > upperBound) {
                throw new ParameterInvalidKGException(sValueName, sValue);
            }
            return lValue;
        }

        private long[] ParseLongList(string propertyName, long? lowerBound = null, long? upperBound = null) {
            string sValueName = JsonName<SearchRequest>(propertyName);
            if (!GetComponent(sValueName, out string sValueList)) { return null; }

            List<long> lstValue = new List<long>();
            foreach (string sValue in sValueList.Split(Constants.QueryStringDelimiter)) {
                if (!long.TryParse(sValue, out long lValue)) {
                    throw new ParameterInvalidKGException(sValueName, sValue);
                }
                if (lowerBound != null && lValue < lowerBound) {
                    throw new ParameterInvalidKGException(sValueName, sValue);
                }
                if (upperBound != null && lValue > upperBound) {
                    throw new ParameterInvalidKGException(sValueName, sValue);
                }

                lstValue.Add(lValue);
            }
            return lstValue.ToArray();
        }

        private AgeRange[] ParseAgeRange() {            
            string sAgeRangeName = JsonName<SearchRequest>(nameof(SearchRequest.AgeRange));
            if (!GetComponent(sAgeRangeName, out string sAgeRangeList)) { return null; }

            List<AgeRange> lstAgeRange = new List<AgeRange>();
            foreach (string sAgeRange in sAgeRangeList.Split(Constants.QueryStringDelimiter)) {
                if (!new AgeRangeConverter().ConvertEnum<AgeRange>(sAgeRange.Trim(), out object oAgeRange)) {
                    throw new ParameterInvalidKGException(sAgeRangeName, sAgeRange);
                }

                lstAgeRange.Add((AgeRange)oAgeRange);
            }
            return lstAgeRange.ToArray();
        }

        private double? ParseLat(string propertyName) {                        
            string sLatitudeName = JsonName<SearchRequest>(propertyName);
            if (!GetComponent(sLatitudeName, out string sLatitude)) { return null; }
            if (!double.TryParse(sLatitude, out double dLatitude)) {
                throw new ParameterInvalidKGException(sLatitudeName, sLatitude);
            }
            if (dLatitude < -90 || dLatitude > 90) {
                throw new ParameterInvalidKGException(sLatitudeName, sLatitude);
            }
            return dLatitude;
        }

        private double? ParseLng(string propertyName) {                        
            string sLongitudeName = JsonName<SearchRequest>(propertyName);
            if (!GetComponent(sLongitudeName, out string sLongitude)) { return null; }
            if (!double.TryParse(sLongitude, out double dLongitude)) {
                throw new ParameterInvalidKGException(sLongitudeName, sLongitude);
            }
            if (dLongitude < -180 || dLongitude > 180) {
                throw new ParameterInvalidKGException(sLongitudeName, sLongitude);
            }
            return dLongitude;
        }
               
        private Phase[] ParsePhase() {            
            string sPhaseName = JsonName<SearchRequest>(nameof(SearchRequest.Phase));
            if (!GetComponent(sPhaseName, out string sPhaseList)) { return null; }

            List<Phase> lstPhase = new List<Phase>();
            foreach (string sPhase in sPhaseList.Split(Constants.QueryStringDelimiter)) {
                if (!new PhaseConverter().ConvertEnum<Phase>(sPhase.Trim(), out object oPhase)) {
                    throw new ParameterInvalidKGException(sPhaseName, sPhase);
                }

                lstPhase.Add((Phase)oPhase);
            }
            return lstPhase.ToArray();
        }

        private Sex[] ParseSex() {            
            string sSexName = JsonName<SearchRequest>(nameof(SearchRequest.Sex));
            if (!GetComponent(sSexName, out string sSexList)) { return null; }

            List<Sex> lstSex = new List<Sex>();            
            foreach (string sSex in sSexList.Split(Constants.QueryStringDelimiter)) {
                if (!new SexConverter().ConvertEnum<Sex>(sSex.Trim(), out object oSex)) {
                    throw new ParameterInvalidKGException(sSexName, sSex);
                }

                lstSex.Add((Sex)oSex);
            }
            return lstSex.ToArray();
        }        

        private Status[] ParseStatus() {            
            string sStatusName = JsonName<SearchRequest>(nameof(SearchRequest.Status));
            if (!GetComponent(sStatusName, out string sStatusList)) { return null; }

            List<Status> lstStatus = new List<Status>();
            foreach (string sStatus in sStatusList.Split(Constants.QueryStringDelimiter)) {
                if (!new StatusConverter().ConvertEnum<Status>(sStatus.Trim(), out object oStatus)) {
                    throw new ParameterInvalidKGException(sStatusName, sStatus);
                }

                lstStatus.Add((Status)oStatus);
            }
            return lstStatus.ToArray();
        }
        
        private InterventionType[] ParseInterventionType() {            
            string sInterventionTypeName = JsonName<SearchRequest>(nameof(SearchRequest.InterventionType));
            if (!GetComponent(sInterventionTypeName, out string sInterventionTypeList)) { return null; }

            List<InterventionType> lstInterventionType = new List<InterventionType>();
            foreach (string sInterventionType in sInterventionTypeList.Split(Constants.QueryStringDelimiter)) {
                if (!new InterventionTypeConverter().ConvertEnum<InterventionType>(sInterventionType.Trim(), out object oInterventionType)) {
                    throw new ParameterInvalidKGException(sInterventionTypeName, sInterventionType);
                }

                lstInterventionType.Add((InterventionType)oInterventionType);
            }
            return lstInterventionType.ToArray();
        }        

        private string ValidateSearchTerm(string searchTerm) {
            string sSearchName = JsonName<SearchRequest>(nameof(SearchRequest.SearchTerm));
            if (searchTerm == null) {
                throw new ParameterCannotBeNullKGException(sSearchName);
            }
            if (searchTerm.Trim().Length < 1) {
                throw new ParameterRequiredKGException(sSearchName, searchTerm);
            }
            return searchTerm.Trim();
        }

        private void ValidateKeyPairs() {
            List<string> lstValidKeys = JsonNames<SearchRequest>();
            foreach (string sKey in m_oKeyValuePairs.Keys) {
                if (!lstValidKeys.Contains(sKey)) {
                    throw new ParameterNotRecognizedKGException(sKey, m_oKeyValuePairs[sKey]);
                }
            }
        }

        private void ValidateSearchRequestDefaulted() {
            ValidateGps();
        }

        private void ValidateGps() {
            if(SearchRequest.Lat == null && SearchRequest.Lng == null && SearchRequest.Radius == null && SearchRequest.LatBottom == null && SearchRequest.LngRight == null) { return; }

            bool bInvalidCombination = false;
            string sLatName = JsonName<SearchRequest>(nameof(SearchRequest.Lat));
            string sLngName = JsonName<SearchRequest>(nameof(SearchRequest.Lng));
            string sRadiusName = JsonName<SearchRequest>(nameof(SearchRequest.Radius));
            string sLatBottomName = JsonName<SearchRequest>(nameof(SearchRequest.LatBottom));
            string sLngRightName = JsonName<SearchRequest>(nameof(SearchRequest.LngRight));

            if (SearchRequest.Lat == null || SearchRequest.Lng == null) { bInvalidCombination = true; }

            if (SearchRequest.Radius == null && SearchRequest.LatBottom == null && SearchRequest.LngRight == null) { bInvalidCombination = true; }

            if (SearchRequest.Radius != null) {
                if (SearchRequest.LatBottom != null || SearchRequest.LngRight != null) { bInvalidCombination = true; }
            }

            if (bInvalidCombination) {
                throw new ParameterCombinationInvalidKGException($"({sLatName}, {sLngName}), and either '{sRadiusName}' or ({sLatBottomName}, {sLngRightName}) but not both, must be provided for GPS queries.", sLatName, sLngName, sRadiusName, sLatBottomName, sLngRightName);
            }            
        }

        private bool GetComponent(string key, out string component) {
            if (m_oKeyValuePairs.ContainsKey(key)) {
                component = m_oKeyValuePairs[key];
                return true;
            }
            component = null;
            return false;
        }
    }
}
