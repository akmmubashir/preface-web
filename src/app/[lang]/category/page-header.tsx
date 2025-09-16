'use client'

import FollowButton from '@/components/FollowButton'
import { TCategory } from '@/data/categories'
import Avatar from '@/shared/Avatar'
import { Badge } from '@/shared/Badge'
import { Button } from '@/shared/Button'
import ButtonCircle from '@/shared/ButtonCircle'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/shared/dropdown'
import {
  CopyLinkIcon,
  Facebook01Icon,
  Fire03Icon,
  Flag03Icon,
  Mail01Icon,
  MoreHorizontalIcon,
  NewTwitterIcon,
  PlayListIcon,
  Share03Icon,
  ViewOffSlashIcon,
  Vynil02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useState } from 'react'

const PageHeader = ({
  category,
  className,
  type = 'default',
}: {
  category: TCategory
  className?: string
  type?: 'audio' | 'video' | 'default'
}) => {
  const { name, description, handle, thumbnail, count, color } = category

  return (
    <div className={clsx('w-full', className)}>
      <div className="relative h-32 w-full bg-neutral-100 md:h-48 dark:bg-white/10" />
      <div className="container -mt-16">
        <div className="relative flex flex-col items-start gap-6 rounded-3xl border border-transparent bg-white p-5 shadow-xl md:flex-row md:rounded-4xl lg:p-8 lg:px-9 dark:border-neutral-700 dark:bg-neutral-900">
          {/* AVATAR */}
          <Avatar
            alt={category.name || 'Avatar'}
            src={thumbnail.src}
            square
            width={144}
            height={144}
            className="shrink-0 rotate-12 shadow-2xl ring-4 ring-white lg:w-36"
            sizes="144px"
          />

          {/* INFO */}
          <div className="flex-1 lg:ps-4">
            <div className="max-w-(--breakpoint-sm) space-y-3.5">
              <div>
                <Badge color={color as any}>Category</Badge>
                <h2 className="mt-2 text-2xl font-semibold lg:text-3xl">{name}</h2>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
              <p className="mt-auto flex items-center gap-x-1 text-sm">
                {type === 'audio' && <HugeiconsIcon icon={Vynil02Icon} size={20} />}
                {type === 'video' && <HugeiconsIcon icon={PlayListIcon} size={20} />}
                {type === 'default' && <HugeiconsIcon icon={Fire03Icon} size={20} />}
                <span>
                  {count}
                  {` `}
                  {type === 'audio' && 'podcasts'}
                  {type === 'video' && 'videos'}
                  {type === 'default' && 'articles'}
                </span>
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-x-2 self-start">
            <FollowButton className="py-[calc(--spacing(2)-1px)]!" />
            <ShareDropdown handle={handle} />
            <ActionDropdown handle={handle} category={category} />
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

function ActionDropdown({ handle, category }: { handle: string; category: TCategory }) {
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
      name: 'Hide category',
      icon: ViewOffSlashIcon,
      onClick: () => {
        setIsOpenDialogHideAuthor(true)
      },
    },
    {
      name: 'Report category',
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
          Hide this category? <span className="font-semibold">({category.name.trim()})</span>
        </DialogTitle>
        <DialogBody>
          <p>
            Are you sure you want to hide the <span className="font-semibold">{category.name.trim()}</span>? This action
            will hide all posts from this category.
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
        <DialogTitle>Report this category?</DialogTitle>
        <DialogBody>
          <p>
            Are you sure you want to report the{' '}
            <span className="font-semibold">&quot;{category.name.trim()}&quot;</span>? This action will report this
            category.
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
