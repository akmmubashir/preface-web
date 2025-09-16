import { useAuth } from '@/contexts/AuthContext'
import { clientApi } from '@/lib/client/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface FavouriteData {
  userId: string
  postId: string
  postType: string
}

interface RemoveFavouriteData {
  userId: string
  postId: string
}

export const useFavourite = () => {
  return useMutation({
    mutationFn: async (data: FavouriteData) => {
      const token = localStorage.getItem('authToken') // Make sure to store the token in localStorage after login
      return clientApi.post('/api/favorites/', data, {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
      })
    },
  })
}

// Hook for fetching latest articles
export const useGetUserFavourites = () => {
  const { user } = useAuth()
  const userId = user?._id

  return useQuery({
    queryKey: ['favorites', 'user', userId],
    queryFn: async (): Promise<any> => {
      if (!userId) return null

      const token = localStorage.getItem('authToken')
      const response = await clientApi.get<any[]>(`/api/favorites/${userId}`, {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
      })
      return response
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RemoveFavouriteData) => {
      const token = localStorage.getItem('authToken')
      return clientApi.delete('/api/favorites/remove', {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
        body: data,
      })
    },
    onSuccess: () => {
      // Invalidate and refetch the favorites query to update the UI
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
    onError: (error) => {
      console.error('Failed to remove favorite:', error)
    },
  })
}
