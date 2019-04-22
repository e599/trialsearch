import { useState, useEffect } from "react"

function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  return new Promise(resolve => {
    if ((window as any).google) {
      resolve(google)
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.onload = () => resolve(google)
      document.body.appendChild(script)
    }
  })
}

export function useGoogleMaps(apiKey: string, mapDomRef: any, config: google.maps.MapOptions) {
  const [googleAPI, setGoogleAPI] = useState<typeof google>()
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    loadGoogleMaps(apiKey).then((gapi: typeof google) => setGoogleAPI(gapi))
  }, [apiKey])

  useEffect(() => {
    if (!googleAPI || !mapDomRef.current) return

    setMap(new google.maps.Map(mapDomRef.current, config))
  }, [googleAPI, mapDomRef])

  return map
}
