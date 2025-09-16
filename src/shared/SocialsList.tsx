import { Facebook01Icon, InstagramIcon, NewTwitterIcon, YoutubeIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  itemClass?: string
  socials?: typeof socialsDemo
}

const socialsDemo = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: Facebook01Icon,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/example',
    icon: InstagramIcon,
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

const SocialsList: FC<Props> = ({ className, itemClass, socials = socialsDemo }) => {
  return (
    <div className={clsx('flex gap-x-3.5', className)}>
      {socials.map((item, i) => (
        <Link key={i} className={clsx('block', itemClass)} href={item.href} target="_blank" rel="noopener noreferrer">
          <HugeiconsIcon icon={item.icon} size={20} />
        </Link>
      ))}
    </div>
  )
}

export default SocialsList
