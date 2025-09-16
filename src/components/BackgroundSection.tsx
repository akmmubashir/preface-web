import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
}

const BackgroundSection: FC<Props> = ({ className = 'bg-[#F3F4F6] dark:bg-[#0D0D0D]' }) => {
  return (
    <div
      className={clsx(
        'background-section absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-(--breakpoint-2xl)',
        className
      )}
    >
      <span className="sr-only hidden">section background</span>
    </div>
  )
}

export default BackgroundSection
