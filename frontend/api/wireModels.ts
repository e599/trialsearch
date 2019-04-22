// To parse this data:
//
//   import { Convert, DetailResponse, ErrorResponse, SearchRequest, SearchRequestDefaulted, SearchResponse } from "./file";
//
//   const detailResponse = Convert.toDetailResponse(json);
//   const errorResponse = Convert.toErrorResponse(json);
//   const searchRequest = Convert.toSearchRequest(json);
//   const searchRequestDefaulted = Convert.toSearchRequestDefaulted(json);
//   const searchResponse = Convert.toSearchResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * the detailed data from a clinical trial
 */
export interface DetailResponse {
    age_ranges?:         DetailAgeRange[];
    brief_summary?:      string;
    brief_title?:        string;
    conditions?:         DetailCondition[];
    contacts?:           DetailContact[];
    criteria_text?:      string;
    genders?:            DetailSex[];
    healthy_volunteers?: DetailHealthyVolunteers[];
    interventions?:      DetailIntervention[];
    locations?:          DetailLocation[];
    maximum_age?:        string;
    mesh_terms?:         DetailMeshTerm[];
    minimum_age?:        string;
    nct_id:              string;
    new_id:              string;
    official_title?:     string;
    org_study_id?:       string;
    overall_status?:     string;
    phase?:              string;
    sponsors?:           DetailAgency[];
    start_date?:         string;
    start_year?:         string;
    study_type?:         string;
    url?:                string;
}

/**
 * the detail age range of a clinical trial
 */
export interface DetailAgeRange {
    age_range: string;
}

/**
 * the detail condition of a clinical trial
 */
export interface DetailCondition {
    condition: string;
    new_id:    string;
}

/**
 * the detail contact of a clinical trial
 */
export interface DetailContact {
    degrees?:                string;
    email?:                  string;
    first_name?:             string;
    investigator_full_name?: string;
    investigator_title?:     string;
    last_name?:              string;
    middle_name?:            string;
    name_title?:             string;
    new_id:                  string;
    phone?:                  string;
    phone_ext?:              string;
}

/**
 * the detail sex of a clinical trial
 */
export interface DetailSex {
    gender: string;
    new_id: string;
}

/**
 * the detail healthy volunteers of a clinical trial
 */
export interface DetailHealthyVolunteers {
    healthy_volunteers: string;
    new_id:             string;
}

/**
 * the detail intervention of a clinical trial
 */
export interface DetailIntervention {
    intervention_name?: string;
    new_id:             string;
}

/**
 * the detail location info of a clinical trial
 */
export interface DetailLocation {
    city?:    string;
    country?: string;
    lat?:     string;
    lng?:     string;
    name?:    string;
    new_id:   string;
    state?:   string;
    zip?:     string;
}

/**
 * the detail mesh term of a clinical trial
 */
export interface DetailMeshTerm {
    mesh_term: string;
    new_id:    string;
}

/**
 * the detail agency of a clinical trial
 */
export interface DetailAgency {
    agency: string;
    new_id: string;
}

/**
 * data indicating error conditions
 */
export interface ErrorResponse {
    error_description?: string;
    error_number:       number;
    parameter_name?:    string;
    parameter_value?:   string;
}

/**
 * data for the search request endpoint; NOTE: enum values MUST be lowercase
 */
export interface SearchRequest {
    age_range?:          AgeRange[];
    condition_id?:       string;
    healthy_volunteers?: boolean;
    intervention_type?:  InterventionType[];
    lat?:                number;
    lat_bottom?:         number;
    lng?:                number;
    lng_right?:          number;
    location_id?:        string;
    page?:               number;
    phase?:              Phase[];
    radius?:             number;
    results?:            number;
    search_term:         string;
    sex?:                Sex[];
    sponsor_id?:         string;
    start_year?:         number[];
    status?:             Status[];
}

export enum AgeRange {
    Adult = "adult",
    Child = "child",
    OlderAdult = "older_adult",
}

export enum InterventionType {
    Behavioral = "behavioral",
    Biological = "biological",
    CombinationProduct = "combination_product",
    Device = "device",
    DiagnosticTest = "diagnostic_test",
    DietarySupplement = "dietary_supplement",
    Drug = "drug",
    Genetic = "genetic",
    Other = "other",
    Procedure = "procedure",
    Radiation = "radiation",
}

export enum Phase {
    EarlyPhase1 = "early_phase1",
    NA = "n_a",
    Phase1 = "phase1",
    Phase1Phase2 = "phase1_phase2",
    Phase2 = "phase2",
    Phase2Phase3 = "phase2_phase3",
    Phase3 = "phase3",
    Phase4 = "phase4",
}

export enum Sex {
    Female = "female",
    Male = "male",
}

export enum Status {
    ActiveNotRecruiting = "active_not_recruiting",
    ApprovedForMarketing = "approved_for_marketing",
    Available = "available",
    Completed = "completed",
    EnrollingByInvitation = "enrolling_by_invitation",
    NoLongerAvailable = "no_longer_available",
    NotYetRecruiting = "not_yet_recruiting",
    Recruiting = "recruiting",
    Suspended = "suspended",
    TemporarilyNotAvailable = "temporarily_not_available",
    Terminated = "terminated",
    UnknownStatus = "unknown_status",
    Withdrawn = "withdrawn",
    Withheld = "withheld",
}

/**
 * data for the search request, with fields requiring defaults required; NOTE: enum values
 * MUST be lowercase
 */
export interface SearchRequestDefaulted {
    age_range?:          AgeRange[];
    condition_id?:       string;
    healthy_volunteers?: boolean;
    intervention_type?:  InterventionType[];
    lat?:                number;
    lat_bottom?:         number;
    lng?:                number;
    lng_right?:          number;
    location_id?:        string;
    page:                number;
    phase?:              Phase[];
    radius?:             number;
    results:             number;
    search_term:         string;
    sex?:                Sex[];
    sponsor_id?:         string;
    start_year?:         number[];
    status?:             Status[];
}

/**
 * data included from the search response
 */
export interface SearchResponse {
    last_page:   boolean;
    num_results: number;
    page:        number;
    results:     ListClinicalTrial[];
}

/**
 * the list data from a clinical trial
 */
export interface ListClinicalTrial {
    brief_summary?:  string;
    brief_title?:    string;
    criteria_text?:  string;
    locations?:      ListLocation[];
    maximum_age?:    string;
    minimum_age?:    string;
    nct_id:          string;
    new_id:          string;
    official_title?: string;
    org_study_id?:   string;
    overall_status?: string;
    phase?:          string;
    start_date?:     string;
    start_year?:     string;
    study_type?:     string;
    url?:            string;
}

/**
 * the list location of a clinical trial
 */
export interface ListLocation {
    latitude?:  number;
    longitude?: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDetailResponse(json: string): DetailResponse {
        return cast(JSON.parse(json), r("DetailResponse"));
    }

    public static detailResponseToJson(value: DetailResponse): string {
        return JSON.stringify(uncast(value, r("DetailResponse")), null, 2);
    }

    public static toErrorResponse(json: string): ErrorResponse {
        return cast(JSON.parse(json), r("ErrorResponse"));
    }

    public static errorResponseToJson(value: ErrorResponse): string {
        return JSON.stringify(uncast(value, r("ErrorResponse")), null, 2);
    }

    public static toSearchRequest(json: string): SearchRequest {
        return cast(JSON.parse(json), r("SearchRequest"));
    }

    public static searchRequestToJson(value: SearchRequest): string {
        return JSON.stringify(uncast(value, r("SearchRequest")), null, 2);
    }

    public static toSearchRequestDefaulted(json: string): SearchRequestDefaulted {
        return cast(JSON.parse(json), r("SearchRequestDefaulted"));
    }

    public static searchRequestDefaultedToJson(value: SearchRequestDefaulted): string {
        return JSON.stringify(uncast(value, r("SearchRequestDefaulted")), null, 2);
    }

    public static toSearchResponse(json: string): SearchResponse {
        return cast(JSON.parse(json), r("SearchResponse"));
    }

    public static searchResponseToJson(value: SearchResponse): string {
        return JSON.stringify(uncast(value, r("SearchResponse")), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(typ, val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "DetailResponse": o([
        { json: "age_ranges", js: "age_ranges", typ: u(undefined, a(r("DetailAgeRange"))) },
        { json: "brief_summary", js: "brief_summary", typ: u(undefined, "") },
        { json: "brief_title", js: "brief_title", typ: u(undefined, "") },
        { json: "conditions", js: "conditions", typ: u(undefined, a(r("DetailCondition"))) },
        { json: "contacts", js: "contacts", typ: u(undefined, a(r("DetailContact"))) },
        { json: "criteria_text", js: "criteria_text", typ: u(undefined, "") },
        { json: "genders", js: "genders", typ: u(undefined, a(r("DetailSex"))) },
        { json: "healthy_volunteers", js: "healthy_volunteers", typ: u(undefined, a(r("DetailHealthyVolunteers"))) },
        { json: "interventions", js: "interventions", typ: u(undefined, a(r("DetailIntervention"))) },
        { json: "locations", js: "locations", typ: u(undefined, a(r("DetailLocation"))) },
        { json: "maximum_age", js: "maximum_age", typ: u(undefined, "") },
        { json: "mesh_terms", js: "mesh_terms", typ: u(undefined, a(r("DetailMeshTerm"))) },
        { json: "minimum_age", js: "minimum_age", typ: u(undefined, "") },
        { json: "nct_id", js: "nct_id", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
        { json: "official_title", js: "official_title", typ: u(undefined, "") },
        { json: "org_study_id", js: "org_study_id", typ: u(undefined, "") },
        { json: "overall_status", js: "overall_status", typ: u(undefined, "") },
        { json: "phase", js: "phase", typ: u(undefined, "") },
        { json: "sponsors", js: "sponsors", typ: u(undefined, a(r("DetailAgency"))) },
        { json: "start_date", js: "start_date", typ: u(undefined, "") },
        { json: "start_year", js: "start_year", typ: u(undefined, "") },
        { json: "study_type", js: "study_type", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "DetailAgeRange": o([
        { json: "age_range", js: "age_range", typ: "" },
    ], "any"),
    "DetailCondition": o([
        { json: "condition", js: "condition", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
    ], "any"),
    "DetailContact": o([
        { json: "degrees", js: "degrees", typ: u(undefined, "") },
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "first_name", js: "first_name", typ: u(undefined, "") },
        { json: "investigator_full_name", js: "investigator_full_name", typ: u(undefined, "") },
        { json: "investigator_title", js: "investigator_title", typ: u(undefined, "") },
        { json: "last_name", js: "last_name", typ: u(undefined, "") },
        { json: "middle_name", js: "middle_name", typ: u(undefined, "") },
        { json: "name_title", js: "name_title", typ: u(undefined, "") },
        { json: "new_id", js: "new_id", typ: "" },
        { json: "phone", js: "phone", typ: u(undefined, "") },
        { json: "phone_ext", js: "phone_ext", typ: u(undefined, "") },
    ], "any"),
    "DetailSex": o([
        { json: "gender", js: "gender", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
    ], "any"),
    "DetailHealthyVolunteers": o([
        { json: "healthy_volunteers", js: "healthy_volunteers", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
    ], "any"),
    "DetailIntervention": o([
        { json: "intervention_name", js: "intervention_name", typ: u(undefined, "") },
        { json: "new_id", js: "new_id", typ: "" },
    ], "any"),
    "DetailLocation": o([
        { json: "city", js: "city", typ: u(undefined, "") },
        { json: "country", js: "country", typ: u(undefined, "") },
        { json: "lat", js: "lat", typ: u(undefined, "") },
        { json: "lng", js: "lng", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "new_id", js: "new_id", typ: "" },
        { json: "state", js: "state", typ: u(undefined, "") },
        { json: "zip", js: "zip", typ: u(undefined, "") },
    ], "any"),
    "DetailMeshTerm": o([
        { json: "mesh_term", js: "mesh_term", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
    ], "any"),
    "DetailAgency": o([
        { json: "agency", js: "agency", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
    ], "any"),
    "ErrorResponse": o([
        { json: "error_description", js: "error_description", typ: u(undefined, "") },
        { json: "error_number", js: "error_number", typ: 0 },
        { json: "parameter_name", js: "parameter_name", typ: u(undefined, "") },
        { json: "parameter_value", js: "parameter_value", typ: u(undefined, "") },
    ], "any"),
    "SearchRequest": o([
        { json: "age_range", js: "age_range", typ: u(undefined, a(r("AgeRange"))) },
        { json: "condition_id", js: "condition_id", typ: u(undefined, "") },
        { json: "healthy_volunteers", js: "healthy_volunteers", typ: u(undefined, true) },
        { json: "intervention_type", js: "intervention_type", typ: u(undefined, a(r("InterventionType"))) },
        { json: "lat", js: "lat", typ: u(undefined, 3.14) },
        { json: "lat_bottom", js: "lat_bottom", typ: u(undefined, 3.14) },
        { json: "lng", js: "lng", typ: u(undefined, 3.14) },
        { json: "lng_right", js: "lng_right", typ: u(undefined, 3.14) },
        { json: "location_id", js: "location_id", typ: u(undefined, "") },
        { json: "page", js: "page", typ: u(undefined, 0) },
        { json: "phase", js: "phase", typ: u(undefined, a(r("Phase"))) },
        { json: "radius", js: "radius", typ: u(undefined, 0) },
        { json: "results", js: "results", typ: u(undefined, 0) },
        { json: "search_term", js: "search_term", typ: "" },
        { json: "sex", js: "sex", typ: u(undefined, a(r("Sex"))) },
        { json: "sponsor_id", js: "sponsor_id", typ: u(undefined, "") },
        { json: "start_year", js: "start_year", typ: u(undefined, a(0)) },
        { json: "status", js: "status", typ: u(undefined, a(r("Status"))) },
    ], "any"),
    "SearchRequestDefaulted": o([
        { json: "age_range", js: "age_range", typ: u(undefined, a(r("AgeRange"))) },
        { json: "condition_id", js: "condition_id", typ: u(undefined, "") },
        { json: "healthy_volunteers", js: "healthy_volunteers", typ: u(undefined, true) },
        { json: "intervention_type", js: "intervention_type", typ: u(undefined, a(r("InterventionType"))) },
        { json: "lat", js: "lat", typ: u(undefined, 3.14) },
        { json: "lat_bottom", js: "lat_bottom", typ: u(undefined, 3.14) },
        { json: "lng", js: "lng", typ: u(undefined, 3.14) },
        { json: "lng_right", js: "lng_right", typ: u(undefined, 3.14) },
        { json: "location_id", js: "location_id", typ: u(undefined, "") },
        { json: "page", js: "page", typ: 0 },
        { json: "phase", js: "phase", typ: u(undefined, a(r("Phase"))) },
        { json: "radius", js: "radius", typ: u(undefined, 0) },
        { json: "results", js: "results", typ: 0 },
        { json: "search_term", js: "search_term", typ: "" },
        { json: "sex", js: "sex", typ: u(undefined, a(r("Sex"))) },
        { json: "sponsor_id", js: "sponsor_id", typ: u(undefined, "") },
        { json: "start_year", js: "start_year", typ: u(undefined, a(0)) },
        { json: "status", js: "status", typ: u(undefined, a(r("Status"))) },
    ], "any"),
    "SearchResponse": o([
        { json: "last_page", js: "last_page", typ: true },
        { json: "num_results", js: "num_results", typ: 0 },
        { json: "page", js: "page", typ: 0 },
        { json: "results", js: "results", typ: a(r("ListClinicalTrial")) },
    ], "any"),
    "ListClinicalTrial": o([
        { json: "brief_summary", js: "brief_summary", typ: u(undefined, "") },
        { json: "brief_title", js: "brief_title", typ: u(undefined, "") },
        { json: "criteria_text", js: "criteria_text", typ: u(undefined, "") },
        { json: "locations", js: "locations", typ: u(undefined, a(r("ListLocation"))) },
        { json: "maximum_age", js: "maximum_age", typ: u(undefined, "") },
        { json: "minimum_age", js: "minimum_age", typ: u(undefined, "") },
        { json: "nct_id", js: "nct_id", typ: "" },
        { json: "new_id", js: "new_id", typ: "" },
        { json: "official_title", js: "official_title", typ: u(undefined, "") },
        { json: "org_study_id", js: "org_study_id", typ: u(undefined, "") },
        { json: "overall_status", js: "overall_status", typ: u(undefined, "") },
        { json: "phase", js: "phase", typ: u(undefined, "") },
        { json: "start_date", js: "start_date", typ: u(undefined, "") },
        { json: "start_year", js: "start_year", typ: u(undefined, "") },
        { json: "study_type", js: "study_type", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "ListLocation": o([
        { json: "latitude", js: "latitude", typ: u(undefined, 3.14) },
        { json: "longitude", js: "longitude", typ: u(undefined, 3.14) },
    ], "any"),
    "AgeRange": [
        "adult",
        "child",
        "older_adult",
    ],
    "InterventionType": [
        "behavioral",
        "biological",
        "combination_product",
        "device",
        "diagnostic_test",
        "dietary_supplement",
        "drug",
        "genetic",
        "other",
        "procedure",
        "radiation",
    ],
    "Phase": [
        "early_phase1",
        "n_a",
        "phase1",
        "phase1_phase2",
        "phase2",
        "phase2_phase3",
        "phase3",
        "phase4",
    ],
    "Sex": [
        "female",
        "male",
    ],
    "Status": [
        "active_not_recruiting",
        "approved_for_marketing",
        "available",
        "completed",
        "enrolling_by_invitation",
        "no_longer_available",
        "not_yet_recruiting",
        "recruiting",
        "suspended",
        "temporarily_not_available",
        "terminated",
        "unknown_status",
        "withdrawn",
        "withheld",
    ],
};
