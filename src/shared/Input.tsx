import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string
  fontClass?: string
  rounded?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'sm:text-sm font-normal',
      rounded = 'rounded-full',
      type = 'text',
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          'block w-full border-neutral-200 bg-white focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200/50 dark:border-neutral-700 dark:bg-[#000000] dark:focus:ring-neutral-600/25',
          rounded,
          fontClass,
          sizeClass,
          className
        )}
        {...args}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
