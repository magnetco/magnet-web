import type { Metadata } from 'next'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Link } from '@/components/elements/link'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { BuildingStorefrontIcon } from '@/components/icons/building-storefront-icon'
import { BookOpenIcon } from '@/components/icons/book-open-icon'
import { HeartPulseIcon } from '@/components/icons/heart-pulse-icon'
import { CogIcon } from '@/components/icons/cog-icon'
import { BriefcaseIcon } from '@/components/icons/briefcase-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { TicketIcon } from '@/components/icons/ticket-icon'
import { CameraVideoIcon } from '@/components/icons/camera-video-icon'
import { BanknotesIcon } from '@/components/icons/banknotes-icon'
import { Building2Icon } from '@/components/icons/building-2-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { industries } from '@/lib/data/industries'

export const metadata: Metadata = {
  title: 'Industries | Magnet',
  description:
    'Deep expertise across sectors. We bring 20+ years of industry knowledge to healthcare, manufacturing, financial services, ecommerce, and more.',
}

// Map industries to their icons
const industryIcons: Record<string, React.ReactNode> = {
  'ecommerce': <BuildingStorefrontIcon className="size-6" />,
  'education-technology': <BookOpenIcon className="size-6" />,
  'healthcare': <HeartPulseIcon className="size-6" />,
  'manufacturing': <CogIcon className="size-6" />,
  'professional-services': <BriefcaseIcon className="size-6" />,
  'nonprofits': <HeartIcon className="size-6" />,
  'sports-recreation': <TicketIcon className="size-6" />,
  'entertainment': <CameraVideoIcon className="size-6" />,
  'financial-services': <BanknotesIcon className="size-6" />,
  'hospitality': <Building2Icon className="size-6" />,
}

export default function IndustriesPage() {
  return (
    <main>
      {/* Hero Section */}
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>Industries</Eyebrow>
          <Heading className="max-w-4xl">Deep expertise across sectors</Heading>
          <Text size="lg" className="max-w-2xl">
            <p>
              We bring 20+ years of industry knowledge to every engagement. Our teams understand
              your market, your buyers, and the challenges unique to your sector.
            </p>
          </Text>
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Start a conversation
            </ButtonLink>
            <PlainButtonLink href="/work" size="lg">
              See our work <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        </Container>
      </GridBgSection>

      {/* Industries Grid */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col rounded-xl border border-opal bg-frost p-8 transition-all duration-300 hover:border-ember/30 hover:shadow-md dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30"
              >
                {/* Icon */}
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-opal text-oxblood transition-colors group-hover:bg-ember/10 group-hover:text-ember dark:bg-basalt/50 dark:text-frost dark:group-hover:bg-coral/10 dark:group-hover:text-coral">
                  {industryIcons[industry.slug]}
                </div>

                {/* Content */}
                <h2 className="mb-2 text-lg font-semibold text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
                  {industry.name}
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-basalt dark:text-coral/80">
                  {industry.headline}
                </p>

                {/* Notable clients if available */}
                {industry.notableClients && industry.notableClients.length > 0 && (
                  <p className="mt-auto text-xs text-basalt/60 dark:text-coral/50">
                    {industry.notableClients.slice(0, 2).join(', ')}
                    {industry.notableClients.length > 2 && ' +more'}
                  </p>
                )}

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-ember opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowNarrowRightIcon className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </GridBgSection>

      {/* Why Industry Expertise Matters */}
      <GridBgSection showBottomBorder withPadding>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-4">Why it matters</Eyebrow>
            <h2 className="mb-6 text-2xl font-semibold text-oxblood sm:text-3xl dark:text-frost">
              Industry expertise accelerates results
            </h2>
            <Text className="mb-8">
              <p>
                Generic marketing agencies waste time learning your business. We arrive with deep
                domain knowledge, proven playbooks, and relationships that open doors. Our sector
                expertise means faster ramp-up, smarter strategies, and better outcomes.
              </p>
            </Text>
          </div>

          {/* Stats */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 font-mono text-3xl font-semibold text-ember sm:text-4xl">
                20+
              </div>
              <p className="text-sm text-basalt dark:text-coral/60">
                Years of multi-industry experience
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-mono text-3xl font-semibold text-ember sm:text-4xl">
                500+
              </div>
              <p className="text-sm text-basalt dark:text-coral/60">
                Projects across 10+ sectors
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-mono text-3xl font-semibold text-ember sm:text-4xl">
                3.2x
              </div>
              <p className="text-sm text-basalt dark:text-coral/60">
                Average ROI vs. generalist agencies
              </p>
            </div>
          </div>
        </Container>
      </GridBgSection>

      {/* Call to Action */}
      <CallToActionWithEmail
        id="cta"
        headline="Ready to work with industry experts?"
        subheadline={
          <p>
            Tell us about your project and we&apos;ll connect you with team members who know your
            industry inside and out.
          </p>
        }
      />
    </main>
  )
}
