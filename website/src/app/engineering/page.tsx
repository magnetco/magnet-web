import type { Metadata } from 'next'
import Image from 'next/image'
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
import { ServiceProcess } from '@/components/sections/service-process'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { client } from '@/lib/sanity/client'
import { caseStudiesByCategoryQuery } from '@/lib/sanity/queries'
import type { CaseStudy } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Full-Stack Engineering | Magnet',
  description:
    'Enterprise-grade engineering for global brands. Platform development, full-stack applications, and scalable systems serving millions of users.',
}

const galleryItems: GalleryItem[] = [
  {
    id: 'mcgraw-hill',
    logo: (
      <Image
        src="/img/logos/mhe.png"
        alt="McGraw Hill"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="purple" placement="bottom">
        <Image
          src="/img/screenshots/1.webp"
          alt="McGraw Hill platform"
          className="bg-white/75 dark:hidden"
          width={3440}
          height={1990}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive.webp"
          alt="McGraw Hill platform"
          width={3440}
          height={1990}
        />
      </Screenshot>
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
      <Screenshot className="rounded-lg" wallpaper="green" placement="bottom">
        <Image
          src="/img/screenshots/1-left-1300-top-1300.webp"
          alt="HGTV platform"
          className="bg-white/75 dark:hidden"
          width={1300}
          height={1300}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
          alt="HGTV platform"
          width={1300}
          height={1300}
        />
      </Screenshot>
    ),
  },
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
      <Screenshot className="rounded-lg" wallpaper="blue" placement="bottom">
        <Image
          src="/img/screenshots/1-right-1300-top-1300.webp"
          alt="IKEA platform"
          className="bg-white/75 dark:hidden"
          width={1300}
          height={1300}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
          alt="IKEA platform"
          width={1300}
          height={1300}
        />
      </Screenshot>
    ),
  },
  {
    id: 'expedia',
    logo: (
      <Image
        src="/img/logos/lux.png"
        alt="Expedia"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="brown" placement="bottom">
        <Image
          src="/img/screenshots/1-left-1800-top-1250.webp"
          alt="Expedia platform"
          className="bg-white/75 dark:hidden"
          width={1800}
          height={1250}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
          alt="Expedia platform"
          width={1800}
          height={1250}
        />
      </Screenshot>
    ),
  },
  {
    id: 'ucla',
    logo: (
      <Image
        src="/img/logos/oke.png"
        alt="UCLA"
        width={200}
        height={80}
        className="h-full w-auto object-contain"
      />
    ),
    image: (
      <Screenshot className="rounded-lg" wallpaper="purple" placement="bottom">
        <Image
          src="/img/screenshots/1-right-1800-top-1250.webp"
          alt="UCLA platform"
          className="bg-white/75 dark:hidden"
          width={1800}
          height={1250}
        />
        <Image
          className="bg-black/75 not-dark:hidden"
          src="/img/screenshots/1-color-olive-right-1800-top-1250.webp"
          alt="UCLA platform"
          width={1800}
          height={1250}
        />
      </Screenshot>
    ),
  },
]

export default async function EngineeringPage() {
  // Fetch case studies from Sanity
  const engineeringCaseStudies = await client.fetch<CaseStudy[]>(caseStudiesByCategoryQuery, { category: 'engineering' })

  return (
    <>
      {/* Hero */}
      <HeroCenteredWithDemo
        id="hero"
        withGridBg
        eyebrow={<AnnouncementBadge href="/work/mcgraw-hill" text="Case study: McGraw Hill" cta="Read more" />}
        headline="Enterprise engineering that scales with your ambition."
        subheadline={
          <p>
            Full-stack platform development for the world&apos;s most demanding organizations. We build systems that
            serve millions of users with 99.9% uptime and sub-second response times.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Discuss your project
            </ButtonLink>
            <PlainButtonLink href="#case-studies" size="lg">
              See our work <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={<TabbedLogoGallery items={galleryItems} />}
      />

      {/* Features / Capabilities */}
      <FeaturesBentoGrid
        id="capabilities"
        withGridBg
        headline="Deep technical expertise across the full stack."
        subheadline={
          <p>
            From greenfield development to modernizing legacy systems, we bring enterprise-grade engineering to every
            project.
          </p>
        }
        features={[
          {
            title: 'Platform Engineering',
            description:
              'Scalable architectures that handle millions of users. Microservices, event-driven systems, and distributed databases.',
            href: '/work/engineering',
            demo: (
              <Screenshot wallpaper="purple" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1800-top-1250.webp"
                  alt="Platform engineering"
                  className="bg-white/75 dark:hidden"
                  width={1800}
                  height={1250}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                  alt="Platform engineering"
                  width={1800}
                  height={1250}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Full-Stack Development',
            description:
              'Modern web applications with React, Next.js, and Node.js. Type-safe, tested, and built for maintainability.',
            href: '/work/engineering',
            demo: (
              <Screenshot wallpaper="blue" placement="top-left" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Full-stack development"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Full-stack development"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'API Design & Integration',
            description:
              'RESTful and GraphQL APIs that scale. Versioning strategies, documentation, and developer experience as first-class concerns.',
            href: '/work/engineering',
            demo: (
              <Screenshot wallpaper="green" placement="bottom-left" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="API design"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="API design"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'Data Architecture',
            description:
              'PostgreSQL, Redis, Elasticsearch, and data lakes. Schema design, query optimization, and real-time analytics.',
            href: '/work/engineering',
            demo: (
              <Screenshot wallpaper="brown" placement="bottom-right" className="h-full">
                <Image
                  src="/img/screenshots/1-right-1300-top-1300.webp"
                  alt="Data architecture"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                  alt="Data architecture"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
          {
            title: 'DevOps & Infrastructure',
            description:
              'AWS, GCP, and Kubernetes. CI/CD pipelines, infrastructure as code, and zero-downtime deployments.',
            href: '/work/engineering',
            demo: (
              <Screenshot wallpaper="purple" placement="top-right" className="h-full">
                <Image
                  src="/img/screenshots/1-left-1300-top-1300.webp"
                  alt="DevOps"
                  className="bg-white/75 dark:hidden"
                  width={1300}
                  height={1300}
                />
                <Image
                  src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                  alt="DevOps"
                  width={1300}
                  height={1300}
                  className="bg-black/75 not-dark:hidden"
                />
              </Screenshot>
            ),
          },
        ]}
      />

      {/* Process */}
      <ServiceProcess
        id="process"
        service="engineering"
        headline="How we build systems that scale"
        subheadline={
          <p>A proven four-step process to deliver enterprise-grade engineering that drives real business results.</p>
        }
      />

      {/* Case Studies */}
      <CaseStudiesPreview
        id="case-studies"
        eyebrow="Case Studies"
        headline="Engineering that powers global brands"
        subheadline={
          <p>See how we&apos;ve helped industry leaders solve their most complex engineering challenges.</p>
        }
        caseStudies={engineeringCaseStudies}
        viewAllHref="/work/engineering"
        viewAllText="View all engineering work"
      />

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven at scale"
        headline="Engineering that delivers results."
        subheadline={
          <p>
            Our engineering work powers systems serving millions of users, processing billions of requests, and driving
            real business outcomes.
          </p>
        }
      >
        <Stat stat="6M+" text="Users served across our platform builds." />
        <Stat stat="99.9%" text="Average uptime achieved for our clients." />
        <Stat stat="10B+" text="Daily requests handled by systems we've built." />
      </StatsWithGraph>

      {/* Testimonial */}
      <TestimonialLargeQuote
        id="testimonial"
        quote={
          <p>
            The team delivered a platform that transformed how we serve students and educators. Their technical
            expertise and commitment to quality made them an invaluable partner for our most critical systems.
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
        name="David Chen"
        byline="VP of Engineering, McGraw Hill"
      />

      {/* FAQs */}
      <FAQsWithChat
        id="faqs"
        eyebrow="Engineering FAQ"
        headline="Questions & Answers"
        subheadline="Get answers to common engineering questions, or chat with our AI assistant for personalized guidance."
        questions={[
          { question: 'What technologies do you work with?' },
          { question: 'How do you handle large-scale migrations?' },
          { question: 'Can you work with our existing team?' },
          { question: "What's your approach to code quality?" },
          { question: 'How do you price engineering projects?' },
        ]}
      />

      {/* Call To Action */}
      <CallToActionWithEmail
        id="call-to-action"
        headline="Ready to build something great?"
        subheadline={
          <p>
            Tell us about your engineering challenges and we&apos;ll help you build systems that scale, perform, and
            deliver real business value.
          </p>
        }
      />
    </>
  )
}
