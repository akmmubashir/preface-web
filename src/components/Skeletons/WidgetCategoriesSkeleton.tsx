import clsx from 'clsx'
import { FC } from 'react'
import WidgetHeadingSkeleton from './WidgetHeadingSkeleton'

interface Props {
  className?: string
  count?: number
}

const WidgetCategoriesSkeleton: FC<Props> = ({ className = 'bg-white dark:bg-[#0D0D0D]', count = 6 }) => {
  const shouldScroll = count > 6

  return (
    <div className={clsx('widget-categories overflow-hidden rounded-3xl', className)}>
      <WidgetHeadingSkeleton />
      <div className="flow-root p-4">
        <div
          className={clsx(
            'grid grid-cols-2 gap-8 pb-4 max-md:gap-4 sm:grid-cols-3 lg:grid-cols-2',
            shouldScroll
              ? 'grid max-h-[70vh] grid-cols-2 overflow-y-auto pb-4 md:max-h-[90vh]'
              : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2'
          )}
        >
          {[...Array(count)].map((_, index) => (
            <div key={index} className="animate-pulse space-y-3">
              <div className="h-32 w-full rounded-lg bg-gray-400 dark:bg-neutral-800" />
              <div className="h-2 w-3/4 rounded bg-gray-400 dark:bg-neutral-800" />
              <div className="h-2 w-1/2 rounded bg-gray-400 dark:bg-neutral-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WidgetCategoriesSkeleton
