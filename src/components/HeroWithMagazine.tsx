// components/HeroWithMagazine.tsx
'use client'

import SectionMagazine10 from '@/components/SectionMagazine10'
import VideoHeroBanner from '@/components/VideoHeroBanner'
import type { TPost } from '@/data/posts'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface HeroWithMagazineProps {
  posts: TPost[]
}

const HeroWithMagazine: React.FC<HeroWithMagazineProps> = ({ posts }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  // Track scroll progress within our container only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Create smooth spring animations
  const springConfig = { stiffness: 400, damping: 40, mass: 0.5 }

  // Transform scroll progress to animation values
  // Hero disappears when SectionMagazine10 becomes fully visible
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0])

  const heroTranslateY = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 0, -100])

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7, 0.8], [0, 0, 0.3, 0])

  // Apply spring to smooth out the animations
  const smoothHeroOpacity = useSpring(heroOpacity, springConfig)
  const smoothHeroTranslateY = useSpring(heroTranslateY, springConfig)
  const smoothOverlayOpacity = useSpring(overlayOpacity, springConfig)

  // Monitor scroll progress to completely hide/show hero
  // Hide hero when SectionMagazine10 is fully visible (earlier threshold)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsHeroVisible(latest < 0.75)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="relative">
      {/* Scroll tracking container - exactly 100vh + magazine section height */}
      <div
        ref={containerRef}
        className="relative h-[240vh] sm:h-[200vh] xl:h-[175vh]"
        // style={{ height: '200vh' }} // Reduced height to prevent video bleeding
      >
        {/* Full-screen hero with scroll animations */}
        {isHeroVisible && (
          <motion.div
            className="fixed top-0 left-0 z-10 h-screen w-full"
            style={{
              opacity: smoothHeroOpacity,
              y: smoothHeroTranslateY,
            }}
          >
            <VideoHeroBanner />

            {/* White overlay that appears during transition */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-white"
              style={{
                opacity: smoothOverlayOpacity,
              }}
            />
          </motion.div>
        )}

        {/* SectionMagazine10 positioned to overlap hero earlier */}
        <div className="absolute top-[90vh] right-0 left-0 z-20 min-h-screen">
          <div className="container mx-auto pt-8">
            <SectionMagazine10 posts={posts} />
          </div>
        </div>
      </div>

      {/* Ensure proper spacing after the component */}
      <div className="h-0"></div>
    </div>
  )
}

export default HeroWithMagazine
