import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import {
  Feature,
  FeaturesStackedAlternatingWithDemos,
} from '@/components/sections/features-stacked-alternating-with-demos'
import { Feature as FeatureTwo, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { Feature as FeatureLarge, FeaturesWithLargeDemo } from '@/components/sections/features-with-large-demo'
import { HeroWithDemoOnBackground } from '@/components/sections/hero-with-demo-on-background'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TeamFourColumnGrid, TeamMember } from '@/components/sections/team-four-column-grid'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero - Dramatic with Demo on Background */}
      <HeroWithDemoOnBackground
        id="hero"
        eyebrow={
          <AnnouncementBadge href="#" text="The Magnet Playbook" cta="Learn more" variant="overlay" />
        }
        headline="Build a brand that stands out and drives measurable growth"
        subheadline={
          <p>
            Our proven methodology, exceptional team, collaborative culture, and comprehensive deliverables — everything
            you need to build a brand that stands out and drives measurable growth.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg" color="light">
              Get started
            </ButtonLink>
            <PlainButtonLink href="#" size="lg" color="light">
              See how it works <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
          </LogoGrid>
        }
      />

      {/* Stats - Credibility */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Marketing that drives measurable growth"
        subheadline={
          <p>
            Magnet helps brands build stronger market positions through strategic branding, high-converting websites,
            and performance-driven campaigns. From startups to enterprise companies, we deliver results that move the
            needle.
          </p>
        }
      >
        <Stat stat="$500M+" text="In revenue generated for clients through our marketing programs." />
        <Stat stat="3.2x" text="Average ROI increase for brands working with Magnet." />
        <Stat stat="240%" text="Average conversion rate improvement in first quarter." />
      </StatsWithGraph>

      {/* Method - Our Approach */}
      <Approach
        id="method"
        eyebrow="Our Method"
        headline="A proven four-stage approach to sustainable growth"
        subheadline={
          <p>
            We follow a systematic methodology that builds on itself, creating marketing systems that compound over time
            rather than chasing quick wins.
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

      {/* Deliverables - Two Column with Demos */}
      <FeaturesTwoColumnWithDemos
        id="deliverables"
        eyebrow="What you get"
        headline="Comprehensive deliverables that drive results"
        subheadline={
          <p>
            Every engagement includes strategic documentation, creative assets, technical implementations, and ongoing
            optimization — everything you need to build and scale your brand.
          </p>
        }
        features={
          <>
            <FeatureTwo
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
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
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
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
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
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
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
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Strategic documentation & brand architecture"
              subheadline={
                <p>
                  Brand architecture, messaging frameworks, competitive analysis, and strategic roadmaps that guide every
                  decision and ensure consistency across all touchpoints. We build the foundation that makes everything
                  else work.
                </p>
              }
              cta={
                <Link href="#">
                  Learn more <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <FeatureTwo
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
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
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
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
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
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
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
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Creative assets & technical implementation"
              subheadline={
                <p>
                  Visual identity systems, website designs, high-converting websites, marketing automation systems, and
                  brand guidelines that bring your brand to life and power your growth. Beautiful design meets powerful
                  technology.
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

      {/* Large Demo Section - Culture & Process */}
      <FeaturesWithLargeDemo
        id="culture-process"
        eyebrow="Our culture"
        headline="How we work together to deliver exceptional results"
        subheadline={
          <p>
            Our culture shapes everything we do — from how we approach strategy to how we collaborate with clients.
          </p>
        }
        demo={
          <Screenshot wallpaper="green" placement="bottom">
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
        }
        features={
          <>
            <FeatureLarge
              headline="Data-driven decision making"
              subheadline={
                <p>
                  Every strategy, every campaign, every decision is backed by data. We don't rely on assumptions or
                  industry trends — we test, measure, and optimize based on what actually works for your brand.
                </p>
              }
            />
            <FeatureLarge
              headline="Strategic thinking over quick wins"
              subheadline={
                <p>
                  We build marketing systems that compound over time. While others chase viral moments, we focus on
                  creating sustainable growth engines that deliver consistent results quarter after quarter.
                </p>
              }
            />
            <FeatureLarge
              headline="Collaborative partnership"
              subheadline={
                <p>
                  We're not just vendors — we're partners in your growth. We work closely with your team, share
                  knowledge, and ensure you understand not just what we're doing, but why it matters for your business.
                </p>
              }
            />
            <FeatureLarge
              headline="Transparency and communication"
              subheadline={
                <p>
                  No surprises, no hidden agendas. We provide clear reporting, regular updates, and honest assessments
                  of what's working and what needs adjustment. You always know where you stand.
                </p>
              }
            />
            <FeatureLarge
              headline="Continuous improvement"
              subheadline={
                <p>
                  We're always learning, always optimizing, always pushing to deliver better results. Our methodology
                  evolves based on what we learn from every project, ensuring we stay at the forefront of marketing
                  excellence.
                </p>
              }
            />
            <FeatureLarge
              headline="Results-focused execution"
              subheadline={
                <p>
                  We measure success by the results we deliver for your business, not by the hours we bill. Every
                  project is designed to move the needle and drive measurable growth.
                </p>
              }
            />
          </>
        }
      />

      {/* Testimonial Large */}
      <TestimonialTwoColumnWithLargePhoto
        id="testimonial-large"
        quote={
          <p>
            Ever since we started working with Magnet, our brand positioning has become crystal clear and our marketing
            results have transformed. Their strategic approach and data-driven insights have been game-changing. We've
            seen a 240% increase in conversion rates and our brand finally stands out in a crowded market.
          </p>
        }
        img={
          <Image
            src="/img/avatars/16-h-1000-w-1400.webp"
            alt=""
            className="not-dark:bg-white/75 dark:bg-black/75"
            width={1400}
            height={1000}
          />
        }
        name="Lynn Marshall"
        byline="Founder at Pine Labs"
      />

      {/* More Deliverables - Stacked Alternating */}
      <FeaturesStackedAlternatingWithDemos
        id="more-deliverables"
        eyebrow="Campaign execution"
        headline="Ongoing optimization and measurable results"
        subheadline={
          <p>
            Search marketing programs, paid advertising campaigns, comprehensive dashboards, and performance reports
            that show exactly what's working and where to optimize.
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
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
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
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
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
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
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
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Campaign execution & analytics"
              subheadline={
                <p>
                  Search marketing programs, paid advertising campaigns, comprehensive dashboards, attribution models,
                  and performance reports that show exactly what's working and where to optimize. Real-time insights
                  that drive better decisions.
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
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
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
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
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
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
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
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="Ongoing optimization & support"
              subheadline={
                <p>
                  Continuous testing, performance monitoring, strategic adjustments, and quarterly reviews that ensure
                  your marketing keeps improving and delivering better results over time. We're with you for the long
                  haul.
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

      {/* Testimonials Grid */}
      <TestimonialThreeColumnGrid
        id="testimonials"
        headline="What our clients are saying"
        subheadline={<p>Real results from real partnerships that drive meaningful impact at scale.</p>}
      >
        <Testimonial
          quote={
            <p>
              Magnet completely transformed our brand positioning and website. Our conversion rate increased by 240% in
              the first quarter, and we're finally standing out in a crowded market.
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
          name="Jordan Rogers"
          byline="Founder at Anomaly"
        />
        <Testimonial
          quote={
            <p>
              Their search marketing strategy tripled our organic traffic in six months. Magnet understands how to build
              sustainable growth, not just quick wins.
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
          name="Lynn Marshall"
          byline="Founder at Pine Labs"
        />
        <Testimonial
          quote={
            <p>
              Working with Magnet freed up our team to focus on product development. Their paid ads campaigns are
              driving qualified leads at a fraction of our previous cost per acquisition.
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
          name="Rajat Singh"
          byline="Head of Marketing at Concise"
        />
      </TestimonialThreeColumnGrid>

      {/* Team */}
      <TeamFourColumnGrid
        id="team"
        headline="Our team"
        subheadline={
          <p>
            Magnet's leadership team combines decades of experience building brands and driving growth. We bring
            strategic thinking, creative excellence, and data-driven execution to every project.
          </p>
        }
      >
        <TeamMember
          img={
            <Image
              src="/img/avatars/1-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Leslie Alexander"
          byline="Co-Founder / CEO"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/2-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Michael Foster"
          byline="Co-Founder / CTO"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/7-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Dries Vincent"
          byline="Business Relations"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/4-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Lindsay Walton"
          byline="Front-end Developer"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/5-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Noor Hasan"
          byline="Designer"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/6-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Tom Cook"
          byline="Director of Product"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/8-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Whitney Francis"
          byline="Copywriter"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/3-h-1000-w-800.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="Leonard Wu"
          byline="Senior Designer"
        />
      </TeamFourColumnGrid>

      {/* Call To Action */}
      <CallToActionWithEmail
        id="call-to-action"
        headline="Ready to see the playbook in action?"
        subheadline={
          <p>
            Let's discuss how Magnet's methodology, team, culture, and deliverables can help build your brand and drive
            measurable growth.
          </p>
        }
      />
    </>
  )
}
