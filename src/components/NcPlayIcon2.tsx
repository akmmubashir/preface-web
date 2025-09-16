import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  iconClass?: string
  playing?: boolean
}

const NcPlayIcon2: FC<Props> = ({ className = 'size-8 md:size-10', iconClass = 'size-6', playing = false }) => {
  return (
    <div className={clsx('relative rounded-full bg-white shadow-inner', className)}>
      <span className="absolute inset-0 flex items-center justify-center text-primary-500">
        <PlayIcon className={clsx(iconClass, 'ms-px rtl:rotate-180', playing && 'hidden')} />
        <PauseIcon className={clsx(iconClass, 'ms-px rtl:rotate-180', !playing && 'hidden')} />
      </span>
    </div>
  )
}

export default NcPlayIcon2
