// src/data/api/posts.ts
import { serverFetch } from '@/lib/server/api'

export const getLatestArticles = async (lang?: string) => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/latest-articles', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return data
  } catch (error) {
    console.error('Failed to fetch latest articles:', error)
    return { data: [] }
  }
}

// Add this to your posts.ts file
export const getLatestVideos = async (lang?: string, options?: { limit?: number }) => {
  try {
    const response = await serverFetch.get<{ data: any[] }>('/api/frontend/latest-videos', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      limit: options?.limit,
    })
    return response?.data || []
  } catch (error) {
    console.error('Failed to fetch latest videos:', error)
    return []
  }
}

// islam for beginners under articles
export const getIslamForBeginners = async (lang?: string) => {
  try {
    const response = await serverFetch.get<{ data: { latestArticles: any[] } }>('/api/frontend/islam-for-beginners', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return response?.data?.latestArticles || []
  } catch (error) {
    console.error('Failed to fetch islam for beginners articles', error)
    return []
  }
}
// /api/frontend/quran-latest-articles?lang=en&limit=4
// holy quran latest articles
export const getQuranLatestArticles = async (lang?: string, options?: { limit?: number }) => {
  try {
    const response = await serverFetch.get<{ data: any[] }>('/api/frontend/quran-latest-articles', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      limit: options?.limit,
    })
    return response?.data || []
  } catch (error) {
    console.error('Failed to fetch quran latest articles', error)
    return []
  }
}

// Dynamic subcategory posts
// /api/frontend/list-posts?categorySlug=life-and-message&page=1&limit=100&lang=en
export const getSubcategoryPosts = async (
  categorySlug: string,
  lang?: string,
  options?: {
    page?: number
    limit?: number
  }
) => {
  try {
    const response = await serverFetch.get<{
      data: {
        categories: Array<{
          name: string
          slug: string
          shortDescription: string
          featuredImage: string
          featuredIcon: string
          isTrending: boolean
          language: { name: string; code: string }
          parentCategory: { name: string }
        }>
        list: any[]
        pageMeta: {
          size: number
          page: number
          total: number
          totalPages: number
        }
      }
    }>(`/api/frontend/list-posts?categorySlug=${categorySlug}`, {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      page: options?.page || 1,
      limit: options?.limit || 100,
    })
    return (
      response?.data || {
        categories: [],
        list: [],
        pageMeta: { size: 0, page: 1, total: 0, totalPages: 0 },
      }
    )
  } catch (error) {
    console.error(`Failed to fetch posts for subcategory: ${categorySlug}`, error)
    return {
      categories: [],
      list: [],
      pageMeta: { size: 0, page: 1, total: 0, totalPages: 0 },
    }
  }
}

// Get single post by slug
// /api/frontend/posts/slug/{slug}
export const getPostBySlug = async (slug: string) => {
  try {
    // Validate the slug parameter
    if (!slug || slug.includes('.') || slug.includes('com.chrome.devtools.json')) {
      console.warn(`Invalid slug parameter: ${slug}`)
      return null
    }

    // console.log(`Fetching post with slug: ${slug}`)
    const response = await serverFetch.get<{ data: any }>(`/api/frontend/posts/slug/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    // console.log(`API response for slug ${slug}:`, response)

    if (!response?.data) {
      console.warn(`No data returned for slug: ${slug}`)
      return null
    }

    return response.data
  } catch (error) {
    console.error(`Failed to fetch post by slug: ${slug}`, error)
    return null
  }
}

export const getTopicsWithArticles = async (lang?: string) => {
  try {
    const response = await serverFetch.get<{ data: any[] }>('/api/frontend/topics-with-articles', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return response?.data || []
  } catch (error) {
    console.error('Failed to fetch topics with articles:', error)
    return []
  }
}

export const getPopularArticles = async (lang?: string) => {
  try {
    const response = await serverFetch.get<{ data: any[] }>('/api/frontend/popular-articles', {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return response?.data || []
  } catch (error) {
    console.error('Failed to fetch popular articles:', error)
    return []
  }
}

// Get category by slug
export const getCategoryBySlug = async (category: string, lang?: string) => {
  try {
    const response = await serverFetch.get<{ data: any }>(`/api/frontend/category/slug/${category}`, {
      language: lang,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return response?.data || null
  } catch (error) {
    console.error(`Failed to fetch category by slug: ${category}`, error)
    return null
  }
}
