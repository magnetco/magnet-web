import { Suspense } from 'react'
import Image from 'next/image'
import { FAQsWithChat } from '@/components/sections/faqs-with-chat'
import { FeaturesThreeColumn, Feature } from '@/components/sections/features-three-column'
import { HeroWithContactForm } from '@/components/sections/hero-with-contact-form'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'

export default function Page() {
  return (
    <>
      {/* Hero with Contact Form */}
      <Suspense fallback={<div className="py-16" />}>
        <HeroWithContactForm
          id="hero"
          withGridBg
          layout="stacked"
          headline="Get in touch"
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
        headline="Marketing that drives measurable growth
          "
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
        headline="What you get when you partner with Magnet
          "
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

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonials"
        headline="What our clients say
          "
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

      {/* FAQs with Chat */}
      <FAQsWithChat
        id="faqs"
        eyebrow="Got questions?"
        headline="We have answers"
        subheadline="Browse common questions below, or chat directly with our AI assistant for instant, personalized answers about our services and methodology."
        questions={[
          { question: 'How quickly will I hear back after submitting the form?' },
          { question: 'What information should I include in my inquiry?' },
          { question: 'Do you work with businesses of all sizes?' },
          { question: 'What happens after I submit the form?' },
          { question: 'Can you work with our existing marketing team?' },
          { question: 'What makes your approach different?' },
        ]}
      />
    </>
  )
}
