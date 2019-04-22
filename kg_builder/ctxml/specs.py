ct_spec_dict = {
    "ClinicalTrial": {
        "csv_filename_prefix": "node_clinical_trial",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "nct_id",
            "org_study_id",
            "url",
            "brief_title",
            "official_title",
            "overall_status",
            "phase",
            "study_type",
            "healthy_volunteers",
            "minimum_age",
            "maximum_age",
            "gender",
            "last_known_status",
            "start_date",
            "brief_summary",
            "criteria_text",
            ":LABEL",
        ],
        "xml_path_sets": {
            "clinical_trial": {
                "nct_id": "./id_info/nct_id",
                "org_study_id": "./id_info/org_study_id",
                "url": "./required_header/url",
                "brief_title": "./brief_title",
                "official_title": "./official_title",
                "overall_status": "./overall_status",
                "phase": "./phase",
                "study_type": "./study_type",
                "healthy_volunteers": "./eligibility/healthy_volunteers",
                "minimum_age": "./eligibility/minimum_age",
                "maximum_age": "./eligibility/maximum_age",
                "gender": "./eligibility/gender",
                "last_known_status": "./last_known_status",
                "start_date": "./start_date",
                "brief_summary": "./brief_summary/textblock",
                "criteria_text": "./eligibility/criteria/textblock",
            },
        },
    },
    "EnrollmentStatus": {
        "csv_filename_prefix": "node_enrollment_status",
        "is_enum": True,
        "field_names": [
            "new_id:ID",
            "overall_status",
            ":LABEL",
        ],
        "xml_path_sets": {
            "overall_status": {
                "overall_status": "./overall_status",
            },
        },
    },
    "Phase": {
        "csv_filename_prefix": "node_phase",
        "is_enum": True,
        "field_names": [
            "new_id:ID",
            "phase",
            ":LABEL",
        ],
        "xml_path_sets": {
            "phase": {
                "phase": "./phase",
            },
        },
    },
    "StudyType": {
        "csv_filename_prefix": "node_study_type",
        "is_enum": True,
        "field_names": [
            "new_id:ID",
            "study_type",
            ":LABEL",
        ],
        "xml_path_sets": {
            "study_type": {
                "study_type": "./study_type",
            },
        },
    },
    "HealthyVolunteers": {
        "csv_filename_prefix": "node_healthy_volunteers",
        "is_enum": True,
        "field_names": [
            "new_id:ID",
            "healthy_volunteers",
            ":LABEL",
        ],
        "xml_path_sets": {
            "healthy_volunteers": {
                "healthy_volunteers": "./eligibility/healthy_volunteers",
            }
        }
    },
    "Condition": {
        "csv_filename_prefix": "node_condition",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "condition",
            ":LABEL",
        ],
        "xml_path_sets": {
            "condition": {
                "condition": ".",
            },
        },
    },
    "Intervention": {
        "csv_filename_prefix": "node_intervention",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "intervention_name",
            ":LABEL",
        ],
        "xml_path_sets": {
            "intervention": {
                "intervention_name": "./intervention_name",
            },
        },
    },
    "InterventionType": {
        "csv_filename_prefix": "node_intervention_type",
        "is_enum": True,
        "field_names": [
            "new_id:ID",
            "intervention_type",
            ":LABEL",
        ],
        "xml_path_sets": {
            "intervention_type": {
                "intervention_type": "./intervention_type",
            },
        },
    },
    "Agency": {
        "csv_filename_prefix": "node_agency",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "agency",
            ":LABEL",
        ],
        "xml_path_sets": {
            "lead_sponsor_agency": {
                "agency": "./sponsors/lead_sponsor/agency",
            },
            "collaborator_agency": {
                "agency": "./agency",
            },
            "overall_official_affiliation": {
                "agency": "./affiliation",
            },
            "responsible_party_investigator_affiliation": {
                "agency": "./responsible_party/investigator_affiliation",
            },
            "location_investigator_affiliation": {
                "agency": "./investigator/affiliation",
            }
        },
    },
    "AgencyClass": {
        "csv_filename_prefix": "node_agency_class",
        "is_enum": True,
        "field_names": [
            "new_id:ID",
            "agency_class",
            ":LABEL",
        ],
        "xml_path_sets": {
            "lead_sponsor_agency_class": {
                "agency_class": "./sponsors/lead_sponsor/agency_class",
            },
            "collaborator_agency_class": {
                "agency_class": "./agency_class",
            },
        },
    },
    "Location": {
        "csv_filename_prefix": "node_location",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "name",
            "zip",
            "city",
            "state",
            "country",
            ":LABEL",
        ],
        "xml_path_sets": {
            "location": {
                "name": "./facility/name",
                "zip": "./facility/address/zip",
                "city": "./facility/address/city",
                "state": "./facility/address/state",
                "country": "./facility/address/country",
            },
        },
    },
    "Contact": {
        "csv_filename_prefix": "node_contact",
        "field_names": [
            "new_id:ID",
            "first_name",
            "middle_name",
            "last_name",
            "degrees",
            "phone",
            "phone_ext",
            "email",
            "name_title",
            "investigator_full_name",
            "investigator_title",
            ":LABEL",
        ],
        "xml_path_sets": {
            "overall_official": {
                "first_name": "./first_name",
                "middle_name": "./middle_name",
                "last_name": "./last_name",
                "degrees": "./degrees",
            },
            "responsible_party": {
                "name_title": "./responsible_party/name_title",
                "investigator_full_name": "./responsible_party/investigator_full_name",
                "investigator_title": "./responsible_party/investigator_title",
            },
            "location_investigator": {
                "first_name": "./investigator/first_name",
                "middle_name": "./investigator/middle_name",
                "last_name": "./investigator/last_name",
                "degrees": "./investigator/degrees",
            },
            "location_contact": {
                "first_name": "./contact/first_name",
                "middle_name": "./contact/middle_name",
                "last_name": "./contact/last_name",
                "degrees": "./contact/degrees",
                "phone": "./contact/phone",
                "phone_ext": "./contact/phone_ext",
                "email": "./contact/email",
            },
            "location_contact_backup": {
                "first_name": "./contact_backup/first_name",
                "middle_name": "./contact_backup/middle_name",
                "last_name": "./contact_backup/last_name",
                "degrees": "./contact_backup/degrees",
                "phone": "./contact_backup/phone",
                "phone_ext": "./contact_backup/phone_ext",
                "email": "./contact_backup/email",
            },
            "overall_contact": {
                "first_name": "./overall_contact/first_name",
                "middle_name": "./overall_contact/middle_name",
                "last_name": "./overall_contact/last_name",
                "degrees": "./overall_contact/degrees",
                "phone": "./overall_contact/phone",
                "phone_ext": "./overall_contact/phone_ext",
                "email": "./overall_contact/email",
            },
            "overall_contact_backup": {
                "first_name": "./overall_contact_backup/first_name",
                "middle_name": "./overall_contact_backup/middle_name",
                "last_name": "./overall_contact_backup/last_name",
                "degrees": "./overall_contact_backup/degrees",
                "phone": "./overall_contact_backup/phone",
                "phone_ext": "./overall_contact_backup/phone_ext",
                "email": "./overall_contact_backup/email",
            },
        }
    },
    "Relationship": {
        "csv_filename_prefix": "relationship_all",
        "is_enum": False,
        "field_names": [
            ":START_ID",
            ":END_ID",
            ":TYPE",
        ],
        "relationship_xml_paths": {
            "responsible_party_type": "./responsible_party/responsible_party_type",
            "overall_official_role": "./overall_official/role",
            "location_investigator_role": "./location/investigator/role",
        },
    },
    "ConditionMeshTerm": {
        "csv_filename_prefix": "node_condition_mesh_term",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "mesh_term",
            ":LABEL",
        ],
        "xml_path_sets": {
            "mesh_term": {
                "mesh_term": ".",
            },
        },
    },
    "InterventionMeshTerm": {
        "csv_filename_prefix": "node_intervention_mesh_term",
        "is_enum": False,
        "field_names": [
            "new_id:ID",
            "mesh_term",
            ":LABEL",
        ],
        "xml_path_sets": {
            "mesh_term": {
                "mesh_term": ".",
            },
        },
    },
}

relationship_enum_dict = {
    "Principal Investigator": "HAS_PI",
    "Study Chair": "HAS_STUDY_CHAIR",
    "Study Director": "HAS_STUDY_DIRECTOR",
    "Sub-Investigator": "HAS_SUBINVESTIGATOR",
    "Sponsor": "HAS_SPONSOR",
    "Sponsor-Investigator": "HAS_SPONSORINVESTIGATOR",
}
