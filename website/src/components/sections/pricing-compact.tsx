'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import { useState, type ComponentProps } from 'react'
import { Container } from '../elements/container'
import { ButtonLink, PlainButtonLink } from '../elements/button'
import { ChevronIcon } from '../icons/chevron-icon'

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
          'text-sm font-medium transition-colors duration-300',
          !isYearly ? 'text-oxblood dark:text-ember' : 'text-basalt/60 dark:text-coral/60'
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="group relative h-6 w-12 cursor-pointer rounded-full bg-oxblood/10 p-0.5 transition-colors duration-300 hover:bg-oxblood/15 dark:bg-white/10 dark:hover:bg-white/15"
        aria-label={isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'}
      >
        <div
          className={clsx(
            'h-5 w-5 rounded-full bg-ember shadow-sm transition-all duration-300 ease-out',
            isYearly ? 'translate-x-6' : 'translate-x-0'
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
        <span className="ml-1 text-xs text-ember">-10%</span>
      </span>
    </div>
  )
}

const MONTHLY_PRICE = 25000
const YEARLY_PRICE = Math.round(MONTHLY_PRICE * 12 * 0.9 / 12)

const services = [
  { name: 'Branding', price: 'From $25K', href: '/branding' },
  { name: 'Websites', price: 'From $35K', href: '/websites' },
  { name: 'Paid Media', price: 'From $8K/mo', href: '/ads' },
  { name: 'Search', price: 'From $6K/mo', href: '/search' },
]

export function PricingCompact({
  className,
  ...props
}: ComponentProps<'section'>) {
  const [isYearly, setIsYearly] = useState(false)

  const yearlyTotal = YEARLY_PRICE * 12
  const yearlySavings = (MONTHLY_PRICE * 12) - yearlyTotal

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        <div className="rounded-2xl bg-oxblood/[0.03] p-8 ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Retainer Section */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full bg-ember/10 px-2.5 py-0.5 text-xs font-medium text-ember">
                    Full-Service Retainer
                  </div>
                  <h3 className="mt-3 text-xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-2xl">
                    Complete Marketing System
                  </h3>
                </div>
                <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {isYearly ? (
                  <>
                    <span className="text-3xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-4xl">
                      ${yearlyTotal.toLocaleString()}
                    </span>
                    <span className="text-sm text-basalt/70 dark:text-coral/70">/year</span>
                    <span className="text-sm text-ember">Save ${yearlySavings.toLocaleString()}</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-4xl">
                      ${MONTHLY_PRICE.toLocaleString()}
                    </span>
                    <span className="text-sm text-basalt/70 dark:text-coral/70">/month</span>
                  </>
                )}
              </div>

              <p className="mt-3 text-sm/6 text-oxblood/70 dark:text-coral/70">
                Everything in our method—Foundation, Activation, Acceleration, and Retention—delivered as an ongoing partnership.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {['Foundation', 'Activation', 'Acceleration', 'Retention'].map((phase, i) => (
                  <div key={phase} className="flex items-center gap-1">
                    <span className="rounded-full bg-ember px-2.5 py-0.5 text-xs font-medium text-white">
                      {phase}
                    </span>
                    {i < 3 && (
                      <svg className="h-3 w-3 text-oxblood/30 dark:text-coral/30" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden w-px bg-oxblood/10 dark:bg-white/10 lg:block" />
            <div className="h-px bg-oxblood/10 dark:bg-white/10 lg:hidden" />

            {/* Individual Services */}
            <div className="lg:w-80">
              <h4 className="text-sm font-medium text-oxblood/60 dark:text-coral/60">
                Or choose individual services
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="group rounded-lg bg-oxblood/[0.02] px-3 py-2 ring-1 ring-oxblood/5 transition-all hover:bg-oxblood/[0.05] hover:ring-oxblood/10 dark:bg-white/[0.02] dark:ring-white/5 dark:hover:bg-white/[0.05] dark:hover:ring-white/10"
                  >
                    <p className="text-sm font-medium text-oxblood transition-colors group-hover:text-ember dark:text-coral">
                      {service.name}
                    </p>
                    <p className="text-xs text-oxblood/60 dark:text-coral/60">{service.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-4 border-t border-oxblood/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <PlainButtonLink href="/pricing" size="md">
              View full pricing details <ChevronIcon />
            </PlainButtonLink>
            <p className="text-sm text-oxblood/60 dark:text-coral/60">
              No contracts required. Cancel anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

