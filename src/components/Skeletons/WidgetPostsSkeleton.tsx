import clsx from 'clsx'
import { FC } from 'react'
import WidgetHeadingSkeleton from './WidgetHeadingSkeleton'

interface Props {
  className?: string
  items?: number // number of placeholder cards
}
const Card3SmallSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('post-card-3-small flex items-center justify-between gap-4 p-4', className)}>
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-28 shrink-0">
        <div className="h-full w-full animate-pulse rounded-lg bg-gray-400 dark:bg-neutral-800" />
      </div>

      {/* Content */}
      <div className="grow space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-400 dark:bg-neutral-800" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-400 dark:bg-neutral-800" />
      </div>
    </div>
  )
}

const WidgetPostsSkeleton: FC<Props> = ({ className, items = 6 }) => {
  return (
    <div className={clsx('widget-posts overflow-hidden rounded-3xl bg-white dark:bg-[#0D0D0D]', className)}>
      {/* Heading Skeleton */}
      <WidgetHeadingSkeleton />

      {/* Posts Skeleton */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {Array.from({ length: items }).map((_, idx) => (
          <Card3SmallSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}

export default WidgetPostsSkeleton
