import Banner from '@/components/Banner'
import ClientSectionSliderPosts from '@/components/ClientSectionSliderPosts'
import ModalCategories from '@/components/ModalCategories'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import BannerSkeleton from '@/components/Skeletons/BannerSkeleton'
import Card16PodcastSkeleton from '@/components/Skeletons/Card16PodcastSkeleton'
import PostListsSkelton from '@/components/Skeletons/PostListsSkelton'
import { SectionSliderPostsSkeleton } from '@/components/Skeletons/SectionSliderPostsSkeleton'
import { getCategoryBySlug, getSubcategoryPosts } from '@/data/api/posts'
import { getAllPosts } from '@/data/posts'
import { getDictionary } from '@/i18n'
import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>
}): Promise<Metadata> {
  // Await the params before using them
  const { subcategory } = await params

  // Format subcategory name for display
  const subcategoryName = subcategory
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: subcategoryName,
    description: `Articles about ${subcategoryName}`,
  }
}

const Page = async ({ params }: { params: Promise<{ category: string; subcategory: string; lang: string }> }) => {
  // Await the params before using them
  const { category, subcategory } = await params
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Call getSubcategoryPosts and log the results
  const subcategoryPosts = await getSubcategoryPosts(subcategory, lang)
  // console.log('getSubcategoryPosts result:', subcategoryPosts)

  // Get all posts and filter by subcategory
  const allPosts = await getAllPosts()

  // Debug: Log all unique categories and tags
  const allCategories = new Set<string>()

  allPosts.forEach((post) => {
    post.categories?.forEach((cat: any) => allCategories.add(cat.handle.toLowerCase()))
  })

  // Format subcategory name for display
  const subcategoryName = subcategoryPosts?.categories?.[0]?.name
  const subcategoryImage = subcategoryPosts?.categories[0]?.featuredImage
  const lengthTopics = subcategoryPosts?.list?.length
  const listPost = subcategoryPosts?.list

  // const categories = await getCategories()
  const categories2 = await getCategoryBySlug(category, lang)

  console.log(categories2.subcategories, 'categories2')

  return (
    <div className={`page-subcategory-${subcategory}`}>
      <div className="container mx-auto mt-12 sm:mt-20">
        <Suspense fallback={<BannerSkeleton />}>
          <Banner
            image={subcategoryImage}
            title={subcategoryName}
            alt={`${subcategoryName} banner`}
            // description={`${lengthTopics}`}
            description={`${listPost.filter((p) => p.postType?.name === 'Article').length}`}
            // className=""
            dict={dict}
          />
        </Suspense>
      </div>

      <div className="container pt-10 lg:pt-20">
        <Suspense
          fallback={
            <div className="flex w-16 gap-x-2 gap-y-4 rounded-full bg-neutral-200 p-3 dark:bg-neutral-700">
              <div className="h-2 w-12 rounded bg-neutral-400 dark:bg-neutral-800"></div>
              <div className="aspect-square h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-800"></div>
            </div>
          }
        >
          <div className="flex flex-wrap gap-x-2 gap-y-4">
            <ModalCategories categories={categories2.subcategories} />
          </div>
        </Suspense>
        <Suspense fallback={<PostListsSkelton />}>
          <div className="pt-6 lg:pt-10">
            {listPost.filter((p) => p.postType?.name === 'Article').length > 0 ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                  {listPost
                    .filter((p) => p.postType?.name === 'Article')
                    .map((p) => (
                      <Suspense key={`suspense-${p._id}`} fallback={<Card16PodcastSkeleton />}>
                        <Card16Podcast key={p._id} post={p} lang={lang} />
                      </Suspense>
                    ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No articles found in this category.</p>
              </div>
            )}
          </div>
        </Suspense>
      </div>

      <div className="container space-y-20 py-20 lg:space-y-28 lg:py-28">
        <div className="relative">
          {/* <BackgroundSection /> */}
          <Suspense fallback={<SectionSliderPostsSkeleton />}>
            <ClientSectionSliderPosts
              postCardName="card10V5"
              heading={`${dict.sections.populararticlesfrom.heading} ${subcategoryName}`}
              // subHeading="Over 10 Articles"
              subcategorySlug={subcategory}
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
