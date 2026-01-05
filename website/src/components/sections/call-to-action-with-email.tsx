'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { Button } from '../elements/button'
import { Input } from '../elements/input'
import { AlertTriangleIcon } from '../icons/alert-triangle-icon'
import { isValidEmail } from '@/lib/validation'

export function CallToActionWithEmail({
  eyebrow,
  headline,
  subheadline,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Redirect to contact page with email prefilled
    router.push(`/contact?email=${encodeURIComponent(email)}`)
  }

  const content = (
    <Container className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex max-w-4xl flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline}
        </div>
        {subheadline && <Text className="flex max-w-3xl flex-col gap-4 text-pretty">{subheadline}</Text>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="max-w-96 flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            placeholder="you@example.com"
            hasError={!!error}
            className="py-2"
          />
          {error && (
            <div className="mt-2 flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400">
              <AlertTriangleIcon className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <Button type="submit" size="lg">
          Schedule a call
        </Button>
      </form>
    </Container>
  )

  if (withGridBg) {
    return (
      <section className={className} {...props}>
        <GridBgSection showBottomBorder={true} withPadding>
          {content}
        </GridBgSection>
      </section>
    )
  }

  return (
    <section className={clsx(sectionPaddingClasses, className)} {...props}>
      {content}
    </section>
  )
}

