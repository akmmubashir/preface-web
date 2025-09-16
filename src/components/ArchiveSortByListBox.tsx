'use client'

import { Link } from '@/shared/link'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { PreferenceHorizontalIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC, Fragment, Suspense, useCallback } from 'react'

type Props = {
  className?: string
  filterOptions: { name: string; value: string }[]
}

const ArchiveSortByListBoxComponent: FC<Props> = ({ className, filterOptions }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  let currentSortBy = searchParams.get('sort-by')
  if (!filterOptions.some((option) => option.value === currentSortBy)) {
    currentSortBy = filterOptions[0].value
  }

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

  return (
    <div className={clsx('archive-filter-list-box shrink-0', className)}>
      <Listbox value={currentSortBy}>
        <div className="relative">
          <ListboxButton className="rounded-full p-2 hover:bg-neutral-100 focus:outline-none dark:hover:bg-neutral-800">
            {/* <HugeiconsIcon icon={ArrangeByLettersAZIcon} size={24} className="text-neutral-700 dark:text-neutral-300" /> */}
            <HugeiconsIcon
              icon={PreferenceHorizontalIcon}
              size={28}
              stroke="currentColor"
              strokeWidth={2.5}
              className="text-[#00652E] dark:text-[#60A43A]"
            />
          </ListboxButton>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions className="absolute right-0 z-50 mt-2 max-h-60 w-52 overflow-auto rounded-xl bg-white py-1 text-sm text-neutral-900 shadow-lg ring-1 ring-black/5 focus:outline-hidden dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-700">
              {filterOptions.map((item) => (
                <ListboxOption
                  as={Link}
                  key={item.value}
                  className={({ focus: active }) =>
                    clsx(
                      'relative flex cursor-default py-2 ps-10 pe-4 select-none',
                      active && 'bg-primary-50 text-primary-700 dark:bg-neutral-700 dark:text-neutral-200'
                    )
                  }
                  value={item.value}
                  href={pathname + '?' + createQueryString('sort-by', item.value)}
                  scroll={false}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected && 'font-medium')}>{item.name}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-primary-700 dark:text-neutral-200">
                          <CheckIcon className="size-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default function ArchiveSortByListBox(props: Props) {
  return (
    <Suspense>
      <ArchiveSortByListBoxComponent {...props} />
    </Suspense>
  )
}
