import { clientApi } from '@/lib/client/api'
import { useMutation } from '@tanstack/react-query'

export const useSubmitScholarQuestion = () => {
  return useMutation({
    mutationFn: (data: any) => clientApi.post('/api/scholar-questions/guest', data),
  })
}

// export const useCreateCategory = () => {
//     const queryClient = useQueryClient()

//     return useMutation({
//       mutationFn: async (categoryData: Partial<Category>) => {
//         const response = await clientApi.post<Category>('/api/admin/categories', categoryData)
//         return response
//       },
//       onSuccess: () => {
//         // Invalidate all category queries
//         queryClient.invalidateQueries({ queryKey: categoryKeys.all })
//       },
//       onError: (error: ApiError) => {
//         console.error('Failed to create category:', error)
//       }
//     })
//   }
