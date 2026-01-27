import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ConditionalLayout } from '@/components/layout/conditional-layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marketing Studio',
  description: 'AI-powered ad copy generation and campaign management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
