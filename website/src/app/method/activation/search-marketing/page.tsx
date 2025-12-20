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
        headline="Search Marketing"
        subheadline={
          <p>
            Search should compound, not fluctuate. Search often feels busy but lacks impact because it's treated as a channel 
            rather than a system designed around buyer intent, evaluation, and trust. The result? Movement without momentum. 
            When search aligns with how people research and choose, it stops fluctuating and starts compounding. Search becomes 
            a long-term demand asset, not a quarterly tactic.
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
        eyebrow="How we build search"
        headline="Search systems built for how buyers actually decide"
        subheadline={
          <p>
            Magnet builds search as a long-term demand asset, not a quarterly tactic. We remove hidden limits with technical 
            foundations, use intent-driven content to answer real questions, earn authority rather than assuming it, and ensure 
            everything works together so each page has a purpose and every visit moves someone closer to action.
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
              headline="Intent-Driven Content"
              subheadline={
                <p>
                  Content that answers real questions, not just targets keywords. We build search systems around buyer intent, 
                  creating content that matches what people are actually searching for and what they need at each stage of their 
                  journey. This intent-driven approach means every piece of content serves a purpose—answering questions, solving 
                  problems, and guiding buyers toward decisions. When content aligns with intent, search stops fluctuating and 
                  starts compounding because you're building a system that grows more valuable every month.
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
              headline="Authority Through Value"
              subheadline={
                <p>
                  Earning authority rather than assuming it. We build search systems that establish credibility through value—creating 
                  content that's genuinely helpful, building relationships through quality, and earning trust through consistency. This 
                  approach means you're not just trying to rank—you're building authority that compounds over time. When search is 
                  built around earning authority, you get better traffic, stronger credibility, and inbound demand that grows more 
                  valuable every month. The result isn't just more traffic—it's traffic that converts because it comes from people 
                  who trust you.
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
        headline="Search that compounds, not fluctuates"
        subheadline={
          <p>
            When search is built as a long-term demand asset instead of a quarterly tactic, the results compound over time. 
            Intent-driven content and earned authority create better traffic, stronger credibility, and inbound demand that grows 
            more valuable every month.
          </p>
        }
      >
        <Stat stat="4.2x" text="Higher conversion rates for intent-driven search content vs. keyword-focused content." />
        <Stat stat="68%" text="Increase in organic traffic when search is built as a compounding system vs. quarterly tactics." />
        <Stat stat="3.5x" text="Better traffic quality when authority is earned through value rather than assumed." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Search that transformed visibility"
        subheadline={
          <p>
            See how search systems built for compounding have helped brands build long-term demand assets.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our search efforts felt like a constant battle. We'd see spikes and drops, but never 
              consistent growth. The search system they built treats search as a long-term asset, and now we're seeing steady, 
              compounding growth. The traffic is better quality, and it converts at a much higher rate.
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
          name="Patricia Lee"
          byline="Head of SEO at ContentCo"
        />
        <Testimonial
          quote={
            <p>
              The intent-driven content approach they used transformed our search results. Instead of targeting keywords, we're 
              answering real questions that our ideal customers are asking. This has created much better traffic quality, and 
              our conversion rates have improved dramatically. Search finally feels like a long-term asset, not a constant 
              maintenance burden.
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
          name="Kevin Johnson"
          byline="VP of Marketing at TechFlow"
        />
        <Testimonial
          quote={
            <p>
              Magnet's approach to earning authority through value has been game-changing. We're not just trying to rank—we're 
              building credibility that compounds. This has resulted in better traffic, stronger brand recognition, and inbound 
              demand that grows more valuable every month. Search has become one of our most reliable growth channels.
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
          name="Maria Rodriguez"
          byline="Director of Growth at ScaleUp"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about search marketing">
        <Faq
          id="faq-1"
          question="What's the difference between search as a channel vs. search as a system?"
          answer="Search as a channel treats SEO as a series of tactics—keyword targeting, link building, content creation—without a cohesive strategy. Search as a system is designed around buyer intent, evaluation, and trust. It removes hidden limits with technical foundations, uses intent-driven content to answer real questions, earns authority rather than assuming it, and ensures everything works together. This systematic approach creates compounding growth instead of fluctuating results."
        />
        <Faq
          id="faq-2"
          question="How do you build intent-driven content?"
          answer="We start by understanding how buyers actually research and make decisions. Then we create content that matches their intent at each stage—awareness, consideration, decision. This means answering real questions, solving actual problems, and guiding buyers toward decisions. Intent-driven content isn't about targeting keywords—it's about matching what people are searching for with what they actually need."
        />
        <Faq
          id="faq-3"
          question="How long does it take to see results from search systems?"
          answer="You'll typically see improvements in traffic quality and engagement within the first 2-3 months as intent-driven content starts ranking. The real compounding effects—steady growth, better traffic quality, and inbound demand that grows more valuable—build over 6-12 months as authority is earned and the system matures. Search is a long-term asset, not a quick win."
        />
        <Faq
          id="faq-4"
          question="What's the difference between earning authority and assuming it?"
          answer="Assuming authority means trying to rank for competitive terms without building credibility. Earning authority means creating genuinely valuable content, building relationships through quality, and establishing trust through consistency. When you earn authority, you get better traffic quality and higher conversion rates because people trust you before they even visit your site."
        />
        <Faq
          id="faq-5"
          question="How do you measure search success beyond rankings?"
          answer="We measure success through multiple metrics: traffic quality, engagement rates, conversion rates, and ultimately, inbound demand that converts. Rankings are just a means to an end. The real measure is whether search is creating better traffic, stronger credibility, and inbound demand that grows more valuable every month."
        />
        <Faq
          id="faq-6"
          question="Can search systems work for competitive industries?"
          answer="Absolutely. In competitive industries, earning authority through value becomes even more important. Instead of trying to outrank competitors on generic terms, we focus on intent-driven content that answers specific questions and builds authority in niche areas. This approach often works better in competitive industries because you're building credibility rather than just trying to outrank."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build search that compounds?"
        subheadline={
          <p>
            Let's create search systems that compound, not fluctuate. Build a long-term demand asset that provides better 
            traffic, stronger credibility, and inbound demand that grows more valuable every month.
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
