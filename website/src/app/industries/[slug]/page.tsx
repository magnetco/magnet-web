import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CheckCircle2Icon } from '@/components/icons/check-circle-2-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { CaseStudiesPreview } from '@/components/sections/case-studies-preview'
import { getIndustryBySlug, getIndustrySlugs, industries } from '@/lib/data/industries'
import { client } from '@/lib/sanity/client'
import { caseStudiesByIndustryQuery, postsByIndustryQuery } from '@/lib/sanity/queries'
import type { CaseStudy, Post } from '@/lib/sanity/types'

// Generate static paths for all industries
export async function generateStaticParams() {
  return getIndustrySlugs().map((slug) => ({ slug }))
}

// Generate metadata for each industry page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    return {
      title: 'Industry Not Found | Magnet',
    }
  }

  return {
    title: `${industry.name} Marketing & Web Design | Magnet`,
    description: `${industry.description} ${industry.expertise.slice(0, 2).join('. ')}.`,
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    notFound()
  }

  // Fetch case studies and posts for this industry from Sanity
  const [caseStudies, relatedPosts] = await Promise.all([
    client.fetch<CaseStudy[]>(caseStudiesByIndustryQuery, {
      industry: industry.sanityIndustryKey,
    }),
    client.fetch<Post[]>(postsByIndustryQuery, {
      industry: industry.sanityIndustryKey,
    }),
  ])

  // Get related industries (excluding current)
  const relatedIndustries = industries.filter((i) => i.slug !== slug).slice(0, 3)

  return (
    <main>
      {/* Hero Section */}
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-sm font-medium text-basalt transition-colors hover:text-ember dark:text-coral/60 dark:hover:text-coral"
              >
                <ArrowNarrowRightIcon className="size-4 rotate-180" />
                All Industries
              </Link>
            </div>

            <Eyebrow className="mb-4">{industry.name}</Eyebrow>
            <Heading className="mb-6">{industry.headline}</Heading>
            <Text size="lg" className="mb-8 max-w-2xl">
              <p>{industry.description}</p>
            </Text>

            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" size="lg">
                Start your {industry.name.toLowerCase()} project
              </ButtonLink>
              <PlainButtonLink href="/work" size="lg">
                See our work <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
          </div>
        </Container>
      </GridBgSection>

      {/* What We Understand */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Expertise List */}
            <div>
              <Eyebrow className="mb-4">What we understand</Eyebrow>
              <Subheading className="mb-6">
                Deep domain expertise for {industry.name.toLowerCase()}
              </Subheading>
              <Text className="mb-8">
                <p>
                  Our team brings years of hands-on experience working with{' '}
                  {industry.name.toLowerCase()} companies. We understand the unique challenges,
                  opportunities, and buyer psychology in your sector.
                </p>
              </Text>

              <ul className="space-y-4">
                {industry.expertise.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-ember" />
                    <span className="text-oxblood dark:text-frost">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details Card */}
            <div className="flex flex-col gap-6">
              {/* Platforms */}
              {industry.platforms && (
                <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-basalt dark:text-coral/60">
                    Platforms & Technologies
                  </h3>
                  <p className="text-oxblood dark:text-frost">{industry.platforms}</p>
                </div>
              )}

              {/* Notable Clients */}
              {industry.notableClients && industry.notableClients.length > 0 && (
                <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-basalt dark:text-coral/60">
                    Notable Clients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {industry.notableClients.map((client, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-opal px-3 py-1 text-sm text-oxblood dark:bg-basalt/50 dark:text-frost"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services for this Industry */}
              <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-basalt dark:text-coral/60">
                  Services for {industry.name}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/websites"
                      className="text-oxblood transition-colors hover:text-ember dark:text-frost dark:hover:text-coral"
                    >
                      Website Design & Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/branding"
                      className="text-oxblood transition-colors hover:text-ember dark:text-frost dark:hover:text-coral"
                    >
                      Branding & Strategy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ads"
                      className="text-oxblood transition-colors hover:text-ember dark:text-frost dark:hover:text-coral"
                    >
                      Paid Media & Advertising
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search"
                      className="text-oxblood transition-colors hover:text-ember dark:text-frost dark:hover:text-coral"
                    >
                      Search Marketing & SEO
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </GridBgSection>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <CaseStudiesPreview
          id="case-studies"
          eyebrow={`${industry.name} Case Studies`}
          headline={`Real results in ${industry.name.toLowerCase()}`}
          subheadline={
            <p>
              See how we&apos;ve helped {industry.name.toLowerCase()} companies achieve measurable
              growth.
            </p>
          }
          caseStudies={caseStudies}
          viewAllHref="/work"
          viewAllText="View all case studies"
        />
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <GridBgSection showBottomBorder withPadding>
          <Container>
            <Eyebrow className="mb-4">{industry.name} Insights</Eyebrow>
            <Subheading className="mb-8">Latest articles and resources</Subheading>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  href={post.postType === 'link' ? post.externalUrl || '#' : `/posts/${post.slug.current}`}
                  target={post.postType === 'link' ? '_blank' : undefined}
                  rel={post.postType === 'link' ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col rounded-xl border border-opal bg-frost p-6 transition-all hover:border-ember/30 hover:shadow-sm dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30"
                >
                  <h3 className="mb-2 font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mb-4 line-clamp-2 text-sm text-basalt dark:text-coral/80">
                      {post.summary}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-ember">
                    {post.postType === 'link' ? 'Read article' : 'Read more'}
                    <ArrowNarrowRightIcon className="size-4" />
                  </div>
                </Link>
              ))}
            </div>

            {relatedPosts.length > 3 && (
              <div className="mt-6">
                <Link href="/posts" className="text-sm font-medium text-ember hover:underline">
                  View all posts <ArrowNarrowRightIcon className="inline size-4" />
                </Link>
              </div>
            )}
          </Container>
        </GridBgSection>
      )}

      {/* Related Industries */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <Eyebrow className="mb-4">Explore other industries</Eyebrow>
          <Subheading className="mb-8">We work across sectors</Subheading>

          <div className="grid gap-4 sm:grid-cols-3">
            {relatedIndustries.map((related) => (
              <Link
                key={related.slug}
                href={`/industries/${related.slug}`}
                className="group flex items-center justify-between rounded-xl border border-opal bg-frost p-4 transition-all hover:border-ember/30 hover:shadow-sm dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30"
              >
                <span className="font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
                  {related.name}
                </span>
                <ArrowNarrowRightIcon className="size-4 text-basalt transition-colors group-hover:text-ember dark:text-coral/60 dark:group-hover:text-coral" />
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/industries" className="text-sm font-medium text-ember hover:underline">
              View all industries <ArrowNarrowRightIcon className="inline size-4" />
            </Link>
          </div>
        </Container>
      </GridBgSection>

      {/* Call to Action */}
      <CallToActionWithEmail
        id="cta"
        headline={`Ready to grow your ${industry.name.toLowerCase()} business?`}
        subheadline={
          <p>
            Tell us about your project and we&apos;ll connect you with our {industry.name.toLowerCase()}{' '}
            specialists who understand your market.
          </p>
        }
      />
    </main>
  )
}
