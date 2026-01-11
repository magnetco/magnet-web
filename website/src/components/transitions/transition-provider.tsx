'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

gsap.registerPlugin(useGSAP)

type TransitionDirection = 'horizontal' | 'vertical'
type TransitionState = 'idle' | 'exiting' | 'entering'

interface TransitionContextValue {
  state: TransitionState
  direction: TransitionDirection
  navigateTo: (href: string, direction?: TransitionDirection) => void
  triggerMenuTransition: (isOpening: boolean) => Promise<void>
  isActive: boolean
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function useTransition(): TransitionContextValue {
  const context = useContext(TransitionContext)
  if (!context) {
    console.warn('[useTransition] No TransitionProvider found, using fallback')
    // Return a fallback that just does normal navigation
    return {
      state: 'idle',
      direction: 'horizontal',
      navigateTo: () => {},
      triggerMenuTransition: async () => {},
      isActive: false,
    }
  }
  return context
}

interface TransitionProviderProps {
  children: ReactNode
  defaultDirection?: TransitionDirection
}

export function TransitionProvider({
  children,
  defaultDirection = 'horizontal',
}: TransitionProviderProps) {
  const [state, setState] = useState<TransitionState>('idle')
  const [direction, setDirection] = useState<TransitionDirection>(defaultDirection)
  const router = useRouter()
  const pathname = usePathname()
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const pendingNavigation = useRef<string | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Log on mount to verify the provider is loaded
  useEffect(() => {
    console.log('[TransitionProvider] Mounted and ready')
  }, [])

  // Navigate with transition
  const navigateTo = useCallback(
    (href: string, dir: TransitionDirection = defaultDirection) => {
      console.log('[Transition] navigateTo called:', { href, state, pathname })
      if (state !== 'idle' || href === pathname) {
        console.log('[Transition] Skipping - state not idle or same path')
        return
      }

      setDirection(dir)
      setState('exiting')
      pendingNavigation.current = href

      console.log('[Transition] Starting exit animation', {
        topPanel: topPanelRef.current,
        bottomPanel: bottomPanelRef.current,
      })

      if (!topPanelRef.current || !bottomPanelRef.current) {
        console.error('[Transition] Panel refs not available!')
        router.push(href)
        return
      }

      // Make panels visible immediately for debugging
      topPanelRef.current.style.visibility = 'visible'
      bottomPanelRef.current.style.visibility = 'visible'

      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          console.log('[Transition] Exit animation complete, pushing route')
          router.push(href)
        },
      })

      timelineRef.current = tl

      if (dir === 'horizontal') {
        // Horizontal split: panels slide from left/right to center
        tl.fromTo(
          topPanelRef.current,
          { x: '-100%' },
          { x: '0%', duration: 0.3, ease: 'power3.inOut' },
          0
        )
        tl.fromTo(
          bottomPanelRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.3, ease: 'power3.inOut' },
          0
        )
      } else {
        // Vertical split: panels slide from top/bottom to center
        tl.fromTo(
          topPanelRef.current,
          { y: '-100%' },
          { y: '0%', duration: 0.3, ease: 'power3.inOut' },
          0
        )
        tl.fromTo(
          bottomPanelRef.current,
          { y: '100%' },
          { y: '0%', duration: 0.3, ease: 'power3.inOut' },
          0
        )
      }
    },
    [state, pathname, router, defaultDirection]
  )

  // Menu transition (for opening/closing mobile menu)
  const triggerMenuTransition = useCallback(
    async (isOpening: boolean): Promise<void> => {
      return new Promise((resolve) => {
        const tl = gsap.timeline({ onComplete: resolve })

        if (isOpening) {
          // Quick cover then reveal
          tl.set([topPanelRef.current, bottomPanelRef.current], {
            visibility: 'visible',
          })
          tl.fromTo(
            topPanelRef.current,
            { y: '-100%' },
            { y: '0%', duration: 0.15, ease: 'power2.inOut' },
            0
          )
          tl.fromTo(
            bottomPanelRef.current,
            { y: '100%' },
            { y: '0%', duration: 0.15, ease: 'power2.inOut' },
            0
          )
          tl.to(
            [topPanelRef.current, bottomPanelRef.current],
            { y: (i) => (i === 0 ? '-100%' : '100%'), duration: 0.15, ease: 'power2.out' },
            0.18
          )
          tl.set([topPanelRef.current, bottomPanelRef.current], {
            visibility: 'hidden',
          })
        } else {
          // Same for closing
          tl.set([topPanelRef.current, bottomPanelRef.current], {
            visibility: 'visible',
          })
          tl.fromTo(
            topPanelRef.current,
            { y: '-100%' },
            { y: '0%', duration: 0.15, ease: 'power2.inOut' },
            0
          )
          tl.fromTo(
            bottomPanelRef.current,
            { y: '100%' },
            { y: '0%', duration: 0.15, ease: 'power2.inOut' },
            0
          )
          tl.to(
            [topPanelRef.current, bottomPanelRef.current],
            { y: (i) => (i === 0 ? '-100%' : '100%'), duration: 0.15, ease: 'power2.out' },
            0.18
          )
          tl.set([topPanelRef.current, bottomPanelRef.current], {
            visibility: 'hidden',
          })
        }
      })
    },
    []
  )

  // Handle route change completion - run enter animation
  useEffect(() => {
    console.log('[Transition] useEffect:', { state, pathname, pending: pendingNavigation.current })
    if (state === 'exiting' && pendingNavigation.current) {
      console.log('[Transition] Starting enter animation')
      // Route has changed, run enter animation
      setState('entering')
      pendingNavigation.current = null

      // Scroll to top of new page
      window.scrollTo(0, 0)

      const tl = gsap.timeline({
        onComplete: () => {
          console.log('[Transition] Enter animation complete')
          setState('idle')
          gsap.set([topPanelRef.current, bottomPanelRef.current], {
            visibility: 'hidden',
          })
        },
      })

      if (direction === 'horizontal') {
        tl.to(topPanelRef.current, { x: '-100%', duration: 0.2, ease: 'power3.out' }, 0)
        tl.to(bottomPanelRef.current, { x: '100%', duration: 0.2, ease: 'power3.out' }, 0)
      } else {
        tl.to(topPanelRef.current, { y: '-100%', duration: 0.2, ease: 'power3.out' }, 0)
        tl.to(bottomPanelRef.current, { y: '100%', duration: 0.2, ease: 'power3.out' }, 0)
      }
    }
  }, [pathname, state, direction])

  return (
    <TransitionContext.Provider value={{ state, direction, navigateTo, triggerMenuTransition, isActive: true }}>
      {children}

      {/* Debug indicator - remove after testing */}
      <div className="fixed bottom-4 right-4 z-[10000] rounded bg-ember px-2 py-1 text-xs text-white">
        Transitions: {state}
      </div>

      {/* Split Panel Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999]"
      >
        {/* Left Panel */}
        <div
          ref={topPanelRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-ember will-change-transform"
          style={{ visibility: 'hidden', transform: 'translateX(-100%)' }}
        />
        {/* Right Panel */}
        <div
          ref={bottomPanelRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-juniper will-change-transform"
          style={{ visibility: 'hidden', transform: 'translateX(100%)' }}
        />
      </div>
    </TransitionContext.Provider>
  )
}
