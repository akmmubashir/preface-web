import CategoryBadgeList from '@/components/CategoryBadgeList'
import { TPostDetail } from '@/data/posts'
import { Badge } from '@/shared/Badge'
import { Divider } from '@/shared/divider'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import AudioPlayerButton from './AudioPlayerButton'
import GalleryImages from './GalleryImages'
import SingleMeta from './SingleMeta'
import { SingleMetaAction } from './SingleMetaAction'
import SingleTitle from './SingleTitle'
import VideoPlayer from './VideoPlayer'

interface Props {
  className?: string
  post: TPostDetail | any
  headerStyle?: 'style1' | 'style2' | 'style3' | 'audio' | 'video' | 'gallery'
}

const TitleAndMeta = ({ className, post }: Omit<Props, 'headerStyle'>) => {
  const { categories, date, author, readingTime, commentCount, handle, likeCount, liked, title, excerpt } = post

  return (
    <div className={`single-header-meta space-y-5 ${className}`}>
      <CategoryBadgeList categories={categories || []} />
      <SingleTitle title={title} />
      {excerpt && (
        <p className="text-base/relaxed text-neutral-600 md:text-lg/relaxed dark:text-neutral-400">{excerpt}</p>
      )}
      <Divider />
      <div className="flex flex-wrap gap-5">
        <SingleMeta author={author} date={date} readingTime={readingTime} />
        <SingleMetaAction
          className="ms-auto"
          commentCount={commentCount}
          handle={handle}
          likeCount={likeCount}
          liked={liked}
          title={title}
        />
      </div>
    </div>
  )
}

const HeaderStyle1 = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  const { featuredImage, title } = post

  return (
    <>
      <div className="container">
        <Divider />
      </div>
      <header className={clsx('single-header-style-1 container mt-8 lg:mt-16', className)}>
        <div className="mx-auto max-w-4xl">
          <TitleAndMeta post={post} />
        </div>

        {featuredImage.src && (
          <div className="relative mt-8 aspect-square w-full sm:mt-12 sm:aspect-16/9">
            <Image
              alt={title}
              className="rounded-2xl object-cover"
              src={featuredImage}
              sizes="(max-width: 1440px) 100vw, 1440px"
              fill
              priority
            />
          </div>
        )}
      </header>
    </>
  )
}

const HeaderStyle2 = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  return (
    <header
      className={clsx(
        'single-header-style-2 relative flex flex-col gap-5 bg-neutral-900 lg:flex-row dark:bg-neutral-950',
        className
      )}
    >
      <div className="dark relative grow pt-16 pr-4 pl-container text-white lg:py-20 xl:py-28">
        <div className="max-w-(--breakpoint-md)">
          <TitleAndMeta post={post} />
        </div>
      </div>

      {post.featuredImage.src && (
        <div className="mt-8 w-full shrink-0 lg:mt-0 lg:w-2/5 2xl:w-1/3">
          <div className="relative aspect-4/3 lg:size-full">
            <Image
              alt={post.title}
              className="inset-0 size-full object-cover lg:absolute"
              src={post.featuredImage}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              sizes="(max-width: 1440px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      )}
    </header>
  )
}

const HeaderStyle3 = ({ post, className }: Omit<Props, 'defaultStyle'>) => {
  const {
    commentCount,
    handle,
    likeCount,
    liked,
    title,
    excerpt,
    categories,
    date,
    author,
    readingTime,
    featuredImage,
  } = post
  return (
    <header className={clsx('single-header-style-3 relative', className)}>
      <div className="absolute inset-x-0 top-0 h-[480px] bg-neutral-900 md:h-[600px] lg:h-[700px] xl:h-[95vh] dark:bg-black/30" />

      <div className="relative container rounded-xl pt-10 lg:pt-16">
        <div className="relative mx-auto max-w-4xl space-y-5 text-neutral-100">
          <CategoryBadgeList categories={categories || []} />
          <SingleTitle title={title} />
          {excerpt && <p className="text-base text-neutral-300 md:text-lg/relaxed">{excerpt}</p>}
        </div>

        {/* FEATURED IMAGE */}
        <div className="relative my-10 aspect-square lg:aspect-16/9">
          {featuredImage.src && (
            <Image
              alt="post"
              className="rounded-3xl object-cover shadow-xl"
              fill
              priority
              src={featuredImage}
              sizes="(max-width: 1024px) 100vw, 1440px"
            />
          )}
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap gap-5">
          <SingleMeta author={author} date={date} readingTime={readingTime} />
          <SingleMetaAction
            className="ms-auto"
            commentCount={commentCount}
            handle={handle}
            likeCount={likeCount}
            liked={liked}
            title={title}
          />
        </div>
        <Divider className="mx-auto mt-10 max-w-4xl" />
      </div>
    </header>
  )
}

const HeaderAudio = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  const { title, author, date, readingTime, commentCount, handle, likeCount, liked } = post
  return (
    <header className={clsx('relative bg-neutral-100/90 py-10 sm:py-16 dark:bg-neutral-800', className)}>
      <div className="container flex flex-col gap-x-8 gap-y-8 sm:flex-row sm:items-center xl:gap-x-16">
        <div className="size-40 shrink-0 rounded-full lg:size-56 xl:size-60">
          <AudioPlayerButton post={post} />
        </div>
        <div className="flex flex-col items-start gap-y-5 rounded-4xl">
          <Badge color="indigo">S1 EP. 128</Badge>
          <SingleTitle title={title} />
          <div className="flex w-full flex-wrap items-end gap-5 pt-2">
            <SingleMeta author={author} date={date} readingTime={readingTime} />
            <SingleMetaAction
              className="ms-auto"
              commentCount={commentCount}
              handle={handle}
              likeCount={likeCount}
              liked={liked}
              title={title}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

const HeaderVideo = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  return (
    <div className={clsx('single-header-style-video', className)}>
      <VideoPlayer videoUrl={post.videoUrl} />
      <div className="container mt-10 pb-5">
        <TitleAndMeta post={post} />
      </div>
    </div>
  )
}

const HeaderGallery = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  return (
    <>
      <div className="container">
        <Divider />
      </div>
      <div className={clsx('single-header-style-gallery mt-10 lg:mt-16', className)}>
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <TitleAndMeta post={post} />
          </div>
        </div>
        <GalleryImages images={post.galleryImgs} gridType="grid3" />
      </div>
    </>
  )
}

const SingleHeaderContainerVideo: FC<Props> = ({ className, post, headerStyle = 'style1' }) => {
  if ((post.postType === 'audio' && post.audioUrl) || headerStyle === 'audio') {
    return <HeaderAudio className={className} post={post} />
  }

  if ((post.postType === 'video' && post.videoUrl) || headerStyle === 'video') {
    return <HeaderVideo className={className} post={post} />
  }

  if ((post.postType === 'gallery' && post.galleryImgs) || headerStyle === 'gallery') {
    return <HeaderGallery className={className} post={post} />
  }

  return (
    <>
      {headerStyle === 'style1' && <HeaderStyle1 className={className} post={post} />}
      {headerStyle === 'style2' && <HeaderStyle2 className={className} post={post} />}
      {headerStyle === 'style3' && <HeaderStyle3 className={className} post={post} />}
    </>
  )
}

export default SingleHeaderContainerVideo
