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
            <Link href="/method/foundation">Foundation</Link>
            <span>/</span>
            <span className="font-semibold">Data & Analytics Setup</span>
          </span>
        }
        headline="Data & analytics that provide clarity and insight"
        subheadline={
          <p>
            Data & analytics should connect the dots between channels, touchpoints, and outcomes, not just track what happened. 
            Most analytics feel disconnected because they focus on individual metrics instead of systems that provide clarity. When 
            data systems are built as comprehensive frameworks that understand how channels work together, they become the foundation 
            that makes every decision more informed and every optimization more effective.
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
        eyebrow="How we build data systems"
        headline="Analytics frameworks that provide clarity and insight"
        subheadline={
          <p>
            We build data systems that go beyond tracking—they're comprehensive frameworks that connect the dots between 
            channels, touchpoints, and outcomes. When data & analytics is done right, it becomes the foundation that makes 
            every other investment more measurable and more effective.
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
              headline="Unified Data Architecture"
              subheadline={
                <p>
                  Data scattered across platforms creates confusion, not clarity. We build unified data architectures that 
                  connect all your channels, touchpoints, and systems into a single source of truth. This unified approach 
                  means you can see the complete customer journey, understand how channels work together, and make decisions 
                  based on the full picture. When data is unified, you get clarity that enables better decisions and more 
                  effective optimization.
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
                  Data is only valuable if it leads to action. We build reporting systems that provide actionable insights, 
                  not just numbers. This means clear dashboards that highlight what matters, automated reports that surface 
                  opportunities, and analysis that answers "so what?" not just "what happened?" When insights are actionable, 
                  every data point becomes an opportunity to improve, and optimization becomes systematic rather than reactive.
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
        headline="Data systems that drive better decisions"
        subheadline={
          <p>
            When data & analytics systems are built correctly, they provide clarity that enables better decisions and more 
            effective optimization. Our unified data architectures and actionable insights create systems that make every 
            investment more measurable.
          </p>
        }
      >
        <Stat stat="4.3x" text="Faster decision-making when data is unified vs. scattered across platforms." />
        <Stat stat="73%" text="Increase in optimization effectiveness when insights are actionable vs. just descriptive." />
        <Stat stat="2.9x" text="Better ROI on marketing investments when data systems provide clear attribution." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Data systems that transformed decision-making"
        subheadline={
          <p>
            See how comprehensive data & analytics systems have helped brands make better decisions and optimize more effectively.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our data was scattered across multiple platforms, and we never had a clear picture 
              of what was working. The unified data architecture they built connected everything, and now we can see the complete 
              customer journey. This clarity has transformed how we make decisions and allocate budget.
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
          name="Michael Chang"
          byline="Head of Analytics at DataCo"
        />
        <Testimonial
          quote={
            <p>
              The actionable insights system Magnet built for us has been incredible. Instead of drowning in data, we get 
              clear reports that highlight opportunities. Every metric now has context and meaning, and we can actually act 
              on what we see. This has made our optimization efforts much more effective.
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
          name="Sarah Johnson"
          byline="VP of Marketing at InsightLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet's data & analytics setup gave us the foundation we needed to measure everything properly. Now we understand 
              how channels work together, which investments drive results, and where to optimize. This clarity has improved our 
              ROI on every marketing dollar we spend.
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
          name="David Park"
          byline="Director of Growth at MeasureCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about data & analytics">
        <Faq
          id="faq-1"
          question="What's included in a data & analytics setup?"
          answer="A comprehensive data & analytics setup includes unified data architecture that connects all channels and systems, tracking implementation across all touchpoints, dashboard creation for key metrics, automated reporting systems, attribution modeling, and ongoing analysis and optimization. It's a complete system that provides clarity and enables data-driven decisions."
        />
        <Faq
          id="faq-2"
          question="How do you unify data from different platforms?"
          answer="We use data integration tools and platforms that connect all your systems—CRM, marketing platforms, analytics tools, and more—into a unified data warehouse. This creates a single source of truth where all data is accessible and can be analyzed together. The unified architecture enables you to see the complete customer journey and understand how channels work together."
        />
        <Faq
          id="faq-3"
          question="What metrics should we be tracking?"
          answer="The metrics you track depend on your business goals, but typically include acquisition metrics (traffic, leads, cost per acquisition), engagement metrics (time on site, pages per visit, bounce rate), conversion metrics (conversion rate, revenue, customer lifetime value), and retention metrics (churn rate, repeat purchase rate). We help you identify the metrics that matter most for your business and build systems to track them effectively."
        />
        <Faq
          id="faq-4"
          question="How do you ensure data accuracy?"
          answer="Data accuracy starts with proper tracking implementation and continues with regular audits and validation. We implement tracking correctly from the start, set up data validation processes, and regularly audit data quality. We also create systems that flag anomalies or inconsistencies, ensuring you can trust the data you're using to make decisions."
        />
        <Faq
          id="faq-5"
          question="Can you integrate with our existing tools?"
          answer="Yes. We work with all major analytics platforms, CRMs, marketing tools, and data platforms. Whether you're using Google Analytics, Adobe Analytics, HubSpot, Salesforce, or other tools, we can integrate them into a unified data architecture. We build systems that work with your existing infrastructure."
        />
        <Faq
          id="faq-6"
          question="How does data & analytics integrate with other marketing efforts?"
          answer="Data & analytics is the foundation that makes all other marketing efforts more effective. It provides clarity into what's working, enables optimization, and ensures every investment is measurable. When data systems are in place, you can make better decisions about where to invest, how to optimize, and what to scale."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build your data foundation?"
        subheadline={
          <p>
            Let's create data & analytics systems that provide clarity and insight. Build the foundation that makes every 
            decision more informed and every optimization more effective.
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
