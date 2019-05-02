
namespace KnowledgeGraph.DataTransferObjects
{
    /// <summary>
    /// Settings object for strongly typed settings in appsettings.[environment].json files
    /// </summary>
    public class Settings
    {
        /// <summary>
        /// The connection string for the Neo4j database.
        /// </summary>
        public string DatabaseConnectionString { get; set; }
        /// <summary>
        /// The user name for the Neo4j database.
        /// </summary>
        public string DatabaseUserName { get; set; }
        /// <summary>
        /// The password for the Neo4j database.
        /// </summary>
        public string DatabasePassword { get; set; }
    }
}
