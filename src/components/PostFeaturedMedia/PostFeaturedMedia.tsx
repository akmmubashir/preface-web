import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'
import GallerySlider from './GallerySlider'
import MediaAudio from './MediaAudio'
import MediaVideo from './MediaVideo'

interface Props {
  className?: string
  post: TPost
  isHover?: boolean
  autoPlay?: boolean
  href?: string
}

const PostFeaturedMedia: FC<Props> = ({ className, post, isHover = false, autoPlay = false, href }) => {
  const {
    featuredImage,
    thumbnail,
    postType,
    videoFile,
    video_url,
    videoUrl,
    video_file,
    galleryImgs,
    audioUrl,
    handle,
    title,
  } = post

  // Use video_file as primary, then videoFile, then videoUrl as fallbacks
  const videoSource = video_url || videoUrl || video_file || videoFile || ''

  const renderPostGallery = () => {
    if (!galleryImgs) {
      return renderImage()
    }

    return <GallerySlider handle={handle} galleryImgs={galleryImgs} />
  }

  const renderPostVideo = () => {
    if (!videoSource) {
      return (
        <>
          {renderImage()}
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        </>
      )
    }

    return (
      <>
        {renderImage()}
        {!isHover && (
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        )}
        <MediaVideo isHover={isHover} videoUrl={videoSource} handle={handle} autoPlay={autoPlay} href={href} />
      </>
    )
  }

  const renderPostAudio = () => {
    return (
      <>
        {renderImage()}
        {audioUrl && <MediaAudio post={post} />}
        {!audioUrl && (
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        )}
      </>
    )
  }

  const renderImage = () => {
    const imageSrc = featuredImage || thumbnail
    if (!imageSrc) return null
    return (
      <Link href={href || `/abcd/${handle}`}>
        <Image alt={title} fill className="object-cover" src={imageSrc} sizes="(max-width: 600px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-black/25 opacity-100 transition-opacity group-hover:opacity-75" />
      </Link>
    )
  }

  return (
    <div className={clsx('relative size-full overflow-hidden', className)}>
      {postType?.name === 'Gallery' && renderPostGallery()}
      {postType?.name === 'Video' && renderPostVideo()}
      {postType?.name === 'Podcast' && renderPostAudio()}
      {postType?.name !== 'Podcast' && postType?.name !== 'Video' && postType?.name !== 'Gallery' && renderImage()}
    </div>
  )
}

export default PostFeaturedMedia
