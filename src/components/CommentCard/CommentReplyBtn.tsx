'use client'

import { ArrowTurnBackwardIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  onClick: () => void
}

const CommentReplyBtn: FC<Props> = ({ className, onClick }) => {
  return (
    <button
      className={clsx(
        'comment-reply-btn flex h-8 min-w-16 items-center rounded-full bg-neutral-50 ps-2 pe-3 text-xs text-neutral-600 transition-colors hover:bg-teal-50 hover:text-teal-600 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-teal-500',
        className
      )}
      onClick={onClick}
      title="Reply"
      type="button"
    >
      <HugeiconsIcon icon={ArrowTurnBackwardIcon} size={20} />
      <span className="ms-2">Reply</span>
    </button>
  )
}

export default CommentReplyBtn
