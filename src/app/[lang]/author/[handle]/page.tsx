import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import ArchiveTabs from '@/components/ArchiveTabs'
import PaginationWrapper from '@/components/PaginationWrapper'
import Card11 from '@/components/PostCards/Card11'
import { getAuthorByHandle } from '@/data/authors'
import { getAllPosts } from '@/data/posts'
import { AllBookmarkIcon, FolderFavouriteIcon, LicenseIcon } from '@hugeicons/core-free-icons'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '../page-header'

const sortByOptions = [
  { name: 'Most recent', value: 'most-recent' },
  { name: 'Curated by admin', value: 'curated-by-admin' },
  { name: 'Most appreciated', value: 'most-appreciated' },
  { name: 'Most discussed', value: 'most-discussed' },
  { name: 'Most viewed', value: 'most-viewed' },
  { name: 'Most liked', value: 'most-liked' },
]
const filterTabs = [
  {
    name: 'Articles',
    value: 'articles',
    icon: LicenseIcon,
  },
  { name: 'Favorites', value: 'favorites', icon: FolderFavouriteIcon },
  { name: 'Saved', value: 'saved', icon: AllBookmarkIcon },
]

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const author = await getAuthorByHandle(handle)
  if (!author?.id) {
    return {
      title: 'Author not found',
      description: 'Author not found',
    }
  }
  return {
    title: author?.name,
    description: author?.description,
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params

  const author = await getAuthorByHandle(handle)
  const posts = (await getAllPosts()).slice(0, 12)

  if (!author?.id) {
    return notFound()
  }

  return (
    <div className={`page-author`}>
      <PageHeader author={author} />

      <div className="container pt-16 lg:pt-20">
        {/* TABS FILTER */}
        <div className="flex flex-wrap items-center gap-4">
          <ArchiveTabs tabs={filterTabs} />
          <ArchiveSortByListBox className="ms-auto shrink-0" filterOptions={sortByOptions} />
        </div>

        {/* LOOP ITEMS */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Card11 key={post.id} post={post} />
          ))}
        </div>

        {/* PAGINATION */}
        <PaginationWrapper className="mt-20" totalPages={10} />
      </div>
    </div>
  )
}

export default Page
