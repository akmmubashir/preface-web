import ImageHeroBanner from '@/components/ImageHeroBanner'
import ImageHeroBannerSkeleton from '@/components/Skeletons/ImageHeroBannerSkelton'
import {
  // getLatestVideos,
  getLatestArticles,
} from '@/data/api/posts'
import { getNavigation } from '@/data/navigation'
import { getDictionary } from '@/i18n'
import { Metadata } from 'next'
import { Suspense } from 'react'
import HomeHeader from '../home/components/homeHeader'
// import { getSearchResults } from '@/data/search'
// import { Folder02Icon, LicenseIcon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
// import { redirect } from 'next/navigation'

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

const PageVisuals = async ({
  params,
  // searchParams,
}: {
  params: Promise<{ query: string; lang: string }>
  // searchParams: SearchParams
}) => {
  // async function handleSearch(formData: FormData) {
  //   'use server'

  //   const searchQuery = formData.get('s') as string
  //   const searchTab = formData.get('tab') as string
  //   redirect(`/search?s=${searchQuery}&tab=${searchTab}`)
  // }
  const [
    // videoPosts,
    articles,
    navigationMenu,
  ] = await Promise.all([
    // getLatestVideos(),
    getLatestArticles(),
    getNavigation((await params).lang),
  ])

  const featuredPosts = articles.data.slice(0, 2)

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

  // const { posts, categories, tags, authors, totalResults, recommendedSearches } = await getSearchResults(
  //   searchQuery || '',
  //   searchTab as 'posts' | 'categories' | 'tags' | 'authors'
  // )
  // console.log(posts, 'postssss.. ')
  const dict = await getDictionary((await params).lang)

  return (
    <div className="visuals-page" dir={(await params).lang === 'ar' ? 'rtl' : 'ltr'}>
      <HomeHeader
        lang={(await params).lang}
        navigationMenu={navigationMenu}
        featuredPosts={featuredPosts}
        dict={dict}
      />
      <Suspense fallback={<ImageHeroBannerSkeleton />}>
        <ImageHeroBanner />
      </Suspense>
    </div>
  )
}

export default PageVisuals
