import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: string
  lang?: string
}

const Logo: React.FC<Props> = ({ className, lang }) => {
  return (
    <Link href={`/${lang}`} className={clsx('inline-block shrink-0', className)}>
      <Image
        src="/preface-logo.svg"
        alt="Preface Logo"
        width={157}
        height={51}
        className="block h-auto w-full"
        priority
      />
    </Link>
  )
}

export default Logo
