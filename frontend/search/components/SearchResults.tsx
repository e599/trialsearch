/**@jsx jsx */
import { jsx } from "@emotion/core"
import { Suspense, useContext, useRef, Fragment } from "react"

import { trialsResource, cache } from "../../api/trialsResource"
import { SkeletonResults } from "./SkeletonLoading"
import { ClinicalTrial } from "../../api/wireModels"
import { SearchFiltersContext } from "./SearchFiltersContext"
import { useIntersectionObserver } from "../custom-hooks/useIntersectionObserver"
import { EmptyState } from "./EmptyState"
import { TrialCard } from "./StyledComponents"

type SearchResultsProps = {
  page: number
}

export const SearchResultsList: React.FC<SearchResultsProps> = ({ page }) => {
  const filters = useContext(SearchFiltersContext)
  const response = trialsResource.read(cache, { ...filters.get(), page })

  const domRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(domRef)

  return (
    <Fragment key={`listItems${page}`}>
      {page === 1 && response.num_results === 0 ? (
        <EmptyState />
      ) : (
        response.results.map((trial: ClinicalTrial) => (
          <TrialCard key={trial.nct_id}>
            <p className="nct-id">
              <a href={trial.url} target="_blank" rel="noopener noreferrer">
                {trial.nct_id}
              </a>
            </p>
            <h3 className="title">{trial.official_title}</h3>
            <p className="summary">{trial.brief_summary}</p>
          </TrialCard>
        ))
      )}

      {isVisible && !response.last_page ? (
        <SearchResults page={page + 1} />
      ) : (
        <div id={`sentinel${page}`} style={{ height: 5 }} ref={domRef} />
      )}
    </Fragment>
  )
}

export const SearchResults: React.FC<SearchResultsProps> = ({ page }) => {
  return (
    <Suspense fallback={<SkeletonResults size={page === 1 ? 6 : 2} />}>
      <SearchResultsList page={page} />
    </Suspense>
  )
}
