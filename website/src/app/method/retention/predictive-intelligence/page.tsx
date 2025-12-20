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
            <span className="font-semibold">Predictive Intelligence</span>
          </span>
        }
        headline="Predictive intelligence that drives proactive retention"
        subheadline={
          <p>
            Predictive intelligence should identify what customers need before they ask, not just analyze what happened. Most 
            analytics feel reactive because they report on past behavior instead of predicting future needs. When predictive systems 
            identify patterns, predict behavior, and enable proactive interventions, they make retention efforts more effective by 
            addressing needs before they become problems.
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
        eyebrow="How we build predictive intelligence"
        headline="Intelligence systems that predict needs"
        subheadline={
          <p>
            We build predictive intelligence systems that go beyond basic analytics—they&apos;re comprehensive frameworks that identify 
            patterns, predict behavior, and enable proactive interventions that improve outcomes. Every prediction is designed to make 
            your retention efforts more proactive and more effective.
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
              headline="Pattern Recognition & Prediction"
              subheadline={
                <p>
                  Systems that recognize patterns and predict behavior before it happens. We build predictive intelligence that 
                  analyzes customer data, identifies patterns, and predicts what customers need next. This pattern-based approach 
                  means you can be proactive rather than reactive, addressing needs before they become problems. When predictions are 
                  accurate, retention efforts become more effective because you&apos;re helping customers before they need to ask.
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
              headline="Proactive Intervention Systems"
              subheadline={
                <p>
                  Interventions that happen before problems arise, not after. We build predictive intelligence systems that don&apos;t 
                  just predict—they enable proactive interventions that improve outcomes. This means identifying at-risk customers 
                  before they churn, recognizing upsell opportunities before customers ask, and providing support before problems 
                  become issues. When interventions are proactive, retention efforts become more effective because you&apos;re addressing 
                  needs before they become problems.
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
        headline="Predictive intelligence that drives proactive retention"
        subheadline={
          <p>
            When predictive intelligence systems recognize patterns and enable proactive interventions, retention efforts become more 
            effective. Our comprehensive approach creates systems that predict needs and improve outcomes.
          </p>
        }
      >
        <Stat stat="4.2x" text="Better retention rates when predictive intelligence enables proactive interventions vs. reactive retention." />
        <Stat stat="68%" text="Reduction in churn when at-risk customers are identified and supported before they leave." />
        <Stat stat="3.1x" text="Higher customer lifetime value when predictive intelligence identifies upsell opportunities proactively." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Predictive intelligence that transformed retention"
        subheadline={
          <p>
            See how comprehensive predictive intelligence systems have helped brands become more proactive and improve retention.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, we were always reacting to customer issues. The predictive intelligence system they built 
              identifies patterns and predicts what customers need before they ask. Now we&apos;re proactively addressing needs, and 
              our retention rates have improved dramatically.
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
          name="David Park"
          byline="Head of Analytics at PredictCo"
        />
        <Testimonial
          quote={
            <p>
              The proactive intervention system Magnet created for us has been incredible. Instead of waiting for customers to have 
              problems, we&apos;re identifying at-risk customers and supporting them before they churn. This has reduced our churn 
              significantly, and customers appreciate the proactive support.
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
          name="Rachel Kim"
          byline="VP of Customer Success at IntelligenceLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s predictive intelligence transformed how we approach retention. The pattern recognition identifies opportunities 
              we wouldn&apos;t have seen, and the proactive interventions mean we&apos;re helping customers before they need to ask. 
              Our retention efforts are more effective than ever, and customers are seeing value faster.
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
          name="Thomas Chen"
          byline="Director of Retention at SmartCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about predictive intelligence">
        <Faq
          id="faq-1"
          question="What's the difference between predictive intelligence and basic analytics?"
          answer="Basic analytics tell you what happened. Predictive intelligence tells you what will happen. Analytics are reactive—they analyze past behavior. Predictive intelligence is proactive—it identifies patterns and predicts future behavior, enabling interventions before problems arise. When predictive intelligence is done right, it makes retention efforts more effective because you're addressing needs before they become problems."
        />
        <Faq
          id="faq-2"
          question="What types of patterns can predictive intelligence identify?"
          answer="Predictive intelligence can identify a wide range of patterns: churn risk indicators, upsell opportunities, feature adoption patterns, engagement trends, support needs, and more. The key is identifying patterns that indicate what customers need next, then enabling proactive interventions that improve outcomes."
        />
        <Faq
          id="faq-3"
          question="How accurate are predictive intelligence predictions?"
          answer="Prediction accuracy depends on data quality, pattern complexity, and model sophistication. We build predictive intelligence systems that continuously learn and improve, starting with high-confidence predictions and expanding as the system matures. The goal isn't perfect predictions—it's predictions accurate enough to enable proactive interventions that improve outcomes."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from predictive intelligence?"
          answer="You'll typically see initial predictions within the first month as pattern recognition systems are implemented. The real impact—proactive interventions, better retention, and improved outcomes—builds over 2-3 months as the system learns patterns and predictions become more accurate."
        />
        <Faq
          id="faq-5"
          question="Can predictive intelligence work with limited data?"
          answer="Yes, but prediction accuracy improves with more data. We can build predictive intelligence systems that work with limited data by starting with high-confidence patterns and expanding as more data becomes available. The key is building systems that learn and improve over time, not requiring perfect data from day one."
        />
        <Faq
          id="faq-6"
          question="How do you measure predictive intelligence effectiveness?"
          answer="We measure success through multiple metrics: prediction accuracy, intervention success rates, churn reduction, upsell conversion rates, and ultimately, retention and customer lifetime value. But the real measure is whether predictive intelligence enables proactive interventions that improve outcomes. We track both quantitative metrics and qualitative outcomes to continuously improve predictive systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to predict what customers need?"
        subheadline={
          <p>
            Let&apos;s create predictive intelligence systems that drive proactive retention. Build comprehensive frameworks that 
            identify patterns, predict behavior, and enable interventions that improve outcomes.
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
