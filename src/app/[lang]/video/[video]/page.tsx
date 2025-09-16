import { TPost, getPostBySlug } from '@/data/posts'
import { Metadata } from 'next'
import SingleHeaderContainerVideo from '../SingleHeaderContainerVideo'
import SingleRelatedPosts from '../SingleRelatedPosts'

export async function generateMetadata({ params }: { params: Promise<{ video: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.video)
  if (!post) {
    return {
      title: 'Video not found',
      description: 'The requested video could not be found',
    }
  }
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: [
        {
          url: (typeof post.thumbnail === 'string' ? post.thumbnail : post.thumbnail?.src) || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

interface PageProps {
  params: Promise<{ video: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params
  const post = (await getPostBySlug(resolvedParams.video)) as TPost | null

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <p className="mt-4">The requested video could not be found.</p>
      </div>
    )
  }

  return (
    <div className="single-post-page mt-20">
      <SingleHeaderContainerVideo post={post as any} />

      {/* Uncomment if you want to show the content container */}
      {/* <div className="container mt-12 flex flex-col lg:flex-row">
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
      </div> */}

      <SingleRelatedPosts />
    </div>
  )
}

export default Page
