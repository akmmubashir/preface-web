'use client'
import { TNavigationItem } from '@/data/navigation'
import { TPost } from '@/data/posts'
import Logo from '@/shared/Logo'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC } from 'react'
import SignInButton from '../SignInButton'
import AvatarDropdown from './AvatarDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import AskScholarButton from './Navigation/AskScholarButton'
import Navigation from './Navigation/Navigation'
import SearchModal from './SearchModal'

interface Props {
  bottomBorder?: boolean
  className?: string
  isTransparentHeader?: boolean
  home?: boolean
  lang?: string
  dict?: any
}

interface Header2Props extends Props {
  navigationMenu: TNavigationItem[]
  featuredPosts: TPost[]
}

const Header2: FC<Header2Props> = ({
  bottomBorder,
  className,
  navigationMenu,
  featuredPosts,
  isTransparentHeader,
  home,
  lang,
  dict,
}) => {
  return (
    <div className={clsx('header-2', className)} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo lang={lang} />
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <div className="flex items-center gap-x-2">
            <Navigation
              lang={lang}
              menu={navigationMenu}
              featuredPosts={featuredPosts}
              isTransparentHeader={isTransparentHeader}
              home={home}
            />
            <AskScholarButton home={home} isTransparentHeader={isTransparentHeader} dict={dict} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-1">
          <SignInButton dict={dict} />
          <SearchModal type="type1" isTransparentHeader={isTransparentHeader} home={home} />
          <AvatarDropdown
            trigger={
              <button
                type="button"
                aria-label="Settings"
                className="flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-200 focus:ring-2 focus:outline-none"
              >
                <Cog6ToothIcon
                  className={clsx(
                    `h-6 w-6 transition-colors duration-200 ${
                      home
                        ? isTransparentHeader
                          ? 'text-[#fff] dark:text-[#fff]'
                          : 'text-[#000000] dark:text-white'
                        : 'text-[#000000] dark:text-white'
                    }`
                  )}
                  aria-hidden="true"
                />
              </button>
            }
          />
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header2
