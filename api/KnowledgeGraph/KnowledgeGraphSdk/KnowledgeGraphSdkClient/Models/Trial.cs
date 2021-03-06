﻿// Code generated by Microsoft (R) AutoRest Code Generator 0.16.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace KnowledgeGraphSdk.Models
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Microsoft.Rest;
    using Microsoft.Rest.Serialization;

    public partial class Trial
    {
        /// <summary>
        /// Initializes a new instance of the Trial class.
        /// </summary>
        public Trial() { }

        /// <summary>
        /// Initializes a new instance of the Trial class.
        /// </summary>
        public Trial(string nctId = default(string), string url = default(string), string briefTitle = default(string), string officialTitle = default(string), string briefSummary = default(string), string orgStudyId = default(string), long? latitude = default(long?), long? longitude = default(long?))
        {
            NctId = nctId;
            Url = url;
            BriefTitle = briefTitle;
            OfficialTitle = officialTitle;
            BriefSummary = briefSummary;
            OrgStudyId = orgStudyId;
            Latitude = latitude;
            Longitude = longitude;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "nct_id")]
        public string NctId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "brief_title")]
        public string BriefTitle { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "official_title")]
        public string OfficialTitle { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "brief_summary")]
        public string BriefSummary { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "org_study_id")]
        public string OrgStudyId { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "latitude")]
        public long? Latitude { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "longitude")]
        public long? Longitude { get; set; }

    }
}
