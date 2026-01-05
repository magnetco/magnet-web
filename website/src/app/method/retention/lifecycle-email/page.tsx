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
            <span className="font-semibold">Lifecycle Email</span>
          </span>
        }
        headline="Lifecycle email that feels timely, not automated"
        subheadline={
          <p>
            Lifecycle email should feel timely, not automated. The messages after a sale matter—they can turn customers 
            into advocates or drive them away. Most lifecycle email feels generic, poorly timed, or worse—it feels automated. 
            That&apos;s because it&apos;s often built around calendars instead of customer behavior. When lifecycle email is built 
            around how customers actually behave, it stops feeling automated and starts feeling timely.
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
        eyebrow="How we build lifecycle email"
        headline="Email systems that feel personal, not programmed"
        subheadline={
          <p>
            We build lifecycle email around customer behavior, not calendars. Our systems use behavioral triggers to send 
            the right message at the right time, personalize based on what customers actually do, and create experiences 
            that feel timely and relevant, not automated and generic.
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
              headline="Behavioral Triggers"
              subheadline={
                <p>
                  Instead of sending emails on a schedule, we build systems that respond to what customers actually do. 
                  When someone completes an action, reaches a milestone, or shows signs of engagement, our lifecycle email 
                  systems trigger the right message at the right moment. This behavioral approach means every email feels 
                  timely and relevant because it&apos;s based on actual customer behavior, not arbitrary calendar dates. The result 
                  is higher engagement, better open rates, and emails that customers actually want to read.
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
              headline="Personalization at Scale"
              subheadline={
                <p>
                  Personalization isn&apos;t just about using someone&apos;s first name—it&apos;s about understanding their journey, their 
                  needs, and their context. We build lifecycle email systems that personalize based on what customers actually 
                  do: which features they use, what content they engage with, where they are in their journey, and what they 
                  need next. This level of personalization creates experiences that feel like they were written specifically 
                  for each customer, even when sent at scale. The result isn&apos;t just more opens—it&apos;s better engagement, stronger 
                  relationships, and lifecycle email that actually helps customers succeed.
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
        headline="Lifecycle email that drives engagement and retention"
        subheadline={
          <p>
            When lifecycle email is built around customer behavior instead of calendars, the results speak for themselves. 
            Our behavioral trigger systems and personalization at scale create emails that customers actually want to read, 
            leading to higher engagement, better retention, and stronger customer relationships.
          </p>
        }
      >
        <Stat stat="4.2x" text="Higher open rates for behaviorally-triggered emails vs. scheduled sequences." />
        <Stat stat="67%" text="Increase in customer engagement when emails are personalized based on actual behavior." />
        <Stat stat="3.5x" text="Better retention rates for customers who receive timely, relevant lifecycle emails." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Lifecycle email that transformed customer relationships"
        subheadline={
          <p>
            See how behavior-driven lifecycle email has helped brands build stronger relationships and improve retention.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our lifecycle emails felt robotic and generic. Now, every email feels like it was 
              sent at exactly the right moment. Our open rates have quadrupled, and customers actually tell us they appreciate 
              our emails. That&apos;s never happened before.
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
          name="Jennifer Park"
          byline="Head of Customer Success at CloudScale"
        />
        <Testimonial
          quote={
            <p>
              The behavioral triggers they set up for us have been game-changing. Instead of sending emails on a schedule, 
              we&apos;re responding to what customers actually do. The result is emails that feel personal and timely, not automated. 
              Our customer satisfaction scores have never been higher.
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
          name="David Kim"
          byline="VP of Marketing at DataFlow"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s lifecycle email system transformed how we communicate with customers. The personalization based on actual
              behavior means every email feels relevant. We&apos;ve seen a massive improvement in engagement, and more importantly,
              our customers are actually succeeding with our product because the emails guide them at the right moments.
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
          name="Rachel Thompson"
          byline="Director of Growth at InnovateNow"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about lifecycle email">
        <Faq
          id="faq-1"
          question="What&apos;s the difference between behavior-driven and calendar-based lifecycle email?"
          answer="Calendar-based lifecycle email sends messages on a schedule—day 1, day 7, day 30, etc. Behavior-driven email responds to what customers actually do. When someone completes an action, reaches a milestone, or shows engagement, the system triggers the right message at the right moment. This approach creates emails that feel timely and relevant because they're based on actual customer behavior, not arbitrary dates."
        />
        <Faq
          id="faq-2"
          question="How do you personalize lifecycle email at scale?"
          answer="We personalize based on what customers actually do: which features they use, what content they engage with, where they are in their journey, and what they need next. This isn&apos;t just using someone&apos;s first name—it&apos;s understanding their context and sending the right message at the right time. Our systems track customer behavior and trigger personalized emails automatically, so you get personalization at scale without manual work."
        />
        <Faq
          id="faq-3"
          question="What kind of behavioral triggers do you use?"
          answer="We use a wide range of behavioral triggers: feature usage, content engagement, milestone achievements, inactivity periods, support interactions, and more. The key is identifying the behaviors that indicate what a customer needs next, then triggering the right message at the right moment. Every trigger is designed to guide customers toward success, not just send another email."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from behavior-driven lifecycle email?"
          answer="You&apos;ll typically see improvements in open rates and engagement within the first month as behavioral triggers start firing. The real impact—better retention, stronger relationships, and customers who actually succeed with your product—builds over 2-3 months as the system learns customer behavior patterns and sends increasingly relevant messages."
        />
        <Faq
          id="faq-5"
          question="Can you integrate with our existing email platform?"
          answer="Yes. We work with all major email platforms and can integrate behavioral triggers and personalization into your existing setup. Whether you're using Mailchimp, HubSpot, SendGrid, or another platform, we can build behavior-driven lifecycle email systems that work with your current infrastructure."
        />
        <Faq
          id="faq-6"
          question="How do you measure the success of lifecycle email?"
          answer="We measure success through multiple metrics: open rates, click-through rates, engagement scores, and ultimately, customer retention and lifetime value. But the real measure is whether emails feel timely and relevant to customers, and whether they actually help customers succeed. We track how behavior-driven emails perform compared to scheduled sequences, and continuously optimize based on what works."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build lifecycle email that converts?"
        subheadline={
          <p>
            Let&apos;s create lifecycle email systems that feel timely, not automated. Transform your email communication from 
            scheduled sequences into behavior-driven systems that guide customers toward success.
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
