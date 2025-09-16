'use client'

import { TPost } from '@/data/posts'
import { Link } from '@/shared/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'

interface Props {
  className?: string
  post: TPost
  lang?: string
}

const Card17Podcast: FC<Props> = ({ className, post, lang }) => {
  const {
    title,
    name,
    handle,
    slug,
    thumbnail,
    parentCategory,
    featuredImage,
    postType,
    date,
    readingTime,
    totalArticles,
  } = post

  const IS_AUDIO = postType === 'audio'

  return (
    <div
      className={clsx(
        'post-card-17-podcast relative flex items-center justify-between gap-x-5 rounded-xl bg-white p-2.5 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-neutral-50 hover:shadow-lg dark:bg-[#0D0D0D] dark:hover:bg-[#1A1A1A]',
        className
      )}
    >
      <div className="flex items-center gap-x-4">
        <div className="relative size-14 shrink-0 rounded-[10px] shadow-lg sm:size-22">
          <Image
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-[10px] object-cover"
            src={thumbnail || featuredImage}
            fill
            alt={name || title}
          />
        </div>

        <div className="flex grow flex-col">
          <h2 className="block font-medium">
            {/* <Link href={`/post/${handle}`} className="absolute inset-0"></Link> */}
            <span className="line-clamp-1">{name || title}</span>
          </h2>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {IS_AUDIO && (
              <ButtonPlayMusicPlayer
                post={post}
                buttonSize="size-7"
                buttonColor="bg-primary-600 text-white"
                iconClassName="size-4"
              />
            )}

            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {/* <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time> */}
              {/* <span className="mx-1">/</span> */}
              <span className="text-[12px] font-[400]"> {totalArticles} Articles</span>
            </div>
          </div>
          <div className="mt-[10px] flex shrink-0 items-center">
            <Link
              href={lang === 'en' ? `/${parentCategory.slug}/${slug}` : `/${lang}/${parentCategory.slug}/${slug}`}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#E2E2E2] bg-white p-1.5 dark:border-[#505050] dark:bg-[#0D0D0D]"
            >
              <ArrowRightIcon className="h-3 w-3 text-[#919191] rtl:rotate-180 dark:text-[#707070]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card17Podcast
