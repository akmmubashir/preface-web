'use client'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

interface SwitchDarkMode2Props {
  className?: string
}
const SwitchDarkMode2: React.FC<SwitchDarkMode2Props> = ({ className }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={clsx('inline-flex', className)}>
      <span className="sr-only">Enable dark mode</span>
      <Switch
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`${
          theme === 'dark' ? 'bg-teal-900' : 'bg-teal-600'
        } relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75`}
      >
        <span className="sr-only">Enable dark mode</span>
        <span
          aria-hidden="true"
          className={`${
            theme === 'dark' ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

export default SwitchDarkMode2
