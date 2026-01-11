import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { CaseStudyCardGrid } from '@/components/elements/case-study-card'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { MethodologyTimeline, MethodologyPhaseBar } from '@/components/elements/methodology-timeline'
import { Screenshot } from '@/components/elements/screenshot'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { client } from '@/lib/sanity/client'
import { caseStudiesByCategoryQuery } from '@/lib/sanity/queries'
import type { CaseStudy } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Full-Funnel Marketing Work | Magnet',
  description:
    'Revenue architecture from foundation to retention. Website design, paid media, and search marketing that compound.',
}

export default async function FullFunnelWorkPage() {
  // Fetch full-funnel case studies from Sanity
  const fullFunnelCaseStudies = await client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category: 'full-funnel' })
  const featuredCaseStudy = fullFunnelCaseStudies.find((cs) => cs.featured) ?? fullFunnelCaseStudies[0]

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
              <li className="text-oxblood dark:text-frost">Full-Funnel</li>
            </ol>
          </nav>

          <Eyebrow className="mb-4">Full-Funnel Marketing</Eyebrow>
          <Heading className="max-w-4xl">Full-funnel growth architecture</Heading>
          <Text size="lg" className="mt-6 max-w-3xl">
            <p>
              From foundation to retention — integrated marketing systems that compound. We combine website design, paid
              media, and search marketing into a unified growth engine that drives measurable revenue.
            </p>
          </Text>
          <div className="mt-8 flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Build your growth engine
            </ButtonLink>
            <PlainButtonLink href="#methodology" size="lg">
              See our approach <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        </Container>
      </GridBgSection>

      {/* Results Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Marketing that drives revenue"
        subheadline={
          <p>
            We measure success by pipeline generated, conversion efficiency, and revenue impact — not vanity metrics.
          </p>
        }
      >
        <Stat stat="3.2x" text="Average ROI improvement for full-funnel clients." />
        <Stat stat="$500M+" text="Pipeline influenced through our marketing programs." />
        <Stat stat="240%" text="Average increase in qualified conversion rate." />
      </StatsWithGraph>

      {/* Methodology Section */}
      <GridBgSection id="methodology" showBottomBorder withPadding>
        <Container>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">Our Approach</Eyebrow>
            <Subheading className="mb-6">Four phases. One system.</Subheading>
            <Text>
              <p>
                Every engagement follows our proven methodology — from establishing strategic foundation through
                building retention loops. Each phase builds on the last. No phase can be skipped.
              </p>
            </Text>
          </div>

          <MethodologyTimeline interactive />
        </Container>
      </GridBgSection>

      {/* Service Type Breakdown */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">By Service Type</Eyebrow>
            <Subheading>Integrated capabilities that work together</Subheading>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Website Design */}
            <div className="rounded-xl border border-opal bg-frost p-8 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-4 text-xl font-medium text-oxblood dark:text-frost">Website Design</h3>
              <p className="mb-6 text-sm text-basalt dark:text-coral/80">
                High-converting websites that encode your strategy and persuade across the funnel. Every page earns its
                existence by advancing conversion.
              </p>
              <div className="mb-6">
                <div className="font-mono text-3xl font-semibold text-ember">4.1%</div>
                <div className="text-sm text-basalt dark:text-coral/60">Average conversion rate</div>
              </div>
              <div className="space-y-2 border-t border-opal pt-4 dark:border-basalt">
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Conversion-optimized landing pages
                </div>
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Message-matched experiences
                </div>
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Continuous A/B testing
                </div>
              </div>
            </div>

            {/* Paid Media */}
            <div className="rounded-xl border border-opal bg-frost p-8 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-4 text-xl font-medium text-oxblood dark:text-frost">Paid Media</h3>
              <p className="mb-6 text-sm text-basalt dark:text-coral/80">
                Data-driven advertising campaigns across Google, Meta, and LinkedIn. Introducing predictable, qualified
                demand into your system.
              </p>
              <div className="mb-6">
                <div className="font-mono text-3xl font-semibold text-ember">3.4x</div>
                <div className="text-sm text-basalt dark:text-coral/60">Average ROAS</div>
              </div>
              <div className="space-y-2 border-t border-opal pt-4 dark:border-basalt">
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Google, Meta, LinkedIn Ads
                </div>
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Structured creative testing
                </div>
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Full-funnel attribution
                </div>
              </div>
            </div>

            {/* Search Marketing */}
            <div className="rounded-xl border border-opal bg-frost p-8 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-4 text-xl font-medium text-oxblood dark:text-frost">Search Marketing</h3>
              <p className="mb-6 text-sm text-basalt dark:text-coral/80">
                SEO and content strategies that build durable, compounding organic visibility. Structure beats volume.
                Content must persuade, not just rank.
              </p>
              <div className="mb-6">
                <div className="font-mono text-3xl font-semibold text-ember">450%</div>
                <div className="text-sm text-basalt dark:text-coral/60">Average traffic increase</div>
              </div>
              <div className="space-y-2 border-t border-opal pt-4 dark:border-basalt">
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Technical SEO foundation
                </div>
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Content strategy & production
                </div>
                <div className="flex items-center gap-2 text-sm text-basalt dark:text-coral/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  Link building & authority
                </div>
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
                    className="mb-6 h-10 w-auto object-contain dark:invert"
                  />
                )}

                {/* Phases Applied */}
                {featuredCaseStudy.phases && featuredCaseStudy.phases.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-2 text-sm font-medium text-basalt dark:text-coral/60">Phases applied:</div>
                    <MethodologyPhaseBar phases={featuredCaseStudy.phases} />
                  </div>
                )}

                <Text className="mb-6">
                  <p>{featuredCaseStudy.description || featuredCaseStudy.headline}</p>
                </Text>

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
                <Screenshot wallpaper="green" placement="bottom" className="rounded-xl">
                  <Image
                    src={featuredCaseStudy.heroImage?.asset?.url || '/img/screenshots/1-left-1300-top-1300.webp'}
                    alt={`${featuredCaseStudy.client} website`}
                    className="bg-white/75 dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    className="bg-black/75 not-dark:hidden"
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
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

      {/* All Full-Funnel Case Studies */}
      {fullFunnelCaseStudies.length > 0 && (
        <GridBgSection showBottomBorder withPadding>
          <Container>
            <div className="mb-8">
              <Eyebrow className="mb-2">Case Studies</Eyebrow>
              <Subheading>Full-funnel success stories</Subheading>
            </div>

            <CaseStudyCardGrid caseStudies={fullFunnelCaseStudies} columns={3} />
          </Container>
        </GridBgSection>
      )}

      {/* Testimonial */}
      {featuredCaseStudy?.testimonial?.quote && (
        <TestimonialTwoColumnWithLargePhoto
          id="testimonial"
          quote={<p>{featuredCaseStudy.testimonial.quote}</p>}
          img={
            <Image
              src="/img/avatars/10-size-160.webp"
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
        headline="Ready to build your growth engine?"
        subheadline={
          <p>
            Let's discuss how a full-funnel approach can drive measurable revenue growth for your business.
          </p>
        }
      />
    </main>
  )
}
