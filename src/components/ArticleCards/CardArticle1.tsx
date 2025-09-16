'use client'

import NcImage from '@/components/NcImage/NcImage'
import { useFetchReadPosts } from '@/hooks/api'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Article {
  _id: string
  id: string
  title: string
  handle: string
  thumbnail?: string
  category?: any
  slug?: string
}

interface Props {
  className?: string
  article: Article
  index?: number
}

const CardArticle1: FC<Props> = ({ className, article, index }) => {
  const { title, handle, thumbnail, category, _id, slug } = article
  const { data: readPosts = [] } = useFetchReadPosts()
  const isRead = readPosts?.some((post: any) => post._id === _id)

  const parentSlug = category?.parentCategory?.slug
  const subSlug = category?.slug
  const articleSlug = slug

  return (
    <Link
      href={`/${parentSlug}/${subSlug}/${articleSlug}`}
      className={clsx('card-article-1 group flex cursor-pointer flex-col gap-3', className)}
    >
      {/* Image Container */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        {/* Read Indicator */}
        {isRead && (
          <div className="absolute right-2 bottom-3 z-10">
            <div className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 text-xs font-medium text-[#CBDB2A]">
              <CheckIcon className="h-3 w-3 stroke-[3]" />
              <span>Read</span>
            </div>
          </div>
        )}
        {thumbnail ? (
          <NcImage
            alt={title || 'Article image'}
            containerClassName="w-full h-full"
            src={thumbnail}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-400">No image</span>
          </div>
        )}

        {/* Linear Gradient Overlay - Only show when isRead is true */}
        {isRead && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] to-[#616161] opacity-70 transition-all duration-300"></div>
        )}

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] via-[#61616100] to-transparent opacity-0 transition-all duration-300 group-hover:from-[#2F2F2F] group-hover:via-[#616161aa] group-hover:to-[#61616166] group-hover:opacity-30"></div>

        {/* Article Number Badge */}
        <div className="absolute bottom-3 left-1 px-2 py-1 text-xs font-medium text-white">
          {index !== undefined ? `Article ${index + 1}` : 'Article'}
        </div>
      </div>

      <div>
        <h2 className={clsx('nc-card-title line-clamp-2 text-sm font-medium text-neutral-900 dark:text-neutral-100')}>
          {/* {name} */}
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default CardArticle1
