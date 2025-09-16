'use client'

import { TPost } from '@/data/posts'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { FC } from 'react'
import { useAudioPlayer } from './AudioProvider'

interface Props {
  className?: string
  post: TPost
  iconClassName?: string
  buttonSize?: string
  buttonColor?: string
  customPlaying?: React.ReactNode
  customPaused?: React.ReactNode
}

const ButtonPlayMusicPlayer: FC<Props> = ({
  className = 'relative',
  post,
  customPlaying,
  customPaused,
  iconClassName = 'size-7',
  buttonSize = 'size-13',
  buttonColor = 'bg-white text-primary-600',
}) => {
  let player = useAudioPlayer(post)

  const renderDefaultBtn = (playing: boolean) => {
    return (
      <div
        className={clsx(
          buttonSize,
          'flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110',
          buttonColor
        )}
      >
        {playing ? (
          <PauseIcon className={clsx(iconClassName)} />
        ) : (
          <PlayIcon className={clsx(iconClassName, 'ms-0.5 rtl:rotate-180')} />
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={clsx('button-play-music-player select-none', className)}
      onClick={() => player.toggle(post)}
      aria-label={`${player.playing ? 'Pause' : 'Play'} - ${post.title}`}
    >
      {player.playing
        ? customPlaying || renderDefaultBtn(player.playing)
        : customPaused || renderDefaultBtn(player.playing)}
    </button>
  )
}

export default ButtonPlayMusicPlayer
