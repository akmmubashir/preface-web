'use client'

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/shared/Pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'

interface Props {
  totalPages?: number
  className?: string
}

function PaginationComponent({ totalPages = 10, className }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  // const currentPage = Number(searchParams.get('page')) || 1
  // for demo purpose, we set currentPage to 2
  const currentPage = 2

  return (
    <Pagination className={className}>
      <PaginationPrevious
        href={currentPage > 1 ? pathname + '?' + createQueryString('page', (currentPage - 1).toString()) : null}
      />
      <PaginationList>
        <PaginationPage href={pathname + '?' + createQueryString('page', '1')}>1</PaginationPage>
        <PaginationPage current href={pathname + '?' + createQueryString('page', '2')}>
          2
        </PaginationPage>
        <PaginationPage href={pathname + '?' + createQueryString('page', '3')}>3</PaginationPage>
        <PaginationGap />
        <PaginationPage href={pathname + '?' + createQueryString('page', '15')}>15</PaginationPage>
        <PaginationPage href={pathname + '?' + createQueryString('page', '16')}>16</PaginationPage>
      </PaginationList>
      <PaginationNext
        href={
          currentPage < totalPages ? pathname + '?' + createQueryString('page', (currentPage + 1).toString()) : null
        }
      />
    </Pagination>
  )
}

export default function PaginationWrapper(props: Props) {
  return (
    <Suspense>
      <PaginationComponent {...props} />
    </Suspense>
  )
}
