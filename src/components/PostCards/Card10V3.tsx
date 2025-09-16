'use client'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'
import NcImage from '../NcImage/NcImage'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  lang?: string
  galleryType?: 1 | 2
}

const Card10V3: FC<Props> = ({ className, post, galleryType = 1, lang }) => {
  const {
    title,
    name,
    handle,
    featuredImage,
    categories,
    postType,
    galleryImgs,
    slug,
    author,
    date,
    readingTime,
    bookmarked,
  } = post
  const [isHover, setIsHover] = useState(false)

  const renderGallery2 = () => {
    if (!galleryImgs) return null
    return (
      <div className="grid size-full gap-2">
        {/* <div className="grid grid-cols-3 gap-2">
          <NcImage
            alt="gallery 1"
            fill
            containerClassName="relative col-span-2"
            src={galleryImgs[0]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
          <NcImage
            alt="gallery 2"
            fill
            src={galleryImgs[1]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
        </div> */}

        <NcImage
          alt="gallery 3"
          fill
          src={galleryImgs[2]}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="size-full object-cover"
        />
      </div>
    )
  }

  const renderGallery = () => {
    if (!galleryImgs) return null
    return (
      <div className="grid size-full gap-2">
        {/* <div className="grid grid-cols-3 gap-2">
          <NcImage
            alt="gallery 1"
            fill
            containerClassName="relative col-span-2"
            src={galleryImgs[0]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
          <NcImage
            alt="gallery 2"
            fill
            src={galleryImgs[1]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
        </div> */}

        <NcImage
          alt="gallery 3"
          fill
          src={galleryImgs[2]}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="size-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={clsx('group post-card-10-v3 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-16/9">
        {postType !== 'gallery' || !galleryImgs?.length ? (
          <PostFeaturedMedia
            post={post}
            isHover={isHover}
            href={`/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`}
          />
        ) : galleryType === 1 ? (
          renderGallery()
        ) : (
          renderGallery2()
        )}

        {postType === 'gallery' && galleryImgs?.length && (
          <Link
            href={
              lang === 'en'
                ? `/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`
                : `/${lang}/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`
            }
            className="absolute inset-0 bg-neutral-900/20 opacity-75 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>

      {/* <div className="absolute inset-x-3 top-3 flex items-start justify-between space-x-4">
        <CategoryBadgeList categories={categories} />
        <PostCardSaveBtn bookmarked={bookmarked} />
      </div> */}

      <div className="absolute right-0 bottom-0 left-0 p-6">
        <h2 className="line-clamp-2 block max-w-[300px] leading-snug font-semibold text-[#FFFFFF] sm:text-lg dark:text-neutral-100">
          <Link
            href={
              lang === 'en'
                ? `/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`
                : `/${lang}/${categories[0]?.parentCategory.slug}/${categories[0]?.slug}/${slug}`
            }
            title={name || title}
            className="line-clamp-2"
          >
            {name || title}
          </Link>
        </h2>
      </div>
    </div>
  )
}

export default Card10V3
