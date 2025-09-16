'use client'

import { useAudioPlayer } from '@/components/AudioProvider'
import { ForwardButton } from '@/components/audio-player/ForwardButton'
import { MuteButton } from '@/components/audio-player/MuteButton'
import { PlayButton } from '@/components/audio-player/PlayButton'
import { PlaybackRateButton } from '@/components/audio-player/PlaybackRateButton'
import { RewindButton } from '@/components/audio-player/RewindButton'
import { Slider } from '@/components/audio-player/Slider'
import { HeartIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import PostCardLikeBtn from '../PostCardLikeBtn'

function parseTime(seconds: number) {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - hours * 3600) / 60)
  seconds = seconds - hours * 3600 - minutes * 60
  return [hours, minutes, seconds]
}

function formatHumanTime(seconds: number) {
  let [h, m, s] = parseTime(seconds)
  return `${h} hour${h === 1 ? '' : 's'}, ${m} minute${m === 1 ? '' : 's'}, ${s} second${s === 1 ? '' : 's'}`
}

export function AudioPlayer() {
  let player = useAudioPlayer()

  let wasPlayingRef = useRef(false)

  let [currentTime, setCurrentTime] = useState<number | null>(player.currentTime)

  useEffect(() => {
    setCurrentTime(null)
  }, [player.currentTime])

  if (!player.episode) {
    return null
  }

  return (
    <div className="relative flex items-center gap-6 bg-white/90 px-2.5 py-4 shadow ring-1 shadow-slate-200/80 ring-slate-900/5 backdrop-blur-sm sm:px-4 md:px-6 dark:bg-neutral-950/90">
      <div className="hidden md:block">
        <PlayButton player={player} />
      </div>
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
        <div className="flex items-center gap-2.5">
          <Link
            href={`/post/${player.episode.handle}`}
            className="truncate text-center text-sm leading-6 font-bold md:text-left"
            title={player.episode.title}
          >
            {player.episode.title}
          </Link>
          <span className="hidden md:block">•</span>
          <div className="hidden md:block">
            <PostCardLikeBtn likeCount={player.episode.likeCount} liked={player.episode.liked} />
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex items-center gap-2.5 md:hidden">
            <MuteButton player={player} />
            <button
              type="button"
              className="relative flex size-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:ring-2 focus:ring-slate-500 focus-visible:outline-hidden dark:text-slate-400 dark:hover:bg-neutral-800 dark:hover:text-slate-300"
              aria-label="Like"
            >
              <div className="absolute -inset-1 md:hidden" />
              <HeartIcon className="size-5" />
            </button>
          </div>

          <div className="flex flex-none items-center gap-4">
            <RewindButton player={player} />
            <div className="md:hidden">
              <PlayButton player={player} />
            </div>
            <ForwardButton player={player} />
          </div>
          <Slider
            label="Current time"
            maxValue={player.duration}
            step={1}
            value={[currentTime ?? player.currentTime]}
            onChange={([value]) => setCurrentTime(value)}
            onChangeEnd={([value]) => {
              player.seek(value)
              if (wasPlayingRef.current) {
                player.play()
              }
            }}
            numberFormatter={{ format: formatHumanTime } as Intl.NumberFormat}
            onChangeStart={() => {
              wasPlayingRef.current = player.playing
              player.pause()
            }}
          />
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="flex items-center">
              <PlaybackRateButton player={player} />
            </div>
            <div className="hidden items-center md:flex">
              <MuteButton player={player} />
            </div>

            <button
              type="button"
              className="relative flex size-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:ring-2 focus:ring-slate-500 focus-visible:outline-hidden dark:text-slate-400 dark:hover:bg-neutral-800 dark:hover:text-slate-300"
              onClick={() => {
                player.hide()
              }}
              aria-label="Close"
            >
              <div className="absolute -inset-1 md:hidden" />
              <XMarkIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
