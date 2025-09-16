const Card17Skelton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 rounded-xl bg-gray-200 p-4 dark:bg-neutral-700"
        >
          <div className="aspect-square h-14 animate-pulse rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
          <div className="flex w-full flex-col gap-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800"></div>
            <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800"></div>
          </div>
          <div className="aspect-square h-6 animate-pulse rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
        </div>
      ))}
    </div>
  )
}

export default Card17Skelton
