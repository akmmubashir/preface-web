'use client'

import { Link } from '@/shared/link'
import SpinLoading from '@/shared/spin-loading'
import { SpeakerWaveIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

interface Props {
  videoUrl: string
  isHover: boolean
  handle: string
  autoPlay?: boolean
  onStart?: () => void
  href?: string
}

const MediaVideo: FC<Props> = ({ videoUrl, isHover, handle, autoPlay = false, onStart, href }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [showDescUnmuted, setShowDescUnmuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  let __timeOut: NodeJS.Timeout | null = null
  const __loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playerRef = useRef<ReactPlayer | null>(null)

  useEffect(() => {
    if (autoPlay) {
      // For autoplay, render immediately and start playing
      setIsRendered(true)
      setIsPlaying(true)
      setShowLoading(false)
    } else if (isHover) {
      // For hover play, show loading first, then render video
      setShowLoading(true)

      // Clear any existing loading timeout
      if (__loadingTimeoutRef.current) {
        clearTimeout(__loadingTimeoutRef.current)
      }

      // Show loading for 800ms before rendering video
      __loadingTimeoutRef.current = setTimeout(() => {
        setIsRendered(true)
        playerRef.current?.seekTo(0, 'seconds')
      }, 300)
    } else {
      // Reset states when not hovering
      setShowLoading(false)
      setIsRendered(false)
      setIsPlaying(false)
    }
  }, [isHover, autoPlay])

  useEffect(() => {
    return () => {
      __timeOut && clearTimeout(__timeOut)
      __loadingTimeoutRef.current && clearTimeout(__loadingTimeoutRef.current)
    }
  }, [__timeOut])

  const shouldPlay = autoPlay || isHover

  return (
    <div className={clsx('absolute inset-0', shouldPlay ? 'opacity-100' : 'opacity-0')}>
      {isRendered && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          muted={isMuted}
          playing={shouldPlay}
          loop={autoPlay}
          style={{
            opacity: isPlaying ? 1 : 0,
          }}
          className="absolute inset-0 bg-neutral-900 transition-opacity"
          width="100%"
          height="100%"
          onStart={() => {
            setIsPlaying(true)
            setShowLoading(false) // Hide loading when video starts
            onStart?.() // Call the onStart callback if provided
            __timeOut && clearTimeout(__timeOut)
            __timeOut = setTimeout(() => {
              setShowDescUnmuted(false)
            }, 2500)
          }}
        />
      )}

      <Link
        href={href || `/post/${handle}`}
        className={clsx(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
          isPlaying || !showLoading ? 'opacity-0' : 'opacity-100'
        )}
      >
        <SpinLoading />
      </Link>

      {isPlaying && (
        <div
          className={clsx(
            'absolute start-2 bottom-2 flex h-6 items-center justify-center rounded-full bg-black/70 text-sm text-white transition-transform',
            showDescUnmuted ? 'ps-1.5 pe-2' : 'w-6 hover:scale-125'
          )}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <>
              {/* <SpeakerWaveIcon className="size-3.5" /> */}
              {/* {showDescUnmuted && <span className="ms-1 inline-block text-[9px]">Click here to unmute</span>} */}
              <SpeakerWaveIcon className="size-3.5" />
            </>
          ) : (
            <SpeakerWaveIcon className="size-3.5" />
          )}
        </div>
      )}
    </div>
  )
}

export default MediaVideo
