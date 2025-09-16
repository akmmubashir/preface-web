'use client'

import NotifyDropdown from '@/components/Header/NotifyDropdown'
import Avatar from '@/shared/Avatar'
import Logo from '@/shared/Logo'
import { Divider } from '@/shared/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/shared/dropdown'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Posts', href: '/dashboard/posts' },
  { name: 'Settings', href: '/dashboard/edit-profile' },
  { name: 'Subscription', href: '/dashboard/subscription' },
  { name: 'Billing', href: '/dashboard/billing-address' },
  { name: 'Submit post', href: '/submission' },
]
const userNavigation = [
  { name: 'Your Profile', href: '/dashboard/posts' },
  { name: 'Settings', href: '/dashboard/edit-profile' },
  { name: 'Sign out', href: '#' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const pageTitle = navigation.find((item) => isActive(item.href))?.name ?? 'Dashboard'

  return (
    <>
      <div className="min-h-screen">
        <Disclosure as="nav">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <Logo size="size-10" />
                </div>
                <div className="hidden sm:-my-px sm:ms-6 sm:flex sm:gap-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={clsx(
                        isActive(item.href)
                          ? 'border-primary-500'
                          : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-200',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden gap-x-4 sm:ms-6 sm:flex sm:items-center">
                <NotifyDropdown />

                {/* Profile dropdown */}
                <Dropdown>
                  <DropdownButton as={'button'} className="rounded-full">
                    <Avatar alt="avatar" src={user.imageUrl} className="size-8" width={32} height={32} sizes="32px" />
                  </DropdownButton>
                  <DropdownMenu>
                    {userNavigation.map((item) => (
                      <DropdownItem key={item.name} href={item.href}>
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="-me-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-hidden dark:bg-neutral-900">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>

            <Divider />
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={clsx(
                    isActive(item.href)
                      ? 'border-primary-500 bg-neutral-50 dark:bg-white/10'
                      : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200',
                    'block border-s-4 py-2 ps-3 pe-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-4 pb-3 dark:border-neutral-700">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <Avatar src={user.imageUrl} className="size-10" width={40} height={40} sizes="40px" />
                </div>
                <div className="ms-3">
                  <div className="text-base font-medium">{user.name}</div>
                  <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ms-auto shrink-0 rounded-full bg-white p-1 text-neutral-400 hover:text-neutral-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-hidden dark:bg-neutral-900"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div className="py-12">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
