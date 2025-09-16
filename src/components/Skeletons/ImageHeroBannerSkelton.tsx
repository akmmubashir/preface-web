const ImageHeroBannerSkeleton = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background skeleton */}
      <div className="absolute inset-0 animate-pulse">
        <div className="h-full w-full bg-neutral-200 dark:bg-neutral-700" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-neutral-200/30 to-neutral-200/90 dark:from-transparent dark:via-neutral-700/30 dark:to-neutral-700/90" />

      {/* Main content skeleton */}
      <div className="absolute inset-0 z-20 container flex items-end pb-24">
        {/* Left side */}
        <div className="flex flex-1 flex-col pr-2 md:pr-8">
          <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-neutral-400 md:h-10 md:w-2/3 dark:bg-neutral-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-400 md:h-5 md:w-1/3 dark:bg-neutral-800" />

          <div className="mt-6 h-10 w-32 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
        </div>

        {/* Right side (dots skeleton) */}
        <div className="hidden flex-1 justify-end md:flex">
          <div className="mt-6 flex space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`${i === 0 ? 'w-4 bg-neutral-500 dark:bg-neutral-900' : 'h-2 w-2 bg-neutral-400 dark:bg-neutral-800'} animate-pulse rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageHeroBannerSkeleton
