import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import StoriesSkeleton from '@/components/Skeletons/StoriesSkeleton'

export default function Loading({ lang }: { lang: string }) {
  return (
    <div className="stories-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto mt-10 md:mt-14 lg:mt-20">
        <BannerSkeleton className="animate-duration-[2000ms] animate-pulse" />
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <StoriesSkeleton />
        <div className="mx-auto mt-8 text-center md:mt-10 lg:mt-12">
          <div className="mb-16 flex justify-center">
            <div className="h-12 w-40 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
