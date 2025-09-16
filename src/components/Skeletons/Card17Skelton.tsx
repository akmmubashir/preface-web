import Skeleton from '../Skeleton'

const Card17Skelton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 justify-between bg-gray-200 dark:bg-neutral-700 p-4 rounded-xl">
          <div className="aspect-square h-14 rounded-full bg-neutral-400 dark:bg-neutral-800 animate-pulse"></div>
          <div className="w-full flex flex-col gap-2">
          <div className="h-4 w-3/4 bg-neutral-400 dark:bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-3 w-1/2 bg-neutral-400 dark:bg-neutral-800 rounded animate-pulse"></div>
          </div>
          <div className="aspect-square h-6 rounded-full bg-neutral-400 dark:bg-neutral-800 animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}

export default Card17Skelton
