import { TCategory } from '@/data/categories'
import { Badge } from '@/shared/Badge'
import { Button } from '@/shared/Button'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  category: TCategory
}

const CardCategory5: FC<Props> = ({ className = '', category }) => {
  const { count, name, handle, thumbnail } = category

  return (
    <Link href={`/category/${handle}`} className={`card-category-5 group relative block ${className}`}>
      <div className="relative aspect-square w-full shrink-0">
        <Image
          fill
          alt={name}
          src={thumbnail || ''}
          className="rounded-2xl object-cover brightness-75"
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
        />
      </div>
      <Badge className="absolute end-3 top-3" color={'amber'}>
        <div className="flex items-center">
          {count}
          <ArrowRightIcon className="ms-1.5 h-3.5 w-3.5 rtl:rotate-180" />
        </div>
      </Badge>
      <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-center">
        <Button color="white" className="w-full">
          {name}
        </Button>
      </div>
    </Link>
  )
}

export default CardCategory5
