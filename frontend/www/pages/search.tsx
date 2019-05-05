/** @jsx jsx */
import { useState, useEffect } from "react"
import { NextFC } from "next"
import { Button, Icon, Input, Badge } from "antd"
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import dynamic from "next/dynamic"
import { animated, useTransition, config } from "react-spring"

import { Logo } from "../components/Logo"
import { SearchFiltersPanel } from "../search/components/SearchFilters"
import Router from "next/router"
import { Convert, SearchRequest } from "../api/wireModels"
import { SearchFiltersContext } from "../search/components/SearchFiltersContext"
import { SearchResultsPanel } from "../search/components/StyledComponents"
import { TrialDetail } from "../search/components/TrialDetail"
import { NodeTraversalList } from "../search/components/NodeTraversalList"
import { pickBy, not, isNil, compose, flatten } from "ramda"
import { PageContext } from "../search/components/PageContext"
import { TooltipContext } from "../search/components/TooltipContext"

const Navbar = styled.nav`
  grid-area: nav;
  background: mintcream;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #e7e7e7;
`

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "nav nav"
    "results map";
`

const filterUndefinedValues = pickBy(
  compose(
    not,
    isNil,
  ),
)

const filterCount = (filters: SearchRequest): number => {
  const {
    age_range: age = [],
    phase = [],
    sex = [],
    start_year: year = [],
    intervention_type: intervention = [],
    status = [],
  } = filters

  return flatten([age, phase, year, intervention, status, sex]).length
}

const Map = dynamic(() => import("../map/Map").then(mod => mod.Map), { ssr: false })
const SearchResults = dynamic(() => import("../search/components/SearchResults").then(mod => mod.SearchResults), {
  ssr: false,
})

const Search: NextFC<{ query: SearchRequest }> = ({ query }) => {
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [filters, setFilters] = useState(query)

  const filtersWrapper = {
    get() {
      return filters
    },
    put(updatedFilters: Partial<SearchRequest>) {
      const nextFilters = Object.entries({ ...filters, ...updatedFilters }).reduce(
        (acc: StrMap<unknown>, [key, value]) => {
          if (value) {
            if (Array.isArray(value) && value.length === 0) return acc
          }
          acc[key] = value
          return acc
        },
        {},
      )
      setFilters(nextFilters as SearchRequest)
    },
  }

  useEffect(() => {
    pageWrapper.putPage(1)
    Router.replace({ pathname: "/search", query: filterUndefinedValues(filters) })
  }, [filters])

  const [currentTrial, setCurrentTrial] = useState()
  const [page, setPage] = useState(1)
  const pageWrapper = {
    page,
    putPage(number: number) {
      setPage(number)
    },
  }

  const transitions = useTransition(showFiltersPanel, null, {
    from: { opacity: 0, position: "absolute", right: 24, top: 60, width: 500, zIndex: 10 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  })

  const [fields, setFields] = useState({})
  const tooltipWrapper: TooltipContext = {
    fields,
    put(obj) {
      setFields({ ...fields, ...obj })
    },
  }

  return (
    <Grid>
      <SearchFiltersContext.Provider value={filtersWrapper}>
        <PageContext.Provider value={pageWrapper}>
          <TooltipContext.Provider value={tooltipWrapper}>
            <Navbar>
              <Logo
                css={css`
                  flex: 0 0 200px;
                  &:hover {
                    cursor: pointer;
                  }
                `}
                style={{ marginRight: 48 }}
                onClick={() => Router.push("/")}
              />

              <Input.Search
                css={css`
                  flex: 0 2 500px;
                `}
                placeholder="search for clinical trials"
                defaultValue={query.search_term}
                onPressEnter={event => {
                  const value = event.currentTarget.value
                  if (!value) return event.preventDefault()
                  filtersWrapper.put({ search_term: event.currentTarget.value })
                }}
              />

              <NodeTraversalList />

              <Badge showZero={false} style={{ backgroundColor: "#4f96d8" }} count={filterCount(filters)}>
                <Button
                  data-cy="filters-button"
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  css={css`
                    width: 200px;
                  `}
                >
                  {showFiltersPanel ? "Close" : "Filters"}
                  {showFiltersPanel ? <Icon type="close-circle" /> : <Icon type="sliders" />}
                </Button>
              </Badge>
            </Navbar>

            {transitions.map(({ item, key, props }) => {
              return (
                item && (
                  <animated.div key={key} style={props}>
                    <SearchFiltersPanel />
                  </animated.div>
                )
              )
            })}

            <SearchResultsPanel data-cy="search-results">
              <SearchResults
                key={JSON.stringify(filtersWrapper.get())}
                page={1}
                onClick={setCurrentTrial}
                currentTrialId={currentTrial ? currentTrial.new_id : ""}
              />
            </SearchResultsPanel>

            <Map
              apiKey="<GOOGLR_MAPS_API_KEY>"
              initialLat={37.09024}
              initalLng={-95.712891}
              initialZoom={4}
            >
              {currentTrial && <TrialDetail currentTrial={currentTrial} onClose={() => setCurrentTrial(null)} />}
            </Map>
          </TooltipContext.Provider>
        </PageContext.Provider>
      </SearchFiltersContext.Provider>
    </Grid>
  )
}

Search.getInitialProps = ({ query, res }) => {
  if (query.search_term == null && res && res.writeHead) {
    res.writeHead(302, { Location: "/" })
    res.end()
  }

  if (!query.search_term) query.search_term = ""

  const arrayKeys = ["age_range", "intervention_type", "phase", "sex", "status"]
  for (let key of arrayKeys) {
    const value = query[key]
    if (value && typeof value === "string") {
      query[key] = value.split(",")
    }
  }

  const geoKeys = ["lat", "lng", "lat_bottom", "lng_right"]
  for (let key of geoKeys) {
    const value = query[key]
    if (value && typeof value === "string") {
      ;(query as any)[key] = parseFloat(value)
    }
  }

  const year = Number(query.start_year)
  if (isNaN(year) || year < 1970 || year > new Date().getFullYear()) {
    delete query["start_year"]
  } else {
    query["start_year"] = [year]
  }

  const params = JSON.stringify(query)
  const parsed = Convert.toSearchRequest(params)

  const output: StrMap<unknown> = {}
  Object.entries(parsed).forEach(([key, value]) => {
    if (value != null) output[key] = value
  })

  return { query: output as SearchRequest }
}

export default Search
