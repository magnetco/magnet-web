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
            <Link href="/method/retention">Retention</Link>
            <span>/</span>
            <span className="font-semibold">Feedback Loops & Optimization</span>
          </span>
        }
        headline="Feedback loops that drive continuous improvement"
        subheadline={
          <p>
            Feedback loops should drive continuous improvement, not just collect opinions. Most feedback feels disconnected because 
            it&apos;s captured on arbitrary schedules instead of when customers are engaged. When feedback systems capture input at 
            the right moments, analyze patterns to identify opportunities, and implement improvements systematically, they make 
            retention efforts more effective over time and compound into better outcomes.
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
        eyebrow="How we build feedback loops"
        headline="Optimization systems that continuously improve"
        subheadline={
          <p>
            We build feedback loops & optimization systems that go beyond surveys—they&apos;re comprehensive frameworks that 
            capture feedback at the right moments, analyze patterns, and implement improvements that drive better outcomes. Every 
            loop is designed to make your retention efforts more effective over time.
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
              headline="Timely Feedback Capture"
              subheadline={
                <p>
                  Feedback captured at the right moments, not on arbitrary schedules. We build feedback loops that recognize when 
                  customers are most likely to provide valuable feedback—after key interactions, at milestone moments, when they 
                  experience value. This timely approach means feedback is more relevant and actionable because it&apos;s captured 
                  when customers are engaged and have context. When feedback is timely, it provides insights that actually drive 
                  improvements, making optimization more effective.
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
              headline="Pattern Analysis & Implementation"
              subheadline={
                <p>
                  Feedback analysis that identifies patterns and drives implementation. We build optimization systems that don&apos;t 
                  just collect feedback—they analyze patterns, identify opportunities, and implement improvements systematically. 
                  This pattern-based approach means optimization becomes proactive rather than reactive, addressing issues before 
                  they become problems. When analysis drives implementation, feedback loops create continuous improvement that makes 
                  retention efforts more effective over time.
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
        headline="Feedback loops that drive continuous improvement"
        subheadline={
          <p>
            When feedback loops & optimization systems capture feedback at the right moments and implement improvements systematically, 
            retention efforts become more effective over time. Our comprehensive approach creates continuous improvement that compounds.
          </p>
        }
      >
        <Stat stat="3.8x" text="Better retention rates when feedback loops drive continuous improvement vs. static retention efforts." />
        <Stat stat="64%" text="Increase in optimization effectiveness when feedback is captured at the right moments." />
        <Stat stat="2.7x" text="Faster improvement cycles when pattern analysis drives systematic implementation." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Feedback loops that transformed retention"
        subheadline={
          <p>
            See how comprehensive feedback loops & optimization systems have helped brands continuously improve and drive better retention.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, we collected feedback but didn&apos;t know what to do with it. The feedback loop system 
              they built captures feedback at the right moments and analyzes patterns to identify opportunities. Now we&apos;re 
              implementing improvements systematically, and our retention rates have improved dramatically.
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
          byline="Head of Customer Experience at ImproveCo"
        />
        <Testimonial
          quote={
            <p>
              The timely feedback capture system Magnet created for us has been incredible. Instead of sending surveys on arbitrary 
              schedules, we capture feedback when customers are engaged and have context. This has made our feedback much more 
              relevant and actionable, and we&apos;re implementing improvements faster than ever.
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
          name="Michael Chen"
          byline="VP of Product at OptimizeLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s feedback loops & optimization system transformed how we improve. The pattern analysis identifies 
              opportunities we wouldn&apos;t have seen, and the systematic implementation means we&apos;re continuously getting better. 
              Our retention efforts are more effective than ever, and customers are noticing the improvements.
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
          name="Lisa Anderson"
          byline="Director of Retention at FeedbackCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about feedback loops & optimization">
        <Faq
          id="faq-1"
          question="What's the difference between feedback loops and just collecting feedback?"
          answer="Collecting feedback is one-way—you ask, customers answer. Feedback loops are two-way systems that capture feedback, analyze patterns, implement improvements, and close the loop by showing customers their feedback led to changes. When feedback loops are done right, they create continuous improvement that makes retention efforts more effective over time."
        />
        <Faq
          id="faq-2"
          question="When are the right moments to capture feedback?"
          answer="The right moments depend on your business, but typically include: after key interactions (purchases, support interactions, feature usage), at milestone moments (onboarding completion, first value realization), and when customers experience value. The key is capturing feedback when customers are engaged and have context, not on arbitrary schedules."
        />
        <Faq
          id="faq-3"
          question="How do you analyze feedback patterns?"
          answer="We analyze feedback using a combination of quantitative analysis (sentiment analysis, topic modeling, trend identification) and qualitative analysis (thematic coding, pattern recognition, opportunity identification). The goal is identifying patterns that indicate opportunities for improvement, not just summarizing what customers said."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from feedback loops?"
          answer="You'll typically see improvements in feedback quality and relevance within the first month as timely capture is implemented. The real impact—systematic improvements, better retention, and continuous optimization—builds over 2-3 months as feedback loops mature and improvements compound."
        />
        <Faq
          id="faq-5"
          question="Can feedback loops work for different types of businesses?"
          answer="Absolutely. Feedback loops can be adapted for SaaS products, services, physical products, and more. The key is understanding what feedback matters for your business and building systems that capture it at the right moments. We customize feedback loops to fit your business model and customer journey."
        />
        <Faq
          id="faq-6"
          question="How do you measure feedback loop effectiveness?"
          answer="We measure success through multiple metrics: feedback response rates, feedback quality scores, improvement implementation rates, and ultimately, retention and customer satisfaction. But the real measure is whether feedback loops create continuous improvement that makes retention efforts more effective over time. We track both quantitative metrics and qualitative outcomes to continuously improve feedback systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build feedback loops that drive improvement?"
        subheadline={
          <p>
            Let&apos;s create feedback loops & optimization systems that continuously improve. Build comprehensive frameworks that 
            capture feedback at the right moments and implement improvements systematically.
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
