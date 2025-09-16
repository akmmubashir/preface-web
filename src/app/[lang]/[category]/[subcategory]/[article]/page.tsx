import PaginationWrapper2 from '@/components/PaginationWrapper2'
import WidgetCategories from '@/components/WidgetCategories'
import WidgetPosts from '@/components/WidgetPosts'
import { getPostBySlug, getSubcategoryPosts } from '@/data/api/posts'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/data/posts'
import { serverFetch } from '@/lib/server/api'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SingleContentContainer from '../../../post/SingleContentContainer'
import SingleHeaderContainer from '../../../post/SingleHeaderContainer'
import SingleRelatedPosts from '../../../post/SingleRelatedPosts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string
    subcategory: string
    article: string
    lang: string
  }>
}): Promise<Metadata> {
  // Await the params before using them
  const { article, lang } = await params

  // Validate the article parameter
  if (!article || article.includes('.') || article.includes('com.chrome.devtools.json')) {
    return {
      title: 'Invalid Article',
      description: 'The requested article URL is invalid',
    }
  }

  const post = await getPostByHandle(article)

  if (!post) {
    return {
      title: 'Article not found',
      description: 'The requested article could not be found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

const Page = async ({
  params,
}: {
  params: Promise<{
    category: string
    subcategory: string
    article: string
    lang: string
  }>
}) => {
  // Await the params before using them
  const { category, subcategory, article, lang } = await params

  // console.log(`Processing article route: category=${category}, subcategory=${subcategory}, article=${article}`)

  // Validate the article parameter - it should not contain invalid characters or be a Chrome DevTools request
  if (!article || article.includes('.') || article.includes('com.chrome.devtools.json')) {
    console.warn(`Invalid article slug: ${article} - returning 404`)
    return notFound()
  }

  const post = await getPostBySlug(article)

  // If article not found, return 404 early
  if (!post) {
    console.warn(`Post not found for slug: ${article} - returning 404`)
    return notFound()
  }

  // console.log(`Successfully fetched post: ${post.title || post.name}`)

  const subcategoryPosts = await getSubcategoryPosts(post?.categories[0]?.slug)

  // Filter posts to only include those with postType.name === "Article"
  const filteredSubcategoryPosts = subcategoryPosts?.list?.filter((post) => post.postType?.name === 'Article') || []

  // console.log(post,"post checking articlezs");

  // console.log(subcategoryPosts,"subcategoryPosts");

  const comments = await getCommentsByPostId(post.id)
  const relatedPosts = (await getAllPosts()).slice(0, 6)
  const moreFromAuthorPosts = (await getAllPosts()).slice(1, 7)

  const subcategoryList = await serverFetch.get(`/api/frontend/category/slug/${category}`)

  // console.log(subcategoryList,"subcategoryList");

  const otherTopics = subcategoryList.data.subcategories

  // console.log(otherTopics,"otherTopics");

  const widgetPosts = (await getAllPosts()).slice(0, 12)

  return (
    <div className="single-post-page pt-8">
      <SingleHeaderContainer post={post} />

      <div className="container mt-12 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
          <SingleContentContainer post={post} comments={comments} lang={lang} />
          <div className="mt-12">
            <PaginationWrapper2 post={post} />
          </div>
        </div>
        <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
          <div className="space-y-7 lg:sticky lg:top-7">
            {/* <WidgetAuthors authors={widgetAuthors} />
            <WidgetTags tags={widgetTags} /> */}
            <WidgetCategories categories={filteredSubcategoryPosts} />
            <WidgetPosts posts={otherTopics} />
          </div>
        </div>
      </div>

      <SingleRelatedPosts moreFromAuthorPosts={moreFromAuthorPosts} />
    </div>
  )
}

export default Page
