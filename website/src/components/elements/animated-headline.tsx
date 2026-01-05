'use client'

import { useGSAP } from '@gsap/react'
import { clsx } from 'clsx/lite'
import gsap from 'gsap'
import { useEffect, useRef, type ComponentProps } from 'react'

gsap.registerPlugin(useGSAP)

export type AnimationVariant =
  | 'wave-blur'
  | 'perspective-flip'
  | 'scramble-decode'
  | 'stroke-fill'
  | 'elastic-wipe'

interface AnimatedHeadlineProps extends Omit<ComponentProps<'h1'>, 'children'> {
  children: string
  variant?: AnimationVariant
  color?: 'dark/light' | 'light'
  delay?: number
}

export function AnimatedHeadline({
  children,
  variant = 'wave-blur',
  color = 'dark/light',
  delay = 0.2,
  className,
  ...props
}: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const hasAnimated = useRef(false)

  useGSAP(
    () => {
      if (hasAnimated.current || !containerRef.current) return
      hasAnimated.current = true

      const container = containerRef.current

      switch (variant) {
        case 'wave-blur':
          animateWaveBlur(container, delay)
          break
        case 'perspective-flip':
          animatePerspectiveFlip(container, delay)
          break
        case 'scramble-decode':
          animateScrambleDecode(container, delay)
          break
        case 'stroke-fill':
          animateStrokeFill(container, delay)
          break
        case 'elastic-wipe':
          animateElasticWipe(container, delay)
          break
      }
    },
    { scope: containerRef, dependencies: [variant, delay] },
  )

  // Fallback: ensure visibility after timeout if GSAP hasn't run
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasAnimated.current && containerRef.current) {
        hasAnimated.current = true
        const container = containerRef.current
        container.style.visibility = 'visible'
        // Make all chars/words visible
        container.querySelectorAll('.char, .word, .stroke-word').forEach((el) => {
          ;(el as HTMLElement).style.visibility = 'visible'
          ;(el as HTMLElement).style.opacity = '1'
        })
      }
    }, 100)
    return () => clearTimeout(timeout)
  }, [variant])

  // Render based on variant requirements
  const renderContent = () => {
    switch (variant) {
      case 'wave-blur':
      case 'elastic-wipe':
        return renderCharacters(children)
      case 'perspective-flip':
        return renderWords(children)
      case 'scramble-decode':
        return <span className="scramble-text">{children}</span>
      case 'stroke-fill':
        return renderWordsForStroke(children)
      default:
        return children
    }
  }

  return (
    <h1
      ref={containerRef}
      className={clsx(
        'font-display text-5xl/12 tracking-tight text-balance sm:text-[5rem]/20',
        color === 'dark/light' && 'text-oxblood dark:text-ember',
        color === 'light' && 'text-white',
        variant === 'perspective-flip' && 'perspective-[1000px]',
        variant === 'stroke-fill' && 'stroke-headline',
        className,
      )}
      style={{
        // Initial hidden state for non-scramble variants
        ...(variant !== 'scramble-decode' && { visibility: 'hidden' }),
      }}
      {...props}
    >
      {renderContent()}
    </h1>
  )
}

// Helper to render characters wrapped in spans
function renderCharacters(text: string) {
  const words = text.split(' ')
  return words.map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap">
      {word.split('').map((char, charIndex) => (
        <span key={charIndex} className="char inline-block" style={{ visibility: 'hidden' }}>
          {char}
        </span>
      ))}
      {wordIndex < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
    </span>
  ))
}

// Helper to render words wrapped in spans
function renderWords(text: string) {
  const words = text.split(' ')
  return words.map((word, index) => (
    <span key={index} className="word-wrapper inline-block overflow-hidden">
      <span className="word inline-block" style={{ visibility: 'hidden', transformStyle: 'preserve-3d' }}>
        {word}
      </span>
      {index < words.length - 1 && <span>&nbsp;</span>}
    </span>
  ))
}

// Helper to render words for stroke animation
function renderWordsForStroke(text: string) {
  const words = text.split(' ')
  return words.map((word, index) => (
    <span key={index} className="stroke-word inline-block" data-text={word} style={{ visibility: 'hidden' }}>
      {word}
      {index < words.length - 1 && <span>&nbsp;</span>}
    </span>
  ))
}

// Animation: Wave Blur (Option 1)
function animateWaveBlur(container: HTMLElement, delay: number) {
  const chars = container.querySelectorAll('.char')
  if (!chars.length) return

  // Make container visible
  container.style.visibility = 'visible'

  gsap.set(chars, {
    visibility: 'visible',
    opacity: 0,
    y: '100%',
    filter: 'blur(8px)',
    scale: 1.1,
  })

  gsap.to(chars, {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    scale: 1,
    duration: 0.8,
    ease: 'power3.out',
    stagger: {
      each: 0.02,
      from: 'start',
    },
    delay,
  })
}

// Animation: Perspective Flip (Option 2)
function animatePerspectiveFlip(container: HTMLElement, delay: number) {
  const words = container.querySelectorAll('.word')
  if (!words.length) return

  // Make container visible
  container.style.visibility = 'visible'

  gsap.set(words, {
    visibility: 'visible',
    rotateX: -90,
    opacity: 0,
    transformOrigin: 'center bottom',
    z: -200,
  })

  gsap.to(words, {
    rotateX: 0,
    opacity: 1,
    z: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: {
      each: 0.12,
      from: 'start',
    },
    delay,
  })
}

// Animation: Scramble Decode (Option 3)
function animateScrambleDecode(container: HTMLElement, delay: number) {
  const textElement = container.querySelector('.scramble-text')
  if (!textElement) return

  const originalText = textElement.textContent || ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  const duration = 1.5
  const revealDuration = duration * 0.7

  // Start with scrambled text
  const scrambled = originalText
    .split('')
    .map((c) => (c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
    .join('')
  textElement.textContent = scrambled

  // Animate each character position
  const obj = { progress: 0 }

  gsap.to(obj, {
    progress: 1,
    duration: duration,
    delay,
    ease: 'power2.inOut',
    onUpdate: () => {
      const currentProgress = obj.progress
      let result = ''

      for (let i = 0; i < originalText.length; i++) {
        const charProgress = (currentProgress * originalText.length - i) / (originalText.length * (1 - revealDuration))

        if (originalText[i] === ' ') {
          result += ' '
        } else if (charProgress >= 1) {
          // Revealed
          result += originalText[i]
        } else if (charProgress > 0) {
          // Scrambling
          result += chars[Math.floor(Math.random() * chars.length)]
        } else {
          // Not yet started
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      textElement.textContent = result
    },
    onComplete: () => {
      textElement.textContent = originalText
      // Subtle scale pulse on complete
      gsap.fromTo(
        container,
        { scale: 1.02 },
        {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
      )
    },
  })
}

// Animation: Stroke Fill (Option 4)
function animateStrokeFill(container: HTMLElement, delay: number) {
  const words = container.querySelectorAll('.stroke-word')
  if (!words.length) return

  // Make container visible
  container.style.visibility = 'visible'

  // Set initial state - stroke only, no fill
  gsap.set(words, {
    visibility: 'visible',
    opacity: 0,
    '--stroke-progress': 0,
    '--fill-progress': 0,
  })

  // Create timeline for each word
  const tl = gsap.timeline({ delay })

  words.forEach((word, index) => {
    const wordTl = gsap.timeline()

    // Fade in with stroke
    wordTl.to(word, {
      opacity: 1,
      duration: 0.1,
    })

    // Animate stroke drawing
    wordTl.to(
      word,
      {
        '--stroke-progress': 1,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '<',
    )

    // Animate fill
    wordTl.to(
      word,
      {
        '--fill-progress': 1,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.2',
    )

    tl.add(wordTl, index * 0.15)
  })
}

// Animation: Elastic Wipe (Option 5)
function animateElasticWipe(container: HTMLElement, delay: number) {
  const chars = container.querySelectorAll('.char')
  if (!chars.length) return

  // Make container visible
  container.style.visibility = 'visible'

  // Set initial state
  gsap.set(chars, {
    visibility: 'visible',
    opacity: 0,
    y: 40,
    rotation: -5,
    clipPath: 'inset(0 100% 0 0)',
  })

  // Animate reveal with clip-path on container
  gsap.to(container, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: 'power3.out',
    delay,
  })

  // Animate characters with elastic bounce
  gsap.to(chars, {
    opacity: 1,
    y: 0,
    rotation: 0,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
    stagger: {
      each: 0.025,
      from: 'start',
    },
    delay,
  })
}

