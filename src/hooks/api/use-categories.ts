// src/hooks/api/use-categories.ts
import { clientApi, type ApiError } from '@/lib/client/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Types for categories
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  postCount?: number
  parentId?: string
  children?: Category[]
  createdAt: string
  updatedAt: string
}

export interface CategoriesResponse {
  data: Category[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CategoryResponse {
  data: Category
}

// Query keys for React Query
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
  trending: () => [...categoryKeys.all, 'trending'] as const,
  quran: () => [...categoryKeys.all, 'quran'] as const,
  quranSubcategories: () => [...categoryKeys.all, 'quran', 'subcategories'] as const,
}

// Hook for fetching trending categories
export const useTrendingCategories = (limit?: number) => {
  return useQuery({
    queryKey: categoryKeys.trending(),
    queryFn: async (): Promise<CategoriesResponse> => {
      const response = await clientApi.get<Category[]>('/api/frontend/trending-topics', {
        params: { limit: limit || 10 },
      })
      return response
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Hook for fetching Quran subcategories
export const useQuranSubcategories = (limit?: number) => {
  return useQuery({
    queryKey: categoryKeys.quranSubcategories(),
    queryFn: async (): Promise<CategoriesResponse> => {
      const response = await clientApi.get<Category[]>('/api/frontend/quran-subcategories', {
        params: { limit: limit || 6 },
      })
      return response
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// Hook for fetching categories
export const useCategories = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: categoryKeys.list(filters || {}),
    queryFn: async (): Promise<CategoriesResponse> => {
      const response = await clientApi.get<Category[]>('/api/frontend/categories', {
        params: filters,
      })
      return response
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// Hook for fetching a single category
export const useCategory = (categoryId: string) => {
  return useQuery({
    queryKey: categoryKeys.detail(categoryId),
    queryFn: async (): Promise<CategoryResponse> => {
      const response = await clientApi.get<Category>(`/api/frontend/categories/${categoryId}`)
      return response
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  })
}

// Hook for creating a category (admin only)
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryData: Partial<Category>) => {
      const response = await clientApi.post<Category>('/api/admin/categories', categoryData)
      return response
    },
    onSuccess: () => {
      // Invalidate all category queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
    onError: (error: ApiError) => {
      console.error('Failed to create category:', error)
    },
  })
}

// Hook for updating a category (admin only)
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Category> }) => {
      const response = await clientApi.put<Category>(`/api/admin/categories/${id}`, data)
      return response
    },
    onSuccess: (data, { id }) => {
      // Update the specific category in cache
      queryClient.setQueryData(categoryKeys.detail(id), data)
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
    onError: (error: ApiError) => {
      console.error('Failed to update category:', error)
    },
  })
}

// Hook for deleting a category (admin only)
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await clientApi.delete<{ success: boolean }>(`/api/admin/categories/${categoryId}`)
      return response
    },
    onSuccess: () => {
      // Invalidate all category queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
    onError: (error: ApiError) => {
      console.error('Failed to delete category:', error)
    },
  })
}
