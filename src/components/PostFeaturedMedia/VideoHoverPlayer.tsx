'use client'

import { TPost } from '@/data/posts'
import SpinLoading from '@/shared/spin-loading'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'
import MediaVideo from './MediaVideo'

interface Props {
  className?: string
  post: TPost
}

const VideoHoverPlayer: FC<Props> = ({ className, post }) => {
  const { featuredImage, thumbnail, postType, videoFile, videoUrl, video_file, handle, title } = post
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Use video_file as primary, then videoFile, then videoUrl as fallbacks
  const videoSource = video_file || videoFile || videoUrl

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsLoading(true)

    // If no video source, stop loading after 2 seconds
    if (!videoSource) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsLoading(false)
  }

  const handleVideoStart = () => {
    setIsLoading(false)
  }

  const renderImage = () => {
    const imageSrc = featuredImage || thumbnail
    if (!imageSrc) return null
    return <Image alt={title} fill className="object-cover" src={imageSrc} sizes="(max-width: 600px) 100vw, 50vw" />
  }

  return (
    <div
      className={clsx('relative size-full overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      {renderImage()}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Video Icon - shown when not hovered */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
            wrapSize="size-16"
            iconSize="size-8"
          />
        </div>
      )}

      {/* Loading Spinner - shown when hovered and loading */}
      {isHovered && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <SpinLoading className="size-12" />
        </div>
      )}

      {/* Video Player - shown when hovered and video source exists */}
      {isHovered && videoSource && (
        <MediaVideo isHover={true} videoUrl={videoSource} handle={handle} autoPlay={false} onStart={handleVideoStart} />
      )}

      {/* Fallback for no video source - keep showing loading */}
      {isHovered && !videoSource && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <SpinLoading className="size-12" />
        </div>
      )}

      {/* Link overlay */}
      <Link href={`/video/${post.slug}`} className="absolute inset-0 z-10" />
    </div>
  )
}

export default VideoHoverPlayer
