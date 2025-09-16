import NcImage from '@/components/NcImage/NcImage'
import { TCategory } from '@/data/categories'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  size?: 'large' | 'normal'
}

const CardCategory1: FC<Props> = ({ className, size = 'normal', category }) => {
  const { count, name, handle, parentCategory, thumbnail, featuredImage, slug } = category
  return (
    <Link href={`/${parentCategory?.slug}/${slug}`} className={clsx('card-category-1 flex flex-col gap-2', className)}>
      <NcImage
        alt={name}
        containerClassName={clsx('relative me-4 aspect-[3/2] w-32 shrink-0 overflow-hidden rounded-lg md:w-40')}
        src={thumbnail || featuredImage || ''}
        fill
        className="object-cover"
        sizes="80px"
      />
      <div>
        <h2 className={clsx('nc-card-title text-sm font-medium text-neutral-900 dark:text-neutral-100')}>{name}</h2>
      </div>
    </Link>
  )
}

export default CardCategory1
