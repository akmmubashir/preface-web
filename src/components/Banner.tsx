import Image from 'next/image'

interface BannerProps {
  image: string
  title?: any
  alt?: string
  className?: string
  description?: any
  dict?: any
}

const Banner = ({ image, title, alt, className = '', description, dict }: BannerProps) => {
  return (
    <div className={`relative aspect-16/9 lg:aspect-16/5 ${className}`}>
      <Image
        alt={alt || title}
        fill
        src={image}
        className="object-cover md:rounded-2xl"
        sizes="(max-width: 1600px) 100vw, 95vw"
        priority
      />
      {/* Linear gradient overlay - left to right fade */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 md:rounded-l-2xl"
        style={{
          background: 'linear-gradient(90deg, rgba(20, 20, 20, 0.76) 0%, rgba(97, 97, 97, 0) 100%)',
        }}
      ></div>

      {/* Title */}
      <div className="items-left absolute inset-0 flex flex-col justify-center gap-2 px-10">
        <h1 className="text-2xl font-bold text-white md:text-3xl">{title}</h1>
        <p className="text-sm text-white md:text-base">
          {description} {dict.navigation.topics}
        </p>
      </div>
    </div>
  )
}

export default Banner
