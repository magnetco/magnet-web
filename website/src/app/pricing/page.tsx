import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { Plan, PricingHeroMultiTier } from '@/components/sections/pricing-hero-multi-tier'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import Image from 'next/image'

function plans(option: string) {
  return (
    <>
      <Plan
        name="Starter"
        price={option === 'Monthly' ? '$5K' : '$50K'}
        period={option === 'Monthly' ? '/month' : '/year'}
        subheadline={<p>Emerging brands ready to build their foundation</p>}
        features={[
          'Brand strategy & positioning',
          'Website design & development',
          'Basic SEO setup',
          'Monthly performance reporting',
          'Email support',
        ]}
        cta={
          <SoftButtonLink href="#" size="lg">
            Get started
          </SoftButtonLink>
        }
      />
      <Plan
        name="Growth"
        price={option === 'Monthly' ? '$15K' : '$150K'}
        period={option === 'Monthly' ? '/month' : '/year'}
        subheadline={<p>Scaling brands needing comprehensive marketing</p>}
        badge="Most popular"
        features={[
          'Everything in Starter',
          'Search marketing program',
          'Paid advertising campaigns',
          'Content strategy & creation',
          'Advanced analytics & attribution',
          'Dedicated account manager',
          'Quarterly strategy reviews',
        ]}
        cta={
          <ButtonLink href="#" size="lg">
            Get started
          </ButtonLink>
        }
      />
      <Plan
        name="Enterprise"
        price="Custom"
        period=""
        subheadline={<p>Large organizations requiring full-service support</p>}
        features={[
          'Everything in Growth',
          'Custom marketing systems',
          'Multi-channel campaign management',
          'Advanced data analytics',
          'Dedicated team',
          'Priority support',
          'Custom integrations',
        ]}
        cta={
          <SoftButtonLink href="#" size="lg">
            Contact sales
          </SoftButtonLink>
        }
      />
    </>
  )
}

export default function Page() {
  return (
    <>
      {/* Hero */}
      <PricingHeroMultiTier
        id="pricing"
        headline="Pricing"
        subheadline={
          <p>
            Build a brand that stands out, create websites that convert, and launch campaigns that drive real results —
            all backed by data-driven strategy and proven methodologies.
          </p>
        }
        options={['Monthly', 'Yearly']}
        plans={{ Monthly: plans('Monthly'), Yearly: plans('Yearly') }}
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
      {/* Plan Comparison Table */}
      <PlanComparisonTable
        id="pricing"
        plans={['Starter', 'Growth', 'Enterprise']}
        features={[
          {
            title: 'Branding & Strategy',
            features: [
              {
                name: 'Brand strategy & positioning',
                value: { Starter: true, Growth: true, Enterprise: true },
              },
              { name: 'Visual identity design', value: { Starter: true, Growth: true, Enterprise: true } },
              { name: 'Brand guidelines', value: { Starter: 'Basic', Growth: true, Enterprise: true } },
              {
                name: 'Messaging framework',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Custom brand system',
                value: { Starter: false, Growth: false, Enterprise: true },
              },
            ],
          },
          {
            title: 'Websites & Development',
            features: [
              { name: 'Website design & development', value: { Starter: true, Growth: true, Enterprise: true } },
              {
                name: 'Conversion optimization',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Advanced integrations',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Custom functionality',
                value: { Starter: false, Growth: false, Enterprise: true },
              },
            ],
          },
          {
            title: 'Marketing Programs',
            features: [
              {
                name: 'Search marketing (SEO)',
                value: { Starter: 'Basic', Growth: true, Enterprise: true },
              },
              {
                name: 'Paid advertising',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Content strategy',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Multi-channel campaigns',
                value: { Starter: false, Growth: false, Enterprise: true },
              },
            ],
          },
          {
            title: 'Analytics & Support',
            features: [
              { name: 'Monthly reporting', value: { Starter: true, Growth: true, Enterprise: true } },
              {
                name: 'Advanced analytics',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Account manager',
                value: { Starter: false, Growth: true, Enterprise: true },
              },
              {
                name: 'Dedicated team',
                value: { Starter: false, Growth: false, Enterprise: true },
              },
            ],
          },
        ]}
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
      <FAQsAccordion id="faqs" headline="Questions & Answers">
        <Faq
          id="faq-1"
          question="How do you measure marketing success?"
          answer="We track metrics that matter: conversion rates, customer acquisition cost, lifetime value, and revenue attribution. Every campaign includes clear KPIs and regular reporting so you know exactly what's working and what's driving growth."
        />
        <Faq
          id="faq-2"
          question="Can you work with our existing marketing team?"
          answer="Absolutely. We collaborate seamlessly with in-house teams, providing strategic guidance and execution support. Whether you need full-service support or specific expertise, we adapt to your team structure and workflow."
        />
        <Faq
          id="faq-3"
          question="What makes your approach different?"
          answer="We focus on building sustainable, data-driven marketing systems rather than chasing trends. Our methodology combines strategic foundation, activation, acceleration, and retention—creating marketing that compounds over time, not just quick wins."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results?"
          answer="Results vary by service and market, but most clients see measurable improvements within 30-90 days. Search marketing and paid ads typically show faster initial results, while branding and website work compounds over time. We set clear expectations upfront."
        />
      </FAQsAccordion>
      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline="Have more questions?"
        subheadline={
          <p>Let's discuss how Magnet can help build your brand and drive measurable growth for your business.</p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Chat with us
            </ButtonLink>

            <PlainButtonLink href="#" size="lg">
              Book a demo <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
