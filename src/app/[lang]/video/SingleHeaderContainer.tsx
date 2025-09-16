import { TPostDetail } from '@/data/posts'
import { Divider } from '@/shared/divider'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import { SingleMetaAction } from './SingleMetaAction'
import SingleTitle from './SingleTitle'

interface Props {
  className?: string
  post: TPostDetail | any
  headerStyle?: 'style1' | 'style2' | 'style3' | 'audio' | 'video' | 'gallery'
}

const TitleAndMeta = ({ className, post }: Omit<Props, 'headerStyle'>) => {
  const { categories, date, author, readingTime, commentCount, handle, likeCount, liked, title, excerpt } = post

  return (
    <div className={`text-white ${className}`}>
      <div className="mb-4">{/* <CategoryBadgeList categories={categories || []} /> */}</div>
      <SingleTitle title={title} className="mb-4 text-2xl font-semibold sm:font-bold md:text-4xl lg:text-5xl" />
      {/* {excerpt && (
        <p className="text-base/relaxed text-white/80 mb-6 md:text-lg/relaxed">
          {excerpt}
        </p>
      )} */}
      <Divider className="my-6 border-white/20" />
      <div className="flex flex-wrap items-center gap-4">
        {/* <SingleMeta 
          author={author} 
          date={date} 
          readingTime={readingTime} 
          className="text-white/80"
        /> */}
        <div className="">
          <SingleMetaAction
            commentCount={commentCount}
            handle={handle}
            likeCount={likeCount}
            liked={liked}
            title={title}
            className="text-white hover:text-white/80"
          />
        </div>
      </div>
    </div>
  )
}

const HeaderStyle1 = ({ className, post }: Omit<Props, 'defaultStyle'>) => {
  const { featuredImage, title } = post

  return (
    <>
      <div className="container">
        <Divider />
      </div>
      <header className={clsx('single-header-style-1', className)}>
        {featuredImage.src && (
          <div className="relative aspect-square w-full sm:aspect-15/5">
            <Image
              alt={title}
              className="object-cover"
              src={featuredImage}
              sizes="(max-width: 1440px) 100vw, 1440px"
              fill
              priority
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(0deg, #000000D9 0%, #61616100 100%)',
              }}
            />
            <div className="absolute right-0 bottom-0 left-0 container">
              <div className="mx-auto pb-8">
                <TitleAndMeta post={post} />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

const SingleHeaderContainer: FC<Props> = ({ className, post, headerStyle = 'style1' }) => {
  return <>{headerStyle === 'style1' && <HeaderStyle1 className={className} post={post} />}</>
}

export default SingleHeaderContainer
