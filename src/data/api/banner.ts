// src/data/api/banner.ts
import { serverFetch } from '@/lib/server/api'

export const getBannerHighlightedVideos = async (lang?: string) => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/banner/posts/highlighted/66d9d564987787d3e3ff1314', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return data?.data
  } catch (error) {
    console.error('Failed to fetch banner highlighted videos', error)
    return { data: [] }
  }
}
export const getBannerHighlightedArticles = async (lang?: string) => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/banner/posts/highlighted/66d9d564987787d3e3ff1312', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return data?.data
  } catch (error) {
    console.error('Failed to fetch banner highlighted articles', error)
    return { data: [] }
  }
}
