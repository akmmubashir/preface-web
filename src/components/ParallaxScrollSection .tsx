'use client'

import SectionMagazine10 from '@/components/SectionMagazine10'
import VideoHeroBanner from '@/components/VideoHeroBanner'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxScrollSectionProps {
  magazine10Data: any // Replace with your actual post type
  videoPosts: any // Replace with your actual post type
}

export default function ParallaxScrollSection({ magazine10Data, videoPosts }: ParallaxScrollSectionProps) {
  // Create a ref for the entire scroll container
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Create smooth spring animations
  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 }

  // VideoHeroBanner animations - moves up and fades out
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -200]), springConfig)
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.7, 0]), springConfig)
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.95]), springConfig)
  const heroBlur = useSpring(useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 2, 8]), springConfig)
  // Fix: Move the blur filter transform to top level
  const heroBlurFilter = useTransform(heroBlur, (value) => `blur(${value}px)`)

  // SectionMagazine10 animations - slides in from below and adjusts margin
  const magazineY = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [100, 0]), springConfig)
  const magazineOpacity = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [0, 1]), springConfig)
  const magazineScale = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]), springConfig)

  // Dynamic margin transform: from -mt-20 (-80px) to mt-20 (80px)
  const magazineMarginTop = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.6], [-80, 0, 280]), springConfig)

  return (
    <div ref={containerRef} className="relative h-screen">
      {/* VideoHeroBanner with parallax effects */}
      <motion.div
        className="sticky top-0 w-full"
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
          filter: heroBlurFilter, // Use the pre-defined transform
        }}
      >
        <VideoHeroBanner />
      </motion.div>

      {/* SectionMagazine10 with entrance animation and dynamic margin */}
      <motion.div
        className="relative container space-y-28 lg:space-y-40"
        style={{
          y: magazineY,
          opacity: magazineOpacity,
          scale: magazineScale,
          marginTop: magazineMarginTop,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionMagazine10 posts={magazine10Data} videoPosts={videoPosts} />
        </motion.div>
      </motion.div>
    </div>
  )
}
