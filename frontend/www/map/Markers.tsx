import React from "react"
import { useContext, useEffect, useRef } from "react"
import { countBy, flatten, map, propOr, evolve } from "ramda"

import { ListLocation } from "../api/wireModels"
import { trialsResource, cache } from "../api/trialsResource"
import { SearchFiltersContext } from "../search/components/SearchFiltersContext"
import { PageContext } from "../search/components/PageContext"

type MarkerProps = { gmap?: google.maps.Map; page: number }

const round = (val: number): number => Number(val.toFixed(6))

export const Markers: React.FC<MarkerProps> = ({ gmap, page }) => {
  const pageCtx = useContext(PageContext)

  const filters = useContext(SearchFiltersContext)
  const response = trialsResource.read(cache, { ...filters.get(), page })
  const lastMarker = useRef<google.maps.InfoWindow>()

  useEffect(() => {
    if (!gmap) return

    const markers: google.maps.Marker[] = []
    const infoWindows: google.maps.InfoWindow[] = []

    let locations: ListLocation[] = flatten(map(propOr([], "locations"), response.results)).map(
      evolve({ latitude: round, longitude: round }),
    )

    const locationCountMap = countBy(JSON.stringify, locations)
    const dedupedLocations: ListLocation[] = Object.keys(locationCountMap).map(k => JSON.parse(k))

    for (const location of dedupedLocations) {
      const { latitude: lat, longitude: lng } = location
      if (!lat || !lng) continue

      const count = locationCountMap[JSON.stringify(location)]
      const infoWindow = new google.maps.InfoWindow({
        content: `There ${count === 1 ? "is" : "are"} ${count} ${count === 1 ? "trial" : "+ trials"} at this location`,
      })

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: gmap,
      })

      marker.addListener("click", () => {
        if (lastMarker && lastMarker.current) lastMarker.current.close()
        infoWindow.open(gmap, marker)
        lastMarker.current = infoWindow
      })

      infoWindows.push(infoWindow)
      markers.push(marker)
    }

    return () => {
      if (lastMarker && lastMarker.current) lastMarker.current.close()
      markers.forEach(marker => marker.setMap(null))
    }
  }, [gmap, response.results])

  return page < pageCtx.page ? <Markers gmap={gmap} page={page + 1} /> : null
}
