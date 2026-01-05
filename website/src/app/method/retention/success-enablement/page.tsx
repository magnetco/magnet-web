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
            <Link href="/method/retention">Retention</Link>
            <span>/</span>
            <span className="font-semibold">Success Enablement</span>
          </span>
        }
        headline="Success enablement that drives retention"
        subheadline={
          <p>
            Success enablement should help customers achieve their desired outcomes, not just solve immediate problems. Most 
            enablement feels reactive because it waits for customers to ask instead of providing guidance when they need it. 
            When success enablement is proactive—surfacing resources at the right moment and focusing on outcomes rather than 
            issues—it becomes a powerful retention tool that increases lifetime value and creates advocates.
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
        eyebrow="How we enable customer success"
        headline="Success enablement systems that drive retention"
        subheadline={
          <p>
            We build success enablement systems that go beyond support—they&apos;re comprehensive frameworks that provide the 
            right resources, the right guidance, and the right support at the right time. Every element is designed to help 
            customers achieve their desired outcomes and create advocates for your brand.
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
              headline="Proactive Guidance & Resources"
              subheadline={
                <p>
                  Resources and guidance that appear when customers need them, not when they ask. We build success enablement 
                  systems that understand where customers are in their journey and surface the right resources at the right 
                  time. This proactive approach means customers don&apos;t have to search for help—they get exactly what they 
                  need when they need it. When guidance is proactive, customers succeed faster because they have the right 
                  support at every moment, creating satisfaction that builds loyalty and advocacy.
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
              headline="Outcome-Focused Support"
              subheadline={
                <p>
                  Support that focuses on outcomes, not just answers. We build success enablement systems that help customers 
                  achieve their desired outcomes, not just solve immediate problems. This outcome-focused approach means support 
                  guides customers toward success, not just fixes issues. When support is outcome-focused, customers see value 
                  faster, which increases satisfaction, builds loyalty, and creates advocates who drive organic growth.
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
        headline="Success enablement that drives retention"
        subheadline={
          <p>
            When success enablement systems provide proactive guidance and outcome-focused support, customer satisfaction increases 
            and retention improves. Our comprehensive approach creates systems that help customers succeed and grow.
          </p>
        }
      >
        <Stat stat="4.0x" text="Higher customer satisfaction scores when success enablement is proactive vs. reactive." />
        <Stat stat="65%" text="Increase in customer retention when support focuses on outcomes vs. just solving problems." />
        <Stat stat="3.2x" text="Better customer lifetime value when success enablement helps customers achieve their goals." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Success enablement that transformed retention"
        subheadline={
          <p>
            See how comprehensive success enablement systems have helped brands increase customer satisfaction and improve retention.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our customer success felt reactive—we&apos;d help when customers asked. The proactive 
              guidance system they built surfaces resources exactly when customers need them, and the outcome-focused support 
              means we&apos;re helping customers achieve their goals, not just solve problems. Our customer satisfaction scores 
              have quadrupled.
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
          name="Sarah Williams"
          byline="Head of Customer Success at SuccessCo"
        />
        <Testimonial
          quote={
            <p>
              The success enablement system Magnet created for us transformed how we support customers. Instead of waiting for 
              customers to ask for help, we&apos;re proactively guiding them toward success. This has made our customers much 
              more successful with our product, and they&apos;re becoming advocates who refer others. Our retention rates have 
              never been higher.
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
          name="James Rodriguez"
          byline="VP of Customer Experience at EnableCo"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s outcome-focused support approach changed everything. Instead of just solving problems, we&apos;re helping 
              customers achieve their desired outcomes. This has increased customer satisfaction dramatically, and our customers 
              are seeing value faster. The result is better retention and customers who actually advocate for our brand.
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
          name="Emily Chen"
          byline="Director of Customer Success at GrowthLab"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about success enablement">
        <Faq
          id="faq-1"
          question="What's the difference between success enablement and customer support?"
          answer="Customer support is reactive—it helps when customers ask. Success enablement is proactive—it provides resources and guidance before customers need to ask. Support solves problems; success enablement helps customers achieve outcomes. When success enablement is done right, customers succeed faster, which increases satisfaction, builds loyalty, and creates advocates."
        />
        <Faq
          id="faq-2"
          question="How do you make guidance proactive?"
          answer="We build systems that understand where customers are in their journey and surface the right resources at the right time. This means resources appear when customers need them, not when they search for them. Proactive guidance recognizes milestones, identifies needs, and provides support before customers have to ask. This approach helps customers succeed faster and creates satisfaction that builds loyalty."
        />
        <Faq
          id="faq-3"
          question="What does outcome-focused support mean?"
          answer="Outcome-focused support helps customers achieve their desired outcomes, not just solve immediate problems. Instead of just answering questions, we guide customers toward success. This means understanding what customers are trying to achieve and providing support that moves them closer to those goals. When support is outcome-focused, customers see value faster, which increases satisfaction and retention."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from success enablement?"
          answer="You'll typically see improvements in customer satisfaction and engagement within the first month as proactive guidance and outcome-focused support are implemented. The real impact—better retention, higher lifetime value, and customers who become advocates—builds over 2-3 months as customers succeed with your product and see the value."
        />
        <Faq
          id="faq-5"
          question="Can success enablement work for different types of products?"
          answer="Absolutely. Success enablement can be adapted for SaaS products, services, physical products, and more. The key is understanding what success looks like for your customers and building systems that help them achieve those outcomes. We customize success enablement to fit your product and your customers' needs."
        />
        <Faq
          id="faq-6"
          question="How do you measure success enablement effectiveness?"
          answer="We measure success through multiple metrics: customer satisfaction scores, time to value, feature adoption rates, retention rates, and ultimately, customer lifetime value. But the real measure is whether customers are achieving their desired outcomes and becoming advocates. We track both quantitative metrics and qualitative feedback to continuously improve success enablement systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to enable customer success?"
        subheadline={
          <p>
            Let&apos;s create success enablement systems that drive retention and growth. Build comprehensive frameworks that 
            provide the right resources, guidance, and support at the right time.
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
