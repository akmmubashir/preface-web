import { TPost } from '@/data/posts'
import HeadingWithSub from '@/shared/Heading'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import Card10 from './PostCards/Card10'
import Card10V2 from './PostCards/Card10V2'
import Card10V6 from './PostCards/Card10V6'
import Card11 from './PostCards/Card11'
import Card14 from './PostCards/Card14'
import Card15Podcast from './PostCards/Card15Podcast'
import Card3 from './PostCards/Card3'
import Card4 from './PostCards/Card4'
import Card7 from './PostCards/Card7'
import Card9 from './PostCards/Card9'

interface Props {
  posts?: TPost[]
  className?: string
  gridClass?: string
  heading?: ReactNode
  subHeading?: ReactNode
  headingIsCenter?: boolean
  timeDuration?: boolean
  lang?: string
  postCardName?:
    | 'card3'
    | 'card4'
    | 'card7'
    | 'card9'
    | 'card10'
    | 'card10V2'
    | 'card10V6'
    | 'card11'
    | 'card14'
    | 'card15Podcast'
}

const SectionGridPosts: FC<Props> = ({
  posts,
  postCardName = 'card3',
  className,
  gridClass,
  heading,
  subHeading,
  timeDuration,
  headingIsCenter,
  lang,
}) => {
  const renderCard = (post: TPost) => {
    switch (postCardName) {
      case 'card3':
        return (
          <Card3
            key={post.id}
            className="[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] p-3 sm:p-5 2xl:p-6"
            post={post}
          />
        )
      case 'card4':
        return <Card4 key={post.id} post={post} />
      case 'card7':
        return <Card7 key={post.id} post={post} />
      case 'card9':
        return <Card9 key={post.id} post={post} />
      case 'card10':
        return <Card10 key={post.id} post={post} />
      case 'card10V2':
        return <Card10V2 key={post.id} post={post} ratio="aspect-16/9" />
      case 'card10V6':
        return <Card10V6 key={post._id} post={post} ratio="aspect-16/9" timeDuration={timeDuration} lang={lang} />
      case 'card11':
        return <Card11 key={post.id} post={post} />
      case 'card14':
        return <Card14 key={post.id} post={post} />
      case 'card15Podcast':
        return <Card15Podcast key={post.id} post={post} />
      default:
        return null
    }
  }

  return (
    <div className={clsx('section-grid-posts relative', className)}>
      <HeadingWithSub subHeading={subHeading as string} isCenter={headingIsCenter}>
        {heading}
      </HeadingWithSub>
      <div className={clsx('grid gap-x-6 gap-y-8 md:gap-x-7 md:gap-y-10', gridClass)}>
        {posts?.map((post) => renderCard(post))}
      </div>
      {/* <div className="mt-20 flex items-center justify-center">
        <ButtonPrimary>
          Show me more
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
        </ButtonPrimary>
      </div> */}
    </div>
  )
}

export default SectionGridPosts
