import Skeleton from '@/components/Skeleton'
import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import Card17Skelton from '@/components/Skeletons/Card17Skelton'

export default function Loading() {
  return (
    <div className={`page-category`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <BannerSkeleton />
        <div className="mt-12 w-full">
          <Skeleton className="mb-2 h-4 w-full max-w-full rounded" />
          <Skeleton className="mb-2 h-4 w-full max-w-full rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>
        {/* Horizontal line - matching Figma design */}
        <hr className="mt-12 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" />
      </div>
      <div className="container pt-6 lg:pt-10">
        <Card17Skelton />
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <div className="relative">
          {/* <ClientSectionSliderPosts
            postCardName="card10V5"
            // heading={`POPULAR ARTICLES FROM ${categoryName}`}
            heading={`${dict.sections.populararticlesfrom.heading} ${categoryName}`}
            // subHeading="Over 10 Articles"
            parentSlug={category}
            limit={6}
            lang={lang}
          /> */}
        </div>
      </div>
    </div>
  )
}
