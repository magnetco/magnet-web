'use client'

import { usePathname } from 'next/navigation'
import { AppLayout } from './app-layout'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show sidebar on login or public review pages
  const isPublicPage = pathname === '/login' || pathname.startsWith('/review/')
  
  if (isPublicPage) {
    return <>{children}</>
  }
  
  return <AppLayout>{children}</AppLayout>
}
