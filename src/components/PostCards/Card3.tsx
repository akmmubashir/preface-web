import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
}

const Card3: FC<Props> = ({ className, post }) => {
  const {
    title,
    handle,
    readingTime,
    featuredImage,
    excerpt,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
  } = post

  return (
    <div className={clsx('group post-card-3 flex flex-wrap items-center gap-x-7 gap-y-5 sm:flex-nowrap', className)}>
      <div className="flex grow flex-col">
        <div className="space-y-3.5">
          <CategoryBadgeList categories={categories} />
          <h2 className="nc-card-title block text-base font-medium sm:font-semibold xl:text-lg">
            <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>
          <p className="line-clamp-2 text-sm/6 text-neutral-600 dark:text-neutral-400">{excerpt}</p>

          <PostCardMeta meta={post} />
        </div>
        <div className="relative mt-5 flex flex-wrap gap-x-2 gap-y-1">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <PostCardCommentBtn commentCount={commentCount} handle={handle} />
          <PostCardSaveBtn className="ms-auto" readingTime={readingTime} bookmarked={bookmarked} />
        </div>
      </div>

      <div className="relative aspect-1/1 w-56 shrink-0">
        <Image
          src={featuredImage}
          alt={title}
          className="w-full rounded-3xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          fill
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={postType}
          wrapSize="size-8"
          iconSize="size-4"
        />
        <Link href={`/post/${handle}`} className="absolute inset-0"></Link>
      </div>
    </div>
  )
}

export default Card3
