'use client'

import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  ratio?: string
}

const Card16PodcastSkeleton: FC<Props> = ({ className, ratio = 'aspect-4/3' }) => {
  return (
    <div className={clsx('group post-card-16-podcast relative flex flex-col pb-6', className)}>
      {/* Thumbnail */}
      <div className={`relative w-full shrink-0 ${ratio}`}>
        <div className="absolute inset-0 animate-pulse rounded-3xl bg-neutral-200 dark:bg-neutral-700" />
      </div>

      {/* Badge placeholder */}
      <div className="absolute inset-x-3 top-3 h-5 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

      {/* Content */}
      <div className="relative -mt-32 w-11/12">
        <div className="mt-20 flex grow flex-col rounded-3xl rounded-ss-none bg-white p-5 dark:bg-[#0D0D0D]">
          {/* Title */}
          <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

          {/* Footer actions */}
          <div className="relative mt-auto flex flex-wrap gap-x-2 gap-y-1">
            <div className="h-7 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-7 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="ms-auto h-7 w-7 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card16PodcastSkeleton
