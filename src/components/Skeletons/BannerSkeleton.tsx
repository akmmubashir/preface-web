import React from 'react'

const BannerSkeleton: React.FC<{ className?: string }> = ({}) => {
  return (
    <div
      className={`relative aspect-16/9 animate-pulse rounded-xl bg-neutral-200 max-md:rounded-none lg:aspect-16/5 dark:bg-neutral-700`}
    >
      <div className="absolute inset-0 top-0 left-0 flex flex-col justify-center gap-4 px-10 max-md:gap-2">
        <div className="h-6 w-1/4 animate-pulse rounded bg-neutral-400 max-md:h-4 max-md:w-3/4 dark:bg-neutral-800"></div>
        <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-400 max-md:h-3 max-md:w-1/2 dark:bg-neutral-800"></div>
      </div>
    </div>
  )
}

export default BannerSkeleton
