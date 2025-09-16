import Banner from '@/components/Banner'
import Card11 from '@/components/PostCards/Card11'
import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import StoriesSkeleton from '@/components/Skeletons/StoriesSkeleton'
import { getCategory } from '@/data/api/category'
import { getDictionary } from '@/i18n'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
// import { Folder02Icon, LicenseIcon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'
import { Suspense } from 'react'

// const sortByOptions = [
//   { name: 'Most recent', value: 'most-recent' },
//   { name: 'Curated by admin', value: 'curated-by-admin' },
//   { name: 'Most appreciated', value: 'most-appreciated' },
//   { name: 'Most discussed', value: 'most-discussed' },
//   { name: 'Most viewed', value: 'most-viewed' },
//   { name: 'Most liked', value: 'most-liked' },
// ]
// const filterTabs = [
//   {
//     name: 'Articles',
//     value: 'posts',
//     icon: LicenseIcon,
//   },
//   { name: 'Categories', value: 'categories', icon: Folder02Icon },
//   { name: 'Tags', value: 'tags', icon: Tag02Icon },
//   { name: 'Authors', value: 'authors', icon: UserListIcon },
// ]

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { query } = await searchParams

  return {
    title: `Search results for ${query}`,
    description: `Search results for ${query}`,
  }
}

const PageStories = async ({ params }: { params: Promise<{ query: string; lang: string }> }) => {
  const resolvedParams = await params
  const lang = resolvedParams.lang
  const category = await getCategory(lang || 'en')
  // let searchQuery = (await searchParams)['s']
  // let searchTab = (await searchParams)['tab']
  // example: /search?s=text1&s=text2 => searchQuery = 'text1'
  // if (Array.isArray(searchQuery)) {
  //   searchQuery = searchQuery[0]
  // }
  // if (!searchQuery) {
  //   searchQuery = ''
  // }

  // if (searchTab && Array.isArray(searchTab)) {
  //   searchTab = searchTab[0]
  // }
  // if (!filterTabs.some((tab) => tab.value === searchTab)) {
  //   searchTab = filterTabs[0].value // default tab is posts
  // }

  const renderLoopItems = (category: any, lang: string) => {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {category?.data?.map((post: any) => (
          <Card11 key={post._id} post={post} lang={lang} />
        ))}
      </div>
    )
  }
  const dict = await getDictionary(lang)

  return (
    <div className="stories-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto mt-10 md:mt-14 lg:mt-20">
        <Suspense fallback={<BannerSkeleton className="animate-duration-[2000ms] animate-pulse" />}>
          <Banner
            image="/images/banner/common-banner.png"
            title={dict.navigation.stories}
            description={category?.data?.length}
            alt="Stories banner"
            dict={dict}
          />
        </Suspense>
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <Suspense fallback={<StoriesSkeleton />}>{renderLoopItems(category, lang)}</Suspense>
        <div className="mx-auto mt-8 text-center md:mt-10 lg:mt-12">
          <ButtonSecondary>
            Load More <ArrowDownIcon className="h-6 w-6 text-[#444444] dark:text-white" />
          </ButtonSecondary>
        </div>
      </div>
    </div>
  )
}

export default PageStories
