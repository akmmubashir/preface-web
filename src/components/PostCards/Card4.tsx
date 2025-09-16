'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardMeta3 from '../PostCardMeta/PostCardMeta3'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
}

const Card4: FC<Props> = ({ className, post }) => {
  const { title, handle, categories, author, date, readingTime, bookmarked, likeCount, liked, commentCount } = post
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={clsx(
        'group post-card-4 relative flex flex-col rounded-3xl border bg-white dark:bg-white/5',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-t-xl">
        <PostFeaturedMedia post={post} isHover={isHover} className="rounded-t-xl" />

        <div>
          <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-center gap-x-2 gap-y-1 p-3">
            <PostCardLikeBtn likeCount={likeCount} liked={liked} />
            <PostCardCommentBtn commentCount={commentCount} handle={handle} />
            <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} />
          </div>
        </div>
      </div>

      <div className="flex grow flex-col gap-y-2.5 p-4">
        <CategoryBadgeList categories={categories} />
        <h2 className="block font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <PostCardMeta3 className="mt-auto mb-1" readingTime={readingTime} date={date} author={author} />
      </div>
    </div>
  )
}

export default Card4
