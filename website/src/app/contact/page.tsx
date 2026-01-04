import { Suspense } from 'react'
import Image from 'next/image'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { FeaturesThreeColumn, Feature } from '@/components/sections/features-three-column'
import { HeroWithContactForm } from '@/components/sections/hero-with-contact-form'
import { PricingCompact } from '@/components/sections/pricing-compact'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'

export default function Page() {
  return (
    <>
      {/* Hero with Contact Form */}
      <Suspense fallback={<div className="py-16" />}>
        <HeroWithContactForm
          id="hero"
          headline="Let's build something great together"
          subheadline={
            <p>
              Ready to transform your marketing? Tell us about your goals and we&apos;ll help you build stronger market
              positions, create high-converting websites, and launch campaigns that deliver measurable results.
            </p>
          }
        />
      </Suspense>

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Marketing that drives measurable growth"
        subheadline={
          <p>
            Our data-driven approach delivers real results for brands of all sizes, from startups to enterprise
            companies.
          </p>
        }
      >
        <Stat stat="$500M+" text="In revenue generated for clients through our marketing programs." />
        <Stat stat="3.2x" text="Average ROI increase for brands working with Magnet." />
        <Stat stat="240%" text="Average conversion rate increase in the first quarter." />
      </StatsWithGraph>

      {/* Benefits */}
      <FeaturesThreeColumn
        id="benefits"
        eyebrow="Why work with us"
        headline="What you get when you partner with Magnet"
        subheadline={
          <p>
            We combine strategic thinking with proven execution to deliver marketing that compounds over time, not just
            quick wins.
          </p>
        }
        features={
          <>
            <Feature
              headline="Strategic foundation"
              subheadline={
                <p>
                  We start with deep research and strategic planning to ensure every campaign is built on a solid
                  foundation that drives long-term growth.
                </p>
              }
            />
            <Feature
              headline="Data-driven decisions"
              subheadline={
                <p>
                  Every decision is backed by data. We track metrics that matter and provide clear reporting so you
                  always know what&apos;s working.
                </p>
              }
            />
            <Feature
              headline="Full-service support"
              subheadline={
                <p>
                  From branding to websites to paid campaigns, we provide comprehensive marketing support tailored to
                  your business needs.
                </p>
              }
            />
            <Feature
              headline="Proven methodology"
              subheadline={
                <p>
                  Our systematic approach combines foundation, activation, acceleration, and retention to create
                  marketing that compounds over time.
                </p>
              }
            />
            <Feature
              headline="Dedicated partnership"
              subheadline={
                <p>
                  We work as an extension of your team, providing strategic guidance and execution support that adapts
                  to your workflow.
                </p>
              }
            />
            <Feature
              headline="Measurable results"
              subheadline={
                <p>
                  We set clear KPIs upfront and deliver regular reporting so you can track progress and see the impact
                  of our work.
                </p>
              }
            />
          </>
        }
      />

      {/* Pricing */}
      <PricingCompact id="pricing" />

      {/* Process */}
      <Approach
        id="process"
        eyebrow="How it works"
        headline="Our proven process for driving growth"
        subheadline={
          <p>
            We follow a systematic approach that ensures every project delivers measurable results and sets you up for
            long-term success.
          </p>
        }
      >
        <ApproachStage
          title="Discovery"
          description="Understanding your business, goals, and market position to create a tailored strategy."
          items={
            <>
              <ApproachItem>Business goals & objectives</ApproachItem>
              <ApproachItem>Market research & analysis</ApproachItem>
              <ApproachItem>Competitive landscape review</ApproachItem>
              <ApproachItem>Target audience insights</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Strategy"
          description="Developing a comprehensive marketing strategy aligned with your business goals."
          items={
            <>
              <ApproachItem>Strategic planning & roadmap</ApproachItem>
              <ApproachItem>KPI definition & tracking</ApproachItem>
              <ApproachItem>Channel selection & prioritization</ApproachItem>
              <ApproachItem>Timeline & milestone planning</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Execution"
          description="Implementing the strategy with precision and continuous optimization."
          items={
            <>
              <ApproachItem>Campaign implementation</ApproachItem>
              <ApproachItem>Creative development</ApproachItem>
              <ApproachItem>Performance monitoring</ApproachItem>
              <ApproachItem>Ongoing optimization</ApproachItem>
            </>
          }
        />
        <ApproachStage
          title="Growth"
          description="Scaling what works and refining our approach to drive greater results."
          items={
            <>
              <ApproachItem>Performance tracking & reporting</ApproachItem>
              <ApproachItem>Data-driven insights</ApproachItem>
              <ApproachItem>Scaling successful campaigns</ApproachItem>
              <ApproachItem>Continuous improvement</ApproachItem>
            </>
          }
        />
      </Approach>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonials"
        headline="What our clients say"
        subheadline={<p>See how we&apos;ve helped brands transform their marketing and drive real results.</p>}
      >
        <Testimonial
          quote={
            <p>
              Magnet completely transformed our brand positioning and website. Our conversion rate increased by 240% in
              the first quarter, and we&apos;re finally standing out in a crowded market.
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

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Frequently asked questions">
        <Faq
          id="faq-1"
          question="How quickly will I hear back after submitting the form?"
          answer="We typically respond within 24 hours during business days. For urgent inquiries, please mention it in your message and we'll prioritize your request."
        />
        <Faq
          id="faq-2"
          question="What information should I include in my inquiry?"
          answer="The more details you can share about your business, goals, and challenges, the better we can tailor our response. Include your company name, current marketing situation, and what you're hoping to achieve."
        />
        <Faq
          id="faq-3"
          question="Do you work with businesses of all sizes?"
          answer="Yes! We work with startups, growing companies, and enterprise organizations. Our approach scales to fit your needs, whether you're just getting started or looking to accelerate existing growth."
        />
        <Faq
          id="faq-4"
          question="What happens after I submit the form?"
          answer="After you submit, we'll review your inquiry and reach out to schedule a consultation call. During the call, we'll discuss your goals, answer questions, and determine if we're a good fit to work together."
        />
        <Faq
          id="faq-5"
          question="Can you work with our existing marketing team?"
          answer="Absolutely. We collaborate seamlessly with in-house teams, providing strategic guidance and execution support. Whether you need full-service support or specific expertise, we adapt to your team structure."
        />
        <Faq
          id="faq-6"
          question="What makes your approach different?"
          answer="We focus on building sustainable, data-driven marketing systems rather than chasing trends. Our methodology combines strategic foundation, activation, acceleration, and retention—creating marketing that compounds over time."
        />
      </FAQsTwoColumnAccordion>
    </>
  )
}
