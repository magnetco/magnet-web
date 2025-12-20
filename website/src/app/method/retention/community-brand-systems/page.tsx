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
            <span className="font-semibold">Community & Brand Systems</span>
          </span>
        }
        headline="Community systems that strengthen brand relationships"
        subheadline={
          <p>
            Communities should create value for members and strengthen brand relationships, not just host discussions. Most 
            communities feel empty because they&apos;re built as forums instead of systems that provide resources and facilitate 
            connections. When community systems create value for members and align with brand values, they turn customers into 
            advocates and become powerful retention tools that compound over time.
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
        eyebrow="How we build communities"
        headline="Community systems that strengthen brand relationships"
        subheadline={
          <p>
            We build community & brand systems that go beyond forums—they&apos;re comprehensive frameworks that create value 
            for members, strengthen brand relationships, and create advocates who drive organic growth. Every element is designed 
            to turn customers into a community and build lasting relationships.
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
              headline="Value-Driven Community Spaces"
              subheadline={
                <p>
                  Communities that create value for members, not just spaces for discussion. We build community systems that 
                  provide resources, facilitate connections, and create opportunities for members to learn and grow. This value-driven 
                  approach means communities become places members want to be, not just places they have to check. When communities 
                  create value, they strengthen brand relationships and create advocates who drive organic growth.
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
              headline="Brand-Aligned Community Culture"
              subheadline={
                <p>
                  Communities that reflect and strengthen your brand, not just host discussions. We build community systems that 
                  align with your brand values, reinforce your messaging, and create experiences that feel cohesive with your 
                  overall brand. This brand-aligned approach means communities become extensions of your brand, not separate spaces. 
                  When communities are brand-aligned, they strengthen brand relationships and create advocates who authentically 
                  represent your brand.
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
        headline="Community systems that drive retention and advocacy"
        subheadline={
          <p>
            When community & brand systems create value for members and align with brand values, retention improves and advocates 
            emerge. Our comprehensive approach creates communities that strengthen brand relationships and drive organic growth.
          </p>
        }
      >
        <Stat stat="3.7x" text="Higher retention rates for customers who are active in brand communities." />
        <Stat stat="58%" text="Increase in customer advocacy when communities create value and align with brand values." />
        <Stat stat="2.6x" text="Better customer lifetime value when communities strengthen brand relationships." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Community systems that transformed brand relationships"
        subheadline={
          <p>
            See how comprehensive community & brand systems have helped brands build stronger relationships and create advocates.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, we had a forum that nobody used. The value-driven community they built provides resources 
              and facilitates connections that members actually want. Our community is now thriving, and members are becoming 
              advocates who refer others. Our retention rates have improved dramatically.
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
          name="Alexandra Kim"
          byline="Head of Community at ConnectCo"
        />
        <Testimonial
          quote={
            <p>
              The brand-aligned community system Magnet created for us has been incredible. Instead of a generic forum, we now have 
              a community that reflects our brand values and reinforces our messaging. This has strengthened our brand relationships 
              and created advocates who authentically represent our brand. Our community has become a competitive advantage.
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
          name="Robert Johnson"
          byline="VP of Brand at CommunityLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s community & brand systems transformed how we engage with customers. The value-driven spaces create 
              opportunities for members to learn and grow, and the brand-aligned culture means our community strengthens our brand 
              relationships. The result is better retention and customers who become advocates.
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
          name="Sophie Martinez"
          byline="Director of Community at BrandCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about community & brand systems">
        <Faq
          id="faq-1"
          question="What's the difference between a community and just a forum?"
          answer="Forums are spaces for discussion. Communities are comprehensive systems that create value for members, facilitate connections, and strengthen brand relationships. Communities provide resources, create opportunities for learning and growth, and align with brand values. When communities are done right, they become places members want to be, not just places they have to check."
        />
        <Faq
          id="faq-2"
          question="How do you create value-driven communities?"
          answer="We build communities that provide resources, facilitate connections, and create opportunities for members to learn and grow. This means communities offer more than just discussion—they provide educational content, networking opportunities, exclusive access, and other value that makes membership worthwhile. When communities create value, they become places members want to be, which strengthens brand relationships."
        />
        <Faq
          id="faq-3"
          question="What does brand-aligned community culture mean?"
          answer="Brand-aligned community culture means communities reflect and strengthen your brand values, reinforce your messaging, and create experiences that feel cohesive with your overall brand. Instead of generic forums, communities become extensions of your brand that authentically represent who you are. This alignment strengthens brand relationships and creates advocates who authentically represent your brand."
        />
        <Faq
          id="faq-4"
          question="How long does it take to build an active community?"
          answer="You'll typically see initial engagement within the first month as value-driven spaces are created and members start connecting. The real impact—active community, strong brand relationships, and advocates who drive organic growth—builds over 3-6 months as the community matures and members see the value of participation."
        />
        <Faq
          id="faq-5"
          question="Can communities work for B2B companies?"
          answer="Absolutely. B2B communities are especially valuable because they create networking opportunities, facilitate knowledge sharing, and strengthen professional relationships. We build B2B communities that provide industry insights, facilitate peer connections, and create value that makes membership worthwhile. B2B communities often become competitive advantages."
        />
        <Faq
          id="faq-6"
          question="How do you measure community success?"
          answer="We measure success through multiple metrics: member engagement, community activity, brand relationship strength, advocacy rates, and ultimately, retention and lifetime value. But the real measure is whether communities create value for members and strengthen brand relationships. We track both quantitative metrics and qualitative feedback to continuously improve community systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build communities that strengthen your brand?"
        subheadline={
          <p>
            Let&apos;s create community & brand systems that drive retention and advocacy. Build comprehensive frameworks that 
            create value for members and strengthen brand relationships.
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
