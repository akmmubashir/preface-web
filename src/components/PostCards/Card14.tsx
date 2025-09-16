import { TPost } from '@/data/posts'
import Avatar from '@/shared/Avatar'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
  ratio?: string
}

const Card14: FC<Props> = ({ className, ratio = 'aspect-1/1', post }) => {
  const { title, handle, featuredImage, categories, author, date, postType, readingTime } = post

  return (
    <div className={clsx('group post-card-14 relative flex flex-col overflow-hidden rounded-3xl', className)}>
      <div className={clsx('relative w-full', ratio)}>
        <Image
          alt={title}
          fill
          className="rounded-3xl object-cover brightness-75 transition-[filter] duration-300 group-hover:brightness-[65%]"
          src={featuredImage ?? ''}
        />

        <PostTypeFeaturedIcon
          className="absolute end-4 top-4"
          postType={postType}
          wrapSize="size-8"
          iconSize="size-4"
        />
      </div>

      <CategoryBadgeList className="absolute top-3.5 left-3.5 z-10" categories={categories} />

      <div className="absolute inset-x-3 bottom-3 flex grow flex-col rounded-2xl bg-white/20 p-4 text-neutral-50 backdrop-blur-lg backdrop-filter">
        <h2 className="block text-base font-semibold text-white">{title}</h2>

        <div className="mt-4 flex flex-wrap items-center text-xs/6 font-medium">
          <div className="relative flex gap-x-2">
            <Avatar className="size-6" src={author.avatar.src} alt={author.name} width={24} height={24} sizes="24px" />
            <span className="block text-white">{author.name}</span>
            <Link href={`/author/${author.handle}`} className="absolute inset-0"></Link>
          </div>
          <span className="mx-1.5">·</span>
          <span className="font-normal">
            <time dateTime={date}>
              {new Date(date ?? '').toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </span>
          <span className="mx-1.5">/</span>
          <span className="font-normal">{readingTime} min read</span>
        </div>
      </div>

      <Link href={`/post/${handle}`} className="absolute inset-0" />
    </div>
  )
}

export default Card14
