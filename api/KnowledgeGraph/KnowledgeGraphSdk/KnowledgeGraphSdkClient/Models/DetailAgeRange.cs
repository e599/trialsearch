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

    /// <summary>
    /// the detail age range of a clinical trial
    /// </summary>
    public partial class DetailAgeRange
    {
        /// <summary>
        /// Initializes a new instance of the DetailAgeRange class.
        /// </summary>
        public DetailAgeRange() { }

        /// <summary>
        /// Initializes a new instance of the DetailAgeRange class.
        /// </summary>
        public DetailAgeRange(string ageRange = default(string))
        {
            AgeRange = ageRange;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "age_range")]
        public string AgeRange { get; set; }

    }
}