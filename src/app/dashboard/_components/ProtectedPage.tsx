'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

// Dynamically import with no SSR
const ProtectedRoute = dynamic(() => import('@/contexts/AuthContext').then((mod) => mod.ProtectedRoute), { ssr: false })

export default function ProtectedPage({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
