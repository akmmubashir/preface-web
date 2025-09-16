import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon'
import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  post: TPost
}

const Card13: FC<Props> = ({ className, post }) => {
  const { title, handle, featuredImage, excerpt, postType } = post

  return (
    <div className={clsx('post-card-13 group relative flex justify-between', className)}>
      <div className="flex h-full flex-col py-2">
        <h2 className={`nc-card-title block text-sm font-semibold sm:text-base`}>
          <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <span className="my-3 hidden text-neutral-500 sm:block dark:text-neutral-400">
          <span className="line-clamp-2"> {excerpt}</span>
        </span>
        <span className="mt-4 block text-xs text-neutral-500 sm:hidden">{post.date}</span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta meta={{ ...post }} />
        </div>
      </div>

      <Link
        href={`/post/${handle}`}
        className={clsx('relative ms-4 block h-full w-24 shrink-0 sm:ms-5 sm:w-36 lg:w-40 xl:w-48 2xl:w-[200px]')}
      >
        <Image
          className="rounded-xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75 sm:rounded-3xl"
          src={featuredImage}
          fill
          alt={title}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <PostTypeFeaturedIcon
          className="absolute start-2.5 bottom-2.5"
          postType={postType}
          wrapSize="size-8"
          iconSize="size-4"
        />
      </Link>
    </div>
  )
}

export default Card13
