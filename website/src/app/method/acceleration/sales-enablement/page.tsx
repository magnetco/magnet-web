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
            <span className="font-semibold">Sales Enablement</span>
          </span>
        }
        headline="Sales enablement that accelerates revenue"
        subheadline={
          <p>
            Sales enablement should give your team everything they need to close deals faster, not just training materials. Most 
            enablement feels disconnected because tools are buried in folders and messaging feels like scripts. When sales enablement 
            provides contextual tools and frameworks at the right moment, it removes friction from the sales process and makes it 
            easier for prospects to say yes.
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
        eyebrow="How we enable sales teams"
        headline="Sales enablement systems that accelerate revenue"
        subheadline={
          <p>
            We build sales enablement systems that go beyond training—they&apos;re comprehensive frameworks that provide the 
            right tools, the right messaging, and the right processes at the right time. Every element is designed to remove 
            friction from the sales process and make it easier for prospects to say yes.
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
              headline="Contextual Tools & Resources"
              subheadline={
                <p>
                  Tools and resources that appear when sales teams need them, not buried in a folder. We build sales enablement 
                  systems that understand context—where a prospect is in their journey, what objections they&apos;re facing, what 
                  questions they&apos;re asking—and surface the right tools at the right time. This contextual approach means sales 
                  teams don&apos;t waste time searching for resources—they get exactly what they need when they need it. When tools 
                  are contextual, sales conversations become more effective because teams have the right support at every moment.
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
              headline="Messaging Frameworks & Playbooks"
              subheadline={
                <p>
                  Messaging frameworks that guide sales conversations, not scripts that constrain them. We create playbooks that 
                  provide structure and guidance while allowing sales teams to adapt to each prospect&apos;s unique situation. These 
                  frameworks ensure consistency in messaging while maintaining the flexibility to personalize. When messaging frameworks 
                  are done right, sales teams can confidently handle objections, answer questions, and guide prospects toward decisions 
                  because they have clear guidance on what to say and when to say it.
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
        headline="Sales enablement that accelerates revenue"
        subheadline={
          <p>
            When sales enablement systems provide contextual tools and clear messaging frameworks, sales cycles shorten and close 
            rates improve. Our comprehensive approach creates systems that make selling easier and more effective.
          </p>
        }
      >
        <Stat stat="3.8x" text="Higher close rates when sales teams have contextual tools vs. searching for resources." />
        <Stat stat="48%" text="Reduction in sales cycle length when messaging frameworks guide conversations." />
        <Stat stat="2.7x" text="Better sales team confidence scores when enablement systems provide support at the right time." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Sales enablement that transformed performance"
        subheadline={
          <p>
            See how comprehensive sales enablement systems have helped sales teams close more deals faster.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our sales team was constantly searching for resources and struggling with messaging. 
              The contextual tools they built surface exactly what we need when we need it, and the messaging frameworks give 
              us confidence in every conversation. Our close rates have nearly quadrupled.
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
          name="Robert Martinez"
          byline="VP of Sales at RevenueCo"
        />
        <Testimonial
          quote={
            <p>
              The messaging frameworks Magnet created for us transformed how our sales team communicates. Instead of winging it, 
              we have clear guidance on what to say and when. This has made our conversations much more effective, and prospects 
              tell us we&apos;re the most prepared sales team they&apos;ve worked with.
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
          name="Lisa Anderson"
          byline="Head of Sales at CloseFast"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s sales enablement system eliminated so much friction from our sales process. The contextual tools mean 
              we don&apos;t waste time searching for resources, and the messaging frameworks mean we can confidently handle any 
              objection. Our sales cycles are half what they used to be, and our team is closing more deals than ever.
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
          name="Thomas Wilson"
          byline="Director of Sales at AccelerateCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about sales enablement">
        <Faq
          id="faq-1"
          question="What's included in a sales enablement system?"
          answer="A comprehensive sales enablement system includes contextual tools and resources that appear when needed, messaging frameworks and playbooks that guide conversations, training materials that build skills, CRM integration that provides context, and analytics that track what's working. It's a complete system that supports sales teams at every stage of the sales process."
        />
        <Faq
          id="faq-2"
          question="How do contextual tools work?"
          answer="Contextual tools understand where a prospect is in their journey, what objections they're facing, and what questions they're asking. Based on this context, the system surfaces the right resources—case studies, pricing guides, objection handlers—at exactly the right moment. This means sales teams don't waste time searching for resources—they get exactly what they need when they need it."
        />
        <Faq
          id="faq-3"
          question="What's the difference between messaging frameworks and scripts?"
          answer="Scripts tell sales teams exactly what to say, which can make conversations feel robotic. Messaging frameworks provide structure and guidance while allowing sales teams to adapt to each prospect's unique situation. Frameworks ensure consistency in messaging while maintaining the flexibility to personalize, making conversations more natural and effective."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from sales enablement?"
          answer="You'll typically see improvements in sales team confidence and efficiency within the first month as tools and frameworks are implemented. The real impact—shorter sales cycles, higher close rates, and better sales performance—builds over 2-3 months as teams adapt to the new systems and processes."
        />
        <Faq
          id="faq-5"
          question="Can sales enablement work for different sales models?"
          answer="Absolutely. Sales enablement systems can be adapted for inside sales, field sales, account-based sales, and more. The key is understanding how each sales model works and building enablement systems that support those specific processes. We customize enablement to fit your sales model, not the other way around."
        />
        <Faq
          id="faq-6"
          question="How do you measure sales enablement success?"
          answer="We measure success through multiple metrics: sales cycle length, close rates, sales team confidence scores, time spent searching for resources, and ultimately, revenue growth. But the real measure is whether sales teams can close more deals faster with less friction. We track both quantitative metrics and qualitative feedback to continuously improve enablement systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to enable your sales team?"
        subheadline={
          <p>
            Let&apos;s create sales enablement systems that close more deals faster. Build comprehensive frameworks that provide 
            the right tools, messaging, and processes at the right time.
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
