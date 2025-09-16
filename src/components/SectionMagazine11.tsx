import { TCategory } from '@/data/categories'
import { Badge } from '@/shared/Badge'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import Card18 from './PostCards/Card18'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  categories: TCategory[]
  heading?: string
}

const SectionMagazine11: FC<Props> = ({ className, categories, subHeading, dimHeading, heading }) => {
  const renderListByCat = (category: TCategory) => {
    const { posts, color, name, id, handle } = category

    if (!posts?.length) return null

    return (
      <div key={id} className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between">
          <Badge color={color as any}>{name}</Badge>
          <Link href={`/category/${handle}`} className="flex items-center text-xs text-neutral-500">
            <span>More articles</span>
            <ArrowRightIcon className="ms-1.5 h-3 w-3 rtl:rotate-180" />
          </Link>
        </div>
        {posts[0] && <Card18 ratio="aspect-4/3" className="shrink-0" post={posts[0]} />}
        <ul className="flex flex-col gap-y-4">
          {posts
            .filter((_, i) => i > 0)
            .map((post) => (
              <li key={post.handle}>
                <div className="flex items-start gap-x-3.5">
                  <Badge className="mt-2 size-2.5! shrink-0 rounded-sm p-0!" color={color as any}>
                    <span className="sr-only">{name}</span>
                  </Badge>

                  <h2 className="nc-card-title font-medium">
                    <Link href={`/post/${post.handle}`} title={post.title}>
                      {post.title}
                    </Link>
                  </h2>
                </div>
              </li>
            ))}
        </ul>
      </div>
    )
  }

  return (
    <div className={clsx('section-magazine-11 relative', className)}>
      <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading}>
        {heading}
      </HeadingWithSub>
      <div className="grid grid-cols-1 gap-7 sm:gap-4 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {categories.map(renderListByCat)}
      </div>
    </div>
  )
}

export default SectionMagazine11
