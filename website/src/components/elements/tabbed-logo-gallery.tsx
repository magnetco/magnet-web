'use client'

import { clsx } from 'clsx/lite'
import { useCallback, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react'

export interface GalleryItem {
  id: string
  logo: ReactNode
  image: ReactNode
}

export function TabbedLogoGallery({
  items,
  autoRotateInterval = 5000,
  className,
  ...props
}: {
  items: GalleryItem[]
  autoRotateInterval?: number
} & ComponentProps<'div'>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Touch gesture state
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length)
  }, [items.length])

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1))
  }, [items.length])

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused || items.length <= 1) return

    const interval = setInterval(goToNext, autoRotateInterval)
    return () => clearInterval(interval)
  }, [isPaused, items.length, autoRotateInterval, goToNext])

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    // Pause auto-rotation briefly after manual interaction
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), autoRotateInterval * 2)
  }

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
        setIsPaused(true)
        setTimeout(() => setIsPaused(false), autoRotateInterval * 2)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
        setIsPaused(true)
        setTimeout(() => setIsPaused(false), autoRotateInterval * 2)
      }
    },
    [goToNext, goToPrevious, autoRotateInterval]
  )

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current
    const diffY = Math.abs(touchStartY.current - touchEndX.current)
    const threshold = 50

    // Only trigger if horizontal swipe is greater than vertical (avoid scroll conflicts)
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        // Swiped left - go to next
        goToNext()
      } else {
        // Swiped right - go to previous
        goToPrevious()
      }
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), autoRotateInterval * 2)
    }
  }

  if (items.length === 0) return null

  return (
    <div
      ref={containerRef}
      className={clsx('flex flex-col gap-8 outline-none', className)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Gallery carousel. Use left and right arrow keys to navigate."
      {...props}
    >
      {/* Gallery Image Display - Fixed landscape aspect ratio */}
      <div
        className="relative aspect-video w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            id={`panel-${item.id}`}
            className={clsx(
              'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out **:max-h-full',
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            role="tabpanel"
            aria-hidden={index !== activeIndex}
          >
            {item.image}
          </div>
        ))}
      </div>

      {/* Logo Tabs */}
      <div
        className="mx-auto grid w-full grid-cols-2 place-items-center gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-x-10 lg:mx-auto lg:inline-grid lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-1 lg:gap-8"
        role="tablist"
        aria-label="Gallery navigation"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`panel-${item.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => {
              // Allow tab-level keyboard navigation
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                const prevIndex = index === 0 ? items.length - 1 : index - 1
                handleTabClick(prevIndex)
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                const nextIndex = (index + 1) % items.length
                handleTabClick(nextIndex)
              }
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={clsx(
              'relative flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 transition-all duration-300',
              index === activeIndex
                ? 'bg-white/90 shadow-[0_0_20px_rgba(249,67,43,0.25),0_0_8px_rgba(249,67,43,0.15)] dark:bg-white/10 dark:shadow-[0_0_20px_rgba(249,67,43,0.35),0_0_8px_rgba(249,67,43,0.2)]'
                : 'hover:bg-white/50 dark:hover:bg-white/5'
            )}
          >
            <span className="flex h-8 items-stretch">{item.logo}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
