import React, { useContext, Fragment } from "react"
import styled from "@emotion/styled"
import { Tag, Tooltip } from "antd"

import { SearchFiltersContext } from "./SearchFiltersContext"
import { TooltipContext } from "./TooltipContext"

const List = styled.div`
  display: flex;
  flex: 2 0 300px;
`

const Text = styled.span`
  padding: 0 12px;
`

export const NodeTraversalList: React.FC = () => {
  const filters = useContext(SearchFiltersContext)
  const { condition_id: conditionId, location_id: locationId, sponsor_id: sponsorId } = filters.get()
  const show = conditionId || locationId || sponsorId

  const tooltips = useContext(TooltipContext)
  const { condition_id: condition, location_id: location, sponsor_id: sponsor } = tooltips.fields

  return (
    <List>
      {show && (
        <Fragment>
          <Text>With Similar:</Text>

          <Tooltip
            placement="bottom"
            title={location && [location.name, location.city, location.state, location.country].join(", ")}
          >
            <Tag closable={true} visible={!!locationId} onClose={() => filters.put({ location_id: undefined })}>
              Locations
            </Tag>
          </Tooltip>

          <Tooltip placement="bottom" title={condition && condition.condition}>
            <Tag closable={true} visible={!!conditionId} onClose={() => filters.put({ condition_id: undefined })}>
              Conditions
            </Tag>
          </Tooltip>

          <Tooltip placement="bottom" title={sponsor && sponsor.agency}>
            <Tag closable={true} visible={!!sponsorId} onClose={() => filters.put({ sponsor_id: undefined })}>
              Sponsors
            </Tag>
          </Tooltip>
        </Fragment>
      )}
    </List>
  )
}
