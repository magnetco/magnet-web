import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { FeatureThreeColumnWithDemos, Features } from '@/components/sections/features-three-column-with-demos'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroCenteredWithDemo
        id="hero"
        eyebrow={<AnnouncementBadge href="#" text="New: AI-powered SEO optimization" cta="Learn more" />}
        headline="Dominate search results with intelligent marketing."
        subheadline={
          <p>
            Harness the power of SEO, LLMs, and search marketing to drive organic traffic and boost your visibility. Advanced
            keyword research, content optimization, and AI-driven strategies all in one platform.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Get started
            </ButtonLink>
            <PlainButtonLink href="#" size="lg">
              See examples <ArrowNarrowRightIcon />
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
        headline="Everything you need to dominate search results."
        subheadline={
          <p>
            From SEO optimization to AI-powered content strategies, we provide all the tools and resources you need to improve
            your search rankings and drive qualified organic traffic.
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
              headline="SEO Optimization"
              subheadline={<p>Advanced SEO tools that help you rank higher in search results and attract more organic traffic.</p>}
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
              headline="LLM-Powered Content"
              subheadline={<p>Leverage large language models to create optimized, engaging content that search engines love.</p>}
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
              headline="Keyword Research"
              subheadline={<p>Comprehensive keyword research tools that identify high-value opportunities to improve your rankings.</p>}
            />
          </>
        }
      />

      {/* Approach */}
      <Approach
        id="approach"
        eyebrow="Our Process"
        headline="How we optimize search performance"
        subheadline={
          <p>
            We follow a proven four-stage approach to improve search rankings and drive organic traffic that converts.
          </p>
        }
      >
        <ApproachStage
          title="Foundation"
          description="Build the strategic, narrative, and technical infrastructure for growth."
          items={
            <>
              <ApproachItem>Technical SEO Audit</ApproachItem>
              <ApproachItem>Keyword Strategy</ApproachItem>
              <ApproachItem>Content Architecture</ApproachItem>
              <ApproachItem>Site Structure Optimization</ApproachItem>
              <ApproachItem>Analytics & Tracking Setup</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Activation"
          description="Turn on demand to attract qualified traffic into the system."
          items={
            <>
              <ApproachItem>Content Creation & Optimization</ApproachItem>
              <ApproachItem>LLM-Powered Content Strategy</ApproachItem>
              <ApproachItem>Link Building Campaigns</ApproachItem>
              <ApproachItem>Local SEO Optimization</ApproachItem>
              <ApproachItem>Search Marketing Campaigns</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Acceleration"
          description="Targeted acquisition using ICP insight for efficient, scalable demand."
          items={
            <>
              <ApproachItem>Advanced Keyword Targeting</ApproachItem>
              <ApproachItem>Conversion-Focused Landing Pages</ApproachItem>
              <ApproachItem>Content Performance Analysis</ApproachItem>
              <ApproachItem>Automated SEO Workflows</ApproachItem>
              <ApproachItem>Rank Tracking & Reporting</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Retention"
          description="Improved acquisition efficiency, conversion and revenue throughput."
          items={
            <>
              <ApproachItem>Ongoing Content Updates</ApproachItem>
              <ApproachItem>Performance Monitoring</ApproachItem>
              <ApproachItem>Algorithm Adaptation</ApproachItem>
              <ApproachItem>Continuous Optimization</ApproachItem>
              <ApproachItem>AI-Driven Insights</ApproachItem>
            </>
          }
        />
      </Approach>

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Search marketing that drives traffic."
        subheadline={
          <p>
            Thousands of companies trust our search marketing services to improve their rankings, increase organic traffic, and
            drive business growth.
          </p>
        }
      >
        <Stat stat="10K+" text="Websites optimized using our SEO platform." />
        <Stat stat="250%" text="Average organic traffic increase for our clients." />
      </StatsWithGraph>

      {/* Testimonial */}
      <TestimonialLargeQuote
        id="testimonial"
        quote={
          <p>
            The search marketing strategy we implemented has transformed our online presence. Our organic traffic has tripled,
            and we're ranking on the first page for all our target keywords. The LLM-powered content tools have been a game-changer.
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
        name="Sarah Chen"
        byline="Marketing Director at TechFlow"
      />

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Questions & Answers">
        <Faq
          id="faq-1"
          question="What's included in a search marketing package?"
          answer="Our search marketing packages include comprehensive SEO audits, keyword research, content optimization, LLM-powered content creation, technical SEO improvements, and ongoing performance monitoring. Higher tier packages include advanced analytics, link building, and dedicated account management."
        />
        <Faq
          id="faq-2"
          question="How long does it take to see SEO results?"
          answer="SEO is a long-term strategy, and results typically start appearing within 3-6 months. However, technical improvements and initial optimizations can show impact within 4-8 weeks. We provide regular reporting so you can track progress along the way."
        />
        <Faq
          id="faq-3"
          question="How do LLMs help with search marketing?"
          answer="Large language models help us create high-quality, SEO-optimized content at scale. They assist with keyword research, content ideation, optimization suggestions, and generating content that matches search intent while maintaining quality and relevance."
        />
        <Faq
          id="faq-4"
          question="Do you offer ongoing search marketing support?"
          answer="Yes, we offer ongoing support packages that include regular content updates, performance monitoring, algorithm adaptation, continuous optimization, and monthly strategy reviews to ensure your search rankings continue to improve over time."
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
              price="$499"
              period="/mo"
              subheadline={<p>Perfect for small businesses getting started with SEO</p>}
              features={['SEO audit & strategy', 'Keyword research', 'Basic content optimization', 'Monthly reporting', 'Email support']}
              cta={
                <SoftButtonLink href="#" size="lg">
                  Get started
                </SoftButtonLink>
              }
            />
            <Plan
              name="Professional"
              price="$1,499"
              period="/mo"
              subheadline={<p>Comprehensive search marketing for growing businesses</p>}
              badge="Most popular"
              features={[
                'Everything in Starter',
                'LLM-powered content creation',
                'Advanced keyword targeting',
                'Link building campaigns',
                'Technical SEO optimization',
                'Priority support',
                'Dedicated account manager',
              ]}
              cta={
                <ButtonLink href="#" size="lg">
                  Get started
                </ButtonLink>
              }
            />
            <Plan
              name="Enterprise"
              price="$3,999"
              period="/mo"
              subheadline={<p>Complete search marketing solution for established companies</p>}
              features={[
                'Everything in Professional',
                'Custom SEO strategy',
                'Unlimited content creation',
                'Advanced analytics & reporting',
                'Multi-site management',
                'White-label reporting',
                '24/7 priority support',
              ]}
              cta={
                <SoftButtonLink href="#" size="lg">
                  Get started
                </SoftButtonLink>
              }
            />
          </>
        }
      />

      {/* Call To Action */}
      <CallToActionWithEmail
        id="call-to-action"
        headline="Ready to dominate search results?"
        subheadline={
          <p>
            Tell us about your search marketing goals and we'll help you improve rankings, increase organic traffic,
            and drive business growth.
          </p>
        }
      />
    </>
  )
}

