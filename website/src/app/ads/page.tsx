import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { EmailSignupForm } from '@/components/elements/email-signup-form'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { FeatureThreeColumnWithDemos, Features } from '@/components/sections/features-three-column-with-demos'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroWithDemoOnBackground
        id="hero"
        eyebrow={
          <AnnouncementBadge href="#" text="New: AI-powered ad creation" cta="Learn more" variant="overlay" />
        }
        headline="Create ads that convert and drive real results."
        subheadline={
          <p>
            Design high-performing ads for social media, search, and display. Our platform helps you create, test, and
            optimize ads that actually drive conversions.
          </p>
        }
        cta={
          <EmailSignupForm
            className="max-w-full"
            variant="overlay"
            cta={
              <>
                Start creating <ArrowNarrowRightIcon />
              </>
            }
          />
        }
        demo={
          <>
            <Image
              className="bg-white/75 md:hidden dark:hidden"
              src="/img/screenshots/1.webp"
              alt=""
              width={3440}
              height={1500}
            />
            <Image
              className="bg-black/75 not-dark:hidden md:hidden"
              src="/img/screenshots/1-color-olive.webp"
              alt=""
              width={3440}
              height={1500}
            />
            <Image
              className="bg-white/75 max-md:hidden lg:hidden dark:hidden"
              src="/img/screenshots/1.webp"
              alt=""
              width={3440}
              height={1500}
            />
            <Image
              className="bg-black/75 not-dark:hidden max-md:hidden lg:hidden"
              src="/img/screenshots/1-color-olive.webp"
              alt=""
              width={3440}
              height={1500}
            />
            <Image
              className="bg-white/75 max-lg:hidden dark:hidden"
              src="/img/screenshots/1.webp"
              alt=""
              width={3440}
              height={1500}
            />
            <Image
              className="bg-black/75 not-dark:hidden max-lg:hidden"
              src="/img/screenshots/1-color-olive.webp"
              alt=""
              width={3440}
              height={1500}
            />
          </>
        }
        footer={
          <LogoGrid>
            <Logo>
              <Image
                src="/img/logos/9-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={51}
                height={32}
              />
              <Image
                src="/img/logos/9-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={51}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/10-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={70}
                height={32}
              />
              <Image
                src="/img/logos/10-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={70}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/11-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={100}
                height={32}
              />
              <Image
                src="/img/logos/11-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={100}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/12-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/12-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/13-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={75}
                height={32}
              />
              <Image
                src="/img/logos/13-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={75}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/8-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/8-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
          </LogoGrid>
        }
      />

      {/* Features */}
      <Features
        id="features"
        headline="Everything you need to create high-performing ads."
        subheadline={
          <p>
            From design to optimization, our platform provides all the tools you need to create ads that convert and
            drive real business results.
          </p>
        }
        cta={
          <Link href="#">
            See how it works <ArrowNarrowRightIcon />
          </Link>
        }
        features={
          <>
            <FeatureThreeColumnWithDemos
              demo={
                <Screenshot wallpaper="blue" placement="bottom-right">
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
                    className="bg-white/75 max-lg:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                    alt=""
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden"
                  />
                </Screenshot>
              }
              headline="Ad Templates"
              subheadline={<p>Hundreds of professionally designed ad templates for every platform and campaign type.</p>}
            />
            <FeatureThreeColumnWithDemos
              demo={
                <Screenshot wallpaper="purple" placement="top-left">
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
                    className="bg-white/75 max-lg:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                    alt=""
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden"
                  />
                </Screenshot>
              }
              headline="A/B Testing"
              subheadline={<p>Test different ad variations to find what works best and optimize your conversion rates.</p>}
            />
            <FeatureThreeColumnWithDemos
              demo={
                <Screenshot wallpaper="brown" placement="bottom-left">
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
                    className="bg-white/75 max-lg:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                    alt=""
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden"
                  />
                </Screenshot>
              }
              headline="Performance Analytics"
              subheadline={<p>Track ad performance with detailed analytics and insights to optimize your campaigns.</p>}
            />
          </>
        }
      />

      {/* Approach */}
      <Approach
        id="approach"
        eyebrow="Our Process"
        headline="How we create ads that convert"
        subheadline={
          <p>
            We follow a proven four-stage approach to create ads that drive real business results.
          </p>
        }
      >
        <ApproachStage
          title="Foundation"
          description="Build the strategic, narrative, and technical infrastructure for growth."
          items={
            <>
              <ApproachItem>Brand Architecture</ApproachItem>
              <ApproachItem>Messaging System</ApproachItem>
              <ApproachItem>Digital Experience</ApproachItem>
              <ApproachItem>Conversion Architecture</ApproachItem>
              <ApproachItem>Data & Analytics Setup</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Activation"
          description="Turn on demand to attract qualified traffic into the system."
          items={
            <>
              <ApproachItem>Paid Media</ApproachItem>
              <ApproachItem>Search Marketing</ApproachItem>
              <ApproachItem>Social Content</ApproachItem>
              <ApproachItem>Creative Storytelling</ApproachItem>
              <ApproachItem>Partnerships</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Acceleration"
          description="Targeted acquisition using ICP insight for efficient, scalable demand."
          items={
            <>
              <ApproachItem>Offers & Packaging</ApproachItem>
              <ApproachItem>Landing Experiences</ApproachItem>
              <ApproachItem>Sales Enablement</ApproachItem>
              <ApproachItem>CRM Flows & Automation</ApproachItem>
              <ApproachItem>Attribution & Measurement</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Retention"
          description="Improved acquisition efficiency, conversion and revenue throughput."
          items={
            <>
              <ApproachItem>Lifecycle Email</ApproachItem>
              <ApproachItem>Success Enablement</ApproachItem>
              <ApproachItem>Community & Brand Systems</ApproachItem>
              <ApproachItem>Feedback Loops & Optimization</ApproachItem>
              <ApproachItem>Predictive Intelligence</ApproachItem>
            </>
          }
        />
      </Approach>

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Ads that drive conversions."
        subheadline={
          <p>
            Our ad creation platform helps businesses of all sizes create high-performing ads that drive real results and
            maximize ROI.
          </p>
        }
      >
        <Stat stat="50K+" text="Ads created using our platform." />
        <Stat stat="3.2x" text="Average ROI improvement for our customers." />
      </StatsWithGraph>

      {/* Testimonial */}
      <TestimonialLargeQuote
        id="testimonial"
        quote={
          <p>
            "Since using this platform, our ad conversion rates have increased by 40%. The templates are beautiful, and
            the A/B testing features have been invaluable in optimizing our campaigns. Highly recommend!"
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
        name="Rachel Kim"
        byline="Marketing Director at GrowthLab"
      />

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
        <Faq
          id="faq-1"
          question="Which ad platforms are supported?"
          answer="We support all major ad platforms including Facebook, Instagram, Google Ads, LinkedIn, Twitter, and TikTok. Our templates are optimized for each platform's specific requirements."
        />
        <Faq
          id="faq-2"
          question="Can I customize the ad templates?"
          answer="Absolutely! All templates are fully customizable. You can change colors, fonts, images, copy, and layouts to match your brand and campaign goals."
        />
        <Faq
          id="faq-3"
          question="How does A/B testing work?"
          answer="Our platform makes it easy to create multiple ad variations and test them against each other. You can track performance metrics and automatically optimize based on which ads perform best."
        />
        <Faq
          id="faq-4"
          question="Do you provide analytics and reporting?"
          answer="Yes, our platform includes comprehensive analytics and reporting features. Track impressions, clicks, conversions, and ROI all in one dashboard."
        />
      </FAQsTwoColumnAccordion>

      {/* Pricing */}
      <PricingMultiTier
        id="pricing"
        headline="Pricing to fit your business needs."
        plans={
          <>
            <Plan
              name="Starter"
              price="$49"
              period="/mo"
              subheadline={<p>Perfect for small businesses getting started with ads</p>}
              features={['50 ad templates', 'Basic A/B testing', 'Performance analytics', 'Email support', '1 user']}
              cta={
                <SoftButtonLink href="#" size="lg">
                  Start free trial
                </SoftButtonLink>
              }
            />
            <Plan
              name="Professional"
              price="$149"
              period="/mo"
              subheadline={<p>For growing businesses running multiple campaigns</p>}
              badge="Most popular"
              features={[
                'Everything in Starter',
                'Unlimited ad templates',
                'Advanced A/B testing',
                'Custom ad creation',
                'Priority support',
                '5 users',
                'API access',
              ]}
              cta={
                <ButtonLink href="#" size="lg">
                  Start free trial
                </ButtonLink>
              }
            />
            <Plan
              name="Enterprise"
              price="$499"
              period="/mo"
              subheadline={<p>For agencies and large teams managing multiple clients</p>}
              features={[
                'Everything in Professional',
                'White-label options',
                'Custom integrations',
                'Dedicated account manager',
                'Advanced analytics',
                'Unlimited users',
                'SLA guarantee',
              ]}
              cta={
                <SoftButtonLink href="#" size="lg">
                  Start free trial
                </SoftButtonLink>
              }
            />
          </>
        }
      />

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to create ads that convert?"
        subheadline={
          <p>
            Join thousands of businesses using our platform to create high-performing ads that drive real results and
            maximize ROI.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Start free trial
            </ButtonLink>

            <PlainButtonLink href="#" size="lg">
              Book a demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}

