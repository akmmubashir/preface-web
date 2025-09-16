import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

interface Props extends ImageProps {
  containerClassName?: string
}

const NcImage: FC<Props> = ({
  containerClassName = 'relative',
  alt,
  className = 'object-cover size-full',
  sizes = '(max-width: 600px) 480px, 800px',
  src,
  ...args
}) => {
  return (
    <div className={clsx('', containerClassName)}>
      {src ? <Image className={className} alt={alt} sizes={sizes} src={src} {...args} /> : null}
    </div>
  )
}

export default NcImage
