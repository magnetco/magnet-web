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
            <span className="font-semibold">Messaging System</span>
          </span>
        }
        headline="Messaging systems that resonate and guide"
        subheadline={
          <p>
            Messaging systems should ensure every communication is clear, consistent, and compelling, not just provide talking 
            points. Most messaging feels generic because it&apos;s built as copy decks instead of frameworks that guide communication. 
            When messaging systems create language that resonates with your audience and guides every touchpoint, they become the 
            foundation that makes every other communication more effective.
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
        eyebrow="How we build messaging systems"
        headline="Frameworks that make every message more effective"
        subheadline={
          <p>
            We build messaging systems that go beyond taglines—they're comprehensive frameworks that make it easier to 
            communicate value, differentiate from competitors, and connect with your ideal customers. Every message serves 
            a purpose and moves your audience closer to action.
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
              headline="Value Proposition Framework"
              subheadline={
                <p>
                  A clear value proposition is the foundation of effective messaging. We create frameworks that articulate 
                  what makes you different, why it matters, and who it's for. This isn't just a tagline—it's a comprehensive 
                  system that helps you communicate value consistently across all channels. When your value proposition is 
                  clear and compelling, every message becomes more effective because it's built on a solid foundation. This 
                  framework guides everything from website copy to sales conversations, ensuring consistency and clarity.
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
              headline="Voice & Tone Guidelines"
              subheadline={
                <p>
                  How you say something is just as important as what you say. We create voice and tone guidelines that define 
                  your brand's personality and how it should sound across different contexts. These guidelines ensure consistency 
                  while allowing for flexibility—your tone might be more casual in social media and more formal in legal 
                  documents, but your voice remains consistent. When voice and tone are clearly defined, every piece of content 
                  feels like it came from the same brand, building recognition and trust over time.
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
        headline="Messaging systems that drive clarity and conversion"
        subheadline={
          <p>
            When messaging systems are in place, every communication becomes more effective. Clear value propositions and 
            consistent voice and tone create recognition, build trust, and drive action.
          </p>
        }
      >
        <Stat stat="3.7x" text="Higher conversion rates for brands with clear messaging systems vs. ad-hoc messaging." />
        <Stat stat="68%" text="Increase in brand consistency when voice and tone guidelines are implemented across all channels." />
        <Stat stat="2.5x" text="Faster content creation when messaging frameworks are in place." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Messaging systems that transformed communication"
        subheadline={
          <p>
            See how comprehensive messaging systems have helped brands communicate more effectively and consistently.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our messaging felt scattered. Different teams were saying different things, and 
              our value proposition wasn't clear. The messaging system they built gave us a framework that everyone could 
              follow. Now, every communication feels consistent and compelling.
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
          name="Michael Torres"
          byline="Head of Marketing at ScaleUp"
        />
        <Testimonial
          quote={
            <p>
              The value proposition framework they created for us was a game-changer. It helped us articulate what makes us 
              different in a way that resonates with our ideal customers. This clarity has improved everything from our 
              website copy to our sales conversations.
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
          name="Lisa Anderson"
          byline="CMO at InnovateLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet's voice and tone guidelines transformed how we communicate. Every piece of content now feels like it 
              came from the same brand, whether it's a social media post or a customer email. This consistency has made our 
              brand much more recognizable and trustworthy.
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
          byline="Director of Content at BrandCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about messaging systems">
        <Faq
          id="faq-1"
          question="What's the difference between messaging and copywriting?"
          answer="Messaging is the strategic framework that defines what you say and how you say it. Copywriting is the tactical execution of that framework. A messaging system provides the foundation—value propositions, key messages, voice and tone—that copywriters use to create effective content. Think of messaging as the blueprint and copywriting as the building."
        />
        <Faq
          id="faq-2"
          question="How do you develop a value proposition?"
          answer="We start by understanding your unique strengths, your customers' needs, and how you solve problems differently than competitors. Through research, interviews, and analysis, we identify what makes you distinct and valuable. Then we craft a value proposition that's clear, compelling, and differentiated—one that resonates with your ideal customers and guides all your messaging."
        />
        <Faq
          id="faq-3"
          question="Can messaging systems work for B2B and B2C companies?"
          answer="Absolutely. While the tone and approach may differ, the principles of clear messaging apply to both B2B and B2C. B2B messaging often focuses on business outcomes and ROI, while B2C messaging may be more emotional, but both benefit from clear value propositions, consistent voice, and messaging frameworks that guide communication."
        />
        <Faq
          id="faq-4"
          question="How do you ensure messaging stays consistent across teams?"
          answer="We create messaging systems that are clear, accessible, and practical. This includes messaging guides, templates, examples, and training. When everyone understands the framework and has tools to apply it, consistency becomes natural. We also provide ongoing support and audits to ensure messaging stays on track as teams grow and evolve."
        />
        <Faq
          id="faq-5"
          question="What if our messaging needs to evolve?"
          answer="Messaging systems are designed to evolve with your business. As your products, customers, or market position changes, your messaging should adapt. We build flexible frameworks that can accommodate growth and change while maintaining consistency. When updates are needed, we work with you to evolve messaging in a way that preserves brand recognition."
        />
        <Faq
          id="faq-6"
          question="How does messaging integrate with other marketing efforts?"
          answer="Messaging is the foundation that makes all marketing efforts more effective. It ensures consistency across paid media, social content, email, websites, and every other touchpoint. When messaging is clear and consistent, every marketing investment reinforces your brand and value proposition, creating a compounding effect over time."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build your messaging system?"
        subheadline={
          <p>
            Let's create messaging frameworks that make every communication more effective. Build a system that ensures 
            clarity, consistency, and compelling communication across all touchpoints.
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
