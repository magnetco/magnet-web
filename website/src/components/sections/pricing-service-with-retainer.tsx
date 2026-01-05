'use client'

import { clsx } from 'clsx/lite'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { ButtonLink, SoftButtonLink } from '../elements/button'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { HoverGradient } from '../elements/use-hover-gradient'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

const RETAINER_MONTHLY = 25000
const RETAINER_YEARLY = Math.round(RETAINER_MONTHLY * 12 * 0.9 / 12) // 10% discount

const retainerFeatures = [
  'Brand strategy & positioning',
  'Website design & development',
  'Paid advertising campaigns',
  'Search marketing program',
  'Content strategy & creation',
  'Conversion optimization',
  'Advanced analytics & attribution',
  'Dedicated account team',
]

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

export type ServiceType = 'branding' | 'websites' | 'paid-ads' | 'search'

interface ServiceConfig {
  name: string
  price: string
  priceType: 'fixed' | 'monthly'
  phase: 'Foundation' | 'Activation'
  description: string
  features: string[]
}

const serviceConfigs: Record<ServiceType, ServiceConfig> = {
  branding: {
    name: 'Branding',
    price: '$25,000',
    priceType: 'fixed',
    phase: 'Foundation',
    description: 'Build a brand that stands out. Positioning, narrative, visual identity, and brand guidelines.',
    features: [
      'Discovery & competitive research',
      'Strategic positioning definition',
      'Narrative & messaging framework',
      'Visual identity design',
      'Comprehensive brand guidelines',
      'Asset library & templates',
    ],
  },
  websites: {
    name: 'Website Design & Development',
    price: '$35,000',
    priceType: 'fixed',
    phase: 'Foundation',
    description: 'Create a digital experience that converts. UX, UI, development, and integration.',
    features: [
      'UX strategy & architecture',
      'Custom UI design system',
      'Responsive development & build',
      'CMS integration & training',
      'Analytics & tracking setup',
      'QA testing & refinement',
    ],
  },
  'paid-ads': {
    name: 'Paid Media',
    price: '$8,000',
    priceType: 'monthly',
    phase: 'Activation',
    description: 'Predictable acquisition through targeted advertising across platforms.',
    features: [
      'Channel strategy & planning',
      'Creative development & testing',
      'Campaign build & launch',
      'Ongoing optimization',
      'Performance reporting',
      'Scaling & expansion strategy',
    ],
  },
  search: {
    name: 'Search Marketing',
    price: '$6,000',
    priceType: 'monthly',
    phase: 'Activation',
    description: 'Compounding inbound visibility through SEO and content strategy.',
    features: [
      'Technical SEO foundation',
      'Keyword & intent mapping',
      'Content strategy & production',
      'Link building & authority',
      'Ongoing optimization',
      'Performance analytics',
    ],
  },
}

export function PricingServiceWithRetainer({
  service,
  headline,
  subheadline,
  className,
  ...props
}: {
  service: ServiceType
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  const [isYearly, setIsYearly] = useState(false)
  const config = serviceConfigs[service]
  const currentRetainerPrice = isYearly ? RETAINER_YEARLY : RETAINER_MONTHLY

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        {/* Header */}
        {(headline || subheadline) && (
          <div className="mb-12 max-w-2xl">
            {headline && (
              typeof headline === 'string' ? (
                <h2 className="text-3xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-4xl">
                  {headline}
                </h2>
              ) : headline
            )}
            {subheadline && (
              <div className="mt-4 text-lg/8 text-oxblood/70 dark:text-coral/70">{subheadline}</div>
            )}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Primary Service Card - Takes 3 columns */}
          <HoverGradient
            className="flex flex-col rounded-2xl bg-oxblood/[0.03] p-8 ring-2 ring-ember/50 lg:col-span-3 dark:bg-white/5 dark:ring-ember/30"
          >
            <div className="relative z-10 flex h-full flex-col">
              {/* Phase Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={clsx(
                    'inline-flex rounded-full px-3 py-1 text-xs font-medium',
                    config.phase === 'Foundation'
                      ? 'bg-powder/50 text-juniper dark:bg-powder/20 dark:text-powder'
                      : 'bg-ember/10 text-ember'
                  )}
                >
                  {config.phase}
                </div>
                <div className="inline-flex rounded-full bg-ember px-3 py-1 text-xs font-medium text-white">
                  Recommended
                </div>
              </div>

              {/* Header */}
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-3xl">
                {config.name}
              </h3>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-5xl">
                  {config.price}
                </span>
                <span className="text-base text-basalt/70 dark:text-coral/70">
                  {config.priceType === 'fixed' ? 'starting price' : '/month'}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-base/7 text-oxblood/70 dark:text-coral/70">{config.description}</p>

              {/* Features */}
              <div className="mt-8 grid flex-1 gap-3 sm:grid-cols-2">
                {config.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckmarkIcon className="mt-0.5 h-5 w-5 shrink-0 stroke-ember" />
                    <span className="text-sm/6 text-oxblood dark:text-coral">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" size="lg">
                  Get started
                </ButtonLink>
                <span className="text-sm text-oxblood/60 dark:text-coral/60">
                  {config.priceType === 'fixed' 
                    ? 'Typically 4-8 weeks delivery' 
                    : '3-month minimum engagement'}
                </span>
              </div>
            </div>
          </HoverGradient>

          {/* Retainer Secondary Card - Takes 2 columns */}
          <HoverGradient
            className="flex flex-col rounded-2xl bg-oxblood/[0.02] p-6 ring-1 ring-oxblood/10 lg:col-span-2 dark:bg-white/5 dark:ring-white/10"
          >
            <div className="relative z-10 flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="inline-flex rounded-full bg-oxblood/10 px-3 py-1 text-xs font-medium text-oxblood dark:bg-white/10 dark:text-coral">
                  Full-Service
                </div>
                <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
              </div>

              <h3 className="mt-5 text-xl font-medium tracking-tight text-oxblood dark:text-ember">
                Want the complete package?
              </h3>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-medium tracking-tight text-oxblood dark:text-ember">
                  ${currentRetainerPrice.toLocaleString()}
                </span>
                <span className="text-sm text-basalt/70 dark:text-coral/70">/month</span>
              </div>
              {isYearly && (
                <p className="mt-1 text-xs font-medium text-ember">
                  Save ${((RETAINER_MONTHLY - RETAINER_YEARLY) * 12).toLocaleString()}/year
                </p>
              )}

              {/* Description */}
              <p className="mt-3 text-sm/6 text-oxblood/70 dark:text-coral/70">
                Get {config.name.toLowerCase()} plus everything else in our method—ongoing partnership across all four phases.
              </p>

              {/* Condensed Features */}
              <div className="mt-5 flex-1 space-y-2">
                {retainerFeatures.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckmarkIcon className="mt-0.5 h-4 w-4 shrink-0 stroke-ember" />
                    <span className="text-xs/5 text-oxblood dark:text-coral">{feature}</span>
                  </div>
                ))}
                <p className="pt-1 text-xs text-oxblood/60 dark:text-coral/60">
                  + {retainerFeatures.length - 4} more capabilities
                </p>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <SoftButtonLink href="/pricing#retainer" size="md" className="w-full justify-center">
                  Learn more <ArrowNarrowRightIcon />
                </SoftButtonLink>
              </div>
            </div>
          </HoverGradient>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-oxblood/60 dark:text-coral/60">
            All engagements include our proven methodology and dedicated team support.{' '}
            <a href="/pricing" className="font-medium text-ember hover:underline">
              View all pricing options →
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}

