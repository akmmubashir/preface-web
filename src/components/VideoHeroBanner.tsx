'use client'

import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

interface VideoHeroBannerProps {
  videoUrl?: string
  heading?: string
  className?: string
}

const VideoHeroBanner: FC<VideoHeroBannerProps> = ({
  // videoUrl = 'https://www.youtube.com/watch?v=vHBodN0Mirs',
  // videoUrl = 'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/PREFACE_(A%20STREAM%20WITH%20MANY%20CURRENTS%20)%20(2).mp4',
  videoUrl = 'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/PREFACE_SEP_04(A%20STREAM%20WITH%20MANY%20CURRENTS_FINAL%20).mp4',
  heading = 'VIDEO',
  className = '',
}) => {
  // const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const playerRef = useRef<ReactPlayer | null>(null)

  useEffect(() => {
    // Render player immediately for autoplay
    setIsRendered(true)
    setIsPlaying(true)
  }, [])

  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {isRendered && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          // muted={isMuted}
          muted={true}
          playing={isPlaying}
          loop={true}
          controls={false}
          disablePictureInPicture={true}
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            opacity: isPlaying ? 1 : 0,
          }}
          className="absolute inset-0 bg-[#000000] transition-opacity"
          width="100%"
          height="100%"
          onStart={() => {
            setIsPlaying(true)
          }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload nofullscreen noremoteplayback',
                disablePictureInPicture: true,
                playsInline: true,
              },
            },
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Heading */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-wider">
          {heading}
        </h1>
      </div> */}

      {/* Mute/Unmute Button */}
      {/* {isPlaying && (
        <button
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-all hover:scale-110 hover:bg-black/80"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      )} */}
    </div>
  )
}

export default VideoHeroBanner
