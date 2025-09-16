'use client'

import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  lang?: string
}

const Card16Podcast: FC<Props> = ({ className, post, ratio = 'aspect-4/3', lang }) => {
  const {
    title,
    handle,
    categories,
    category,
    excerpt,
    featuredImage,
    thumbnail,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    readingTime,
    slug,
  } = post

  // Build the post URL safely
  const getPostUrl = () => {
    if (category?.slug && category?.parentCategory?.slug) {
      return `/${category.parentCategory.slug}/${category.slug}/${slug}`
    }
    if (category?.slug) {
      return `/${category.slug}/${slug}`
    }
    return `/post/${handle}`
  }

  return (
    <div className={clsx('group post-card-16-podcast relative flex flex-col pb-6', className)}>
      <div className={`relative w-full shrink-0 ${ratio}`}>
        {(thumbnail || featuredImage) && (
          <Image
            fill
            alt={title || ''}
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={thumbnail || featuredImage || ''}
            className="rounded-3xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          />
        )}
        {!thumbnail && !featuredImage && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gray-200 dark:bg-gray-800">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm">No image available</p>
            </div>
          </div>
        )}
      </div>

      {/* ABSOLUTE */}
      {/* <Link href={`/post/${handle}`} className="absolute inset-0"></Link> */}

      <CategoryBadgeList className="absolute inset-x-3 top-3" categories={category} />

      {/* MAIN CONTENT */}
      <div className="relative -mt-32 w-11/12">
        {/* {postType !== 'audio' && (
          <PostTypeFeaturedIcon
            wrapSize="size-8"
            iconSize="size-4"
            className="absolute start-3 top-6"
            postType={postType}
          />
        )} */}

        {/* <div className={clsx('flex items-center gap-x-4 px-5', postType !== 'audio' && 'invisible opacity-0')}>
          <div className="grow">
            <Image src={musicWave} alt="musicWave" />
          </div>
          <ButtonPlayMusicPlayer post={post} />
        </div> */}
        <div className="mt-20 flex grow flex-col rounded-3xl rounded-ss-none bg-white p-5 dark:bg-[#0D0D0D]">
          <h2 className="nc-card-title mb-2 block font-normal text-neutral-900 sm:text-base dark:text-neutral-100">
            <span title={title} className="line-clamp-2">
              {title}
            </span>
          </h2>
          {/* <p className="mt-3 mb-5 block text-sm/6 text-neutral-600 dark:text-neutral-400">
            <span className="line-clamp-2">{excerpt}</span>
          </p> */}
          <div className="relative mt-auto flex flex-wrap gap-x-2 gap-y-1">
            <PostCardLikeBtn likeCount={likeCount} liked={liked} />
            {/* <PostCardCommentBtn commentCount={commentCount} handle={handle} /> */}
            <PostCardSaveBtn className="" bookmarked={bookmarked} />
            <Link
              // href={getPostUrl()}
              href={lang === 'en' ? getPostUrl() : `/${lang}/${getPostUrl()}`}
              className="ms-auto flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] transition-transform duration-200 hover:bg-[#f3f3f3] dark:border-[#505050] dark:bg-[#0D0D0D] dark:hover:bg-[#1a1a1a]"
            >
              <ArrowRightIcon
                strokeWidth={3}
                className="h-3 w-3 text-[#C2C2C2] transition-colors duration-200 rtl:rotate-180 dark:text-[#707070]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card16Podcast
