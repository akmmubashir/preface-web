import { ReactNode } from 'react'

interface VideoBannerProps {
  videoSrc: string
  title: string
  alt?: string
  className?: string
  children?: ReactNode
}

const VideoBanner = ({ videoSrc, title, alt, className = '', children }: VideoBannerProps) => {
  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover" aria-label={alt || title}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay - similar to Banner component */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(20, 20, 20, 0.76) 0%, rgba(97, 97, 97, 0) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 md:px-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
          {children && <div className="mt-6 text-lg text-white/90 md:text-xl">{children}</div>}
        </div>
      </div>
    </div>
  )
}

export default VideoBanner
