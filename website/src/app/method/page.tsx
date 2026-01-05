import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Screenshot } from '@/components/elements/screenshot'
import { TabbedLogoGallery, type GalleryItem } from '@/components/elements/tabbed-logo-gallery'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import Image from 'next/image'

const galleryItems: GalleryItem[] = [
  {
    id: 'ikea',
    logo: (
      <Image
        src="/img/logos/ikea.png"
        alt="IKEA"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
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
    ),
  },
  {
    id: 'gorilla',
    logo: (
      <Image
        src="/img/logos/gor.png"
        alt="Gorilla Glue"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="blue" placement="bottom-right">
          <Image
            src="/img/screenshots/1-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-white/75 md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-black/75 not-dark:hidden md:hidden"
          />
          <Image
            src="/img/screenshots/1-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-white/75 max-md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-black/75 not-dark:hidden max-md:hidden"
          />
        </Screenshot>
        <Screenshot className="rounded-lg max-lg:hidden" wallpaper="blue" placement="bottom">
          <Image
            src="/img/screenshots/1-right-1300-top-1300.webp"
            alt=""
            className="bg-white/75 dark:hidden"
            width={1300}
            height={1300}
          />
          <Image
            className="bg-black/75 not-dark:hidden"
            src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
            alt=""
            width={1300}
            height={1300}
          />
        </Screenshot>
      </>
    ),
  },
  {
    id: 'hgtv',
    logo: (
      <Image
        src="/img/logos/hgtv.png"
        alt="HGTV"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="purple" placement="bottom-right">
          <Image
            src="/img/screenshots/1-left-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-white/75 md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-left-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-black/75 not-dark:hidden md:hidden"
          />
          <Image
            src="/img/screenshots/1-left-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-white/75 max-md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-left-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-black/75 not-dark:hidden max-md:hidden"
          />
        </Screenshot>
        <Screenshot className="rounded-lg max-lg:hidden" wallpaper="purple" placement="bottom">
          <Image
            src="/img/screenshots/1-left-1300-top-1300.webp"
            alt=""
            className="bg-white/75 dark:hidden"
            width={1300}
            height={1300}
          />
          <Image
            className="bg-black/75 not-dark:hidden"
            src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
            alt=""
            width={1300}
            height={1300}
          />
        </Screenshot>
      </>
    ),
  },
  {
    id: 'kroger',
    logo: (
      <Image
        src="/img/logos/kro.png"
        alt="Kroger"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="brown" placement="bottom-right">
          <Image
            src="/img/screenshots/1-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-white/75 md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
            alt=""
            width={1000}
            height={800}
            className="bg-black/75 not-dark:hidden md:hidden"
          />
          <Image
            src="/img/screenshots/1-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-white/75 max-md:hidden dark:hidden"
          />
          <Image
            src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
            alt=""
            width={1800}
            height={660}
            className="bg-black/75 not-dark:hidden max-md:hidden"
          />
        </Screenshot>
        <Screenshot className="rounded-lg max-lg:hidden" wallpaper="brown" placement="bottom">
          <Image
            src="/img/screenshots/1-right-1300-top-1300.webp"
            alt=""
            className="bg-white/75 dark:hidden"
            width={1300}
            height={1300}
          />
          <Image
            className="bg-black/75 not-dark:hidden"
            src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
            alt=""
            width={1300}
            height={1300}
          />
        </Screenshot>
      </>
    ),
  },
  {
    id: 'mhe',
    logo: (
      <Image
        src="/img/logos/mhe.png"
        alt="McGraw Hill Education"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <>
        <Screenshot className="rounded-md lg:hidden" wallpaper="green" placement="bottom-left">
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
    ),
  },
]

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroCenteredWithDemo
        id="hero"
        withGridBg
        eyebrow={<AnnouncementBadge href="/contact" text="The Magnet Method" cta="Get started" />}
        headline="A proven framework for sustainable growth"
        subheadline={
          <p>
            Our methodology builds marketing systems that compound over time — not quick wins that fade. 
            Four interconnected stages create the strategic, creative, and technical infrastructure 
            that drives measurable, repeatable results.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get started
            </ButtonLink>
            <PlainButtonLink href="#approach" size="lg">
              Explore the method <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={<TabbedLogoGallery items={galleryItems} />}
      />

      {/* Method - Our Approach */}
      <Approach
        id="approach"
        eyebrow="Our Method"
        headline="A proven four-stage approach to sustainable growth
          "
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

      {/* Stats - Credibility */}
      <StatsWithGraph
        id="stats"
        interactive
        eyebrow="Proven results"
        headline="Marketing that drives measurable growth"
        subheadline={
          <p>
            Magnet helps brands build stronger market positions through strategic branding, high-converting websites,
            and performance-driven campaigns. From startups to enterprise companies, we deliver results that move the
            needle.
          </p>
        }
      />

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonials"
        headline="What our clients are saying
          "
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

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to see the method in action?
          "
        subheadline={
          <p>
            Let's discuss how Magnet's methodology can help build your brand and drive measurable growth.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get started
            </ButtonLink>

            <PlainButtonLink href="/pricing" size="lg">
              View pricing <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}

