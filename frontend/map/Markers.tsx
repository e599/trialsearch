import { useContext, useEffect, useRef } from "react"
import { countBy, flatten, map, propOr } from "ramda"

import { Location } from "../api/wireModels"
import { trialsResource, cache } from "../api/trialsResource"
import { SearchFiltersContext } from "../search/components/SearchFiltersContext"

type MarkerProps = { gmap?: google.maps.Map }

export const Markers: React.FC<MarkerProps> = ({ gmap }) => {
  const filters = useContext(SearchFiltersContext)
  const response = trialsResource.read(cache, filters.get())
  const lastMarker = useRef<google.maps.InfoWindow>()

  useEffect(() => {
    if (!gmap) return

    const locations: Location[] = flatten(map(propOr([], "locations"), response.results))
    const markers: google.maps.Marker[] = []
    const infoWindows: google.maps.InfoWindow[] = []

    const locationCountMap = countBy(JSON.stringify, locations)
    const dedupedLocations: Location[] = Object.keys(locationCountMap).map(k => JSON.parse(k))

    for (const location of dedupedLocations) {
      const { latitude: lat, longitude: lng } = location
      if (!lat || !lng) continue

      const count = locationCountMap[JSON.stringify(location)]
      const infoWindow = new google.maps.InfoWindow({
        content: `There ${count === 1 ? "is" : "are"} ${count} ${count === 1 ? "trial" : "trials"} in the area`,
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

  return null
}
