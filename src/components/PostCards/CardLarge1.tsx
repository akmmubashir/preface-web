import NcImage from '@/components/NcImage/NcImage'
import { TPost } from '@/data/posts'
import { NextPrev } from '@/shared/NextPrev'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardMeta3 from '../PostCardMeta/PostCardMeta3'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
  onClickNext?: () => void
  onClickPrev?: () => void
}

const CardLarge1: FC<Props> = ({ className, post, onClickNext, onClickPrev }) => {
  const {
    featuredImage,
    title,
    date,
    handle,
    categories,
    author,
    readingTime,
    likeCount,
    commentCount,
    liked,
    bookmarked,
  } = post
  return (
    <div
      className={clsx(
        'nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse justify-end md:flex-row',
        className
      )}
    >
      <div className="z-1 -mt-8 w-full px-3 sm:px-6 md:absolute md:start-0 md:top-1/2 md:mt-0 md:w-3/5 md:-translate-y-1/2 md:px-0 lg:w-1/2 xl:w-2/5">
        <div className="nc-CardLarge1__left space-y-3 rounded-3xl bg-white/40 p-4 shadow-lg backdrop-blur-lg backdrop-filter sm:space-y-5 sm:p-8 md:px-10 xl:py-14 dark:bg-neutral-900/40 dark:shadow-2xl">
          <CategoryBadgeList categories={categories} />

          <h2 className="nc-card-title text-base font-semibold sm:text-xl lg:text-2xl">
            <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>

          <PostCardMeta3 className="relative" author={author} date={date} />

          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <PostCardLikeBtn likeCount={likeCount} liked={liked} />
            <PostCardCommentBtn commentCount={commentCount} handle={handle} />
            <PostCardSaveBtn
              className="ms-auto"
              bookmarkClass="size-8 bg-neutral-50/30 hover:bg-neutral-50/50 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/50"
              readingTime={readingTime}
              bookmarked={bookmarked}
            />
          </div>
        </div>
        <div className="p-4 sm:px-10 sm:pt-8">
          <NextPrev btnClassName="size-11" onClickNext={onClickNext} onClickPrev={onClickPrev} />
        </div>
      </div>
      <div className="w-full md:w-4/5 lg:w-2/3">
        <Link href={`/post/${handle}`} className="nc-CardLarge1__right relative block">
          <NcImage
            containerClassName="relative aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9"
            className="absolute inset-0 rounded-3xl object-cover"
            src={featuredImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* META TYPE */}
          <PostTypeFeaturedIcon postType={post.postType} className="absolute end-5 top-5" />
        </Link>
      </div>
    </div>
  )
}

export default CardLarge1
