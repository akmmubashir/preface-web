'use client'

import { Button } from '@/shared/Button'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { Dialog, DialogBody } from '@/shared/dialog'
import { PlayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { FC, useState } from 'react'

export interface SectionHero2Props {}
const SectionHero2: FC<SectionHero2Props> = ({}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="section-hero-2 relative bg-black pb-20 md:py-32 lg:py-60">
        <div className="mb-10 flex w-full md:absolute md:end-0 md:top-0 md:bottom-0 md:mb-0 md:w-1/2 xl:w-3/5">
          <div className="absolute start-0 top-0 bottom-0 z-1 hidden w-44 bg-linear-to-r from-black md:block rtl:bg-linear-to-l" />
          <Image
            fill
            className="object-cover"
            src="https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            sizes="1260px"
            alt="hero"
            priority
          />
        </div>
        <div className="relative z-1 container text-neutral-100">
          <div className="max-w-3xl">
            <h1 className="mt-3 text-4xl font-bold md:text-5xl/[1.1] xl:text-6xl">The hidden world of whale culture</h1>
            <p className="mt-7 text-base text-neutral-300 lg:text-xl">
              From singing competitions to food preferences, scientists are learning whales have cultural differences
              once thought to be unique to humans.
            </p>
            <div className="mt-11 flex space-x-4 rtl:space-x-reverse">
              <ButtonPrimary href="#">Read more</ButtonPrimary>

              <Button color="white" onClick={() => setIsOpen(!isOpen)}>
                Play video
                <PlayIcon className="h-5 w-5 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-50">
        <Dialog size="5xl" open={isOpen} onClose={setIsOpen}>
          <DialogBody className="-m-5!">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/qTsXfGVjm1w?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="ncblog hero video"
                className="rounded-lg"
              ></iframe>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </>
  )
}

export default SectionHero2
