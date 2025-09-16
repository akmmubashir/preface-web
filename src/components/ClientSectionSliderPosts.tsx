'use client'

import { usePopularArticles } from '@/hooks/api'
import { HeadingWithSubProps } from '@/shared/Heading'
import { FC } from 'react'
import SectionSliderPosts from './SectionSliderPosts'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  postCardName?: 'card4' | 'card7' | 'card9' | 'card10' | 'card10V2' | 'card11' | 'card10V5' | 'card16Podcast'
  subcategorySlug?: string
  parentSlug?: string
  limit?: number
  lang?: string
}

const ClientSectionSliderPosts: FC<Props> = ({ subcategorySlug, parentSlug, limit = 6, lang, ...props }) => {
  // Determine which query to use based on available props
  const queryParams = subcategorySlug
    ? { subcategorySlug, limit } // Priority: subcategory-specific articles
    : { parentSlug, limit } // Fallback: parent category articles

  const { data: popularArticles, isLoading, error } = usePopularArticles(queryParams)

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading popular articles</div>
  }

  const posts = popularArticles?.data || []

  // Type assertion to convert Post[] to TPost[]
  return <SectionSliderPosts {...props} posts={posts as unknown as any[]} lang={lang} />
}

export default ClientSectionSliderPosts
