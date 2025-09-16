import { TPost } from '@/data/posts'
import Link from 'next/link'
import { FC } from 'react'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'

interface Props {
  post: TPost
}

const MediaAudio: FC<Props> = ({ post }) => {
  return (
    <>
      <Link href={`/post/${post.handle}`} className="absolute inset-0 bg-neutral-900/30" />
      <ButtonPlayMusicPlayer className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" post={post} />
    </>
  )
}

export default MediaAudio
