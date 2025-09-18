import React from 'react'
import Card16PodcastSkeleton from './Card16PodcastSkeleton'

type Props = {
  beta?: boolean
}
export const SectionSliderPostsSkeleton = ({ beta }: Props) => {
  const skeletonItems = Array.from({ length: 4 })

  return (
    <div className="section-slider-posts relative">
      {/* Heading skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-6 w-50 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>

      {/* Slider skeleton */}
      <div className="embla">
        <div className="grid grid-cols-12 gap-4">
          {skeletonItems.map((_, idx) => (
            <React.Fragment key={idx}>
              {beta ? (
                <Card16PodcastSkeleton beta />
              ) : (
                <div className="col-span-3 max-md:col-span-full">
                  <div className="w-full overflow-hidden rounded-lg shadow">
                    {/* Thumbnail */}
                    <div className="relative h-40 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700">
                      <div className="absolute top-[10px] left-[10px] flex items-center gap-2">
                        <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
                        <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="space-y-3 py-4">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                      <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
