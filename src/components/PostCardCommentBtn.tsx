import { Link } from '@/shared/link'
import { Comment01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  commentCount: number
  handle: string
}

const PostCardCommentBtn: FC<Props> = ({ className, commentCount, handle }) => {
  return (
    <Link
      href={`/post/${handle}#comments`}
      className={clsx(
        'post-card-comment-btn flex h-8 min-w-16 items-center rounded-full bg-neutral-50 ps-2 pe-3 text-xs transition-colors hover:bg-teal-50 hover:text-teal-600 dark:bg-white/10 dark:hover:bg-white/10 dark:hover:text-teal-500',
        className
      )}
      title="Comments"
    >
      <HugeiconsIcon icon={Comment01Icon} size={18} />
      <span className="ms-2">{commentCount}</span>
    </Link>
  )
}

export default PostCardCommentBtn
