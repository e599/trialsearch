using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace KnowledgeGraph.Common
{
    /// <summary>
    /// Generic utilities.
    /// </summary>
    public static class CUtilities
    {
        /// <summary>
        /// Adapted from
        /// https://stackoverflow.com/questions/14285498/getcustomattribute-returns-null        
        /// Get the JsonProperty attribute name of the property.
        /// </summary>
        /// <typeparam name="T">The type of the object the parameter is in.</typeparam>
        /// <param name="propertyName">The name of the property.</param>
        /// <returns>The JsonProperty attribute name.</returns>
        public static string JsonName<T>(string propertyName) {
            return typeof(T).GetProperty(propertyName)
                            .GetCustomAttribute<JsonPropertyAttribute>(true)
                            .PropertyName;
        }

        /// <summary>
        /// https://stackoverflow.com/questions/33616005/get-a-list-of-json-property-names-from-a-class-to-use-in-a-query-string
        /// https://stackoverflow.com/questions/2490674/how-do-i-find-all-properties-of-type-datetime-in-an-class
        /// Get all the JsonProperty attribute names of all properties in the object.
        /// Optionally filter by type.
        /// </summary>
        /// <typeparam name="T">The type ofthe object the parameter is in.</typeparam>
        /// <returns>The JsonProperty attribute names.</returns>
        public static List<string> JsonNames<T>(Type type = null) {
            return typeof(T).GetProperties()
                            .Where(p => type == null || p.PropertyType == type)
                            .Select(p => p.GetCustomAttribute<JsonPropertyAttribute>().PropertyName)
                            .ToList();
        }

        /// <summary>
        /// Escape all special characters in a string for Neo4j.
        /// </summary>
        /// <param name="s">The string to escape.</param>
        /// <returns>The escaped string.</returns>
        public static string EscapeSpecialCharacters(string s) {
            StringBuilder sb = new StringBuilder();

            // special characters double escaped except single quotes
            // which are single escaped
            foreach (char c in s) {
                if (c == '\'') {
                    sb.Append("\\'");
                } else if (char.IsPunctuation(c) || char.IsSymbol(c)) {
                    sb.Append("\\\\");
                    sb.Append(c);
                } else {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
    }
}
