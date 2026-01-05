import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { PricingRetainerHero } from '@/components/sections/pricing-retainer-hero'
import { PricingServicesGrid } from '@/components/sections/pricing-services-grid'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import Image from 'next/image'

const MONTHLY_PRICE = 25000
const YEARLY_PRICE = Math.round(MONTHLY_PRICE * 12 * 0.9 / 12) // 10% discount, shown per month

const retainerFeatures = [
  'Brand strategy & positioning',
  'Website design & development',
  'Paid advertising campaigns',
  'Search marketing program',
  'Content strategy & creation',
  'Conversion optimization',
  'Advanced analytics & attribution',
  'Dedicated account team',
  'Monthly strategy reviews',
  'Priority support',
]

export default function Page() {
  return (
    <>
      {/* Retainer Hero */}
      <PricingRetainerHero
        id="retainer"
        withGridBg
        headline="Pricing
          "
        subheadline={
          <p>
            Partner with us for ongoing growth, or engage us for specific deliverables.
            Every engagement is backed by our proven four-phase methodology.
          </p>
        }
        monthlyPrice={MONTHLY_PRICE}
        yearlyPrice={YEARLY_PRICE}
        features={retainerFeatures}
        footer={
          <LogoGrid>
            <Logo>
              <Image
                src="/img/logos/9-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={51}
                height={32}
              />
              <Image
                src="/img/logos/9-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={51}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/10-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={70}
                height={32}
              />
              <Image
                src="/img/logos/10-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={70}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/11-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={100}
                height={32}
              />
              <Image
                src="/img/logos/11-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={100}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/12-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/12-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/13-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={75}
                height={32}
              />
              <Image
                src="/img/logos/13-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={75}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/8-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/8-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
          </LogoGrid>
        }
      />

      {/* Individual Services */}
      <PricingServicesGrid
        id="services"
        headline="Individual Services
          "
        subheadline={
          <p>
            Need a specific capability? Our core services are available as standalone engagements
            with fixed pricing and clear deliverables.
          </p>
        }
      />

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

      {/* FAQs */}
      <FAQsAccordion
        id="faqs"
        headline="Questions & Answers
          "
      >
        <Faq
          id="faq-1"
          question="What's included in the full-service retainer?"
          answer="The retainer includes comprehensive coverage across all four phases of our methodology: Foundation (brand, messaging, website, conversion architecture), Activation (paid media, search marketing, content), Acceleration (landing pages, sales enablement, CRM automation), and Retention (lifecycle email, customer success, analytics). You get a dedicated team working on your growth every month."
        />
        <Faq
          id="faq-2"
          question="How does yearly billing work?"
          answer="When you commit to yearly billing, you receive a 10% discount on the monthly rate. You can pay annually upfront or in quarterly installments. The commitment helps us plan resources and deliver more strategic, long-term work."
        />
        <Faq
          id="faq-3"
          question="Can I start with individual services and upgrade later?"
          answer="Absolutely. Many clients start with a specific need—like branding or a new website—and later move to the full-service retainer as they see results. We'll credit a portion of your initial engagement toward your first retainer months."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results?"
          answer="Results vary by service and market, but most clients see measurable improvements within 30-90 days. Search marketing and paid ads typically show faster initial results, while branding and website work compounds over time. We set clear expectations upfront."
        />
        <Faq
          id="faq-5"
          question="What if I need to pause or cancel?"
          answer="The retainer is month-to-month with no long-term contracts. We ask for 30 days notice to wrap up active work and transition deliverables. For yearly commitments, we offer flexibility to pause for up to 2 months if business circumstances change."
        />
      </FAQsAccordion>

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline="Have more questions?
          "
        subheadline={
          <p>Let's discuss how Magnet can help build your brand and drive measurable growth for your business.</p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Book a strategy call
            </ButtonLink>

            <PlainButtonLink href="/method/foundation" size="lg">
              Explore our method <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
