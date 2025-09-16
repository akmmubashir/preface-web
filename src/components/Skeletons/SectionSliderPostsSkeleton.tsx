import React from "react";

export const SectionSliderPostsSkeleton = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <div className="section-slider-posts relative">
      {/* Heading skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-6 w-50 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Slider skeleton */}
      <div className="embla">
        <div className="grid grid-cols-12 gap-4">
          {skeletonItems.map((_, idx) => (
            <div
              key={idx}
              className="col-span-3 max-md:col-span-full"
            >
              <div className="w-full rounded-lg overflow-hidden shadow">
                {/* Thumbnail */}
                <div className="relative h-40 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-xl">
                  <div className="absolute left-[10px] top-[10px] flex items-center gap-2">
                    <div className="h-6 w-6 bg-neutral-400 dark:bg-neutral-800 rounded-full animate-pulse"></div>
                    <div className="h-6 w-6 bg-neutral-400 dark:bg-neutral-800 rounded-full animate-pulse"></div>
                  </div>
                </div>
                {/* Content */}
                <div className="py-4 space-y-3">
                  <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
