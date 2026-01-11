import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { ComponentProps } from 'react'
import { Container } from '@/components/elements/container'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { Text } from '@/components/elements/text'
import type { CaseStudy } from '@/lib/sanity/types'

// Map services to human-readable labels
const serviceLabels: Record<string, string> = {
  branding: 'Branding',
  website: 'Website',
  'paid-media': 'Paid Media',
  'search-marketing': 'Search Marketing',
  content: 'Content',
  'crm-automation': 'CRM & Automation',
  analytics: 'Analytics',
  'platform-engineering': 'Platform Engineering',
  'full-stack-development': 'Full-Stack Development',
  'api-design': 'API Design',
  'data-architecture': 'Data Architecture',
  'ecommerce-platform': 'E-commerce Platform',
  'email-marketing': 'Email Marketing',
}

// Map industry to human-readable labels
const industryLabels: Record<string, string> = {
  saas: 'SaaS',
  healthcare: 'Healthcare',
  manufacturing: 'Manufacturing',
  'financial-services': 'Financial Services',
  'professional-services': 'Professional Services',
  technology: 'Technology',
  education: 'Education',
  'retail-ecommerce': 'Retail & E-commerce',
  'media-entertainment': 'Media & Entertainment',
  'travel-hospitality': 'Travel & Hospitality',
  'consumer-products': 'Consumer Products',
  nonprofit: 'Nonprofit',
  legal: 'Legal',
  automotive: 'Automotive',
  'sports-entertainment': 'Sports & Entertainment',
  'venture-capital': 'Venture Capital',
  'ai-technology': 'AI / Technology',
  'home-furniture': 'Home & Furniture',
  'grocery-retail': 'Grocery & Retail',
  other: 'Other',
}

export function CaseStudyHero({
  caseStudy,
  breadcrumbs,
  className,
  ...props
}: {
  caseStudy: CaseStudy
  breadcrumbs?: { label: string; href: string }[]
} & Omit<ComponentProps<'section'>, 'children'>) {
  const logoUrl = caseStudy.clientLogo?.asset?.url
  const industryLabel = industryLabels[caseStudy.industry] || caseStudy.industry

  return (
    <GridBgSection
      showBottomBorder
      showTopBorder={false}
      withPadding
      className={className}
      {...props}
    >
      <Container>
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-basalt dark:text-coral/60">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <Link href={crumb.href} className="hover:text-ember">
                    {crumb.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span>/</span>
                <span className="text-oxblood dark:text-frost">{caseStudy.client}</span>
              </li>
            </ol>
          </nav>
        )}

        {/* Client Logo */}
        {logoUrl && (
          <div className="mb-8">
            <Image
              src={logoUrl}
              alt={caseStudy.client}
              width={200}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </div>
        )}

        {/* Headline */}
        <Heading className="max-w-4xl">
          {caseStudy.headline || `${caseStudy.client} Case Study`}
        </Heading>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-powder px-3 py-1 font-mono text-xs font-medium text-juniper dark:bg-basalt dark:text-coral">
            {industryLabel}
          </span>
          {caseStudy.services?.map((service) => (
            <span
              key={service}
              className="rounded-full bg-opal px-3 py-1 font-mono text-xs font-medium text-basalt dark:bg-basalt/50 dark:text-coral/80"
            >
              {serviceLabels[service] || service}
            </span>
          ))}
        </div>

        {/* Description */}
        {caseStudy.description && (
          <Text size="lg" className="mt-8 max-w-3xl">
            <p>{caseStudy.description}</p>
          </Text>
        )}
      </Container>
    </GridBgSection>
  )
}

// Variant with results bar integrated
export function CaseStudyHeroWithResults({
  caseStudy,
  breadcrumbs,
  className,
  ...props
}: {
  caseStudy: CaseStudy
  breadcrumbs?: { label: string; href: string }[]
} & Omit<ComponentProps<'div'>, 'children'>) {
  const results = caseStudy.results || []

  return (
    <div className={className} {...props}>
      <CaseStudyHero caseStudy={caseStudy} breadcrumbs={breadcrumbs} />

      {/* Results Bar */}
      {results.length > 0 && (
        <div className="border-b border-opal bg-frost py-8 dark:border-basalt dark:bg-juniper/50">
          <Container>
            <div
              className={clsx(
                'grid gap-8',
                results.length === 2 && 'grid-cols-2',
                results.length === 3 && 'grid-cols-3',
                results.length >= 4 && 'grid-cols-2 md:grid-cols-4'
              )}
            >
              {results.map((result, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="font-mono text-3xl font-semibold text-ember">{result.metric}</div>
                  <div className="mt-1 text-sm text-basalt dark:text-coral/60">{result.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}
