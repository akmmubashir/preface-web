import { TCategory } from '@/data/categories'
import HeadingWithSub, { HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import CardCategory1 from './CategoryCards/CardCategory1'
import CardCategory2 from './CategoryCards/CardCategory2'
import CardCategory3 from './CategoryCards/CardCategory3'
import CardCategory4 from './CategoryCards/CardCategory4'
import CardCategory5 from './CategoryCards/CardCategory5'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading' | 'isCenter'> {
  categories?: TCategory[]
  heading?: string
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5'
  className?: string
}

const SectionGridCategoryBox: React.FC<Props> = ({
  categories,
  categoryCardType = 'card2',
  className,
  subHeading,
  isCenter,
  dimHeading,
  heading,
}) => {
  let CardComponentName = CardCategory2
  switch (categoryCardType) {
    case 'card1':
      CardComponentName = CardCategory1
      break
    case 'card2':
      CardComponentName = CardCategory2
      break
    case 'card3':
      CardComponentName = CardCategory3
      break
    case 'card4':
      CardComponentName = CardCategory4
      break
    case 'card5':
      CardComponentName = CardCategory5
      break

    default:
      CardComponentName = CardCategory2
  }

  return (
    <div className={clsx('section-grid-category-box relative', className)}>
      <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading} isCenter={isCenter}>
        {heading}
      </HeadingWithSub>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
        {categories?.map((item, i) => (
          <CardComponentName badge={i < 3 ? `#${i + 1}` : undefined} key={item.id} category={item} />
        ))}
      </div>
    </div>
  )
}

export default SectionGridCategoryBox
