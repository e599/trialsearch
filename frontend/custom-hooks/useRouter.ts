import Router from "next/router"

import { Convert, SearchRequest } from "../api/wireModels"

type Nullable<T> = { [K in keyof T]: T[K] | undefined }

const AppRouter = {
  updateSearchURL(searchParams: Nullable<Partial<SearchRequest>>): Promise<boolean> {
    const currentQueryParams = Router.query

    const mergedQueryParams = { ...currentQueryParams, ...searchParams }
    const updatedQueryParams = Object.entries(mergedQueryParams).reduce(
      (obj: StrMap<string | number | undefined>, [key, value]) => {
        if (value != null) {
          obj[key] = value
        }
        return obj
      },
      {},
    )

    return Router.replace({ pathname: "/search", query: updatedQueryParams })
  },
  getQueryParams(): SearchRequest {
    const params = JSON.stringify(Router.query || `{"search_term": ""}`)
    const parsed = Convert.toSearchRequest(params)

    return parsed
  },
}

export function useRouter(): typeof AppRouter {
  return AppRouter
}
