import { createContext } from "react"
import { SearchRequest } from "../../api/wireModels"

type FiltersContext = {
  get: () => SearchRequest
  put: (filters: Partial<SearchRequest>) => void
}

export const SearchFiltersContext = createContext<FiltersContext>({
  get() {
    return { search_term: "" }
  },
  put() {},
})
