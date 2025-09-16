'use client'

import { TPost } from '@/data/posts'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { motion, useInView, Variants } from 'framer-motion'
import { FC, useRef } from 'react'
import Card5 from './PostCards/Card5'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading' | 'isCenter'> & {
  posts: TPost[]
  className?: string
  heading?: string
  lang?: string
  dualColor?: boolean
}

const SectionTrending: FC<Props> = ({ posts, heading, subHeading, isCenter, className, lang, dualColor }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Stagger animation variants for cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className={clsx('section-trending relative', className)}>
      {!!heading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <HeadingWithSub subHeading={subHeading} isCenter={isCenter}>
            {heading}
          </HeadingWithSub>
        </motion.div>
      )}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:md:grid-cols-3 xl:grid-cols-4"
        aria-live="polite"
      >
        {posts.map((post, index) => (
          <motion.div key={post._id} variants={cardVariants}>
            <Card5 post={post} lang={lang} index={index} dualColor={dualColor} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default SectionTrending
