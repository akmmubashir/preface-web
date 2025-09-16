import clsx from 'clsx'
import { FC } from 'react'
import CardArticle1 from './ArticleCards/CardArticle1'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  categories: any
}

const WidgetCategories: FC<Props> = ({ className = 'bg-white dark:bg-[#0D0D0D]', categories }) => {
  const shouldScroll = categories && categories.length > 6

  return (
    <div className={clsx('widget-categories overflow-hidden rounded-3xl', className)}>
      <WidgetHeading title="Continues Read" viewAll={{ label: 'View all', href: '/#' }} />
      <div className="flow-root">
        <div
          className={clsx(
            'grid grid-cols-2 gap-1 pb-4 sm:grid-cols-3 lg:grid-cols-2',
            shouldScroll
              ? 'grid max-h-[70vh] grid-cols-2 overflow-y-auto pb-4 md:max-h-[90vh]'
              : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2'
          )}
        >
          {categories?.map((category: any, index: number) => (
            <CardArticle1 key={category._id} article={category} className="p-4" index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WidgetCategories
