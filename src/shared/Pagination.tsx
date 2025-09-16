import { useAuth } from '@/contexts/AuthContext'
import { useMarkPostRead } from '@/hooks/api'
import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import type React from 'react'
import { Button } from './Button'

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav aria-label={ariaLabel} {...props} className={clsx(className, 'flex gap-x-2')} />
}

export function PaginationPrevious({
  href = null,
  className,
  children = 'Previous Page',
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={clsx(className, 'grow basis-0')}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        className="rounded-full !border !border-[#C7C7C7] !text-sm !font-normal !text-[#999999] hover:!text-neutral-700"
        plain
        aria-label="Previous page"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} size={16} className="rtl:rotate-180" />

        {children}
      </Button>
    </span>
  )
}

export function PaginationNext({
  href = null,
  className,
  children = 'Next Page',
  postId,
}: React.PropsWithChildren<{
  href?: string | null
  className?: string
  postId?: string
}>) {
  const { isAuthenticated } = useAuth()
  const markAsRead = useMarkPostRead()

  const handleClick = (e: React.MouseEvent) => {
    if (postId && isAuthenticated) {
      markAsRead.mutate(postId)
    }
    // Continue with normal navigation
    if (href === null) {
      e.preventDefault()
    }
  }

  return (
    <span className={clsx(className, 'flex grow basis-0 justify-end')}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        onClick={handleClick}
        className="rounded-full !border !border-[#60A43A] !text-sm !font-normal !text-[#60A43A] hover:!border-[#00652E] hover:!bg-[#00652E] hover:!text-white"
        plain
        aria-label="Next page"
      >
        {children}
        <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="rtl:rotate-180" />
      </Button>
    </span>
  )
}

export function PaginationList({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')} />
}

export function PaginationPage({
  href,
  className,
  current = false,
  children,
}: React.PropsWithChildren<{
  href: string
  className?: string
  current?: boolean
}>) {
  return (
    <Button
      href={href}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      className={clsx(
        className,
        'min-w-[2.25rem] rounded-lg before:absolute before:-inset-px before:rounded-lg',
        current && 'before:bg-neutral-950/5 dark:before:bg-white/10'
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  )
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        'w-[2.25rem] text-center text-sm/6 font-semibold text-neutral-950 select-none dark:text-white'
      )}
    >
      {children}
    </span>
  )
}
