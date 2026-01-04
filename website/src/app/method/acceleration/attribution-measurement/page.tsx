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
            <span className="font-semibold">Attribution & Measurement</span>
          </span>
        }
        headline="Attribution that drives better decisions"
        subheadline={
          <p>
            Attribution should provide clarity into what&apos;s working, not just track what happened. Most attribution feels confusing 
            because it focuses on last-click instead of understanding how channels work together. When attribution systems connect 
            the dots between channels, touchpoints, and outcomes, they provide actionable insights that make every investment more 
            effective and optimization more systematic.
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
        eyebrow="How we build attribution systems"
        headline="Measurement systems that drive optimization"
        subheadline={
          <p>
            We build attribution & measurement systems that go beyond basic tracking—they&apos;re comprehensive frameworks that 
            connect the dots between channels, touchpoints, and outcomes. Every metric serves a purpose, every insight leads to 
            action, and every measurement makes optimization more effective.
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
              headline="Multi-Touch Attribution"
              subheadline={
                <p>
                  Attribution that understands the full customer journey, not just the last click. We build multi-touch attribution 
                  systems that recognize how channels work together to drive conversions. This comprehensive approach means you 
                  understand which channels create awareness, which drive consideration, and which close deals. When attribution 
                  is multi-touch, you can optimize the entire funnel, not just the last touchpoint, making every investment more 
                  effective.
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
              headline="Actionable Insights & Reporting"
              subheadline={
                <p>
                  Reporting that provides actionable insights, not just numbers. We build measurement systems that answer &quot;so what?&quot; 
                  not just &quot;what happened?&quot; This means clear dashboards that highlight opportunities, automated reports that 
                  surface insights, and analysis that guides optimization decisions. When insights are actionable, every metric becomes 
                  an opportunity to improve, and optimization becomes systematic rather than reactive. The result is measurement that 
                  actually drives better decisions and better results.
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
        headline="Attribution that drives better decisions"
        subheadline={
          <p>
            When attribution & measurement systems provide multi-touch attribution and actionable insights, optimization becomes 
            more effective and investments perform better. Our comprehensive approach creates clarity that enables better decisions.
          </p>
        }
      >
        <Stat stat="4.1x" text="Better ROI on marketing investments when multi-touch attribution guides optimization." />
        <Stat stat="72%" text="Increase in optimization effectiveness when insights are actionable vs. just descriptive." />
        <Stat stat="3.0x" text="Faster decision-making when measurement systems provide clear, actionable insights." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Attribution that transformed optimization"
        subheadline={
          <p>
            See how comprehensive attribution & measurement systems have helped brands make better decisions and optimize more effectively.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, we had no idea which channels were actually driving results. The multi-touch attribution 
              they built showed us how channels work together, and now we can optimize the entire funnel, not just the last touchpoint. 
              Our marketing ROI has improved dramatically.
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
          name="Kevin Martinez"
          byline="Head of Marketing at MeasureCo"
        />
        <Testimonial
          quote={
            <p>
              The actionable insights system Magnet built for us has been incredible. Instead of drowning in data, we get clear 
              reports that highlight opportunities. Every metric now has context and meaning, and we can actually act on what we 
              see. This has made our optimization efforts much more effective.
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
          name="Nicole Chen"
          byline="VP of Growth at OptimizeLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s attribution & measurement setup gave us the clarity we needed to make better decisions. The multi-touch 
              attribution shows us how channels work together, and the actionable insights mean we can optimize systematically. 
              Our marketing investments are performing much better now.
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
          name="Michael Park"
          byline="Director of Analytics at DataFlow"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about attribution & measurement">
        <Faq
          id="faq-1"
          question="What's the difference between multi-touch and last-click attribution?"
          answer="Last-click attribution gives all credit to the final touchpoint before conversion. Multi-touch attribution recognizes how channels work together throughout the customer journey. It understands which channels create awareness, which drive consideration, and which close deals. This comprehensive approach means you can optimize the entire funnel, not just the last touchpoint, making every investment more effective."
        />
        <Faq
          id="faq-2"
          question="How do you make insights actionable?"
          answer="We build reporting systems that answer 'so what?' not just 'what happened?' This means clear dashboards that highlight opportunities, automated reports that surface insights, and analysis that guides optimization decisions. When insights are actionable, every metric becomes an opportunity to improve, and optimization becomes systematic rather than reactive."
        />
        <Faq
          id="faq-3"
          question="What metrics should we be tracking?"
          answer="The metrics you track depend on your business goals, but typically include acquisition metrics (traffic, leads, cost per acquisition), engagement metrics (time on site, pages per visit, bounce rate), conversion metrics (conversion rate, revenue, customer lifetime value), and retention metrics (churn rate, repeat purchase rate). We help you identify the metrics that matter most for your business and build systems to track them effectively."
        />
        <Faq
          id="faq-4"
          question="How long does it take to set up attribution & measurement systems?"
          answer="The timeline depends on the scope and complexity, but typically takes 4-8 weeks for a comprehensive attribution & measurement system. This includes data integration, tracking implementation, dashboard creation, and reporting setup. For larger or more complex systems, the timeline may be longer to ensure accuracy and thoroughness."
        />
        <Faq
          id="faq-5"
          question="Can you integrate with our existing analytics tools?"
          answer="Yes. We work with all major analytics platforms and can integrate attribution & measurement into your existing setup. Whether you're using Google Analytics, Adobe Analytics, Mixpanel, or another platform, we can build comprehensive attribution systems that work with your current infrastructure."
        />
        <Faq
          id="faq-6"
          question="How do attribution & measurement integrate with other acceleration components?"
          answer="Attribution & measurement is the foundation that makes all other acceleration components more effective. It provides clarity into what's working, enables optimization, and ensures every investment is measurable. When measurement systems are in place, you can make better decisions about where to invest, how to optimize, and what to scale."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to measure what matters?"
        subheadline={
          <p>
            Let&apos;s create attribution & measurement systems that drive optimization. Build comprehensive frameworks that 
            connect the dots between channels, touchpoints, and outcomes.
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
