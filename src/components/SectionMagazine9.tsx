import { TPost } from '@/data/posts'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { FC } from 'react'
import Card17Podcast from './PostCards/Card17Podcast'
import Card9 from './PostCards/Card9'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
}

const SectionMagazine9: FC<Props> = ({ posts, className, heading, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-9 relative', className)}>
      {heading && (
        <HeadingWithSub dimHeading={dimHeading} subHeading={subHeading}>
          {heading}
        </HeadingWithSub>
      )}
      <div className={clsx('grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3')}>
        {posts[0] && <Card9 ratio="aspect-4/3" post={posts[0]} />}
        {posts[1] && <Card9 ratio="aspect-4/3" post={posts[1]} />}
        {posts[2] && <Card9 ratio="aspect-4/3" post={posts[2]} />}
      </div>
      <div className={clsx('mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3')}>
        {posts.slice(3).map((p) => (
          <Card17Podcast key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default SectionMagazine9
