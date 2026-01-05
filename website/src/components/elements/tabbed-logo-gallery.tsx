'use client'

import { clsx } from 'clsx/lite'
import { useCallback, useEffect, useState, type ComponentProps, type ReactNode } from 'react'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length)
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

  if (items.length === 0) return null

  return (
    <div className={clsx('flex flex-col gap-8', className)} {...props}>
      {/* Gallery Image Display - Fixed landscape aspect ratio */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={clsx(
              'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out [&_*]:max-h-full',
              index === activeIndex
                ? 'opacity-100'
                : 'pointer-events-none opacity-0'
            )}
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
            onClick={() => handleTabClick(index)}
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

