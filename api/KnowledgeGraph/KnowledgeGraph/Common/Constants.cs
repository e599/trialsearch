﻿#pragma warning disable 1591

using System;

namespace KnowledgeGraph.Common
{
    /// <summary>
    /// The environment in which the code is currently running.
    /// Determined by the ASPNETCORE_ENVIRONMENT environment
    /// variable.
    /// </summary>
    public enum eEnvironment
    {
        None,
        Development,    // Dev server
        Local,          // Will G.
        Production,     // Prod server
        Staging,        // Dan
        Alternate       // Vidya
    }

    /// <summary>
    /// Defaults for searches from the REST service.
    /// </summary>
    public static class Defaults
    {
        public static long Page = 1;
        public static long Results = 25;
    }

    /// <summary>
    /// Node names in the database.
    /// </summary>
    public static class Nodes
    {
        public const string AgeRange = "AgeRange";
        public const string Agency = "Agency";
        public const string AgencyClass = "AgencyClass";
        public const string ClinicalTrial = "ClinicalTrial";
        public const string Condition = "Condition";
        public const string Contact = "Contact";
        public const string EnrollmentStatus = "EnrollmentStatus";
        public const string HealthyVolunteers = "HealthyVolunteers";
        public const string Intervention = "Intervention";
        public const string InterventionType = "InterventionType";
        public const string Location = "Location";
        public const string MeshTerm = "MeshTerm";
        public const string MeshTermType = "MeshTermType";
        public const string Phase = "Phase";
        public const string Sex = "Sex";
        public const string StudyType = "StudyType";
        public const string Year = "Year";
    }

    /// <summary>
    /// Relationship names in the database.
    /// </summary>
    public static class Rel
    {
        public const string HAS_CATEGORY = "HAS_CATEGORY";
        public const string HAS_CLASS = "HAS_CLASS";
        public const string HAS_CONTACT = "HAS_CONTACT";
        public const string HAS_ENROLLMENT_STATUS = "HAS_ENROLLMENT_STATUS";
        public const string HAS_COLLABORATOR = "HAS_COLLABORATOR";
        public const string HAS_INCLUSION_CRITERION = "HAS_INCLUSION_CRITERION";
        public const string HAS_INTERVENTION = "HAS_INTERVENTION";
        public const string HAS_LOCATION = "HAS_LOCATION";
        public const string HAS_LOCATION_INVESTIGATOR = "HAS_LOCATION_INVESTIGATOR";
        public const string HAS_MESH_TERM = "HAS_MESH_TERM";
        public const string HAS_MESH_TERM_TYPE = "HAS_MESH_TERM_TYPE";
        public const string HAS_OVERALL_OFFICIAL = "HAS_OVERALL_OFFICIAL";
        public const string HAS_PHASE = "HAS_PHASE";
        public const string HAS_PI = "HAS_PI";
        public const string HAS_RESPONSIBLE_PARTY = "HAS_RESPONSIBLE_PARTY";
        public const string HAS_SPONSOR = "HAS_SPONSOR";
        public const string HAS_SPONSORINVESTIGATOR = "HAS_SPONSORINVESTIGATOR";
        public const string HAS_START_YEAR = "HAS_START_YEAR";
        public const string HAS_STUDY_CHAIR = "HAS_STUDY_CHAIR";
        public const string HAS_STUDY_DIRECTOR = "HAS_STUDY_DIRECTOR";
        public const string HAS_SUBINVESTIGATOR = "HAS_SUBINVESTIGATOR";
        public const string IS_TREATMENT_FOR = "IS_TREATMENT_FOR";
        public const string STUDIES = "STUDIES";
        public const string WORKS_WITH = "WORKS_WITH";
    }

    /// <summary>
    /// Some generic constants.
    /// </summary>
    public static class Constants
    {
        private static eEnvironment m_iCurrentEnvironment = eEnvironment.None;

        // CORS policy name
        public const string CORSPolicy = "CORSPolicy";

        // The delimiter for multiple querystring parameter values
        public const string QueryStringDelimiter = ",";

        // Number of extra results to request to determine if on last page
        public const int ExtraResultsForPageIndicator = 1;

        // Name of the index used for searching
        public const string TextSearchIndexName = "TextSearchIndex";

        // CT node fields excluded from the index
        public const string TextSearchIndexExcludedFields = "|criteria_text"; // bar delimited

        /// <summary>
        /// The current environment.  Stored in a static variable or else looked up from the 
        /// ASPNETCORE_ENVIRONMENT environment variable.
        /// </summary>
        public static eEnvironment CurrentEnvironment {
            get {
                if (m_iCurrentEnvironment != eEnvironment.None) { return m_iCurrentEnvironment; }

                string sEnvironment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                foreach (eEnvironment iEnvironment in Enum.GetValues(typeof(eEnvironment))) {
                    if (sEnvironment.ToLower() == iEnvironment.ToString().ToLower()) {
                        m_iCurrentEnvironment = iEnvironment;
                        return m_iCurrentEnvironment;
                    }
                }
                // default to production
                m_iCurrentEnvironment = eEnvironment.Production;
                return m_iCurrentEnvironment;
            }
        }
    }
}
#pragma warning restore 1591
