'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  ratio?: string
  post: TPost
  lang?: string
}

const Card9: FC<Props> = ({ className, ratio = 'aspect-3/4', post, lang }) => {
  const {
    title,
    handle,
    featuredImage,
    categories,
    author,
    date,
    postType,
    likeCount,
    favoriteCount,
    liked,
    commentCount,
    readingTime,
    bookmarked,
  } = post

  const [isHover, setIsHover] = useState(false)
  const articleSlug = post?.slug

  return (
    <div
      className={clsx('group post-card-9 relative flex flex-col overflow-hidden rounded-3xl', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={`relative flex w-full items-start ${ratio}`}>
        <PostFeaturedMedia post={post} isHover={isHover} />

        {/* Single Link wrapping media */}
        <Link
          href={lang === 'en' ? `/video/${articleSlug}` : `/${lang}/video/${articleSlug}`}
          className="absolute inset-0"
        />
        {postType === 'audio' && (
          <ButtonPlayMusicPlayer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4" post={post} />
        )}
      </div>

      <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-3">
        <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
        <PostCardSaveBtn bookmarked={bookmarked} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex grow flex-col p-4">
        <CategoryBadgeList categories={categories} />

        <div className="mt-3.5 text-neutral-300">
          <h2 className="!line-clamp-2 block text-base font-medium text-white xl:text-lg/6" title={title}>
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Card9
