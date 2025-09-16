'use client'

import { Pagination, PaginationNext, PaginationPrevious } from '@/shared/Pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'

interface Props {
  totalPages?: number
  className?: string
  post?: any
}

function PaginationComponent({ totalPages = 10, className, post }: Props) {
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
    <div className="w-full">
      <Pagination className="!flex !justify-start gap-4">
        <PaginationPrevious
          className="!grow-0 !basis-auto"
          href={currentPage > 1 ? pathname + '?' + createQueryString('page', (currentPage - 1).toString()) : null}
        />
        <PaginationNext
          className="!grow-0 !basis-auto"
          href={
            currentPage < totalPages ? pathname + '?' + createQueryString('page', (currentPage + 1).toString()) : null
          }
          postId={post?._id}
        />
      </Pagination>
    </div>
  )
}

export default function PaginationWrapper2(props: Props) {
  return (
    <Suspense>
      <PaginationComponent {...props} />
    </Suspense>
  )
}
