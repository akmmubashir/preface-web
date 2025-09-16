'use client'

import { Button } from '@/shared/Button'
import { PlusIcon } from '@heroicons/react/24/solid'
import { FC, useState } from 'react'

interface Props {
  following?: boolean
  className?: string
}

const FollowButton: FC<Props> = ({ className, following }) => {
  const [isFollowing, setIsFollowing] = useState(following)

  return !isFollowing ? (
    <Button outline className={className} onClick={() => setIsFollowing(true)}>
      <PlusIcon className="size-5" />
      Follow
    </Button>
  ) : (
    <Button outline className={className} onClick={() => setIsFollowing(false)}>
      Following
    </Button>
  )
}

export default FollowButton
