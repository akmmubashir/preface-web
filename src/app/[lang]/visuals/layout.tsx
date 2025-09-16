import { ApplicationLayout } from '@/app/[lang]/application-layout'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridPosts from '@/components/SectionGridPosts'
import SectionGridPostsSkeleton from '@/components/Skeletons/SectionGridPostsSkelton'
import SwipableSliderPostsSkeleton from '@/components/Skeletons/SwipableSliderPostsSkelton'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import { getLatestVideos } from '@/data/api/posts'
import { ReactNode, Suspense } from 'react'
// import { getAuthors } from '@/data/authors'
// import { getCategories } from '@/data/categories'
// import { getPostsDefault, getPostsVideo } from '@/data/posts'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  // Access the lang parameter
  const { lang } = await params
  const videoPosts = await getLatestVideos(lang || 'en')
  return (
    <ApplicationLayout home={true} params={params}>
      {children}
      <div className="container space-y-10 py-10 md:space-y-14 md:py-14 lg:space-y-20 lg:py-20">
        <div className="relative py-10 md:py-14 lg:py-20">
          <BackgroundSection />
          <Suspense fallback={<SwipableSliderPostsSkeleton />}>
            <SwipableSliderPosts
              heading="TOP RATED ON PREFACE"
              subHeading="Over 100 Articles for beginners"
              // posts={defaultPosts.slice(0, 8)}
              posts={videoPosts.slice(0, 8)}
              postCardName="card10V6"
              lang={lang}
              config={{
                autoSlide: false,
                autoSlideInterval: 4000,
                showButtons: false,
                loop: false,
                grid: {
                  sm: 1,
                  lg: 2,
                  default: 1, // It's good practice to include a default value
                },
              }}
            />
          </Suspense>
        </div>
        <div className="relative">
          <Suspense fallback={<SectionGridPostsSkeleton />}>
            <SectionGridPosts
              postCardName="card10V6"
              heading="STORYTELLING ISLAM"
              subHeading="Understanding Islam through 1001 stories"
              posts={videoPosts.slice(0, 8)}
              gridClass="md:grid-cols-2 lg:grid-cols-3"
              timeDuration={true}
              lang={lang}
            />
          </Suspense>
        </div>
      </div>
    </ApplicationLayout>
  )
}

export default Layout
