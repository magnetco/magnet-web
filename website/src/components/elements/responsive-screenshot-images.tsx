'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import { useState } from 'react'
import { ImageSkeleton } from './image-skeleton'

interface ResponsiveImageSet {
  /** Mobile image (shown on screens < sm) - light and dark versions */
  mobile: {
    light: string
    dark: string
    width: number
    height: number
  }
  /** Tablet image (shown on sm to lg screens) - light and dark versions */
  tablet: {
    light: string
    dark: string
    width: number
    height: number
  }
  /** Small desktop image (shown on lg to xl screens) - light and dark versions */
  smallDesktop: {
    light: string
    dark: string
    width: number
    height: number
  }
  /** Large desktop image (shown on xl+ screens) - light and dark versions */
  largeDesktop: {
    light: string
    dark: string
    width: number
    height: number
  }
}

interface ResponsiveScreenshotImagesProps {
  images: ResponsiveImageSet
  alt?: string
}

/**
 * Renders responsive screenshot images for different breakpoints and color modes.
 * This component handles the common pattern of 8 images (4 breakpoints × 2 color modes).
 */
export function ResponsiveScreenshotImages({ images, alt = '' }: ResponsiveScreenshotImagesProps) {
  // Track loading state for visible images (one for each breakpoint)
  const [mobileLoaded, setMobileLoaded] = useState(false)
  const [tabletLoaded, setTabletLoaded] = useState(false)
  const [smallDesktopLoaded, setSmallDesktopLoaded] = useState(false)
  const [largeDesktopLoaded, setLargeDesktopLoaded] = useState(false)

  return (
    <>
      {/* Mobile - light */}
      <div className="relative sm:hidden dark:hidden">
        {!mobileLoaded && <ImageSkeleton className="aspect-5/4" />}
        <Image
          src={images.mobile.light}
          alt={alt}
          width={images.mobile.width}
          height={images.mobile.height}
          className={clsx(
            'bg-white/75 transition-opacity duration-300',
            mobileLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setMobileLoaded(true)}
        />
      </div>

      {/* Mobile - dark */}
      <div className="relative not-dark:hidden sm:hidden">
        {!mobileLoaded && <ImageSkeleton className="aspect-5/4" />}
        <Image
          src={images.mobile.dark}
          alt={alt}
          width={images.mobile.width}
          height={images.mobile.height}
          className={clsx(
            'bg-black/75 transition-opacity duration-300',
            mobileLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setMobileLoaded(true)}
        />
      </div>

      {/* Tablet - light */}
      <div className="relative max-sm:hidden lg:hidden dark:hidden">
        {!tabletLoaded && <ImageSkeleton className="aspect-27/10" />}
        <Image
          src={images.tablet.light}
          alt={alt}
          width={images.tablet.width}
          height={images.tablet.height}
          className={clsx(
            'bg-white/75 transition-opacity duration-300',
            tabletLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setTabletLoaded(true)}
        />
      </div>

      {/* Tablet - dark */}
      <div className="relative not-dark:hidden max-sm:hidden lg:hidden">
        {!tabletLoaded && <ImageSkeleton className="aspect-27/10" />}
        <Image
          src={images.tablet.dark}
          alt={alt}
          width={images.tablet.width}
          height={images.tablet.height}
          className={clsx(
            'bg-black/75 transition-opacity duration-300',
            tabletLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setTabletLoaded(true)}
        />
      </div>

      {/* Small desktop - light */}
      <div className="relative max-lg:hidden xl:hidden dark:hidden">
        {!smallDesktopLoaded && <ImageSkeleton className="aspect-square" />}
        <Image
          src={images.smallDesktop.light}
          alt={alt}
          width={images.smallDesktop.width}
          height={images.smallDesktop.height}
          className={clsx(
            'bg-white/75 transition-opacity duration-300',
            smallDesktopLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setSmallDesktopLoaded(true)}
        />
      </div>

      {/* Small desktop - dark */}
      <div className="relative not-dark:hidden max-lg:hidden xl:hidden">
        {!smallDesktopLoaded && <ImageSkeleton className="aspect-square" />}
        <Image
          src={images.smallDesktop.dark}
          alt={alt}
          width={images.smallDesktop.width}
          height={images.smallDesktop.height}
          className={clsx(
            'bg-black/75 transition-opacity duration-300',
            smallDesktopLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setSmallDesktopLoaded(true)}
        />
      </div>

      {/* Large desktop - light */}
      <div className="relative max-xl:hidden dark:hidden">
        {!largeDesktopLoaded && <ImageSkeleton className="aspect-36/25" />}
        <Image
          src={images.largeDesktop.light}
          alt={alt}
          width={images.largeDesktop.width}
          height={images.largeDesktop.height}
          className={clsx(
            'bg-white/75 transition-opacity duration-300',
            largeDesktopLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setLargeDesktopLoaded(true)}
        />
      </div>

      {/* Large desktop - dark */}
      <div className="relative not-dark:hidden max-xl:hidden">
        {!largeDesktopLoaded && <ImageSkeleton className="aspect-36/25" />}
        <Image
          src={images.largeDesktop.dark}
          alt={alt}
          width={images.largeDesktop.width}
          height={images.largeDesktop.height}
          className={clsx(
            'bg-black/75 transition-opacity duration-300',
            largeDesktopLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setLargeDesktopLoaded(true)}
        />
      </div>
    </>
  )
}

/**
 * Preset image configurations for common screenshot layouts
 */
export const SCREENSHOT_PRESETS = {
  /** Left-aligned screenshot placement */
  left: {
    mobile: {
      light: '/img/screenshots/1-left-1000-top-800.webp',
      dark: '/img/screenshots/1-color-olive-left-1000-top-800.webp',
      width: 1000,
      height: 800,
    },
    tablet: {
      light: '/img/screenshots/1-left-1800-top-660.webp',
      dark: '/img/screenshots/1-color-olive-left-1800-top-660.webp',
      width: 1800,
      height: 660,
    },
    smallDesktop: {
      light: '/img/screenshots/1-left-1300-top-1300.webp',
      dark: '/img/screenshots/1-color-olive-left-1300-top-1300.webp',
      width: 1300,
      height: 1300,
    },
    largeDesktop: {
      light: '/img/screenshots/1-left-1800-top-1250.webp',
      dark: '/img/screenshots/1-color-olive-left-1800-top-1250.webp',
      width: 1800,
      height: 1250,
    },
  },
  /** Right-aligned screenshot placement */
  right: {
    mobile: {
      light: '/img/screenshots/1-right-1000-top-800.webp',
      dark: '/img/screenshots/1-color-olive-right-1000-top-800.webp',
      width: 1000,
      height: 800,
    },
    tablet: {
      light: '/img/screenshots/1-right-1800-top-660.webp',
      dark: '/img/screenshots/1-color-olive-right-1800-top-660.webp',
      width: 1800,
      height: 660,
    },
    smallDesktop: {
      light: '/img/screenshots/1-right-1300-top-1300.webp',
      dark: '/img/screenshots/1-color-olive-right-1300-top-1300.webp',
      width: 1300,
      height: 1300,
    },
    largeDesktop: {
      light: '/img/screenshots/1-right-1800-top-1250.webp',
      dark: '/img/screenshots/1-color-olive-right-1800-top-1250.webp',
      width: 1800,
      height: 1250,
    },
  },
} as const
