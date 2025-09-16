import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import ArchiveTabs from '@/components/ArchiveTabs'
import CardAuthorBox2 from '@/components/CardAuthorBoxs/CardAuthorBox2'
import CardCategory2 from '@/components/CategoryCards/CardCategory2'
import PaginationWrapper from '@/components/PaginationWrapper'
import Card11 from '@/components/PostCards/Card11'
import { getSearchResults } from '@/data/search'
import Input from '@/shared/Input'
import Tag from '@/shared/Tag'
import { Folder02Icon, LicenseIcon, Search01Icon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
    value: 'posts',
    icon: LicenseIcon,
  },
  { name: 'Categories', value: 'categories', icon: Folder02Icon },
  { name: 'Tags', value: 'tags', icon: Tag02Icon },
  { name: 'Authors', value: 'authors', icon: UserListIcon },
]

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { query } = await searchParams

  return {
    title: `Search results for ${query}`,
    description: `Search results for ${query}`,
  }
}

const PageSearch = async ({
  params,
  searchParams,
}: {
  params: Promise<{ query: string }>
  searchParams: SearchParams
}) => {
  async function handleSearch(formData: FormData) {
    'use server'

    const searchQuery = formData.get('s') as string
    const searchTab = formData.get('tab') as string
    redirect(`/search-2?s=${searchQuery}&tab=${searchTab}`)
  }

  let searchQuery = (await searchParams)['s']
  let searchTab = (await searchParams)['tab']

  // example: /search?s=text1&s=text2 => searchQuery = 'text1'
  if (Array.isArray(searchQuery)) {
    searchQuery = searchQuery[0]
  }
  if (!searchQuery) {
    searchQuery = ''
  }

  if (searchTab && Array.isArray(searchTab)) {
    searchTab = searchTab[0]
  }
  if (!filterTabs.some((tab) => tab.value === searchTab)) {
    searchTab = filterTabs[0].value // default tab is posts
  }

  const { posts, categories, tags, authors, totalResults, recommendedSearches } = await getSearchResults(
    searchQuery || '',
    searchTab as 'posts' | 'categories' | 'tags' | 'authors'
  )

  const renderLoopItems = () => {
    switch (searchTab) {
      case 'categories':
        return (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-8 lg:mt-10 lg:grid-cols-4 xl:grid-cols-5">
            {categories?.map((category) => (
              <CardCategory2 key={category.id} category={category} />
            ))}
          </div>
        )

      case 'tags':
        return (
          <div className="mt-12 flex flex-wrap gap-3">
            {tags?.map((tag) => (
              <Tag key={tag.id} href={`/tag/${tag.handle}`}>
                {tag.name}
              </Tag>
            ))}
          </div>
        )
      case 'authors':
        return (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-8 lg:mt-10 lg:grid-cols-4 xl:grid-cols-5">
            {authors?.map((author) => (
              <CardAuthorBox2 className="border border-dashed" key={author.id} author={author} />
            ))}
          </div>
        )
      default:
        return (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
            {posts?.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>
        )
    }
  }

  return (
    <div className="search-page">
      {/* HEADER */}
      <div className="start-0 top-0 right-0 h-24 w-full bg-primary-100/50 2xl:h-28 dark:bg-white/10" />
      <div className="container">
        <header className="mx-auto -mt-8 flex max-w-2xl flex-col">
          <form className="relative" action={handleSearch}>
            <label htmlFor="s">
              <span className="sr-only">Search</span>
              <Input
                id="s"
                name="s"
                type="search"
                placeholder="Type and press enter"
                className="rounded-full shadow-lg"
                sizeClass="ps-14 py-5 pe-5 md:ps-16"
                defaultValue={searchQuery}
              />
              <span className="absolute start-5 top-1/2 -translate-y-1/2 transform text-2xl md:start-6">
                <HugeiconsIcon icon={Search01Icon} size={24} />
              </span>
            </label>
          </form>
          <p className="mt-4 block text-sm">
            We found {totalResults} results articles for <strong>&quot;{searchQuery}&quot;</strong>
          </p>
        </header>
      </div>

      <div className="container py-16 lg:pt-20">
        <div className="flex flex-wrap items-center gap-4">
          <ArchiveTabs tabs={filterTabs} />
          <ArchiveSortByListBox className="ms-auto shrink-0" filterOptions={sortByOptions} />
        </div>

        {/* LOOP ITEMS */}
        {renderLoopItems()}

        {/* PAGINATION */}
        <PaginationWrapper className="mt-20" totalPages={10} />
      </div>
    </div>
  )
}

export default PageSearch
