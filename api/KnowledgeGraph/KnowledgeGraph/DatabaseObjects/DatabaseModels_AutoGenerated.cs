#pragma warning disable 1591
namespace KnowledgeGraph.DatabaseObjects
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    /// <summary>
    /// Database object for Age Range
    /// </summary>
    public partial class AgeRangeNode
    {
        [JsonProperty("age_range")]
        public string AgeRange { get; set; }
    }

    /// <summary>
    /// Database object for AgencyClass
    /// </summary>
    public partial class AgencyClassNode
    {
        [JsonProperty("agency_class")]
        public string AgencyClass { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Agency
    /// </summary>
    public partial class AgencyNode
    {
        [JsonProperty("agency")]
        public string Agency { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Clinical Trial Detail
    /// </summary>
    public partial class ClinicalTrialDetailNode
    {
        [JsonProperty("age_ranges", NullValueHandling = NullValueHandling.Ignore)]
        public AgeRangeElement[] AgeRanges { get; set; }

        [JsonProperty("brief_summary", NullValueHandling = NullValueHandling.Ignore)]
        public string BriefSummary { get; set; }

        [JsonProperty("brief_title", NullValueHandling = NullValueHandling.Ignore)]
        public string BriefTitle { get; set; }

        [JsonProperty("conditions", NullValueHandling = NullValueHandling.Ignore)]
        public ConditionElement[] Conditions { get; set; }

        [JsonProperty("contacts", NullValueHandling = NullValueHandling.Ignore)]
        public ContactElement[] Contacts { get; set; }

        [JsonProperty("criteria_text", NullValueHandling = NullValueHandling.Ignore)]
        public string CriteriaText { get; set; }

        [JsonProperty("genders", NullValueHandling = NullValueHandling.Ignore)]
        public GenderElement[] Genders { get; set; }

        [JsonProperty("healthy_volunteers", NullValueHandling = NullValueHandling.Ignore)]
        public HealthyVolunteerElement[] HealthyVolunteers { get; set; }

        [JsonProperty("interventions", NullValueHandling = NullValueHandling.Ignore)]
        public InterventionElement[] Interventions { get; set; }

        [JsonProperty("locations", NullValueHandling = NullValueHandling.Ignore)]
        public LocationElement[] Locations { get; set; }

        [JsonProperty("maximum_age", NullValueHandling = NullValueHandling.Ignore)]
        public string MaximumAge { get; set; }

        [JsonProperty("mesh_terms", NullValueHandling = NullValueHandling.Ignore)]
        public MeshTermElement[] MeshTerms { get; set; }

        [JsonProperty("minimum_age", NullValueHandling = NullValueHandling.Ignore)]
        public string MinimumAge { get; set; }

        [JsonProperty("nct_id")]
        public string NctId { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("official_title", NullValueHandling = NullValueHandling.Ignore)]
        public string OfficialTitle { get; set; }

        [JsonProperty("org_study_id", NullValueHandling = NullValueHandling.Ignore)]
        public string OrgStudyId { get; set; }

        [JsonProperty("overall_status", NullValueHandling = NullValueHandling.Ignore)]
        public string OverallStatus { get; set; }

        [JsonProperty("phase", NullValueHandling = NullValueHandling.Ignore)]
        public string Phase { get; set; }

        [JsonProperty("sponsors", NullValueHandling = NullValueHandling.Ignore)]
        public SponsorElement[] Sponsors { get; set; }

        [JsonProperty("start_date", NullValueHandling = NullValueHandling.Ignore)]
        public string StartDate { get; set; }

        [JsonProperty("start_year", NullValueHandling = NullValueHandling.Ignore)]
        public string StartYear { get; set; }

        [JsonProperty("study_type", NullValueHandling = NullValueHandling.Ignore)]
        public string StudyType { get; set; }

        [JsonProperty("url", NullValueHandling = NullValueHandling.Ignore)]
        public string Url { get; set; }
    }

    /// <summary>
    /// Database object for Age Range
    /// </summary>
    public partial class AgeRangeElement
    {
        [JsonProperty("age_range")]
        public string AgeRange { get; set; }
    }

    /// <summary>
    /// Database object for Condition
    /// </summary>
    public partial class ConditionElement
    {
        [JsonProperty("condition")]
        public string Condition { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Contact
    /// </summary>
    public partial class ContactElement
    {
        [JsonProperty("degrees", NullValueHandling = NullValueHandling.Ignore)]
        public string Degrees { get; set; }

        [JsonProperty("email", NullValueHandling = NullValueHandling.Ignore)]
        public string Email { get; set; }

        [JsonProperty("first_name", NullValueHandling = NullValueHandling.Ignore)]
        public string FirstName { get; set; }

        [JsonProperty("investigator_full_name", NullValueHandling = NullValueHandling.Ignore)]
        public string InvestigatorFullName { get; set; }

        [JsonProperty("investigator_title", NullValueHandling = NullValueHandling.Ignore)]
        public string InvestigatorTitle { get; set; }

        [JsonProperty("last_name", NullValueHandling = NullValueHandling.Ignore)]
        public string LastName { get; set; }

        [JsonProperty("middle_name", NullValueHandling = NullValueHandling.Ignore)]
        public string MiddleName { get; set; }

        [JsonProperty("name_title", NullValueHandling = NullValueHandling.Ignore)]
        public string NameTitle { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("phone", NullValueHandling = NullValueHandling.Ignore)]
        public string Phone { get; set; }

        [JsonProperty("phone_ext", NullValueHandling = NullValueHandling.Ignore)]
        public string PhoneExt { get; set; }
    }

    /// <summary>
    /// Database object for Sex
    /// </summary>
    public partial class GenderElement
    {
        [JsonProperty("gender")]
        public string Gender { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Healthy Volunteers
    /// </summary>
    public partial class HealthyVolunteerElement
    {
        [JsonProperty("healthy_volunteers")]
        public string HealthyVolunteers { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Intervention
    /// </summary>
    public partial class InterventionElement
    {
        [JsonProperty("intervention_name")]
        public string InterventionName { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Location
    /// </summary>
    public partial class LocationElement
    {
        [JsonProperty("city", NullValueHandling = NullValueHandling.Ignore)]
        public string City { get; set; }

        [JsonProperty("country", NullValueHandling = NullValueHandling.Ignore)]
        public string Country { get; set; }

        [JsonProperty("lat", NullValueHandling = NullValueHandling.Ignore)]
        public string Lat { get; set; }

        [JsonProperty("lng", NullValueHandling = NullValueHandling.Ignore)]
        public string Lng { get; set; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("state", NullValueHandling = NullValueHandling.Ignore)]
        public string State { get; set; }

        [JsonProperty("zip", NullValueHandling = NullValueHandling.Ignore)]
        public string Zip { get; set; }
    }

    /// <summary>
    /// Database object for Mesh Term
    /// </summary>
    public partial class MeshTermElement
    {
        [JsonProperty("mesh_term")]
        public string MeshTerm { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Agency
    /// </summary>
    public partial class SponsorElement
    {
        [JsonProperty("agency")]
        public string Agency { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Clinical Trial
    /// </summary>
    public partial class ClinicalTrialNode
    {
        [JsonProperty("brief_summary")]
        public string BriefSummary { get; set; }

        [JsonProperty("brief_title")]
        public string BriefTitle { get; set; }

        [JsonProperty("criteria_text", NullValueHandling = NullValueHandling.Ignore)]
        public string CriteriaText { get; set; }

        [JsonProperty("locations", NullValueHandling = NullValueHandling.Ignore)]
        public LocationElement[] Locations { get; set; }

        [JsonProperty("maximum_age", NullValueHandling = NullValueHandling.Ignore)]
        public string MaximumAge { get; set; }

        [JsonProperty("minimum_age", NullValueHandling = NullValueHandling.Ignore)]
        public string MinimumAge { get; set; }

        [JsonProperty("nct_id")]
        public string NctId { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("official_title")]
        public string OfficialTitle { get; set; }

        [JsonProperty("org_study_id")]
        public string OrgStudyId { get; set; }

        [JsonProperty("overall_status", NullValueHandling = NullValueHandling.Ignore)]
        public string OverallStatus { get; set; }

        [JsonProperty("phase", NullValueHandling = NullValueHandling.Ignore)]
        public string Phase { get; set; }

        [JsonProperty("start_date", NullValueHandling = NullValueHandling.Ignore)]
        public string StartDate { get; set; }

        [JsonProperty("start_year", NullValueHandling = NullValueHandling.Ignore)]
        public string StartYear { get; set; }

        [JsonProperty("study_type", NullValueHandling = NullValueHandling.Ignore)]
        public string StudyType { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    /// <summary>
    /// Database object for Condition
    /// </summary>
    public partial class ConditionNode
    {
        [JsonProperty("condition")]
        public string Condition { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Contact
    /// </summary>
    public partial class ContactNode
    {
        [JsonProperty("degrees", NullValueHandling = NullValueHandling.Ignore)]
        public string Degrees { get; set; }

        [JsonProperty("email", NullValueHandling = NullValueHandling.Ignore)]
        public string Email { get; set; }

        [JsonProperty("first_name", NullValueHandling = NullValueHandling.Ignore)]
        public string FirstName { get; set; }

        [JsonProperty("investigator_full_name", NullValueHandling = NullValueHandling.Ignore)]
        public string InvestigatorFullName { get; set; }

        [JsonProperty("investigator_title", NullValueHandling = NullValueHandling.Ignore)]
        public string InvestigatorTitle { get; set; }

        [JsonProperty("last_name", NullValueHandling = NullValueHandling.Ignore)]
        public string LastName { get; set; }

        [JsonProperty("middle_name", NullValueHandling = NullValueHandling.Ignore)]
        public string MiddleName { get; set; }

        [JsonProperty("name_title", NullValueHandling = NullValueHandling.Ignore)]
        public string NameTitle { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("phone", NullValueHandling = NullValueHandling.Ignore)]
        public string Phone { get; set; }

        [JsonProperty("phone_ext", NullValueHandling = NullValueHandling.Ignore)]
        public string PhoneExt { get; set; }
    }

    /// <summary>
    /// All Database Enums so Conversion Code gets generated.  Client can't handle
    /// deserialization properly with enums in objects.
    /// </summary>
    public partial class DbEnum
    {
        [JsonProperty("age_range", NullValueHandling = NullValueHandling.Ignore)]
        public AgeRange? AgeRange { get; set; }

        [JsonProperty("agency_class", NullValueHandling = NullValueHandling.Ignore)]
        public AgencyClass? AgencyClass { get; set; }

        [JsonProperty("gender", NullValueHandling = NullValueHandling.Ignore)]
        public Gender? Gender { get; set; }

        [JsonProperty("healthy_volunteers", NullValueHandling = NullValueHandling.Ignore)]
        public HealthyVolunteers? HealthyVolunteers { get; set; }

        [JsonProperty("intervention_type", NullValueHandling = NullValueHandling.Ignore)]
        public InterventionType? InterventionType { get; set; }

        [JsonProperty("overall_status", NullValueHandling = NullValueHandling.Ignore)]
        public OverallStatus? OverallStatus { get; set; }

        [JsonProperty("phase", NullValueHandling = NullValueHandling.Ignore)]
        public Phase? Phase { get; set; }

        [JsonProperty("study_type", NullValueHandling = NullValueHandling.Ignore)]
        public StudyType? StudyType { get; set; }
    }

    /// <summary>
    /// Database object for Enrollment Status
    /// </summary>
    public partial class EnrollmentStatusNode
    {
        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("overall_status")]
        public string OverallStatus { get; set; }
    }

    /// <summary>
    /// Database object for Healthy Volunteers
    /// </summary>
    public partial class HealthyVolunteersNode
    {
        [JsonProperty("healthy_volunteers")]
        public string HealthyVolunteers { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Intervention
    /// </summary>
    public partial class InterventionNode
    {
        [JsonProperty("intervention_name")]
        public string InterventionName { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Intervention Type
    /// </summary>
    public partial class InterventionTypeNode
    {
        [JsonProperty("intervention_type")]
        public string InterventionType { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Location
    /// </summary>
    public partial class LocationNode
    {
        [JsonProperty("city", NullValueHandling = NullValueHandling.Ignore)]
        public string City { get; set; }

        [JsonProperty("country", NullValueHandling = NullValueHandling.Ignore)]
        public string Country { get; set; }

        [JsonProperty("lat", NullValueHandling = NullValueHandling.Ignore)]
        public string Lat { get; set; }

        [JsonProperty("lng", NullValueHandling = NullValueHandling.Ignore)]
        public string Lng { get; set; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("state", NullValueHandling = NullValueHandling.Ignore)]
        public string State { get; set; }

        [JsonProperty("zip", NullValueHandling = NullValueHandling.Ignore)]
        public string Zip { get; set; }
    }

    /// <summary>
    /// Database object for Mesh Term
    /// </summary>
    public partial class MeshTermNode
    {
        [JsonProperty("mesh_term")]
        public string MeshTerm { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Phase Status
    /// </summary>
    public partial class PhaseNode
    {
        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("phase")]
        public string Phase { get; set; }
    }

    /// <summary>
    /// Database object for Sex
    /// </summary>
    public partial class SexNode
    {
        [JsonProperty("gender")]
        public string Gender { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// Database object for Study Type
    /// </summary>
    public partial class StudyTypeNode
    {
        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("study_type")]
        public string StudyType { get; set; }
    }

    /// <summary>
    /// Database object for Year
    /// </summary>
    public partial class YearNode
    {
        [JsonProperty("new_id")]
        public string NewId { get; set; }

        [JsonProperty("year")]
        public string Year { get; set; }
    }

    public enum AgeRange { Adult, Child, OlderAdult };

    public enum AgencyClass { Industry, Nih, Other, USFed };

    public enum Gender { Female, Male };

    public enum HealthyVolunteers { AcceptsHealthyVolunteers, No };

    public enum InterventionType { Behavioral, Biological, CombinationProduct, Device, DiagnosticTest, DietarySupplement, Drug, Genetic, Other, Procedure, Radiation };

    public enum OverallStatus { ActiveNotRecruiting, ApprovedForMarketing, Available, Completed, EnrollingByInvitation, NoLongerAvailable, NotYetRecruiting, Recruiting, Suspended, TemporarilyNotAvailable, Terminated, UnknownStatus, Withdrawn, Withheld };

    public enum Phase { NA, Phase1, Phase2, Phase3, Phase4 };

    public enum StudyType { ExpandedAccess, Interventional, NA, Observational, ObservationalPatientRegistry };

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                AgeRangeConverter.Singleton,
                AgencyClassConverter.Singleton,
                GenderConverter.Singleton,
                HealthyVolunteersConverter.Singleton,
                InterventionTypeConverter.Singleton,
                OverallStatusConverter.Singleton,
                PhaseConverter.Singleton,
                StudyTypeConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    internal class AgeRangeConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(AgeRange) || t == typeof(AgeRange?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Adult":
                    return AgeRange.Adult;
                case "Child":
                    return AgeRange.Child;
                case "Older Adult":
                    return AgeRange.OlderAdult;
            }
            throw new Exception("Cannot unmarshal type AgeRange");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (AgeRange)untypedValue;
            switch (value)
            {
                case AgeRange.Adult:
                    serializer.Serialize(writer, "Adult");
                    return;
                case AgeRange.Child:
                    serializer.Serialize(writer, "Child");
                    return;
                case AgeRange.OlderAdult:
                    serializer.Serialize(writer, "Older Adult");
                    return;
            }
            throw new Exception("Cannot marshal type AgeRange");
        }

        public static readonly AgeRangeConverter Singleton = new AgeRangeConverter();
    }

    internal class AgencyClassConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(AgencyClass) || t == typeof(AgencyClass?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Industry":
                    return AgencyClass.Industry;
                case "NIH":
                    return AgencyClass.Nih;
                case "Other":
                    return AgencyClass.Other;
                case "U.S. Fed":
                    return AgencyClass.USFed;
            }
            throw new Exception("Cannot unmarshal type AgencyClass");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (AgencyClass)untypedValue;
            switch (value)
            {
                case AgencyClass.Industry:
                    serializer.Serialize(writer, "Industry");
                    return;
                case AgencyClass.Nih:
                    serializer.Serialize(writer, "NIH");
                    return;
                case AgencyClass.Other:
                    serializer.Serialize(writer, "Other");
                    return;
                case AgencyClass.USFed:
                    serializer.Serialize(writer, "U.S. Fed");
                    return;
            }
            throw new Exception("Cannot marshal type AgencyClass");
        }

        public static readonly AgencyClassConverter Singleton = new AgencyClassConverter();
    }

    internal class GenderConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Gender) || t == typeof(Gender?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Female":
                    return Gender.Female;
                case "Male":
                    return Gender.Male;
            }
            throw new Exception("Cannot unmarshal type Gender");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (Gender)untypedValue;
            switch (value)
            {
                case Gender.Female:
                    serializer.Serialize(writer, "Female");
                    return;
                case Gender.Male:
                    serializer.Serialize(writer, "Male");
                    return;
            }
            throw new Exception("Cannot marshal type Gender");
        }

        public static readonly GenderConverter Singleton = new GenderConverter();
    }

    internal class HealthyVolunteersConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(HealthyVolunteers) || t == typeof(HealthyVolunteers?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Accepts Healthy Volunteers":
                    return HealthyVolunteers.AcceptsHealthyVolunteers;
                case "No":
                    return HealthyVolunteers.No;
            }
            throw new Exception("Cannot unmarshal type HealthyVolunteers");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (HealthyVolunteers)untypedValue;
            switch (value)
            {
                case HealthyVolunteers.AcceptsHealthyVolunteers:
                    serializer.Serialize(writer, "Accepts Healthy Volunteers");
                    return;
                case HealthyVolunteers.No:
                    serializer.Serialize(writer, "No");
                    return;
            }
            throw new Exception("Cannot marshal type HealthyVolunteers");
        }

        public static readonly HealthyVolunteersConverter Singleton = new HealthyVolunteersConverter();
    }

    internal class InterventionTypeConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(InterventionType) || t == typeof(InterventionType?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Behavioral":
                    return InterventionType.Behavioral;
                case "Biological":
                    return InterventionType.Biological;
                case "Combination Product":
                    return InterventionType.CombinationProduct;
                case "Device":
                    return InterventionType.Device;
                case "Diagnostic Test":
                    return InterventionType.DiagnosticTest;
                case "Dietary Supplement":
                    return InterventionType.DietarySupplement;
                case "Drug":
                    return InterventionType.Drug;
                case "Genetic":
                    return InterventionType.Genetic;
                case "Other":
                    return InterventionType.Other;
                case "Procedure":
                    return InterventionType.Procedure;
                case "Radiation":
                    return InterventionType.Radiation;
            }
            throw new Exception("Cannot unmarshal type InterventionType");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (InterventionType)untypedValue;
            switch (value)
            {
                case InterventionType.Behavioral:
                    serializer.Serialize(writer, "Behavioral");
                    return;
                case InterventionType.Biological:
                    serializer.Serialize(writer, "Biological");
                    return;
                case InterventionType.CombinationProduct:
                    serializer.Serialize(writer, "Combination Product");
                    return;
                case InterventionType.Device:
                    serializer.Serialize(writer, "Device");
                    return;
                case InterventionType.DiagnosticTest:
                    serializer.Serialize(writer, "Diagnostic Test");
                    return;
                case InterventionType.DietarySupplement:
                    serializer.Serialize(writer, "Dietary Supplement");
                    return;
                case InterventionType.Drug:
                    serializer.Serialize(writer, "Drug");
                    return;
                case InterventionType.Genetic:
                    serializer.Serialize(writer, "Genetic");
                    return;
                case InterventionType.Other:
                    serializer.Serialize(writer, "Other");
                    return;
                case InterventionType.Procedure:
                    serializer.Serialize(writer, "Procedure");
                    return;
                case InterventionType.Radiation:
                    serializer.Serialize(writer, "Radiation");
                    return;
            }
            throw new Exception("Cannot marshal type InterventionType");
        }

        public static readonly InterventionTypeConverter Singleton = new InterventionTypeConverter();
    }

    internal class OverallStatusConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(OverallStatus) || t == typeof(OverallStatus?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Active, not recruiting":
                    return OverallStatus.ActiveNotRecruiting;
                case "Approved for marketing":
                    return OverallStatus.ApprovedForMarketing;
                case "Available":
                    return OverallStatus.Available;
                case "Completed":
                    return OverallStatus.Completed;
                case "Enrolling by invitation":
                    return OverallStatus.EnrollingByInvitation;
                case "No longer available":
                    return OverallStatus.NoLongerAvailable;
                case "Not yet recruiting":
                    return OverallStatus.NotYetRecruiting;
                case "Recruiting":
                    return OverallStatus.Recruiting;
                case "Suspended":
                    return OverallStatus.Suspended;
                case "Temporarily not available":
                    return OverallStatus.TemporarilyNotAvailable;
                case "Terminated":
                    return OverallStatus.Terminated;
                case "Unknown status":
                    return OverallStatus.UnknownStatus;
                case "Withdrawn":
                    return OverallStatus.Withdrawn;
                case "Withheld":
                    return OverallStatus.Withheld;
            }
            throw new Exception("Cannot unmarshal type OverallStatus");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (OverallStatus)untypedValue;
            switch (value)
            {
                case OverallStatus.ActiveNotRecruiting:
                    serializer.Serialize(writer, "Active, not recruiting");
                    return;
                case OverallStatus.ApprovedForMarketing:
                    serializer.Serialize(writer, "Approved for marketing");
                    return;
                case OverallStatus.Available:
                    serializer.Serialize(writer, "Available");
                    return;
                case OverallStatus.Completed:
                    serializer.Serialize(writer, "Completed");
                    return;
                case OverallStatus.EnrollingByInvitation:
                    serializer.Serialize(writer, "Enrolling by invitation");
                    return;
                case OverallStatus.NoLongerAvailable:
                    serializer.Serialize(writer, "No longer available");
                    return;
                case OverallStatus.NotYetRecruiting:
                    serializer.Serialize(writer, "Not yet recruiting");
                    return;
                case OverallStatus.Recruiting:
                    serializer.Serialize(writer, "Recruiting");
                    return;
                case OverallStatus.Suspended:
                    serializer.Serialize(writer, "Suspended");
                    return;
                case OverallStatus.TemporarilyNotAvailable:
                    serializer.Serialize(writer, "Temporarily not available");
                    return;
                case OverallStatus.Terminated:
                    serializer.Serialize(writer, "Terminated");
                    return;
                case OverallStatus.UnknownStatus:
                    serializer.Serialize(writer, "Unknown status");
                    return;
                case OverallStatus.Withdrawn:
                    serializer.Serialize(writer, "Withdrawn");
                    return;
                case OverallStatus.Withheld:
                    serializer.Serialize(writer, "Withheld");
                    return;
            }
            throw new Exception("Cannot marshal type OverallStatus");
        }

        public static readonly OverallStatusConverter Singleton = new OverallStatusConverter();
    }

    internal class PhaseConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Phase) || t == typeof(Phase?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "N/A":
                    return Phase.NA;
                case "Phase 1":
                    return Phase.Phase1;
                case "Phase 2":
                    return Phase.Phase2;
                case "Phase 3":
                    return Phase.Phase3;
                case "Phase 4":
                    return Phase.Phase4;
            }
            throw new Exception("Cannot unmarshal type Phase");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (Phase)untypedValue;
            switch (value)
            {
                case Phase.NA:
                    serializer.Serialize(writer, "N/A");
                    return;
                case Phase.Phase1:
                    serializer.Serialize(writer, "Phase 1");
                    return;
                case Phase.Phase2:
                    serializer.Serialize(writer, "Phase 2");
                    return;
                case Phase.Phase3:
                    serializer.Serialize(writer, "Phase 3");
                    return;
                case Phase.Phase4:
                    serializer.Serialize(writer, "Phase 4");
                    return;
            }
            throw new Exception("Cannot marshal type Phase");
        }

        public static readonly PhaseConverter Singleton = new PhaseConverter();
    }

    internal class StudyTypeConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(StudyType) || t == typeof(StudyType?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "Expanded Access":
                    return StudyType.ExpandedAccess;
                case "Interventional":
                    return StudyType.Interventional;
                case "N/A":
                    return StudyType.NA;
                case "Observational":
                    return StudyType.Observational;
                case "Observational [Patient Registry]":
                    return StudyType.ObservationalPatientRegistry;
            }
            throw new Exception("Cannot unmarshal type StudyType");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (StudyType)untypedValue;
            switch (value)
            {
                case StudyType.ExpandedAccess:
                    serializer.Serialize(writer, "Expanded Access");
                    return;
                case StudyType.Interventional:
                    serializer.Serialize(writer, "Interventional");
                    return;
                case StudyType.NA:
                    serializer.Serialize(writer, "N/A");
                    return;
                case StudyType.Observational:
                    serializer.Serialize(writer, "Observational");
                    return;
                case StudyType.ObservationalPatientRegistry:
                    serializer.Serialize(writer, "Observational [Patient Registry]");
                    return;
            }
            throw new Exception("Cannot marshal type StudyType");
        }

        public static readonly StudyTypeConverter Singleton = new StudyTypeConverter();
    }
}
#pragma warning restore 1591
