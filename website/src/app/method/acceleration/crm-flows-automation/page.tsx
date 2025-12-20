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
        headline="CRM Flows & Automation"
        subheadline={
          <p>
            Automate workflows that accelerate revenue. CRM flows & automation is about creating systems that work automatically 
            to move prospects through the funnel and accelerate revenue. It&apos;s the system that removes manual work and ensures 
            nothing falls through the cracks. We build CRM flows & automation that go beyond basic sequences—they&apos;re comprehensive 
            systems that understand context, trigger the right actions at the right time, and create seamless experiences for both 
            prospects and your team. When CRM flows & automation are done right, they become a powerful acceleration tool that scales 
            your sales process.
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
        eyebrow="How we build CRM automation"
        headline="Automation systems that accelerate revenue"
        subheadline={
          <p>
            We build CRM flows & automation that go beyond basic sequences—they&apos;re comprehensive systems that understand 
            context, trigger the right actions at the right time, and create seamless experiences for both prospects and your 
            team. Every flow is designed to remove friction, ensure nothing falls through the cracks, and accelerate revenue.
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
              headline="Context-Aware Automation"
              subheadline={
                <p>
                  Automation that understands context, not just triggers. We build CRM flows that recognize where prospects are 
                  in their journey, what they&apos;ve done, and what they need next. This context-aware approach means automation 
                  triggers the right actions at the right time, creating experiences that feel intentional and valuable. When 
                  automation understands context, it doesn&apos;t just move prospects through the funnel—it guides them appropriately, 
                  ensuring every interaction is relevant and timely.
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
              headline="Seamless Workflow Integration"
              subheadline={
                <p>
                  Flows that integrate seamlessly with your existing workflows. We build CRM automation that works with your 
                  sales process, not against it. This means automation handles the repetitive tasks while your team focuses on 
                  high-value activities. When workflows are integrated seamlessly, nothing falls through the cracks, prospects 
                  get timely follow-ups, and your team can scale without adding headcount. The result is a sales process that 
                  runs smoothly and efficiently, even as you grow.
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
        headline="CRM automation that accelerates revenue"
        subheadline={
          <p>
            When CRM flows & automation are built as comprehensive systems that understand context and integrate seamlessly, 
            sales processes become more efficient and revenue accelerates. Our context-aware automation and workflow integration 
            create systems that scale.
          </p>
        }
      >
        <Stat stat="3.9x" text="Faster sales cycle progression when automation handles repetitive tasks vs. manual processes." />
        <Stat stat="61%" text="Reduction in dropped leads when automation ensures nothing falls through the cracks." />
        <Stat stat="2.8x" text="Better sales team efficiency when workflows are automated and integrated seamlessly." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="CRM automation that transformed sales processes"
        subheadline={
          <p>
            See how comprehensive CRM flows & automation have helped sales teams scale efficiently and accelerate revenue.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our sales process was full of manual work and things were constantly falling through 
              the cracks. The CRM automation they built handles all the repetitive tasks automatically, and the context-aware 
              flows ensure prospects get the right follow-ups at the right time. Our sales cycle has shortened significantly, 
              and we&apos;re closing more deals.
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
          name="Mark Thompson"
          byline="VP of Sales at AutomateCo"
        />
        <Testimonial
          quote={
            <p>
              The workflow integration Magnet created for us has been incredible. Instead of our team spending time on manual 
              tasks, they can focus on high-value activities. The automation ensures nothing falls through the cracks, and 
              prospects get timely, relevant follow-ups. We&apos;ve been able to scale our sales process without adding headcount.
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
          name="Patricia Lee"
          byline="Head of Revenue Operations at ScaleUp"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s CRM automation transformed our sales process. The context-aware flows mean every interaction is relevant 
              and timely, and the seamless integration means our team doesn&apos;t have to think about automation—it just works. 
              Our sales efficiency has improved dramatically, and we&apos;re closing more deals faster than ever.
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
          name="Daniel Park"
          byline="Director of Sales at FlowTech"
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
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about CRM flows & automation">
        <Faq
          id="faq-1"
          question="What's the difference between CRM automation and just using sequences?"
          answer="Sequences are linear, one-size-fits-all workflows. CRM automation is context-aware systems that understand where prospects are, what they've done, and what they need next. Automation triggers the right actions at the right time based on context, creating experiences that feel intentional and valuable. Sequences send the same thing to everyone; automation personalizes based on behavior and context."
        />
        <Faq
          id="faq-2"
          question="How do you ensure automation doesn't feel robotic?"
          answer="We build automation that understands context and adapts accordingly. Instead of sending the same sequence to everyone, our automation recognizes where prospects are in their journey and triggers the right actions at the right time. This context-aware approach means automation feels intentional and valuable, not robotic. We also ensure automation integrates seamlessly with human touchpoints, so prospects get the right mix of automated and personal interactions."
        />
        <Faq
          id="faq-3"
          question="What types of workflows can be automated?"
          answer="We can automate a wide range of workflows: lead qualification, follow-up sequences, task assignments, data enrichment, opportunity progression, and more. The key is identifying which workflows add value when automated and which require human judgment. We automate the repetitive, high-volume tasks that slow down your team, while ensuring important decisions still get human attention."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from CRM automation?"
          answer="You'll typically see improvements in sales efficiency and lead management within the first month as automation starts handling repetitive tasks. The real impact—shorter sales cycles, fewer dropped leads, and scalable sales processes—builds over 2-3 months as automation systems mature and integrate with your workflows."
        />
        <Faq
          id="faq-5"
          question="Can you integrate with our existing CRM?"
          answer="Yes. We work with all major CRM platforms including Salesforce, HubSpot, Pipedrive, and more. We can build automation flows that integrate seamlessly with your existing CRM setup, ensuring automation works with your current processes rather than requiring you to change everything."
        />
        <Faq
          id="faq-6"
          question="How do you measure CRM automation success?"
          answer="We measure success through multiple metrics: sales cycle length, lead response times, task completion rates, dropped lead rates, and ultimately, revenue growth. But the real measure is whether automation makes your sales process more efficient and scalable. We track how automation impacts team productivity and sales outcomes, continuously optimizing based on what works."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to automate your sales process?"
        subheadline={
          <p>
            Let&apos;s create CRM flows & automation that accelerate revenue. Build comprehensive systems that understand context 
            and create seamless experiences for both prospects and your team.
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
