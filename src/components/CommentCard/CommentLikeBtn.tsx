'use client'

import convertNumbThousand from '@/utils/convertNumbThousand'
import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'

interface Props {
  className?: string
  likeCount: number
  isLiked: boolean
  postId: string | number
}

const CommentLikeBtn: FC<Props> = ({ className, likeCount, isLiked: likedProps, postId }) => {
  const [isLiked, setIsLiked] = useState(likedProps)

  return (
    <button
      className={clsx(
        'comment-like-btn group flex h-8 items-center rounded-full ps-2 pe-3 text-xs leading-none transition-colors',
        className,
        isLiked
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-100'
          : 'bg-neutral-50 text-neutral-700 hover:bg-rose-50 hover:text-rose-600 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-rose-500'
      )}
      onClick={() => setIsLiked(!isLiked)}
    >
      <HeartIcon className="size-5" fill={isLiked ? 'currentColor' : 'none'} />
      <span className={clsx('ms-1', isLiked ? 'text-rose-600' : '')}>
        {convertNumbThousand(isLiked ? likeCount + 1 : likeCount)}
      </span>
    </button>
  )
}

export default CommentLikeBtn
