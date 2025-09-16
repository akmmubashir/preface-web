import { TPost } from '@/data/posts'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { HeadingWithSubProps } from '@/shared/Heading'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC } from 'react'
import Card12 from './PostCards/Card12'
import Card13 from './PostCards/Card13'
import SectionTabHeader from './SectionTabHeader'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
}

const SectionMagazine5: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-5 relative', className)}>
      <SectionTabHeader
        heading={heading}
        subHeading={subHeading}
        dimHeading={dimHeading}
        tabActive="Development"
        tabs={['Development', 'Design', 'Illustration', 'Photography']}
      />
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-5 md:gap-7 lg:grid-cols-2">
        {posts[0] && <Card12 post={posts[0]} />}
        <div className="flex flex-col gap-5 md:gap-7">
          {posts.slice(1, 5).map((item, index) => (
            <Card13 className="flex-1" key={index} post={item} />
          ))}
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <ButtonPrimary>
          Show more articles
          <ArrowRightIcon className="size-4" />
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionMagazine5
