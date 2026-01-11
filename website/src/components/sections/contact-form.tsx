'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { Button } from '../elements/button'
import { Input, Textarea, Select, Label } from '../elements/input'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { AlertTriangleIcon } from '../icons/alert-triangle-icon'
import { isValidEmail } from '@/lib/validation'

type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  rows?: number
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
    required: true,
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Your company name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your inquiry...',
    rows: 4,
    required: true,
  },
]

export function ContactForm({
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
  const searchParams = useSearchParams()
  const prefilledEmail = searchParams?.get('email') || ''

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<Record<string, string | boolean | string[]>>(
    prefilledEmail ? { email: prefilledEmail } : {}
  )

  const fields = FORM_FIELDS

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage('')
    }
  }

  const validateForm = (): boolean => {
    for (const field of fields) {
      if (field.required) {
        const value = formData[field.name]
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          setErrorMessage(`Please fill in ${field.label.toLowerCase()}`)
          setFormState('error')
          return false
        }
      }
    }

    // Validate email fields
    for (const field of fields) {
      if (field.type === 'email' && formData[field.name]) {
        const email = formData[field.name] as string
        if (!isValidEmail(email)) {
          setErrorMessage('Please enter a valid email address')
          setFormState('error')
          return false
        }
      }
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
          name: formData.name as string,
          company: (formData.company as string) || null,
          email: formData.email as string,
          message: formData.message as string,
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
    setFormData({})
    setFormState('idle')
    setErrorMessage('')
  }

  const renderSection = (content: React.ReactNode) => {
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

  if (formState === 'success') {
    return renderSection(
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckmarkIcon className="size-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex flex-col gap-2">
            <Subheading>Thank you for your interest!</Subheading>
            <Text className="text-pretty">
              We&apos;ve received your message and will get back to you within 24 hours.
            </Text>
          </div>
          <Button onClick={handleReset} color="dark/light">
            Submit another inquiry
          </Button>
        </div>
      </Container>
    )
  }

  return renderSection(
    <Container className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex max-w-4xl flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline}
        </div>
        {subheadline && <Text className="flex max-w-3xl flex-col gap-4 text-pretty">{subheadline}</Text>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((field) => {
              const value = formData[field.name] || ''
              const isError = formState === 'error' && field.required && !value
              const isDisabled = formState === 'submitting'

              if (field.type === 'textarea') {
                return (
                  <div key={field.name} className="sm:col-span-2">
                    <Label htmlFor={field.name} required={field.required}>
                      {field.label}
                    </Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={value as string}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={field.rows || 4}
                      disabled={isDisabled}
                      hasError={isError}
                    />
                  </div>
                )
              }

              if (field.type === 'select') {
                return (
                  <div key={field.name}>
                    <Label htmlFor={field.name} required={field.required}>
                      {field.label}
                    </Label>
                    <Select
                      id={field.name}
                      name={field.name}
                      value={value as string}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={isDisabled}
                      hasError={isError}
                    >
                      <option value="">{field.placeholder || 'Select an option'}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                )
              }

              return (
                <div key={field.name}>
                  <Label htmlFor={field.name} required={field.required}>
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={value as string}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={isDisabled}
                    hasError={isError}
                  />
                </div>
              )
            })}
          </div>

          {formState === 'error' && errorMessage && (
            <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
              <AlertTriangleIcon className="size-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-4">
          <Button type="submit" size="lg" disabled={formState === 'submitting'}>
            {formState === 'submitting' ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Container>
  )
}
