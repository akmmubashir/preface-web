import { TPost } from '@/data/posts'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { FC } from 'react'
import Card16Podcast from './PostCards/Card16Podcast'
import Card17Podcast from './PostCards/Card17Podcast'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
}

const SectionMagazine8: FC<Props> = ({ posts, className, heading, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-8 relative', className)}>
      <HeadingWithSub
        subHeading={subHeading}
        className="mb-14 text-neutral-900 dark:text-neutral-50"
        dimHeading={dimHeading}
      >
        {heading}
      </HeadingWithSub>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6 md:gap-7">
        <Card16Podcast className="sm:col-span-3 lg:col-span-2" post={posts[0]} />
        <Card16Podcast className="sm:col-span-3 lg:col-span-2" post={posts[1]} />
        <div className="flex flex-col gap-y-6 sm:col-span-6 md:gap-y-7 lg:col-span-2">
          {posts.slice(2, 6).map((p) => (
            <Card17Podcast key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine8
