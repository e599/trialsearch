#pragma warning disable 1591
namespace KnowledgeGraph.DataTransferObjects
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    /// <summary>
    /// the detailed data from a clinical trial
    /// </summary>
    public partial class DetailResponse
    {
        [JsonProperty("age_ranges", NullValueHandling = NullValueHandling.Ignore)]
        public DetailAgeRange[] AgeRanges { get; set; }

        [JsonProperty("brief_summary", NullValueHandling = NullValueHandling.Ignore)]
        public string BriefSummary { get; set; }

        [JsonProperty("brief_title", NullValueHandling = NullValueHandling.Ignore)]
        public string BriefTitle { get; set; }

        [JsonProperty("conditions", NullValueHandling = NullValueHandling.Ignore)]
        public DetailCondition[] Conditions { get; set; }

        [JsonProperty("contacts", NullValueHandling = NullValueHandling.Ignore)]
        public DetailContact[] Contacts { get; set; }

        [JsonProperty("criteria_text", NullValueHandling = NullValueHandling.Ignore)]
        public string CriteriaText { get; set; }

        [JsonProperty("genders", NullValueHandling = NullValueHandling.Ignore)]
        public DetailSex[] Genders { get; set; }

        [JsonProperty("healthy_volunteers", NullValueHandling = NullValueHandling.Ignore)]
        public DetailHealthyVolunteers[] HealthyVolunteers { get; set; }

        [JsonProperty("interventions", NullValueHandling = NullValueHandling.Ignore)]
        public DetailIntervention[] Interventions { get; set; }

        [JsonProperty("locations", NullValueHandling = NullValueHandling.Ignore)]
        public DetailLocation[] Locations { get; set; }

        [JsonProperty("maximum_age", NullValueHandling = NullValueHandling.Ignore)]
        public string MaximumAge { get; set; }

        [JsonProperty("mesh_terms", NullValueHandling = NullValueHandling.Ignore)]
        public DetailMeshTerm[] MeshTerms { get; set; }

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
        public DetailAgency[] Sponsors { get; set; }

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
    /// the detail age range of a clinical trial
    /// </summary>
    public partial class DetailAgeRange
    {
        [JsonProperty("age_range")]
        public string AgeRange { get; set; }
    }

    /// <summary>
    /// the detail condition of a clinical trial
    /// </summary>
    public partial class DetailCondition
    {
        [JsonProperty("condition")]
        public string Condition { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// the detail contact of a clinical trial
    /// </summary>
    public partial class DetailContact
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
    /// the detail sex of a clinical trial
    /// </summary>
    public partial class DetailSex
    {
        [JsonProperty("gender")]
        public string Gender { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// the detail healthy volunteers of a clinical trial
    /// </summary>
    public partial class DetailHealthyVolunteers
    {
        [JsonProperty("healthy_volunteers")]
        public string HealthyVolunteers { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// the detail intervention of a clinical trial
    /// </summary>
    public partial class DetailIntervention
    {
        [JsonProperty("intervention_name", NullValueHandling = NullValueHandling.Ignore)]
        public string InterventionName { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// the detail location info of a clinical trial
    /// </summary>
    public partial class DetailLocation
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
    /// the detail mesh term of a clinical trial
    /// </summary>
    public partial class DetailMeshTerm
    {
        [JsonProperty("mesh_term")]
        public string MeshTerm { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// the detail agency of a clinical trial
    /// </summary>
    public partial class DetailAgency
    {
        [JsonProperty("agency")]
        public string Agency { get; set; }

        [JsonProperty("new_id")]
        public string NewId { get; set; }
    }

    /// <summary>
    /// data indicating error conditions
    /// </summary>
    public partial class ErrorResponse
    {
        [JsonProperty("error_description", NullValueHandling = NullValueHandling.Ignore)]
        public string ErrorDescription { get; set; }

        [JsonProperty("error_number")]
        public long ErrorNumber { get; set; }

        [JsonProperty("parameter_name", NullValueHandling = NullValueHandling.Ignore)]
        public string ParameterName { get; set; }

        [JsonProperty("parameter_value", NullValueHandling = NullValueHandling.Ignore)]
        public string ParameterValue { get; set; }
    }

    /// <summary>
    /// data for the search request endpoint; NOTE: enum values MUST be lowercase
    /// </summary>
    public partial class SearchRequest
    {
        [JsonProperty("age_range", NullValueHandling = NullValueHandling.Ignore)]
        public AgeRange[] AgeRange { get; set; }

        [JsonProperty("condition_id", NullValueHandling = NullValueHandling.Ignore)]
        public string ConditionId { get; set; }

        [JsonProperty("healthy_volunteers", NullValueHandling = NullValueHandling.Ignore)]
        public bool? HealthyVolunteers { get; set; }

        [JsonProperty("intervention_type", NullValueHandling = NullValueHandling.Ignore)]
        public InterventionType[] InterventionType { get; set; }

        [JsonProperty("lat", NullValueHandling = NullValueHandling.Ignore)]
        public double? Lat { get; set; }

        [JsonProperty("lat_bottom", NullValueHandling = NullValueHandling.Ignore)]
        public double? LatBottom { get; set; }

        [JsonProperty("lng", NullValueHandling = NullValueHandling.Ignore)]
        public double? Lng { get; set; }

        [JsonProperty("lng_right", NullValueHandling = NullValueHandling.Ignore)]
        public double? LngRight { get; set; }

        [JsonProperty("location_id", NullValueHandling = NullValueHandling.Ignore)]
        public string LocationId { get; set; }

        [JsonProperty("page", NullValueHandling = NullValueHandling.Ignore)]
        public long? Page { get; set; }

        [JsonProperty("phase", NullValueHandling = NullValueHandling.Ignore)]
        public Phase[] Phase { get; set; }

        [JsonProperty("radius", NullValueHandling = NullValueHandling.Ignore)]
        public long? Radius { get; set; }

        [JsonProperty("results", NullValueHandling = NullValueHandling.Ignore)]
        public long? Results { get; set; }

        [JsonProperty("search_term")]
        public string SearchTerm { get; set; }

        [JsonProperty("sex", NullValueHandling = NullValueHandling.Ignore)]
        public Sex[] Sex { get; set; }

        [JsonProperty("sponsor_id", NullValueHandling = NullValueHandling.Ignore)]
        public string SponsorId { get; set; }

        [JsonProperty("start_year", NullValueHandling = NullValueHandling.Ignore)]
        public long[] StartYear { get; set; }

        [JsonProperty("status", NullValueHandling = NullValueHandling.Ignore)]
        public Status[] Status { get; set; }
    }

    /// <summary>
    /// data for the search request, with fields requiring defaults required; NOTE: enum values
    /// MUST be lowercase
    /// </summary>
    public partial class SearchRequestDefaulted
    {
        [JsonProperty("age_range", NullValueHandling = NullValueHandling.Ignore)]
        public AgeRange[] AgeRange { get; set; }

        [JsonProperty("condition_id", NullValueHandling = NullValueHandling.Ignore)]
        public string ConditionId { get; set; }

        [JsonProperty("healthy_volunteers", NullValueHandling = NullValueHandling.Ignore)]
        public bool? HealthyVolunteers { get; set; }

        [JsonProperty("intervention_type", NullValueHandling = NullValueHandling.Ignore)]
        public InterventionType[] InterventionType { get; set; }

        [JsonProperty("lat", NullValueHandling = NullValueHandling.Ignore)]
        public double? Lat { get; set; }

        [JsonProperty("lat_bottom", NullValueHandling = NullValueHandling.Ignore)]
        public double? LatBottom { get; set; }

        [JsonProperty("lng", NullValueHandling = NullValueHandling.Ignore)]
        public double? Lng { get; set; }

        [JsonProperty("lng_right", NullValueHandling = NullValueHandling.Ignore)]
        public double? LngRight { get; set; }

        [JsonProperty("location_id", NullValueHandling = NullValueHandling.Ignore)]
        public string LocationId { get; set; }

        [JsonProperty("page")]
        public long Page { get; set; }

        [JsonProperty("phase", NullValueHandling = NullValueHandling.Ignore)]
        public Phase[] Phase { get; set; }

        [JsonProperty("radius", NullValueHandling = NullValueHandling.Ignore)]
        public long? Radius { get; set; }

        [JsonProperty("results")]
        public long Results { get; set; }

        [JsonProperty("search_term")]
        public string SearchTerm { get; set; }

        [JsonProperty("sex", NullValueHandling = NullValueHandling.Ignore)]
        public Sex[] Sex { get; set; }

        [JsonProperty("sponsor_id", NullValueHandling = NullValueHandling.Ignore)]
        public string SponsorId { get; set; }

        [JsonProperty("start_year", NullValueHandling = NullValueHandling.Ignore)]
        public long[] StartYear { get; set; }

        [JsonProperty("status", NullValueHandling = NullValueHandling.Ignore)]
        public Status[] Status { get; set; }
    }

    /// <summary>
    /// data included from the search response
    /// </summary>
    public partial class SearchResponse
    {
        [JsonProperty("last_page")]
        public bool LastPage { get; set; }

        [JsonProperty("num_results")]
        public long NumResults { get; set; }

        [JsonProperty("page")]
        public long Page { get; set; }

        [JsonProperty("results")]
        public ListClinicalTrial[] Results { get; set; }
    }

    /// <summary>
    /// the list data from a clinical trial
    /// </summary>
    public partial class ListClinicalTrial
    {
        [JsonProperty("brief_summary", NullValueHandling = NullValueHandling.Ignore)]
        public string BriefSummary { get; set; }

        [JsonProperty("brief_title", NullValueHandling = NullValueHandling.Ignore)]
        public string BriefTitle { get; set; }

        [JsonProperty("criteria_text", NullValueHandling = NullValueHandling.Ignore)]
        public string CriteriaText { get; set; }

        [JsonProperty("locations", NullValueHandling = NullValueHandling.Ignore)]
        public ListLocation[] Locations { get; set; }

        [JsonProperty("maximum_age", NullValueHandling = NullValueHandling.Ignore)]
        public string MaximumAge { get; set; }

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
    /// the list location of a clinical trial
    /// </summary>
    public partial class ListLocation
    {
        [JsonProperty("latitude", NullValueHandling = NullValueHandling.Ignore)]
        public double? Latitude { get; set; }

        [JsonProperty("longitude", NullValueHandling = NullValueHandling.Ignore)]
        public double? Longitude { get; set; }
    }

    public enum AgeRange { Adult, Child, OlderAdult };

    public enum InterventionType { Behavioral, Biological, CombinationProduct, Device, DiagnosticTest, DietarySupplement, Drug, Genetic, Other, Procedure, Radiation };

    public enum Phase { EarlyPhase1, NA, Phase1, Phase1Phase2, Phase2, Phase2Phase3, Phase3, Phase4 };

    public enum Sex { Female, Male };

    public enum Status { ActiveNotRecruiting, ApprovedForMarketing, Available, Completed, EnrollingByInvitation, NoLongerAvailable, NotYetRecruiting, Recruiting, Suspended, TemporarilyNotAvailable, Terminated, UnknownStatus, Withdrawn, Withheld };

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                AgeRangeConverter.Singleton,
                InterventionTypeConverter.Singleton,
                PhaseConverter.Singleton,
                SexConverter.Singleton,
                StatusConverter.Singleton,
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
                case "adult":
                    return AgeRange.Adult;
                case "child":
                    return AgeRange.Child;
                case "older_adult":
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
                    serializer.Serialize(writer, "adult");
                    return;
                case AgeRange.Child:
                    serializer.Serialize(writer, "child");
                    return;
                case AgeRange.OlderAdult:
                    serializer.Serialize(writer, "older_adult");
                    return;
            }
            throw new Exception("Cannot marshal type AgeRange");
        }

        public static readonly AgeRangeConverter Singleton = new AgeRangeConverter();
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
                case "behavioral":
                    return InterventionType.Behavioral;
                case "biological":
                    return InterventionType.Biological;
                case "combination_product":
                    return InterventionType.CombinationProduct;
                case "device":
                    return InterventionType.Device;
                case "diagnostic_test":
                    return InterventionType.DiagnosticTest;
                case "dietary_supplement":
                    return InterventionType.DietarySupplement;
                case "drug":
                    return InterventionType.Drug;
                case "genetic":
                    return InterventionType.Genetic;
                case "other":
                    return InterventionType.Other;
                case "procedure":
                    return InterventionType.Procedure;
                case "radiation":
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
                    serializer.Serialize(writer, "behavioral");
                    return;
                case InterventionType.Biological:
                    serializer.Serialize(writer, "biological");
                    return;
                case InterventionType.CombinationProduct:
                    serializer.Serialize(writer, "combination_product");
                    return;
                case InterventionType.Device:
                    serializer.Serialize(writer, "device");
                    return;
                case InterventionType.DiagnosticTest:
                    serializer.Serialize(writer, "diagnostic_test");
                    return;
                case InterventionType.DietarySupplement:
                    serializer.Serialize(writer, "dietary_supplement");
                    return;
                case InterventionType.Drug:
                    serializer.Serialize(writer, "drug");
                    return;
                case InterventionType.Genetic:
                    serializer.Serialize(writer, "genetic");
                    return;
                case InterventionType.Other:
                    serializer.Serialize(writer, "other");
                    return;
                case InterventionType.Procedure:
                    serializer.Serialize(writer, "procedure");
                    return;
                case InterventionType.Radiation:
                    serializer.Serialize(writer, "radiation");
                    return;
            }
            throw new Exception("Cannot marshal type InterventionType");
        }

        public static readonly InterventionTypeConverter Singleton = new InterventionTypeConverter();
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
                case "early_phase1":
                    return Phase.EarlyPhase1;
                case "n_a":
                    return Phase.NA;
                case "phase1":
                    return Phase.Phase1;
                case "phase1_phase2":
                    return Phase.Phase1Phase2;
                case "phase2":
                    return Phase.Phase2;
                case "phase2_phase3":
                    return Phase.Phase2Phase3;
                case "phase3":
                    return Phase.Phase3;
                case "phase4":
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
                case Phase.EarlyPhase1:
                    serializer.Serialize(writer, "early_phase1");
                    return;
                case Phase.NA:
                    serializer.Serialize(writer, "n_a");
                    return;
                case Phase.Phase1:
                    serializer.Serialize(writer, "phase1");
                    return;
                case Phase.Phase1Phase2:
                    serializer.Serialize(writer, "phase1_phase2");
                    return;
                case Phase.Phase2:
                    serializer.Serialize(writer, "phase2");
                    return;
                case Phase.Phase2Phase3:
                    serializer.Serialize(writer, "phase2_phase3");
                    return;
                case Phase.Phase3:
                    serializer.Serialize(writer, "phase3");
                    return;
                case Phase.Phase4:
                    serializer.Serialize(writer, "phase4");
                    return;
            }
            throw new Exception("Cannot marshal type Phase");
        }

        public static readonly PhaseConverter Singleton = new PhaseConverter();
    }

    internal class SexConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Sex) || t == typeof(Sex?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "female":
                    return Sex.Female;
                case "male":
                    return Sex.Male;
            }
            throw new Exception("Cannot unmarshal type Sex");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (Sex)untypedValue;
            switch (value)
            {
                case Sex.Female:
                    serializer.Serialize(writer, "female");
                    return;
                case Sex.Male:
                    serializer.Serialize(writer, "male");
                    return;
            }
            throw new Exception("Cannot marshal type Sex");
        }

        public static readonly SexConverter Singleton = new SexConverter();
    }

    internal class StatusConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(Status) || t == typeof(Status?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            switch (value)
            {
                case "active_not_recruiting":
                    return Status.ActiveNotRecruiting;
                case "approved_for_marketing":
                    return Status.ApprovedForMarketing;
                case "available":
                    return Status.Available;
                case "completed":
                    return Status.Completed;
                case "enrolling_by_invitation":
                    return Status.EnrollingByInvitation;
                case "no_longer_available":
                    return Status.NoLongerAvailable;
                case "not_yet_recruiting":
                    return Status.NotYetRecruiting;
                case "recruiting":
                    return Status.Recruiting;
                case "suspended":
                    return Status.Suspended;
                case "temporarily_not_available":
                    return Status.TemporarilyNotAvailable;
                case "terminated":
                    return Status.Terminated;
                case "unknown_status":
                    return Status.UnknownStatus;
                case "withdrawn":
                    return Status.Withdrawn;
                case "withheld":
                    return Status.Withheld;
            }
            throw new Exception("Cannot unmarshal type Status");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (Status)untypedValue;
            switch (value)
            {
                case Status.ActiveNotRecruiting:
                    serializer.Serialize(writer, "active_not_recruiting");
                    return;
                case Status.ApprovedForMarketing:
                    serializer.Serialize(writer, "approved_for_marketing");
                    return;
                case Status.Available:
                    serializer.Serialize(writer, "available");
                    return;
                case Status.Completed:
                    serializer.Serialize(writer, "completed");
                    return;
                case Status.EnrollingByInvitation:
                    serializer.Serialize(writer, "enrolling_by_invitation");
                    return;
                case Status.NoLongerAvailable:
                    serializer.Serialize(writer, "no_longer_available");
                    return;
                case Status.NotYetRecruiting:
                    serializer.Serialize(writer, "not_yet_recruiting");
                    return;
                case Status.Recruiting:
                    serializer.Serialize(writer, "recruiting");
                    return;
                case Status.Suspended:
                    serializer.Serialize(writer, "suspended");
                    return;
                case Status.TemporarilyNotAvailable:
                    serializer.Serialize(writer, "temporarily_not_available");
                    return;
                case Status.Terminated:
                    serializer.Serialize(writer, "terminated");
                    return;
                case Status.UnknownStatus:
                    serializer.Serialize(writer, "unknown_status");
                    return;
                case Status.Withdrawn:
                    serializer.Serialize(writer, "withdrawn");
                    return;
                case Status.Withheld:
                    serializer.Serialize(writer, "withheld");
                    return;
            }
            throw new Exception("Cannot marshal type Status");
        }

        public static readonly StatusConverter Singleton = new StatusConverter();
    }
}
#pragma warning restore 1591
