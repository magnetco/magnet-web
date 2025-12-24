'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { Button } from '../elements/button'
import { AlertTriangleIcon } from '../icons/alert-triangle-icon'

export function CallToActionWithEmail({
  eyebrow,
  headline,
  subheadline,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Redirect to contact page with email prefilled
    router.push(`/contact?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex max-w-4xl flex-col gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Subheading>{headline}</Subheading>
          </div>
          {subheadline && <Text className="flex max-w-3xl flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1 max-w-96">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              placeholder="you@example.com"
              className={clsx(
                'w-full rounded-lg border-2 bg-white px-4 py-2 text-sm/7 text-oxblood placeholder:text-oxblood/40 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white/5 dark:text-coral dark:placeholder:text-coral/40',
                error
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400'
                  : 'border-oxblood/20 focus:border-ember focus:ring-ember/20 dark:border-white/20 dark:focus:border-ember',
              )}
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
    </section>
  )
}

