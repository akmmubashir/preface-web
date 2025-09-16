'use client'

import { createContext, useCallback, useEffect, useState } from 'react'

interface ThemeContextValue {
  isDarkMode: boolean
  toggleDarkMode: () => void
  themeDir: 'rtl' | 'ltr'
  setThemeDir: (value: 'rtl' | 'ltr') => void
  isForcedDarkMode?: boolean
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
  forceDarkMode?: boolean
}

export default function ThemeProvider({ children, forceDarkMode = false }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(forceDarkMode)
  const [themeDir, setThemeDir] = useState<'rtl' | 'ltr'>('ltr')

  // themeMode
  useEffect(() => {
    if (forceDarkMode) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
      return
    }

    if (localStorage.getItem('theme') === 'dark-mode') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [forceDarkMode])

  // themeDir
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.getAttribute('dir') === 'rtl' ? setThemeDir('rtl') : setThemeDir('ltr')
    }
  }, [])

  // Update themeDir when it changes
  // This ensures that the document's direction is set correctly
  // when the themeDir state changes.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', themeDir)
    }
  }, [themeDir])

  // toggleDarkMode
  // This function toggles the dark mode state and updates the localStorage
  // and the HTML class accordingly
  const toggleDarkMode = useCallback((): void => {
    if (localStorage.getItem('theme') === 'light-mode') {
      setIsDarkMode(true)
      const root = document.querySelector('html')
      if (root && !root.classList.contains('dark')) {
        root.classList.add('dark')
      }
      localStorage.setItem('theme', 'dark-mode')
    } else {
      setIsDarkMode(false)
      const root = document.querySelector('html')
      if (root) {
        root.classList.remove('dark')
      }
      localStorage.setItem('theme', 'light-mode')
    }
  }, [])

  //
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: forceDarkMode ? true : isDarkMode,
        toggleDarkMode: forceDarkMode ? () => {} : toggleDarkMode,
        themeDir,
        setThemeDir,
        isForcedDarkMode: forceDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
