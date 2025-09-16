'use client'

import { Facebook01Icon, InstagramIcon, YoutubeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, useState } from 'react'

interface Props {
  className?: string
}

// Custom LinkedIn icon since it's not available in Hugeicons
const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path
      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z"
      fill="currentColor"
    />
    <path d="M6 9H2V21H6V9Z" fill="currentColor" />
    <path
      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
      fill="currentColor"
    />
  </svg>
)

// Custom Snapchat ghost icon
const SnapchatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 14.5C16.3 14.7 16 14.8 15.7 14.8C15.4 14.8 15.1 14.7 14.9 14.5C14.7 14.3 14.6 14 14.6 13.7C14.6 13.4 14.7 13.1 14.9 12.9C15.1 12.7 15.4 12.6 15.7 12.6C16 12.6 16.3 12.7 16.5 12.9C16.7 13.1 16.8 13.4 16.8 13.7C16.8 14 16.7 14.3 16.5 14.5ZM9.5 14.5C9.3 14.7 9 14.8 8.7 14.8C8.4 14.8 8.1 14.7 7.9 14.5C7.7 14.3 7.6 14 7.6 13.7C7.6 13.4 7.7 13.1 7.9 12.9C8.1 12.7 8.4 12.6 8.7 12.6C9 12.6 9.3 12.7 9.5 12.9C9.7 13.1 9.8 13.4 9.8 13.7C9.8 14 9.7 14.3 9.5 14.5Z"
      fill="currentColor"
    />
  </svg>
)

type SocialItem = {
  name: string
  href: string
  icon: any
  useHugeicons: boolean
  color: string
}

const socialItems: SocialItem[] = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/example',
    icon: InstagramIcon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: Facebook01Icon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@example',
    icon: YoutubeIcon,
    useHugeicons: true,
    color: '#60A43A',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/example',
    icon: LinkedinIcon,
    useHugeicons: false,
    color: '#60A43A',
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/example',
    icon: SnapchatIcon,
    useHugeicons: false,
    color: '#60A43A',
  },
]

const SocialSidebar: FC<Props> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleItems = isExpanded ? socialItems : socialItems.slice(0, 3)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={clsx('fixed top-1/2 right-0 z-50 -translate-y-1/2 transform', className)}>
      <div className="relative flex flex-col items-center space-y-2 rounded-l-lg p-3">
        {/* Top Vertical Line */}
        <div className="absolute top-[-60px] left-1/2 h-16 w-0.5 -translate-x-1/2 bg-[#60A43A]"></div>

        {/* Bottom Vertical Line */}
        <div className="absolute bottom-[-60px] left-1/2 h-14 w-0.5 -translate-x-1/2 bg-[#60A43A]"></div>

        {/* Social Media Icons */}
        {visibleItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#60A43A] text-white transition-opacity duration-200 hover:opacity-80"
            aria-label={`Follow us on ${item.name}`}
          >
            {item.useHugeicons ? (
              <HugeiconsIcon icon={item.icon} size={20} color="currentColor" />
            ) : (
              <div className="h-5 w-5">{React.createElement(item.icon)}</div>
            )}
          </Link>
        ))}

        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className="relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#D9D9D9] bg-transparent text-[#B3B3B3] transition-colors duration-200 hover:bg-white/10"
          aria-label={isExpanded ? 'Collapse social media bar' : 'Expand social media bar'}
        >
          <span className="text-lg font-bold">{isExpanded ? '×' : '+'}</span>
        </button>
      </div>
    </div>
  )
}

export default SocialSidebar
