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
        eyebrow={
          <span className="flex items-center gap-1.5 text-sm text-oxblood dark:text-coral">
            <Link href="/method">Method</Link>
            <span>/</span>
            <Link href="/method/acceleration">Acceleration</Link>
            <span>/</span>
            <span className="font-semibold">Landing Experiences</span>
          </span>
        }
        headline="Landing experiences that guide action"
        subheadline={
          <p>
            Landing experiences should guide visitors toward action, not just display information. Most landing pages feel generic 
            because they&apos;re built from templates instead of understanding user intent. When landing experiences are designed 
            around how visitors actually behave—recognizing intent, removing obstacles, and clarifying value—they become powerful 
            acceleration tools that convert qualified traffic efficiently.
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
        eyebrow="How we build landing experiences"
        headline="Experiences that guide visitors toward action"
        subheadline={
          <p>
            We build landing experiences that go beyond templates—they&apos;re comprehensive systems that understand user 
            intent, remove obstacles, and create clear paths to conversion. Every element serves a purpose, every section 
            guides action, and every interaction moves visitors closer to becoming customers.
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
              headline="Intent-Based Design"
              subheadline={
                <p>
                  Every visitor arrives with intent. We build landing experiences that recognize different types of intent 
                  and guide visitors accordingly. Whether someone is researching, comparing, or ready to buy, the experience 
                  adapts to their needs. This intent-based approach means visitors don&apos;t waste time on irrelevant information—they 
                  get exactly what they need to move forward. When experiences are designed around intent, conversion rates 
                  improve because visitors can easily achieve their goals.
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
              headline="Friction Removal & Value Clarity"
              subheadline={
                <p>
                  Great landing experiences remove friction and clarify value at every turn. We identify obstacles that slow 
                  visitors down or prevent action, then systematically remove them. But we don&apos;t just remove friction—we also 
                  make value obvious, so visitors understand what they&apos;re getting and why it matters. This combination of 
                  friction removal and value clarity ensures visitors not only complete their goals but understand the value 
                  they&apos;re receiving. When done right, landing experiences feel effortless and valuable, creating satisfaction 
                  that builds trust and drives conversion.
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
        headline="Landing experiences that convert efficiently"
        subheadline={
          <p>
            When landing experiences are built as comprehensive systems that understand intent and remove friction, conversion 
            rates improve dramatically. Our intent-based design and friction removal create clear, easy paths to conversion.
          </p>
        }
      >
        <Stat stat="4.3x" text="Higher conversion rates for intent-based landing experiences vs. generic templates." />
        <Stat stat="69%" text="Increase in conversions when friction is systematically removed from landing pages." />
        <Stat stat="3.1x" text="Better task completion rates when value is clearly communicated upfront." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Landing experiences that transformed conversion"
        subheadline={
          <p>
            See how systematic landing experience design has helped brands guide visitors toward action and improve conversion rates.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our landing pages felt generic and didn&apos;t convert well. The intent-based design they 
              created recognizes different visitor types and guides them appropriately. Our conversion rates have more than 
              quadrupled, and visitors actually complete the actions we want them to take.
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
          name="Michael Chen"
          byline="Head of Growth at ConvertLab"
        />
        <Testimonial
          quote={
            <p>
              The friction removal work Magnet did was incredible. They identified obstacles we didn&apos;t even know existed and 
              systematically removed them. The result is landing experiences that feel effortless. Visitors tell us it&apos;s the 
              easiest signup process they&apos;ve ever experienced, and our conversion rates reflect that.
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
          name="Sarah Johnson"
          byline="VP of Marketing at FlowTech"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s landing experience design transformed how visitors interact with our pages. Instead of a one-size-fits-all 
              approach, we now have experiences that adapt to visitor intent. This has improved not just conversion rates, but visitor 
              satisfaction. People can now easily find what they need and take action.
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
          name="James Park"
          byline="Director of UX at LandingCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about landing experiences">
        <Faq
          id="faq-1"
          question="What's the difference between landing experiences and just landing pages?"
          answer="Landing pages are static pages. Landing experiences are comprehensive systems that understand user intent, remove obstacles, and create clear paths to conversion. They adapt to different visitor types, provide personalized guidance, and systematically remove friction. It's not just about one page—it's about building a system that guides visitors from first touch to conversion."
        />
        <Faq
          id="faq-2"
          question="How do you identify visitor intent?"
          answer="We identify visitor intent through a combination of analytics data, user research, and behavioral analysis. This includes understanding where visitors come from, what they're searching for, what content they engage with, and what actions they take. We then create experiences that match different types of intent—research, comparison, purchase—ensuring each visitor gets the right experience for their needs."
        />
        <Faq
          id="faq-3"
          question="What types of friction do you typically find and remove?"
          answer="Common friction points include unclear value propositions, confusing navigation, too many choices, lack of trust signals, slow load times, unnecessary form fields, and unclear calls to action. We systematically identify all friction points through user research and analytics, then remove them one by one. The goal is to make the path to conversion as clear and easy as possible."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from landing experience improvements?"
          answer="You'll typically see improvements in conversion rates within the first month as friction is removed and intent-based design is implemented. The real impact—sustained higher conversion rates and better visitor satisfaction—builds over 2-3 months as the system matures and visitors adapt to the improved experience."
        />
        <Faq
          id="faq-5"
          question="Can landing experiences work for complex B2B sales processes?"
          answer="Absolutely. In fact, landing experiences are especially valuable for complex B2B processes. We create experiences that guide visitors through research, evaluation, and decision stages, removing friction at each step. For B2B, this might include simplifying proposal requests, making demos easier to schedule, or creating clear paths for different buyer personas."
        />
        <Faq
          id="faq-6"
          question="How do you measure landing experience success?"
          answer="We measure success through multiple metrics: conversion rates, task completion rates, time to conversion, visitor satisfaction scores, and ultimately, revenue. But the real measure is whether visitors can easily achieve their goals. We track both quantitative metrics and qualitative feedback to continuously improve the experience."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build landing experiences that convert?"
        subheadline={
          <p>
            Let&apos;s create landing experiences that guide action and remove friction. Build comprehensive systems that 
            understand intent and create clear paths to conversion.
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
