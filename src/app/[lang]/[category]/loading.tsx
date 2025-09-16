import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import Card17Skelton from '@/components/Skeletons/Card17Skelton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'

export default function Loading() {
  return (
    <div className={`page-category`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <BannerSkeleton />
        <div className="mt-12 flex w-full flex-col gap-3">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800"></div>
          <div className="h-3 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800"></div>
          <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800"></div>
        </div>
        {/* Horizontal line - matching Figma design */}
        <hr className="mt-12 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" />
      </div>
      <div className="container pt-6 lg:pt-10">
        <Card17Skelton />
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <div className="relative">
          <SectionSliderPostsSkeleton />
        </div>
      </div>
    </div>
  )
}
