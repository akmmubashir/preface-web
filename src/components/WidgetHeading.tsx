import { Button } from '@/shared/Button'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  viewAll: {
    label: string
    href: string
    targetBlank?: boolean
  }
  title: string
}

const WidgetHeading: FC<Props> = ({ className, viewAll, title }) => {
  return (
    <div
      className={clsx(
        'widget-heading flex items-center gap-2.5 border-b border-neutral-200 p-4 xl:px-5 dark:border-neutral-700',
        className
      )}
    >
      <h2 className="font-semibold sm:text-lg/tight">{title}</h2>
      {!!viewAll.href && (
        <Button
          className="ms-auto"
          target={viewAll.targetBlank ? '_blank' : undefined}
          rel="noopener noreferrer"
          href={viewAll.href}
          plain
        >
          {viewAll.label}
          <ArrowUpRightIcon className="size-4" />
        </Button>
      )}
    </div>
  )
}

export default WidgetHeading
