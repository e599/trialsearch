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
    /// the list location of a clinical trial
    /// </summary>
    public partial class ListLocation
    {
        /// <summary>
        /// Initializes a new instance of the ListLocation class.
        /// </summary>
        public ListLocation() { }

        /// <summary>
        /// Initializes a new instance of the ListLocation class.
        /// </summary>
        public ListLocation(double? latitude = default(double?), double? longitude = default(double?))
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "latitude")]
        public double? Latitude { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "longitude")]
        public double? Longitude { get; set; }

    }
}
