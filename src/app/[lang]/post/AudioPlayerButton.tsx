'use client'

import ButtonPlayMusicPlayer from '@/components/ButtonPlayMusicPlayer'
import { TPost } from '@/data/posts'
import playingIcon from '@/images/icon-playing.gif'
import clsx from 'clsx'
import Image from 'next/image'

const AudioPlayerButton = ({ post }: { post: TPost }) => {
  const { featuredImage, title } = post

  const renderIcon = (playing: boolean) => {
    if (playing) {
      return <Image className="w-7" src={playingIcon} alt="playing" priority sizes="30px" />
    }

    return (
      <svg className="ms-0.5 size-11 rtl:rotate-180" fill="currentColor" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
        ></path>
      </svg>
    )
  }

  const renderButtonPlay = (playing: boolean) => {
    return (
      <div className="group relative size-full cursor-pointer">
        <Image
          className={clsx(
            'nc-animation-spin rounded-full object-cover shadow-2xl brightness-50 transition-transform',
            playing && 'playing'
          )}
          src={featuredImage}
          sizes="300px"
          alt={title}
          fill
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-full border-2 border-white bg-black/50 text-white bg-blend-multiply transition-transform duration-300 group-hover:scale-110">
            {renderIcon(playing)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <ButtonPlayMusicPlayer
      className="size-full"
      customPlaying={renderButtonPlay(true)}
      customPaused={renderButtonPlay(false)}
      post={post}
    />
  )
}

export default AudioPlayerButton
