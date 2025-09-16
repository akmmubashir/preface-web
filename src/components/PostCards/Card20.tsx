import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import CategoryBadgeList from '../CategoryBadgeList'
import LocalDate from '../LocalDate'

const Card20 = ({ post, className }: { post: TPost; className?: string }) => {
  const { title, featuredImage, categories = [], date, readingTime, handle, excerpt } = post || {}
  return (
    <article key={post.id} className={clsx('group flex flex-col items-start justify-between', className)}>
      <div className="relative w-full">
        {featuredImage.src && (
          <Image
            alt={title}
            src={featuredImage}
            className="aspect-square w-full rounded-2xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-90 sm:aspect-3/2"
          />
        )}
        <Link href={`/post/${handle}`} className="absolute inset-0" />
      </div>
      <div className="max-w-xl">
        <div className="mt-3.5 flex items-center gap-x-4 text-xs">
          <LocalDate date={date} />
          <CategoryBadgeList categories={categories} />
        </div>
        <div className="group relative">
          <h3 className="mt-2 text-sm/normal font-semibold">
            <Link href={`/post/${handle}`}>
              <span className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm/6 text-neutral-600 dark:text-neutral-400">{excerpt}</p>
        </div>
      </div>
    </article>
  )
}

export default Card20
