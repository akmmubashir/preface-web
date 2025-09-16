import { SingleMetaAction } from '@/app/[lang]/post/SingleMetaAction'
import Image from 'next/image'

interface Banner2Props {
  image: string
  title: string
  alt?: string
  className?: string
  likeCount?: number
  liked?: boolean
  handle?: string
}

const Banner2 = ({ image, title, alt, className = '', likeCount = 0, liked = false, handle = '' }: Banner2Props) => {
  return (
    <div className={`relative aspect-16/9 lg:aspect-16/5 ${className}`}>
      <Image
        alt={alt || title}
        fill
        src={image}
        className="object-cover"
        sizes="(max-width: 1600px) 100vw, 95vw"
        priority
      />

      {/* Linear Gradient Overlay - Exact Figma Match */}
      <div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(97, 97, 97, 0.3) 60%, rgba(97, 97, 97, 0.65) 65%, rgba(0, 0, 0, 0.8) 85%, rgba(0, 0, 0, 0.95) 95%)',
        }}
      ></div>

      {/* Title with horizontal line */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="container mx-auto pb-16 lg:pb-24">
          <h1 className="mb-6 max-w-3xl text-2xl font-bold text-white md:text-3xl lg:text-3xl">{title}</h1>
          <hr className="w-full border-t-1 border-[#8E8E8E]" />
          {/* Action buttons below the horizontal line */}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mb-8 flex items-center gap-x-2.5">
            <SingleMetaAction
              className=""
              commentCount={20}
              handle={handle}
              likeCount={likeCount}
              liked={liked}
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner2
