import clsx from 'clsx'
import { FC } from 'react'
import BookmarkBtn from './BookmarkBtn'

interface Props {
  className?: string
  bookmarkClass?: string
  readingTime?: number
  bookmarked?: boolean
}

const PostCardSaveBtn: FC<Props> = ({ className, bookmarkClass, readingTime, bookmarked }) => {
  return (
    <div className={clsx('post-card-save-btn flex items-center gap-x-2 text-xs', className)}>
      {readingTime ? <span>{readingTime} min read</span> : null}
      <BookmarkBtn className={bookmarkClass} bookmarked={bookmarked} />
    </div>
  )
}

export default PostCardSaveBtn
