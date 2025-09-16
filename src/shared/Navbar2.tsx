'use client'

import CurrLangDropdown from '@/components/Header/CurrLangDropdown'
import { INFlag, SAFlag, USFlag } from '@/components/Header/FlagIcons'
import { CalendarIcon, HomeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface Navbar2Props {
  home?: boolean
  lang?: string
  dict?: any
}

const Navbar2: FC<Navbar2Props> = ({ home, lang, dict }) => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')

  // Language data with country flags
  const languages = [
    {
      id: 'English',
      name: 'English',
      description: 'United States',
      href: '#',
      active: true,
      code: 'en',
      FlagComponent: USFlag,
    },
    {
      id: 'Arabic',
      name: 'العربية',
      description: 'Saudi Arabia',
      href: '#',
      code: 'ar',
      FlagComponent: SAFlag,
    },
    {
      id: 'Malayalam',
      name: 'മലയാളം',
      description: 'India',
      href: '#',
      code: 'ml',
      FlagComponent: INFlag,
    },
  ]

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
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-577/310 w-144.25"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-577/310 w-144.25"
        />
      </div>

      <div className="flex flex-1 justify-end gap-1">
        {/* Home Icon */}
        <Link
          href="/"
          className={clsx(
            'flex items-center gap-x-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10',
            home ? 'text-[#fff] dark:text-[#fff]' : 'text-[#000000] dark:text-white'
          )}
          title="Home"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>

        {/* About Label */}
        <Link
          href="/about"
          className={clsx(
            `rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
              home ? 'text-[#fff] dark:text-[#fff]' : 'text-[#000000] dark:text-white'
            }`
          )}
        >
          {dict.navigation.about}
        </Link>

        {/* Language Dropdown - Fixed with higher z-index */}
        {/* <div className="relative z-50">
          <Popover>
            <PopoverButton
              className={clsx(
                'transition-color flex items-center gap-x-1 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap text-[#000000] focus:outline-none dark:text-white'
              )}
            >
              <activeLanguage.FlagComponent className="" />
              <span>{activeLanguage.name}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </PopoverButton>

            <PopoverPanel className="absolute right-0 z-50 mt-2 w-64 rounded-lg bg-white py-4 shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
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
        </div> */}

        <CurrLangDropdown languages={languages} home={home} lang={lang} />

        {/* Calendar with Date and Time */}
        <div
          className={clsx(
            'flex items-center gap-x-2 text-sm font-medium',
            home ? 'text-[#fff] dark:text-[#fff]' : 'text-[#000000] dark:text-white'
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
  )
}

export default Navbar2
