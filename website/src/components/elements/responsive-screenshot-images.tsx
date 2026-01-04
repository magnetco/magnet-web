import Image from 'next/image'

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
  return (
    <>
      {/* Mobile - light */}
      <Image
        src={images.mobile.light}
        alt={alt}
        width={images.mobile.width}
        height={images.mobile.height}
        className="bg-white/75 sm:hidden dark:hidden"
      />
      {/* Mobile - dark */}
      <Image
        src={images.mobile.dark}
        alt={alt}
        width={images.mobile.width}
        height={images.mobile.height}
        className="bg-black/75 not-dark:hidden sm:hidden"
      />
      {/* Tablet - light */}
      <Image
        src={images.tablet.light}
        alt={alt}
        width={images.tablet.width}
        height={images.tablet.height}
        className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
      />
      {/* Tablet - dark */}
      <Image
        src={images.tablet.dark}
        alt={alt}
        width={images.tablet.width}
        height={images.tablet.height}
        className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
      />
      {/* Small desktop - light */}
      <Image
        src={images.smallDesktop.light}
        alt={alt}
        width={images.smallDesktop.width}
        height={images.smallDesktop.height}
        className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
      />
      {/* Small desktop - dark */}
      <Image
        src={images.smallDesktop.dark}
        alt={alt}
        width={images.smallDesktop.width}
        height={images.smallDesktop.height}
        className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
      />
      {/* Large desktop - light */}
      <Image
        src={images.largeDesktop.light}
        alt={alt}
        width={images.largeDesktop.width}
        height={images.largeDesktop.height}
        className="bg-white/75 max-xl:hidden dark:hidden"
      />
      {/* Large desktop - dark */}
      <Image
        src={images.largeDesktop.dark}
        alt={alt}
        width={images.largeDesktop.width}
        height={images.largeDesktop.height}
        className="bg-black/75 not-dark:hidden max-xl:hidden"
      />
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

