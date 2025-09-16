import SectionGridPosts from '@/components/SectionGridPosts'
import { getLatestVideos } from '@/data/api/posts'
import { getPostsDefault, getPostsVideo, TPost } from '@/data/posts'
import { FC } from 'react'

interface Props {
  relatedPosts?: TPost[]
  moreFromAuthorPosts?: TPost[]
}

const SingleRelatedPosts: FC<Props> = async ({ relatedPosts, moreFromAuthorPosts }) => {
  const defaultPosts = await getPostsDefault()
  const videoPosts = await getPostsVideo()
  const latestVideos = await getLatestVideos()
  return (
    <div className="relative my-16">
      {/* RELATED  */}
      <div className="container space-y-16 lg:space-y-28">
        <div className=" ">
          <SectionGridPosts
            postCardName="card10V6"
            heading="STORYTELLING ISLAM"
            subHeading="Understanding Islam through 1001 stories"
            posts={(await getLatestVideos()).slice(0, 8)}
            gridClass="md:grid-cols-2 lg:grid-cols-2"
            timeDuration={true}
          />
        </div>
        {/* <SectionSliderPosts posts={relatedPosts} heading="Don't miss these" postCardName="card16Podcast" /> */}
        {/* <SectionSliderPosts posts={moreFromAuthorPosts} heading="More from author" /> */}
      </div>
    </div>
  )
}

export default SingleRelatedPosts
