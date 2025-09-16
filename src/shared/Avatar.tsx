import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import React, { forwardRef } from 'react'
import { TouchTarget } from './Button'
import { Link } from './link'

type AvatarProps = {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
  sizes?: string
  width?: number
  height?: number
}

export default function Avatar({
  src,
  square = false,
  initials,
  alt = '',
  className,
  sizes = '100px',
  width = 100,
  height = 100,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        // Basic layout
        'inline-grid shrink-0 bg-neutral-200 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1 dark:bg-neutral-800',
        // Border radius
        square ? 'rounded-(--avatar-radius) *:rounded-(--avatar-radius)' : 'rounded-full *:rounded-full'
      )}
    >
      {initials && (
        <svg
          className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : 'true'}
        >
          {alt && <title>{alt}</title>}
          <text x="50%" y="50%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em">
            {initials}
          </text>
        </svg>
      )}
      {src && (
        <Image className="aspect-square object-cover" src={src} alt={alt} width={width} height={height} sizes={sizes} />
      )}
    </span>
  )
}

export const AvatarButton = forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    ...props
  }: AvatarProps &
    (Omit<Headless.ButtonProps, 'as' | 'className'> | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>),
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    square ? 'rounded-[20%]' : 'rounded-full',
    'inline-grid focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500'
  )

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Headless.Button>
  )
})
