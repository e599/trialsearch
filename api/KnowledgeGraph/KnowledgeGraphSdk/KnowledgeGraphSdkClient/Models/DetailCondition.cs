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
    /// the detail condition of a clinical trial
    /// </summary>
    public partial class DetailCondition
    {
        /// <summary>
        /// Initializes a new instance of the DetailCondition class.
        /// </summary>
        public DetailCondition() { }

        /// <summary>
        /// Initializes a new instance of the DetailCondition class.
        /// </summary>
        public DetailCondition(string condition = default(string), string newId = default(string))
        {
            Condition = condition;
            NewId = newId;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "condition")]
        public string Condition { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "new_id")]
        public string NewId { get; set; }

    }
}
