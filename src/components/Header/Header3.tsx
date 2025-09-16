import { getNavigation } from '@/data/navigation'
import { getAllPosts } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC } from 'react'
import AvatarDropdown from './AvatarDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import Navigation from './Navigation/Navigation'
import NotifyDropdown from './NotifyDropdown'
import SearchModal from './SearchModal'

interface Props {
  bottomBorder?: boolean
  className?: string
}

const Header3: FC<Props> = async ({ bottomBorder, className }) => {
  const navigationMenu = await getNavigation()
  const featuredPosts = (await getAllPosts()).slice(0, 2)

  return (
    <div
      className={clsx(
        'header-3 sticky top-0 z-50 border-neutral-200 bg-transparent/70 backdrop-blur dark:border-neutral-700',
        bottomBorder && 'border-b',
        !bottomBorder && 'has-[.header-popover-full-panel]:border-b',
        className
      )}
    >
      <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo />
          <div className="h-8 border-l"></div>
          <div className="-ms-1.5">
            <SearchModal type="type1" />
          </div>
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <Navigation menu={navigationMenu} featuredPosts={featuredPosts} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-0.5">
          <div className="hidden sm:block">
            <Button className="h-10 px-3!" href={'/submission'} plain>
              <PlusIcon className="size-5!" />
              Create
            </Button>
          </div>
          <NotifyDropdown className="me-3" />
          <AvatarDropdown />
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header3
