'use client'

import Card20 from '@/components/PostCards/Card20'
import { TNavigationItem } from '@/data/navigation'
import { TPost } from '@/data/posts'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ------------------------------- Utilities ------------------------------- */

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return isClient
}

type Point = { top: number; left: number }
type PanelSide = 'left' | 'right' | 'down'

const getRect = (el: HTMLElement | null) => el?.getBoundingClientRect()

/** Small delay so moving the cursor between trigger and panel doesn’t close it */
const useHoverIntent = (delay = 120) => {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | null>(null)

  const openNow = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(true)
  }, [])

  const closeLater = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), delay)
  }, [delay])

  const cancel = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  useEffect(() => () => cancel(), [cancel])

  return { open, setOpen, openNow, closeLater, cancel }
}

/* ------------------------------- Portal UI ------------------------------- */

const Portal: FC<{ children: ReactNode }> = ({ children }) => {
  const isClient = useIsClient()
  if (!isClient) return null
  return createPortal(children, document.body)
}

/** Floating panel positioned next to an anchor element (using fixed coords). */
const FloatingPanel: FC<{
  anchor: HTMLElement | null
  side: PanelSide
  gap?: number
  className?: string
  children: ReactNode
}> = ({ anchor, side, gap = 8, className, children }) => {
  const [pos, setPos] = useState<Point | null>(null)

  const update = useCallback(() => {
    if (!anchor) return
    const r = anchor.getBoundingClientRect()

    if (side === 'down') {
      setPos({ top: r.bottom + gap, left: r.left })
    } else if (side === 'right') {
      // default (LTR)
      setPos({ top: r.top, left: r.right + gap })
    } else if (side === 'left') {
      // RTL (Arabic) → submenu opens to the left of the anchor
      setPos({ top: r.top, left: r.left - gap })
    }
  }, [anchor, side, gap])

  useLayoutEffect(() => {
    update()
    const onScroll = () => update()
    const onResize = () => update()
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [update])

  if (!pos) return null

  return (
    <Portal>
      <div
        style={{ position: 'fixed', top: pos.top, left: pos.left }}
        className={clsx(
          // Very high z-index to stay above headers
          'z-[9999]',
          className
        )}
      >
        {children}
      </div>
    </Portal>
  )
}

/* ------------------------------ Basic Links ------------------------------ */

const MenuLink = ({ item, lang, level }: { item: TNavigationItem; lang?: string; level: number }) => {
  const href = lang && lang !== 'en' ? `/${lang}${item.href || '#'}` : item.href || '#'
  return (
    <Link
      href={href}
      className={clsx(
        'flex w-full items-center justify-between rounded-md px-4 py-2 font-normal',
        'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700',
        'dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        'break-words whitespace-normal' // <-- wrap long text
      )}
    >
      <span className="flex-1">{item.name}</span>
      {item.children?.length ? (
        level === 1 ? (
          <ChevronDownIcon
            className={`ms-auto h-4 w-4 text-neutral-500 ${lang === 'ar' ? 'rotate-90' : '-rotate-90'}`}
          />
        ) : (
          <ChevronRightIcon
            className={`ms-auto h-4 w-4 text-neutral-500 ${lang === 'ar' ? 'rotate-180' : 'rotate-0'}`}
          />
        )
      ) : null}
    </Link>
  )
}

/* ----------------------------- Top Level Item ---------------------------- */

const Lv1MenuItem = ({
  menuItem,
  isScrolled = false,
  isTransparentHeader,
  home,
  lang,
}: {
  menuItem: TNavigationItem
  isScrolled?: boolean
  isTransparentHeader?: boolean
  home?: boolean
  lang?: string
}) => {
  const href = lang && lang !== 'en' ? `/${lang}${menuItem.href}` : menuItem.href || '#'
  return (
    <Link
      className={clsx(
        'flex w-full items-center self-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap lg:text-[15px] xl:px-5',
        'hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        home
          ? isTransparentHeader
            ? 'text-[#fff] dark:text-[#fff]'
            : 'text-[#000000] dark:text-white'
          : 'text-[#000000] dark:text-white'
      )}
      href={href}
    >
      {menuItem.name}
      {menuItem.children?.length ? (
        <ChevronDownIcon
          className={clsx(
            'ms-2 size-4',
            isScrolled ? 'text-black' : 'text-white hover:text-black dark:hover:text-white'
          )}
        />
      ) : null}
    </Link>
  )
}

/* ------------------------------ Nested Menus ----------------------------- */

const NestedMenuList: FC<{
  items: TNavigationItem[]
  lang?: string
  level: number
}> = ({ items, lang, level }) => {
  return (
    <ul
      className={clsx(
        'relative grid space-y-1 rounded-lg bg-white py-3 text-sm shadow-lg',
        'ring-1 ring-black/5 dark:bg-[#0D0D0D] dark:ring-white/10',
        'max-h-[70vh] overflow-y-auto',
        level >= 3
          ? 'w-80 break-words whitespace-normal' // wider + allow wrapping for 3rd level+
          : 'w-56 overflow-x-hidden'
      )}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {items.map((item) => (
        <NestedMenuItem key={item.id} item={item} lang={lang} level={level} />
      ))}
    </ul>
  )
}

const NestedMenuItem: FC<{
  item: TNavigationItem
  lang?: string
  level: number
}> = ({ item, lang, level }) => {
  const liRef = useRef<HTMLLIElement | null>(null)
  const { open, openNow, closeLater, cancel } = useHoverIntent()

  const hasChildren = item.type === 'dropdown' && !!item.children?.length

  return (
    <li
      ref={liRef}
      className="relative px-2"
      onMouseEnter={hasChildren ? openNow : undefined}
      onMouseLeave={hasChildren ? closeLater : undefined}
    >
      <MenuLink item={item} lang={lang} level={level} />

      {/* Submenu in a portal so it’s never clipped by parent scroll */}
      {hasChildren && open && (
        <FloatingPanel
          anchor={liRef.current}
          side={lang === 'ar' ? 'left' : 'right'}
          gap={lang === 'ar' ? (level === 1 ? 250 : 330) : 8}
        >
          <div onMouseEnter={cancel} onMouseLeave={closeLater} className="w-56">
            <NestedMenuList items={item.children as TNavigationItem[]} lang={lang} level={level + 1} />
          </div>
        </FloatingPanel>
      )}
    </li>
  )
}

/* ------------------------------ Main Dropdown ---------------------------- */

const DropdownMenu = ({
  menuItem,
  isScrolled,
  home,
  isTransparentHeader,
  lang,
}: {
  menuItem: TNavigationItem
  isScrolled?: boolean
  home?: boolean
  isTransparentHeader?: boolean
  lang?: string
}) => {
  const liRef = useRef<HTMLLIElement | null>(null)
  const { open, openNow, closeLater, cancel } = useHoverIntent()

  return (
    <li ref={liRef} className="menu-dropdown relative menu-item flex" onMouseEnter={openNow} onMouseLeave={closeLater}>
      <Lv1MenuItem
        menuItem={menuItem}
        isScrolled={isScrolled}
        home={home}
        isTransparentHeader={isTransparentHeader}
        lang={lang}
      />

      {menuItem.children?.length && menuItem.type === 'dropdown' && open && (
        <FloatingPanel anchor={liRef.current} side="down" gap={6}>
          <div onMouseEnter={cancel} onMouseLeave={closeLater}>
            <NestedMenuList items={menuItem.children as TNavigationItem[]} lang={lang} level={1} />
          </div>
        </FloatingPanel>
      )}
    </li>
  )
}

/* -------------------------------- MegaMenu -------------------------------- */

const MegaMenu = ({
  menuItem,
  featuredPosts,
  isScrolled,
  lang,
}: {
  menuItem: TNavigationItem
  featuredPosts: TPost[]
  isScrolled?: boolean
  lang?: string
}) => {
  const renderNavlink = (item: TNavigationItem) => {
    const href = lang && lang !== 'en' ? `/${lang}${item.href || '#'}` : item.href || '#'
    return (
      <li key={item.id} className={clsx('menu-item', item.isNew && 'menuIsNew')}>
        <Link
          className="font-normal text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          href={href}
        >
          {item.name}
        </Link>
      </li>
    )
  }

  return (
    <li className="menu-megamenu relative menu-item flex">
      <Lv1MenuItem menuItem={menuItem} isScrolled={isScrolled} lang={lang} />

      {menuItem.children?.length && menuItem.type === 'mega-menu' ? (
        <div className="absolute inset-x-0 top-full z-50 sub-menu">
          <div className="bg-white shadow-lg dark:bg-[#0D0D0D]">
            <div className="container">
              <div className="flex border-t border-neutral-200 py-11 text-sm dark:border-neutral-700">
                <div className="grid flex-1 grid-cols-4 gap-6 pe-10 xl:gap-8 2xl:pe-14">
                  {menuItem.children?.map((menuChild, index) => (
                    <div key={index}>
                      <p className="font-medium text-neutral-900 dark:text-neutral-200">{menuChild.name}</p>
                      <ul className="mt-4 grid space-y-1" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                        {menuChild.children?.map(renderNavlink)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="grid w-2/7 grid-cols-1 gap-5 xl:w-4/9 xl:grid-cols-2">
                  {featuredPosts.map((post, index) => (
                    <Card20 key={post.id} post={post} className={clsx(index === 0 ? '' : 'hidden xl:block')} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}

/* ------------------------------- Navigation ------------------------------- */

export interface Props {
  menu: TNavigationItem[]
  className?: string
  featuredPosts: TPost[]
  isScrolled?: boolean
  isTransparentHeader?: boolean
  home?: boolean
  lang?: string
}

const Navigation: FC<Props> = ({ menu, className, featuredPosts, isScrolled, isTransparentHeader, home, lang }) => {
  return (
    <ul className={clsx('flex', className)} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {menu.map((menuItem) => {
        if (menuItem.type === 'dropdown') {
          return (
            <DropdownMenu
              key={`nav-${menuItem.id}`}
              menuItem={menuItem}
              isScrolled={isScrolled}
              home={home}
              isTransparentHeader={isTransparentHeader}
              lang={lang}
            />
          )
        }
        if (menuItem.type === 'mega-menu') {
          return (
            <MegaMenu
              featuredPosts={featuredPosts}
              key={`mega-${menuItem.id}`}
              menuItem={menuItem}
              isScrolled={isScrolled}
              lang={lang}
            />
          )
        }
        return (
          <li key={`item-${menuItem.id}`} className="relative menu-item flex">
            <Lv1MenuItem
              menuItem={menuItem}
              isScrolled={isScrolled}
              isTransparentHeader={isTransparentHeader}
              home={home}
              lang={lang}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
