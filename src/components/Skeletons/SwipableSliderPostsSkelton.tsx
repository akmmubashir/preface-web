const SwipableSliderPostsSkeleton = () => {
  return (
    <div className="swipable-slider-posts relative">
      {/* Heading skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-700" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-700" />
        </div>
        {/* <div className="flex space-x-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600" />
        </div> */}
      </div>

      {/* Cards skeleton grid */}
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="col-span-6 max-md:col-span-full">
          <div className="h-[340px] animate-pulse rounded-lg bg-gray-700" />
          <div className="mt-4 h-3 w-24 animate-pulse rounded bg-gray-500" />
        </div>
        <div className="col-span-6 max-md:col-span-full max-md:hidden">
          <div className="h-[340px] animate-pulse rounded-lg bg-gray-700" />
          <div className="mt-4 h-3 w-24 animate-pulse rounded bg-gray-500" />
        </div>
      </div>

      {/* Pagination dots skeleton */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`${i === 0 ? 'w-5 bg-gray-700' : 'w-2 bg-gray-600'} h-2 animate-pulse rounded-full`}
          />
        ))}
      </div>
    </div>
  )
}

export default SwipableSliderPostsSkeleton
