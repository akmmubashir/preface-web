'use client'

import { TPost } from '@/data/posts'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { motion, useInView, Variants } from 'framer-motion'
import { FC, useRef } from 'react'
import Card10V3 from './PostCards/Card10V3'
import Card17Podcast from './PostCards/Card17Podcast'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: TPost[]
  posts2: TPost[]
  className?: string
  heading?: string
  lang?: string
}

const SectionMagazine7: FC<Props> = ({ posts = [], posts2 = [], className, heading, subHeading, dimHeading, lang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // If no posts are available, don't render the section
  if (!posts?.length && !posts2?.length) {
    return null
  }

  // Animation variants for the main section
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  // Animation for the two main cards
  const mainCardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  // Animation for the grid of smaller cards
  const gridVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Animation for individual grid cards
  const gridCardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className={clsx('section-magazine-7 relative', className)}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading}>
          {heading}
        </HeadingWithSub>
      </motion.div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 gap-6 md:gap-8"
        aria-live="polite"
      >
        {/* Main two cards - slide in from left */}
        <motion.div variants={mainCardVariants} className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {posts2[0] && (
            <motion.div variants={mainCardVariants}>
              <Card10V3 post={posts2[0]} lang={lang} />
            </motion.div>
          )}
          {posts2[1] ? (
            <motion.div variants={mainCardVariants}>
              <Card10V3 galleryType={2} post={posts2[1]} lang={lang} />
            </motion.div>
          ) : posts2[0] ? (
            // If only one post is available, show a placeholder for the second card
            <motion.div variants={mainCardVariants} className="pointer-events-none opacity-0">
              <div className="invisible">
                <Card10V3 galleryType={2} post={posts2[0]} lang={lang} />
              </div>
            </motion.div>
          ) : null}
        </motion.div>

        {/* Grid of smaller cards - slide up from bottom */}
        <motion.div
          variants={gridVariants}
          className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3"
        >
          {posts.length > 0 ? (
            posts.slice(0, 6).map((p) => (
              <motion.div key={p._id} variants={gridCardVariants}>
                <Card17Podcast post={p} lang={lang} />
              </motion.div>
            ))
          ) : (
            // Show a message when there are no posts
            <motion.div
              className="col-span-full py-10 text-center text-neutral-500 dark:text-neutral-400"
              variants={gridCardVariants}
            >
              No content available at the moment. Please check back later.
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SectionMagazine7
