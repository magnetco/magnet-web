'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentProps, type MouseEvent } from 'react'
import { useTransition } from './transition-provider'

type TransitionDirection = 'horizontal' | 'vertical'

interface TransitionLinkProps extends Omit<ComponentProps<typeof Link>, 'onClick'> {
  direction?: TransitionDirection
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export function TransitionLink({
  href,
  direction,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const { navigateTo, state, isActive } = useTransition()
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    console.log('[TransitionLink] Click:', { href, state, pathname, isActive })
    
    // Allow cmd/ctrl click to open in new tab
    if (e.metaKey || e.ctrlKey) {
      onClick?.(e)
      return
    }

    // If no active provider, allow normal navigation
    if (!isActive) {
      console.log('[TransitionLink] No active provider, allowing default')
      onClick?.(e)
      return
    }

    const hrefString = typeof href === 'string' ? href : href.pathname || ''

    // Don't transition if already on the page or transition in progress
    if (hrefString === pathname || state !== 'idle') {
      console.log('[TransitionLink] Skipping transition:', { hrefString, pathname, state })
      onClick?.(e)
      return
    }

    console.log('[TransitionLink] Triggering transition to:', hrefString)
    e.preventDefault()
    onClick?.(e)
    navigateTo(hrefString, direction)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
