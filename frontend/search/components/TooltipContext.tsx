import React from "react"
import { DetailCondition, DetailAgency, DetailLocation } from "../../api/wireModels"

export type RecommendedFields = {
  fields: {
    location_id?: DetailLocation
    condition_id?: DetailCondition
    sponsor_id?: DetailAgency
  }
}

export type TooltipContext = RecommendedFields & {
  put: (item: Pick<RecommendedFields, "fields">) => void
}

export const TooltipContext = React.createContext<TooltipContext>({
  fields: {},
  put() {},
})
