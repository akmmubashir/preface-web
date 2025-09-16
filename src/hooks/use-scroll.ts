'use client'

import { useEffect, useState } from 'react'

interface UseScrollOptions {
  threshold?: number
}

export function useScroll({ threshold = 50 }: UseScrollOptions = {}) {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > threshold)
    }

    // Set initial values
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return {
    scrollY,
    isScrolled,
    isAtTop: scrollY <= threshold,
  }
}
