'use client'

import { TComment } from '@/data/posts'
import Avatar from '@/shared/Avatar'
import { Button } from '@/shared/Button'
import Textarea from '@/shared/Textarea'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/shared/dropdown'
import {
  ArrowTurnBackwardIcon,
  Delete03Icon,
  Flag03Icon,
  MessageEdit01Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'
import SingleCommentForm from '../SingleCommentForm'
import CommentLikeBtn from './CommentLikeBtn'
import CommentReplyBtn from './CommentReplyBtn'

interface Props {
  className?: string
  comment: TComment
}

const CommentCard: FC<Props> = ({ className, comment }) => {
  const { date, content, like, author, id } = comment

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditting, setIsEditting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpenDialogReportComment, setIsOpenDialogReportComment] = useState(false)

  const openReplyForm = () => {
    setIsReplying(true)
    setTimeout(() => {
      textareaRef.current && (textareaRef.current as HTMLTextAreaElement).focus()
    }, 20)
  }
  const closeReplyForm = () => {
    setIsReplying(false)
  }

  const openModalEditComment = () => setIsEditting(true)
  const closeModalEditComment = () => setIsEditting(false)

  const openModalDeleteComment = () => setIsDeleting(true)
  const closeModalDeleteComment = () => setIsDeleting(false)

  const commentActions = [
    {
      name: 'Reply comment',
      icon: ArrowTurnBackwardIcon,
      onClick: () => {
        openReplyForm()
      },
    },
    {
      name: 'Edit comment',
      icon: MessageEdit01Icon,
      onClick: () => {
        openModalEditComment()
      },
    },
    {
      name: 'Delete comment',
      icon: Delete03Icon,
      onClick: () => {
        openModalDeleteComment()
      },
    },
    {
      name: 'Report comment',
      icon: Flag03Icon,
      onClick: () => {
        setIsOpenDialogReportComment(true)
      },
    },
  ]

  return (
    <>
      <div className={clsx(`comment-card flex ${className}`)}>
        <Avatar className="size-8 rounded-full" src={author.avatar.src} width={32} height={32} sizes="32px" />
        <div className="ms-2 flex grow flex-col rounded-xl border border-neutral-200 p-4 text-sm sm:ms-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pe-6">
            <div className="absolute -end-3 -top-3">
              <Dropdown>
                <DropdownButton
                  as="button"
                  className="flex size-8.5 items-center justify-center rounded-lg bg-neutral-100 transition-colors duration-300 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
                </DropdownButton>
                <DropdownMenu>
                  {commentActions.map((item, index) => (
                    <DropdownItem key={index} onClick={item.onClick}>
                      <HugeiconsIcon icon={item.icon} size={20} data-slot="icon" />
                      {item.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Link
              className="shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
              href={`/author/${author.handle}`}
            >
              {author.name}
            </Link>
            <span className="mx-2">·</span>
            <span className="line-clamp-1 text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </span>
          </div>

          {/* CONTENT */}
          <p className="mt-2 mb-3 text-base/relaxed text-neutral-700 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {content}
          </p>

          {/* ACTION LIKE REPLY */}
          {isReplying ? (
            <SingleCommentForm
              textareaRef={textareaRef}
              onClickSubmit={closeReplyForm}
              onClickCancel={closeReplyForm}
              className="grow"
            />
          ) : (
            <div className="flex items-center gap-2">
              <CommentLikeBtn likeCount={like.count} isLiked={like.isLiked} postId={id} />
              <CommentReplyBtn onClick={openReplyForm} />
            </div>
          )}
        </div>
      </div>

      {/* DIALOG DELETE COMMENT */}
      <Dialog open={isDeleting} onClose={closeModalDeleteComment}>
        <DialogTitle>Delete comment?</DialogTitle>
        <DialogBody>
          <p>Are you sure you want to delete this comment? You cannot undo this action.</p>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={closeModalDeleteComment}>
            Cancel
          </Button>
          <Button onClick={closeModalDeleteComment}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG EDIT COMMENT */}
      <Dialog size="3xl" open={isEditting} onClose={closeModalEditComment}>
        <DialogTitle>Edit comment</DialogTitle>
        <DialogBody>
          <Textarea
            autoFocus
            data-autofocus
            placeholder="Add to discussion"
            ref={textareaRef}
            required={true}
            defaultValue={content}
            rows={8}
          />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={closeModalEditComment}>
            Cancel
          </Button>
          <Button onClick={closeModalEditComment}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG REPORT COMMENT */}
      <Dialog open={isOpenDialogReportComment} onClose={() => setIsOpenDialogReportComment(false)}>
        <DialogTitle>Report this comment?</DialogTitle>
        <DialogBody>
          <p>Are you sure you want to report this comment? This action will report this comment.</p>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpenDialogReportComment(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpenDialogReportComment(false)}>Report</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CommentCard
