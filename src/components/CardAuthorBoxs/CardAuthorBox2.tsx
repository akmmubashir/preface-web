import NcImage from '@/components/NcImage/NcImage'
import { TAuthor } from '@/data/authors'
import Avatar from '@/shared/Avatar'
import { Link } from '@/shared/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  author: TAuthor
}

const CardAuthorBox2: FC<Props> = ({ className, author }) => {
  const { name, handle, avatar, cover, count, career } = author
  return (
    <div
      className={clsx(
        'card-author-box-2 group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5',
        className
      )}
    >
      <div className="relative shrink-0">
        <NcImage
          alt="author"
          containerClassName="flex aspect-w-4 aspect-h-3 w-full h-0"
          src={cover.src || ''}
          fill
          sizes="(max-width: 600px) 480px, 33vw"
          className="rounded-t-3xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
        />
        <div className="absolute inset-x-3 top-3 flex">
          <div className="flex items-center justify-center rounded-full bg-neutral-100 px-4 py-1 text-xs leading-none font-medium dark:bg-neutral-800">
            {count} <ArrowRightIcon className="ms-2 size-4.5 text-yellow-600 rtl:rotate-180" />
          </div>
        </div>
      </div>

      <div className="mx-6 -mt-8 pb-7 text-center">
        <Avatar
          className="relative size-16 ring-2 ring-white"
          src={avatar.src || ''}
          width={64}
          height={64}
          sizes="64px"
        />
        <div className="mt-3 space-y-1">
          <p className="line-clamp-1 text-base font-medium">{name}</p>
          <p className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">{career}</p>
        </div>
        <Link href={`/author/${handle}`} className={'absolute inset-0'}>
          <span className="sr-only">{name}</span>
        </Link>
      </div>
    </div>
  )
}

export default CardAuthorBox2
