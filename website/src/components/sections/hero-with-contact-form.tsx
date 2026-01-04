'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'
import { Button } from '../elements/button'
import { Input, Textarea, Label } from '../elements/input'
import { Subheading } from '../elements/subheading'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { AlertTriangleIcon } from '../icons/alert-triangle-icon'
import { isValidEmail } from '@/lib/validation'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function HeroWithContactForm({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'section'>) {
  const searchParams = useSearchParams()
  const prefilledEmail = searchParams?.get('email') || ''

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    company: '',
    email: prefilledEmail,
    message: '',
  })

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage('')
    }
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name')
      setFormState('error')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email')
      setFormState('error')
      return false
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setFormState('error')
      return false
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter a message')
      setFormState('error')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company || null,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setFormState('success')
    } catch {
      setFormState('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleReset = () => {
    setFormData({ name: '', company: '', email: '', message: '' })
    setFormState('idle')
    setErrorMessage('')
  }

  const isDisabled = formState === 'submitting'

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: Hero content */}
          <div className="flex flex-col justify-center gap-6">
            <Heading>{headline}</Heading>
            <Text size="lg" className="max-w-xl">
              {subheadline}
            </Text>
          </div>

          {/* Right: Contact form */}
          <div className="rounded-xl bg-olive-950/2.5 p-6 sm:p-8 dark:bg-white/5">
            {formState === 'success' ? (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckmarkIcon className="size-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <Subheading>Thank you!</Subheading>
                  <Text className="text-pretty">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </Text>
                </div>
                <Button onClick={handleReset} color="dark/light">
                  Submit another inquiry
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-oxblood dark:text-ember">Get in touch</h2>
                  <p className="mt-2 text-sm text-oxblood/70 dark:text-coral/70">
                    Tell us about your project and we&apos;ll be in touch within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name" required>
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                        disabled={isDisabled}
                        hasError={formState === 'error' && !formData.name.trim()}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Your company"
                        disabled={isDisabled}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" required>
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                      disabled={isDisabled}
                      hasError={formState === 'error' && !formData.email.trim()}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" required>
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your project..."
                      rows={4}
                      required
                      disabled={isDisabled}
                      hasError={formState === 'error' && !formData.message.trim()}
                    />
                  </div>

                  {formState === 'error' && errorMessage && (
                    <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
                      <AlertTriangleIcon className="size-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button type="submit" size="lg" disabled={isDisabled} className="w-full sm:w-auto">
                    {formState === 'submitting' ? 'Sending...' : 'Send message'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

