import { RefObject, useCallback, useEffect, useState } from 'react'

export interface UseIntersectionObserverArgs extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
  onIntersect?: (entry: IntersectionObserverEntry) => void
}

function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    onIntersect,
  }: UseIntersectionObserverArgs = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [error, setError] = useState<Error | null>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  // Memoize the callback to prevent unnecessary re-renders
  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]): void => {
      setEntry(entry)
      onIntersect?.(entry)
    },
    [onIntersect]
  )

  useEffect(() => {
    const node = elementRef?.current

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      setError(new Error('IntersectionObserver is not supported in this browser'))
      return
    }

    if (!node) {
      return
    }

    if (frozen) {
      return
    }

    try {
      const observerParams = { threshold, root, rootMargin }
      const observer = new IntersectionObserver(updateEntry, observerParams)

      observer.observe(node)

      return () => {
        observer.disconnect()
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create IntersectionObserver'))
    }
  }, [elementRef, threshold, root, rootMargin, frozen, updateEntry])

  if (error) {
    console.error('useIntersectionObserver error:', error)
  }

  return entry
}

export default useIntersectionObserver
