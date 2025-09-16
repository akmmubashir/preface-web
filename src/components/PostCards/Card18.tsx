import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import { TPost } from '@/data/posts'
import ButtonPrimary from '@/shared/ButtonPrimary'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post?: TPost | any
  lang?: string
  yellowColor?: boolean
}

const Card18: FC<Props> = ({ className, titleClass = 'text-lg ', ratio = 'aspect-4/3', post, lang, yellowColor }) => {
  const {
    title,
    excerpt,
    handle,
    slug,
    thumbnail,
    featuredImage,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
  } = post

  const parentCategorySlug = categories[0]?.parentCategory?.slug
  const categorySlug = categories[0]?.slug

  return (
    <div className={clsx('group post-card-18 relative flex flex-col overflow-hidden rounded-xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        {postType?.name === 'Podcast' ? (
          <PostFeaturedMedia post={post} />
        ) : (
          <>
            {thumbnail || featuredImage ? (
              <Image
                sizes="(max-width: 1024px) 100vw, 33vw"
                alt={title}
                className="size-full rounded-xl object-cover brightness-85 transition-[filter] duration-300 group-hover:brightness-60"
                src={thumbnail || featuredImage}
                priority
                fill
              />
            ) : (
              <div className="size-full rounded-xl bg-gray-200" /> // fallback placeholder
            )}
            {/* <PostTypeFeaturedIcon
              className="absolute end-3.5 top-3.5 group-hover:hidden"
              postType={postType}
              wrapSize="size-7"
              iconSize="size-4"
            /> */}
            <span className="absolute inset-0"></span>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-4 opacity-100">
        {/* <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} /> */}
        <CategoryBadgeList categories={categories} yellowColor={yellowColor} />
      </div>

      <span className="absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80" />

      <div className="absolute inset-x-0 bottom-0 flex grow flex-col p-6">
        <span className="absolute inset-0" />
        {/* <CategoryBadgeList categories={categories} /> */}
        <div className="flex items-start gap-3">
          {/* vertical line */}
          <div className="mt-1 h-8 w-0.5 flex-shrink-0 bg-white"></div>
          <h2
            className={clsx('!line-clamp-2 !text-sm leading-snug font-semibold text-white sm:!text-[17px]', titleClass)}
          >
            {title}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className={clsx('mt-3 line-clamp-2 text-[12px] leading-snug font-medium text-white sm:text-sm')}>
            {excerpt}
          </p>
          <div className="relative z-10">
            <Link
              href={
                lang === 'en'
                  ? `/${parentCategorySlug}/${categorySlug}/${slug}`
                  : `/${lang}/${parentCategorySlug}/${categorySlug}/${slug}`
              }
            >
              <ButtonPrimary color="logo-colors" className="!px-6 !py-1 !text-[12px]">
                Start Reading
                {/* <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" /> */}
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card18
