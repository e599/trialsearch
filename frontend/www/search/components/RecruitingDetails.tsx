/**@jsx jsx */
import React, { Fragment, useContext, useEffect, useRef } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { DetailContact, DetailResponse, DetailLocation, DetailCondition, DetailAgency } from "../../api/wireModels"
import { singleTrialResource, singleTrialCache } from "../../api/trialsResource"
import { Tag, Collapse } from "antd"
import { propOr, equals } from "ramda"
import phoneFormatter from "phone-formatter"
import { SubSection } from "./StyledComponents"
import { SearchFiltersContext } from "./SearchFiltersContext"
import { TooltipContext, RecommendedFields } from "./TooltipContext"

const panelChildCSS = css`
  margin: 8px 0;
  height: initial;

  & > h4 {
    margin-bottom: 0;
  }
`

const Panel = styled(Collapse.Panel)`
  & > .ant-collapse-header:hover {
    background: mintcream;
  }

  & > .ant-collapse-content-active > .ant-collapse-content-box {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    height: initial;
  }
`

type TrialId = {
  newId: string
  onSuggestTabClick: () => void
}

type NodeTraversalFields = "condition_id" | "location_id" | "sponsor_id"
type NTFieldArray = [string?, string?, string?]

export const RecruitingDetails: React.FC<TrialId> = ({ newId, onSuggestTabClick }) => {
  const filters = useContext(SearchFiltersContext)
  const { condition_id: conditionId, location_id: locationId, sponsor_id: sponsorId } = filters.get()
  const nodeTraversalFieldsRef = useRef<NTFieldArray>([])

  useEffect(() => {
    if (nodeTraversalFieldsRef.current.length === 0) {
      nodeTraversalFieldsRef.current = [conditionId, locationId, sponsorId]
      return
    }

    const didChange = !equals(nodeTraversalFieldsRef.current, [conditionId, locationId, sponsorId])
    if (didChange) {
      onSuggestTabClick()
    }
  })

  const tooltips = useContext(TooltipContext)
  const updateNodeTraversals = (
    field: NodeTraversalFields,
    data: DetailAgency | DetailCondition | DetailLocation,
  ) => () => {
    filters.put({ [field]: data.new_id })
    tooltips.put({ [field]: data } as any)
    onSuggestTabClick()
  }

  const trialResource = singleTrialResource.read(singleTrialCache, newId)
  return (
    trialResource && (
      <Fragment>
        <SubSection>
          {trialResource.age_ranges && (
            <p>Ages Eligible for Study: {trialResource.age_ranges.map(age => age.age_range).join(", ")} </p>
          )}
          {trialResource.genders && (
            <p>Sexes Eligible for Study: {trialResource.genders.map(gender => gender.gender).join(", ")}</p>
          )}
          {trialResource.healthy_volunteers && (
            <p>
              Accepts Healthy Volunteers:{" "}
              {trialResource.healthy_volunteers.map(volunteer => volunteer.healthy_volunteers).join(", ")}
            </p>
          )}
          {trialResource.start_date && <p>Study Start Date: {trialResource.start_date}</p>}
          {trialResource.study_type && <p>Study Type: {trialResource.study_type}</p>}
        </SubSection>

        <SubSection>
          <h3>Elligibility Criteria</h3>
          <p>{propOr("no information provided", "criteria_text", trialResource)}</p>
        </SubSection>

        <SubSection>
          <h3>Contacts ({trialResource.contacts ? trialResource.contacts.length : 0})</h3>
          {propOr<DetailContact[], DetailResponse, DetailContact[]>([], "contacts", trialResource).map(contact => (
            <div key={contact.new_id} css={panelChildCSS}>
              {contact.investigator_full_name && (
                <div>{[contact.investigator_title, contact.investigator_full_name].filter(v => !!v).join(" ")}</div>
              )}
              {contact.email && <div>Email: {contact.email}</div>}
              {contact.phone && (
                <div>
                  Phone:{" "}
                  {[phoneFormatter.format(contact.phone, "(NNN) NNN-NNNN"), contact.phone_ext]
                    .filter(v => !!v)
                    .join(" ext. ")}
                </div>
              )}
              <div>{contact.phone_ext}</div>
            </div>
          ))}
        </SubSection>

        <SubSection>
          <h3>Find Similar</h3>
          <Collapse bordered={false}>
            <Panel header={`Conditions (${trialResource.conditions ? trialResource.conditions.length : 0})`} key="3">
              {propOr<DetailCondition[], DetailResponse, DetailCondition[]>([], "conditions", trialResource).map(
                condition => (
                  <Tag
                    key={condition.new_id}
                    css={panelChildCSS}
                    onClick={updateNodeTraversals("condition_id", condition)}
                  >
                    {condition.condition}
                  </Tag>
                ),
              )}
            </Panel>

            <Panel header={`Locations (${trialResource.locations ? trialResource.locations.length : 0})`} key="4">
              {propOr<DetailLocation[], DetailResponse, DetailLocation[]>([], "locations", trialResource).map(
                location => (
                  <Tag
                    key={location.new_id}
                    css={panelChildCSS}
                    onClick={updateNodeTraversals("location_id", location)}
                  >
                    <h4>{location.name}</h4>
                    <div>{`${[location.city, location.state, location.zip].filter(s => !!s).join(", ")}`}</div>
                    <div>{location.country}</div>
                  </Tag>
                ),
              )}
            </Panel>

            <Panel header={`Sponsors (${trialResource.sponsors ? trialResource.sponsors.length : 0})`} key="5">
              {propOr<DetailAgency[], DetailResponse, DetailAgency[]>([], "sponsors", trialResource).map(sponsor => (
                <Tag key={sponsor.new_id} css={panelChildCSS} onClick={updateNodeTraversals("sponsor_id", sponsor)}>
                  {sponsor.agency}
                </Tag>
              ))}
            </Panel>
          </Collapse>
        </SubSection>
      </Fragment>
    )
  )
}
