'use client'

import { Button } from '@/shared/Button'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC, Suspense, useCallback } from 'react'

type Props = {
  className?: string
  tabs: { name: string; value: string; icon: IconSvgElement }[]
}

const ArchiveTabsComponent: FC<Props> = ({ className, tabs }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  let currentTab = searchParams.get('tab')
  if (!tabs.some((tab) => tab.value === currentTab)) {
    currentTab = tabs[0].value
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
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.value === currentTab
        return isActive ? (
          <Button color="dark/white" key={tab.value}>
            <HugeiconsIcon icon={tab.icon} size={20} />
            {tab.name}
          </Button>
        ) : (
          <Button outline key={tab.value} href={pathname + '?' + createQueryString('tab', tab.value)} scroll={false}>
            <HugeiconsIcon icon={tab.icon} size={20} />
            {tab.name}
          </Button>
        )
      })}
    </div>
  )
}

export default function ArchiveTabs(props: Props) {
  return (
    <Suspense>
      <ArchiveTabsComponent {...props} />
    </Suspense>
  )
}
