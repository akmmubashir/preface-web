import { TPost } from '@/data/posts'
import clsx from 'clsx'
import { FC } from 'react'
import Card3Small from './PostCards/Card3Small'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  posts: TPost[]
  maxHeight?: string // Optional prop to customize max height
  maxVisiblePosts?: number // Optional prop to set when scrolling should kick in
}

const WidgetPosts: FC<Props> = ({
  className = 'bg-white dark:bg-[#0D0D0D]',
  posts,
  maxHeight = 'max-h-[70vh]', // Default max height (24rem = 384px)
  maxVisiblePosts = 6,
}) => {
  const shouldScroll = posts && posts.length > 6
  return (
    <div className={clsx('widget-posts overflow-hidden rounded-3xl', className)}>
      <WidgetHeading title="Other Topics" viewAll={{ label: 'View all', href: '/#' }} />
      <div
        className={clsx(
          'flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700',
          shouldScroll &&
            `${maxHeight} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 overflow-y-auto`
        )}
      >
        {posts?.map((post, index) => (
          <Card3Small
            className="p-4 hover:bg-neutral-200 xl:px-5 xl:py-6 dark:hover:bg-neutral-700"
            key={post._id}
            post={post}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default WidgetPosts
