import clsx from 'clsx'
import React from 'react'

const Card11Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx('group post-card-11 relative flex flex-col justify-between rounded-2xl', className)}>
      {/* Image placeholder */}
      <div className="relative aspect-5/3 w-full overflow-hidden rounded-t-3xl">
        <div className="h-full w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
      </div>

      {/* Content area */}
      <div className="flex grow items-center gap-3 rounded-b-3xl border p-4">
        {/* Left content */}
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
        </div>

        {/* Right arrow */}
        <div className="flex-shrink-0">
          <div className="h-7 w-7 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </div>
  )
}

export default Card11Skeleton
