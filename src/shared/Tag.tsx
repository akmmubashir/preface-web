import React, { FC } from 'react'
import { Link } from './link'

interface Props {
  className?: string
  children?: React.ReactNode
  href?: string
}

const Tag: FC<Props> = ({ className, children, href }) => {
  return (
    <Link
      className={`nc-tag inline-block rounded-lg border bg-white px-3 py-2 text-sm md:px-4 md:py-2.5 dark:bg-white/5 ${className}`}
      href={href || '#'}
    >
      #{children}
    </Link>
  )
}

export default Tag
