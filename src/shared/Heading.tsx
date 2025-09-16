import clsx from 'clsx'

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  dimHeading?: string
  headingColor?: string
} & React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export function Heading({ className, level = 2, dimHeading, headingColor, children, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  const isLight = headingColor === 'light'

  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-[22px] font-semibold tracking-tight text-pretty sm:text-[26px]',
        isLight ? 'text-white' : 'text-neutral-950 dark:text-white'
      )}
    >
      {children}
      {dimHeading && '. '}
      {dimHeading && <span className="text-neutral-400 dark:text-neutral-500">{dimHeading}</span>}
    </Element>
  )
}

export function Subheading({ className, level = 3, headingColor, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`
  const isLight = headingColor === 'light'
  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-base font-normal lg:text-lg',
        isLight ? 'text-[#C2C2C2]' : 'text-neutral-500 dark:text-neutral-400'
      )}
    />
  )
}

export interface HeadingWithSubProps extends HeadingProps {
  subHeading?: string
  children: React.ReactNode
  isCenter?: boolean
}

export default function HeadingWithSub({
  className,
  level = 1,
  subHeading,
  children,
  isCenter,
  ...props
}: HeadingWithSubProps) {
  return (
    <div className={clsx(className, 'relative mb-10', isCenter && 'mx-auto w-full text-center text-pretty')}>
      <Heading level={level} {...props}>
        {children}
      </Heading>
      {subHeading && (
        <Subheading headingColor={props.headingColor} className={clsx('mt-1 max-w-3xl', isCenter && 'mx-auto')}>
          {subHeading}
        </Subheading>
      )}
    </div>
  )
}
