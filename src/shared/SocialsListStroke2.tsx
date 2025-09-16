import { Facebook01Icon, InstagramIcon, YoutubeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  className?: string
  socials?: typeof socialsDemo
}

// Custom LinkedIn stroke icon since it's not available in Hugeicons
const LinkedinStrokeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <path
      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type SocialItem = {
  name: string
  href: string
  icon: any
  useHugeicons: boolean
}

const socialsDemo: SocialItem[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: Facebook01Icon,
    useHugeicons: true,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/example',
    icon: InstagramIcon,
    useHugeicons: true,
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@example',
    icon: YoutubeIcon,
    useHugeicons: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/example',
    icon: LinkedinStrokeIcon,
    useHugeicons: false,
  },
]

const SocialsListStroke2: FC<Props> = ({ className, socials = socialsDemo }) => {
  return (
    <div className={clsx('flex gap-x-1 md:gap-x-2', className)}>
      {socials.map((item, index) => (
        <Link
          href={item.href}
          className="group flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 transition-colors duration-200 hover:border-neutral-400 md:h-10 md:w-10 dark:border-neutral-600 dark:hover:border-neutral-500"
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${item.name}`}
        >
          {item.useHugeicons ? (
            <HugeiconsIcon icon={item.icon} size={20} color="currentColor" strokeWidth={1.5} />
          ) : (
            <div className="h-5 w-5">{React.createElement(item.icon)}</div>
          )}
        </Link>
      ))}
    </div>
  )
}

export default SocialsListStroke2
