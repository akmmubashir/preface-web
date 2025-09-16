'use client'

import { FC } from 'react'

interface Props {
  date: string
  className?: string
  options?: Intl.DateTimeFormatOptions
}

const LocalDate: FC<Props> = ({ date, className, options = { month: 'short', day: 'numeric', year: 'numeric' } }) => {
  return (
    <time dateTime={date} className={className}>
      {new Date(date).toLocaleDateString('en-US', options)}
    </time>
  )
}

export default LocalDate
