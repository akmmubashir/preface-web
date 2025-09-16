'use client'

import { ThemeContext } from '@/app/theme-provider'
import { TCategory } from '@/data/categories'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import clsx from 'clsx'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Variants, motion, useInView } from 'framer-motion'
import { FC, useContext, useRef } from 'react'
import CardCategory1 from './CategoryCards/CardCategory1'
import CardCategory2 from './CategoryCards/CardCategory2'
import CardCategory3 from './CategoryCards/CardCategory3'
import CardCategory4 from './CategoryCards/CardCategory4'
import CardCategory5 from './CategoryCards/CardCategory5'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  categories: TCategory[]
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5'
  emblaOptions?: EmblaOptionsType
  lang?: string
}

const SectionSliderNewCategories: FC<Props> = ({
  heading,
  subHeading,
  dimHeading,
  className,
  categories,
  categoryCardType = 'card3',
  emblaOptions = {
    slidesToScroll: 'auto',
  },
  lang,
}) => {
  const theme = useContext(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    direction: theme?.themeDir,
  })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  // Animation setup
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.9,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 80,
      scale: 0.6,
      rotateY: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom bounce-like easing
      },
    },
  }

  const renderCard = (item: TCategory, index: number) => {
    const topIndex = index < 3 ? `#${index + 1}` : undefined
    switch (categoryCardType) {
      case 'card1':
        return <CardCategory1 key={index} category={item} />
      case 'card2':
        return <CardCategory2 key={index} badge={topIndex} category={item} />
      case 'card3':
        return <CardCategory3 key={item._id || item.id || index} lang={lang} category={item} />
      case 'card4':
        return <CardCategory4 key={index} badge={topIndex} category={item} />
      case 'card5':
        return <CardCategory5 key={index} category={item} />
      default:
        return null
    }
  }

  return (
    <div className={clsx('section-slider-new-categories relative', className)}>
      <HeadingWithArrowBtns
        subHeading={subHeading}
        dimHeading={dimHeading}
        hasNextPrev
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={onPrevButtonClick}
        onClickNext={onNextButtonClick}
      >
        {heading}
      </HeadingWithArrowBtns>

      <div className="embla" ref={emblaRef}>
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="-ms-5 embla__container sm:-ms-7"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category._id || category.id || index}
              className="embla__slide basis-[86%] ps-5 sm:basis-1/2 sm:ps-7 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              variants={cardVariants}
            >
              {renderCard(category, index)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default SectionSliderNewCategories
