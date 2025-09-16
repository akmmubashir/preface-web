import NcImage from '@/components/NcImage/NcImage'
import { TPost } from '@/data/posts'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import Card5 from './PostCards/Card5'

interface Props {
  posts: TPost[]
  className?: string
}

const SectionHero3: FC<Props> = ({ posts, className }) => {
  const renderMain = () => {
    const { featuredImage, title, excerpt, handle } = posts[0]
    return (
      <div className="aspect-w-8 aspect-h-8 sm:aspect-w-10 lg:aspect-w-16">
        <NcImage
          alt={title}
          containerClassName="absolute inset-0 z-0 overflow-hidden rounded-[40px]"
          src={featuredImage}
          fill
          sizes="(max-width: 1024px) 100vw, 90vw"
        />
        <span className="absolute inset-0 rounded-[40px] bg-black/50"></span>
        <div className="absolute inset-0 p-5 md:p-14 xl:p-20 2xl:p-28">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-white sm:text-3xl lg:text-4xl">
              <Link href={`/post/${handle}`}>{title}</Link>
            </h2>
            <span className="mt-3 block text-sm/6 text-neutral-300 sm:mt-5 sm:text-base/relaxed">
              <span className="line-clamp-2">{excerpt}</span>
            </span>
            <div className="mt-5 sm:mt-8">
              <ButtonSecondary href={`/post/${handle}`}>
                <span>Read more</span>
                <ArrowRightIcon className="size-6 rtl:rotate-180" />
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSubPosts = () => {
    const subPosts = posts.slice(1, 4)
    return (
      <div className="mt-6 grid transform gap-4 sm:grid-cols-2 md:-mt-20 md:grid-cols-3 lg:gap-8 lg:px-14 xl:px-20 2xl:px-28">
        {subPosts.map((post) => (
          <Card5 className="rounded-3xl bg-white shadow-2xl dark:bg-neutral-800" key={post.handle} post={post} />
        ))}
      </div>
    )
  }

  return (
    <div className={clsx('section-hero-3', className)}>
      {posts.length && renderMain()}
      {posts.length > 1 && renderSubPosts()}
    </div>
  )
}

export default SectionHero3
