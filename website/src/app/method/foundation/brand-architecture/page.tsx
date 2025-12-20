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
        headline="Brand Architecture"
        subheadline={
          <p>
            Build the strategic foundation that guides every brand decision. Brand architecture is the framework that 
            ensures consistency, clarity, and coherence across all touchpoints and experiences. It's the system that makes 
            every decision easier, every message clearer, and every experience more cohesive. When brand architecture is 
            done right, it becomes the foundation that enables everything else to work.
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
        eyebrow="How we build brand architecture"
        headline="Strategic frameworks that guide every decision"
        subheadline={
          <p>
            We build brand architecture that goes beyond logos and colors—it's about creating a comprehensive system that 
            makes every decision easier, every message clearer, and every experience more cohesive. Our frameworks ensure 
            consistency across all touchpoints while maintaining the flexibility to evolve.
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
              headline="Visual Identity System"
              subheadline={
                <p>
                  A cohesive visual identity system goes far beyond a logo. We create comprehensive brand guidelines that 
                  define how your brand looks, feels, and behaves across every touchpoint. This includes color palettes, 
                  typography systems, iconography, photography styles, and design patterns. When every visual element is 
                  part of a unified system, your brand becomes instantly recognizable and consistently memorable. This 
                  visual consistency builds trust, reinforces your message, and makes every interaction feel intentional 
                  and professional.
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
              headline="Brand Guidelines & Standards"
              subheadline={
                <p>
                  Brand guidelines aren't just documents—they're decision-making frameworks that ensure consistency at scale. 
                  We create comprehensive brand standards that cover everything from logo usage to voice and tone, from 
                  photography to illustration styles. These guidelines make it easy for anyone on your team to create 
                  on-brand materials, whether they're designing a website, writing an email, or creating social content. 
                  When brand guidelines are clear and comprehensive, they become the foundation that enables consistent 
                  brand expression across all channels and touchpoints.
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
        headline="Brand architecture that drives recognition and trust"
        subheadline={
          <p>
            When brand architecture is done right, it creates consistency that builds recognition, trust, and loyalty. Our 
            comprehensive brand systems help brands maintain coherence across all touchpoints while enabling growth and evolution.
          </p>
        }
      >
        <Stat stat="4.5x" text="Higher brand recognition for companies with comprehensive brand architecture vs. ad-hoc branding." />
        <Stat stat="73%" text="Increase in brand consistency scores when brand guidelines are implemented across all touchpoints." />
        <Stat stat="2.8x" text="Faster time-to-market for new campaigns when brand architecture is in place." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Brand architecture that transformed companies"
        subheadline={
          <p>
            See how comprehensive brand architecture has helped companies build stronger, more consistent brands.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our brand felt inconsistent across different channels. The brand architecture they 
              built gave us a clear framework that everyone on our team could follow. Now, everything we create feels cohesive 
              and intentional, and our brand recognition has improved dramatically.
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
          name="Alexandra Martinez"
          byline="Creative Director at DesignWorks"
        />
        <Testimonial
          quote={
            <p>
              The brand guidelines they created for us are incredibly comprehensive. Every designer, writer, and marketer on 
              our team knows exactly how to represent our brand. This consistency has made our brand much more recognizable, 
              and it's saved us countless hours that we used to spend debating design decisions.
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
          name="James Wilson"
          byline="VP of Marketing at TechVenture"
        />
        <Testimonial
          quote={
            <p>
              Magnet's brand architecture work transformed how we think about our brand. It's not just about how things look—it's 
              about creating a system that guides every decision. This foundation has made everything else we do more effective, 
              from marketing campaigns to product launches.
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
          name="Sophie Chen"
          byline="Head of Brand at GrowthCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about brand architecture">
        <Faq
          id="faq-1"
          question="What's included in a brand architecture system?"
          answer="A comprehensive brand architecture system includes visual identity guidelines (logo, colors, typography, imagery), brand voice and tone standards, messaging frameworks, design patterns and components, and usage guidelines for all brand elements. It's a complete system that ensures consistency while providing flexibility for different contexts and applications."
        />
        <Faq
          id="faq-2"
          question="How long does it take to build brand architecture?"
          answer="The timeline depends on the scope and complexity of your brand, but typically takes 4-8 weeks. This includes discovery and research, design development, guideline creation, and refinement. For larger organizations or more complex brand systems, the process may take longer to ensure comprehensive coverage of all touchpoints."
        />
        <Faq
          id="faq-3"
          question="Can brand architecture work for companies with multiple products or sub-brands?"
          answer="Absolutely. Brand architecture is especially valuable for companies with multiple products or sub-brands. We create hierarchical systems that maintain consistency at the parent brand level while allowing for differentiation at the product or sub-brand level. This ensures each brand feels distinct while maintaining overall coherence."
        />
        <Faq
          id="faq-4"
          question="How do you ensure brand guidelines are actually used?"
          answer="We create brand guidelines that are clear, accessible, and practical. This includes visual examples, do's and don'ts, templates, and tools that make it easy for teams to create on-brand materials. We also provide training and ongoing support to ensure guidelines are understood and implemented correctly across your organization."
        />
        <Faq
          id="faq-5"
          question="What happens if our brand needs to evolve?"
          answer="Brand architecture is designed to evolve with your business. We build flexible systems that can accommodate growth and change while maintaining consistency. When updates are needed, we work with you to evolve the architecture in a way that preserves brand recognition while allowing for necessary changes."
        />
        <Faq
          id="faq-6"
          question="How does brand architecture integrate with other marketing efforts?"
          answer="Brand architecture is the foundation that makes all other marketing efforts more effective. It ensures consistency across paid media, social content, email, websites, and every other touchpoint. When brand architecture is in place, every marketing investment reinforces your brand identity, creating a compounding effect over time."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to build your brand architecture?"
        subheadline={
          <p>
            Let's create the strategic foundation that guides every brand decision. Build a brand system that ensures 
            consistency, clarity, and coherence across all touchpoints.
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
