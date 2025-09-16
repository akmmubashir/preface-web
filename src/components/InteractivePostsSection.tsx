'use client'

import {
  useLatestArticles,
  useLatestVideos,
  useTogglePostBookmark,
  useTogglePostLike,
  type Post,
} from '@/hooks/api/use-posts'
import { BookmarkIcon, ChatBubbleLeftIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface InteractivePostsSectionProps {
  initialPosts?: Post[]
  initialVideos?: Post[]
  heading?: string
  subHeading?: string
  contentType?: 'posts' | 'videos' | 'mixed'
  limit?: number
}

export default function InteractivePostsSection({
  initialPosts = [],
  initialVideos = [],
  heading = 'INTERACTIVE POSTS',
  subHeading = 'Like, bookmark, and interact with posts in real-time',
  contentType = 'posts',
  limit = 8,
}: InteractivePostsSectionProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [videos, setVideos] = useState<Post[]>(initialVideos)

  // React Query hooks based on content type
  const {
    data: latestPosts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useLatestArticles(contentType === 'videos' ? 0 : limit)
  const {
    data: latestVideos,
    isLoading: videosLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useLatestVideos(contentType === 'posts' ? 0 : limit)

  const toggleLike = useTogglePostLike()
  const toggleBookmark = useTogglePostBookmark()

  // Determine which data to display based on content type
  const isLoading =
    contentType === 'mixed' ? postsLoading || videosLoading : contentType === 'videos' ? videosLoading : postsLoading
  const error =
    contentType === 'mixed' ? postsError || videosError : contentType === 'videos' ? videosError : postsError

  const displayPosts =
    contentType === 'videos'
      ? latestVideos?.data || videos
      : contentType === 'mixed'
        ? [...(latestPosts?.data || posts), ...(latestVideos?.data || videos)]
        : latestPosts?.data || posts

  const handleLike = async (postId: string, currentLiked: boolean) => {
    const action = currentLiked ? 'unlike' : 'like'

    // Optimistic update
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !currentLiked,
              likeCount: (post.likeCount || 0) + (currentLiked ? -1 : 1),
            }
          : post
      )
    )

    try {
      await toggleLike.mutateAsync({ postId, action })
      // Refetch to ensure data consistency
      if (contentType === 'videos') {
        refetchVideos()
      } else if (contentType === 'mixed') {
        refetchPosts()
        refetchVideos()
      } else {
        refetchPosts()
      }
    } catch (error) {
      // Revert optimistic update on error
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: currentLiked,
                likeCount: (post.likeCount || 0) + (currentLiked ? 1 : -1),
              }
            : post
        )
      )
    }
  }

  const handleBookmark = async (postId: string, currentBookmarked: boolean) => {
    const action = currentBookmarked ? 'unbookmark' : 'bookmark'

    // Optimistic update
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isBookmarked: !currentBookmarked } : post)))

    try {
      await toggleBookmark.mutateAsync({ postId, action })
      if (contentType === 'videos') {
        refetchVideos()
      } else if (contentType === 'mixed') {
        refetchPosts()
        refetchVideos()
      } else {
        refetchPosts()
      }
    } catch (error) {
      // Revert optimistic update on error
      setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isBookmarked: currentBookmarked } : post)))
    }
  }

  if (isLoading) {
    return (
      <div className="relative py-16 lg:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl dark:text-neutral-100">{heading}</h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">{subHeading}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-4 h-48 rounded-lg bg-neutral-200 dark:bg-neutral-800"></div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800"></div>
                  <div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative py-16 lg:py-20">
        <div className="container text-center">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">Failed to load posts</h3>
            <p className="mb-4 text-red-600 dark:text-red-300">
              {error.message || 'An error occurred while loading posts'}
            </p>
            <button
              onClick={() => {
                if (contentType === 'videos') {
                  refetchVideos()
                } else if (contentType === 'mixed') {
                  refetchPosts()
                  refetchVideos()
                } else {
                  refetchPosts()
                }
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative py-16 lg:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl dark:text-neutral-100">{heading}</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">{subHeading}</p>
          {contentType === 'videos' && (
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {displayPosts.length} video{displayPosts.length !== 1 ? 's' : ''} available
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-900"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
                    <span className="text-lg font-semibold text-white">No Image</span>
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => handleBookmark(post.id, post.isBookmarked || false)}
                    className="rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white dark:bg-neutral-800/90 dark:hover:bg-neutral-800"
                    title={post.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {post.isBookmarked ? (
                      <BookmarkIconSolid className="h-5 w-5 text-blue-600" />
                    ) : (
                      <BookmarkIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Play Button for Videos */}
                {contentType === 'videos' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg dark:bg-neutral-800/90">
                      <div className="ml-1 h-0 w-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-white dark:border-l-neutral-800"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-4">
                {/* Category and Content Type */}
                <div className="mb-3 flex gap-2">
                  {post.category && (
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      {post.category.name}
                    </span>
                  )}
                  {contentType === 'videos' && (
                    <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      🎥 Video
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="mb-4 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
                )}

                {/* Meta Information */}
                <div className="mb-4 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <EyeIcon className="h-4 w-4" />
                      {post.viewCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                      {post.commentCount || 0}
                    </span>
                  </div>
                  {post.readTime && <span>{post.readTime} min read</span>}
                </div>

                {/* Author */}
                {post.author && (
                  <div className="mb-4 flex items-center gap-3">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500">
                        <span className="text-sm font-semibold text-white">
                          {post.author.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {post.author.name}
                    </span>
                  </div>
                )}

                {/* Like Button */}
                <button
                  onClick={() => handleLike(post.id, post.isLiked || false)}
                  disabled={toggleLike.isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  {post.isLiked ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  )}
                  <span className="text-sm font-medium">{post.isLiked ? 'Liked' : 'Like'}</span>
                  {post.likeCount && post.likeCount > 0 && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">({post.likeCount})</span>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (contentType === 'videos') {
                refetchVideos()
              } else if (contentType === 'mixed') {
                refetchPosts()
                refetchVideos()
              } else {
                refetchPosts()
              }
            }}
            disabled={isLoading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? 'Refreshing...'
              : `Refresh ${contentType === 'videos' ? 'Videos' : contentType === 'mixed' ? 'Content' : 'Posts'}`}
          </button>
        </div>
      </div>
    </div>
  )
}
