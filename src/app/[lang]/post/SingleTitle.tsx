import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  title: string
  className?: string
}

const SingleTitle: FC<Props> = ({ className, title }) => {
  return (
    <h1
      className={clsx(
        className,
        'max-w-4xl text-2xl/tight font-semibold tracking-tight text-pretty md:text-3xl/tight lg:text-[2rem]/tight'
      )}
      title={title}
    >
      {title}
    </h1>
  )
}

export default SingleTitle
