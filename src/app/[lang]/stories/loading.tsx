import BannerSkeleton from "@/components/Skeletons/BannerSkeleton";
import StoriesSkeleton from "@/components/Skeletons/StoriesSkeleton";

export default function Loading() {
  return (
    <div className="container">
      {/* Banner Skeleton */}
      <div className="mb-12">
        <BannerSkeleton className="h-[300px] md:h-[400px] animate-pulse animate-duration-[2000ms]" />
      </div>

      {/* Tabs Skeleton */}
      {/* <div className="mb-8 flex flex-wrap gap-2 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-24 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div> */}

      {/* Stories Grid Skeleton */}
      <div className="mb-12">
        <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <StoriesSkeleton />
      </div>

      {/* Load More Button Skeleton */}
      <div className="mb-16 flex justify-center">
        <div className="h-12 w-40 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
