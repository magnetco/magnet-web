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
        headline="Paid Media"
        subheadline={
          <p>
            Paid media should scale confidence, not anxiety. Paid media drives results, but it often feels fragile. Performance 
            swings, creeping costs, and the constant need to intervene. The issue isn't platforms or spend—it's that paid 
            media is often run as isolated campaigns instead of a system for stability, learning, and scale. When paid media 
            is structured correctly, it becomes predictable and scalable.
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
        eyebrow="How we build paid media"
        headline="Paid media systems built for control, not constant intervention"
        subheadline={
          <p>
            Magnet builds paid media as a disciplined acquisition system, not just a collection of ads. Channel strategy 
            mapped to funnel roles, creative designed for testing and learning, clean tracking, and optimization following 
            signal, not instinct. The result is clearer insight, steadier performance, and paid media you can rely on as you grow.
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
              headline="Channel Strategy & Funnel Mapping"
              subheadline={
                <p>
                  Every channel has a role in your funnel. We map channel strategy to funnel roles, ensuring each platform 
                  serves a specific purpose in moving prospects from awareness to action. This strategic approach means you're 
                  not just running ads—you're building a system where each channel complements the others. When channels are 
                  mapped to funnel roles, you understand what's working, why, and how far you can push it. Scaling happens 
                  only when efficiency holds, and this mapping ensures efficiency at every stage.
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
              headline="Creative Testing & Learning Systems"
              subheadline={
                <p>
                  Creative that's designed for testing and learning, not just launching. We build systems that continuously 
                  test, learn, and optimize creative performance. This isn't about guessing what works—it's about building 
                  a learning system that gets smarter over time. Clean tracking ensures you understand what's working and why, 
                  and optimization follows signal, not instinct. When creative is built for learning, every campaign becomes 
                  an opportunity to improve, and performance becomes more predictable over time.
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
        headline="Paid media that scales with confidence"
        subheadline={
          <p>
            When paid media is built as a system instead of isolated campaigns, performance becomes predictable and scalable. 
            Our disciplined approach creates steadier performance, clearer insights, and paid media you can rely on as you grow.
          </p>
        }
      >
        <Stat stat="3.8x" text="Better ROAS for paid media systems vs. isolated campaigns." />
        <Stat stat="45%" text="Reduction in cost per acquisition when channels are mapped to funnel roles." />
        <Stat stat="2.6x" text="Faster scaling when paid media is built as a learning system." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Paid media that transformed performance"
        subheadline={
          <p>
            See how systematic paid media approaches have helped brands scale with confidence and predictability.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our paid media felt like a constant fire drill. Performance would swing wildly, 
              and we never knew if we could scale. The system they built gave us predictability. Now we understand what's 
              working, why, and how far we can push it. Scaling has become much more reliable.
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
          name="Thomas Martinez"
          byline="VP of Growth at ScaleUp"
        />
        <Testimonial
          quote={
            <p>
              The channel strategy mapping they did for us was a game-changer. We finally understand how each platform fits 
              into our funnel, and this clarity has made our paid media much more efficient. We're getting better results 
              with less spend, and scaling feels sustainable now.
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
          name="Amanda Chen"
          byline="Head of Marketing at GrowthLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet's creative testing system transformed how we approach paid media. Instead of guessing what works, we're 
              continuously learning and improving. This learning approach has made our performance much more predictable, and 
              we're scaling faster than we ever thought possible.
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
          name="Daniel Park"
          byline="Director of Acquisition at TechVenture"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about paid media">
        <Faq
          id="faq-1"
          question="What's the difference between paid media as a system vs. isolated campaigns?"
          answer="Isolated campaigns are one-off efforts that don't connect or learn from each other. A paid media system maps channels to funnel roles, builds creative for testing and learning, uses clean tracking, and optimizes based on signal. This systematic approach creates predictability, enables learning, and makes scaling sustainable. Instead of constant fire drills, you get steady performance you can rely on."
        />
        <Faq
          id="faq-2"
          question="How do you map channels to funnel roles?"
          answer="We analyze how each channel performs at different stages of the funnel—awareness, consideration, decision, and retention. Then we map each channel to its optimal role. For example, some channels excel at top-of-funnel awareness, while others are better at bottom-of-funnel conversion. This mapping ensures each channel serves a specific purpose and complements the others, creating a more efficient system overall."
        />
        <Faq
          id="faq-3"
          question="How do you ensure paid media performance is predictable?"
          answer="Predictability comes from building a learning system, not just running campaigns. We use clean tracking to understand what's working and why, build creative designed for testing, and optimize based on signal rather than instinct. When you understand the system, you can predict performance and scale with confidence. This systematic approach reduces swings and creates steadier results."
        />
        <Faq
          id="faq-4"
          question="What platforms do you work with?"
          answer="We work with all major paid media platforms including Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, TikTok, and more. The key isn't the platform—it's building a systematic approach that works across channels. We help you understand which platforms serve which roles in your funnel and how to optimize each for maximum efficiency."
        />
        <Faq
          id="faq-5"
          question="How long does it take to see results from systematic paid media?"
          answer="You'll typically see improvements in efficiency and predictability within the first month as the system takes shape. The real benefits—steadier performance, clearer insights, and scalable growth—build over 2-3 months as the learning system matures and you understand what works and why. This foundation enables sustainable scaling."
        />
        <Faq
          id="faq-6"
          question="How do you measure paid media success?"
          answer="We measure success through multiple metrics: ROAS, cost per acquisition, conversion rates, and ultimately, revenue growth. But the real measure is whether paid media feels predictable and scalable. When you understand what's working, why, and how far you can push it, paid media becomes a reliable growth engine instead of a constant source of anxiety."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build paid media that scales?"
        subheadline={
          <p>
            Let's create paid media systems that scale confidence, not anxiety. Build a disciplined acquisition system 
            that provides clearer insight, steadier performance, and paid media you can rely on as you grow.
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
