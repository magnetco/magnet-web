import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithDemo
        id="hero"
        withGridBg
        eyebrow={
          <span className="flex items-center gap-1.5 text-sm text-oxblood dark:text-coral">
            <Link href="/method">Method</Link>
            <span>/</span>
            <Link href="/method/foundation">Foundation</Link>
            <span>/</span>
            <span className="font-semibold">Digital Experience</span>
          </span>
        }
        headline="Digital experiences that convert and engage"
        subheadline={
          <p>
            Digital experiences should guide users through their journey and create moments that matter, not just display information. 
            Most experiences feel disjointed because they&apos;re built as pages instead of systems that remove friction. When digital 
            experiences are designed as comprehensive systems that understand user intent and create cohesive interactions, they become 
            the foundation that makes every digital touchpoint more valuable.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get started
            </ButtonLink>

            <PlainButtonLink href="#" size="lg">
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
      />

      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="How we build digital experiences"
        headline="Experiences that guide, convert, and delight"
        subheadline={
          <p>
            We build digital experiences that go beyond websites—they're comprehensive systems that guide users through 
            their journey, remove friction, and create moments that matter. When digital experience is done right, it becomes 
            the foundation that makes every other digital investment more effective.
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
                    width={1000}
                    height={800}
                    className="bg-black/75 not-dark:hidden sm:hidden"
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
                    width={1800}
                    height={660}
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
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
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
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
                    width={1800}
                    height={1250}
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                  />
                </Screenshot>
              }
              headline="User Journey Mapping"
              subheadline={
                <p>
                  Every digital experience should guide users through a clear journey. We map user journeys from first touch 
                  to conversion, identifying every touchpoint, every decision point, and every opportunity to remove friction 
                  or add value. This journey mapping ensures every element of the digital experience serves a purpose and 
                  moves users closer to action. When journeys are mapped correctly, users don't get lost—they get guided 
                  toward the outcomes they want, and you want.
                </p>
              }
              cta={
                <Link href="#">
                  Learn more <ArrowNarrowRightIcon />
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
                    width={1000}
                    height={800}
                    className="bg-black/75 not-dark:hidden sm:hidden"
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
                    width={1800}
                    height={660}
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
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
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
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
                    width={1800}
                    height={1250}
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                  />
                </Screenshot>
              }
              headline="Friction Removal & Value Creation"
              subheadline={
                <p>
                  Great digital experiences remove friction and create value at every turn. We identify obstacles that slow 
                  users down or prevent action, then systematically remove them. But we don't just remove friction—we also 
                  create moments of value that make the experience delightful. This combination of friction removal and value 
                  creation ensures users not only complete their goals but enjoy the process. When done right, digital 
                  experiences feel effortless and valuable, creating satisfaction that builds loyalty and advocacy.
                </p>
              }
              cta={
                <Link href="#">
                  Learn more <ArrowNarrowRightIcon />
                </Link>
              }
            />
          </>
        }
      />

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Digital experiences that drive engagement and conversion"
        subheadline={
          <p>
            When digital experiences are built as comprehensive systems that guide users and remove friction, engagement 
            increases and conversion rates improve. Our user journey mapping and friction removal create experiences that 
            convert and delight.
          </p>
        }
      >
        <Stat stat="3.5x" text="Higher conversion rates for experiences with mapped user journeys vs. ad-hoc designs." />
        <Stat stat="62%" text="Increase in user satisfaction when friction is systematically removed from digital experiences." />
        <Stat stat="2.8x" text="Better engagement rates when experiences create value at every touchpoint." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Digital experiences that transformed engagement"
        subheadline={
          <p>
            See how comprehensive digital experience systems have helped brands create engaging, converting experiences.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our website felt disjointed. Users would get lost, and we had no idea why. The 
              user journey mapping they did revealed all the friction points, and the experience they built guides users 
              seamlessly from first visit to conversion. Our conversion rates have tripled.
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
          name="Nicole Williams"
          byline="Head of Product at WebFlow"
        />
        <Testimonial
          quote={
            <p>
              The friction removal work Magnet did transformed our digital experience. They identified obstacles we didn't 
              even know existed and systematically removed them. The result is an experience that feels effortless, and users 
              tell us they actually enjoy using our platform now. That's never happened before.
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
          name="Brian Foster"
          byline="VP of Design at ExperienceCo"
        />
        <Testimonial
          quote={
            <p>
              Magnet's digital experience work created a cohesive system across all our touchpoints. Every interaction now 
              feels intentional and valuable. This consistency has improved not just conversion rates, but user satisfaction 
              and brand perception. The digital experience has become a competitive advantage.
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
          name="Jessica Taylor"
          byline="Director of UX at DigitalFirst"
        />
      </TestimonialThreeColumnGrid>

      {/* Approach */}
      <Approach
        id="approach"
        eyebrow="Our Method"
        headline="How we build brands"
        subheadline={
          <p>
            We follow a proven four-stage approach to create brands that drive real business results.
          </p>
        }
      >
        <ApproachStage
          title="Foundation"
          description="Build the strategic, narrative, and technical infrastructure for growth."
          items={
            <>
              <ApproachItem href="/method/foundation/brand-architecture">Brand Architecture</ApproachItem>
              <ApproachItem href="/method/foundation/messaging-system">Messaging System</ApproachItem>
              <ApproachItem href="/method/foundation/digital-experience">Digital Experience</ApproachItem>
              <ApproachItem href="/method/foundation/conversion-architecture">Conversion Architecture</ApproachItem>
              <ApproachItem href="/method/foundation/data-analytics-setup">Data & Analytics Setup</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Activation"
          description="Turn on demand to attract qualified traffic into the system."
          items={
            <>
              <ApproachItem href="/method/activation/paid-media">Paid Media</ApproachItem>
              <ApproachItem href="/method/activation/search-marketing">Search Marketing</ApproachItem>
              <ApproachItem href="/method/activation/social-content">Social Content</ApproachItem>
              <ApproachItem href="/method/activation/creative-storytelling">Creative Storytelling</ApproachItem>
              <ApproachItem href="/method/activation/partnerships">Partnerships</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Acceleration"
          description="Targeted acquisition using ICP insight for efficient, scalable demand."
          items={
            <>
              <ApproachItem href="/method/acceleration/offers-packaging">Offers & Packaging</ApproachItem>
              <ApproachItem href="/method/acceleration/landing-experiences">Landing Experiences</ApproachItem>
              <ApproachItem href="/method/acceleration/sales-enablement">Sales Enablement</ApproachItem>
              <ApproachItem href="/method/acceleration/crm-flows-automation">CRM Flows & Automation</ApproachItem>
              <ApproachItem href="/method/acceleration/attribution-measurement">Attribution & Measurement</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Retention"
          description="Improved acquisition efficiency, conversion and revenue throughput."
          items={
            <>
              <ApproachItem href="/method/retention/lifecycle-email">Lifecycle Email</ApproachItem>
              <ApproachItem href="/method/retention/success-enablement">Success Enablement</ApproachItem>
              <ApproachItem href="/method/retention/community-brand-systems">Community & Brand Systems</ApproachItem>
              <ApproachItem href="/method/retention/feedback-loops-optimization">Feedback Loops & Optimization</ApproachItem>
              <ApproachItem href="/method/retention/predictive-intelligence">Predictive Intelligence</ApproachItem>
            </>
          }
        />
      </Approach>

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about digital experience">
        <Faq
          id="faq-1"
          question="What's included in a digital experience system?"
          answer="A comprehensive digital experience system includes user journey mapping, friction removal, value creation at key touchpoints, responsive design across all devices, accessibility considerations, performance optimization, and integration with other marketing systems. It's not just a website—it's a complete system that guides users from first touch to conversion and beyond."
        />
        <Faq
          id="faq-2"
          question="How do you identify friction points in digital experiences?"
          answer="We use a combination of user research, analytics data, and journey mapping to identify friction points. This includes analyzing where users drop off, where they spend too much time, where they get confused, and where they abandon goals. We also conduct user testing to observe real behavior and identify obstacles that data alone might miss."
        />
        <Faq
          id="faq-3"
          question="Can digital experiences work across different devices and platforms?"
          answer="Absolutely. We build digital experiences that work seamlessly across desktop, mobile, tablet, and other devices. The experience adapts to each platform while maintaining consistency and functionality. This responsive approach ensures users have a great experience regardless of how they access your brand."
        />
        <Faq
          id="faq-4"
          question="How do you measure digital experience success?"
          answer="We measure success through multiple metrics: conversion rates, engagement rates, time on site, bounce rates, user satisfaction scores, and task completion rates. But the real measure is whether users can easily achieve their goals and whether they enjoy the experience. We track both quantitative metrics and qualitative feedback to continuously improve."
        />
        <Faq
          id="faq-5"
          question="How long does it take to build a comprehensive digital experience?"
          answer="The timeline depends on the scope and complexity, but typically takes 6-12 weeks for a comprehensive digital experience system. This includes research, journey mapping, design, development, testing, and optimization. For larger or more complex experiences, the timeline may be longer to ensure quality and thoroughness."
        />
        <Faq
          id="faq-6"
          question="How does digital experience integrate with other marketing efforts?"
          answer="Digital experience is the foundation that makes all other marketing efforts more effective. It ensures consistency across paid media, social content, email, and every other touchpoint. When digital experience is done right, every marketing investment reinforces the experience, creating a compounding effect that improves over time."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build your digital experience?"
        subheadline={
          <p>
            Let's create digital experiences that convert and engage. Build comprehensive systems that guide users through 
            their journey, remove friction, and create moments that matter.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get started
            </ButtonLink>

            <PlainButtonLink href="#" size="lg">
              Book a consultation <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
