using KnowledgeGraph.Common;
using static KnowledgeGraph.Common.CUtilities;
using KnowledgeGraph.DatabaseObjects;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

namespace KnowledgeGraph.DatabaseInterface
{
    /// <summary>
    /// 
    /// </summary>
    public static class ClientDetailExtensions
    {      
        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>
        /// <param name="new_id"></param>
        /// <returns></returns>
        public static ICypherFluentQuery KGWhere_ID(this ICypherFluentQuery source, string new_id) {
            string sNewIdName = JsonName<ClinicalTrialNode>(nameof(ClinicalTrialNode.NewId));
            string sNewId = EscapeSpecialCharacters(new_id);
            return source.Where($"c.{sNewIdName} =~ '(?ui){sNewId}'")    // case insensitive           
                         .With("c, {} AS arrays");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>        
        /// <returns></returns>
        public static ICypherFluentQuery KGWith_CollectDetail(this ICypherFluentQuery source) {
            string sAgeRangesName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.AgeRanges));
            string sConditionsName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.Conditions));
            string sContactsName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.Contacts));
            string sGendersName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.Genders));
            string sHealthyVolunteersName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.HealthyVolunteers));
            string sInterventionsName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.Interventions));            
            string sLocationsName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.Locations));
            string sMeshTermsName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.MeshTerms));
            string sSponsorsName = JsonName<ClinicalTrialDetailNode>(nameof(ClinicalTrialDetailNode.Sponsors));            

            return source.OptionalMatch($"(c)-[:{Rel.HAS_INCLUSION_CRITERION}]->(a1:{Nodes.AgeRange})")
                         .With($"c, arrays{{.*,a1s:collect(a1)}}")
                         .OptionalMatch($"(c)-[:{Rel.STUDIES}]->(a2:{Nodes.Condition})")
                         .With($"c, arrays{{.*,a2s:collect(a2)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_CONTACT}]->(a3:{Nodes.Contact})")
                         .With($"c, arrays{{.*,a3s:collect(a3)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_INCLUSION_CRITERION}]->(a4:{Nodes.Sex})")
                         .With($"c, arrays{{.*,a4s:collect(a4)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_INCLUSION_CRITERION}]->(a5:{Nodes.HealthyVolunteers})")
                         .With($"c, arrays{{.*,a5s:collect(a5)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_INTERVENTION}]->(a6:{Nodes.Intervention})")
                         .With($"c, arrays{{.*,a6s:collect(a6)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_LOCATION}]->(a7:{Nodes.Location})")
                         .With($"c, arrays{{.*,a7s:collect(a7)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_MESH_TERM}]->(a8:{Nodes.MeshTerm})")
                         .With($"c, arrays{{.*,a8s:collect(a8)}}")
                         .OptionalMatch($"(c)-[:{Rel.HAS_SPONSOR}]->(a9:{Nodes.Agency})")
                         .With($"c, arrays{{.*,a9s:collect(a9)}}")
                         .With($"c{{.*,"
                                     + $"{sAgeRangesName}:arrays.a1s,"
                                     + $"{sConditionsName}:arrays.a2s,"
                                     + $"{sContactsName}:arrays.a3s,"
                                     + $"{sGendersName}:arrays.a4s,"
                                     + $"{sHealthyVolunteersName}:arrays.a5s,"
                                     + $"{sInterventionsName}:arrays.a6s,"                                     
                                     + $"{sLocationsName}:arrays.a7s,"
                                     + $"{sMeshTermsName}:arrays.a8s,"
                                     + $"{sSponsorsName}:arrays.a9s}}");
        }
    }
}
