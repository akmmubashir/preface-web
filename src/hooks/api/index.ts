// src/hooks/api/index.ts
// Export all API hooks for easy importing

// Generic hook factory
export * from './use-api'

// Posts hooks
export * from './use-posts'

// Categories hooks
export * from './use-categories'

// Scholar Questions hooks
export * from './use-scholar-questions'

// Favourite hooks
export * from './use-favourite'

// Continue Read hooks
export * from './use-continue-read'

// Re-export types for convenience
export type { ApiError, ApiOptions, ApiResponse } from '@/lib/client/api'
