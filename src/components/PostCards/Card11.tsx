'use client'
import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
// import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'
import Image from 'next/image'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  hiddenAuthor?: boolean
  lang?: any
}

const Card11: FC<Props> = ({ className, post, hiddenAuthor = false, ratio = 'aspect-5/3', lang }) => {
  const {
    title,
    subCategory,
    name,
    slug,
    featuredImage,
    handle,
    categories,
    date,
    likeCount,
    liked,
    commentCount,
    readingTime,
    bookmarked,
  } = post

  const [isHover, setIsHover] = useState(false)

  console.log(lang, 'lang')

  return (
    <div
      className={clsx(
        'group post-card-11 relative flex flex-col justify-between rounded-2xl bg-white dark:bg-white/5',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative w-full shrink-0 overflow-hidden rounded-t-3xl', ratio)}>
        {/* <PostFeaturedMedia post={post} isHover={isHover} /> */}
        <Image
          alt="search"
          fill
          src={featuredImage}
          className="object-cover"
          sizes="(max-width: 1600px) 100vw, 95vw"
          priority
        />
      </div>
      {/* <div className="absolute inset-x-3 top-3">
        <CategoryBadgeList categories={categories} />
      </div> */}

      <div className="flex grow items-center gap-3 rounded-b-3xl border p-4">
        {/* Left content: text (title + topic count) */}
        <div className="flex-1">
          <h3 className="nc-card-title block text-base font-normal text-neutral-900 dark:text-neutral-100">
            <span className="line-clamp-2" title={name || title}>
              {name || title}
            </span>
          </h3>
          <span className="text-xs font-normal">{subCategory?.length} topics</span>
        </div>

        {/* Right content: arrow icon (fixed size) */}
        <Link
          href={
            slug ? (slug.startsWith(`${lang}/`) || slug.startsWith(`/${lang}/`) ? `/${slug}` : `/${lang}/${slug}`) : '#'
          }
        >
          <div className="border-[#E2E2E2]transition-transform flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border duration-200 hover:bg-[#f3f3f3] dark:border-[#505050] dark:bg-[#0D0D0D] dark:hover:bg-[#1a1a1a]">
            <ArrowRightIcon className="h-3 w-3 text-[#C2C2C2] transition-colors duration-200 rtl:rotate-180 dark:text-[#707070] dark:hover:text-white" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Card11
