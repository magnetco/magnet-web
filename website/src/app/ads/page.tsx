import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Screenshot } from '@/components/elements/screenshot'
import { TabbedLogoGallery, type GalleryItem } from '@/components/elements/tabbed-logo-gallery'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { CaseStudiesPreview } from '@/components/sections/case-studies-preview'
import { FAQsWithChat } from '@/components/sections/faqs-with-chat'
import { FeaturesBentoGrid } from '@/components/sections/features-bento-grid'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { defaultIndustries, IndustriesGrid } from '@/components/sections/industries-grid'
import { PricingAds } from '@/components/sections/pricing-ads'
import { ServiceProcess } from '@/components/sections/service-process'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { client } from '@/lib/sanity/client'
import { caseStudiesByServiceQuery } from '@/lib/sanity/queries'
import type { CaseStudy } from '@/lib/sanity/types'
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

export default async function Page() {
  // Fetch case studies from Sanity
  const paidMediaCaseStudies = await client.fetch<CaseStudy[]>(caseStudiesByServiceQuery, { service: 'paid-media' })

  return (
    <>
      {/* Hero */}
      <HeroCenteredWithDemo
        id="hero"
        withGridBg
        eyebrow={<AnnouncementBadge href="#" text="New: AI-powered ad creation" cta="Learn more" />}
        headline="Create ads that convert and drive real results."
        subheadline={
          <p>
            Design high-performing ads for social media, search, and display. Our platform helps you create, test, and
            optimize ads that actually drive conversions.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Start creating
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
        withGridBg
        headline="Everything you need to create high-performing ads."
        subheadline={
          <p>
            From design to optimization, our platform provides all the tools you need to create ads that convert and
            drive real business results.
          </p>
        }
        features={[
          {
            title: 'Ad Templates',
            description:
              'Hundreds of professionally designed ad templates for every platform and campaign type.',
            href: '#',
            demo: (
              <Screenshot wallpaper="blue" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1800-top-1250.webp"
                  alt="Ad templates"
                  className="bg-white/75 dark:hidden"
                  width={1800}
                  height={1250}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                  alt="Ad templates"
                  width={1800}
                  height={1250}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'A/B Testing',
            description:
              'Test different ad variations to find what works best and optimize your conversion rates.',
            href: '#',
            demo: (
              <Screenshot wallpaper="purple" placement="top-left" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="A/B testing"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="A/B testing"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Performance Analytics',
            description:
              'Track ad performance with detailed analytics and insights to optimize your campaigns.',
            href: '#',
            demo: (
              <Screenshot wallpaper="brown" placement="bottom-left" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Performance analytics"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Performance analytics"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
        ]}
      />

      {/* Pricing */}
      <PricingAds
        id="pricing"
        headline="Invest in predictable growth.
          "
        subheadline={
          <p>
            Choose your platforms and combine them for multi-channel campaigns managed by our expert team.
          </p>
        }
      />

      {/* Process */}
      <ServiceProcess
        id="process"
        service="paid-ads"
        headline="How we create ads that convert
          "
        subheadline={
          <p>
            A proven four-step process to build campaigns that drive real business results.
          </p>
        }
      />

      {/* Case Studies */}
      <CaseStudiesPreview
        id="case-studies"
        eyebrow="Case Studies"
        headline="Campaigns that deliver ROI"
        subheadline={<p>See how we&apos;ve helped brands drive qualified demand through paid media.</p>}
        caseStudies={paidMediaCaseStudies}
        viewAllHref="/work/full-funnel"
        viewAllText="View all paid media work"
      />

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Ads that drive conversions.
          "
        subheadline={
          <p>
            Our ad creation platform helps businesses of all sizes create high-performing ads that drive real results and
            maximize ROI.
          </p>
        }
      >
        <Stat stat="50K+" text="Ads created using our platform." />
        <Stat stat="3.2x" text="Average ROI improvement for our customers." />
      </StatsWithGraph>

      {/* Testimonial */}
      <TestimonialLargeQuote
        id="testimonial"
        quote={
          <p>
            Since using this platform, our ad conversion rates have increased by 40%. The templates are beautiful, and
            the A/B testing features have been invaluable in optimizing our campaigns. Highly recommend!
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
        name="Rachel Kim"
        byline="Marketing Director at GrowthLab"
      />

      {/* FAQs */}
      <FAQsWithChat
        id="faqs"
        eyebrow="Ads FAQ"
        headline="Questions & Answers"
        subheadline="Get answers to common advertising questions, or chat with our AI assistant for personalized guidance."
        questions={[
          { question: 'Which ad platforms are supported?' },
          { question: 'Can I customize the ad templates?' },
          { question: 'How does A/B testing work?' },
          { question: 'Do you provide analytics and reporting?' },
        ]}
      />

      {/* Industries */}
      <IndustriesGrid
        id="industries"
        eyebrow="Industries We Serve"
        headline="Paid media expertise across sectors"
        subheadline={
          <p>
            We run high-performing ad campaigns for companies across industries, with deep knowledge
            of the targeting strategies and messaging that work for each sector.
          </p>
        }
        industries={defaultIndustries.filter((i) =>
          ['ecommerce', 'healthcare', 'professional-services', 'education-technology', 'financial-services', 'manufacturing'].includes(i.slug)
        )}
      />

      {/* Call To Action */}
      <CallToActionWithEmail
        id="call-to-action"
        headline="Ready to create ads that convert?
          "
        subheadline={
          <p>
            Tell us about your advertising goals and we'll help you build campaigns that drive real results and maximize
            ROI.
          </p>
        }
      />
    </>
  )
}

