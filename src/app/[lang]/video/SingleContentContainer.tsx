'use client'

import PostCardLikeBtn from '@/components/PostCardLikeBtn'
import { TComment, TPostDetail } from '@/data/posts'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FC, useEffect, useRef, useState } from 'react'
import { ShareDropdown } from './SingleMetaAction'
import TheContent from './TheContent'

interface Props {
  post: TPostDetail | any
  comments?: TComment[]
  className?: string
}

const SingleContentContainer: FC<Props> = ({ post, comments, className }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLButtonElement>(null)
  //
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
  //

  const { tags, author, content, likeCount, commentCount, liked, handle } = post

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: false,
  })

  useEffect(() => {
    const handleProgressIndicator = () => {
      const entryContent = contentRef.current
      const progressBarContent = progressRef.current

      if (!entryContent || !progressBarContent) {
        return
      }

      const winScroll = window.scrollY || document.documentElement.scrollTop
      const entryContentRect = entryContent.getBoundingClientRect()
      const entryContentTop = entryContentRect.top
      const entryContentHeight = entryContentRect.height

      const totalEntryH = entryContentTop + window.scrollY + entryContentHeight
      const scrolled = (winScroll / totalEntryH) * 100

      progressBarContent.innerText = scrolled.toFixed(0) + '%'

      if (scrolled >= 50) {
        setIsShowScrollToTop(true)
      } else {
        setIsShowScrollToTop(false)
      }
    }

    const handleProgressIndicatorHeadeEvent = () => {
      window?.requestAnimationFrame(handleProgressIndicator)
    }
    handleProgressIndicator()
    window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent)
    return () => {
      window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent)
    }
  }, [])

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio && (endedAnchorEntry?.boundingClientRect.top || 0) > 0

  return (
    <div className={`relative ${className}`}>
      <div className="single-content space-y-10">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="mx-auto prose max-w-(--breakpoint-md)! lg:prose-lg dark:prose-invert"
          ref={contentRef}
        >
          <TheContent content={content} />
        </div>

        {/* COMMENTS LIST */}
        <div className="mx-auto max-w-(--breakpoint-md)">
          <div ref={endedAnchorRef}></div>
        </div>
      </div>

      {/* LIKE AND COMMENT STICKY */}
      <div className={`sticky bottom-8 z-11 mt-8 justify-center ${showLikeAndCommentSticky ? 'flex' : 'hidden'}`}>
        <div className="flex items-center justify-center gap-x-2 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/20">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          {/* <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
          <PostCardCommentBtn commentCount={commentCount} handle={handle} /> */}
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
          <ShareDropdown handle={handle} />
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>

          <button
            className={`size-8.5 items-center justify-center rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20 ${
              isShowScrollToTop ? 'flex' : 'hidden'
            }`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            title="Go to top"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} size={18} strokeWidth={1.75} />
          </button>

          <button
            ref={progressRef}
            className={`size-8.5 items-center justify-center ${isShowScrollToTop ? 'hidden' : 'flex'}`}
            title="Go to top"
          >
            %
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleContentContainer
