// src/data/api/articles.ts
import { serverFetch } from '@/lib/server/api'

//all categories | storytelling islam
export const getCategory = async (lang?: string) => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/all-category-list', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return data
  } catch (error) {
    console.error('Failed to fetch categories', error)
    return { data: [] }
  }
}

//top trending topics
export const getTopTrendingTopics = async (lang?: string) => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/top-trending-topics', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return data
  } catch (error) {
    console.error('Failed to fetch top trending topics', error)
    return { data: [] }
  }
}

//quran subcategories
export const getQuranSubcategories = async (lang?: string, options?: { limit?: number }) => {
  try {
    const response = await serverFetch.get<{
      data: Array<{
        subcategories: any[]
      }>
    }>('/api/frontend/quran-categories', {
      language: lang,
      next: { revalidate: 60 },
      limit: options?.limit,
    })

    // Extract and flatten all subcategories from all categories
    return response?.data.flatMap((category) => category.subcategories || []) || []
  } catch (error) {
    console.error('Failed to fetch quran subcategories', error)
    return []
  }
}
