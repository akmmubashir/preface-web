import { TAuthor } from '@/data/authors'
import Avatar from '@/shared/Avatar'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  author: TAuthor
}

const CardAuthorBox: FC<Props> = ({ className, author }) => {
  const { name, handle, avatar, count, career } = author
  return (
    <div
      className={clsx(
        'card-author-box group relative flex flex-col items-center justify-center rounded-3xl border border-dashed bg-white px-3 py-5 text-center sm:px-6 sm:py-7 dark:bg-neutral-900',
        className
      )}
    >
      <Link href={`/author/${handle}`} className="absolute inset-0" />
      <Avatar className="size-20" src={avatar.src || ''} width={80} height={80} sizes="80px" />
      <div className="mt-3">
        <h2 className={`text-sm font-medium sm:text-base`}>
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span className={`mt-1 line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400`}>{career}</span>
      </div>
      <div className="mt-4 flex items-center justify-center rounded-full bg-neutral-100 px-4 py-2 text-xs leading-none font-medium dark:bg-neutral-800">
        {count} <ArrowRightIcon className="ms-3 size-4 text-yellow-600" />
      </div>
    </div>
  )
}

export default CardAuthorBox
