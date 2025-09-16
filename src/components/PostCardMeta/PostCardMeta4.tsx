import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  meta: any
  className?: string
  avatarSize?: string
}

const PostCardMeta4: FC<Props> = ({ meta, className, avatarSize }) => {
  const { date, author, title, handle, categories } = meta

  return (
    <div className={clsx('post-card-meta-2 relative flex gap-2 text-xs/6', className)}>
      {/* <Avatar className={clsx(avatarSize, 'mt-1 size-9 shrink-0')} src={author.avatar.src} /> */}
      <div>
        <h2 className={clsx('block text-base font-medium')}>
          {/* <Link href={`/post/${handle}`} className="line-clamp-1">
            {title}
          </Link> */}
          <span className="line-clamp-1">{title}</span>
        </h2>
        <span className="block pt-1 text-xs font-normal text-[#60A43A] dark:text-neutral-300">
          {categories[0]?.parentCategory.name}
        </span>
        {/* <Link href={`/author/${author.handle}`} className="mt-2 flex">
          <span className="block font-medium text-neutral-900 dark:text-neutral-300">{author.name}</span>
          <span className="mx-1.5 font-medium text-neutral-500 dark:text-neutral-400">·</span>
          <span className="font-normal text-neutral-500 dark:text-neutral-400">
            <LocalDate date={date} />
          </span>
        </Link> */}
      </div>
    </div>
  )
}

export default PostCardMeta4
