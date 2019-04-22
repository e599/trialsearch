import { createCache } from "react-cache"
import { Convert, SearchRequest, SearchResponse } from "./wireModels"
import axios from "axios"
import { createResource } from "react-cache"
import "./config"

export const cache = createCache()

const defaultCoords = {
  lat: 54.294355647556934,
  lng: -127.52929725000001,
  lat_bottom: 14.992989215410569,
  lng_right: -64.24804725000001,
}

export const trialsResource = createResource(
  async (searchParams: SearchRequest): Promise<SearchResponse> => {
    const { search_term: term, ...rest } = searchParams

    const arrayKeys = ["age_range", "intervention_type", "phase", "sex", "status"]
    for (let key of arrayKeys) {
      const value = (rest as StrMap<unknown>)[key]
      if (value && Array.isArray(value)) {
        if (value.length > 0) (rest as StrMap<unknown>)[key] = value.join(",")
        else {
          delete (rest as StrMap<unknown>)[key]
        }
      }
    }

    try {
      const response = await axios.get(`/search/${term}`, { params: { ...defaultCoords, ...rest } })
      return Convert.toSearchResponse(JSON.stringify(response.data))
    } catch (error) {
      return { num_results: 0, page: 0, results: [], last_page: true }
    }
  },
  item => JSON.stringify(item),
)
