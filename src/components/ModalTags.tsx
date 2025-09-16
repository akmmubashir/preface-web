'use client'

import { FC } from 'react'

import { TTag } from '@/data/categories'
import { Button } from '@/shared/Button'
import Tag from '@/shared/Tag'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Divider } from '@/shared/divider'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Tag02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

interface Props {
  tags: TTag[]
}

const ModalTags: FC<Props> = ({ tags }) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="modal-tags">
      <>
        <Button type="button" color="white" onClick={() => setIsOpen(true)}>
          <HugeiconsIcon icon={Tag02Icon} size={24} />
          <span>Tags</span>
          <ChevronDownIcon className="size-4" />
        </Button>
        <Dialog size="3xl" open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Discover other tags</DialogTitle>
          <Divider className="my-6" />
          <DialogBody>
            <div className="flex flex-wrap dark:text-neutral-200">
              {tags.map((tag) => (
                <Tag key={tag.id} href={`/tag/${tag.handle}`} className="me-2 mb-2">
                  {tag.name}
                </Tag>
              ))}
            </div>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  )
}

export default ModalTags
