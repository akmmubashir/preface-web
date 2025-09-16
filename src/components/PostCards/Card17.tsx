'use client'

import { TPost } from '@/data/posts'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  post: TPost
  lang?: string
}

const Card17: FC<Props> = ({ className, post, lang }) => {
  const {
    title,
    name,
    handle,
    parentCategory,
    slug,
    featuredIcon,
    totalArticles,
    featuredImage,
    postType,
    icon,
    date,
    readingTime,
  } = post
  const IS_AUDIO = postType === 'audio'

  return (
    <div
      className={clsx(
        'post-card-17 relative flex items-center justify-between gap-x-4 rounded-xl bg-white p-4 dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="relative h-[70px] w-[70px] shrink-0 rounded-full bg-[#F8F8F8] dark:bg-[#1A1A1A]">
        <Image
          sizes="70px"
          className="object-contain p-4"
          src={featuredIcon || icon?.src || '/images/placeholder-image.png'}
          fill
          alt={name || title}
        />
        {/* <NcImage
        alt={name}
        containerClassName={clsx(
          'relative me-4 shrink-0 overflow-hidden rounded-lg',
          size === 'large' ? 'size-20' : 'size-12'
        )}
        src={thumbnail || ''}
        fill
        className="object-cover"
        sizes="80px"
      /> */}
      </div>
      <div className="flex flex-1 flex-col text-left">
        <h2 className="block text-base font-medium text-[#000000] dark:text-white">
          <span className="line-clamp-1">{name || title}</span>
        </h2>
        <div className="mt-1">
          <span className="text-[12px] font-[400] text-neutral-500 dark:text-neutral-400">
            {totalArticles} Articles
          </span>
        </div>
      </div>

      {/* Arrow button on the far right */}
      <div className="flex shrink-0 items-center">
        <Link
          href={lang === 'en' ? `/${parentCategory?.slug}/${slug}` : `/${lang}/${parentCategory?.slug}/${slug}`}
          // href={lang === 'en' ? `/${slug}` : `/${lang}/${slug}`}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] bg-white p-1.5 dark:border-[#505050] dark:bg-[#0D0D0D]"
        >
          <ArrowRightIcon className="h-3 w-3 text-[#919191] rtl:rotate-180 dark:text-[#707070]" />
        </Link>
      </div>
    </div>
  )
}

export default Card17
