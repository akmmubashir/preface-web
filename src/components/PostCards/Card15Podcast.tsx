'use client'

import { TPost } from '@/data/posts'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'

interface Props {
  className?: string
  post: TPost
}

const Card15Podcast: FC<Props> = ({ className, post }) => {
  const { title, handle, featuredImage, postType, date, author } = post
  const IS_AUDIO = postType === 'audio'

  const renderPlayButton = (playing: boolean) => {
    return (
      <div className="mt-3 inline-flex cursor-pointer items-center rounded-full py-0.5 pe-4 transition-all hover:bg-primary-50 hover:ps-0.5 dark:hover:bg-neutral-900">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-neutral-800 dark:text-primary-200">
          {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5 rtl:rotate-180" />}
        </span>

        <span className="ms-3 text-xs font-medium sm:text-sm">{playing ? 'Now playing' : 'Listen now'}</span>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'group post-card-15-podcast relative flex items-center rounded-3xl border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900',
        className
      )}
    >
      <div className="w-1/4 shrink-0">
        <div className="relative aspect-1/1 overflow-hidden rounded-full shadow-lg">
          <Image className="size-full object-cover" src={featuredImage} fill alt={title} sizes="100px" />
        </div>
      </div>

      <div className="ms-4 flex grow flex-col">
        <h2 className={`nc-card-title block text-sm font-semibold sm:text-lg`}>
          <Link href={`/post/${handle}`} className="absolute inset-0" />
          <span className={IS_AUDIO ? `line-clamp-1` : 'line-clamp-2'} title={title}>
            {title}
          </span>
        </h2>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{author.name}</span>
          <span className="mx-1">·</span>
          <time dateTime={date}>
            {new Date(date ?? '').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </p>

        {IS_AUDIO && (
          <ButtonPlayMusicPlayer
            post={post}
            customPlaying={renderPlayButton(true)}
            customPaused={renderPlayButton(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Card15Podcast
