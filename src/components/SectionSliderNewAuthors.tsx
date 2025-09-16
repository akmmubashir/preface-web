'use client'

import { ThemeContext } from '@/app/theme-provider'
import { TAuthor } from '@/data/authors'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import clsx from 'clsx'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { FC, useContext } from 'react'
import CardAuthorBox2 from './CardAuthorBoxs/CardAuthorBox2'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  authors: TAuthor[]
  emblaOptions?: EmblaOptionsType
}

const SectionSliderNewAuthors: FC<Props> = ({
  className,
  subHeading,
  dimHeading,
  authors,
  heading,
  emblaOptions = {
    slidesToScroll: 'auto',
  },
}) => {
  const theme = useContext(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    direction: theme?.themeDir,
  })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  return (
    <div className={clsx('section-slider-new-authors relative', className)}>
      <HeadingWithArrowBtns
        hasNextPrev
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={onPrevButtonClick}
        onClickNext={onNextButtonClick}
        subHeading={subHeading}
        dimHeading={dimHeading}
      >
        {heading}
      </HeadingWithArrowBtns>

      <div className="embla" ref={emblaRef}>
        <div className="-ms-5 embla__container sm:-ms-7">
          {authors.map((author) => (
            <div
              key={author.id}
              className="embla__slide basis-[86%] ps-5 sm:basis-1/2 sm:ps-7 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <CardAuthorBox2 author={author} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSliderNewAuthors
