import { TTag } from '@/data/categories'
import Tag from '@/shared/Tag'
import clsx from 'clsx'
import { FC } from 'react'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  tags: TTag[]
}

const WidgetTags: FC<Props> = ({ className = 'bg-neutral-100 dark:bg-neutral-800', tags }) => {
  return (
    <div className={clsx('widget-tags overflow-hidden rounded-3xl', className)}>
      <WidgetHeading title="Suggested tags" viewAll={{ label: 'View all', href: '/#' }} />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tags?.map((tag) => (
          <Tag className="mr-2 mb-2" key={tag.id} href={`/category/${tag.handle}`}>
            {tag.name}
          </Tag>
        ))}
      </div>
    </div>
  )
}

export default WidgetTags
