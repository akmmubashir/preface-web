import { TPost } from '@/data/posts'
import { Divider } from '@/shared/divider'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardMeta from '../PostCardMeta/PostCardMeta'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
  size?: 'normal' | 'large'
}

const Card2: FC<Props> = ({ className, size = 'normal', post }) => {
  const {
    title,
    featuredImage,
    handle,
    readingTime,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    excerpt,
  } = post

  return (
    <div className={clsx('group post-card-2 relative flex flex-col', className)}>
      <div className="relative z-0 block h-0 w-full shrink-0 grow pt-[75%] sm:pt-[55%]">
        <Image
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
          className="size-full rounded-2xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          src={featuredImage}
          alt={title}
        />
        <Link href={`/post/${handle}`} className="absolute inset-0 z-0"></Link>
        <PostTypeFeaturedIcon
          className="absolute bottom-3 left-3"
          postType={postType}
          wrapSize="size-8"
          iconSize="size-4"
        />
        <CategoryBadgeList
          className="absolute top-3 left-3 flex flex-wrap space-x-2"
          itemClass="relative"
          categories={categories}
        />
      </div>

      <div className="mt-5 flex flex-col sm:px-4">
        <div className="space-y-3">
          <PostCardMeta className="relative text-sm" avatarSize="size-8 text-sm" meta={post} />
          <h2
            className={clsx(
              'post-card-title block font-semibold text-neutral-900 dark:text-neutral-100',
              size === 'large' ? 'text-base sm:text-lg md:text-xl' : 'text-base'
            )}
          >
            <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>
          <p className="block text-sm/6 text-neutral-600 dark:text-neutral-400">{excerpt}</p>
        </div>

        <Divider className="my-5" />

        <div className="relative flex flex-wrap gap-x-2 gap-y-1">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <PostCardCommentBtn commentCount={commentCount} handle={handle} />
          <PostCardSaveBtn className="ms-auto" readingTime={readingTime} bookmarked={bookmarked} />
        </div>
      </div>
    </div>
  )
}

export default Card2
