import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { client } from '@/lib/sanity/client'
import { caseStudiesByCategoryQuery, caseStudyBySlugQuery, caseStudySlugsQuery } from '@/lib/sanity/queries'
import type { CaseStudy, CaseStudyCategory } from '@/lib/sanity/types'

// Map category to human-readable label and href
const categoryConfig: Record<CaseStudyCategory, { label: string; href: string }> = {
  engineering: { label: 'Engineering', href: '/work/engineering' },
  'full-funnel': { label: 'Full-Funnel', href: '/work/full-funnel' },
  ecommerce: { label: 'E-commerce', href: '/work/ecommerce' },
  other: { label: 'Work', href: '/work' },
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

// Wallpaper colors for screenshots
const wallpapers = ['purple', 'blue', 'green', 'brown'] as const

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(caseStudySlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await client.fetch<CaseStudy | null>(caseStudyBySlugQuery, { slug })

  if (!caseStudy) {
    return { title: 'Case Study Not Found | Magnet' }
  }

  return {
    title: `${caseStudy.client} | Work | Magnet`,
    description: caseStudy.description || caseStudy.headline || `${caseStudy.client} case study`,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = await client.fetch<CaseStudy | null>(caseStudyBySlugQuery, { slug })

  if (!caseStudy) {
    notFound()
  }

  // Get related case studies (same category, excluding current)
  const category = caseStudy.category || 'other'
  const relatedCaseStudies = await client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category })
  const filteredRelated = relatedCaseStudies
    .filter((cs) => cs.slug.current !== slug)
    .slice(0, 3)

  const categoryInfo = categoryConfig[category]
  const industryLabel = industryLabels[caseStudy.industry] || caseStudy.industry

  // Get hero image URL or use default
  const heroImageUrl = caseStudy.heroImage?.asset?.url || '/img/screenshots/1.webp'
  
  // Get gallery images or use defaults
  const galleryImages = caseStudy.galleryImages?.map((img) => img.asset?.url).filter(Boolean) || [
    '/img/screenshots/1-left-1300-top-1300.webp',
    '/img/screenshots/1-right-1300-top-1300.webp',
  ]

  return (
    <main>
      {/* Hero Section */}
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-basalt dark:text-coral/60">
              <li>
                <Link href="/work" className="hover:text-ember">
                  Work
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={categoryInfo.href} className="hover:text-ember">
                  {categoryInfo.label}
                </Link>
              </li>
              <li>/</li>
              <li className="text-oxblood dark:text-frost">{caseStudy.client}</li>
            </ol>
          </nav>

          {/* Client Logo */}
          {caseStudy.clientLogo?.asset?.url && (
            <div className="mb-8">
              <Image
                src={caseStudy.clientLogo.asset.url}
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

      {/* Results Bar */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <div className="border-b border-opal bg-frost py-8 dark:border-basalt dark:bg-juniper/50">
          <Container>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="font-mono text-3xl font-semibold text-ember">{result.metric}</div>
                  <div className="mt-1 text-sm text-basalt dark:text-coral/60">{result.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Hero Screenshot */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <Screenshot wallpaper={wallpapers[0]} placement="bottom" className="rounded-xl">
            <Image
              src={heroImageUrl}
              alt={`${caseStudy.client} platform screenshot`}
              className="bg-white/75 dark:hidden"
              width={3440}
              height={1990}
            />
            <Image
              className="bg-black/75 not-dark:hidden"
              src={heroImageUrl}
              alt={`${caseStudy.client} platform screenshot`}
              width={3440}
              height={1990}
            />
          </Screenshot>
        </Container>
      </GridBgSection>

      {/* The Challenge */}
      {caseStudy.challenge && caseStudy.challenge.length > 0 && (
        <GridBgSection showBottomBorder withPadding>
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow className="mb-4">The Challenge</Eyebrow>
                <Subheading className="mb-6">Understanding the problem</Subheading>
                <div className="flex flex-col gap-4 text-basalt dark:text-coral/80">
                  <PortableText
                    value={caseStudy.challenge}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-[1.0625rem]/[1.8]">{children}</p>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-oxblood dark:text-frost">{children}</strong>
                        ),
                        em: ({ children }) => <em className="italic">{children}</em>,
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <Screenshot wallpaper={wallpapers[1]} placement="bottom-right" className="rounded-xl">
                  <Image
                    src={galleryImages[0] || '/img/screenshots/1-left-1300-top-1300.webp'}
                    alt="Challenge visualization"
                    className="bg-white/75 dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    className="bg-black/75 not-dark:hidden"
                    src={galleryImages[0] || '/img/screenshots/1-left-1300-top-1300.webp'}
                    alt="Challenge visualization"
                    width={1300}
                    height={1300}
                  />
                </Screenshot>
              </div>
            </div>
          </Container>
        </GridBgSection>
      )}

      {/* The Solution */}
      {caseStudy.solution && caseStudy.solution.length > 0 && (
        <GridBgSection showBottomBorder withPadding>
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="order-2 flex items-center lg:order-1">
                <Screenshot wallpaper={wallpapers[2]} placement="bottom-left" className="rounded-xl">
                  <Image
                    src={galleryImages[1] || '/img/screenshots/1-right-1300-top-1300.webp'}
                    alt="Solution architecture"
                    className="bg-white/75 dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    className="bg-black/75 not-dark:hidden"
                    src={galleryImages[1] || '/img/screenshots/1-right-1300-top-1300.webp'}
                    alt="Solution architecture"
                    width={1300}
                    height={1300}
                  />
                </Screenshot>
              </div>
              <div className="order-1 lg:order-2">
                <Eyebrow className="mb-4">The Solution</Eyebrow>
                <Subheading className="mb-6">How we solved it</Subheading>
                <div className="flex flex-col gap-4 text-basalt dark:text-coral/80">
                  <PortableText
                    value={caseStudy.solution}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-[1.0625rem]/[1.8]">{children}</p>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-oxblood dark:text-frost">{children}</strong>
                        ),
                        em: ({ children }) => <em className="italic">{children}</em>,
                      },
                    }}
                  />
                </div>

                {/* Services Used */}
                {caseStudy.services && caseStudy.services.length > 0 && (
                  <div className="mt-8">
                    <h4 className="mb-4 text-sm font-medium text-basalt dark:text-coral/60">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-opal px-3 py-1 font-mono text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80"
                        >
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </GridBgSection>
      )}

      {/* The Results */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <GridBgSection showBottomBorder withPadding>
          <Container>
            <div className="mb-12 max-w-3xl">
              <Eyebrow className="mb-4">The Results</Eyebrow>
              <Subheading className="mb-6">Measurable impact</Subheading>
              <Text>
                <p>
                  The project delivered significant improvements across key metrics, setting the foundation for continued growth.
                </p>
              </Text>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {caseStudy.results.map((result, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50"
                >
                  <div className="font-mono text-4xl font-semibold text-ember">{result.metric}</div>
                  <div className="mt-2 text-sm text-basalt dark:text-coral/60">{result.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </GridBgSection>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial?.quote && (
        <TestimonialTwoColumnWithLargePhoto
          id="testimonial"
          quote={<p>{caseStudy.testimonial.quote}</p>}
          img={
            <Image
              src="/img/avatars/10-size-160.webp"
              alt={caseStudy.testimonial.author || 'Client'}
              className="not-dark:bg-white/75 dark:bg-black/75 w-full"
              width={160}
              height={160}
            />
          }
          name={caseStudy.testimonial.author || 'Client'}
          byline={caseStudy.testimonial.authorRole || caseStudy.client}
        />
      )}

      {/* Related Work */}
      {filteredRelated.length > 0 && (
        <GridBgSection showBottomBorder withPadding>
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <Eyebrow className="mb-2">Related Work</Eyebrow>
                <Subheading>More {categoryInfo.label.toLowerCase()} projects</Subheading>
              </div>
              <Link href={categoryInfo.href} className="hidden items-center gap-2 font-medium text-ember sm:inline-flex">
                View all {categoryInfo.label.toLowerCase()} work <ArrowNarrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {filteredRelated.map((cs) => (
                <Link
                  key={cs.slug.current}
                  href={`/work/${cs.slug.current}`}
                  className="group rounded-xl border border-opal bg-frost p-6 transition-all duration-300 hover:border-ember/30 hover:shadow-sm dark:border-basalt dark:bg-juniper/50"
                >
                  {cs.clientLogo?.asset?.url && (
                    <div className="mb-4 flex h-10 items-center">
                      <Image
                        src={cs.clientLogo.asset.url}
                        alt={cs.client}
                        width={120}
                        height={48}
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                  )}
                  <h3 className="mb-2 font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
                    {cs.client}
                  </h3>
                  <p className="line-clamp-2 text-sm text-basalt dark:text-coral/80">
                    {cs.headline || cs.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-ember">
                    View case study <ArrowNarrowRightIcon className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link href={categoryInfo.href} className="inline-flex items-center gap-2 font-medium text-ember">
                View all {categoryInfo.label.toLowerCase()} work <ArrowNarrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </GridBgSection>
      )}

      {/* Call to Action */}
      <CallToActionWithEmail
        id="cta"
        headline="Ready to build something great?"
        subheadline={
          <p>
            Whether you&apos;re modernizing legacy systems or building from scratch, we&apos;d love to hear about your
            challenges.
          </p>
        }
      />
    </main>
  )
}
