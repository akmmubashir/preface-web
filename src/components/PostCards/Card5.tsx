import { TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'

interface Props {
  className?: string
  post: TPost
  lang?: string
  index?: number
  dualColor?: boolean
}

const Card5: FC<Props> = ({ className, post, lang, index, dualColor }) => {
  const { author, title, handle, slug, date, categories, readingTime } = post

  // console.log(index,"habeeebib in card5....");

  const parentCategorySlug = (categories[0] as any)?.parentCategory?.slug
  const categorySlug = (categories[0] as any)?.slug
  const articleSlug = slug

  return (
    <div
      className={clsx(
        'group post-card-5 relative rounded-3xl bg-white p-5 transition-shadow hover:shadow-lg dark:bg-[#0D0D0D]',
        className
      )}
    >
      <Link
        href={
          lang === 'en'
            ? `/${parentCategorySlug}/${categorySlug}/${articleSlug}`
            : `/${lang}/${parentCategorySlug}/${categorySlug}/${articleSlug}`
        }
        className="absolute inset-0 rounded-lg"
      ></Link>

      <div className="flex flex-col">
        <CategoryBadgeList categories={categories} index={index} dualColor={dualColor} />
        <h2 className="my-4 block text-base text-neutral-800 dark:text-neutral-300" title={title}>
          <Link href={`/${parentCategorySlug}/${categorySlug}/${articleSlug}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        {/* <PostCardMeta3 className="relative mt-auto" readingTime={readingTime} author={author} date={date} /> */}
      </div>
    </div>
  )
}

export default Card5
