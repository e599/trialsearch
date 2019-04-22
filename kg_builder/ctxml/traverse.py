
from kg_builder.ctxml.writers import write_node
from kg_builder.ctxml.writers import write_relationship
from kg_builder.ctxml.writers import write_relationship_via_ids
from kg_builder.ctxml.writers import write_xml_relationship


def extract_xml_file_to_csv(root):
    write_node(
        "ClinicalTrial",
        "clinical_trial",
        root,
        required_fields=["nct_id"],
        fields_to_clean=["brief_summary", "criteria_text"],
    )
    write_node("EnrollmentStatus", "overall_status", root)
    write_relationship("ClinicalTrial", "HAS_ENROLLMENT_STATUS", "EnrollmentStatus")
    write_node("Phase", "phase", root)
    write_relationship("ClinicalTrial", "HAS_PHASE", "Phase")
    write_node("StudyType", "study_type", root, required_fields=["study_type"])
    write_relationship("ClinicalTrial", "HAS_STUDY_TYPE", "StudyType")
    write_node("HealthyVolunteers", "healthy_volunteers", root)
    write_relationship("ClinicalTrial", "HAS_INCLUSION_CRITERION", "HealthyVolunteers")

    condition_id_list = []
    for condition in root.iter("condition"):
        condition_id_list.append(write_node("Condition", "condition", condition))
        write_relationship("ClinicalTrial", "STUDIES", "Condition")

    intervention_id_list = []
    for intervention in root.iter("intervention"):
        intervention_id_list.append(write_node("Intervention", "intervention", intervention))
        write_node("InterventionType", "intervention_type", intervention)
        write_relationship("Intervention", "HAS_CATEGORY", "InterventionType")
        write_relationship("ClinicalTrial", "HAS_INTERVENTION", "Intervention")

    for condition_id in condition_id_list:
        for intervention_id in intervention_id_list:
            write_relationship_via_ids(intervention_id, "IS_TREATMENT_FOR", condition_id)

    for mesh_term_browse in root.iter("condition_browse"):
        for mesh_term in mesh_term_browse.iter("mesh_term"):
            write_node("ConditionMeshTerm", "mesh_term", mesh_term)
            write_relationship("ClinicalTrial", "HAS_CONDITION_MESH_TERM", "ConditionMeshTerm")

    for mesh_term_browse in root.iter("intervention_browse"):
        for mesh_term in mesh_term_browse.iter("mesh_term"):
            write_node("InterventionMeshTerm", "mesh_term", mesh_term)
            write_relationship("ClinicalTrial", "HAS_INTERVENTION_MESH_TERM", "InterventionMeshTerm")

    write_node("Agency", "lead_sponsor_agency", root)
    write_node("AgencyClass", "lead_sponsor_agency_class", root)
    write_relationship("Agency", "HAS_CLASS", "AgencyClass")
    write_relationship("ClinicalTrial", "HAS_SPONSOR", "Agency")

    for collaborator in root.iter("collaborator"):
        write_node("Agency", "collaborator_agency", collaborator)
        write_node("AgencyClass", "collaborator_agency_class", root)
        write_relationship("Agency", "HAS_CLASS", "AgencyClass")
        write_relationship("ClinicalTrial", "HAS_COLLABORATOR", "Agency")

    write_node("Contact", "overall_contact", root, required_fields=["last_name"])
    write_relationship("ClinicalTrial", "HAS_CONTACT", "Contact")

    write_node("Contact", "overall_contact_backup", root, required_fields=["last_name"])
    write_relationship("ClinicalTrial", "HAS_CONTACT", "Contact")

    write_node(
        "Contact",
        "responsible_party",
        root,
        require_one_of_fields=["name_title", "investigator_full_name"],
    )
    write_node(
        "Agency",
        "responsible_party_investigator_affiliation",
        root,
    )
    write_xml_relationship(
        "ClinicalTrial",
        "responsible_party_type",
        root,
        "HAS_RESPONSIBLE_PARTY",
        "Contact",
    )
    write_relationship("Agency", "WORKS_WITH", "Contact")

    for contact in root.iter("overall_official"):
        write_node(
            "Contact",
            "overall_official",
            contact,
            required_fields=["last_name"],
        )
        write_node(
            "Agency",
            "overall_official_affiliation",
            contact,
        )
        write_xml_relationship(
            "ClinicalTrial",
            "overall_official_role",
            root,
            "HAS_OVERALL_OFFICIAL",
            "Contact",
        )
        write_relationship("Agency", "WORKS_WITH", "Contact")

    for location in root.iter("location"):
        write_node("Location", "location", location)
        write_node(
            "Contact",
            "location_investigator",
            location,
            required_fields=["last_name"],
        )
        write_node(
            "Agency",
            "location_investigator_affiliation",
            location,
        )
        write_relationship("ClinicalTrial", "HAS_LOCATION", "Location")
        write_xml_relationship(
            "ClinicalTrial",
            "location_investigator_role",
            location,
            "HAS_LOCATION_INVESTIGATOR",
            "Contact"
        )
        write_relationship("Contact", "HAS_LOCATION", "Location")
        write_relationship("Agency", "WORKS_WITH", "Contact")
        write_node("Contact", "location_contact", location, required_fields=["last_name"])
        write_relationship("Contact", "HAS_LOCATION", "Location")
        write_node("Contact", "location_contact_backup", location, required_fields=["last_name"])
        write_relationship("Contact", "HAS_LOCATION", "Location")
