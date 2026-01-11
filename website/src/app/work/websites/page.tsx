import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { CaseStudyCardGrid } from '@/components/elements/case-study-card'
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
import { Feature, FeaturesStackedAlternatingWithDemos } from '@/components/sections/features-stacked-alternating-with-demos'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { client } from '@/lib/sanity/client'
import { caseStudiesByCategoryQuery } from '@/lib/sanity/queries'
import type { CaseStudy } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Websites Work | Magnet',
  description:
    'Beautiful, high-performing websites that convert. Custom designs, e-commerce, and web applications that drive results.',
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

export default async function WebsitesWorkPage() {
  // Fetch websites case studies from Sanity
  const websitesCaseStudies = await client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category: 'websites' })
  const featuredCaseStudy = websitesCaseStudies.find((cs) => cs.featured) ?? websitesCaseStudies[0]
  const otherCaseStudies = featuredCaseStudy 
    ? websitesCaseStudies.filter((cs) => cs.slug.current !== featuredCaseStudy.slug.current)
    : websitesCaseStudies.slice(1)

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
              <li className="text-oxblood dark:text-frost">Websites</li>
            </ol>
          </nav>

          <Eyebrow className="mb-4">Websites</Eyebrow>
          <Heading className="max-w-4xl">Websites that convert visitors into customers</Heading>
          <Text size="lg" className="mt-6 max-w-3xl">
            <p>
              From marketing sites to e-commerce platforms, we build beautiful, high-performing websites that drive
              business results and create lasting impressions.
            </p>
          </Text>
          <div className="mt-8 flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Start your project
            </ButtonLink>
            <PlainButtonLink href="#platforms" size="lg">
              See our platforms <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        </Container>
      </GridBgSection>

      {/* Results Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Websites that perform"
        subheadline={
          <p>
            We measure success by conversion rate, engagement metrics, and business outcomes — not vanity metrics.
          </p>
        }
      >
        <Stat stat="4.1%" text="Average conversion rate across our website builds." />
        <Stat stat="185%" text="Average increase in qualified leads for our clients." />
        <Stat stat="$47M" text="Revenue generated through websites we've built." />
      </StatsWithGraph>

      {/* Platform Expertise */}
      <GridBgSection id="platforms" showBottomBorder withPadding>
        <Container>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">Platform Expertise</Eyebrow>
            <Subheading className="mb-6">Built on the platforms that fit your business</Subheading>
            <Text>
              <p>
                We're technology-agnostic and work with the platforms that best fit your needs. From hosted solutions to
                fully custom builds.
              </p>
            </Text>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Next.js */}
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <div className="mb-4 flex h-10 items-center">
                <span className="font-medium text-oxblood dark:text-frost">Next.js</span>
              </div>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Modern React framework for high-performance marketing sites and web applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  React
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  TypeScript
                </span>
              </div>
            </div>

            {/* Shopify */}
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <div className="mb-4 flex h-10 items-center">
                <span className="font-medium text-oxblood dark:text-frost">Shopify</span>
              </div>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Full builds, custom themes, and migrations. The fastest path to market for e-commerce brands.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Custom Themes
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  App Integration
                </span>
              </div>
            </div>

            {/* WordPress */}
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <div className="mb-4 flex h-10 items-center">
                <span className="font-medium text-oxblood dark:text-frost">WordPress</span>
              </div>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Content-driven websites with powerful CMS capabilities for marketing teams.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Custom Themes
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Headless
                </span>
              </div>
            </div>

            {/* Webflow */}
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <div className="mb-4 flex h-10 items-center">
                <span className="font-medium text-oxblood dark:text-frost">Webflow</span>
              </div>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Visual development for marketing sites with powerful CMS and hosting built-in.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Visual Dev
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  CMS
                </span>
              </div>
            </div>

            {/* Headless */}
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <div className="mb-4 flex h-10 items-center">
                <span className="font-medium text-oxblood dark:text-frost">Headless CMS</span>
              </div>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Sanity, Contentful, and other headless solutions for maximum flexibility.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Sanity
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Contentful
                </span>
              </div>
            </div>

            {/* Custom */}
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <div className="mb-4 flex h-10 items-center">
                <span className="font-medium text-oxblood dark:text-frost">Custom Solutions</span>
              </div>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Fully bespoke web applications for unique business models and complex requirements.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  React
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  Node.js
                </span>
                <span className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80">
                  PostgreSQL
                </span>
              </div>
            </div>
          </div>
        </Container>
      </GridBgSection>

      {/* Featured Case Study */}
      {featuredCaseStudy && (
        <GridBgSection id="featured" showBottomBorder withPadding>
          <Container>
            <div className="mb-8">
              <Eyebrow className="mb-2">Featured Project</Eyebrow>
              <Subheading>{featuredCaseStudy.client}</Subheading>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                {featuredCaseStudy.clientLogo?.asset?.url && (
                  <Image
                    src={featuredCaseStudy.clientLogo.asset.url}
                    alt={featuredCaseStudy.client}
                    width={200}
                    height={80}
                    className="mb-6 h-12 w-auto object-contain"
                  />
                )}
                <Text className="mb-6">
                  <p>{featuredCaseStudy.description || featuredCaseStudy.headline}</p>
                </Text>

                {/* Services */}
                {featuredCaseStudy.services && featuredCaseStudy.services.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-2 text-sm font-medium text-basalt dark:text-coral/60">Services provided:</div>
                    <div className="flex flex-wrap gap-2">
                      {featuredCaseStudy.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-opal px-3 py-1 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80"
                        >
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {featuredCaseStudy.results && (
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    {featuredCaseStudy.results.slice(0, 3).map((result, index) => (
                      <div key={index}>
                        <div className="font-mono text-2xl font-semibold text-ember">{result.metric}</div>
                        <div className="text-xs text-basalt dark:text-coral/60">{result.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={`/work/${featuredCaseStudy.slug.current}`}
                  className="inline-flex items-center gap-2 font-medium text-ember"
                >
                  Read full case study <ArrowNarrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center">
                <Screenshot wallpaper="blue" placement="bottom" className="rounded-xl">
                  <Image
                    src={featuredCaseStudy.heroImage?.asset?.url || '/img/screenshots/1-right-1300-top-1300.webp'}
                    alt={`${featuredCaseStudy.client} website`}
                    className="bg-white/75 dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    className="bg-black/75 not-dark:hidden"
                    src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                    alt={`${featuredCaseStudy.client} website`}
                    width={1300}
                    height={1300}
                  />
                </Screenshot>
              </div>
            </div>
          </Container>
        </GridBgSection>
      )}

      {/* Other Website Projects */}
      {otherCaseStudies.length > 0 && (
        <FeaturesStackedAlternatingWithDemos
          id="projects"
          eyebrow="More website work"
          headline="Website success stories"
          subheadline={
            <p>
              From marketing sites to e-commerce platforms, we've helped companies across industries build websites
              that drive growth.
            </p>
          }
          features={
            <>
              {otherCaseStudies.map((cs) => (
                <Feature
                  key={cs.slug.current}
                  headline={cs.client}
                  subheadline={
                    <>
                      <p>{cs.description || cs.headline}</p>
                      {cs.results && (
                        <div className="mt-4 flex flex-wrap gap-4">
                          {cs.results.slice(0, 2).map((result, index) => (
                            <div key={index}>
                              <span className="font-mono font-semibold text-ember">{result.metric}</span>{' '}
                              <span className="text-basalt dark:text-coral/60">{result.label.toLowerCase()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  }
                  cta={
                    <Link href={`/work/${cs.slug.current}`} className="inline-flex items-center gap-2 font-medium text-ember">
                      View case study <ArrowNarrowRightIcon className="h-4 w-4" />
                    </Link>
                  }
                  demo={
                    <Screenshot wallpaper="green" placement="bottom-right" className="rounded-xl">
                      <Image
                        src={cs.heroImage?.asset?.url || '/img/screenshots/1-left-1300-top-1300.webp'}
                        alt={`${cs.client} website`}
                        className="bg-white/75 dark:hidden"
                        width={1300}
                        height={1300}
                      />
                      <Image
                        className="bg-black/75 not-dark:hidden"
                        src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                        alt={`${cs.client} website`}
                        width={1300}
                        height={1300}
                      />
                    </Screenshot>
                  }
                />
              ))}
            </>
          }
        />
      )}

      {/* What We Deliver */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">What We Deliver</Eyebrow>
            <Subheading>End-to-end website capabilities</Subheading>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-2 font-medium text-oxblood dark:text-frost">Website Development</h3>
              <p className="text-sm text-basalt dark:text-coral/80">
                Custom designs, migrations, and greenfield builds on your platform of choice.
              </p>
            </div>
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-2 font-medium text-oxblood dark:text-frost">Conversion Optimization</h3>
              <p className="text-sm text-basalt dark:text-coral/80">
                Landing page optimization, A/B testing, and UX improvements that lift results.
              </p>
            </div>
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-2 font-medium text-oxblood dark:text-frost">E-commerce</h3>
              <p className="text-sm text-basalt dark:text-coral/80">
                Shopify, headless commerce, and custom e-commerce solutions that drive revenue.
              </p>
            </div>
            <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-2 font-medium text-oxblood dark:text-frost">Analytics & Attribution</h3>
              <p className="text-sm text-basalt dark:text-coral/80">
                Conversion tracking, analytics setup, and attribution modeling.
              </p>
            </div>
          </div>
        </Container>
      </GridBgSection>

      {/* Testimonial */}
      {featuredCaseStudy?.testimonial?.quote && (
        <TestimonialTwoColumnWithLargePhoto
          id="testimonial"
          quote={<p>{featuredCaseStudy.testimonial.quote}</p>}
          img={
            <Image
              src="/img/avatars/13-size-160.webp"
              alt={featuredCaseStudy.testimonial.author || 'Client'}
              className="not-dark:bg-white/75 dark:bg-black/75 w-full"
              width={160}
              height={160}
            />
          }
          name={featuredCaseStudy.testimonial.author || 'Client'}
          byline={featuredCaseStudy.testimonial.authorRole || featuredCaseStudy.client}
        />
      )}

      {/* Call to Action */}
      <CallToActionWithEmail
        id="cta"
        headline="Ready to build your website?"
        subheadline={
          <p>
            Whether you're launching a new site or optimizing an existing one, we'd love to hear about your website
            goals.
          </p>
        }
      />
    </main>
  )
}
