import React, { useEffect, useContext, useRef, useState, Suspense } from "react"
import { equals } from "ramda"
import { Button } from "antd"

import { SearchFiltersContext } from "../search/components/SearchFiltersContext"
import { useTransition, animated, config } from "react-spring"
import { useGoogleMaps } from "./custom-hooks/useGoogleMaps"
import { Markers } from "./Markers"

type MapProps = {
  apiKey: string
  initialLat: number
  initalLng: number
  initialZoom: number
}

type BoundingBox = { top: number; right: number; bottom: number; left: number }

export const Map: React.FC<MapProps> = ({ apiKey, initialZoom, initialLat, initalLng, children }) => {
  const mapDomRef = useRef(null)
  const mapOptions = {
    center: { lat: initialLat, lng: initalLng },
    zoom: initialZoom,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
  }
  const map = useGoogleMaps(apiKey, mapDomRef, mapOptions)

  const filters = useContext(SearchFiltersContext)
  useEffect(() => {
    const { lat: north, lng: west, lat_bottom: south, lng_right: east } = filters.get()
    if (!map) return
    if (!north || !south || !east || !west) return

    map.fitBounds({ north, south, east, west })
  }, [map])

  const [mapBounds, setMapBounds] = useState<BoundingBox>()
  const mapBoundsRef = useRef<BoundingBox>()
  useEffect(() => {
    if (!map) return

    const listener = map.addListener("idle", () => {
      const bounds = map.getBounds()
      if (!bounds) return
      const { lat: top, lng: right } = bounds.getNorthEast()
      const { lat: bottom, lng: left } = bounds.getSouthWest()
      const box: BoundingBox = { top: top(), left: left(), bottom: bottom(), right: right() }

      if (mapBoundsRef.current == undefined) {
        mapBoundsRef.current = box
      }
      setMapBounds(box)
    })

    return () => {
      google.maps.event.removeListener(listener)
    }
  }, [map])

  const transitions = useTransition(!equals(mapBoundsRef.current, mapBounds), null, {
    from: { position: "absolute", bottom: "16px", left: "50%", transform: "translate3d(-50%, 80px, 0)" },
    enter: { transform: "translate3d(-50%, 0, 0)" },
    leave: { transform: "translate3d(-50%, 80px, 0)" },
    config: config.stiff,
  })

  return (
    <div style={{ position: "relative", overflow: "hidden" }} data-cy="map">
      <div style={{ width: "100%", height: "100%" }} id="map" key="map" ref={mapDomRef}>
        <Suspense fallback={null}>
          <Markers gmap={map} page={1} />
        </Suspense>
      </div>

      {transitions.map(({ item: boundsDidChange, props }) => {
        return (
          boundsDidChange && (
            <animated.div style={props}>
              <Button
                data-cy="map-search-button"
                shape="round"
                type="primary"
                style={props}
                onClick={() => {
                  if (!mapBounds) return

                  mapBoundsRef.current = mapBounds
                  filters.put({
                    lat: mapBounds.top,
                    lat_bottom: mapBounds.bottom,
                    lng: mapBounds.left,
                    lng_right: mapBounds.right,
                  })
                }}
              >
                Search In This Area
              </Button>
            </animated.div>
          )
        )
      })}

      {children}
    </div>
  )
}
