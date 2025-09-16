import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import ModalCategories from '@/components/ModalCategories'
import ModalTags from '@/components/ModalTags'
import PaginationWrapper from '@/components/PaginationWrapper'
import Card15Podcast from '@/components/PostCards/Card15Podcast'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import { getCategories, getCategoryByHandle, getTags } from '@/data/categories'
import { getPostsAudio } from '@/data/posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '../../page-header'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)

  if (!category) {
    return {
      title: 'Category not found',
      description: 'Category not found',
    }
  }

  return {
    title: category?.name,
    description: category?.description,
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)
  // const posts = category.posts || []
  const posts = await getPostsAudio()
  const categories = await getCategories()
  const tags = await getTags()

  if (!category) {
    return notFound()
  }

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-category-${handle}`}>
      <PageHeader category={category} type="audio" />

      <div className="container pt-10 lg:pt-20">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ModalCategories categories={categories} />
          <ModalTags tags={tags} />
          <div className="ms-auto">
            <ArchiveSortByListBox filterOptions={filterOptions} />
          </div>
        </div>

        {/* LOOP ITEMS */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Card16Podcast key={post.id} post={post} />
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {posts.slice(3).map((post) => (
                <Card15Podcast key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        {/* PAGINATIONS */}
        <PaginationWrapper className="mt-20" />
      </div>
    </div>
  )
}

export default Page
