'use client'

import { TNavigationItem, getNavigation as fetchNavigation } from '@/data/navigation'
import { useEffect, useState } from 'react'
import SidebarNavigation from './Header/Navigation/SidebarNavigation'
import Aside from './aside'

interface Props {
  className?: string
}

const AsideSidebarNavigation = ({ className }: Props) => {
  const [navigationMenu, setNavigationMenu] = useState<TNavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const navData = await fetchNavigation()
        setNavigationMenu(navData)
      } catch (error) {
        console.error('Error fetching navigation:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNavigation()
  }, [])

  if (isLoading) {
    return null // or return a loading spinner
  }

  return (
    <Aside openFrom="right" type="sidebar-navigation" logoOnHeading contentMaxWidthClassName="max-w-md">
      <div className="flex h-full flex-col">
        <div className="hidden-scrollbar flex-1 overflow-x-hidden overflow-y-auto py-6">
          <SidebarNavigation data={navigationMenu} />
        </div>
      </div>
    </Aside>
  )
}

export default AsideSidebarNavigation
