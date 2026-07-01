import { useEffect, useState } from "react"

/**
 * Returns true after a short delay, giving the impression of loading
 * while data is actually already available. Creates a smooth perceived
 * loading experience without real waiting time.
 */
export function useDelayedReady(delay = 350) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return isReady
}