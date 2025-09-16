'use client'

import { getNavMegaMenu, TNavigationItem } from '@/data/navigation'
import { getAllPosts, TPost } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import AvatarDropdown from './AvatarDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import MegaMenuPopover from './MegaMenuPopover'
import NotifyDropdown from './NotifyDropdown'
import SearchModal from './SearchModal'

interface HeaderWithScrollProps {
  bottomBorder?: boolean
  className?: string
}

const HeaderWithScroll: FC<HeaderWithScrollProps> = ({ bottomBorder, className }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [megamenu, setMegamenu] = useState<TNavigationItem>({})
  const [featuredPosts, setFeaturedPosts] = useState<TPost[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
    }

    // Set initial values
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Fetch data on client side
    const fetchData = async () => {
      try {
        const [megamenuData, postsData] = await Promise.all([getNavMegaMenu(), getAllPosts()])
        setMegamenu(megamenuData)
        setFeaturedPosts(postsData.slice(0, 2))
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/95'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container">
        <div
          className={clsx(
            'flex h-20 justify-between gap-x-2.5',
            isScrolled && 'border-neutral-200 dark:border-neutral-700',
            bottomBorder && 'border-b',
            !bottomBorder && 'has-[.header-popover-full-panel]:border-b'
          )}
        >
          <div className="flex items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
            <div className={clsx('transition-all duration-300', isScrolled ? '' : 'text-white')}>
              <Logo />
            </div>
            <div
              className={clsx(
                'h-8 border-l',
                isScrolled ? 'border-neutral-200 dark:border-neutral-700' : 'border-white/20'
              )}
            ></div>
            <div className="max-w-xs md:w-60 xl:w-72">
              <div className={clsx('transition-all duration-300', isScrolled ? '' : 'text-white')}>
                <SearchModal type="type2" />
              </div>
            </div>
          </div>

          <div className="ms-auto flex items-center justify-end gap-x-0.5">
            <MegaMenuPopover megamenu={megamenu} featuredPosts={featuredPosts} className="hidden lg:block" />
            <div
              className={clsx(
                'ms-6 me-3 hidden h-8 border-l lg:block',
                isScrolled ? 'border-neutral-200 dark:border-neutral-700' : 'border-white/20'
              )}
            ></div>
            <div className="hidden sm:block">
              <Button
                className={clsx(
                  'h-10 px-3! transition-all duration-300',
                  isScrolled ? '' : 'text-white hover:bg-white/10'
                )}
                href={'/submission'}
                plain
              >
                <PlusIcon className="size-5!" />
                Create
              </Button>
            </div>
            <NotifyDropdown className="me-3" />
            <AvatarDropdown />
            <div className="ms-2.5 flex lg:hidden">
              <HamburgerBtnMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderWithScroll
