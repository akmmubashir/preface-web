import { getDictionary } from '@/i18n'
import { Metadata } from 'next'
import HomePage from './home/page'

export const metadata: Metadata = {
  title: 'Preface Islam',
  description: 'Preface Islam is a platform for Muslims to learn about Islam and its teachings.',
}

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return <HomePage params={params} dict={dict} />
}

export default Page
