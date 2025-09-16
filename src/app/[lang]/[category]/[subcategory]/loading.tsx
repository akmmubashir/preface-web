import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import PostListsSkelton from '@/components/Skeletons/PostListsSkelton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'

export default function Loading() {
  return (
    <div className={`page-category`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <BannerSkeleton />
      </div>

      <div className="container pt-10 lg:pt-20">
        <div className="flex w-16 gap-x-2 gap-y-4 rounded-full bg-neutral-200 p-3 dark:bg-neutral-700">
          <div className="h-2 w-12 rounded bg-neutral-400 dark:bg-neutral-800"></div>
          <div className="aspect-square h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
        </div>
        <PostListsSkelton />
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <div className="relative">
          <SectionSliderPostsSkeleton />
        </div>
      </div>
    </div>
  )
}
