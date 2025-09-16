'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useFavourite, useGetUserFavourites, useRemoveFavourite } from '@/hooks/api/use-favourite'
import convertNumbThousand from '@/utils/convertNumbThousand'
import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import AuthRequiredModal from './ui/AuthRequiredModal'

interface Props {
  className?: string
  likeCount: number
  liked?: boolean
  color?: string
  post?: any
}

const PostCardLikeBtn: FC<Props> = ({ className, likeCount = 0, liked = false, color, post }) => {
  const { isAuthenticated, user } = useAuth()
  const [isLiked, setIsLiked] = useState(liked)
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(likeCount)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()
  const { mutate: toggleFavorite } = useFavourite()
  const { data } = useGetUserFavourites()

  const removeFavourite = useRemoveFavourite()

  type Favorite = {
    postId: {
      _id: string
    }
    // Add other properties from your favorite object if needed
  }

  const userFavourites = data?.favorites as Favorite[] | undefined

  // Update liked state based on user's favorites
  useEffect(() => {
    if (userFavourites && post?._id) {
      const isPostLiked = userFavourites.some((fav: Favorite) => fav.postId?._id === post._id)
      setIsLiked(isPostLiked)
    }
  }, [userFavourites, post?._id])

  // Default color classes
  const defaultClasses =
    'bg-neutral-50 hover:bg-rose-50 hover:text-rose-600 dark:bg-white/10 dark:hover:bg-white/10 dark:hover:bg-rose-400'
  // If color is provided, use it, otherwise use default classes
  const colorClasses = color ? color : defaultClasses

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    if (!post?._id || !user?._id) return

    const newLikedState = !isLiked

    // Optimistic update
    setIsLiked(newLikedState)
    setOptimisticLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))

    try {
      if (newLikedState) {
        // Add to favorites
        await toggleFavorite({
          userId: user._id,
          postId: post._id,
          postType: post.postType?._id,
        })
        // toast.success('Added to favorites');
      } else {
        // Remove from favorites
        await removeFavourite.mutateAsync({
          userId: user._id,
          postId: post._id,
        })
        // toast.success('Removed from favorites');
      }
    } catch (error) {
      // Revert on error
      console.error('Error updating favorite:', error)
      setIsLiked(!newLikedState)
      setOptimisticLikeCount((prev) => (newLikedState ? prev - 1 : prev + 1))
      toast.error(`Failed to ${newLikedState ? 'add to' : 'remove from'} favorites`)
    }
  }

  const handleLogin = () => {
    router.push('/login')
    setShowAuthModal(false)
  }

  return (
    <>
      <button
        className={clsx(
          'post-card-like-btn group flex h-8 cursor-pointer items-center rounded-full ps-2 pe-3 text-xs leading-none transition-colors',
          className,
          isLiked ? 'bg-[#D6F2E2] text-[#00652E]' : colorClasses
        )}
        onClick={handleLikeClick}
        title={isLiked ? 'Unlike' : 'Like'}
        disabled={!post?._id} // Disable if no post ID is available
      >
        <HeartIcon className="size-4" strokeWidth={1} fill={isLiked ? 'currentColor' : 'none'} />

        <span className={clsx('ms-1', isLiked && 'text-[#00652E]')}>
          {post?.favoriteCount || convertNumbThousand(optimisticLikeCount)}
        </span>
      </button>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        description="You need to be signed in to like posts. Please sign in to continue."
        actionText="Sign In"
        cancelText="Cancel"
        redirectPath="/login"
      />
    </>
  )
}

export default PostCardLikeBtn
