'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import { FC, useState } from 'react'
import PostCardMeta5 from '../PostCardMeta/PostCardMeta5'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  timeDuration?: boolean
  lang?: string
}

const Card10V6: FC<Props> = ({
  className,
  post,
  ratio = 'aspect-square sm:aspect-16/9',
  timeDuration = false,
  lang,
}) => {
  const [isHover, setIsHover] = useState(false)
  const { categories, bookmarked, likeCount, liked, slug } = post

  return (
    <div
      className={clsx('group post-card-10 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative z-0 w-full shrink-0 overflow-hidden rounded-2xl', ratio)}>
        <PostFeaturedMedia
          post={post}
          isHover={isHover}
          href={lang === 'en' ? `/video/${slug}` : `/${lang}/video/${slug}`}
        />
      </div>
      <div className="absolute inset-x-3 top-4 z-10 flex items-start justify-between gap-x-4 p-2">
        {/* <CategoryBadgeList categories={categories} /> */}

        {/* <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap gap-x-2 gap-y-1">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <PostCardSaveBtn bookmarked={bookmarked} />
        </div> */}
      </div>

      <PostCardMeta5 meta={post} className="mx-2 mt-6" timeDuration={timeDuration} lang={lang} />
    </div>
  )
}

export default Card10V6
