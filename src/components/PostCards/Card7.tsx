import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
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
  hoverClass?: string
  ratio?: string
}

const Card7: FC<Props> = ({ className, ratio = 'aspect-3/4', post, hoverClass }) => {
  const {
    title,
    handle,
    featuredImage,
    categories,
    author,
    date,
    readingTime,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
  } = post

  return (
    <div
      className={clsx('group post-card-7 relative flex flex-col overflow-hidden rounded-3xl', hoverClass, className)}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-center gap-x-2 gap-y-1 p-3">
        <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} />
      </div>
      <div className={clsx('relative w-full', ratio)}>
        <Link href={`/post/${handle}`} className="absolute inset-0" />
        <Image
          fill
          alt={title}
          sizes="(max-width: 600px) 480px,800px"
          className="size-full rounded-3xl object-cover"
          src={featuredImage}
        />
        <PostTypeFeaturedIcon
          className="absolute start-3 top-3 group-hover:hidden"
          postType={postType}
          wrapSize="size-7"
          iconSize="size-4"
        />
        <span className="absolute inset-0 bg-neutral-900/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
      </div>

      <div className="absolute inset-x-3 bottom-3 flex grow flex-col rounded-3xl bg-white p-4 transition-shadow group-hover:shadow-2xl dark:bg-neutral-900">
        <Link href={`/post/${handle}`} className="absolute inset-0"></Link>
        <div className="mb-3 space-y-2.5">
          <CategoryBadgeList categories={categories} />
          <h2 className="block text-base font-semibold text-neutral-900 dark:text-neutral-100">
            <Link href={`/post/${handle}`} title={title} className="line-clamp-2">
              {title}
            </Link>
          </h2>
        </div>
        <PostCardMeta3 readingTime={readingTime} date={date} author={author} />
      </div>
    </div>
  )
}

export default Card7
