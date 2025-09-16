'use client'

import { variants } from '@/utils/animationVariants'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

interface Props {
  className?: string
  galleryImgs: (StaticImageData | string)[]
  handle: string
  navigation?: boolean
}

const GallerySlider: FC<Props> = ({ className, galleryImgs, handle, navigation = true }) => {
  const [loaded, setLoaded] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const images = galleryImgs

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setIndex(newVal)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1)
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1)
      }
    },
    trackMouse: true,
  })

  let currentImage = images[index]

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className={clsx('group/cardGallerySlider absolute inset-0', className)} {...handlers}>
        {/* Main image */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants(300, 1)}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={currentImage || ''}
                fill
                alt=""
                className="object-cover"
                onLoad={() => setLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1025px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
          <Link href={`/post/${handle}`} className="absolute inset-0"></Link>
        </div>

        <>
          {/* Buttons */}
          {loaded && navigation && (
            <div className="opacity-0 transition-opacity group-hover/cardGallerySlider:opacity-100">
              {index > 0 && (
                <button
                  className="absolute start-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 focus:outline-hidden dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500"
                  onClick={() => changePhotoId(index - 1)}
                >
                  <ChevronLeftIcon className="size-4 rtl:rotate-180" />
                </button>
              )}
              {index + 1 < images.length && (
                <button
                  className="absolute end-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 focus:outline-hidden dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500"
                  onClick={() => changePhotoId(index + 1)}
                >
                  <ChevronRightIcon className="size-4 rtl:rotate-180" />
                </button>
              )}
            </div>
          )}

          {/* Bottom Nav bar */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-neutral-900 opacity-50" />

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-x-1.5">
            {images.map((_, i) => (
              <button
                className={`size-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`}
                onClick={() => changePhotoId(i)}
                key={i}
              />
            ))}
          </div>
        </>
      </div>
    </MotionConfig>
  )
}

export default GallerySlider
