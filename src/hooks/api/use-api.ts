// src/hooks/api/use-api.ts
import { clientApi, type ApiError, type ApiResponse } from '@/lib/client/api'
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query'

// Generic hook factory for GET requests
export function createUseQuery<TData>(
  queryKey: string[],
  endpoint: string,
  defaultOptions?: Partial<UseQueryOptions<ApiResponse<TData>, ApiError>>
) {
  return (options?: Partial<UseQueryOptions<ApiResponse<TData>, ApiError>>) => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        return clientApi.get<TData>(endpoint)
      },
      ...defaultOptions,
      ...options,
    })
  }
}

// Generic hook factory for POST requests
export function createUseMutation<TData, TVariables>(
  endpoint: string,
  defaultOptions?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>>
) {
  return (options?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>>) => {
    return useMutation({
      mutationFn: async (variables: TVariables) => {
        return clientApi.post<TData>(endpoint, variables)
      },
      ...defaultOptions,
      ...options,
    })
  }
}

// Generic hook factory for PUT requests
export function createUsePutMutation<TData, TVariables>(
  endpoint: string,
  defaultOptions?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>>
) {
  return (options?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>>) => {
    return useMutation({
      mutationFn: async (variables: TVariables) => {
        return clientApi.put<TData>(endpoint, variables)
      },
      ...defaultOptions,
      ...options,
    })
  }
}

// Generic hook factory for DELETE requests
export function createUseDeleteMutation<TData>(
  endpoint: string,
  defaultOptions?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, string>>
) {
  return (options?: Partial<UseMutationOptions<ApiResponse<TData>, ApiError, string>>) => {
    return useMutation({
      mutationFn: async (id: string) => {
        return clientApi.delete<TData>(`${endpoint}/${id}`)
      },
      ...defaultOptions,
      ...options,
    })
  }
}

// Helper function to create query keys
export function createQueryKeys(baseKey: string) {
  return {
    all: [baseKey] as const,
    lists: () => [...createQueryKeys(baseKey).all, 'list'] as const,
    list: (filters: Record<string, any>) => [...createQueryKeys(baseKey).lists(), filters] as const,
    details: () => [...createQueryKeys(baseKey).all, 'detail'] as const,
    detail: (id: string) => [...createQueryKeys(baseKey).details(), id] as const,
    search: (query: string) => [...createQueryKeys(baseKey).all, 'search', query] as const,
  }
}

// Example usage:
// const userKeys = createQueryKeys('users')
// const useUsers = createUseQuery<User[]>(userKeys.lists(), '/api/users')
// const useCreateUser = createUseMutation<User, CreateUserData>('/api/users')
// const useUpdateUser = createUsePutMutation<User, UpdateUserData>('/api/users')
// const useDeleteUser = createUseDeleteMutation<User>('/api/users')
