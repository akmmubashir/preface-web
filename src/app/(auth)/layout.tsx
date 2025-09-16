import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | Preface',
    default: 'Authentication | Preface',
  },
  description: 'Join our blog magazine community - Login or create your account',
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
}

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <>{children}</>
}
