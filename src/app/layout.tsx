import AuthProvider from '@/contexts/AuthContext'
import QueryProvider from '@/providers/query-provider'
import ThemeToggle from '@/shared/ThemeToggle'
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Noto_Serif } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Preface Islam',
  description: 'Preface Islam is a platform for Muslims to learn about Islam and its teachings.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={notoSerif.className} suppressHydrationWarning>
      <body className={`bg-[#F8F8F8] text-base text-neutral-900 dark:bg-[#000000] dark:text-neutral-200`}>
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <div>{children}</div>
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: 'var(--color-bg-elevated)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    padding: '16px',
                    fontSize: '14px',
                    maxWidth: '500px',
                    width: 'auto',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: 'white',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: 'white',
                    },
                  },
                }}
              />
              <ThemeToggle />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
