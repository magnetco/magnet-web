import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { SoftButtonLink } from '../elements/button'
import { HoverGradient } from '../elements/use-hover-gradient'

function ServiceCard({
  name,
  price,
  description,
  features,
  href,
  phase,
  className,
}: {
  name: string
  price: string
  description: string
  features: string[]
  href: string
  phase: 'Foundation' | 'Activation'
  className?: string
}) {
  return (
    <HoverGradient
      className={clsx(
        'flex flex-col rounded-xl bg-oxblood/[0.02] p-6 ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10',
        className
      )}
    >
      <div className="relative z-10 flex h-full flex-col">
        {/* Phase Badge */}
        <div
          className={clsx(
            'inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium',
            phase === 'Foundation'
              ? 'bg-powder/50 text-juniper dark:bg-powder/20 dark:text-powder'
              : 'bg-ember/10 text-ember'
          )}
        >
          {phase}
        </div>

        {/* Header */}
        <h3 className="mt-4 text-xl font-medium tracking-tight text-oxblood dark:text-ember">
          {name}
        </h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-medium tracking-tight text-oxblood dark:text-ember">
            {price}
          </span>
          <span className="text-sm text-basalt/70 dark:text-coral/70">fixed price</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm/6 text-oxblood/70 dark:text-coral/70">{description}</p>

        {/* Features */}
        <ul className="mt-6 flex-1 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm/6 text-oxblood dark:text-coral">
              <svg
                className="mt-1 h-4 w-4 shrink-0 text-ember"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6">
          <SoftButtonLink href={href} size="md" className="w-full justify-center">
            Learn more
          </SoftButtonLink>
        </div>
      </div>
    </HoverGradient>
  )
}

export function PricingServicesGrid({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'section'>) {
  const services = [
    {
      name: 'Branding',
      price: 'From $25K',
      description:
        'Build a brand that stands out. Positioning, narrative, visual identity, and brand guidelines.',
      features: [
        'Discovery & research',
        'Positioning definition',
        'Narrative development',
        'Identity design',
        'Brand guidelines',
      ],
      href: '/branding',
      phase: 'Foundation' as const,
    },
    {
      name: 'Websites',
      price: 'From $35K',
      description:
        'Create a digital experience that converts. UX, UI, development, and integration.',
      features: [
        'UX architecture',
        'UI design system',
        'Development & build',
        'Analytics integration',
        'QA & refinement',
      ],
      href: '/websites',
      phase: 'Foundation' as const,
    },
    {
      name: 'Paid Media',
      price: 'From $8K/mo',
      description:
        'Predictable acquisition through targeted advertising across platforms.',
      features: [
        'Channel strategy',
        'Creative development',
        'Campaign build',
        'Launch & optimization',
        'Scaling strategy',
      ],
      href: '/ads',
      phase: 'Activation' as const,
    },
    {
      name: 'Search Marketing',
      price: 'From $6K/mo',
      description:
        'Compounding inbound visibility through SEO and content strategy.',
      features: [
        'Technical foundation',
        'Intent & keyword mapping',
        'Content production',
        'Ongoing optimization',
        'Authority building',
      ],
      href: '/search',
      phase: 'Activation' as const,
    },
  ]

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-oxblood dark:text-ember sm:text-4xl">
            {headline}
          </h2>
          <div className="mt-4 text-lg/8 text-oxblood/70 dark:text-coral/70">{subheadline}</div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 rounded-xl bg-oxblood/[0.02] px-6 py-4 ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm/6 text-oxblood/70 dark:text-coral/70">
              <strong className="font-medium text-oxblood dark:text-coral">Need more than one service?</strong>{' '}
              Consider the full-service retainer for comprehensive coverage across all phases.
            </p>
            <a
              href="#retainer"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ember transition-colors hover:text-oxblood dark:hover:text-coral"
            >
              View retainer
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

