'use client'

import { clsx } from 'clsx/lite'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { ButtonLink, SoftButtonLink } from '../elements/button'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { HoverGradient } from '../elements/use-hover-gradient'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'
import {
  RETAINER_MONTHLY,
  RETAINER_YEARLY,
  BRANDING_OPTIONS,
  RETAINER_FEATURES,
} from '@/lib/pricing-data'

function BillingToggle({
  isYearly,
  onToggle,
}: {
  isYearly: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={clsx(
          'text-xs font-medium transition-colors duration-300',
          !isYearly ? 'text-oxblood dark:text-ember' : 'text-basalt/50 dark:text-coral/50'
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="group relative h-6 w-11 cursor-pointer rounded-full bg-oxblood/10 p-0.5 transition-colors duration-300 hover:bg-oxblood/15 dark:bg-white/10 dark:hover:bg-white/15"
        aria-label={isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'}
      >
        <div
          className={clsx(
            'h-5 w-5 rounded-full bg-ember shadow-sm transition-all duration-300 ease-out',
            isYearly ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      <span
        className={clsx(
          'text-xs font-medium transition-colors duration-300',
          isYearly ? 'text-oxblood dark:text-ember' : 'text-basalt/50 dark:text-coral/50'
        )}
      >
        Yearly
        <span className="ml-1 text-[10px] text-ember">-10%</span>
      </span>
    </div>
  )
}

const retainerFeatures = RETAINER_FEATURES.slice(0, 4)

export function PricingBranding({
  eyebrow,
  headline,
  subheadline,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const [isYearly, setIsYearly] = useState(false)
  const currentRetainerPrice = isYearly ? RETAINER_YEARLY : RETAINER_MONTHLY

  const content = (
    <Container>
      {/* Header */}
      {(eyebrow || headline || subheadline) && (
        <div className="mb-12 max-w-2xl">
          <div className="flex flex-col gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {headline && (
              typeof headline === 'string' ? (
                <h2 className="text-3xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-4xl">
                  {headline}
                </h2>
              ) : headline
            )}
          </div>
          {subheadline && (
            <div className="mt-4 text-lg/8 text-oxblood/70 dark:text-coral/70">{subheadline}</div>
          )}
        </div>
      )}

        {/* Branding Options - Two Column */}
        <div className="grid gap-6 lg:grid-cols-2">
          {BRANDING_OPTIONS.map((option) => (
            <HoverGradient
              key={option.name}
              className={clsx(
                'flex flex-col rounded-2xl p-8',
                option.popular
                  ? 'bg-oxblood/[0.03] ring-2 ring-ember/50 dark:bg-white/5 dark:ring-ember/30'
                  : 'bg-oxblood/[0.02] ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10'
              )}
            >
              <div className="relative z-10 flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-full bg-powder/50 px-3 py-1 text-xs font-medium text-juniper dark:bg-powder/20 dark:text-powder">
                    Foundation
                  </div>
                  {option.popular && (
                    <div className="inline-flex rounded-full bg-ember px-3 py-1 text-xs font-medium text-white">
                      Recommended
                    </div>
                  )}
                </div>

                {/* Name & Price */}
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-oxblood dark:text-ember">
                  {option.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-4xl font-medium tracking-tight text-oxblood dark:text-ember">
                    {option.priceFormatted}
                  </span>
                  <span className="text-sm text-basalt/70 dark:text-coral/70">{option.priceNote}</span>
                  <span className="text-sm text-oxblood/60 dark:text-coral/60">• {option.timeline}</span>
                </div>

                {/* Description */}
                <p className="mt-4 text-base/7 text-oxblood/70 dark:text-coral/70">{option.description}</p>

                {/* Features */}
                <div className="mt-8 grid flex-1 gap-3 sm:grid-cols-2">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 stroke-ember" />
                      <span className="text-sm/6 text-oxblood dark:text-coral">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  {option.popular ? (
                    <ButtonLink href={`/contact?service=branding&option=${option.id}`} size="lg" className="w-full justify-center sm:w-auto">
                      Get started
                    </ButtonLink>
                  ) : (
                    <SoftButtonLink href={`/contact?service=branding&option=${option.id}`} size="lg" className="w-full justify-center sm:w-auto">
                      Get started
                    </SoftButtonLink>
                  )}
                </div>
              </div>
            </HoverGradient>
          ))}
        </div>

        {/* Retainer Upsell */}
        <div className="mt-8">
          <HoverGradient className="rounded-xl bg-oxblood/[0.02] p-6 ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10">
            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-full bg-oxblood/10 px-3 py-1 text-xs font-medium text-oxblood dark:bg-white/10 dark:text-coral">
                    Full-Service Retainer
                  </div>
                  <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
                </div>
                <h3 className="mt-3 text-lg font-medium tracking-tight text-oxblood dark:text-ember">
                  Want branding plus the complete growth package?
                </h3>
                <p className="mt-2 text-sm/6 text-oxblood/70 dark:text-coral/70">
                  Get comprehensive branding plus website development, paid ads, search marketing, and dedicated team support.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {retainerFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckmarkIcon className="h-4 w-4 shrink-0 stroke-ember" />
                      <span className="text-xs text-oxblood dark:text-coral">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-medium tracking-tight text-oxblood dark:text-ember">
                    ${currentRetainerPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-basalt/70 dark:text-coral/70">/month</span>
                </div>
                {isYearly && (
                  <p className="text-xs font-medium text-ember">
                    Save ${((RETAINER_MONTHLY - RETAINER_YEARLY) * 12).toLocaleString()}/year
                  </p>
                )}
                <SoftButtonLink href="/pricing#retainer" size="md">
                  Learn more <ArrowNarrowRightIcon />
                </SoftButtonLink>
              </div>
            </div>
          </HoverGradient>
        </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-oxblood/60 dark:text-coral/60">
          All projects include our proven methodology and dedicated team support.{' '}
          <a href="/pricing" className="font-medium text-ember hover:underline">
            View all pricing options →
          </a>
        </p>
      </div>
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
