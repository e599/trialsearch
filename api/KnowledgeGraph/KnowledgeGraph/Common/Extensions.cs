using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace KnowledgeGraph.Common
{
    /// <summary>
    /// 
    /// </summary>
    public static class Extensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="converter"></param>
        /// <param name="untypedValue"></param>
        /// <param name="value"></param>
        /// <returns></returns>
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
            } catch(Exception) {
                value = null;
                return false;
            }            
        }

        /// <summary>
        /// NOTE: Enum values MUST be lowercase in the schema for this to work. (Currently just the Search Request parameters.)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="converter"></param>
        /// <param name="existingValue"></param>
        /// <param name="value"></param>
        /// <returns></returns>
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
        /// 
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
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
