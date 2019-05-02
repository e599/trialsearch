/**@jsx jsx */
import { jsx } from "@emotion/core"
import { Suspense, useContext, useRef, Fragment, useEffect } from "react"

import { trialsResource, cache } from "../../api/trialsResource"
import { SkeletonResults } from "./SkeletonLoading"
import { ListClinicalTrial } from "../../api/wireModels"
import { SearchFiltersContext } from "./SearchFiltersContext"
import { useIntersectionObserver } from "../custom-hooks/useIntersectionObserver"
import { EmptyState } from "./EmptyState"
import { TrialCard } from "./StyledComponents"
import { PageContext } from "./PageContext"

type SearchResultsProps = {
  page: number
  onClick: (trial: ListClinicalTrial) => void
  currentTrialId: string
}

export const SearchResultsList: React.FC<SearchResultsProps> = ({ page, onClick, currentTrialId }) => {
  const pageCtx = useContext(PageContext)
  useEffect(() => {
    pageCtx.putPage(page)
  }, [])

  const filters = useContext(SearchFiltersContext)
  const response = trialsResource.read(cache, { ...filters.get(), page })

  const domRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(domRef)
  return (
    <Fragment key={`listItems${page}`}>
      {page === 1 && response.num_results === 0 ? (
        <EmptyState />
      ) : (
        response.results.map((trial: ListClinicalTrial) => (
          <TrialCard
            key={trial.nct_id}
            id={trial.nct_id}
            active={trial.new_id === currentTrialId}
            onClick={() => onClick(trial)}
          >
            <p className="nct-id">
              <a href={trial.url} target="_blank" rel="noopener noreferrer">
                {trial.nct_id}
              </a>
            </p>
            <h3 className="title">{trial.brief_title}</h3>
            <p className="summary">{trial.brief_summary}</p>
          </TrialCard>
        ))
      )}

      {isVisible && !response.last_page ? (
        <SearchResults page={page + 1} onClick={onClick} currentTrialId={currentTrialId} />
      ) : (
        <div id={`sentinel${page}`} style={{ height: 5 }} ref={domRef} />
      )}
    </Fragment>
  )
}

export const SearchResults: React.FC<SearchResultsProps> = ({ page, onClick, currentTrialId }) => {
  return (
    <Suspense fallback={<SkeletonResults size={page === 1 ? 3 : 2} />}>
      <SearchResultsList page={page} onClick={onClick} currentTrialId={currentTrialId} />
    </Suspense>
  )
}
