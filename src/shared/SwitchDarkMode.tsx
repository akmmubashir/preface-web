'use client'

import { ThemeContext } from '@/app/theme-provider'
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import React, { useContext } from 'react'
interface Props {
  className?: string
  iconSize?: string
}
const SwitchDarkMode: React.FC<Props> = ({ className, iconSize = 'size-7' }) => {
  const theme = useContext(ThemeContext)

  return (
    <button
      onClick={theme?.toggleDarkMode}
      className={clsx(
        'flex size-12 items-center justify-center self-center rounded-full text-2xl text-neutral-700 hover:bg-neutral-100 focus:outline-hidden md:text-3xl dark:text-neutral-300 dark:hover:bg-neutral-800',
        className
      )}
    >
      <span className="sr-only">Enable dark mode</span>
      {theme?.isDarkMode ? (
        <HugeiconsIcon icon={Sun03Icon} className={iconSize} />
      ) : (
        <HugeiconsIcon icon={Moon02Icon} className={iconSize} />
      )}
    </button>
  )
}

export default SwitchDarkMode
