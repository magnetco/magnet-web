'use client'

import { clsx } from 'clsx/lite'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'
import { ButtonLink } from '../elements/button'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { HoverGradient } from '../elements/use-hover-gradient'

function BillingToggle({
  isYearly,
  onToggle,
}: {
  isYearly: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={clsx(
          'text-sm font-medium transition-colors duration-300',
          !isYearly ? 'text-oxblood dark:text-ember' : 'text-basalt/60 dark:text-coral/60'
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="group relative h-8 w-16 cursor-pointer rounded-full bg-oxblood/10 p-1 transition-colors duration-300 hover:bg-oxblood/15 dark:bg-white/10 dark:hover:bg-white/15"
        aria-label={isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'}
      >
        <div
          className={clsx(
            'h-6 w-6 rounded-full bg-ember shadow-sm transition-all duration-300 ease-out',
            isYearly ? 'translate-x-8' : 'translate-x-0'
          )}
        />
      </button>
      <span
        className={clsx(
          'text-sm font-medium transition-colors duration-300',
          isYearly ? 'text-oxblood dark:text-ember' : 'text-basalt/60 dark:text-coral/60'
        )}
      >
        Yearly
        <span className="ml-1.5 inline-flex items-center rounded-full bg-ember/10 px-2 py-0.5 text-xs font-medium text-ember">
          Save 10%
        </span>
      </span>
    </div>
  )
}

function MethodPhase({
  name,
  isActive,
  isLast,
}: {
  name: string
  isActive?: boolean
  isLast?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          'flex h-8 items-center rounded-full px-4 text-sm font-medium transition-all duration-300',
          isActive
            ? 'bg-ember text-white'
            : 'bg-oxblood/5 text-oxblood/70 dark:bg-white/10 dark:text-coral/70'
        )}
      >
        {name}
      </div>
      {!isLast && (
        <svg
          className="h-4 w-4 text-oxblood/30 dark:text-coral/30"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </div>
  )
}

export function PricingRetainerHero({
  eyebrow,
  headline,
  subheadline,
  monthlyPrice,
  yearlyPrice,
  features,
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  footer?: ReactNode
} & ComponentProps<'section'>) {
  const [isYearly, setIsYearly] = useState(false)

  const yearlyTotal = yearlyPrice * 12
  const yearlySavings = (monthlyPrice * 12) - yearlyTotal

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          {eyebrow}
          <Heading>{headline}</Heading>
          <Text size="lg" className="flex max-w-2xl flex-col gap-4 text-center">
            {subheadline}
          </Text>
          <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
        </div>

        {/* Retainer Card */}
        <div className="mx-auto w-full max-w-3xl">
          <HoverGradient className="rounded-2xl bg-oxblood/[0.03] p-8 ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10 sm:p-12">
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col gap-6 border-b border-oxblood/10 pb-8 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex rounded-full bg-ember/10 px-3 py-1 text-xs font-medium text-ember">
                    Full-Service Retainer
                  </div>
                  <h3 className="mt-4 text-2xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-3xl">
                    Complete Marketing System
                  </h3>
                  <p className="mt-2 max-w-md text-base/7 text-oxblood/70 dark:text-coral/70">
                    Everything in our method, delivered as an ongoing partnership. Build, launch, and optimize your entire marketing engine.
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  {isYearly ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-5xl">
                          ${yearlyTotal.toLocaleString()}
                        </span>
                        <span className="text-base text-basalt dark:text-coral/70">/year</span>
                      </div>
                      <p className="mt-1 text-sm text-oxblood/60 dark:text-coral/60">
                        ${yearlyPrice.toLocaleString()}/mo billed annually
                      </p>
                      <p className="text-sm font-medium text-ember">
                        Save ${yearlySavings.toLocaleString()}/year
                      </p>
                    </>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-5xl">
                        ${monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-base text-basalt dark:text-coral/70">/month</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Method Phases */}
              <div className="flex flex-wrap items-center gap-2 border-b border-oxblood/10 py-6 dark:border-white/10">
                <span className="mr-2 text-sm font-medium text-oxblood/50 dark:text-coral/50">
                  Includes:
                </span>
                <MethodPhase name="Foundation" isActive />
                <MethodPhase name="Activation" isActive />
                <MethodPhase name="Acceleration" isActive />
                <MethodPhase name="Retention" isActive isLast />
              </div>

              {/* Features */}
              <div className="grid gap-4 pt-8 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 stroke-ember" />
                    <span className="text-sm/6 text-oxblood dark:text-coral">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ButtonLink href="/contact" size="lg">
                  Book a strategy call
                </ButtonLink>
                <p className="text-sm text-oxblood/60 dark:text-coral/60">
                  No contracts. Cancel anytime.
                </p>
              </div>
            </div>
          </HoverGradient>
        </div>

        {footer}
      </Container>
    </section>
  )
}

