'use client'

import { TPost } from '@/data/posts'
import { HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import CardLarge1 from './PostCards/CardLarge1'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  posts: TPost[]
}

const SectionLargeSlider: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  const [indexActive, setIndexActive] = useState(0)

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0
      }
      return state + 1
    })
  }

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1
      }
      return state - 1
    })
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleClickNext,
    onSwipedRight: handleClickPrev,
    trackMouse: true,
  })

  return (
    <div className={clsx('section-large-slider relative', className)} {...handlers}>
      {!!heading && (
        <HeadingWithArrowBtns subHeading={subHeading} dimHeading={dimHeading}>
          {heading}
        </HeadingWithArrowBtns>
      )}
      {posts.map((item, index) => {
        if (indexActive !== index) return null
        return <CardLarge1 key={index} onClickNext={handleClickNext} onClickPrev={handleClickPrev} post={item} />
      })}
    </div>
  )
}

export default SectionLargeSlider
