import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsWithChat } from '@/components/sections/faqs-with-chat'
import { FeaturesBentoGrid } from '@/components/sections/features-bento-grid'
import { PricingRetainerHero } from '@/components/sections/pricing-retainer-hero'
import { ServiceProcess } from '@/components/sections/service-process'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { Screenshot } from '@/components/elements/screenshot'

export const metadata: Metadata = {
  title: 'Full-Service Retainer | Magnet',
  description:
    'Partner with Magnet for ongoing growth with our full-service marketing retainer. Brand strategy, web development, paid advertising, and more—all in one integrated partnership.',
}

const MONTHLY_PRICE = 25000
const YEARLY_PRICE = Math.round((MONTHLY_PRICE * 12 * 0.9) / 12) // 10% discount, shown per month

const retainerFeatures = [
  'Brand strategy & positioning',
  'Website design & development',
  'Paid advertising campaigns',
  'Search marketing program',
  'Content strategy & creation',
  'Conversion optimization',
  'Advanced analytics & attribution',
  'Dedicated account team',
  'Monthly strategy reviews',
  'Priority support',
]

export default function RetainerPage() {
  return (
    <>
      {/* Hero */}
      <PricingRetainerHero
        id="hero"
        withGridBg
        eyebrow="Full-Service Retainer"
        headline="Your complete marketing team, on demand."
        subheadline={
          <p>
            Stop juggling agencies and freelancers. Get a dedicated team that owns your entire marketing engine—from
            brand strategy to paid media to conversion optimization.
          </p>
        }
        monthlyPrice={MONTHLY_PRICE}
        yearlyPrice={YEARLY_PRICE}
        features={retainerFeatures}
        footer={
          <LogoGrid>
            <Logo>
              <Image
                src="/img/logos/9-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={51}
                height={32}
              />
              <Image
                src="/img/logos/9-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={51}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/10-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={70}
                height={32}
              />
              <Image
                src="/img/logos/10-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={70}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/11-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={100}
                height={32}
              />
              <Image
                src="/img/logos/11-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={100}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/12-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/12-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/13-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={75}
                height={32}
              />
              <Image
                src="/img/logos/13-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={75}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/8-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/8-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
          </LogoGrid>
        }
      />

      {/* What's Included */}
      <FeaturesBentoGrid
        id="included"
        withGridBg
        headline="Everything you need to grow, nothing you don't."
        subheadline={
          <p>
            Our retainer model gives you access to a full marketing team without the overhead. We integrate seamlessly
            with your business and operate as an extension of your team.
          </p>
        }
        features={[
          {
            title: 'Brand Strategy',
            description:
              'Positioning, messaging, and visual identity that differentiates you in crowded markets and resonates with your ideal customers.',
            href: '/branding',
            demo: (
              <Screenshot wallpaper="purple" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1800-top-1250.webp"
                  alt="Brand strategy"
                  className="bg-white/75 dark:hidden"
                  width={1800}
                  height={1250}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                  alt="Brand strategy"
                  width={1800}
                  height={1250}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Web Development',
            description:
              'High-converting websites and landing pages built with modern technology. Continuous optimization based on real user data.',
            href: '/websites',
            demo: (
              <Screenshot wallpaper="blue" placement="top-left" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Web development"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Web development"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Paid Advertising',
            description:
              'Full-funnel campaigns across Google, Meta, LinkedIn, and programmatic. We handle strategy, creative, and optimization.',
            href: '/ads',
            demo: (
              <Screenshot wallpaper="green" placement="bottom-left" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Paid advertising"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Paid advertising"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Search Marketing',
            description:
              'Technical SEO, content strategy, and link building that drives organic traffic and establishes thought leadership.',
            href: '/search',
            demo: (
              <Screenshot wallpaper="brown" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Search marketing"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Search marketing"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Analytics & Attribution',
            description:
              'End-to-end tracking, custom dashboards, and attribution modeling so you know exactly what's driving results.',
            href: '/method/foundation/data-analytics-setup',
            demo: (
              <Screenshot wallpaper="purple" placement="top-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Analytics"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Analytics"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
        ]}
      />

      {/* Process */}
      <ServiceProcess
        id="process"
        service="retainer"
        headline="How our retainer partnership works"
        subheadline={
          <p>
            We follow the same proven four-phase methodology on an ongoing basis, continuously optimizing and scaling
            what works.
          </p>
        }
      />

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Retainer Results"
        headline="Partnerships that deliver."
        subheadline={
          <p>
            Our retainer clients see compounding returns as we optimize their marketing engine month over month. Here's
            what long-term partnerships achieve.
          </p>
        }
      >
        <Stat stat="3.2x" text="Average ROAS improvement in first 6 months." />
        <Stat stat="68%" text="Increase in qualified leads year over year." />
        <Stat stat="24mo" text="Average client engagement length." />
      </StatsWithGraph>

      {/* Testimonial */}
      <TestimonialLargeQuote
        id="testimonial"
        quote={
          <p>
            Having Magnet as our full-service marketing partner has transformed our business. They operate like an
            extension of our team, and the results speak for themselves—we've 3x'd our pipeline in under a year.
          </p>
        }
        img={
          <Image
            src="/img/avatars/16-size-160.webp"
            alt=""
            className="not-dark:bg-white/75 dark:bg-black/75"
            width={160}
            height={160}
          />
        }
        name="Lynn Marshall"
        byline="CEO, Pine Labs"
      />

      {/* FAQs */}
      <FAQsWithChat
        id="faqs"
        eyebrow="Retainer FAQ"
        headline="Questions & Answers"
        subheadline="Get answers to common questions about our retainer model, or chat with our AI assistant for personalized guidance."
        questions={[
          { question: "What's included in the full-service retainer?" },
          { question: 'How does the onboarding process work?' },
          { question: 'Can I customize the services included?' },
          { question: 'How long does it take to see results?' },
          { question: 'What if I need to pause or cancel?' },
        ]}
      />

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline="Ready to accelerate your growth?"
        subheadline={
          <p>
            Book a strategy call to discuss how our full-service retainer can help you build a marketing engine that
            drives predictable, scalable growth.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Book a strategy call
            </ButtonLink>

            <PlainButtonLink href="/pricing" size="lg">
              View all pricing <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
