import imgAdsDef from '@/images/ads.png'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'

interface Props {
  className?: string
  imgAds?: string | StaticImageData
}

const SectionAds: FC<Props> = ({ className, imgAds = imgAdsDef }) => {
  return (
    <Link href="/" className={clsx('section-ads mx-auto block text-center', className)}>
      <span className="text-xs text-neutral-500">- Advertisement -</span>
      <Image className="mx-auto rounded-3xl" src={imgAds} alt="ads" sizes="(max-width: 1400px) 100vw, 90vw" />
    </Link>
  )
}

export default SectionAds
