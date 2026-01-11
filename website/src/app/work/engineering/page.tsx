import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { CaseStudyCard, CaseStudyCardGrid } from '@/components/elements/case-study-card'
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
import { FeaturesThreeColumn, Feature as FeatureThreeCol } from '@/components/sections/features-three-column'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { client } from '@/lib/sanity/client'
import { caseStudiesByCategoryQuery, caseStudyBySlugQuery } from '@/lib/sanity/queries'
import type { CaseStudy } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Engineering Work | Magnet',
  description:
    'Enterprise-grade engineering for global brands. Full-stack platform development serving millions of users.',
}

export default async function EngineeringWorkPage() {
  // Fetch engineering case studies from Sanity
  const engineeringCaseStudies = await client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category: 'engineering' })
  const mcgrawHill = await client.fetch<CaseStudy | null>(caseStudyBySlugQuery, { slug: 'mcgraw-hill' })
  const otherCaseStudies = engineeringCaseStudies.filter((cs) => cs.slug.current !== 'mcgraw-hill')

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
              <li className="text-oxblood dark:text-frost">Engineering</li>
            </ol>
          </nav>

          <Eyebrow className="mb-4">Engineering</Eyebrow>
          <Heading className="max-w-4xl">Enterprise engineering for global brands</Heading>
          <Text size="lg" className="mt-6 max-w-3xl">
            <p>
              Deep technical expertise across platforms, frameworks, and scale challenges. We build systems that serve
              millions of users with 99.9% uptime and sub-second response times.
            </p>
          </Text>
          <div className="mt-8 flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Discuss your project
            </ButtonLink>
            <PlainButtonLink href="#featured" size="lg">
              See our work <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        </Container>
      </GridBgSection>

      {/* Aggregate Stats */}
      <div className="border-b border-opal bg-frost py-8 dark:border-basalt dark:bg-juniper/50">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center md:text-left">
              <div className="font-mono text-3xl font-semibold text-ember">6M+</div>
              <div className="mt-1 text-sm text-basalt dark:text-coral/60">Students served (McGraw Hill)</div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-mono text-3xl font-semibold text-ember">99.9%</div>
              <div className="mt-1 text-sm text-basalt dark:text-coral/60">Average uptime achieved</div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-mono text-3xl font-semibold text-ember">47</div>
              <div className="mt-1 text-sm text-basalt dark:text-coral/60">Countries deployed</div>
            </div>
            <div className="text-center md:text-left">
              <div className="font-mono text-3xl font-semibold text-ember">15+</div>
              <div className="mt-1 text-sm text-basalt dark:text-coral/60">Years of experience</div>
            </div>
          </div>
        </Container>
      </div>

      {/* Capabilities Overview */}
      <FeaturesThreeColumn
        id="capabilities"
        eyebrow="What we build"
        headline="Engineering capabilities"
        subheadline={
          <p>
            From greenfield development to modernizing legacy systems, we bring deep expertise across the full stack.
          </p>
        }
        features={
          <>
            <FeatureThreeCol
              headline="Platform Engineering"
              subheadline={
                <p>
                  Scalable architectures that handle millions of users. Microservices, event-driven systems, and
                  distributed databases.
                </p>
              }
            />
            <FeatureThreeCol
              headline="Full-Stack Development"
              subheadline={
                <p>
                  Modern web applications with React, Next.js, and Node.js. Type-safe, tested, and built for
                  maintainability.
                </p>
              }
            />
            <FeatureThreeCol
              headline="API Design"
              subheadline={
                <p>
                  RESTful and GraphQL APIs that scale. Versioning strategies, documentation, and developer experience
                  as first-class concerns.
                </p>
              }
            />
            <FeatureThreeCol
              headline="Data Architecture"
              subheadline={
                <p>
                  PostgreSQL, Redis, Elasticsearch, and data lakes. Schema design, query optimization, and real-time
                  analytics.
                </p>
              }
            />
            <FeatureThreeCol
              headline="DevOps & Infrastructure"
              subheadline={
                <p>
                  AWS, GCP, and Kubernetes. CI/CD pipelines, infrastructure as code, and zero-downtime deployments.
                </p>
              }
            />
            <FeatureThreeCol
              headline="Performance Engineering"
              subheadline={
                <p>
                  Sub-second response times under load. Profiling, caching strategies, and database optimization.
                </p>
              }
            />
          </>
        }
      />

      {/* Featured: McGraw Hill */}
      {mcgrawHill && (
        <GridBgSection id="featured" showBottomBorder withPadding>
          <Container>
            <div className="mb-8">
              <Eyebrow className="mb-2">Featured Project</Eyebrow>
              <Subheading>McGraw Hill Education</Subheading>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                {mcgrawHill.clientLogo?.asset?.url && (
                  <Image
                    src={mcgrawHill.clientLogo.asset.url}
                    alt={mcgrawHill.client}
                    width={200}
                    height={80}
                    className="mb-6 h-12 w-auto object-contain"
                  />
                )}
                <Text className="mb-6">
                  <p>{mcgrawHill.description || mcgrawHill.headline}</p>
                </Text>

                {/* Results */}
                {mcgrawHill.results && (
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    {mcgrawHill.results.slice(0, 4).map((result, index) => (
                      <div key={index}>
                        <div className="font-mono text-2xl font-semibold text-ember">{result.metric}</div>
                        <div className="text-sm text-basalt dark:text-coral/60">{result.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href="/work/mcgraw-hill"
                  className="inline-flex items-center gap-2 font-medium text-ember"
                >
                  Read full case study <ArrowNarrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center">
                <Screenshot wallpaper="purple" placement="bottom" className="rounded-xl">
                  <Image
                    src={mcgrawHill.heroImage?.asset?.url || '/img/screenshots/1.webp'}
                    alt="McGraw Hill platform"
                    className="bg-white/75 dark:hidden"
                    width={3440}
                    height={1990}
                  />
                  <Image
                    className="bg-black/75 not-dark:hidden"
                    src="/img/screenshots/1-color-olive.webp"
                    alt="McGraw Hill platform"
                    width={3440}
                    height={1990}
                  />
                </Screenshot>
              </div>
            </div>
          </Container>
        </GridBgSection>
      )}

      {/* Other Engineering Projects */}
      {otherCaseStudies.length > 0 && (
        <FeaturesStackedAlternatingWithDemos
          id="projects"
          eyebrow="More engineering work"
          headline="Building at scale for industry leaders"
          subheadline={
            <p>
              From media platforms to e-commerce systems, we've helped global brands solve their most complex engineering
              challenges.
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
                    <Screenshot wallpaper="blue" placement="bottom-right" className="rounded-xl">
                      <Image
                        src={cs.heroImage?.asset?.url || '/img/screenshots/1-left-1300-top-1300.webp'}
                        alt={`${cs.client} platform`}
                        className="bg-white/75 dark:hidden"
                        width={1300}
                        height={1300}
                      />
                      <Image
                        className="bg-black/75 not-dark:hidden"
                        src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                        alt={`${cs.client} platform`}
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

      {/* Technologies */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <div className="mb-8">
            <Eyebrow className="mb-2">Tech Stack</Eyebrow>
            <Subheading>Technologies we work with</Subheading>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Node.js',
              'PostgreSQL',
              'Redis',
              'Elasticsearch',
              'AWS',
              'GCP',
              'Kubernetes',
              'Docker',
              'GraphQL',
              'Terraform',
              'Python',
              'Go',
              'Kafka',
            ].map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center rounded-lg border border-opal bg-frost px-4 py-3 text-sm font-medium text-oxblood dark:border-basalt dark:bg-juniper/50 dark:text-frost"
              >
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </GridBgSection>

      {/* Testimonial */}
      {mcgrawHill?.testimonial?.quote && (
        <TestimonialTwoColumnWithLargePhoto
          id="testimonial"
          quote={<p>{mcgrawHill.testimonial.quote}</p>}
          img={
            <Image
              src="/img/avatars/10-size-160.webp"
              alt={mcgrawHill.testimonial.author || 'Client'}
              className="not-dark:bg-white/75 dark:bg-black/75 w-full"
              width={160}
              height={160}
            />
          }
          name={mcgrawHill.testimonial.author || 'Client'}
          byline={mcgrawHill.testimonial.authorRole || mcgrawHill.client}
        />
      )}

      {/* Call to Action */}
      <CallToActionWithEmail
        id="cta"
        headline="Let's solve your engineering challenges"
        subheadline={
          <p>
            Whether you're building a new platform or modernizing legacy systems, we'd love to hear about your project.
          </p>
        }
      />
    </main>
  )
}
