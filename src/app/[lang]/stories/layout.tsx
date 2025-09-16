import { ApplicationLayout } from '@/app/[lang]/application-layout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  return <ApplicationLayout params={params}>{children}</ApplicationLayout>
}

export default Layout
