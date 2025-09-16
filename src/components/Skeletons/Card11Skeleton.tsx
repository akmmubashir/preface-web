import clsx from 'clsx'
import React from 'react'
import Skeleton from '../Skeleton'

const Card11Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        'group post-card-11 relative flex flex-col justify-between rounded-2xl bg-white dark:bg-white/5',
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative aspect-5/3 w-full overflow-hidden rounded-t-3xl">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content area */}
      <div className="flex grow items-center gap-3 rounded-b-3xl border p-4">
        {/* Left content */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>

        {/* Right arrow */}
        <div className="flex-shrink-0">
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default Card11Skeleton
