'use client'

import * as Headless from '@headlessui/react'
import NextLink, { type LinkProps } from 'next/link'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const closeHeadless = Headless.useClose()

  return (
    <Headless.DataInteractive>
      <NextLink
        {...props}
        ref={ref}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e)
          }
          // Close the headlessui menu and aside
          closeHeadless()
        }}
      />
    </Headless.DataInteractive>
  )
})
