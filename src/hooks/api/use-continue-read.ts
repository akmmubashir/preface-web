import { useAuth } from '@/contexts/AuthContext'
import { clientApi } from '@/lib/client/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface MarkPostReadData {
  postId: string
}

export const useMarkPostRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const token = localStorage.getItem('authToken')
      return clientApi.post(
        `/api/user/mark-post-read/${postId}`,
        {},
        {
          headers: {
            Authorization: token || '',
            'Content-Type': 'application/json',
          },
        }
      )
    },
    onSuccess: () => {
      // Invalidate any relevant queries if needed
      // For example, if you have a "recently read" or "continue reading" list
      queryClient.invalidateQueries({ queryKey: ['continueReading'] })
    },
    onError: (error) => {
      console.error('Failed to mark post as read:', error)
    },
  })
}

export const useFetchReadPosts = () => {
  const { user } = useAuth()
  const userId = user?._id

  return useQuery({
    queryKey: ['readPosts', 'user', userId],
    queryFn: async (): Promise<any> => {
      if (!userId) return null

      const token = localStorage.getItem('authToken')
      const response = await clientApi.get<any[]>(`/api/user/read-posts/${userId}`, {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
      })
      return response.data
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}
