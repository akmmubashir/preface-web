'use client'

import { TPost } from '@/data/posts'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import { FC, useRef } from 'react'
import Card8 from './PostCards/Card8'
import Card9 from './PostCards/Card9'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
  headingColor?: string
  lang?: string
}

const SectionMagazine4: FC<Props> = ({ posts, heading, className, subHeading, dimHeading, headingColor, lang }) => {
  const firstSectionRef = useRef<HTMLDivElement | null>(null)
  const secondSectionRef = useRef<HTMLDivElement | null>(null)

  const isFirstSectionInView = useInView(firstSectionRef, {
    once: true,
    amount: 0.3,
  })
  const isSecondSectionInView = useInView(secondSectionRef, {
    once: true,
    amount: 0.3,
  })

  return (
    <div className={clsx('section-magazine-4 relative', className)}>
      {/* <SectionTabHeader
        heading={heading}
        subHeading={subHeading}
        dimHeading={dimHeading}
        tabActive="Development"
        tabs={['Development', 'Design', 'Illustration', 'Photography']}
      /> */}
      <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading} headingColor={headingColor}>
        {heading}
      </HeadingWithSub>
      {!posts?.length && <span>Nothing we found!</span>}

      {/* First Section - Fade in from left */}
      <motion.div
        ref={firstSectionRef}
        initial={{ opacity: 0, x: -50 }}
        animate={isFirstSectionInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4"
        aria-live="polite"
      >
        {posts[0] && <Card8 className="sm:col-span-2" post={posts[0]} lang={lang} />}
        {posts.slice(1, 3).map((item, index) => (
          <Card9 key={`first-${item.id || index}`} post={item} lang={lang} />
        ))}
      </motion.div>

      {/* Second Section - Fade in from right with stagger */}
      <motion.div
        ref={secondSectionRef}
        initial={{ opacity: 0, x: 50 }}
        animate={isSecondSectionInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4"
        aria-live="polite"
      >
        {posts.slice(3, 5).map((item, index) => (
          <Card9 key={`second-${item.id || index}`} post={item} lang={lang} />
        ))}
        {posts[5] && <Card8 className="sm:col-span-2" post={posts[5]} lang={lang} />}
      </motion.div>

      {/* <div className="mt-20 flex justify-center">
        <ButtonPrimary>
          Show me more
          <ArrowRightIcon className="size-4" />
        </ButtonPrimary>
      </div> */}
    </div>
  )
}

export default SectionMagazine4
