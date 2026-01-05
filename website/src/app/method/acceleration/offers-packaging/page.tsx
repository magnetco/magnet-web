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
            <Link href="/method/acceleration">Acceleration</Link>
            <span>/</span>
            <span className="font-semibold">Offers & Packaging</span>
          </span>
        }
        headline="Offers that clarify decisions, not complicate them"
        subheadline={
          <p>
            Offers should clarify decisions, not complicate them. When prospects hesitate, ask for custom scopes, or circle 
            pricing without committing, it&apos;s rarely because they don&apos;t want the outcome. It&apos;s because the offer 
            is doing too much talking and not enough guiding. Too many services, too many options, too little signal about 
            what actually matters. The friction shows up as longer sales cycles and softer closes.
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
        eyebrow="How we design offers"
        headline="Offers that clarify decisions, not complicate them"
        subheadline={
          <p>
            Magnet designs offers as products, not bundles. Each offer has a clear job, a defined outcome, and a reason to 
            exist. Scope is intentional. Pricing is anchored to value. Packaging makes tradeoffs obvious so decisions feel 
            simpler, not riskier. When offers are structured this way, sales conversations shorten, confidence goes up, and 
            buying feels less like negotiation and more like progress.
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
              headline="Value-Anchored Pricing"
              subheadline={
                <p>
                  Pricing that&apos;s anchored to value, not cost. We design offers where pricing clearly reflects the outcome 
                  customers get, not just the services you provide. This value-anchored approach makes pricing feel fair and 
                  justified, reducing the friction that comes from price objections. When pricing is anchored to value, 
                  customers understand what they&apos;re paying for and why, making decisions feel simpler and less risky. 
                  The result is shorter sales cycles, higher close rates, and customers who feel confident in their purchase.
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
              headline="Clear Packaging & Tradeoffs"
              subheadline={
                <p>
                  Packaging that makes tradeoffs obvious. We design offers where each package has a clear job, a defined 
                  outcome, and a reason to exist. The differences between packages are obvious, making it easy for customers 
                  to choose the right one. This clarity eliminates the analysis paralysis that comes from too many similar 
                  options. When packaging makes tradeoffs obvious, decisions feel simpler because customers can clearly see 
                  what they&apos;re getting and what they&apos;re not, making it easy to choose the right offer for their needs.
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
        headline="Offers that convert faster and close higher"
        subheadline={
          <p>
            When offers are designed as products with clear value, intentional scope, and obvious tradeoffs, sales cycles 
            shorten and close rates improve. Our value-anchored pricing and clear packaging create offers that clarify decisions.
          </p>
        }
      >
        <Stat stat="3.6x" text="Higher close rates for value-anchored offers vs. cost-based pricing." />
        <Stat stat="52%" text="Reduction in sales cycle length when offers have clear packaging and tradeoffs." />
        <Stat stat="2.9x" text="Better customer confidence scores when pricing is anchored to value." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Offers that transformed sales"
        subheadline={
          <p>
            See how value-anchored offers and clear packaging have helped brands shorten sales cycles and improve close rates.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our offers felt like a bundle of services with no clear value proposition. The 
              value-anchored pricing they designed made it obvious what customers were paying for and why. Our close rates 
              have tripled, and sales cycles are half what they used to be.
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
          name="Jennifer Martinez"
          byline="VP of Sales at ScaleUp"
        />
        <Testimonial
          quote={
            <p>
              The clear packaging they created for us eliminated so much friction from our sales process. Instead of customers 
              asking for custom scopes, they can now clearly see which package fits their needs. This has made our sales 
              conversations much more efficient, and our team spends less time negotiating and more time closing.
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
          name="Ryan Kim"
          byline="Head of Revenue at GrowthLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s offer design transformed how we sell. The value-anchored pricing and clear tradeoffs mean customers 
              understand what they&apos;re buying, which eliminates price objections and hesitation. Buying now feels like 
              progress, not negotiation, and our customers are more confident in their decisions.
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
          name="Amanda Chen"
          byline="Director of Sales at ConvertCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about offers & packaging">
        <Faq
          id="faq-1"
          question="What's the difference between designing offers as products vs. bundles?"
          answer="Bundles are collections of services with no clear job or outcome. Products have a clear purpose, a defined outcome, and a reason to exist. When offers are designed as products, each one has intentional scope and value-anchored pricing. This makes it obvious what customers get and why, eliminating the confusion that comes from too many similar options. Products clarify decisions; bundles complicate them."
        />
        <Faq
          id="faq-2"
          question="How do you anchor pricing to value?"
          answer="We start by understanding the outcome customers get, not just the services we provide. Then we design pricing that clearly reflects that outcome. This means pricing communicates value upfront, making it obvious why an offer costs what it does. Value-anchored pricing reduces price objections because customers understand what they're paying for and why it's worth it."
        />
        <Faq
          id="faq-3"
          question="What makes packaging clear?"
          answer="Clear packaging makes tradeoffs obvious. Each package has a distinct purpose, and the differences between packages are clear. Customers can easily see what they get in each package and what they don't, making it simple to choose the right one. When tradeoffs are obvious, decisions feel simpler because customers aren't trying to figure out which package is right for them."
        />
        <Faq
          id="faq-4"
          question="How do clear offers shorten sales cycles?"
          answer="When offers are clear, customers don't need as much explanation or negotiation. They can quickly understand what they're buying, why it costs what it does, and which package fits their needs. This eliminates the back-and-forth that extends sales cycles. Clear offers also reduce objections because customers understand the value upfront, making it easier to close deals faster."
        />
        <Faq
          id="faq-5"
          question="Can you redesign existing offers?"
          answer="Absolutely. We often work with companies to redesign existing offers that are causing friction. This typically involves clarifying scope, anchoring pricing to value, and making tradeoffs obvious. The result is offers that convert faster and close higher, even with the same underlying services."
        />
        <Faq
          id="faq-6"
          question="How do offers integrate with other acceleration components?"
          answer="Offers are the foundation that makes other acceleration components more effective. Clear offers make landing experiences more effective because they're promoting something customers can understand. They make sales enablement easier because sales teams have clear value propositions. And they make attribution clearer because conversion events are more defined. Good offers accelerate everything else."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to design offers that convert?"
        subheadline={
          <p>
            Let&apos;s create offers that clarify decisions, not complicate them. Design value-anchored offers with clear 
            packaging that shorten sales cycles and improve close rates.
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
