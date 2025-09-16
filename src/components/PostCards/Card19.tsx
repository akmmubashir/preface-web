import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import VideoHoverPlayer from '@/components/PostFeaturedMedia/VideoHoverPlayer'
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
  verticalLine?: boolean
  textCenter?: boolean
  lang?: string
  yellowColor?: boolean
}

const Card19: FC<Props> = ({
  className,
  titleClass = 'text-xl sm:text-2xl xl:text-3xl',
  ratio = 'aspect-4/3 sm:aspect-1/1',
  post,
  yellowColor = false,
  verticalLine = false,
  textCenter = false,
  lang,
}) => {
  const {
    title,
    excerpt,
    slug,
    handle,
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
    <div className={clsx('group post-card-19 relative flex flex-col overflow-hidden rounded-xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        {postType?.name === 'Video' ? (
          <VideoHoverPlayer post={post} />
        ) : postType?.name === 'Podcast' ? (
          <PostFeaturedMedia post={post} />
        ) : (
          <>
            {thumbnail || featuredImage ? (
              <Image
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-xl object-cover brightness-85 transition-[filter] duration-300 group-hover:brightness-60"
                src={thumbnail || featuredImage}
                alt={title}
                priority
                fill
              />
            ) : (
              <div className="h-full w-full rounded-xl bg-gray-200" /> // fallback placeholder
            )}
            {/* <PostTypeFeaturedIcon
              className="absolute end-4 top-4 group-hover:hidden"
              postType={postType}
              wrapSize="size-7"
              iconSize="size-4"
            /> */}
            <span className="absolute inset-0"></span>
          </>
        )}
      </div>

      <span className="absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80" />

      {/* <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:px-7">
        <CategoryBadgeList categories={categories} />
        <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} />
      </div> */}

      <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-4 opacity-100">
        {/* <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} /> */}
        <CategoryBadgeList categories={categories} yellowColor={yellowColor} />
      </div>

      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 flex grow flex-col',
          textCenter
            ? 'w-full gap-2 p-5 text-left sm:gap-4 sm:p-6 xl:mx-auto xl:my-8 xl:w-[80%] xl:text-center'
            : 'p-5 text-left sm:p-6'
        )}
      >
        {/* Button above title */}
        {textCenter && (
          <div className="relative z-10">
            <Link href={lang === 'en' ? `/video/${slug}` : `/${lang}/video/${slug}`}>
              <ButtonPrimary color="logo-colors" className="!px-6 !py-1 !text-[12px]">
                Watch full video
                {/* <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" /> */}
              </ButtonPrimary>
            </Link>
          </div>
        )}

        <div className="relative z-10 flex items-end gap-3">
          {verticalLine && <div className="mt-1 h-8 w-0.5 flex-shrink-0 bg-white"></div>}
          <h2
            className={clsx(
              '!line-clamp-2 block !text-sm font-semibold text-white sm:!text-lg lg:!text-xl',
              titleClass
            )}
          >
            {title}
          </h2>
        </div>
        {!textCenter && (
          <div className="relative z-10 mt-3 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className={clsx('line-clamp-2 flex-1 text-[12px] leading-snug font-medium text-white sm:text-sm')}>
              {excerpt}
            </p>
            <Link
              href={
                lang === 'en'
                  ? `/${parentCategorySlug}/${categorySlug}/${slug}`
                  : `/${lang}/${parentCategorySlug}/${categorySlug}/${slug}`
              }
            >
              <ButtonPrimary color="logo-colors" className="flex-shrink-0 !px-4 !py-1 !text-[12px]">
                Start Reading
              </ButtonPrimary>
            </Link>
          </div>
        )}

        <span className="absolute inset-0 z-0" />
      </div>
    </div>
  )
}

export default Card19
