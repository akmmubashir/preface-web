import { Facebook01Icon, Mail01Icon, NewTwitterIcon, YoutubeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  socials?: typeof socialsDemo
}

const socialsDemo = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: Facebook01Icon,
  },
  {
    name: 'Email',
    href: 'mailto:example@example.com',
    icon: Mail01Icon,
  },
  {
    name: 'Twitter',
    href: 'https://x.com/example',
    icon: NewTwitterIcon,
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@example',
    icon: YoutubeIcon,
  },
]

const SocialsList1: FC<Props> = ({ className, socials = socialsDemo }) => {
  return (
    <div className={clsx('flex gap-y-4', className)}>
      {socials.map((item, index) => (
        <Link
          href={item.href}
          className="group mx-1 flex items-center gap-x-2.5 rounded-full border border-[#CDCDCD] p-1 text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon icon={item.icon} size={20} />
          {/* {item.name} */}
        </Link>
      ))}
    </div>
  )
}

export default SocialsList1
