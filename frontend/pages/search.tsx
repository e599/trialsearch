/** @jsx jsx */
import { useState, useEffect } from "react"
import { NextFC } from "next"
import { Button, Icon, Input } from "antd"
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

const Map = dynamic(() => import("../map/Map").then(mod => mod.Map), { ssr: false })
const SearchResults = dynamic(() => import("../search/components/SearchResults").then(mod => mod.SearchResults), {
  ssr: false,
})

const Search: NextFC<{ query: SearchRequest }> = ({ query }) => {
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [filters, setFilters] = useState(query)

  const transitions = useTransition(showFiltersPanel, null, {
    from: { opacity: 0, position: "absolute", right: 24, top: 60, width: 480, zIndex: 10 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  })

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
    Router.replace({ pathname: "/search", query: filters })
  }, [filters])

  return (
    <Grid>
      <SearchFiltersContext.Provider value={filtersWrapper}>
        <Navbar>
          <Logo
            css={css`
              flex: 1 0 200px;
              &:hover {
                cursor: pointer;
              }
            `}
            style={{ marginRight: 48 }}
            onClick={() => Router.push("/")}
          />
          <Input.Search
            placeholder="search for clinical trials"
            defaultValue={query.search_term}
            onPressEnter={event => filtersWrapper.put({ search_term: event.currentTarget.value })}
          />

          <Button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            css={css`
              margin-left: 300px;
              flex: 1 1 300px;
            `}
          >
            {showFiltersPanel ? "Close" : "Filters"}
            {showFiltersPanel ? <Icon type="close-circle" /> : <Icon type="sliders" />}
          </Button>
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

        <SearchResultsPanel>
          <SearchResults key={JSON.stringify(filtersWrapper.get())} page={1} />
        </SearchResultsPanel>

        <Map
          apiKey="<api_key>"
          initialLat={37.09024}
          initalLng={-95.712891}
          initialZoom={4}
        />
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

  const params = JSON.stringify(query)
  const parsed = Convert.toSearchRequest(params)

  const output: StrMap<unknown> = {}
  Object.entries(parsed).forEach(([key, value]) => {
    if (value != null) output[key] = value
  })

  return { query: output as SearchRequest }
}

export default Search
