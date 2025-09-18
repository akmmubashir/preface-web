import { FC } from 'react'

interface Props {
  className?: string
}

const PostContentSkelton: FC<Props> = ({ className }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-1/2 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-3/4 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-full animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
      <div className="h-2 w-1/4 animate-pulse rounded bg-neutral-400 dark:bg-neutral-800" />
    </div>
  )
}

export default PostContentSkelton
