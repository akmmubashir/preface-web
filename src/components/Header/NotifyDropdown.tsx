'use client'

import ButtonCircle from '@/shared/ButtonCircle'
import { CloseButton, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Notification02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const _defaultNotifications = [
  {
    name: 'John Doe',
    description: 'Measure actions your users take',
    time: '3 minutes ago',
    href: '#',
    avatar:
      'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Jane Smith',
    description: 'Create your own targeted content',
    time: '1 minute ago',
    href: '#',
    avatar:
      'https://images.unsplash.com/photo-1736194689767-9e3c4e7bd7f6?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Alice Johnson',
    description: 'Keep track of your growth',
    time: '3 minutes ago',
    href: '#',
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

interface Props {
  className?: string
  notifications?: typeof _defaultNotifications
}

const NotifyDropdown: FC<Props> = ({ className = '', notifications = _defaultNotifications }) => {
  return (
    <Popover className={className}>
      <>
        <PopoverButton as={ButtonCircle} className="relative" color="light" plain>
          <span className="absolute end-0 top-px size-2.5 rounded-full bg-primary-500"></span>
          <HugeiconsIcon icon={Notification02Icon} size={24} />
        </PopoverButton>

        <PopoverPanel
          transition
          anchor={{
            to: 'bottom end',
            gap: 16,
          }}
          className="z-40 w-sm rounded-3xl shadow-lg ring-1 ring-black/5 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0"
        >
          <div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Notifications</h3>
            {notifications.map((item, index) => (
              <CloseButton
                as={Link}
                key={index}
                href={item.href}
                className="relative -m-3 flex rounded-lg p-2 pe-8 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-gray-700"
              >
                <Image
                  alt="avatar"
                  src={item.avatar}
                  width={48}
                  height={48}
                  className="rounded-full object-cover sm:size-12"
                  sizes="100px"
                />
                <div className="ms-3 space-y-1 sm:ms-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.name}</p>
                  <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">{item.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">{item.time}</p>
                </div>
                <span className="absolute end-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500"></span>
              </CloseButton>
            ))}
          </div>
        </PopoverPanel>
      </>
    </Popover>
  )
}

export default NotifyDropdown
