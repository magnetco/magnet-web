import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { Subheading } from '@/components/elements/subheading'
import { TabbedLogoGallery, type GalleryItem } from '@/components/elements/tabbed-logo-gallery'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { IndustriesGrid } from '@/components/sections/industries-grid'
import { InteractiveCardsGrid } from '@/components/sections/interactive-cards-grid'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { client } from '@/lib/sanity/client'
import { caseStudiesByCategoryQuery } from '@/lib/sanity/queries'
import type { CaseStudy } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Work | Magnet',
  description:
    'Case studies and client work showcasing enterprise engineering, full-funnel marketing, and website solutions.',
}

// Aggregate stats (these are curated metrics, not from individual case studies)
const aggregateStats = {
  totalRevenue: '$500M+',
  totalClients: '50+',
  averageROI: '3.2x',
  yearsExperience: '15+',
}

// Engineering clients for TabbedLogoGallery
const engineeringGalleryItems: GalleryItem[] = [
  {
    id: 'mcgraw-hill',
    logo: (
      <Image
        src="/img/logos/mhe.png"
        alt="McGraw Hill"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="purple" placement="bottom">
        <Image
          src="/img/screenshots/1.webp"
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
    ),
  },
  {
    id: 'hgtv',
    logo: (
      <Image
        src="/img/logos/hgtv.png"
        alt="HGTV"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="green" placement="bottom">
        <Image
          src="/img/screenshots/1-left-1300-top-1300.webp"
          alt="HGTV platform"
          className="bg-white/75 dark:hidden"
          width={1300}
          height={1300}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
          alt="HGTV platform"
          width={1300}
          height={1300}
        />
      </Screenshot>
    ),
  },
  {
    id: 'ikea',
    logo: (
      <Image
        src="/img/logos/ikea.png"
        alt="IKEA"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="blue" placement="bottom">
        <Image
          src="/img/screenshots/1-right-1300-top-1300.webp"
          alt="IKEA platform"
          className="bg-white/75 dark:hidden"
          width={1300}
          height={1300}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
          alt="IKEA platform"
          width={1300}
          height={1300}
        />
      </Screenshot>
    ),
  },
  {
    id: 'expedia',
    logo: (
      <Image
        src="/img/logos/lux.png"
        alt="Expedia"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="brown" placement="bottom">
        <Image
          src="/img/screenshots/1-left-1800-top-1250.webp"
          alt="Expedia platform"
          className="bg-white/75 dark:hidden"
          width={1800}
          height={1250}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
          alt="Expedia platform"
          width={1800}
          height={1250}
        />
      </Screenshot>
    ),
  },
  {
    id: 'ucla',
    logo: (
      <Image
        src="/img/logos/oke.png"
        alt="UCLA"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="purple" placement="bottom">
        <Image
          src="/img/screenshots/1-right-1800-top-1250.webp"
          alt="UCLA platform"
          className="bg-white/75 dark:hidden"
          width={1800}
          height={1250}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-right-1800-top-1250.webp"
          alt="UCLA platform"
          width={1800}
          height={1250}
        />
      </Screenshot>
    ),
  },
]

export default async function WorkPage() {
  // Fetch case studies from Sanity
  const [fullFunnelCaseStudies, websitesCaseStudies] = await Promise.all([
    client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category: 'full-funnel' }),
    client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category: 'websites' }),
  ])

  return (
    <main>
      {/* Hero Section */}
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>Our Work</Eyebrow>
          <Heading className="max-w-4xl">Work that drives results</Heading>
          <Text size="lg" className="max-w-2xl">
            <p>
              From enterprise engineering to full-funnel marketing, we partner with ambitious companies to build systems
              that scale and strategies that compound.
            </p>
          </Text>
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Start a project
            </ButtonLink>
            <PlainButtonLink href="#engineering" size="lg">
              Explore our work <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        </Container>
      </GridBgSection>

      {/* Aggregate Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="By the numbers"
        headline="Proven results across industries"
        subheadline={
          <p>
            We measure success by the outcomes we create for our clients — not vanity metrics.
          </p>
        }
      >
        <Stat stat={aggregateStats.totalRevenue} text="In revenue generated for clients through our work." />
        <Stat stat={aggregateStats.averageROI} text="Average ROI increase for brands working with Magnet." />
        <Stat stat={aggregateStats.totalClients} text="Companies have trusted us with their growth." />
      </StatsWithGraph>

      {/* Browse by Industry */}
      <IndustriesGrid
        id="industries"
        eyebrow="Browse by Industry"
        headline="Work across sectors"
        subheadline={
          <p>
            We bring deep domain expertise to every project. Explore our work by industry to see
            relevant case studies and results.
          </p>
        }
      />

      {/* Full-Funnel Revenue Work Section */}
      <GridBgSection id="full-funnel" showBottomBorder withPadding>
        <Container>
          <div className="mb-12 flex max-w-3xl flex-col gap-6">
            <Eyebrow>Full-Funnel Marketing</Eyebrow>
            <Subheading>Revenue architecture across the full funnel</Subheading>
            <Text>
              <p>
                From foundation to retention — integrated marketing systems that compound. We combine website design,
                paid media, and search marketing into a unified growth engine.
              </p>
            </Text>
          </div>

          {/* Methodology Phase Visual */}
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(['Foundation', 'Activation', 'Acceleration', 'Retention'] as const).map((phase, index) => (
              <div
                key={phase}
                className="relative rounded-xl border border-opal bg-frost p-6 transition-all duration-300 hover:border-ember/30 hover:shadow-sm dark:border-basalt dark:bg-juniper/50"
              >
                <div className="mb-2 font-mono text-xs font-medium text-ember">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="font-medium text-oxblood dark:text-frost">{phase}</h3>
              </div>
            ))}
          </div>

          {/* Service Type Cards */}
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-opal bg-frost p-8 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-3 text-lg font-medium text-oxblood dark:text-frost">Website Design</h3>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                High-converting websites that encode your strategy and persuade across the funnel.
              </p>
              <div className="font-mono text-2xl font-semibold text-ember">4.1%</div>
              <div className="text-xs text-basalt dark:text-coral/60">Avg. conversion rate</div>
            </div>
            <div className="rounded-xl border border-opal bg-frost p-8 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-3 text-lg font-medium text-oxblood dark:text-frost">Paid Media</h3>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                Data-driven campaigns across Google, Meta, and LinkedIn that drive qualified demand.
              </p>
              <div className="font-mono text-2xl font-semibold text-ember">3.4x</div>
              <div className="text-xs text-basalt dark:text-coral/60">Avg. ROAS</div>
            </div>
            <div className="rounded-xl border border-opal bg-frost p-8 dark:border-basalt dark:bg-juniper/50">
              <h3 className="mb-3 text-lg font-medium text-oxblood dark:text-frost">Search Marketing</h3>
              <p className="mb-4 text-sm text-basalt dark:text-coral/80">
                SEO and content strategies that build durable, compounding organic visibility.
              </p>
              <div className="font-mono text-2xl font-semibold text-ember">450%</div>
              <div className="text-xs text-basalt dark:text-coral/60">Avg. traffic increase</div>
            </div>
          </div>

          {/* Featured Full-Funnel Clients */}
          <div className="flex flex-wrap items-center gap-6 border-t border-opal pt-8 dark:border-basalt">
            <span className="text-sm font-medium text-basalt dark:text-coral/60">Featured clients:</span>
            {fullFunnelCaseStudies.slice(0, 3).map((cs) => (
              <div key={cs.slug.current} className="flex items-center gap-3">
                {cs.clientLogo?.asset?.url && (
                  <Image
                    src={cs.clientLogo.asset.url}
                    alt={cs.client}
                    width={100}
                    height={40}
                    className="h-6 w-auto object-contain dark:invert"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/work/full-funnel" className="inline-flex items-center gap-2 font-medium text-ember">
              View all full-funnel work <ArrowNarrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </GridBgSection>

      {/* Engineering Section */}
      <GridBgSection id="engineering" showBottomBorder withPadding>
        <Container>
          <div className="mb-12 flex max-w-3xl flex-col gap-6">
            <Eyebrow>Engineering</Eyebrow>
            <Subheading>Enterprise-grade engineering for scale</Subheading>
            <Text>
              <p>
                Full-stack platform development for the world&apos;s most demanding organizations. We build systems that
                serve millions of users with 99.9% uptime.
              </p>
            </Text>
          </div>

          {/* Engineering Gallery */}
          <TabbedLogoGallery items={engineeringGalleryItems} autoRotateInterval={6000} />

          {/* Engineering Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-opal pt-8 sm:grid-cols-4 dark:border-basalt">
            <div>
              <div className="font-mono text-2xl font-semibold text-oxblood dark:text-frost">6M+</div>
              <div className="text-sm text-basalt dark:text-coral/60">Students served (McGraw Hill)</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-oxblood dark:text-frost">15M+</div>
              <div className="text-sm text-basalt dark:text-coral/60">Monthly visitors (HGTV)</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-oxblood dark:text-frost">50M+</div>
              <div className="text-sm text-basalt dark:text-coral/60">SKUs managed (IKEA)</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-oxblood dark:text-frost">10B+</div>
              <div className="text-sm text-basalt dark:text-coral/60">Daily queries (Expedia)</div>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/work/engineering" className="inline-flex items-center gap-2 font-medium text-ember">
              View all engineering work <ArrowNarrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </GridBgSection>

      {/* Websites Section */}
      <InteractiveCardsGrid
        id="websites"
        withGridBg
        eyebrow="Websites"
        headline="Websites that convert visitors into customers"
        subheadline={
          <p>
            From marketing sites to e-commerce platforms, we build beautiful, high-performing websites that drive
            business results.
          </p>
        }
        cards={websitesCaseStudies.map((cs) => ({
          title: cs.client,
          description: (
            <p>
              {cs.description || cs.headline}
              {cs.results?.[0] && (
                <span className="mt-2 block font-mono text-sm font-medium text-ember">
                  {cs.results[0].metric} {cs.results[0].label.toLowerCase()}
                </span>
              )}
            </p>
          ),
          href: `/work/${cs.slug.current}`,
        }))}
      />

      {/* Websites CTA */}
      <GridBgSection showBottomBorder withPadding className="pt-0">
        <Container>
          <Link href="/work/websites" className="inline-flex items-center gap-2 font-medium text-ember">
            View all website work <ArrowNarrowRightIcon className="h-4 w-4" />
          </Link>
        </Container>
      </GridBgSection>

      {/* Call to Action */}
      <CallToActionWithEmail
        id="cta"
        headline="Let's build something together"
        subheadline={
          <p>
            Whether you need enterprise engineering, full-funnel marketing, or website expertise, we&apos;re ready to
            help you achieve measurable growth.
          </p>
        }
      />
    </main>
  )
}
