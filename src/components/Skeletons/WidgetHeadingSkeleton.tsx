import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  showButton?: boolean
}

const WidgetHeadingSkeleton: FC<Props> = ({ className, showButton = true }) => {
  return (
    <div
      className={clsx(
        'widget-heading flex items-center gap-2.5 border-b border-neutral-200 p-4 xl:px-5 dark:border-neutral-700',
        className
      )}
    >
      {/* Title placeholder */}
      <div className="h-5 w-32 animate-pulse rounded bg-gray-400 dark:bg-neutral-800" />

      {/* Button placeholder */}
      {showButton && <div className="ms-auto h-5 w-20 animate-pulse rounded bg-gray-400 dark:bg-neutral-800" />}
    </div>
  )
}

export default WidgetHeadingSkeleton
