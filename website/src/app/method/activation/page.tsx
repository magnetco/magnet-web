import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Screenshot } from '@/components/elements/screenshot'
import { TabbedLogoGallery, type GalleryItem } from '@/components/elements/tabbed-logo-gallery'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FeaturesBentoGrid } from '@/components/sections/features-bento-grid'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import Image from 'next/image'

const galleryItems: GalleryItem[] = [
  {
    id: 'quirk',
    logo: (
      <>
        <Image
          src="/img/logos/9-color-black-height-32.svg"
          className="dark:hidden"
          alt="Quirk"
          width={51}
          height={32}
        />
        <Image
          src="/img/logos/9-color-white-height-32.svg"
          className="not-dark:hidden"
          alt="Quirk"
          width={51}
          height={32}
        />
      </>
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
    id: 'concise',
    logo: (
      <>
        <Image
          src="/img/logos/10-color-black-height-32.svg"
          className="dark:hidden"
          alt="Concise"
          width={70}
          height={32}
        />
        <Image
          src="/img/logos/10-color-white-height-32.svg"
          className="not-dark:hidden"
          alt="Concise"
          width={70}
          height={32}
        />
      </>
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
    id: 'anomaly',
    logo: (
      <>
        <Image
          src="/img/logos/11-color-black-height-32.svg"
          className="dark:hidden"
          alt="Anomaly"
          width={100}
          height={32}
        />
        <Image
          src="/img/logos/11-color-white-height-32.svg"
          className="not-dark:hidden"
          alt="Anomaly"
          width={100}
          height={32}
        />
      </>
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
    id: 'pinelabs',
    logo: (
      <>
        <Image
          src="/img/logos/12-color-black-height-32.svg"
          className="dark:hidden"
          alt="Pine Labs"
          width={85}
          height={32}
        />
        <Image
          src="/img/logos/12-color-white-height-32.svg"
          className="not-dark:hidden"
          alt="Pine Labs"
          width={85}
          height={32}
        />
      </>
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
    id: 'orbital',
    logo: (
      <>
        <Image
          src="/img/logos/13-color-black-height-32.svg"
          className="dark:hidden"
          alt="Orbital"
          width={75}
          height={32}
        />
        <Image
          src="/img/logos/13-color-white-height-32.svg"
          className="not-dark:hidden"
          alt="Orbital"
          width={75}
          height={32}
        />
      </>
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
  {
    id: 'artifact',
    logo: (
      <>
        <Image
          src="/img/logos/8-color-black-height-32.svg"
          className="dark:hidden"
          alt="Artifact"
          width={85}
          height={32}
        />
        <Image
          src="/img/logos/8-color-white-height-32.svg"
          className="not-dark:hidden"
          alt="Artifact"
          width={85}
          height={32}
        />
      </>
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
]

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroCenteredWithDemo
        id="hero"
        withGridBg
        eyebrow={<AnnouncementBadge href="#" text="Our Method" cta="Learn more" />}
        headline="Turn on demand and attract qualified traffic into your system."
        subheadline={
          <p>
            Activation is about turning on demand and attracting qualified traffic. Use paid media, search marketing,
            social content, creative storytelling, and strategic partnerships to drive awareness and interest.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Get started
            </ButtonLink>
            <PlainButtonLink href="#" size="lg">
              See examples <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={<TabbedLogoGallery items={galleryItems} />}
      />

      {/* Features */}
      <FeaturesBentoGrid
        id="features"
        headline="Everything you need to activate demand."
        subheadline={
          <p>
            Activation components work together to attract qualified traffic into your system and build a predictable
            pipeline of opportunities.
          </p>
        }
        features={[
          {
            title: 'Paid Media',
            description:
              'Create and manage high-performing advertising campaigns across Google Ads, Meta, LinkedIn, and other platforms. Drive qualified traffic through data-driven paid media strategies.',
            href: '/method/activation/paid-media',
            demo: (
              <Screenshot wallpaper="blue" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1800-top-1250.webp"
                  alt="Paid media dashboard"
                  className="bg-white/75 dark:hidden"
                  width={1800}
                  height={1250}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                  alt="Paid media dashboard"
                  width={1800}
                  height={1250}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Search Marketing',
            description:
              'Improve search engine visibility and drive organic traffic through SEO and search marketing strategies. Optimize content and build quality backlinks.',
            href: '/method/activation/search-marketing',
            demo: (
              <Screenshot wallpaper="purple" placement="top-left" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Search marketing interface"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Search marketing interface"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Social Content',
            description:
              'Build engaging social media presence that connects with your audience and drives meaningful engagement across platforms.',
            href: '/method/activation/social-content',
            demo: (
              <Screenshot wallpaper="green" placement="bottom-left" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Social content dashboard"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Social content dashboard"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Creative Storytelling',
            description:
              'Tell compelling stories that resonate with your audience and build emotional connections that drive action.',
            href: '/method/activation/creative-storytelling',
            demo: (
              <Screenshot wallpaper="brown" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Creative storytelling"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Creative storytelling"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Partnerships',
            description:
              'Develop strategic partnerships that expand your reach and create mutually beneficial growth opportunities.',
            href: '/method/activation/partnerships',
            demo: (
              <Screenshot wallpaper="purple" placement="top-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Partnerships interface"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Partnerships interface"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
        ]}
      />

      {/* Approach */}
      <Approach
        id="approach"
        eyebrow="Our Method"
        headline="Activation components
          "
        subheadline={
          <p>
            Each component works together to attract qualified traffic into your system.
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

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to activate demand?
          "
        subheadline={
          <p>
            Let's turn on demand and attract qualified traffic into your system.
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
