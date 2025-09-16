'use client'
import Header2 from '@/components/Header/Header2'
import { TNavigationItem } from '@/data/navigation'
import { TPost } from '@/data/posts'
import Navbar2 from '@/shared/Navbar2'
import React, { useEffect, useState } from 'react'

type Props = {
  lang?: string
  dict?: any
  navigationMenu: TNavigationItem[]
  featuredPosts: TPost[]
}

const HomeHeader = ({ lang, dict, navigationMenu, featuredPosts }: Props) => {
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Always show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true)
        setScrolled(false)
        return
      }

      // Scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <React.Fragment>
      <div
        className={`fixed top-0 z-30 w-full transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container">
          <Navbar2 home={true} lang={lang} dict={dict} />
        </div>
      </div>
      <Header2
        className={`z-40 w-full transition-all duration-300 ${
          scrolled ? 'fixed top-0 bg-white shadow-md dark:bg-black' : 'fixed top-[60px]'
        }`}
        isTransparentHeader={!scrolled}
        navigationMenu={navigationMenu}
        featuredPosts={featuredPosts}
        home={true}
        lang={lang}
        dict={dict}
      />
    </React.Fragment>
  )
}

export default HomeHeader
