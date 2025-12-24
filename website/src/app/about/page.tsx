import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroLeftAlignedWithPhoto } from '@/components/sections/hero-left-aligned-with-photo'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TeamFourColumnGrid, TeamMember } from '@/components/sections/team-four-column-grid'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithPhoto
        id="hero"
        headline="Building brands that stand out and drive growth."
        subheadline={
          <p>
            We're on a mission to help brands build stronger market positions through strategic marketing, data-driven
            insights, and proven methodologies that deliver measurable results.
          </p>
        }
        photo={
          <Image
            src="/img/photos/1.webp"
            alt=""
            width={1800}
            height={945}
            className="not-dark:bg-white/75 dark:bg-black/75"
          />
        }
      />
      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Built for scale"
        headline="Marketing that drives measurable growth."
        subheadline={
          <p>
            Magnet helps brands build stronger market positions through strategic branding, high-converting websites,
            and performance-driven campaigns. From startups to enterprise companies, we deliver results that move the
            needle — backed by data, strategy, and proven methodologies.
          </p>
        }
      >
        <Stat stat="$500M+" text="In revenue generated for clients through our marketing programs." />
        <Stat stat="3.2x" text="Average ROI increase for brands working with Magnet." />
      </StatsWithGraph>
      {/* Testimonial */}
      <TestimonialTwoColumnWithLargePhoto
        id="testimonial"
        quote={
          <p>
            Ever since we started working with Magnet, our brand positioning has become crystal clear and our marketing
            results have transformed. Their strategic approach and data-driven insights have been game-changing.
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
      {/* Team */}
      <TeamFourColumnGrid
        id="team"
        headline="Our leadership team"
        subheadline={
          <p>
            Magnet's leadership team combines decades of experience in private equity, where they honed their skills
            in cost-cutting and maximizing shareholder value.
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
      <CallToActionSimple
        id="call-to-action"
        headline="Have more questions?"
        subheadline={
          <p>Let's discuss how Magnet can help build your brand and drive measurable growth for your business.</p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Get in touch
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
