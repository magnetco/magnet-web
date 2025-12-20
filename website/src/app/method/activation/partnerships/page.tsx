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
        headline="Partnerships"
        subheadline={
          <p>
            Build partnerships that drive mutual growth. Partnerships are about building relationships that drive mutual growth. 
            It&apos;s the system that extends your reach, builds credibility, and creates new opportunities for activation. We build 
            partnership systems that go beyond referrals—they&apos;re comprehensive strategies that align with complementary businesses, 
            create value for both parties, and drive qualified traffic into your system. When partnerships are done right, they become 
            a powerful activation channel that scales with relationships.
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
        eyebrow="How we build partnerships"
        headline="Partnership systems that drive mutual growth"
        subheadline={
          <p>
            We build partnership systems that go beyond referrals—they&apos;re comprehensive strategies that align with complementary 
            businesses, create value for both parties, and drive qualified traffic into your system. Every partnership is designed to 
            extend reach, build credibility, and create opportunities for activation.
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
              headline="Strategic Partnership Alignment"
              subheadline={
                <p>
                  Partnerships that align strategically, not just opportunistically. We build partnership systems that identify 
                  complementary businesses, understand mutual value, and create partnerships that benefit both parties. This strategic 
                  alignment means partnerships extend reach and build credibility because they&apos;re built on shared values and 
                  complementary strengths. When partnerships are strategically aligned, they create opportunities for activation that 
                  scale with relationships.
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
              headline="Value-Creation Partnership Models"
              subheadline={
                <p>
                  Partnership models that create value for both parties, not just referrals. We build partnership systems that 
                  create mutual value through co-marketing, co-creation, shared resources, and other models that benefit both parties. 
                  This value-creation approach means partnerships are sustainable because both parties see clear benefits. When partnerships 
                  create value, they drive qualified traffic and build credibility because they&apos;re built on mutual success, not 
                  just transactions.
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
        headline="Partnerships that drive activation and growth"
        subheadline={
          <p>
            When partnership systems are strategically aligned and create value for both parties, they extend reach, build credibility, 
            and drive qualified traffic. Our comprehensive approach creates partnerships that scale with relationships.
          </p>
        }
      >
        <Stat stat="3.9x" text="Higher qualified traffic when partnerships are strategically aligned vs. opportunistic referrals." />
        <Stat stat="66%" text="Increase in partnership effectiveness when models create value for both parties." />
        <Stat stat="2.8x" text="Better brand credibility when partnerships are built on strategic alignment and mutual value." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Partnerships that transformed activation"
        subheadline={
          <p>
            See how comprehensive partnership systems have helped brands extend reach, build credibility, and drive qualified traffic.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our partnerships felt like one-off referrals. The strategic alignment system they created 
              identifies complementary businesses and creates partnerships that benefit both parties. Our partnership program is now 
              driving much more qualified traffic, and partners are seeing real value.
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
          name="Michael Rodriguez"
          byline="Head of Partnerships at PartnerCo"
        />
        <Testimonial
          quote={
            <p>
              The value-creation partnership models Magnet built for us have been incredible. Instead of just asking for referrals, 
              we&apos;re creating partnerships that provide value to both parties. This has made our partnerships much more sustainable, 
              and we&apos;re seeing real results in terms of reach and qualified traffic.
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
          name="Jessica Park"
          byline="VP of Business Development at GrowthLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s partnership system transformed how we approach partnerships. The strategic alignment means we&apos;re working 
              with complementary businesses that share our values, and the value-creation models mean both parties see clear benefits. 
              Our partnership program is now a powerful activation channel.
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
          name="Robert Kim"
          byline="Director of Partnerships at AllianceCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about partnerships">
        <Faq
          id="faq-1"
          question="What's the difference between partnerships and just referrals?"
          answer="Referrals are one-way transactions—you ask, partners refer. Partnerships are two-way relationships that create value for both parties. Strategic partnerships align with complementary businesses, create mutual value, and drive qualified traffic through co-marketing, co-creation, and other models. When partnerships are done right, they scale with relationships, not just transactions."
        />
        <Faq
          id="faq-2"
          question="How do you identify strategic partnership opportunities?"
          answer="We identify partnerships by looking for complementary businesses that share values, serve similar audiences, and have complementary strengths. The key is finding partners where both parties can create value—whether through co-marketing, shared resources, co-creation, or other models. Strategic partnerships extend reach and build credibility because they're built on alignment, not just opportunity."
        />
        <Faq
          id="faq-3"
          question="What types of partnership models create value?"
          answer="Partnership models that create value include co-marketing (joint campaigns), co-creation (joint products or content), shared resources (joint events or resources), affiliate programs (structured referral systems), and more. The key is creating models where both parties see clear benefits, making partnerships sustainable and effective."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from partnerships?"
          answer="You'll typically see initial partnership activity within the first month as strategic partnerships are established. The real impact—extended reach, qualified traffic, and brand credibility—builds over 2-3 months as partnerships mature and both parties see value. Strategic partnerships often compound over time as relationships strengthen."
        />
        <Faq
          id="faq-5"
          question="Can partnerships work for different types of businesses?"
          answer="Absolutely. Partnerships can work for B2B companies, B2C companies, services, products, and more. The key is identifying complementary businesses and creating partnership models that create value for both parties. We customize partnership strategies to fit your business model and goals."
        />
        <Faq
          id="faq-6"
          question="How do you measure partnership success?"
          answer="We measure success through multiple metrics: qualified traffic, lead generation, brand awareness, partnership engagement, and ultimately, revenue. But the real measure is whether partnerships extend reach, build credibility, and drive qualified traffic. We track both quantitative metrics and qualitative outcomes to continuously improve partnership systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build partnerships that drive growth?"
        subheadline={
          <p>
            Let&apos;s create partnership systems that drive activation. Build comprehensive strategies that align with complementary 
            businesses and create value for both parties.
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
