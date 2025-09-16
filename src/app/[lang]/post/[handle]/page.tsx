import WidgetAuthors from '@/components/WidgetAuthors'
import WidgetCategories from '@/components/WidgetCategories'
import WidgetPosts from '@/components/WidgetPosts'
import WidgetTags from '@/components/WidgetTags'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/data/posts'
import { Metadata } from 'next'
import Link from 'next/link'
import SingleContentContainer from '../SingleContentContainer'
import SingleHeaderContainer from '../SingleHeaderContainer'
import SingleRelatedPosts from '../SingleRelatedPosts'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  if (!post) {
    return {
      title: 'Post not found',
      description: 'Post not found',
    }
  }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  // Add this null check
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Post Not Found</h1>
        <p className="mb-8 text-gray-600">The post youre looking for doesnt exist or has been removed.</p>
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    )
  }
  const comments = await getCommentsByPostId(post.id)
  const relatedPosts = (await getAllPosts()).slice(0, 6)
  const moreFromAuthorPosts = (await getAllPosts()).slice(1, 7)

  const widgetPosts = (await getAllPosts()).slice(0, 6)
  const widgetCategories = (await getCategories()).slice(0, 6)
  const widgetTags = (await getTags()).slice(0, 6)
  const widgetAuthors = (await getAuthors()).slice(0, 6)

  return (
    <>
      <div className="single-post-page">
        <SingleHeaderContainer post={post} />

        <div className="container mt-12 flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            <SingleContentContainer post={post} comments={comments} />
          </div>
          <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
            <div className="space-y-7 lg:sticky lg:top-7">
              <WidgetAuthors authors={widgetAuthors} />
              <WidgetTags tags={widgetTags} />
              <WidgetCategories categories={widgetCategories} />
              <WidgetPosts posts={widgetPosts} />
            </div>
          </div>
        </div>

        <SingleRelatedPosts relatedPosts={relatedPosts} moreFromAuthorPosts={moreFromAuthorPosts} />
      </div>
    </>
  )
}

export default Page
