using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace KnowledgeGraph.Common
{
    /// <summary>
    /// Generic extension methods added to classes.
    /// </summary>
    public static class Extensions
    {
        /// <summary>
        /// Get the string representation of an enum from it's converter.
        /// Return success.
        /// </summary>
        /// <param name="converter">The converter to use.</param>
        /// <param name="untypedValue">The enumerator.</param>
        /// <param name="value">The enumerator's string representation.</param>
        /// <returns>Success or failure.</returns>
        public static bool EnumValue(this JsonConverter converter, object untypedValue, out string value) {
            try {
                StringBuilder sb = new StringBuilder();
                JsonSerializer serializer = new JsonSerializer();

                using (StringWriter sw = new StringWriter(sb))
                using (JsonWriter writer = new JsonTextWriter(sw)) {
                    converter.WriteJson(writer, untypedValue, serializer);
                    value = sb.ToString().Replace("\"", "");
                    return true;
                }
            } catch (Exception) {
                value = null;
                return false;
            }
        }

        /// <summary>
        /// Get the enumerator for a string from the enumerator's converter.
        /// NOTE: Enum values MUST be lowercase in the schema for this to work. (Currently just the Search Request parameters.)
        /// </summary>
        /// <typeparam name="T">The enumerator type.</typeparam>
        /// <param name="converter">The converter to use.</param>
        /// <param name="existingValue">The string representation of the enumerator.</param>
        /// <param name="value">The enumerator.</param>
        /// <returns>Success or failure.</returns>
        public static bool ConvertEnum<T>(this JsonConverter converter, string existingValue, out object value) {
            try {
                StringBuilder sb = new StringBuilder();
                JsonSerializer serializer = new JsonSerializer();
                using (StringReader sr = new StringReader($"\"{existingValue.ToLower()}\""))
                using (JsonReader reader = new JsonTextReader(sr)) {
                    value = converter.ReadJson(reader, typeof(T), existingValue, serializer);
                    return true;
                }
            } catch (Exception) {
                value = null;
                return false;
            }
        }

        /// <summary>
        /// Print a list to a quoted delimited string.
        /// </summary>
        /// <param name="list">The list to print to a string.</param>
        /// <returns>The quoted delimited string.</returns>
        public static string PrintQuotedDelimited(this List<string> list) {
            StringBuilder sb = new StringBuilder();
            foreach (string sItem in list) {
                if (sb.Length > 0) { sb.Append(','); }
                sb.Append("'");
                sb.Append(sItem);
                sb.Append("'");
            }
            return sb.ToString();
        }
    }
}
