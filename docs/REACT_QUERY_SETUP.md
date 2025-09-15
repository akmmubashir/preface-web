# React Query Setup Guide

This document explains how React Query is integrated into the Next.js project for client-side data fetching while maintaining SSR for other sections.

## Architecture Overview

The project uses a hybrid approach:
- **SSR (Server-Side Rendering)**: Used for initial page loads and static content
- **React Query**: Used for interactive sections that need real-time updates and client-side state management

## File Structure

```
src/
├── providers/
│   └── query-provider.tsx          # React Query provider wrapper
├── lib/
│   ├── server/
│   │   └── api.ts                  # Server-side API client (existing)
│   └── client/
│       └── api.ts                  # Client-side API client
├── hooks/
│   └── api/
│       ├── use-api.ts              # Generic hook factory
│       ├── use-posts.ts            # Posts-specific hooks
│       └── use-categories.ts       # Categories-specific hooks
└── components/
    └── InteractivePostsSection.tsx # Example interactive component
```

## Key Components

### 1. QueryProvider (`src/providers/query-provider.tsx`)

Wraps the entire app with React Query context and provides:
- Global query client configuration
- Default options for queries and mutations
- Development tools (only in development mode)

**Configuration:**
- `staleTime`: 5 minutes (data considered fresh)
- `gcTime`: 10 minutes (data cached in memory)
- Retry logic for failed requests
- Optimistic updates for mutations

### 2. Client API (`src/lib/client/api.ts`)

Handles all client-side API calls with:
- Automatic language parameter injection
- Error handling and type safety
- Support for query parameters
- Request/response interceptors

**Features:**
- TypeScript interfaces for API responses
- Automatic error handling
- Query parameter building
- Request cancellation support

### 3. Generic Hook Factory (`src/hooks/api/use-api.ts`)

Provides reusable patterns for creating React Query hooks:

```typescript
// Create query keys
const userKeys = createQueryKeys('users')

// Create hooks
const useUsers = createUseQuery<User[]>(userKeys.lists(), '/api/users')
const useCreateUser = createUseMutation<User, CreateUserData>('/api/users')
const useUpdateUser = createUsePutMutation<User, UpdateUserData>('/api/users')
const useDeleteUser = createUseDeleteMutation<User>('/api/users')
```

### 4. Specific API Hooks

#### Posts Hooks (`src/hooks/api/use-posts.ts`)

```typescript
// Fetch latest articles
const { data, isLoading, error } = useLatestArticles(8)

// Toggle post like
const toggleLike = useTogglePostLike()
await toggleLike.mutateAsync({ postId: '123', action: 'like' })

// Toggle bookmark
const toggleBookmark = useTogglePostBookmark()
await toggleBookmark.mutateAsync({ postId: '123', action: 'bookmark' })
```

#### Categories Hooks (`src/hooks/api/use-categories.ts`)

```typescript
// Fetch trending categories
const { data: trendingCategories } = useTrendingCategories(10)

// Fetch Quran subcategories
const { data: quranCategories } = useQuranSubcategories(6)
```

## Usage Patterns

### 1. Basic Query Usage

```typescript
import { useLatestArticles } from '@/hooks/api/use-posts'

function MyComponent() {
  const { data, isLoading, error, refetch } = useLatestArticles(5)
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {data?.data.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  )
}
```

### 2. Mutation Usage

```typescript
import { useTogglePostLike } from '@/hooks/api/use-posts'

function LikeButton({ postId, isLiked, likeCount }) {
  const toggleLike = useTogglePostLike()
  
  const handleLike = async () => {
    try {
      await toggleLike.mutateAsync({ 
        postId, 
        action: isLiked ? 'unlike' : 'like' 
      })
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }
  
  return (
    <button 
      onClick={handleLike}
      disabled={toggleLike.isPending}
    >
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  )
}
```

### 3. Optimistic Updates

The hooks automatically handle optimistic updates for better UX:

```typescript
// In useTogglePostLike hook
onSuccess: (data, { postId, action }) => {
  // Optimistically update the post in cache
  queryClient.setQueryData(postKeys.detail(postId), (old) => {
    if (!old) return old
    
    return {
      ...old,
      data: {
        ...old.data,
        isLiked: action === 'like',
        likeCount: (old.data.likeCount || 0) + (action === 'like' ? 1 : -1)
      }
    }
  })
  
  // Invalidate related queries
  queryClient.invalidateQueries({ queryKey: postKeys.lists() })
}
```

## Integration with Existing SSR

### 1. Hybrid Approach

The home page demonstrates the hybrid approach:

```typescript
// SSR data fetching (existing)
const latestArticles = await getLatestArticles()
const storyTellingIslam = await getCategory()

// Client-side interactive section
<InteractivePostsSection
  initialPosts={latestArticles.data || []}
  heading="INTERACTIVE POSTS"
  subHeading="Like, bookmark, and interact with posts in real-time"
/>
```

### 2. Initial Data

Pass SSR data as initial props to avoid loading states:

```typescript
// Component receives initial data from SSR
interface InteractivePostsSectionProps {
  initialPosts?: Post[]
  heading?: string
  subHeading?: string
}

// Use SSR data as fallback while React Query fetches fresh data
const displayPosts = latestPosts?.data || posts
```

## Best Practices

### 1. Query Keys

Use consistent query key patterns:

```typescript
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id) => [...postKeys.details(), id] as const,
}
```

### 2. Error Handling

Implement proper error boundaries and user feedback:

```typescript
if (error) {
  return (
    <div className="error-container">
      <h3>Failed to load posts</h3>
      <p>{error.message}</p>
      <button onClick={() => refetch()}>Try Again</button>
    </div>
  )
}
```

### 3. Loading States

Provide meaningful loading indicators:

```typescript
if (isLoading) {
  return (
    <div className="loading-container">
      <div className="animate-pulse">
        {/* Skeleton loading UI */}
      </div>
    </div>
  )
}
```

### 4. Cache Management

Use appropriate stale times and cache invalidation:

```typescript
// Short stale time for frequently changing data
staleTime: 1000 * 60 * 5, // 5 minutes

// Longer stale time for static data
staleTime: 1000 * 60 * 30, // 30 minutes

// Invalidate related queries after mutations
queryClient.invalidateQueries({ queryKey: postKeys.lists() })
```

## Performance Considerations

### 1. Selective Hydration

Only use React Query for components that need interactivity:

```typescript
// ✅ Good: Interactive component
<InteractivePostsSection />

// ❌ Avoid: Static content
<StaticContentSection />
```

### 2. Query Deduplication

React Query automatically deduplicates identical requests:

```typescript
// Multiple components can use the same hook
// Only one network request will be made
const { data } = useLatestArticles(8) // Component A
const { data } = useLatestArticles(8) // Component B - uses cached data
```

### 3. Background Updates

Use `refetchOnWindowFocus` and `refetchOnReconnect` for fresh data:

```typescript
// In QueryProvider
queries: {
  refetchOnWindowFocus: false, // Disable for better UX
  refetchOnReconnect: true,    // Enable for data consistency
}
```

## Testing

### 1. Mock API Responses

```typescript
// In test files
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
)
```

### 2. Test Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { useLatestArticles } from '@/hooks/api/use-posts'

test('fetches latest articles', async () => {
  const { result } = renderHook(() => useLatestArticles(5), { wrapper })
  
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false)
  })
  
  expect(result.current.data).toBeDefined()
})
```

## Troubleshooting

### 1. Common Issues

**Query not refetching:**
- Check query keys for consistency
- Verify cache invalidation logic
- Ensure proper dependency arrays

**Stale data:**
- Adjust `staleTime` values
- Use `refetch()` for manual updates
- Check cache invalidation

**Memory leaks:**
- Use `gcTime` to control cache retention
- Implement proper cleanup in useEffect
- Monitor React Query DevTools

### 2. Debug Tools

React Query DevTools are available in development:

```typescript
// Automatically included in development
{process.env.NODE_ENV === 'development' && (
  <ReactQueryDevtools initialIsOpen={false} />
)}
```

## Future Enhancements

### 1. Infinite Queries

For paginated data:

```typescript
import { useInfiniteQuery } from '@tanstack/react-query'

const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: postKeys.lists(),
    queryFn: ({ pageParam = 1 }) => 
      clientApi.get<Post[]>('/api/posts', { params: { page: pageParam } }),
    getNextPageParam: (lastPage) => lastPage.pagination?.nextPage,
  })
}
```

### 2. Real-time Updates

For WebSocket integration:

```typescript
// Subscribe to real-time updates
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080')
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    queryClient.setQueryData(postKeys.detail(data.postId), data)
  }
  
  return () => ws.close()
}, [])
```

### 3. Offline Support

For offline-first applications:

```typescript
// Configure React Query for offline support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error.message === 'Network Error') {
          return false // Don't retry network errors
        }
        return failureCount < 3
      },
    },
  },
})
```

## Conclusion

This React Query setup provides a robust foundation for client-side data fetching while maintaining the benefits of SSR. The architecture is designed to be:

- **Maintainable**: Clear separation of concerns and reusable patterns
- **Performant**: Efficient caching and background updates
- **Type-safe**: Full TypeScript support with proper interfaces
- **Scalable**: Easy to add new API endpoints and hooks
- **Developer-friendly**: Comprehensive error handling and debugging tools

Follow the patterns established in this guide to maintain consistency across the codebase and ensure optimal performance and user experience.
