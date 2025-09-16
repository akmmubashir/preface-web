'use client'

import { TCategory } from '@/data/categories'
import HeadingWithSub from '@/shared/Heading'
import clsx from 'clsx'
import { motion, useAnimationControls } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import CardCategory1 from './CategoryCards/CardCategory1'
import CardCategory2 from './CategoryCards/CardCategory2'
import CardCategory3 from './CategoryCards/CardCategory3'
import CardCategory4 from './CategoryCards/CardCategory4'
import CardCategory5 from './CategoryCards/CardCategory5'

interface SliderConfig {
  autoSlide?: boolean
  autoSlideInterval?: number
  showButtons?: boolean
  loop?: boolean
  slidesToScroll?: number
}

interface HeadingProps {
  heading?: string
  subHeading?: string
  dimHeading?: boolean
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  isCenter?: boolean
}

interface SectionSliderProps {
  className?: string
  heading?: string
  subHeading?: string
  dimHeading?: boolean
  categories: TCategory[]
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5'
  config?: SliderConfig
  lang?: string
}

// Default configuration
const defaultConfig: SliderConfig = {
  autoSlide: false,
  autoSlideInterval: 3000,
  showButtons: true,
  loop: true,
  slidesToScroll: 1,
}

// Navigation Button Component
const NavigationButton: React.FC<{
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
  className?: string
}> = ({ direction, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
      direction === 'prev' ? '-left-4' : '-right-4',
      className
    )}
    aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
  >
    <svg
      className={clsx('h-5 w-5 text-gray-600', direction === 'prev' && 'rotate-180')}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
)

// Heading Component
const SliderHeading: React.FC<HeadingProps> = ({ heading, subHeading, dimHeading, level = 'h2', isCenter }) => {
  if (!heading && !subHeading) return null

  const HeadingTag = level

  return (
    <div className={clsx('mb-12', isCenter && 'text-center')}>
      <HeadingWithSub className="mb-0!" subHeading={subHeading}>
        {heading}
      </HeadingWithSub>
    </div>
  )
}

// Main Component
const SectionSlider: React.FC<SectionSliderProps> = ({
  heading,
  subHeading,
  dimHeading,
  className,
  categories,
  categoryCardType = 'card3',
  config = {},
  lang,
}) => {
  const mergedConfig = { ...defaultConfig, ...config }
  const { autoSlide, autoSlideInterval, showButtons, loop, slidesToScroll } = mergedConfig

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(7) // Default value that matches server render
  const [isClient, setIsClient] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isInfiniteMode, setIsInfiniteMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  const totalSlides = categories.length
  const maxIndex = Math.max(0, totalSlides - cardsPerView)

  // Only calculate duplicated categories on client side
  const duplicatedCategories = React.useMemo(() => {
    if (!isClient) return categories
    if (!autoSlide || !loop || categories.length === 0) return categories

    // Simply repeat the same sequence multiple times to maintain order
    const repeatCount = Math.ceil((cardsPerView * 3) / categories.length) + 2
    const duplicates = []

    for (let i = 0; i < repeatCount; i++) {
      duplicates.push(...categories)
    }

    return duplicates
  }, [categories, autoSlide, loop, cardsPerView, isClient])

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true)

    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 640) setCardsPerView(1)
      else if (width < 768) setCardsPerView(2)
      else if (width < 1024) setCardsPerView(3)
      else if (width < 1280) setCardsPerView(5)
      else setCardsPerView(5)
    }

    // Only run on client side
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // Calculate card width percentage, ensure no division by zero
  const cardWidthPercentage = cardsPerView > 0 ? 100 / cardsPerView : 100

  // Infinite auto-sliding logic with Framer Motion
  useEffect(() => {
    if (!autoSlide || isPaused || totalSlides === 0 || !loop) return

    setIsInfiniteMode(true)

    const startInfiniteAnimation = () => {
      // Calculate total width needed to move through all original cards once
      const totalMoveDistance = -(categories.length * cardWidthPercentage)

      controls.start({
        x: `${totalMoveDistance}%`,
        transition: {
          duration: (categories.length * (autoSlideInterval || 3000)) / 1000,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      })
    }

    startInfiniteAnimation()

    return () => {
      controls.stop()
    }
  }, [autoSlide, autoSlideInterval, isPaused, loop, totalSlides, cardWidthPercentage, controls, categories.length])

  // Regular auto-sliding for non-infinite mode
  useEffect(() => {
    if (!autoSlide || isPaused || totalSlides === 0 || loop) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + slidesToScroll!
        return nextIndex >= maxIndex ? 0 : nextIndex
      })
    }, autoSlideInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoSlide, autoSlideInterval, isPaused, maxIndex, loop, slidesToScroll, totalSlides])

  const goToNext = useCallback(() => {
    if (isInfiniteMode) {
      controls.stop()
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 100)
      return
    }

    const nextIndex = currentIndex + slidesToScroll!
    if (nextIndex >= maxIndex) {
      setCurrentIndex(loop ? 0 : maxIndex)
    } else {
      setCurrentIndex(nextIndex)
    }
    setIsPaused(false)
  }, [currentIndex, maxIndex, loop, slidesToScroll, isInfiniteMode, controls])

  const goToPrev = useCallback(() => {
    if (isInfiniteMode) {
      controls.stop()
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 100)
      return
    }

    const prevIndex = currentIndex - slidesToScroll!
    if (prevIndex < 0) {
      setCurrentIndex(loop ? maxIndex : 0)
    } else {
      setCurrentIndex(prevIndex)
    }
    setIsPaused(false)
  }, [currentIndex, maxIndex, loop, slidesToScroll, isInfiniteMode, controls])

  // Create swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  })

  // Combine refs manually
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (swipeHandlers.ref) {
        ;(swipeHandlers.ref as any)(node)
      }
    },
    [swipeHandlers.ref]
  )

  const renderCard = (item: TCategory, index: number) => {
    const topIndex = index < 3 ? `#${index + 1}` : undefined

    switch (categoryCardType) {
      case 'card1':
        return <CardCategory1 key={`${item.id}-${index}`} category={item} />
      case 'card2':
        return <CardCategory2 key={`${item.id}-${index}`} badge={topIndex} category={item} lang={lang} />
      case 'card3':
        return <CardCategory3 key={`${item.id}-${index}`} category={item} />
      case 'card4':
        return <CardCategory4 key={`${item.id}-${index}`} badge={topIndex} category={item} />
      case 'card5':
        return <CardCategory5 key={`${item.id}-${index}`} category={item} />
      default:
        return null
    }
  }

  // Regular translateX for non-infinite mode
  const translateX = isInfiniteMode ? 0 : -(currentIndex * (100 / cardsPerView))
  const prevBtnDisabled = !loop && currentIndex === 0
  const nextBtnDisabled = !loop && currentIndex >= maxIndex

  // Choose which categories array to render
  const categoriesToRender = isInfiniteMode && autoSlide && loop ? duplicatedCategories : categories

  return (
    <div className={clsx('section-slider-new-categories relative', className)}>
      {/* Heading Section with Container */}
      <SliderHeading heading={heading} subHeading={subHeading} dimHeading={dimHeading} />

      {/* Slider Section */}
      <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {/* Navigation Buttons */}
        {showButtons && totalSlides > cardsPerView && (
          <>
            <NavigationButton direction="prev" onClick={goToPrev} disabled={prevBtnDisabled} />
            <NavigationButton direction="next" onClick={goToNext} disabled={nextBtnDisabled} />
          </>
        )}

        {/* Slider Container */}
        <div ref={combinedRef} className="overflow-hidden" {...(({ ref, ...handlers }) => handlers)(swipeHandlers)}>
          <motion.div
            animate={controls}
            className="flex"
            style={{
              transform: isInfiniteMode ? undefined : `translateX(${translateX}%)`,
              width: isInfiniteMode ? 'auto' : `${(totalSlides / cardsPerView) * 100}%`,
            }}
            transition={{
              duration: isInfiniteMode ? 0 : 0.3,
              ease: isInfiniteMode ? 'linear' : 'easeOut',
            }}
          >
            {categoriesToRender.map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="flex-shrink-0 px-4 lg:px-2"
                style={{
                  width: isInfiniteMode ? `${cardWidthPercentage}%` : `${100 / categoriesToRender.length}%`,
                }}
              >
                {renderCard(category, index)}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SectionSlider
