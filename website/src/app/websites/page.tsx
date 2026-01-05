import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Screenshot } from '@/components/elements/screenshot'
import { TabbedLogoGallery, type GalleryItem } from '@/components/elements/tabbed-logo-gallery'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ServiceProcess } from '@/components/sections/service-process'
import { CallToActionWithEmail } from '@/components/sections/call-to-action-with-email'
import { FeaturesBentoGrid } from '@/components/sections/features-bento-grid'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import { PricingWebsites } from '@/components/sections/pricing-websites'
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
        eyebrow={<AnnouncementBadge href="#" text="New: Custom website templates" cta="Learn more" />}
        headline="Beautiful websites that convert visitors into customers."
        subheadline={
          <p>
            Build stunning, high-performing websites with our collection of professionally designed templates. Every
            template is optimized for conversion and built with modern web standards.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Browse templates
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
        headline="Everything you need to build a stunning website."
        subheadline={
          <p>
            Our templates come with everything you need to launch fast. Responsive design, SEO optimization, and
            conversion-focused layouts built right in.
          </p>
        }
        features={[
          {
            title: 'Responsive Design',
            description:
              'Every template is fully responsive and looks perfect on desktop, tablet, and mobile devices. No additional work required.',
            href: '#',
            demo: (
              <Screenshot wallpaper="blue" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1800-top-1250.webp"
                  alt="Responsive design"
                  className="bg-white/75 dark:hidden"
                  width={1800}
                  height={1250}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                  alt="Responsive design"
                  width={1800}
                  height={1250}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'SEO Optimized',
            description:
              'Built with SEO best practices in mind. Clean code, fast loading times, and semantic HTML help your site rank higher.',
            href: '#',
            demo: (
              <Screenshot wallpaper="purple" placement="top-left" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="SEO optimization"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="SEO optimization"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Conversion Focused',
            description:
              'Every element is designed to convert visitors into customers. Tested layouts, clear CTAs, and optimized forms.',
            href: '#',
            demo: (
              <Screenshot wallpaper="brown" placement="bottom-left" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="Conversion focused"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="Conversion focused"
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
      <PricingWebsites
        id="pricing"
        headline="Invest in your digital presence.
          "
        subheadline={
          <p>
            Choose the right solution for your business—from marketing sites to complex ecommerce platforms.
          </p>
        }
      />

      {/* Process */}
      <ServiceProcess
        id="process"
        service="websites"
        headline="How we build websites that convert
          "
        subheadline={
          <p>
            A proven four-step process to create high-performing websites that drive real business results.
          </p>
        }
      />

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Trusted by thousands"
        headline="Websites that perform.
          "
        subheadline={
          <p>
            Our templates power thousands of websites across industries. From startups to enterprise, businesses trust
            our templates to deliver results.
          </p>
        }
      >
        <Stat stat="10K+" text="Websites launched using our templates." />
        <Stat stat="95%" text="Customer satisfaction rate — our templates just work." />
      </StatsWithGraph>

      {/* Testimonial */}
      <TestimonialTwoColumnWithLargePhoto
        id="testimonial"
        quote={
          <p>
            We launched our new website in just one day using one of the templates. The design is beautiful, and we've
            already seen a 40% increase in conversions. Couldn't be happier with the results.
          </p>
        }
        img={
          <Image
            src="/img/quote-2.webp"
            alt=""
            className="not-dark:bg-white/75 dark:bg-black/75 w-full"
            width={160}
            height={160}
          />
        }
        name="Sarah Chen"
        byline="Founder at TechFlow"
      />

      {/* Call To Action */}
      <CallToActionWithEmail
        id="call-to-action"
        headline="Ready to launch your website?
          "
        subheadline={
          <p>
            Tell us about your project and we'll help you build a website that drives results. All projects are fully
            customizable and designed to convert.
          </p>
        }
      />
    </>
  )
}

