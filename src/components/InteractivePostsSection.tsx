"use client";

import {
  useLatestArticles,
  useLatestVideos,
  useTogglePostLike,
  useTogglePostBookmark,
  type Post,
} from "@/hooks/api/use-posts";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { EyeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface InteractivePostsSectionProps {
  initialPosts?: Post[];
  initialVideos?: Post[];
  heading?: string;
  subHeading?: string;
  contentType?: "posts" | "videos" | "mixed";
  limit?: number;
}

export default function InteractivePostsSection({
  initialPosts = [],
  initialVideos = [],
  heading = "INTERACTIVE POSTS",
  subHeading = "Like, bookmark, and interact with posts in real-time",
  contentType = "posts",
  limit = 8,
}: InteractivePostsSectionProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [videos, setVideos] = useState<Post[]>(initialVideos);

  // React Query hooks based on content type
  const {
    data: latestPosts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useLatestArticles(contentType === "videos" ? 0 : limit);
  const {
    data: latestVideos,
    isLoading: videosLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useLatestVideos(contentType === "posts" ? 0 : limit);

  const toggleLike = useTogglePostLike();
  const toggleBookmark = useTogglePostBookmark();

  // Determine which data to display based on content type
  const isLoading =
    contentType === "mixed"
      ? postsLoading || videosLoading
      : contentType === "videos"
      ? videosLoading
      : postsLoading;
  const error =
    contentType === "mixed"
      ? postsError || videosError
      : contentType === "videos"
      ? videosError
      : postsError;

  const displayPosts =
    contentType === "videos"
      ? latestVideos?.data || videos
      : contentType === "mixed"
      ? [...(latestPosts?.data || posts), ...(latestVideos?.data || videos)]
      : latestPosts?.data || posts;

  const handleLike = async (postId: string, currentLiked: boolean) => {
    const action = currentLiked ? "unlike" : "like";

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
    );

    try {
      await toggleLike.mutateAsync({ postId, action });
      // Refetch to ensure data consistency
      if (contentType === "videos") {
        refetchVideos();
      } else if (contentType === "mixed") {
        refetchPosts();
        refetchVideos();
      } else {
        refetchPosts();
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
      );
    }
  };

  const handleBookmark = async (postId: string, currentBookmarked: boolean) => {
    const action = currentBookmarked ? "unbookmark" : "bookmark";

    // Optimistic update
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !currentBookmarked }
          : post
      )
    );

    try {
      await toggleBookmark.mutateAsync({ postId, action });
      if (contentType === "videos") {
        refetchVideos();
      } else if (contentType === "mixed") {
        refetchPosts();
        refetchVideos();
      } else {
        refetchPosts();
      }
    } catch (error) {
      // Revert optimistic update on error
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, isBookmarked: currentBookmarked }
            : post
        )
      );
    }
  };

  if (isLoading) {
    return (
      <div className="relative py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              {subHeading}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 dark:bg-neutral-800 h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative py-16 lg:py-20">
        <div className="container text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Failed to load posts
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">
              {error.message || "An error occurred while loading posts"}
            </p>
            <button
              onClick={() => {
                if (contentType === "videos") {
                  refetchVideos();
                } else if (contentType === "mixed") {
                  refetchPosts();
                  refetchVideos();
                } else {
                  refetchPosts();
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-16 lg:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {subHeading}
          </p>
          {contentType === "videos" && (
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {displayPosts.length} video{displayPosts.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      No Image
                    </span>
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() =>
                      handleBookmark(post.id, post.isBookmarked || false)
                    }
                    className="p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                    title={
                      post.isBookmarked ? "Remove bookmark" : "Add bookmark"
                    }
                  >
                    {post.isBookmarked ? (
                      <BookmarkIconSolid className="w-5 h-5 text-blue-600" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Play Button for Videos */}
                {contentType === "videos" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 dark:bg-neutral-800/90 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-0 h-0 border-l-[12px] border-l-white dark:border-l-neutral-800 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-4">
                {/* Category and Content Type */}
                <div className="flex gap-2 mb-3">
                  {post.category && (
                    <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                      {post.category.name}
                    </span>
                  )}
                  {contentType === "videos" && (
                    <span className="inline-block px-3 py-1 text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                      🎥 Video
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      {post.viewCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                      {post.commentCount || 0}
                    </span>
                  </div>
                  {post.readTime && <span>{post.readTime} min read</span>}
                </div>

                {/* Author */}
                {post.author && (
                  <div className="flex items-center gap-3 mb-4">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
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
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {post.isLiked ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  )}
                  <span className="text-sm font-medium">
                    {post.isLiked ? "Liked" : "Like"}
                  </span>
                  {post.likeCount && post.likeCount > 0 && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      ({post.likeCount})
                    </span>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              if (contentType === "videos") {
                refetchVideos();
              } else if (contentType === "mixed") {
                refetchPosts();
                refetchVideos();
              } else {
                refetchPosts();
              }
            }}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Refreshing..."
              : `Refresh ${
                  contentType === "videos"
                    ? "Videos"
                    : contentType === "mixed"
                    ? "Content"
                    : "Posts"
                }`}
          </button>
        </div>
      </div>
    </div>
  );
}
