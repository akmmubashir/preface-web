'use client'

import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  lang?: string
}

const Card8: FC<Props> = ({ className, post, ratio = 'aspect-3/4 sm:aspect-2/1', lang }) => {
  const {
    title,
    handle,
    featuredImage,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    favoriteCount,
    author,
    date,
    readingTime,
  } = post

  const [isHover, setIsHover] = useState(false)
  const articleSlug = post?.slug

  return (
    <div
      className={clsx('group post-card-8 relative overflow-hidden rounded-3xl', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative size-full', ratio)}>
        <PostFeaturedMedia post={post} isHover={isHover} />
        {/* ONE outer Link for the whole media area */}
        <Link
          href={lang === 'en' ? `/video/${articleSlug}` : `/${lang}/video/${articleSlug}`}
          className="absolute inset-x-0 top-1/3 bottom-0 bg-linear-to-t from-black opacity-60 transition-opacity duration-300 group-hover:top-0 group-hover:opacity-70"
        />
        <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap gap-x-2 gap-y-1 p-4 sm:px-5">
          <PostCardLikeBtn likeCount={favoriteCount || likeCount} liked={liked} post={post} />
          <PostCardSaveBtn bookmarked={bookmarked} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-4 sm:p-6">
        {/* ONE outer Link for the full text area */}
        <Link href={`/video/${articleSlug}`} className="absolute inset-0" />

        <CategoryBadgeList categories={categories} />

        <h2 className="mt-4 !line-clamp-2 block text-lg font-semibold text-white sm:text-xl" title={title}>
          {title}
        </h2>

        {/* Meta info without inner <a> */}
        {/* <div className="mt-3 text-neutral-300">
          <div className="relative flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
            <span className="font-medium text-neutral-200">{author.name}</span>
            <span className="font-medium">·</span>
            <LocalDate date={date} />
            <span>/</span>
            <span>{readingTime} min read</span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Card8
