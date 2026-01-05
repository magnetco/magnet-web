'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'
import { Button, ButtonLink } from '../elements/button'
import { Input, Textarea, Label } from '../elements/input'
import { Subheading } from '../elements/subheading'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { AlertTriangleIcon } from '../icons/alert-triangle-icon'
import { isValidEmail } from '@/lib/validation'
import {
  INDIVIDUAL_SERVICES,
  RETAINER_MONTHLY,
} from '@/lib/pricing-data'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type Intent = 'prospect' | 'vendor' | 'partnership' | 'careers' | null

type PricingBreakdown = {
  services: Array<{
    name: string
    price: number
    isMonthly: boolean
    subOptions?: Array<{ name: string; price: number; isMonthly: boolean }>
  }>
  totalMonthly: number
  totalOneTime: number
  hasHourlyItems: boolean
}

function calculatePricing(
  selectedServices: string[],
  selectedSubOptions: Record<string, string[]>
): PricingBreakdown {
  const breakdown: PricingBreakdown = {
    services: [],
    totalMonthly: 0,
    totalOneTime: 0,
    hasHourlyItems: false,
  }

  // If retainer is selected, that's the only price
  if (selectedServices.includes('retainer')) {
    breakdown.services.push({
      name: 'Full-Service Retainer',
      price: RETAINER_MONTHLY,
      isMonthly: true,
    })
    breakdown.totalMonthly = RETAINER_MONTHLY
    return breakdown
  }

  // Calculate for each selected individual service
  for (const serviceId of selectedServices) {
    const service = INDIVIDUAL_SERVICES.find(s => s.id === serviceId)
    if (!service) continue

    const subOptionIds = selectedSubOptions[serviceId] || []

    // If no sub-options selected, use the service minimum price
    if (subOptionIds.length === 0) {
      const isMonthly = service.id === 'paid-media' || service.id === 'search-marketing'
      const isOneTime = service.id === 'branding' || service.id === 'websites'
      
      breakdown.services.push({
        name: service.label,
        price: service.minPrice,
        isMonthly,
      })

      if (isMonthly) {
        breakdown.totalMonthly += service.minPrice
      } else if (isOneTime) {
        breakdown.totalOneTime += service.minPrice
      }
    } else {
      // Calculate based on selected sub-options
      const serviceBreakdown = {
        name: service.label,
        price: 0,
        isMonthly: service.id === 'paid-media' || service.id === 'search-marketing',
        subOptions: [] as Array<{ name: string; price: number; isMonthly: boolean }>,
      }

      for (const subOptionId of subOptionIds) {
        const subOption = service.subOptions.find(o => o.id === subOptionId)
        if (!subOption) continue

        const isHourly = subOption.priceNote === 'per hour'
        const isMonthly = subOption.priceNote === '/month'
        const isOneTime = subOption.priceNote === 'fixed price' || subOption.priceNote === 'starting price'

        if (isHourly) {
          breakdown.hasHourlyItems = true
        }

        serviceBreakdown.subOptions!.push({
          name: subOption.name,
          price: subOption.price,
          isMonthly: isMonthly || isHourly,
        })

        serviceBreakdown.price += subOption.price

        if (isMonthly) {
          breakdown.totalMonthly += subOption.price
        } else if (isOneTime) {
          breakdown.totalOneTime += subOption.price
        }
      }

      breakdown.services.push(serviceBreakdown)
    }
  }

  return breakdown
}

export function HeroWithContactForm({
  headline,
  subheadline,
  layout = 'side-by-side',
  className,
  withGridBg = false,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
  layout?: 'side-by-side' | 'stacked'
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const searchParams = useSearchParams()
  const prefilledEmail = searchParams?.get('email') || ''
  const prefilledService = searchParams?.get('service') || ''
  const prefilledOption = searchParams?.get('option') || ''

  // Initialize state based on URL params
  const getInitialIntent = (): Intent => prefilledService ? 'prospect' : null
  const getInitialServices = (): string[] => {
    if (prefilledService === 'retainer') return ['retainer']
    if (prefilledService && INDIVIDUAL_SERVICES.some(s => s.id === prefilledService)) {
      return [prefilledService]
    }
    return []
  }
  const getInitialSubOptions = (): Record<string, string[]> => {
    if (prefilledService && prefilledOption) {
      const service = INDIVIDUAL_SERVICES.find(s => s.id === prefilledService)
      if (service && service.subOptions.some(o => o.id === prefilledOption)) {
        return { [prefilledService]: [prefilledOption] }
      }
    }
    return {}
  }

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [intent, setIntent] = useState<Intent>(getInitialIntent)
  const [selectedServices, setSelectedServices] = useState<string[]>(getInitialServices)
  const [selectedSubOptions, setSelectedSubOptions] = useState<Record<string, string[]>>(getInitialSubOptions)
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    company: '',
    email: prefilledEmail,
    message: '',
  })

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      // If toggling retainer
      if (serviceId === 'retainer') {
        // If retainer is already selected, deselect it
        if (prev.includes('retainer')) {
          setSelectedSubOptions({})
          return []
        }
        // Otherwise select only retainer
        setSelectedSubOptions({})
        return ['retainer']
      }

      // If retainer is currently selected and we're selecting an individual service,
      // switch to just that individual service
      if (prev.includes('retainer')) {
        return [serviceId]
      }

      // Toggle the individual service
      const newSelection = prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]

      // Clear sub-options for deselected services
      if (!newSelection.includes(serviceId)) {
        setSelectedSubOptions((prev) => {
          const updated = { ...prev }
          delete updated[serviceId]
          return updated
        })
      }

      return newSelection
    })
  }

  const toggleSubOption = (serviceId: string, subOptionId: string) => {
    setSelectedSubOptions((prev) => {
      const current = prev[serviceId] || []
      const newSelection = current.includes(subOptionId)
        ? current.filter((id) => id !== subOptionId)
        : [...current, subOptionId]
      
      return {
        ...prev,
        [serviceId]: newSelection,
      }
    })
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage('')
    }
  }

  const validateForm = (): boolean => {
    if (!intent) {
      setErrorMessage('Please select what brings you here')
      setFormState('error')
      return false
    }
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
          intent,
          services: intent === 'prospect' ? selectedServices : [],
          subOptions: intent === 'prospect' ? selectedSubOptions : {},
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
    setIntent(null)
    setSelectedServices([])
    setSelectedSubOptions({})
  }

  const isDisabled = formState === 'submitting'

  const formContent = (
    <Container className={clsx(layout === 'stacked' && '!max-w-2xl')}>
      <div className={clsx(
        'grid grid-cols-1 gap-12',
        layout === 'side-by-side' && 'lg:grid-cols-2 lg:gap-24'
      )}>
          {/* Hero content */}
          <div className={clsx(
            'flex flex-col gap-6',
            layout === 'stacked' ? 'text-center items-center' : 'justify-center'
          )}>
            {typeof headline === 'string' ? <Heading>{headline}</Heading> : headline}
            <Text size="lg" className={layout === 'stacked' ? 'max-w-2xl' : 'max-w-xl'}>
              {subheadline}
            </Text>
          </div>

          {/* Contact form */}
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
                {layout === 'side-by-side' && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-oxblood dark:text-ember">Get in touch</h2>
                    <p className="mt-2 text-sm text-oxblood/70 dark:text-coral/70">
                      Tell us about your project and we&apos;ll be in touch within 24 hours.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Intent Selection */}
                  <div>
                    <Label required>What brings you here?</Label>

                    {/* Primary Option - Large Card */}
                    <label
                      className={clsx(
                        'mt-3 flex cursor-pointer flex-col gap-2 rounded-xl border-2 p-4 transition-all',
                        intent === 'prospect'
                          ? 'border-ember bg-gradient-to-br from-ember/10 to-coral/5 dark:from-ember/20 dark:to-coral/10'
                          : 'border-oxblood/10 hover:border-ember/50 hover:bg-ember/[0.02] dark:border-white/10 dark:hover:border-ember/50'
                      )}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value="prospect"
                        checked={intent === 'prospect'}
                        onChange={() => setIntent('prospect')}
                        disabled={isDisabled}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <span
                          className={clsx(
                            'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                            intent === 'prospect'
                              ? 'border-ember bg-ember'
                              : 'border-oxblood/30 dark:border-white/30'
                          )}
                        >
                          {intent === 'prospect' && (
                            <span className="size-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span className="text-base font-semibold text-oxblood dark:text-ember">
                          I&apos;m looking to hire Magnet
                        </span>
                      </div>
                      <p className="ml-8 text-sm text-oxblood/60 dark:text-coral/60">
                        Get a proposal for branding, websites, paid ads, or search marketing
                      </p>
                    </label>

                    {/* Secondary Options - Full Width with Descriptions */}
                    <div className="mt-2 flex flex-col gap-2">
                      {[
                        { value: 'partnership', label: 'Partnership opportunities', description: 'Collaborate on joint ventures, referrals, or co-marketing' },
                        { value: 'vendor', label: 'Vendor inquiry', description: 'Offer your services or products to our team' },
                        { value: 'careers', label: 'Join our team', description: 'Explore open positions and career opportunities' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={clsx(
                            'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-all',
                            intent === option.value
                              ? 'border-ember bg-ember/5 dark:border-ember dark:bg-ember/10'
                              : 'border-oxblood/10 hover:border-oxblood/20 hover:bg-oxblood/[0.02] dark:border-white/10 dark:hover:border-white/20'
                          )}
                        >
                          <input
                            type="radio"
                            name="intent"
                            value={option.value}
                            checked={intent === option.value}
                            onChange={() => setIntent(option.value as Intent)}
                            disabled={isDisabled}
                            className="sr-only"
                          />
                          <span
                            className={clsx(
                              'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                              intent === option.value
                                ? 'border-ember bg-ember'
                                : 'border-oxblood/30 dark:border-white/30'
                            )}
                          >
                            {intent === option.value && (
                              <span className="size-1.5 rounded-full bg-white" />
                            )}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-oxblood dark:text-coral">
                              {option.label}
                            </span>
                            <span className="text-xs text-oxblood/60 dark:text-coral/60">
                              {option.description}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Service Selection - Only show for prospects */}
                  {intent === 'prospect' && (
                    <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      <Label>Which services interest you?</Label>

                      {/* Primary Option - Full-Service Retainer */}
                      <label
                        className={clsx(
                          'mt-2 flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-all',
                          selectedServices.includes('retainer')
                            ? 'border-ember bg-gradient-to-br from-ember/10 to-coral/5 dark:from-ember/20 dark:to-coral/10'
                            : 'border-oxblood/10 hover:border-ember/50 hover:bg-ember/[0.02] dark:border-white/10 dark:hover:border-ember/50'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes('retainer')}
                          onChange={() => toggleService('retainer')}
                          disabled={isDisabled}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={clsx(
                                'flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                                selectedServices.includes('retainer')
                                  ? 'border-ember bg-ember'
                                  : 'border-oxblood/30 dark:border-white/30'
                              )}
                            >
                              {selectedServices.includes('retainer') && (
                                <CheckmarkIcon className="size-3 text-white" />
                              )}
                            </span>
                            <span className="text-base font-semibold text-oxblood dark:text-ember">
                              Full-Service Retainer
                            </span>
                          </div>
                          <span className="text-sm font-medium text-ember">${RETAINER_MONTHLY.toLocaleString()}/mo</span>
                        </div>
                        <p className="ml-8 text-sm text-oxblood/60 dark:text-coral/60">
                          Everything in our method—branding, websites, paid ads, and search marketing
                        </p>
                      </label>

                      {/* Divider */}
                      <div className="my-3 flex items-center gap-3">
                        <div className="h-px flex-1 bg-oxblood/10 dark:bg-white/10" />
                        <span className="text-xs text-oxblood/40 dark:text-coral/40">or choose individual services</span>
                        <div className="h-px flex-1 bg-oxblood/10 dark:bg-white/10" />
                      </div>

                      {/* Individual Services with Sub-Options */}
                      <div className="flex flex-col gap-2">
                        {INDIVIDUAL_SERVICES.map((service) => (
                          <div key={service.id}>
                            {/* Main Service Option */}
                            <label
                              className={clsx(
                                'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all',
                                selectedServices.includes(service.id)
                                  ? 'border-ember bg-ember/5 dark:border-ember dark:bg-ember/10'
                                  : 'border-oxblood/10 hover:border-oxblood/20 hover:bg-oxblood/[0.02] dark:border-white/10 dark:hover:border-white/20'
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service.id)}
                                onChange={() => toggleService(service.id)}
                                disabled={isDisabled}
                                className="sr-only"
                              />
                              <span
                                className={clsx(
                                  'flex size-4 shrink-0 items-center justify-center rounded border-2 transition-colors',
                                  selectedServices.includes(service.id)
                                    ? 'border-ember bg-ember'
                                    : 'border-oxblood/30 dark:border-white/30'
                                )}
                              >
                                {selectedServices.includes(service.id) && (
                                  <CheckmarkIcon className="size-2.5 text-white" />
                                )}
                              </span>
                              <span className="flex flex-1 items-center justify-between gap-1">
                                <span className="text-sm font-medium text-oxblood dark:text-coral">
                                  {service.label}
                                </span>
                                <span className="text-xs text-oxblood/50 dark:text-coral/50">
                                  {service.price}
                                </span>
                              </span>
                            </label>

                            {/* Sub-Options - Show when service is selected */}
                            {selectedServices.includes(service.id) && (
                              <div className="animate-in fade-in-0 slide-in-from-top-1 mt-2 ml-6 flex flex-col gap-1.5 border-l-2 border-ember/20 pl-3 duration-200">
                                <span className="text-xs font-medium text-oxblood/60 dark:text-coral/60">
                                  Select specific options (optional):
                                </span>
                                {service.subOptions.map((subOption) => (
                                  <label
                                    key={subOption.id}
                                    className={clsx(
                                      'flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 transition-all',
                                      selectedSubOptions[service.id]?.includes(subOption.id)
                                        ? 'border-ember/50 bg-ember/5 dark:border-ember/50 dark:bg-ember/10'
                                        : 'border-oxblood/5 bg-oxblood/[0.02] hover:border-oxblood/10 hover:bg-oxblood/[0.04] dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/10'
                                    )}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedSubOptions[service.id]?.includes(subOption.id) || false}
                                      onChange={() => toggleSubOption(service.id, subOption.id)}
                                      disabled={isDisabled}
                                      className="sr-only"
                                    />
                                    <span
                                      className={clsx(
                                        'flex size-3 shrink-0 items-center justify-center rounded-sm border transition-colors',
                                        selectedSubOptions[service.id]?.includes(subOption.id)
                                          ? 'border-ember bg-ember'
                                          : 'border-oxblood/30 dark:border-white/30'
                                      )}
                                    >
                                      {selectedSubOptions[service.id]?.includes(subOption.id) && (
                                        <CheckmarkIcon className="size-2 text-white" />
                                      )}
                                    </span>
                                    <span className="flex flex-1 items-center justify-between gap-1">
                                      <span className="text-xs font-medium text-oxblood dark:text-coral">
                                        {subOption.name}
                                      </span>
                                      <span className="text-[10px] text-oxblood/50 dark:text-coral/50">
                                        {subOption.priceFormatted}{subOption.priceNote !== 'fixed price' && subOption.priceNote !== 'starting price' && subOption.priceNote !== 'per hour' ? subOption.priceNote : ''}
                                      </span>
                                    </span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Pricing Summary */}
                      {selectedServices.length > 0 && (
                        <div className="animate-in fade-in-0 slide-in-from-top-1 mt-4 rounded-lg border border-ember/20 bg-gradient-to-br from-ember/5 to-coral/5 p-4 duration-200 dark:from-ember/10 dark:to-coral/5">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-oxblood/70 dark:text-coral/70">
                              Estimated investment
                            </span>
                            <div className="text-right">
                              {(() => {
                                const pricing = calculatePricing(selectedServices, selectedSubOptions)
                                const parts: string[] = []
                                
                                if (pricing.totalOneTime > 0) {
                                  parts.push(`$${pricing.totalOneTime.toLocaleString()} one-time`)
                                }
                                if (pricing.totalMonthly > 0) {
                                  parts.push(`$${pricing.totalMonthly.toLocaleString()}/mo`)
                                }
                                
                                return (
                                  <div className="flex flex-col items-end gap-0.5">
                                    <span className="text-base font-semibold text-ember">
                                      {parts.join(' + ') || 'Contact for quote'}
                                    </span>
                                    {pricing.hasHourlyItems && (
                                      <span className="text-[10px] text-oxblood/50 dark:text-coral/50">
                                        + hourly development
                                      </span>
                                    )}
                                    {pricing.services.some(s => s.subOptions?.length === 0) && !selectedServices.includes('retainer') && (
                                      <span className="text-[10px] text-oxblood/50 dark:text-coral/50">
                                        Starting from
                                      </span>
                                    )}
                                  </div>
                                )
                              })()}
                            </div>
                          </div>
                          
                          {/* Breakdown */}
                          {selectedServices.length > 0 && !selectedServices.includes('retainer') && (
                            <div className="mt-3 border-t border-ember/10 pt-3">
                              <div className="flex flex-col gap-1.5">
                                {(() => {
                                  const pricing = calculatePricing(selectedServices, selectedSubOptions)
                                  return pricing.services.map((service, idx) => (
                                    <div key={idx} className="flex flex-col gap-0.5">
                                      <div className="flex items-center justify-between gap-2 text-xs">
                                        <span className="font-medium text-oxblood/80 dark:text-coral/80">
                                          {service.name}
                                        </span>
                                        {service.subOptions && service.subOptions.length > 0 ? (
                                          <span className="text-oxblood/50 dark:text-coral/50">
                                            ${service.price.toLocaleString()}{service.isMonthly ? '/mo' : ''}
                                          </span>
                                        ) : (
                                          <span className="text-oxblood/50 dark:text-coral/50">
                                            from ${service.price.toLocaleString()}{service.isMonthly ? '/mo' : ''}
                                          </span>
                                        )}
                                      </div>
                                      {service.subOptions && service.subOptions.length > 0 && (
                                        <div className="ml-3 flex flex-col gap-0.5">
                                          {service.subOptions.map((sub, subIdx) => (
                                            <div key={subIdx} className="flex items-center justify-between gap-2 text-[10px] text-oxblood/50 dark:text-coral/50">
                                              <span>{sub.name}</span>
                                              <span>${sub.price.toLocaleString()}{sub.isMonthly ? '/mo' : ''}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vendor/Partnership/Careers Message */}
                  {(intent === 'vendor' || intent === 'partnership' || intent === 'careers') && (
                    <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      {intent === 'vendor' && (
                        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                          <p>
                            For vendor inquiries, please email{' '}
                            <a href="mailto:vendors@magnet.co" className="font-medium underline">
                              vendors@magnet.co
                            </a>{' '}
                            directly. We review vendor submissions monthly.
                          </p>
                        </div>
                      )}
                      {intent === 'partnership' && (
                        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                          <p>
                            For partnership opportunities, please include details about your company and
                            the type of partnership you have in mind.
                          </p>
                        </div>
                      )}
                      {intent === 'careers' && (
                        <div className="flex flex-col items-center gap-4 rounded-xl bg-gradient-to-br from-powder/30 to-juniper/10 p-6 text-center dark:from-powder/10 dark:to-juniper/5">
                          <div className="text-3xl">🚀</div>
                          <div>
                            <h3 className="font-semibold text-oxblood dark:text-ember">
                              Join our team
                            </h3>
                            <p className="mt-1 text-sm text-oxblood/70 dark:text-coral/70">
                              Explore open positions and learn about working at Magnet
                            </p>
                          </div>
                          <ButtonLink href="/careers" size="md">
                            View open positions
                          </ButtonLink>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Only show full form for prospects, partnerships, and other - not vendor/careers */}
                  {intent && intent !== 'vendor' && intent !== 'careers' && (
                    <div className="animate-in fade-in-0 slide-in-from-top-2 flex flex-col gap-5 duration-300">
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
                          placeholder={
                            intent === 'prospect'
                              ? 'Tell us about your project and goals...'
                              : intent === 'partnership'
                                ? 'Tell us about your company and partnership idea...'
                                : 'How can we help?'
                          }
                          rows={4}
                          required
                          disabled={isDisabled}
                          hasError={formState === 'error' && !formData.message.trim()}
                        />
                      </div>
                    </div>
                  )}

                  {formState === 'error' && errorMessage && (
                    <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
                      <AlertTriangleIcon className="size-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {intent && intent !== 'vendor' && intent !== 'careers' && (
                    <Button type="submit" size="lg" disabled={isDisabled} className="w-full sm:w-auto">
                      {formState === 'submitting' ? 'Sending...' : 'Send message'}
                    </Button>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
  )

  if (withGridBg) {
    return (
      <section className={className} {...props}>
        <GridBgSection showBottomBorder={true} withPadding>
          {formContent}
        </GridBgSection>
      </section>
    )
  }

  return (
    <section className={clsx(sectionPaddingClasses, className)} {...props}>
      {formContent}
    </section>
  )
}
