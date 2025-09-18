import PostBannerSkeleton from '@/components/Skeletons/PostBannerSkeleton'
import PostContentSkelton from '@/components/Skeletons/PostContentSkelton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'
import WidgetCategoriesSkeleton from '@/components/Skeletons/WidgetCategoriesSkeleton'
import WidgetPostsSkeleton from '@/components/Skeletons/WidgetPostsSkeleton'
export default function Loading() {
  return (
    <div className="single-post-page pt-8">
      <PostBannerSkeleton />
      <div className="container mt-12 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
          <PostContentSkelton />
          <div className="my-12">
            <div className="flex gap-4">
              <div className="flex animate-pulse items-center gap-2 rounded-full bg-neutral-200 p-2 dark:bg-neutral-700">
                <div className="h-3 w-3 rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
                <div className="h-2 w-12 rounded bg-neutral-400 dark:bg-neutral-800"></div>
              </div>
              <div className="flex animate-pulse items-center gap-2 rounded-full bg-neutral-400 p-2 dark:bg-neutral-800">
                <div className="h-2 w-12 rounded bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
          <div className="mb-20 space-y-7 lg:sticky lg:top-7">
            <WidgetCategoriesSkeleton />
            <WidgetPostsSkeleton />
          </div>
        </div>
      </div>

      <div className="relative mt-16 bg-neutral-50 py-16 lg:mt-28 lg:py-24 dark:bg-neutral-800">
        {/* RELATED  */}
        <div className="container space-y-16 lg:space-y-28">
          <SectionSliderPostsSkeleton beta />
        </div>
      </div>
    </div>
  )
}
