import { ApplicationLayout } from '@/app/[lang]/application-layout'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const categories = await getCategories()
  const authors = await getAuthors()
  return (
    <ApplicationLayout params={params}>
      {children}

      <div className="container space-y-16 py-16 lg:space-y-28 lg:pt-20 lg:pb-28">
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionGridCategoryBox categories={categories.slice(0, 10)} />
          <div className="mx-auto mt-10 text-center md:mt-16">
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>

        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={authors.slice(0, 10)}
        />

        <SectionSubscribe2 />
      </div>
    </ApplicationLayout>
  )
}

export default Layout
