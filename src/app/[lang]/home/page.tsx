import BackgroundSection from '@/components/BackgroundSection'
import SectionMagazine10 from '@/components/SectionMagazine10'
import SectionMagazine4 from '@/components/SectionMagazine4'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionSlider from '@/components/SectionSlider'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionTrending from '@/components/SectionTrending'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import VideoHeroBanner from '@/components/VideoHeroBanner'
import { getBannerHighlightedArticles, getBannerHighlightedVideos } from '@/data/api/banner'
import { getCategory, getQuranSubcategories, getTopTrendingTopics } from '@/data/api/category'
import { getIslamForBeginners, getLatestArticles, getLatestVideos, getQuranLatestArticles } from '@/data/api/posts'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getNavigation } from '@/data/navigation'
import { getAllPosts, getPostsAudio, getPostsDefault, getPostsGallery, getPostsVideo } from '@/data/posts'
import { Metadata } from 'next'
import { ApplicationLayout } from '../application-layout'
import HomeHeader from './components/homeHeader'

export const metadata: Metadata = {
  title: 'Preface Islam',
  description: 'Preface Islam is a platform for Muslims to learn about Islam and its teachings.',
}

interface HomePageProps {
  params: Promise<{ lang: string }>
  dict: any // You might want to replace 'any' with a proper type for your dictionary
}

const HomePage = async ({ params, dict }: HomePageProps) => {
  const { lang } = await params
  const [
    posts,
    defaultPosts,
    videoPosts,
    audioPosts,
    galleryPosts,
    authors,
    categories,
    latestArticles,
    latestVideos,
    storyTellingIslam,
    topTrendingTopics,
    islamForBeginners,
    quranSubCategories,
    quranLatestArticles,
    bannerHighlightedVideos,
    bannerHighlightedArticles,
    navigationMenu,
  ] = await Promise.all([
    getAllPosts(),
    getPostsDefault(),
    getPostsVideo(),
    getPostsAudio(),
    getPostsGallery(),
    getAuthors(),
    getCategories(),
    getLatestArticles(lang || 'en'),
    getLatestVideos(lang || 'en'),
    getCategory(lang || 'en'),
    getTopTrendingTopics(lang || 'en'),
    getIslamForBeginners(lang || 'en'),
    getQuranSubcategories(lang || 'en', { limit: 6 }),
    getQuranLatestArticles(lang || 'en', { limit: 2 }),
    getBannerHighlightedVideos(lang || 'en'),
    getBannerHighlightedArticles(lang),
    getNavigation(lang),
  ])

  const featuredPosts = posts.slice(0, 2)

  // Extract the actual data arrays from the API responses
  const videoPostsArray = Array.isArray(bannerHighlightedVideos)
    ? bannerHighlightedVideos
    : bannerHighlightedVideos?.data || []
  const articlesArray = Array.isArray(bannerHighlightedArticles)
    ? bannerHighlightedArticles
    : bannerHighlightedArticles?.data || []

  // Create specific data for SectionMagazine10
  const magazine10Data = [
    videoPosts[3], // 1st Card19 - Video data
    defaultPosts[0], // 2nd Card19 - Article data
    defaultPosts[1], // 1st Card18 - Article data
    defaultPosts[2], // 2nd Card18 - Article data
    defaultPosts[3], // 3rd Card18 - Article data
    defaultPosts[4], // 4th Card18 - Article data
    defaultPosts[5], // 5th Card18 - Article data
    defaultPosts[6], // 6th Card18 - Article data
  ]

  return (
    <ApplicationLayout home={true} headerHasBorder={true} params={params}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="relative overflow-hidden pb-10 md:pb-14 lg:pb-20">
        {/* Video Hero Banner */}
        {/* <VideoHeroBanner /> */}
        {/* <div className="relative">
        <HeroWithMagazine posts={magazine10Data} />
      </div> */}
        {/* <div className=''> */}
        {/* <VideoHeroBanner /> */}
        {/* </div> */}
        {/* Parallax Scroll Section - VideoHeroBanner + SectionMagazine10 */}
        <HomeHeader lang={lang} dict={dict} navigationMenu={navigationMenu} featuredPosts={featuredPosts} />
        <VideoHeroBanner />
        <div className="container pt-10 md:pt-14 lg:pt-20">
          <SectionMagazine10 posts={articlesArray} videoPosts={videoPostsArray} lang={lang} />
        </div>
        {/* <ParallaxScrollSection magazine10Data={articlesArray} videoPosts={videoPostsArray} /> */}
        <div className="relative container space-y-8 py-10 md:space-y-12 md:py-14 lg:space-y-16 lg:py-20">
          {/* <SectionMagazine10 posts={magazine10Data} /> */}
          <SectionSliderNewCategories
            heading={dict.sections.storytelling.heading}
            subHeading={dict.sections.storytelling.description}
            // categories={categories.slice(0, 10)}
            categories={
              Array.isArray(storyTellingIslam)
                ? storyTellingIslam.slice(0, 10)
                : storyTellingIslam.data?.slice(0, 10) || []
            }
            categoryCardType="card3"
            lang={lang}
          />

          <SectionMagazine7
            posts={quranSubCategories.slice(0, 8)}
            posts2={quranLatestArticles.slice(0, 8)}
            heading={dict.sections.holyquran.heading}
            subHeading={dict.sections.holyquran.description}
            lang={lang}
          />
        </div>

        {/* <div className="relative container py-10 md:py-14 lg:py-20">
          <SectionSlider
            heading={dict.sections.trendingcategories.heading}
            subHeading={dict.sections.trendingcategories.description}
            lang={lang}
            categories={
              Array.isArray(topTrendingTopics)
                ? topTrendingTopics.slice(0, 10)
                : topTrendingTopics.data?.slice(0, 10) || []
            }
            categoryCardType="card2"
            config={{
              autoSlide: true,
              autoSlideInterval: 5000,
              showButtons: false,
              loop: true,
            }}
          />
        </div> */}
        <div className="relative py-10 md:py-14 lg:py-20">
          <BackgroundSection />
          <div className="container">
            <SwipableSliderPosts
              heading={dict.sections.islamforbeginners.heading}
              subHeading={dict.sections.islamforbeginners.description}
              posts={islamForBeginners.slice(0, 8)}
              postCardName="card10V2"
              lang={lang}
              config={{
                autoSlide: false,
                autoSlideInterval: 4000,
                showButtons: false,
                loop: false,
              }}
            />
          </div>
        </div>

        <div className="relative container py-10 md:py-14 lg:py-20">
          <SectionTrending
            posts={Array.isArray(latestArticles) ? latestArticles.slice(0, 8) : latestArticles.data?.slice(0, 8) || []}
            heading={dict.sections.latestarticles.heading}
            subHeading={dict.sections.latestarticles.description}
            lang={lang}
            dualColor={true}
          />
        </div>

        <div className="bg-[#F3F4F6] py-10 md:py-14 lg:py-20 dark:bg-[#0D0D0D]">
          <div className="relative container">
            <SectionSlider
              heading={dict.sections.trendingcategories.heading}
              subHeading={dict.sections.trendingcategories.description}
              lang={lang}
              categories={
                Array.isArray(topTrendingTopics)
                  ? topTrendingTopics.slice(0, 10)
                  : topTrendingTopics.data?.slice(0, 10) || []
              }
              categoryCardType="card2"
              config={{
                autoSlide: true,
                autoSlideInterval: 5000,
                showButtons: false,
                loop: true,
              }}
            />
          </div>
        </div>

        {/* <ClientSideVisuals dict={dict} posts={latestVideos} lang={lang} /> */}
        <div className="bg-[#000000] py-10 md:py-14 lg:py-20 dark:bg-[#0D0D0D]">
          <div className="relative container">
            <SectionMagazine4
              heading={dict.sections.visuals.heading}
              subHeading={dict.sections.visuals.description}
              // posts={displayPosts.slice(0, 6) as any}
              posts={latestVideos.slice(0, 6) as any}
              headingColor="light"
              lang={lang}
            />
          </div>
        </div>
      </div>
    </ApplicationLayout>
  )
}

export default HomePage
