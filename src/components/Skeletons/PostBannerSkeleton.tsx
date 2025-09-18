import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
}

const PostBannerSkeleton: FC<Props> = ({ className }) => {
  return (
    <>
      <div className="container">{/* <Divider /> */}</div>
      <header className={clsx('single-header-style-1 relative w-full', className)}>
        {/* Banner image skeleton */}
        <div className="relative aspect-square w-full sm:aspect-[15/5]">
          <div className="absolute inset-0 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

          {/* Gradient overlay */}
          <div
            className="absolute right-0 bottom-0 left-0 h-1/2"
            style={{
              background: 'linear-gradient(0deg, #000000D9 0%, #61616100 100%)',
            }}
          />

          {/* Text placeholders */}
          <div className="absolute right-0 bottom-0 left-0 container">
            <div className="mx-auto pb-8">
              <div className="space-y-4 text-white">
                {/* Title skeleton */}
                <div className="h-10 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-1 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

                {/* Divider */}
                {/* <Divider className="my-6 border-white/20" /> */}

                {/* Meta actions skeleton */}
                <div className="flex gap-3">
                  <div className="h-6 w-12 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default PostBannerSkeleton
