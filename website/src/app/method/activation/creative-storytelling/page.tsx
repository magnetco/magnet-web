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
            <Link href="/method/activation">Activation</Link>
            <span>/</span>
            <span className="font-semibold">Creative Storytelling</span>
          </span>
        }
        headline="Creative storytelling that resonates and connects"
        subheadline={
          <p>
            Creative storytelling should make your brand memorable and connect with your audience on an emotional level, not just 
            entertain. Most storytelling feels disconnected because it&apos;s built as content instead of systems that guide audiences 
            through a journey. When storytelling creates narratives that resonate, educate, and inspire action, it transforms marketing 
            from interruption into invitation.
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
        eyebrow="How we build stories"
        headline="Creative storytelling systems that connect and convert"
        subheadline={
          <p>
            We build creative storytelling systems that go beyond content—they're comprehensive strategies that connect 
            with your audience on an emotional level, build trust, and guide them toward action. Every story we tell serves 
            a purpose, moves the narrative forward, and creates moments that matter.
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
              headline="Narrative Architecture"
              subheadline={
                <p>
                  Every great story has structure. We build narrative architectures that guide your audience through a 
                  journey—from awareness to action, from curiosity to commitment. Our storytelling frameworks ensure every 
                  piece of content serves a purpose, connects to the larger narrative, and moves people closer to your 
                  desired outcome. When narrative architecture is done right, your stories compound, building on each other 
                  to create a cohesive brand experience that resonates long after the first interaction.
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
              headline="Emotional Resonance"
              subheadline={
                <p>
                  Facts inform, but stories transform. We craft narratives that tap into universal human emotions—hope, 
                  fear, ambition, belonging—creating connections that go beyond transactional relationships. Our storytelling 
                  approach helps your brand become part of your audience's story, not just a product they buy. When emotional 
                  resonance is achieved, your message doesn't just get heard—it gets felt, remembered, and shared. This is 
                  how brands become movements and customers become advocates.
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
        headline="Stories that drive measurable impact"
        subheadline={
          <p>
            Creative storytelling isn't just about making people feel good—it's about driving real business results. Our 
            storytelling systems help brands build deeper connections, increase engagement, and convert more effectively. When 
            stories are structured correctly, they become one of your most powerful activation tools.
          </p>
        }
      >
        <Stat stat="3.2x" text="Higher engagement rates for brands using narrative architecture vs. traditional content." />
        <Stat stat="68%" text="Increase in brand recall when stories are integrated across all touchpoints." />
        <Stat stat="2.5x" text="More qualified leads generated through story-driven campaigns." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Stories that transformed brands"
        subheadline={
          <p>
            See how creative storytelling has helped brands connect with their audience and drive real business results.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Magnet's storytelling approach completely transformed how we communicate with our audience. We went from 
              pushing features to sharing our mission, and the response has been incredible. Our engagement rates tripled, 
              and we're seeing more qualified leads than ever before.
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
          byline="CMO at TechFlow"
        />
        <Testimonial
          quote={
            <p>
              The narrative architecture they built for us created a cohesive story across all our channels. Every piece of 
              content now feels intentional and connected. Our customers tell us they finally understand what we're about, 
              and that clarity has translated directly into sales.
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
          name="Marcus Rodriguez"
          byline="Founder at GrowthLab"
        />
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our content felt scattered and disconnected. Now, every story we tell builds on 
              the last one, creating a narrative that our audience actually wants to follow. The emotional resonance they 
              helped us achieve has turned customers into advocates.
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
          name="Emily Watson"
          byline="Head of Marketing at InnovateCo"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about creative storytelling">
        <Faq
          id="faq-1"
          question="What makes creative storytelling different from regular content marketing?"
          answer="Creative storytelling goes beyond creating content—it's about building narrative architectures that guide your audience through a journey. While content marketing focuses on producing pieces, storytelling focuses on creating connections, emotional resonance, and narratives that compound over time. Every story we tell serves a purpose in a larger narrative that moves people from awareness to action."
        />
        <Faq
          id="faq-2"
          question="How do you measure the success of creative storytelling?"
          answer="We measure storytelling success through multiple metrics: engagement rates, brand recall, emotional connection scores, and ultimately, conversion rates. But the real measure is whether your stories are being remembered, shared, and acted upon. We track how stories perform across channels, how they build on each other, and how they contribute to your overall business goals."
        />
        <Faq
          id="faq-3"
          question="Can storytelling work for B2B companies?"
          answer="Absolutely. B2B buyers are still human, and they make decisions based on emotion as much as logic. The best B2B storytelling connects the technical benefits to human outcomes—showing how your solution helps teams succeed, reduces stress, or enables growth. We've seen B2B brands achieve remarkable results by telling stories that resonate with their audience's challenges and aspirations."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from creative storytelling?"
          answer="While some stories can create immediate impact, the real power of storytelling comes from consistency and narrative architecture. You'll typically see engagement improvements within the first month, but the compounding effects—increased brand recall, stronger emotional connections, and higher conversion rates—build over 3-6 months as your narrative architecture takes shape."
        />
        <Faq
          id="faq-5"
          question="Do you create the stories or help us tell our own?"
          answer="Both. We work with you to uncover the stories that already exist in your organization—the challenges you've overcome, the customers you've helped, the mission that drives you. Then we help structure those stories into a narrative architecture that resonates with your audience. Sometimes we create new stories, sometimes we help you tell existing ones better. The goal is always authenticity and resonance."
        />
        <Faq
          id="faq-6"
          question="How does storytelling integrate with other marketing channels?"
          answer="Storytelling should be the thread that connects all your marketing channels. We build narrative architectures that work across paid media, social content, email, and more. Each channel tells part of the story, and together they create a cohesive narrative experience. This integration is what makes storytelling so powerful—it's not just one campaign, it's the foundation for all your marketing."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to tell stories that convert?"
        subheadline={
          <p>
            Let's create creative storytelling systems that resonate, connect, and drive action. Transform your marketing 
            from interruption into invitation, and turn your audience into advocates.
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
