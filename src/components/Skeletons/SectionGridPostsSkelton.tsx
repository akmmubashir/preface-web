const SectionGridPostsSkeleton = () => {
  return (
    <div className="section-grid-posts relative">
      {/* Heading skeleton */}
      <div className="mb-10 flex flex-col items-start space-y-2">
        <div className="h-6 w-48 animate-pulse rounded bg-neutral-400 md:h-8 md:w-64 dark:bg-neutral-800" />
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-7 md:gap-y-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="col-span-4 flex animate-pulse flex-col overflow-hidden max-md:col-span-full">
            {/* Thumbnail */}
            <div className="h-48 w-full rounded-lg bg-neutral-200 md:h-48 dark:bg-neutral-700" />

            {/* Title */}
            <div className="space-y-3 pt-4">
              <div className="h-4 w-3/4 rounded bg-neutral-400 dark:bg-neutral-800" />
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-neutral-500 dark:bg-neutral-900" />
                <div className="h-3 w-1/3 rounded bg-neutral-400 dark:bg-neutral-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGridPostsSkeleton
