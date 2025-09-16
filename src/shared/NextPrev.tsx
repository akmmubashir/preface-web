'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React, { FC } from 'react'

interface Props {
  className?: string
  currentPage?: number
  totalPage?: number
  btnClassName?: string
  onClickNext?: () => void
  onClickPrev?: () => void
  onlyNext?: boolean
  onlyPrev?: boolean
  nextDisabled?: boolean
  prevDisabled?: boolean
}

const NextPrev: FC<Props> = ({
  className,
  onClickNext,
  onClickPrev,
  btnClassName = 'size-11',
  onlyNext = false,
  onlyPrev = false,
  nextDisabled = false,
  prevDisabled = false,
}) => {
  const [focus, setFocus] = React.useState<'left' | 'right'>('right')

  return (
    <div className={clsx('relative flex items-center text-neutral-500 dark:text-neutral-400', className)}>
      {!onlyNext && (
        <button
          className={clsx(
            'flex items-center justify-center rounded-full border-neutral-200 disabled:cursor-not-allowed dark:border-neutral-600',
            !onlyPrev && 'me-2',
            focus === 'left' && 'border-2',
            btnClassName
          )}
          onClick={onClickPrev}
          onMouseEnter={() => setFocus('left')}
          disabled={prevDisabled}
          aria-disabled={prevDisabled}
          aria-label="Prev"
        >
          <ArrowLeftIcon className="size-5 rtl:rotate-180" />
        </button>
      )}
      {!onlyPrev && (
        <button
          className={clsx(
            'flex items-center justify-center rounded-full border-neutral-200 disabled:cursor-not-allowed dark:border-neutral-600',
            focus === 'right' && 'border-2',
            btnClassName
          )}
          onClick={onClickNext}
          onMouseEnter={() => setFocus('right')}
          disabled={nextDisabled}
          aria-disabled={nextDisabled}
          aria-label="Next"
        >
          <ArrowRightIcon className="size-5 rtl:rotate-180" />
        </button>
      )}
    </div>
  )
}

interface NextProps {
  btnClassName?: string
  className?: string
  svgSize?: string
  onClickNext?: () => void
  disabled?: boolean
}

const Next: FC<NextProps> = ({
  className = 'relative',
  onClickNext,
  btnClassName = 'size-10',
  svgSize = 'size-5',
  disabled = false,
}) => {
  return (
    <div className={`nc-Next text-neutral-500 dark:text-neutral-400 ${className}`}>
      <button
        className={clsx(
          'flex items-center justify-center rounded-full border-2 border-transparent hover:border-neutral-200 dark:hover:border-neutral-600',
          btnClassName
        )}
        onClick={onClickNext}
        title="Next"
        disabled={disabled}
      >
        <ArrowRightIcon className={clsx(svgSize, 'rtl:rotate-180')} />
      </button>
    </div>
  )
}

interface PrevProps {
  btnClassName?: string
  className?: string
  svgSize?: string
  onClickPrev?: () => void
  disabled?: boolean
}

const Prev: FC<PrevProps> = ({
  className = 'relative',
  onClickPrev,
  btnClassName = 'size-10',
  svgSize = 'size-5',
  disabled = false,
}) => {
  return (
    <div className={`nc-Prev text-neutral-500 dark:text-neutral-400 ${className}`}>
      <button
        className={clsx(
          'flex items-center justify-center rounded-full border-2 border-transparent hover:border-neutral-200 dark:hover:border-neutral-600',
          btnClassName
        )}
        onClick={onClickPrev}
        title="Prev"
        disabled={disabled}
      >
        <ArrowLeftIcon className={clsx(svgSize, 'rtl:rotate-180')} />
      </button>
    </div>
  )
}

export { Next, NextPrev, Prev }
