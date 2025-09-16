// src/hooks/api/use-posts.ts
import { clientApi, type ApiError } from '@/lib/client/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Types for posts
export interface Post {
  id: string
  title: string
  excerpt?: string
  content?: string
  featuredImage?: string
  author?: {
    id: string
    name: string
    avatar?: string
  }
  category?: {
    id: string
    name: string
    slug: string
  }
  tags?: Array<{
    id: string
    name: string
    slug: string
  }>
  publishedAt: string
  updatedAt: string
  readTime?: number
  viewCount?: number
  likeCount?: number
  commentCount?: number
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface PostsResponse {
  data: Post[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PostResponse {
  data: Post
}

// Query keys for React Query
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  latest: () => [...postKeys.all, 'latest'] as const,
  trending: () => [...postKeys.all, 'trending'] as const,
  byCategory: (categoryId: string) => [...postKeys.all, 'category', categoryId] as const,
  byAuthor: (authorId: string) => [...postKeys.all, 'author', authorId] as const,
}

// Hook for fetching latest articles
export const useLatestArticles = (limit?: number) => {
  return useQuery({
    queryKey: postKeys.latest(),
    queryFn: async (): Promise<PostsResponse> => {
      const response = await clientApi.get<Post[]>('/api/frontend/latest-articles', {
        params: { limit: limit || 10 },
      })
      return response
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Hook for fetching trending posts
export const useTrendingPosts = (limit?: number) => {
  return useQuery({
    queryKey: postKeys.trending(),
    queryFn: async (): Promise<PostsResponse> => {
      const response = await clientApi.get<Post[]>('/api/frontend/trending-posts', {
        params: { limit: limit || 10 },
      })
      return response
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// Hook for fetching posts by category
export const usePostsByCategory = (categoryId: string, limit?: number) => {
  return useQuery({
    queryKey: postKeys.byCategory(categoryId),
    queryFn: async (): Promise<PostsResponse> => {
      const response = await clientApi.get<Post[]>(`/api/frontend/categories/${categoryId}/posts`, {
        params: { limit: limit || 10 },
      })
      return response
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// Hook for fetching a single post
export const usePost = (postId: string) => {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: async (): Promise<PostResponse> => {
      const response = await clientApi.get<Post>(`/api/frontend/posts/${postId}`)
      return response
    },
    enabled: !!postId,
    staleTime: 1000 * 60 * 10, // 10 minutes for individual posts
    gcTime: 1000 * 60 * 20, // 20 minutes
  })
}

// Hook for liking/unliking a post
export const useTogglePostLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, action }: { postId: string; action: 'like' | 'unlike' }) => {
      const endpoint = action === 'like' ? 'like' : 'unlike'
      const response = await clientApi.post(`/api/frontend/posts/${postId}/${endpoint}`, {})
      return response
    },
    onSuccess: (data, { postId, action }) => {
      // Optimistically update the post in cache
      queryClient.setQueryData(postKeys.detail(postId), (old: PostResponse | undefined) => {
        if (!old) return old

        return {
          ...old,
          data: {
            ...old.data,
            isLiked: action === 'like',
            likeCount: (old.data.likeCount || 0) + (action === 'like' ? 1 : -1),
          },
        }
      })

      // Invalidate related queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error: ApiError) => {
      console.error('Failed to toggle post like:', error)
    },
  })
}

// Hook for bookmarking/unbookmarking a post
export const useTogglePostBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, action }: { postId: string; action: 'bookmark' | 'unbookmark' }) => {
      const endpoint = action === 'bookmark' ? 'bookmark' : 'unbookmark'
      const response = await clientApi.post(`/api/frontend/posts/${postId}/${endpoint}`, {})
      return response
    },
    onSuccess: (data, { postId, action }) => {
      // Optimistically update the post in cache
      queryClient.setQueryData(postKeys.detail(postId), (old: PostResponse | undefined) => {
        if (!old) return old

        return {
          ...old,
          data: {
            ...old.data,
            isBookmarked: action === 'bookmark',
          },
        }
      })

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error: ApiError) => {
      console.error('Failed to toggle post bookmark:', error)
    },
  })
}

// Hook for incrementing view count
export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await clientApi.post(`/api/frontend/posts/${postId}/view`, {})
      return response
    },
    onError: (error: ApiError) => {
      console.error('Failed to increment view count:', error)
    },
  })
}

// Hook for fetching latest videos
export const useLatestVideos = (limit?: number) => {
  return useQuery({
    queryKey: [...postKeys.latest(), 'videos', limit],
    queryFn: async (): Promise<PostsResponse> => {
      const response = await clientApi.get<Post[]>('/api/frontend/latest-videos', {
        params: { limit: limit || 8 },
      })
      return response
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Hook for fetching trending videos
export const useTrendingVideos = (limit?: number) => {
  return useQuery({
    queryKey: [...postKeys.trending(), 'videos', limit],
    queryFn: async (): Promise<PostsResponse> => {
      const response = await clientApi.get<Post[]>('/api/frontend/trending-videos', {
        params: { limit: limit || 8 },
      })
      return response
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// Hook for fetching popular articles
export const usePopularArticles = (params?: {
  parentSlug?: string
  subcategorySlug?: string
  limit?: number
  lang?: string
}) => {
  return useQuery({
    queryKey: [...postKeys.all, 'popular-articles', params],
    queryFn: async (): Promise<PostsResponse> => {
      const response = await clientApi.get<Post[]>('/api/frontend/popular-articles', {
        params: {
          ...(params?.parentSlug && { parentSlug: params.parentSlug }),
          ...(params?.subcategorySlug && {
            subcategorySlug: params.subcategorySlug,
          }),
          limit: params?.limit || 6,
          ...(params?.lang && { lang: params.lang }), // Only include lang if it exists
        },
      })
      return response
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
  })
}
