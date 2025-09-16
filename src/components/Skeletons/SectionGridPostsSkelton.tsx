const SectionGridPostsSkeleton = () => {
  return (
    <div className="section-grid-posts relative">
      {/* Heading skeleton */}
      <div className="mb-10 flex flex-col items-start space-y-2">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-700 md:h-8 md:w-64" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-7 md:gap-y-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="col-span-4 flex animate-pulse flex-col overflow-hidden max-md:col-span-full">
            {/* Thumbnail */}
            <div className="h-48 w-full rounded-lg bg-gray-700 md:h-48" />

            {/* Title */}
            <div className="space-y-3 pt-4">
              <div className="h-4 w-3/4 rounded bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500" />
                <div className="h-3 w-1/3 rounded bg-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGridPostsSkeleton
