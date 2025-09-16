import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { TouchTarget } from './Button'
import { Link } from './link'

const colors = {
  red: 'bg-red-50 text-red-700',
  orange: 'bg-orange-50 text-orange-700',
  amber: 'bg-amber-50 text-amber-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  lime: 'bg-lime-50 text-lime-700',
  green: 'bg-green-50 text-green-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  teal: 'bg-teal-50 text-teal-700',
  cyan: 'bg-cyan-50 text-cyan-700',
  sky: 'bg-sky-50 text-sky-700',
  blue: 'bg-blue-50 text-blue-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  violet: 'bg-violet-50 text-violet-700',
  rose: 'bg-rose-50 text-rose-700',
  zinc: 'bg-neutral-50 text-neutral-700',
}

type BadgeProps = {
  color?: keyof typeof colors
  index?: number
  dualColor?: boolean
  yellowColor?: boolean
}

export function Badge({
  color = 'zinc',
  className,
  index,
  dualColor,
  yellowColor,
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'span'>) {
  console.log(index, 'badge index iss ss s ')
  console.log(dualColor, 'dualColor index iss ss s ')

  return (
    <span
      {...props}
      className={clsx(
        className,
        'inline-flex items-center gap-x-1.5 rounded-full bg-[#B2F0CE] px-2.5 py-0.5 text-[10px] text-[#00652E] forced-colors:outline',
        yellowColor ? 'bg-[#EAF482]' : 'bg-[#B2F0CE]',
        dualColor && (index !== undefined && (index + 1) % 2 === 0 ? 'bg-[#EAF482]' : 'bg-[#B2F0CE]')
      )}
    />
  )
}

export const BadgeButton = forwardRef(function BadgeButton(
  {
    color = 'zinc',
    className,
    children,
    index,
    dualColor,
    yellowColor,
    ...props
  }: BadgeProps & { className?: string; children: React.ReactNode } & (
      | Omit<Headless.ButtonProps, 'as' | 'className'>
      | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
    ),
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    'group relative inline-flex rounded-full focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500'
  )
  // console.log(index,"badge2button index iss ss s ");

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Badge color={color} index={index} dualColor={dualColor} yellowColor={yellowColor}>
          {children}
        </Badge>
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color} index={index} dualColor={dualColor} yellowColor={yellowColor}>
          {children}
        </Badge>
      </TouchTarget>
    </Headless.Button>
  )
})
