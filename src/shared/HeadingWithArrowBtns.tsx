import { NextPrev } from '@/shared/NextPrev'
import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import HeadingWithSub, { HeadingWithSubProps } from './Heading'

interface Props
  extends HTMLAttributes<HTMLHeadingElement>,
    Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading' | 'level' | 'isCenter'> {
  hasNextPrev?: boolean
  onClickNext?: () => void
  onClickPrev?: () => void
  nextBtnDisabled?: boolean
  prevBtnDisabled?: boolean
}

const HeadingWithArrowBtns: React.FC<Props> = ({
  children,
  hasNextPrev = false,
  level,
  onClickNext,
  onClickPrev,
  nextBtnDisabled,
  prevBtnDisabled,
  subHeading,
  dimHeading,
  className,
}) => {
  return (
    <div className={clsx('relative mb-10 flex flex-wrap items-end gap-4', className)}>
      <HeadingWithSub className="mb-0!" level={level} subHeading={subHeading} dimHeading={dimHeading}>
        {children}
      </HeadingWithSub>
      {hasNextPrev && (
        <NextPrev
          className="ms-auto"
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          nextDisabled={nextBtnDisabled}
          prevDisabled={prevBtnDisabled}
        />
      )}
    </div>
  )
}

export default HeadingWithArrowBtns
