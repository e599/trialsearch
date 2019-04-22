import { useState, useEffect, RefObject } from "react"

export function useIntersectionObserver(domRef: RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!domRef.current) return
    const observer = new IntersectionObserver(entries => entries[0].isIntersecting && setVisible(true))

    observer.observe(domRef.current)

    return () => {
      setVisible(false)
      observer.disconnect()
    }
  }, [domRef])

  return visible
}
