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
        headline="Conversion Architecture"
        subheadline={
          <p>
            Remove friction and guide users toward action. Conversion architecture is the system that removes friction and 
            guides users toward action. It's the foundation that makes every interaction more likely to result in the outcome 
            you want. We build conversion architecture that goes beyond landing pages—it's a comprehensive system that 
            understands user intent, removes obstacles, and creates clear paths to action.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
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
        eyebrow="How we build conversion architecture"
        headline="Systems that remove friction and guide action"
        subheadline={
          <p>
            We build conversion architecture that goes beyond landing pages—it's a comprehensive system that understands 
            user intent, removes obstacles, and creates clear paths to action. When conversion architecture is done right, 
            it becomes the foundation that makes every other marketing investment more effective.
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
              headline="Intent-Based Path Design"
              subheadline={
                <p>
                  Every user arrives with intent. We build conversion architecture that recognizes different types of intent 
                  and creates clear paths for each. Whether someone is researching, comparing, or ready to buy, the architecture 
                  guides them appropriately. This intent-based approach means users don't waste time on irrelevant information—they 
                  get exactly what they need to move forward. When paths are designed around intent, conversion rates improve 
                  because users can easily achieve their goals.
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
              headline="Friction Elimination Systems"
              subheadline={
                <p>
                  Friction kills conversions. We build systems that systematically identify and eliminate friction at every 
                  step. This includes removing unnecessary form fields, simplifying decision points, reducing cognitive load, 
                  and eliminating any obstacle that prevents action. But we don't just remove friction—we also add clarity, 
                  confidence, and value at key moments. When friction is eliminated systematically, conversion rates improve 
                  because the path to action becomes clear and easy.
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
        headline="Conversion architecture that drives action"
        subheadline={
          <p>
            When conversion architecture is built as a comprehensive system that understands intent and removes friction, 
            conversion rates improve dramatically. Our intent-based paths and friction elimination create clear, easy paths 
            to action.
          </p>
        }
      >
        <Stat stat="4.1x" text="Higher conversion rates for intent-based conversion architecture vs. generic designs." />
        <Stat stat="71%" text="Increase in conversions when friction is systematically eliminated from user paths." />
        <Stat stat="3.2x" text="Better task completion rates when paths are designed around user intent." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Conversion architecture that transformed results"
        subheadline={
          <p>
            See how systematic conversion architecture has helped brands remove friction and guide users toward action.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our conversion rates were terrible. Users would start the process but never finish. 
              The conversion architecture they built created clear paths based on user intent, and systematically removed 
              every friction point. Our conversion rates have quadrupled, and users actually complete the process now.
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
          name="Ryan Mitchell"
          byline="Head of Growth at ConvertCo"
        />
        <Testimonial
          quote={
            <p>
              The friction elimination work Magnet did was incredible. They identified obstacles we didn't even know existed 
              and systematically removed them. The result is a conversion process that feels effortless. Users tell us it's 
              the easiest signup process they've ever experienced, and our conversion rates reflect that.
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
          name="Lauren Davis"
          byline="VP of Product at FlowTech"
        />
        <Testimonial
          quote={
            <p>
              Magnet's intent-based path design transformed how users interact with our site. Instead of a one-size-fits-all 
              approach, we now have clear paths for different types of users. This has improved not just conversion rates, 
              but user satisfaction. People can now easily find what they need and take action.
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
          name="Chris Anderson"
          byline="Director of UX at PathDesign"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about conversion architecture">
        <Faq
          id="faq-1"
          question="What's the difference between conversion architecture and just optimizing landing pages?"
          answer="Landing page optimization focuses on improving individual pages. Conversion architecture is a comprehensive system that understands user intent, removes friction across the entire journey, and creates clear paths to action. It's not just about one page—it's about building a system that guides users from first touch to conversion, ensuring every interaction moves them closer to action."
        />
        <Faq
          id="faq-2"
          question="How do you identify user intent?"
          answer="We identify user intent through a combination of analytics data, user research, and behavioral analysis. This includes understanding where users come from, what they're searching for, what content they engage with, and what actions they take. We then create paths that match different types of intent—research, comparison, purchase—ensuring each user gets the right experience for their needs."
        />
        <Faq
          id="faq-3"
          question="What types of friction do you typically find and remove?"
          answer="Common friction points include unnecessary form fields, unclear value propositions, confusing navigation, too many choices, lack of trust signals, slow load times, and unclear calls to action. We systematically identify all friction points through user research and analytics, then remove them one by one. The goal is to make the path to action as clear and easy as possible."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from conversion architecture improvements?"
          answer="You'll typically see improvements in conversion rates within the first month as friction is removed and paths are clarified. The real impact—sustained higher conversion rates and better user satisfaction—builds over 2-3 months as the system matures and users adapt to the improved experience."
        />
        <Faq
          id="faq-5"
          question="Can conversion architecture work for complex B2B sales processes?"
          answer="Absolutely. In fact, conversion architecture is especially valuable for complex B2B processes. We create paths that guide users through research, evaluation, and decision stages, removing friction at each step. For B2B, this might include simplifying proposal requests, making demos easier to schedule, or creating clear paths for different buyer personas."
        />
        <Faq
          id="faq-6"
          question="How do you measure conversion architecture success?"
          answer="We measure success through multiple metrics: conversion rates, task completion rates, time to conversion, user satisfaction scores, and ultimately, revenue. But the real measure is whether users can easily achieve their goals. We track both quantitative metrics and qualitative feedback to continuously improve the architecture."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build your conversion architecture?"
        subheadline={
          <p>
            Let's create systems that remove friction and guide users toward action. Build conversion architecture that 
            understands intent and creates clear paths to conversion.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
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
