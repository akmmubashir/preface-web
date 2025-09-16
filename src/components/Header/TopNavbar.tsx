'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { CalendarIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { INFlag, SAFlag, USFlag } from './FlagIcons'

// Language data with country flags
const languages = [
  {
    id: 'English',
    name: 'English',
    description: 'United States',
    href: '#',
    active: true,
    FlagComponent: USFlag,
  },
  {
    id: 'Arabic',
    name: 'العربية',
    description: 'Saudi Arabia',
    href: '#',
    FlagComponent: SAFlag,
  },
  {
    id: 'Malayalam',
    name: 'മലയാളം',
    description: 'India',
    href: '#',
    FlagComponent: INFlag,
  },
]

interface TopNavbarProps {
  isScrolled?: boolean
  className?: string
}

const TopNavbar: FC<TopNavbarProps> = ({ isScrolled, className }) => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')

  // Update time and date
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      // Format time (e.g., "11:31 AM")
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })

      // Format date (e.g., "06/07/2025")
      const dateStr = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })

      setCurrentTime(timeStr)
      setCurrentDate(dateStr)
    }

    // Update immediately
    updateDateTime()

    // Update every minute
    const interval = setInterval(updateDateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const activeLanguage = languages.find((lang) => lang.active) || languages[0]

  return (
    <div
      className={clsx(
        'top-navbar fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-neutral-200 bg-white/95 text-neutral-900 backdrop-blur-sm dark:border-neutral-700 dark:bg-[#0A0A0A] dark:text-neutral-100'
          : 'border-transparent bg-transparent text-white',
        className
      )}
    >
      <div className="container">
        <div className="flex h-12 items-center justify-start md:justify-end">
          {/* Home Icon */}
          <Link
            href="/"
            className={clsx(
              'flex items-center gap-x-1 rounded-full px-3 py-2 text-sm font-medium transition-colors',
              isScrolled
                ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            )}
            title="Home"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>

          {/* About Label */}
          <Link
            href="/about"
            className={clsx(
              'rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
              isScrolled
                ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            )}
          >
            About
          </Link>

          {/* Language Dropdown */}
          <Popover className="relative">
            <PopoverButton
              className={clsx(
                'flex items-center gap-x-1 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors focus:outline-hidden',
                isScrolled
                  ? 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              )}
            >
              <activeLanguage.FlagComponent className="" />
              <span>{activeLanguage.name}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </PopoverButton>

            <PopoverPanel className="absolute right-0 z-20 mt-2 w-64 rounded-lg bg-white py-4 shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
              <div className="space-y-1">
                {languages.map((language) => (
                  <Link
                    key={language.id}
                    href={language.href}
                    className={clsx(
                      'mx-2 flex items-center gap-x-3 rounded-md px-4 py-2 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
                      language.active
                        ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                        : 'font-normal text-neutral-600 dark:text-neutral-300'
                    )}
                  >
                    <language.FlagComponent className="" />
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{language.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {/* Calendar with Date and Time */}
          <div
            className={clsx(
              'flex items-center gap-x-2 text-sm font-medium',
              isScrolled ? 'text-neutral-700 dark:text-neutral-300' : 'text-white/90'
            )}
          >
            <CalendarIcon className="h-5 w-5" />
            <div className="flex flex-col leading-none">
              <span className="text-xs">{currentDate}</span>
              <span className="text-xs font-normal">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNavbar
