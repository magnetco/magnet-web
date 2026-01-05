import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { TabbedLogoGallery, type GalleryItem } from '@/components/elements/tabbed-logo-gallery'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { FAQsWithChat, Faq } from '@/components/sections/faqs-with-chat'
import { FeaturesBentoGrid } from '@/components/sections/features-bento-grid'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { PricingCompact } from '@/components/sections/pricing-compact'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TeamCarouselSection, type TeamCarouselMember } from '@/components/sections/team-carousel'
import { TestimonialsAnimatedGrid } from '@/components/sections/testimonials-animated-grid'
import { client } from '@/lib/sanity/client'
import { teamMembersQuery } from '@/lib/sanity/queries'
import Image from 'next/image'

const galleryItems: GalleryItem[] = [
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
    ),
  },
  {
    id: 'gorilla',
    logo: (
      <Image
        src="/img/logos/gor.png"
        alt="Gorilla Glue"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="blue" placement="bottom-right">
          <Image
            src="/img/screenshots/1-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-white/75 md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-black/75 not-dark:hidden md:hidden"
          />
          <Image
            src="/img/screenshots/1-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-white/75 max-md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-black/75 not-dark:hidden max-md:hidden"
          />
        </Screenshot>
        <Screenshot className="rounded-lg max-lg:hidden" wallpaper="blue" placement="bottom">
          <Image
            src="/img/screenshots/1-right-1300-top-1300.webp"
            alt=""
            className="bg-white/75 dark:hidden"
            width={1300}
            height={1300}
          />
          <Image
            className="bg-black/75 not-dark:hidden"
            src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
            alt=""
            width={1300}
            height={1300}
          />
        </Screenshot>
      </>
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
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="purple" placement="bottom-right">
          <Image
            src="/img/screenshots/1-left-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-white/75 md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-left-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-black/75 not-dark:hidden md:hidden"
          />
          <Image
            src="/img/screenshots/1-left-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-white/75 max-md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-left-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-black/75 not-dark:hidden max-md:hidden"
          />
        </Screenshot>
        <Screenshot className="rounded-lg max-lg:hidden" wallpaper="purple" placement="bottom">
          <Image
            src="/img/screenshots/1-left-1300-top-1300.webp"
            alt=""
            className="bg-white/75 dark:hidden"
            width={1300}
            height={1300}
          />
          <Image
            className="bg-black/75 not-dark:hidden"
            src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
            alt=""
            width={1300}
            height={1300}
          />
        </Screenshot>
      </>
    ),
  },
  {
    id: 'kroger',
    logo: (
      <Image
        src="/img/logos/kro.png"
        alt="Kroger"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="brown" placement="bottom-right">
          <Image
            src="/img/screenshots/1-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-white/75 md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-black/75 not-dark:hidden md:hidden"
          />
          <Image
            src="/img/screenshots/1-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-white/75 max-md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-black/75 not-dark:hidden max-md:hidden"
          />
        </Screenshot>
        <Screenshot className="rounded-lg max-lg:hidden" wallpaper="brown" placement="bottom">
          <Image
            src="/img/screenshots/1-right-1300-top-1300.webp"
            alt=""
            className="bg-white/75 dark:hidden"
            width={1300}
            height={1300}
          />
          <Image
            className="bg-black/75 not-dark:hidden"
            src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
            alt=""
            width={1300}
            height={1300}
          />
        </Screenshot>
      </>
    ),
  },
  {
    id: 'mhe',
    logo: (
      <Image
        src="/img/logos/mhe.png"
        alt="McGraw Hill Education"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="green" placement="bottom-left">
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
    ),
  },
]

export default async function Page() {
  // Fetch team members from Sanity
  const teamMembers = await client.fetch<TeamCarouselMember[]>(teamMembersQuery)
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithDemo
        id="hero"
        withGridBg
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

            <PlainButtonLink href="/method" size="lg">
              See how it works <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={<TabbedLogoGallery items={galleryItems} />}
      />
      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        withGridBg
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
      {/* Services */}
      <FeaturesBentoGrid
        id="services"
        withGridBg
        eyebrow="Our Services"
        headline="Full-service marketing support built around your growth."
        subheadline={
          <p>
            From strategic retainers to specialized projects, we offer flexible engagement models that scale with your
            business needs.
          </p>
        }
        features={[
          {
            title: 'Retainer Partnership',
            description:
              'Ongoing strategic partnership with dedicated team access, monthly strategy sessions, and priority support. The most effective way to build sustainable marketing momentum.',
            href: '/pricing',
            demo: (
              <Screenshot wallpaper="purple" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1800-top-1250.webp"
                  alt="Retainer partnership dashboard"
                  className="bg-white/75 dark:hidden"
                  width={1800}
                  height={1250}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                  alt="Retainer partnership dashboard"
                  width={1800}
                  height={1250}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Websites',
            description:
              'High-converting websites built on modern foundations. From marketing sites to complex platforms.',
            href: '/websites',
            demo: (
              <Screenshot wallpaper="blue" placement="top-left" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Website development"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Website development"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Branding',
            description:
              'Strategic brand positioning that clarifies your story and differentiates you in the market.',
            href: '/branding',
            demo: (
              <Screenshot wallpaper="brown" placement="bottom-left" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Brand strategy"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Brand strategy"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Paid Media',
            description:
              'Data-driven advertising campaigns across Google, Meta, and LinkedIn that drive qualified demand.',
            href: '/ads',
            demo: (
              <Screenshot wallpaper="green" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Paid media campaigns"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Paid media campaigns"
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
              'SEO and content strategies that build long-term organic visibility and sustainable traffic growth.',
            href: '/search',
            demo: (
              <Screenshot wallpaper="purple" placement="top-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Search marketing"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Search marketing"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
        ]}
      />
      {/* Stats */}
      <StatsWithGraph
        id="stats"
        withGridBg
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
      {/* Testimonials */}
      <TestimonialsAnimatedGrid
        id="testimonials"
        eyebrow="Kind Words"
        headline="What our customers are saying"
        subheadline={<p>Real feedback from real partners. See how we've helped brands transform their marketing and achieve measurable growth.</p>}
      />
      {/* Team */}
      <TeamCarouselSection
        id="team"
        headline={
          <>
            Craftsmanship elevated by
            <br />a <span className="text-ember">culture of excellence</span>
          </>
        }
        subheadline={
          <p>
            Momentum starts with the right team. At Magnet, we bring seasoned leadership, hands-on expertise, and a
            founder's mindset to every project. We don't just work for you — we build with you, every step of the way.
          </p>
        }
        members={teamMembers}
      />
      {/* FAQs with Chat */}
      <FAQsWithChat
        id="faqs"
        withGridBg
        eyebrow="Common questions"
        headline="Everything you need to know"
        subheadline="Get quick answers to frequently asked questions, or start a conversation with our AI assistant for personalized guidance."
      >
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
      </FAQsWithChat>
      {/* Pricing */}
      <PricingCompact
        id="pricing"
        withGridBg
        headline="Pricing to fit your business needs."
        subheadline={
          <p>
            Partner with us for ongoing growth, or engage us for specific deliverables.
          </p>
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
