'use client'

import FollowButton from '@/components/FollowButton'
import VerifyIcon from '@/components/VerifyIcon'
import { TAuthor } from '@/data/authors'
import Avatar from '@/shared/Avatar'
import { Button } from '@/shared/Button'
import ButtonCircle from '@/shared/ButtonCircle'
import SocialsList from '@/shared/SocialsList'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/shared/dropdown'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import {
  CopyLinkIcon,
  Facebook01Icon,
  Flag03Icon,
  Mail01Icon,
  MoreHorizontalIcon,
  NewTwitterIcon,
  Share03Icon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const PageHeader = ({ author, className }: { author: TAuthor; className?: string }) => {
  const { name, description, cover, avatar, handle } = author

  return (
    <div className={clsx('w-full', className)}>
      <div className="relative h-40 w-full md:h-60 2xl:h-72">
        <Image
          alt={cover.alt || 'Cover'}
          sizes="(max-width: 1280px) 100vw, 1536px"
          src={cover.src}
          className="object-cover"
          fill
          priority
        />
      </div>
      <div className="container -mt-10 lg:-mt-16">
        <div className="relative flex flex-col items-start gap-6 rounded-3xl border border-transparent bg-white p-5 shadow-xl md:flex-row md:rounded-4xl lg:p-8 dark:border-neutral-700 dark:bg-neutral-900">
          {/* AVATAR */}
          <Avatar
            alt={author.name || 'Avatar'}
            src={avatar.src}
            width={128}
            height={128}
            className="shrink-0 rounded-full shadow-2xl ring-4 ring-white lg:w-32"
            sizes="128px"
          />

          {/* INFO */}
          <div className="grow lg:ps-2">
            <div className="max-w-(--breakpoint-sm) space-y-3.5">
              <div className="flex items-center lg:gap-x-0.5">
                <h2 className="text-2xl font-semibold lg:text-3xl">{name}</h2>
                <VerifyIcon iconClass="size-6 lg:size-7" />
              </div>
              <p className="text-sm/6 text-neutral-600 dark:text-neutral-400">{description}</p>
              <Link href="#" className="flex items-center gap-x-2 text-xs text-neutral-500 dark:text-neutral-400">
                <GlobeAltIcon className="size-4" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">https://example.com/me</span>
              </Link>
              <SocialsList />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-x-2">
            <FollowButton className="py-[calc(--spacing(2)-1px)]!" />
            <ShareDropdown handle={handle} />
            <ActionDropdown handle={handle} author={author} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ShareDropdown({ handle }: { handle: string }) {
  const socialsShare = [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook01Icon,
    },
    {
      name: 'Email',
      href: '#',
      icon: Mail01Icon,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: NewTwitterIcon,
    },
  ]

  return (
    <Dropdown>
      <DropdownButton as={ButtonCircle} outline className="size-10">
        <HugeiconsIcon icon={Share03Icon} size={20} />
      </DropdownButton>
      <DropdownMenu>
        {socialsShare.map((item, index) => (
          <DropdownItem key={index} href={item.href}>
            <HugeiconsIcon icon={item.icon} size={20} data-slot="icon" />
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

function ActionDropdown({ handle, author }: { handle: string; author: TAuthor }) {
  const [isOpenDialogHideAuthor, setIsOpenDialogHideAuthor] = useState(false)
  const [isOpenDialogReportPost, setIsOpenDialogReportPost] = useState(false)

  const actions = [
    {
      name: 'Copy link',
      icon: CopyLinkIcon,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href)
      },
    },
    {
      name: 'Hide author',
      icon: ViewOffSlashIcon,
      onClick: () => {
        setIsOpenDialogHideAuthor(true)
      },
    },
    {
      name: 'Report author',
      icon: Flag03Icon,
      onClick: () => {
        setIsOpenDialogReportPost(true)
      },
    },
  ]
  return (
    <>
      <Dropdown>
        <DropdownButton as={ButtonCircle} outline className="size-10">
          <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
        </DropdownButton>
        <DropdownMenu>
          {actions.map((item, index) => (
            <DropdownItem key={index} onClick={item.onClick}>
              <HugeiconsIcon icon={item.icon} size={20} data-slot="icon" />
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* DIALOG HIDE AUTHOR */}
      <Dialog open={isOpenDialogHideAuthor} onClose={() => setIsOpenDialogHideAuthor(false)}>
        <DialogTitle>
          Hide this author? <span className="font-semibold">({author.name.trim()})</span>
        </DialogTitle>
        <DialogBody>
          <p>
            Are you sure you want to hide the <span className="font-semibold">{author.name.trim()}</span>? This action
            will hide all posts from this author.
          </p>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpenDialogHideAuthor(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpenDialogHideAuthor(false)}>Hide</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG REPORT POST */}
      <Dialog open={isOpenDialogReportPost} onClose={() => setIsOpenDialogReportPost(false)}>
        <DialogTitle>Report this author?</DialogTitle>
        <DialogBody>
          <p>
            Are you sure you want to report the <span className="font-semibold">&quot;{author.name.trim()}&quot;</span>?
            This action will report this author.
          </p>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpenDialogReportPost(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpenDialogReportPost(false)}>Report</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PageHeader
