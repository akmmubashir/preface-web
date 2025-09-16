'use client'
import { PlayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

interface SlideContent {
  _id: string
  title: string
  content?: string
  thumbnail: string
  video_url?: string
  video_file?: string
  slug: string
  views: number
  createdAt: string
  updatedAt: string
}

interface ImageHeroBannerProps {
  imageUrl?: string
  heading?: string
  className?: string
  alt?: string
  posts?: SlideContent[]
}

// Fallback slides in case no posts provided
const defaultSlides: SlideContent[] = [
  {
    _id: '1',
    title: 'How to Pray that cleanses your soul to Pray that cleanses your body',
    thumbnail: '/images/banner/visual-banner.png',
    video_url: 'https://www.youtube.com/watch?v=VJg37fVPy9I',
    slug: 'default-slide-1',
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Understanding the spiritual aspects of prayer',
    thumbnail: '/images/banner/common-banner.png',
    video_url: 'https://www.youtube.com/watch?v=example2',
    slug: 'default-slide-2',
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return ''

  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(regex)

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${match[1]}`
  }

  return url
}

const ImageHeroBanner: FC<ImageHeroBannerProps> = ({
  imageUrl = '/images/banner/visual-banner.png',
  heading = 'The Message of Mohammads PBUH Life',
  className = '',
  alt = 'Hero Banner',
  posts = defaultSlides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [slides, setSlides] = useState<SlideContent[]>(defaultSlides)
  const [isHoveringPlayButton, setIsHoveringPlayButton] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)

  // Process posts data
  useEffect(() => {
    if (posts && posts.length > 0) {
      // Map posts data to our SlideContent interface
      const mappedSlides: SlideContent[] = posts.map((item: any) => ({
        _id: item._id || item.id || Math.random().toString(),
        title: item.title || 'Untitled',
        content: item.content || item.description || '',
        thumbnail: item.thumbnail || item.image || imageUrl,
        video_url: item.video_url || item.videoUrl || '',
        video_file: item.video_file || item.videoFile || '',
        slug: item.slug || '',
        views: item.views || 0,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
      }))

      setSlides(mappedSlides)
    } else {
      setSlides(defaultSlides)
    }
  }, [posts, imageUrl])

  // console.log(slides, 'slides')

  // Auto-slide functionality with hover pause
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1 || isHoveringPlayButton) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length, isHoveringPlayButton])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false) // Stop auto-play when user manually navigates
  }

  const handlePlayButtonHover = () => {
    setIsHoveringPlayButton(true)
  }

  const handlePlayButtonLeave = () => {
    setIsHoveringPlayButton(false)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Background Images with Transitions */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.thumbnail}
              alt={`${alt} - ${slide.title}`}
              fill
              priority={index === 0}
              className="object-cover"
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* Video Overlay - Only show when hovering play button */}
      {isHoveringPlayButton && currentSlideData?.video_url && (
        <div className="absolute inset-0 z-20">
          <iframe
            ref={videoRef}
            src={getYouTubeEmbedUrl(currentSlideData.video_url)}
            className="h-full w-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentSlideData.title}
          />
        </div>
      )}

      {/* Linear Gradient Overlay - Center to Bottom */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 ${
          isHoveringPlayButton ? 'z-30' : 'z-10'
        }`}
      />

      {/* Main Content */}
      <div className={`absolute inset-0 container flex items-end pb-24 ${isHoveringPlayButton ? 'z-40' : 'z-20'}`}>
        {/* Left Content */}
        <div className="flex flex-1 flex-col pr-2 md:pr-8">
          <h1 className="mb-4 max-w-full text-2xl font-semibold tracking-wider text-white md:max-w-2xl md:text-3xl md:font-bold">
            {currentSlideData?.title || heading}
          </h1>
          {/* <p className="mb-6 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
            {currentSlideData?.content ? 
              // Extract plain text from content if it's in rich text format
              currentSlideData.content.includes('blocks') ? 
                'Learn the proper way to perform prayer' : 
                currentSlideData.content
              : 'Learn the proper way to perform prayer'
            }
          </p> */}

          {/* Animated Play Now Button */}
          <button
            className="animated-play-button relative inline-flex w-fit cursor-pointer items-center gap-2 px-4 py-3 text-lg font-medium whitespace-nowrap text-white"
            onMouseEnter={handlePlayButtonHover}
            onMouseLeave={handlePlayButtonLeave}
          >
            <PlayIcon className="h-5 w-5 flex-shrink-0" />
            Play Now
          </button>
        </div>

        {/* Right Side - Content Info */}
        <div className="hidden flex-1 justify-end md:flex">
          <div className="relative">
            {/* Pagination Dots */}
            {slides.length > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      currentSlide === index ? 'w-6 bg-[#60A43A]' : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animated button */}
      <style jsx>{`
        .animated-play-button {
          position: relative;
          transition: all 0.3s ease;
        }

        .animated-play-button::after {
          content: '';
          background: #60a43a;
          position: absolute;
          bottom: 0;
          height: 3px;
          left: 0;
          width: 0;
          transition: all cubic-bezier(0.17, 0.54, 0.58, 1.1) 1s;
        }

        .animated-play-button:hover::after {
          width: 100%;
          transition: all cubic-bezier(0.17, 0.54, 0.58, 1.1) 1s;
        }

        .animated-play-button:hover {
          color: #60a43a;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}

export default ImageHeroBanner
