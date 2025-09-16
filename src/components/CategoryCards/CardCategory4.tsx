import { TCategory } from '@/data/categories'
import { Badge } from '@/shared/Badge'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  badge?: string
}

const CardCategory4: FC<Props> = ({ className = '', category, badge }) => {
  const { count, name, handle, thumbnail, color } = category
  const getColorClass = () => {
    switch (color) {
      case 'pink':
        return 'bg-pink-500'
      case 'red':
        return 'bg-red-500'
      case 'gray':
        return 'bg-gray-500'
      case 'green':
        return 'bg-green-500'
      case 'purple':
        return 'bg-purple-500'
      case 'indigo':
        return 'bg-indigo-500'
      case 'yellow':
        return 'bg-yellow-500'
      case 'blue':
        return 'bg-blue-500'
      default:
        return 'bg-pink-500'
    }
  }

  return (
    <div className={`card-category-4 group relative flex flex-col ${className}`}>
      <div className="aspect-w-4 relative h-0 w-full shrink-0 aspect-h-3">
        <Image
          alt={`${name} thumbnail`}
          fill
          src={thumbnail || ''}
          className="size-full rounded-3xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
        />
        {badge && (
          <div>
            <Badge color={color as any} className="absolute start-3 top-3">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center">
        <div className={`size-9 ${getColorClass()} rounded-full`}></div>
        <div className="ms-3.5 space-y-0.5">
          <p className="line-clamp-1 text-base font-medium text-neutral-900 dark:text-neutral-100">{name}</p>
          <p className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">{count}+ articles</p>
        </div>
      </div>

      <Link href={`/category/${handle}`} className="absolute inset-0">
        <span className="sr-only">{name}</span>
      </Link>
    </div>
  )
}

export default CardCategory4
