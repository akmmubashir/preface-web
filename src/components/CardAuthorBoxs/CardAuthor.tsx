import { TAuthor } from '@/data/authors'
import Avatar from '@/shared/Avatar'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  author: TAuthor
}

const CardAuthor: FC<Props> = ({ className, author }) => {
  const { name, handle, avatar, career } = author
  return (
    <div className={clsx('card-author relative flex items-center', className)}>
      <Avatar className="me-4 size-10 shrink-0" src={avatar.src || ''} width={40} height={40} sizes="40px" />
      <div>
        <h2 className="text-sm font-medium sm:text-base sm:font-semibold">{name}</h2>
        <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">{career}</p>
      </div>
      <Link href={`/author/${handle}`} className="absolute inset-0" />
    </div>
  )
}

export default CardAuthor
