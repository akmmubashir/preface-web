import Banner from '@/components/Banner'
import ClientSectionSliderPosts from '@/components/ClientSectionSliderPosts'
import Card17 from '@/components/PostCards/Card17'
import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import Card17Skelton from '@/components/Skeletons/Card17Skelton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'
import {
  //  getPostsDefault,
  getPostsGallery,
} from '@/data/posts'
import { getDictionary } from '@/i18n'
import { serverFetch } from '@/lib/server/api'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Remove generateStaticParams to enable dynamic routing

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; lang: string }>
}): Promise<Metadata> {
  const { category, lang } = await params

  try {
    const categoryData = await serverFetch.get(`/api/frontend/category/slug/${category}`, { language: lang })

    if (!categoryData) {
      return {
        title: 'Category not found',
        description: 'Category not found',
      }
    }

    return {
      title: categoryData?.name || categoryData?.title,
      description: categoryData?.description || categoryData?.meta_description,
    }
  } catch (error) {
    console.error('Error fetching category metadata:', error)
    return {
      title: 'Category',
      description: 'Category page',
    }
  }
}

const Page = async ({ params }: { params: Promise<{ category: string; lang: string }> }) => {
  const { category } = await params
  const { lang } = await params
  const dict = await getDictionary(lang)

  let categoryData: any = null
  let posts: any[] = []

  try {
    // Fetch category data from API
    categoryData = await serverFetch.get(`/api/frontend/category/slug/${category}`, { language: lang })
    // console.log(categoryData?.data,"categoryData");

    if (!categoryData) {
      return notFound()
    }

    // If the API returns posts within the category data, use them
    if (categoryData.posts && Array.isArray(categoryData.posts)) {
      posts = categoryData.posts
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return notFound()
  }

  const galleryPosts = await getPostsGallery()
  // const defaultPosts = await getPostsDefault()

  const categoryName = categoryData.data.name || ''

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`page-category-${category}`}>
      {/* <PageHeader category={categoryData} /> */}
      <div className="container mx-auto mt-12 sm:mt-20">
        <Suspense fallback={<BannerSkeleton />}>
          <Banner
            image={categoryData?.data?.featuredImage}
            title={categoryName}
            alt={`${categoryData?.data?.name || categoryData.data.title} banner`}
            description={categoryData?.data?.subcategories?.length || ''}
            // className=""
            dict={dict}
          />
        </Suspense>
        <Suspense
          fallback={
            <div className="mt-12 flex w-full flex-col gap-3">
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
          }
        >
          <div className="mt-12 w-full lg:max-w-4xl">
            <p className="mt-6 text-sm text-[#444444] lg:text-base dark:text-[#DFDFDF]">
              {categoryData.data.description || categoryData.data.meta_description || ''}
            </p>
          </div>
        </Suspense>
        {/* Horizontal line - matching Figma design */}
        <hr className="mt-12 w-full border-t border-[#E3E3E3] dark:border-[#2C2C2C]" />
      </div>
      <div className="container pt-6 lg:pt-10">
        {/* LOOP ITEMS - Use posts from API if available, otherwise fallback to gallery posts */}
        <Suspense fallback={<Card17Skelton />}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {(categoryData.data.subcategories.length > 0
              ? categoryData.data.subcategories
              : galleryPosts.slice(0, 8)
            ).map((post: any, index: number) => (
              <Card17 key={post._id || index} post={post} lang={lang} />
            ))}
          </div>
        </Suspense>
      </div>

      <div className="container py-10 md:py-14 lg:py-20">
        <div className="relative">
          <Suspense fallback={<SectionSliderPostsSkeleton />}>
            <ClientSectionSliderPosts
              postCardName="card10V5"
              // heading={`POPULAR ARTICLES FROM ${categoryName}`}
              heading={`${dict.sections.populararticlesfrom.heading} ${categoryName}`}
              // subHeading="Over 10 Articles"
              parentSlug={category}
              limit={6}
              lang={lang}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page
