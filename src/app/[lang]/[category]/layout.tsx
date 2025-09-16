import { ApplicationLayout } from '@/app/[lang]/application-layout'
import { getAuthors } from '@/data/authors'
import { getPostsDefault } from '@/data/posts'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const authors = await getAuthors()
  const defaultPosts = await getPostsDefault()
  return <ApplicationLayout params={params}>{children}</ApplicationLayout>
}

export default Layout
