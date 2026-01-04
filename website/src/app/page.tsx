import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { InteractiveCardsGrid } from '@/components/sections/interactive-cards-grid'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import { Code2, Search, Sparkles, Target } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithDemo
        id="hero"
        eyebrow={<AnnouncementBadge href="#" text="Magnet raises 80M Series A funding" cta="Learn more" />}
        headline="Digital marketing that resonates with your audience"
        subheadline={
          <p>
            Build a brand that stands out, create websites that convert, and launch campaigns that drive real results —
            all backed by data-driven strategy and proven methodologies.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get started
            </ButtonLink>

            <PlainButtonLink href="/playbook" size="lg">
              See how it works <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={
          <>
            <Screenshot className="rounded-md lg:hidden" wallpaper="green" placement="bottom-right">
              <Image
                src="/img/screenshots/1-left-1670-top-1408.webp"
                alt=""
                width={1670}
                height={1408}
                className="bg-white/75 md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-olive-left-1670-top-1408.webp"
                alt=""
                width={1670}
                height={1408}
                className="bg-black/75 not-dark:hidden md:hidden"
              />
              <Image
                src="/img/screenshots/1-left-2000-top-1408.webp"
                alt=""
                width={2000}
                height={1408}
                className="bg-white/75 max-md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-olive-left-2000-top-1408.webp"
                alt=""
                width={2000}
                height={1408}
                className="bg-black/75 not-dark:hidden max-md:hidden"
              />
            </Screenshot>
            <Screenshot className="rounded-lg max-lg:hidden" wallpaper="green" placement="bottom">
              <Image
                src="/img/screenshots/1.webp"
                alt=""
                className="bg-white/75 dark:hidden"
                width={3440}
                height={1990}
              />
              <Image
                className="bg-black/75 not-dark:hidden"
                src="/img/screenshots/1-color-olive.webp"
                alt=""
                width={3440}
                height={1990}
              />
            </Screenshot>
          </>
        }
        footer={
          <LogoGrid>
            <Logo>
              <Image
                src="/img/logos/ikea.png"
                alt="IKEA"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/gor.png"
                alt="Gorilla Glue"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/lux.png"
                alt="LUX"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/hgtv.png"
                alt="HGTV"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/oke.png"
                alt="KEEFE"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/kro.png"
                alt="Kroger"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/mhe.png"
                alt="McGraw Hill Education"
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </Logo>
          </LogoGrid>
        }
      />
      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="Case studies"
        headline="Real results from real partnerships that drive meaningful impact at scale."
        subheadline={
          <p>
            From enterprise platforms to modern marketing sites, we deliver solutions that power growth and transform
            digital experiences.
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <Screenshot wallpaper="purple" placement="bottom-right">
                  <Image
                    src="/img/screenshots/1-left-1000-top-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1000-top-800.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-660.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-left-1300-top-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="McGraw Hill Education"
              subheadline={
                <p>
                  Comprehensive platform engineering and full-stack development for their Engrade platforms, empowering
                  over 6 million K-12 students with powerful, scalable educational technology.
                </p>
              }
              cta={
                <Link href="#">
                  See how it works <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <Screenshot wallpaper="blue" placement="bottom-left">
                  <Image
                    src="/img/screenshots/1-right-1000-top-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-right-1300-top-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-1250.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Gorilla Glue"
              subheadline={
                <p>
                  Modern marketing website platform that anchors the ecommerce experience for their $400M market
                  position.
                </p>
              }
              cta={
                <Link href="#">
                  See how it works <ArrowNarrowRightIcon />
                </Link>
              }
            />
          </>
        }
      />
      {/* Interactive Cards */}
      <InteractiveCardsGrid
        id="services"
        eyebrow="Solutions"
        headline="Access customized, full-service support for every investment vehicle"
        cards={[
          {
            title: 'Branding',
            icon: <Sparkles className="size-12" strokeWidth={1} />,
            description: (
              <p>Clarify your story and stand out in the market with advanced strategic precision.</p>
            ),
            href: '/branding',
          },
          {
            title: 'Websites',
            icon: <Code2 className="size-12" strokeWidth={1} />,
            description: (
              <p>Design frictionless digital journeys that consistently convert higher-quality buyers.</p>
            ),
            href: '/websites',
          },
          {
            title: 'Search Marketing',
            icon: <Search className="size-12" strokeWidth={1} />,
            description: (
              <p>Build fast, scalable search systems that reliably power sustainable long-term growth.</p>
            ),
            href: '/search',
          },
          {
            title: 'Paid Ads',
            icon: <Target className="size-12" strokeWidth={1} />,
            description: (
              <p>Increase qualified demand through highly targeted, high-intent acquisition campaigns.</p>
            ),
            href: '/ads',
          },
        ]}
      />
      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Built for scale"
        headline="Marketing that drives measurable growth."
        subheadline={
          <p>
            Magnet helps brands build stronger market positions through strategic branding, high-converting websites,
            and performance-driven campaigns. From startups to enterprise companies, we deliver results that move the
            needle — backed by data, strategy, and proven methodologies.
          </p>
        }
      >
        <Stat stat="$500M+" text="In revenue generated for clients through our marketing programs." />
        <Stat stat="3.2x" text="Average ROI increase for brands working with Magnet." />
      </StatsWithGraph>
      {/* Testimonial */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="What our customers are saying"
        subheadline={<p>We've given these customers a significant discount in exchange for their honest reviews.</p>}
      >
        <Testimonial
          quote={
            <p>
              Magnet completely transformed our brand positioning and website. Our conversion rate increased by 240% in
              the first quarter, and we're finally standing out in a crowded market.
            </p>
          }
          img={
            <Image
              src="/img/avatars/10-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="Jordan Rogers"
          byline="Founder at Anomaly"
        />
        <Testimonial
          quote={
            <p>
              Their search marketing strategy tripled our organic traffic in six months. Magnet understands how to build
              sustainable growth, not just quick wins.
            </p>
          }
          img={
            <Image
              src="/img/avatars/15-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="Lynn Marshall"
          byline="Founder at Pine Labs"
        />
        <Testimonial
          quote={
            <p>
              Working with Magnet freed up our team to focus on product development. Their paid ads campaigns are
              driving qualified leads at a fraction of our previous cost per acquisition.
            </p>
          }
          img={
            <Image
              src="/img/avatars/13-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="Rajat Singh"
          byline="Head of Marketing at Concise"
        />
        <Testimonial
          quote={
            <p>
              Magnet's branding work gave us clarity we didn't know we needed. Our messaging is now consistent across
              every touchpoint, and it shows in our customer engagement metrics.
            </p>
          }
          img={
            <Image
              src="/img/avatars/12-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="John Walters"
          byline="CPO at Orbital"
        />
        <Testimonial
          quote={
            <p>
              As a solo founder, Magnet made it possible to compete with much larger companies. Their website and
              marketing systems give us the credibility and reach we needed to scale.
            </p>
          }
          img={
            <Image
              src="/img/avatars/11-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="Noah Gold"
          byline="CEO at Looply"
        />
        <Testimonial
          quote={
            <p>
              We've doubled our marketing ROI since partnering with Magnet. Their data-driven approach and strategic
              thinking have transformed how we think about growth.
            </p>
          }
          img={
            <Image
              src="/img/avatars/14-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="Mark Levinson"
          byline="CMO at Quirk"
        />
      </TestimonialThreeColumnGrid>
      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
        <Faq
          id="faq-1"
          question="How do you measure marketing success?"
          answer="We track metrics that matter: conversion rates, customer acquisition cost, lifetime value, and revenue attribution. Every campaign includes clear KPIs and regular reporting so you know exactly what's working and what's driving growth."
        />
        <Faq
          id="faq-2"
          question="Can you work with our existing marketing team?"
          answer="Absolutely. We collaborate seamlessly with in-house teams, providing strategic guidance and execution support. Whether you need full-service support or specific expertise, we adapt to your team structure and workflow."
        />
        <Faq
          id="faq-3"
          question="What makes your approach different?"
          answer="We focus on building sustainable, data-driven marketing systems rather than chasing trends. Our methodology combines strategic foundation, activation, acceleration, and retention—creating marketing that compounds over time, not just quick wins."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results?"
          answer="Results vary by service and market, but most clients see measurable improvements within 30-90 days. Search marketing and paid ads typically show faster initial results, while branding and website work compounds over time. We set clear expectations upfront."
        />
      </FAQsTwoColumnAccordion>
      {/* Pricing */}
      <PricingMultiTier
        id="pricing"
        headline="Pricing to fit your business needs."
        plans={
          <>
            <Plan
              name="Starter"
              price="$5K"
              period="/mo"
              subheadline={<p>Emerging brands ready to build their foundation</p>}
              features={[
                'Brand strategy & positioning',
                'Website design & development',
                'Basic SEO setup',
                'Monthly performance reporting',
                'Email support',
              ]}
              cta={
                <SoftButtonLink href="/contact" size="lg">
                  Get started
                </SoftButtonLink>
              }
            />
            <Plan
              name="Growth"
              price="$15K"
              period="/mo"
              subheadline={<p>Scaling brands needing comprehensive marketing</p>}
              badge="Most popular"
              features={[
                'Everything in Starter',
                'Search marketing program',
                'Paid advertising campaigns',
                'Content strategy & creation',
                'Advanced analytics & attribution',
                'Dedicated account manager',
                'Quarterly strategy reviews',
              ]}
              cta={
                <ButtonLink href="/contact" size="lg">
                  Get started
                </ButtonLink>
              }
            />
            <Plan
              name="Enterprise"
              price="Custom"
              period=""
              subheadline={<p>Large organizations requiring full-service support</p>}
              features={[
                'Everything in Growth',
                'Custom marketing systems',
                'Multi-channel campaign management',
                'Advanced data analytics',
                'Dedicated team',
                'Priority support',
                'Custom integrations',
              ]}
              cta={
                <SoftButtonLink href="#" size="lg">
                  Contact sales
                </SoftButtonLink>
              }
            />
          </>
        }
      />
      {/* Call To Action */}
      <CallToActionWithEmail
        id="call-to-action"
        headline="Ready to build marketing that drives real growth?"
        subheadline={
          <p>
            Join hundreds of brands using Magnet to build stronger market positions, create high-converting websites,
            and launch campaigns that deliver measurable results.
          </p>
        }
      />
    </>
  )
}
