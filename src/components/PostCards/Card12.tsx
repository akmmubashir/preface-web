import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import PostCardMeta from '../PostCardMeta/PostCardMeta'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
}

const Card12: FC<Props> = ({ className, post }) => {
  const { title, handle, featuredImage, excerpt, postType } = post

  return (
    <div className={clsx('group post-card-12 relative flex flex-col', className)}>
      <Link
        href={`/post/${handle}`}
        className="relative block aspect-4/3 w-full shrink-0 grow overflow-hidden rounded-3xl"
      >
        <Image
          className="object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          src={featuredImage}
          alt={title}
          fill
        />

        <PostTypeFeaturedIcon
          className="absolute start-2.5 bottom-2.5"
          postType={postType}
          wrapSize="size-8"
          iconSize="size-4"
        />
      </Link>

      <div className="mt-5 flex flex-col pe-10 sm:mt-8">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 transition-colors sm:text-lg lg:text-2xl dark:text-neutral-100`}
        >
          <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <span className="mt-4 hidden text-neutral-500 sm:block dark:text-neutral-400">
          <span className="line-clamp-2"> {excerpt}</span>
        </span>
        <PostCardMeta className="mt-5 text-sm" meta={post} />
      </div>
    </div>
  )
}

export default Card12
