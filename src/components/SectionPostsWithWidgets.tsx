import { TAuthor } from '@/data/authors'
import { TCategory } from '@/data/categories'
import { TPost } from '@/data/posts'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { FC } from 'react'
import PaginationWrapper from './PaginationWrapper'
import Card10 from './PostCards/Card10'
import Card11 from './PostCards/Card11'
import Card14 from './PostCards/Card14'
import Card3 from './PostCards/Card3'
import Card4 from './PostCards/Card4'
import Card7 from './PostCards/Card7'
import Card9 from './PostCards/Card9'
import WidgetAuthors from './WidgetAuthors'
import WidgetCategories from './WidgetCategories'
import WidgetPosts from './WidgetPosts'
import WidgetTags from './WidgetTags'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  posts: TPost[]
  gridClass?: string
  className?: string
  heading?: string
  postCardName?: 'card3' | 'card4' | 'card7' | 'card9' | 'card10' | 'card11' | 'card14'
  widgetCategories?: TCategory[]
  widgetAuthors?: TAuthor[]
  widgetTags?: TCategory[]
  widgetPosts?: TPost[]
}

const SectionPostsWithWidgets: FC<Props> = ({
  posts,
  postCardName = 'card3',
  heading,
  gridClass,
  className,
  subHeading,
  widgetCategories,
  widgetAuthors,
  widgetTags,
  widgetPosts,
  dimHeading,
}) => {
  const renderCard = (post: TPost, index: number) => {
    switch (postCardName) {
      case 'card3':
        return <Card3 key={index} className="py-3" post={post} />
      case 'card4':
        return <Card4 key={index} post={post} />
      case 'card7':
        return <Card7 key={index} post={post} ratio="aspect-1/1" />
      case 'card9':
        return <Card9 key={index} post={post} />
      case 'card10':
        return <Card10 key={index} post={post} />
      case 'card11':
        return <Card11 key={index} post={post} />
      case 'card14':
        return <Card14 key={index} post={post} />
      default:
        return null
    }
  }

  return (
    <div className={clsx('section-post-with-widgets relative', className)}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
          <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading}>
            {heading}
          </HeadingWithSub>
          <div className={clsx('grid gap-6 md:gap-7', gridClass)}>{posts.map(renderCard)}</div>
          <PaginationWrapper className="mt-20" totalPages={10} />
        </div>
        <div className="mt-24 w-full space-y-7 lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
          {widgetAuthors && <WidgetAuthors authors={widgetAuthors} />}
          {widgetTags && <WidgetTags tags={widgetTags} />}
          {widgetCategories && <WidgetCategories categories={widgetCategories} />}
          {widgetPosts && <WidgetPosts posts={widgetPosts} />}
        </div>
      </div>
    </div>
  )
}

export default SectionPostsWithWidgets
