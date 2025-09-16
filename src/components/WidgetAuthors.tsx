import { TAuthor } from '@/data/authors'
import clsx from 'clsx'
import { FC } from 'react'
import CardAuthor from './CardAuthorBoxs/CardAuthor'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  authors: TAuthor[]
}

const WidgetAuthors: FC<Props> = ({ className = 'bg-neutral-100 dark:bg-neutral-800', authors }) => {
  return (
    <div className={clsx('widget-authors overflow-hidden rounded-3xl', className)}>
      <WidgetHeading title="Hottest authors" viewAll={{ label: 'View all', href: '/#' }} />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {authors?.map((author) => (
            <CardAuthor
              className="p-4 hover:bg-neutral-200 xl:p-5 dark:hover:bg-neutral-700"
              key={author.id}
              author={author}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WidgetAuthors
