import { TPost } from '@/data/posts'
import { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { FC } from 'react'
import Card2 from './PostCards/Card2'
import Card6 from './PostCards/Card6'
import SectionTabHeader from './SectionTabHeader'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  posts: TPost[]
  heading?: string
  className?: string
  subHeading?: string
}

const SectionMagazine1: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-1', className)}>
      <SectionTabHeader
        subHeading={subHeading}
        dimHeading={dimHeading}
        heading={heading}
        tabActive="Workplace"
        tabs={['Workplace', 'Design', 'Development', 'Photography']}
      />
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid gap-6 md:gap-8">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card6 key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine1
