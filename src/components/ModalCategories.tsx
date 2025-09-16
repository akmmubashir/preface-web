'use client'

import CardCategory1 from '@/components/CategoryCards/CardCategory1'
import { TCategory } from '@/data/categories'
import { Button } from '@/shared/Button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Divider } from '@/shared/divider'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'

interface Props {
  categories: TCategory[]
}

const ModalCategories: FC<Props> = ({ categories }) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="modal-categories">
      <>
        <Button type="button" color="transparent" onClick={() => setIsOpen(true)}>
          {/* <HugeiconsIcon icon={NotificationSquareIcon} size={24} /> */}
          <span>Other Categories</span>
          <ChevronDownIcon className="size-4" />
        </Button>
        <Dialog size="5xl" open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Discover other categories</DialogTitle>
          <DialogBody>
            <Divider className="my-6" />
            <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {categories.map((cat) => (
                <CardCategory1 key={cat._id} category={cat} size="normal" />
              ))}
            </div>
          </DialogBody>
          <DialogActions>
            {/* <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button> */}
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  )
}

export default ModalCategories
