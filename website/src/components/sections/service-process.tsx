import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { HoverGradient } from '../elements/use-hover-gradient'

function ArrowConnector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <svg
        className="h-8 w-8 text-ember"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  )
}

function MobileArrow() {
  return (
    <div className="flex items-center justify-center py-4 lg:hidden">
      <svg
        className="h-6 w-6 rotate-90 text-ember"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  )
}

export function ProcessStep({
  step,
  title,
  description,
  duration,
  className,
}: {
  step: number
  title: string
  description: string
  duration?: string
} & ComponentProps<'div'>) {
  return (
    <HoverGradient
      className={clsx(
        'flex flex-col rounded-xl bg-oxblood/[0.02] p-6 ring-1 ring-oxblood/10 dark:bg-white/5 dark:ring-white/10',
        className
      )}
    >
      <div className="relative z-10 flex h-full flex-col">
        {/* Step Number */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-ember text-sm font-semibold text-white">
          {step}
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium tracking-tight text-oxblood dark:text-ember">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm/6 text-oxblood/70 dark:text-coral/70">{description}</p>

        {/* Duration */}
        {duration && (
          <p className="mt-4 text-xs font-medium text-ember">{duration}</p>
        )}
      </div>
    </HoverGradient>
  )
}

export type ServiceProcessType = 'branding' | 'websites' | 'paid-ads' | 'search' | 'engineering' | 'retainer'

const serviceProcesses: Record<ServiceProcessType, { steps: Array<{ title: string; description: string; duration?: string }> }> = {
  engineering: {
    steps: [
      {
        title: 'Discovery & Architecture',
        description: 'Understand your technical requirements, constraints, and goals. Design system architecture and define technical specifications.',
        duration: 'Week 1-2',
      },
      {
        title: 'Foundation & Infrastructure',
        description: 'Set up development environment, CI/CD pipelines, infrastructure, and core system foundations.',
        duration: 'Week 2-4',
      },
      {
        title: 'Development & Iteration',
        description: 'Agile development cycles with regular demos, testing, and stakeholder feedback. Ship incrementally.',
        duration: 'Week 4-12+',
      },
      {
        title: 'Launch & Scale',
        description: 'Production deployment, monitoring setup, performance optimization, and ongoing support and scaling.',
        duration: 'Ongoing',
      },
    ],
  },
  branding: {
    steps: [
      {
        title: 'Discovery',
        description: 'Deep-dive into your business, audience, competitors, and market position to uncover strategic opportunities.',
        duration: 'Week 1-2',
      },
      {
        title: 'Strategy',
        description: 'Define your positioning, messaging framework, and brand architecture that differentiates you in the market.',
        duration: 'Week 2-3',
      },
      {
        title: 'Design',
        description: 'Create your visual identity system including logo, typography, colors, and extended brand elements.',
        duration: 'Week 3-5',
      },
      {
        title: 'Deliver',
        description: 'Compile comprehensive brand guidelines, asset library, and templates for consistent implementation.',
        duration: 'Week 5-6',
      },
    ],
  },
  websites: {
    steps: [
      {
        title: 'Strategy & UX',
        description: 'Map user journeys, define conversion paths, and create wireframes that optimize for your business goals.',
        duration: 'Week 1-2',
      },
      {
        title: 'Design',
        description: 'Craft a custom visual design system with responsive layouts, components, and interactive prototypes.',
        duration: 'Week 3-4',
      },
      {
        title: 'Development',
        description: 'Build your site with clean, performant code, CMS integration, and third-party tool connections.',
        duration: 'Week 5-7',
      },
      {
        title: 'Launch & Optimize',
        description: 'QA testing, performance tuning, analytics setup, and ongoing optimization support post-launch.',
        duration: 'Week 8+',
      },
    ],
  },
  'paid-ads': {
    steps: [
      {
        title: 'Audit & Strategy',
        description: 'Analyze your current performance, research competitors, and develop a channel and targeting strategy.',
        duration: 'Week 1',
      },
      {
        title: 'Creative & Build',
        description: 'Develop ad creative, write copy, set up campaigns, audiences, and tracking infrastructure.',
        duration: 'Week 2',
      },
      {
        title: 'Launch & Test',
        description: 'Go live with campaigns, run A/B tests, and gather initial performance data across platforms.',
        duration: 'Week 3-4',
      },
      {
        title: 'Optimize & Scale',
        description: 'Continuous optimization based on data, expand winning campaigns, and scale profitable channels.',
        duration: 'Ongoing',
      },
    ],
  },
  search: {
    steps: [
      {
        title: 'Technical Audit',
        description: 'Comprehensive site crawl, Core Web Vitals analysis, and technical SEO foundation assessment.',
        duration: 'Week 1-2',
      },
      {
        title: 'Keyword Strategy',
        description: 'Intent-based keyword research, competitive gap analysis, and content opportunity mapping.',
        duration: 'Week 2-3',
      },
      {
        title: 'Content & Links',
        description: 'Execute content calendar, optimize existing pages, and build authority through quality backlinks.',
        duration: 'Ongoing',
      },
      {
        title: 'Monitor & Adapt',
        description: 'Track rankings, analyze performance, adapt to algorithm updates, and refine strategy continuously.',
        duration: 'Ongoing',
      },
    ],
  },
  retainer: {
    steps: [
      {
        title: 'Onboarding & Audit',
        description: 'Deep-dive into your business, audit existing marketing, and establish baselines and goals.',
        duration: 'Month 1',
      },
      {
        title: 'Foundation & Strategy',
        description: 'Build core infrastructure, define channel strategy, and create your marketing roadmap.',
        duration: 'Month 1-2',
      },
      {
        title: 'Execute & Optimize',
        description: 'Launch campaigns across channels, continuously test and optimize based on real performance data.',
        duration: 'Ongoing',
      },
      {
        title: 'Scale & Iterate',
        description: 'Double down on what works, expand to new channels, and evolve strategy as your business grows.',
        duration: 'Ongoing',
      },
    ],
  },
}

export function ServiceProcess({
  service,
  eyebrow = 'Our Process',
  headline,
  subheadline,
  className,
  withGridBg = false,
  ...props
}: {
  service: ServiceProcessType
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const { steps } = serviceProcesses[service]

  const content = (
    <Container>
      {/* Header */}
      {(eyebrow || headline || subheadline) && (
        <div className="mb-12 text-center">
          <div className="flex flex-col items-center gap-2">
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
            <div className="mx-auto mt-4 max-w-2xl text-lg/8 text-oxblood/70 dark:text-coral/70">
              {subheadline}
            </div>
          )}
        </div>
      )}

        {/* Process Steps - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-4">
          {steps.map((step, index) => (
            <>
              <ProcessStep
                key={step.title}
                step={index + 1}
                title={step.title}
                description={step.description}
                duration={step.duration}
              />
              {index < steps.length - 1 && <ArrowConnector key={`arrow-${index}`} />}
            </>
          ))}
        </div>

        {/* Process Steps - Mobile */}
        <div className="flex flex-col lg:hidden">
          {steps.map((step, index) => (
            <div key={step.title}>
              <ProcessStep
                step={index + 1}
                title={step.title}
                description={step.description}
                duration={step.duration}
              />
              {index < steps.length - 1 && <MobileArrow />}
            </div>
          ))}
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

