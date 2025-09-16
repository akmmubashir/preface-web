'use client'

import BookmarkBtn from '@/components/BookmarkBtn'
import PostCardLikeBtn from '@/components/PostCardLikeBtn'
import { Button } from '@/shared/Button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/shared/dropdown'
import {
  ClipboardIcon,
  Comment01Icon,
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
import { FC, useState } from 'react'

function ActionDropdown({ handle, title }: { handle: string; title: string }) {
  const [isOpenDialogHideAuthor, setIsOpenDialogHideAuthor] = useState(false)
  const [isOpenDialogReportPost, setIsOpenDialogReportPost] = useState(false)

  const actions = [
    {
      name: 'Copy link',
      icon: ClipboardIcon,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href)
      },
    },
    {
      name: 'Comment on this post',
      icon: Comment01Icon,
      href: '#comments',
    },
    {
      name: 'Hide this author',
      icon: ViewOffSlashIcon,
      onClick: () => {
        setIsOpenDialogHideAuthor(true)
      },
    },
    {
      name: 'Report this post',
      icon: Flag03Icon,
      onClick: () => {
        setIsOpenDialogReportPost(true)
      },
    },
  ]

  return (
    <>
      <Dropdown>
        <DropdownButton
          as="button"
          className="flex size-8.5 items-center justify-center rounded-full bg-neutral-50 transition-colors duration-300 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20"
        >
          <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
        </DropdownButton>
        <DropdownMenu>
          {actions.map((item) =>
            item.href ? (
              <DropdownItem key={item.name} href={item.href} onClick={item.onClick}>
                <HugeiconsIcon icon={item.icon} size={20} data-slot="icon" />
                {item.name}
              </DropdownItem>
            ) : (
              <DropdownItem key={item.name} onClick={item.onClick}>
                <HugeiconsIcon icon={item.icon} size={20} data-slot="icon" />
                {item.name}
              </DropdownItem>
            )
          )}
        </DropdownMenu>
      </Dropdown>

      {/* DIALOG HIDE AUTHOR */}
      {/* <Dialog open={isOpenDialogHideAuthor} onClose={() => setIsOpenDialogHideAuthor(false)}>
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
      </Dialog> */}

      {/* DIALOG REPORT POST */}
      <Dialog open={isOpenDialogReportPost} onClose={() => setIsOpenDialogReportPost(false)}>
        <DialogTitle>Report this post?</DialogTitle>
        <DialogBody>
          <p>
            Are you sure you want to report the <span className="font-semibold">&quot;{title.trim()}&quot;</span>? This
            action will report this post.
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

function ShareDropdown({ handle, color }: { handle: string; color?: string }) {
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
      <DropdownButton
        as="button"
        className={`flex size-8.5 items-center justify-center rounded-full transition-colors duration-300 ${
          color || 'bg-neutral-50 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20'
        }`}
      >
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

interface Props {
  className?: string
  likeCount?: number | any
  liked?: boolean | any
  commentCount?: number | any
  handle?: string | any
  title?: string | any
}

const SingleMetaAction: FC<Props> = ({ className, likeCount, liked, commentCount, handle, title }) => {
  return (
    <div className={clsx('single-meta-action', className)}>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <PostCardLikeBtn
          likeCount={likeCount}
          liked={liked}
          color="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white"
        />
        {/* <PostCardCommentBtn commentCount={commentCount} handle={handle} /> */}
        {/* <p className="font-light text-neutral-400 sm:mx-1">/</p> */}
        <BookmarkBtn
          className="size-8.5!"
          color="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white  relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 "
        />
        <ShareDropdown
          handle={handle}
          color="bg-transparent cursor-pointer border border-white text-white hover:bg-white/10 hover:text-white"
        />
        {/* <ActionDropdown handle={handle} title={title} /> */}
      </div>
    </div>
  )
}

export { ActionDropdown, ShareDropdown, SingleMetaAction }
