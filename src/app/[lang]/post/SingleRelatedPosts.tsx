'use client'

import SectionSliderPosts from '@/components/SectionSliderPosts'
import { TPost } from '@/data/posts'
import { usePopularArticles } from '@/hooks/api'
import { FC } from 'react'

interface Props {
  relatedPosts?: any
  moreFromAuthorPosts: TPost[]
}

const SingleRelatedPosts: FC<Props> = ({ relatedPosts, moreFromAuthorPosts }) => {
  const { data, isLoading, error } = usePopularArticles()
  const popularArticles = data?.data
  // console.log(popularArticles,"popular articles");
  return (
    <div className="relative mt-16 bg-neutral-50 py-16 lg:mt-28 lg:py-24 dark:bg-neutral-800">
      {/* RELATED  */}
      <div className="container space-y-16 lg:space-y-28">
        <SectionSliderPosts
          posts={popularArticles || relatedPosts}
          heading="POPULAR ARTICLES"
          postCardName="card16Podcast"
        />
        {/* <SectionSliderPosts posts={moreFromAuthorPosts} heading="More from author" /> */}
      </div>
    </div>
  )
}

export default SingleRelatedPosts
