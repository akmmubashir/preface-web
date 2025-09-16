import { TPost } from '@/data/posts'
import { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { FC } from 'react'
import Card2 from './PostCards/Card2'
import Card9 from './PostCards/Card9'
import SectionTabHeader from './SectionTabHeader'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  posts: TPost[]
  heading?: string
  className?: string
}

const SectionMagazine3: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-3 relative', className)}>
      <SectionTabHeader
        heading={heading}
        subHeading={subHeading}
        dimHeading={dimHeading}
        tabActive="development"
        tabs={['development', 'design', 'illustration', 'photography']}
      />

      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {posts
            .filter((_, i) => i < 5 && i >= 1)
            .map((item, index) => (
              <Card9 ratio="aspect-square" key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine3
