import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
  playing?: boolean
}

const NcPlayIcon: FC<Props> = ({ className, playing = false }) => {
  return (
    <div
      className={clsx(
        'size-20 rounded-full bg-white/30 p-3 backdrop-blur-sm backdrop-filter lg:size-52 lg:p-12',
        className
      )}
    >
      <div className="relative size-full rounded-full bg-white text-primary-500">
        <span className="absolute inset-0 flex items-center justify-center">
          <PlayIcon className={clsx('size-8 md:size-12 rtl:rotate-180', playing && 'hidden')} />
          <PauseIcon className={clsx('size-8 md:size-12 rtl:rotate-180', !playing && 'hidden')} />
        </span>
      </div>
    </div>
  )
}

export default NcPlayIcon
