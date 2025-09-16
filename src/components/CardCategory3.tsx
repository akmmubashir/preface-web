import dogPng from '@/images/dog.png'
import ButtonPrimary from '@/shared/ButtonPrimary'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  className?: string
}
const CardCategory3: FC<Props> = ({ className }) => {
  return (
    <Link href={'/archive/demo-slug'} className={clsx('card-category-3 block', className)}>
      <div
        className={`group aspect-w-16 relative h-0 w-full overflow-hidden rounded-2xl bg-sky-100 aspect-h-11 sm:aspect-h-9`}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            <Image
              alt="ads"
              src={dogPng}
              className="absolute right-0 h-full w-1/2 max-w-[260px] object-contain drop-shadow-xl"
            />
          </div>
        </div>
        <span className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-40"></span>

        <div>
          <div className="absolute inset-5 flex flex-col sm:inset-8">
            <div className="max-w-xs">
              <span className={`mb-2 block text-sm text-slate-700`}>Sponsored</span>
              <h2 className={`text-xl font-semibold text-slate-900 md:text-2xl`}>
                Up to <br /> 80% off retail
              </h2>
            </div>
            <div className="mt-auto">
              <ButtonPrimary>Show me more</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardCategory3
