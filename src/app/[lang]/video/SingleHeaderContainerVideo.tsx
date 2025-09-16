import { TPost } from '@/data/posts'
import { Divider } from '@/shared/divider'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import SingleMeta from './SingleMeta'
import { SingleMetaAction } from './SingleMetaAction'
import SingleTitle from './SingleTitle'
import VideoPlayer from './VideoPlayer'

interface Props {
  className?: string
  post: TPost | any
  headerStyle?: 'style1' | 'style2' | 'style3' | 'audio' | 'video' | 'gallery'
}

const TitleAndMeta = ({ className, post }: Omit<Props, 'headerStyle'>) => {
  const { commentCount, handle, likeCount, liked, title, excerpt } = post

  return (
    <div className={`single-header-meta space-y-5 ${className}`}>
      <SingleTitle title={title} />
      {excerpt && (
        <p className="text-base/relaxed text-neutral-600 md:text-lg/relaxed dark:text-neutral-400">{excerpt}</p>
      )}
      {/* <Divider /> */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="">
          <SingleMetaAction
            commentCount={commentCount}
            handle={handle}
            likeCount={likeCount}
            liked={liked}
            title={title}
            className=""
          />
        </div>
      </div>
      <div className="mt-8">
        <Divider />
      </div>
    </div>
  )
}

const HeaderStyle3 = ({ post, className }: Omit<Props, 'defaultStyle'>) => {
  const { commentCount, handle, likeCount, liked, title, excerpt, date, author, readingTime, featuredImage } = post
  return (
    <header className={clsx('single-header-style-3 relative', className)}>
      <div className="absolute inset-x-0 top-0 h-[480px] bg-neutral-900 md:h-[600px] lg:h-[700px] xl:h-[95vh] dark:bg-black/30" />

      <div className="relative container rounded-xl pt-10 lg:pt-16">
        <div className="relative mx-auto max-w-4xl space-y-5 text-neutral-100">
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

const HeaderVideo = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  // Use video_url if videoUrl is not available
  const videoSource = post?.video_url || post?.videoUrl || post.video_file || (post as any).video_url
  // console.log(videoSource, 'videoSource');

  if (!videoSource) {
    return (
      <div className="container py-10 text-center">
        <p className="text-lg text-red-500">No video source found for this post</p>
      </div>
    )
  }

  return (
    <div className={clsx('single-header-style-video', className)}>
      <VideoPlayer videoUrl={videoSource} />
      <div className="container mt-10 pb-5">
        <TitleAndMeta post={post} />
      </div>
    </div>
  )
}

const SingleHeaderContainerVideo: FC<Props> = ({ className, post, headerStyle = 'style1' }) => {
  if ((post.postType.name === 'Video' && (post.video_url || (post as any).videoUrl)) || headerStyle === 'video') {
    return <HeaderVideo className={className} post={post} />
  }

  return <>{headerStyle === 'style3' && <HeaderStyle3 className={className} post={post} />}</>
}

export default SingleHeaderContainerVideo
