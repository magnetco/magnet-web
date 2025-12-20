import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { Approach, ApproachItem, ApproachStage } from '@/components/sections/approach'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithDemo
        id="hero"
        headline="Social Content"
        subheadline={
          <p>
            Create content that engages, educates, and converts. Social content is about creating content that engages, educates, 
            and converts. It&apos;s the system that builds awareness, trust, and relationships with your ideal customers. We build 
            social content systems that go beyond posting—they&apos;re comprehensive strategies that align with how your audience 
            consumes content, when they&apos;re most receptive, and what moves them to action. When social content is done right, 
            it becomes a powerful activation channel that drives qualified traffic into your system.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
              Get started
            </ButtonLink>

            <PlainButtonLink href="#" size="lg">
              See how it works <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={
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
        }
      />

      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="How we build social content"
        headline="Content systems that engage and convert"
        subheadline={
          <p>
            We build social content systems that go beyond posting—they&apos;re comprehensive strategies that align with how your 
            audience consumes content, when they&apos;re most receptive, and what moves them to action. Every piece of content serves 
            a purpose, builds relationships, and guides audiences toward engagement.
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <Screenshot wallpaper="purple" placement="bottom-right">
                  <Image
                    src="/img/screenshots/1-left-1000-top-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1000-top-800.webp"
                    alt=""
                    width={1000}
                    height={800}
                    className="bg-black/75 not-dark:hidden sm:hidden"
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-660.webp"
                    alt=""
                    width={1800}
                    height={660}
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                  />
                  <Image
                    src="/img/screenshots/1-left-1300-top-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                    alt=""
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                    alt=""
                    width={1800}
                    height={1250}
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                  />
                </Screenshot>
              }
              headline="Audience-Aligned Content Strategy"
              subheadline={
                <p>
                  Content that aligns with how your audience consumes content, not how you want to create it. We build social 
                  content strategies that understand when your audience is most receptive, what formats they prefer, and what 
                  moves them to action. This audience-aligned approach means content performs better because it&apos;s designed for 
                  how audiences actually consume content, not arbitrary posting schedules. When content is audience-aligned, it 
                  builds relationships and drives engagement because it meets audiences where they are.
                </p>
              }
              cta={
                <Link href="#">
                  Learn more <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <Screenshot wallpaper="blue" placement="bottom-left">
                  <Image
                    src="/img/screenshots/1-right-1000-top-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
                    alt=""
                    width={1000}
                    height={800}
                    className="bg-black/75 not-dark:hidden sm:hidden"
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
                    alt=""
                    width={1800}
                    height={660}
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                  />
                  <Image
                    src="/img/screenshots/1-right-1300-top-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                    alt=""
                    width={1300}
                    height={1300}
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-1250.webp"
                    alt=""
                    width={1800}
                    height={1250}
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                  />
                </Screenshot>
              }
              headline="Engagement-Focused Content Creation"
              subheadline={
                <p>
                  Content that engages, educates, and converts, not just posts. We build social content systems that create content 
                  with purpose—every piece serves a role in building awareness, trust, or relationships. This engagement-focused approach 
                  means content drives action because it&apos;s designed to move audiences through a journey, not just fill a feed. 
                  When content is engagement-focused, it builds relationships and drives qualified traffic because it provides value 
                  that audiences want to engage with.
                </p>
              }
              cta={
                <Link href="#">
                  Learn more <ArrowNarrowRightIcon />
                </Link>
              }
            />
          </>
        }
      />

      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Proven results"
        headline="Social content that drives engagement and traffic"
        subheadline={
          <p>
            When social content systems align with audience behavior and focus on engagement, they build awareness, trust, and 
            relationships that drive qualified traffic. Our comprehensive approach creates content that performs.
          </p>
        }
      >
        <Stat stat="4.3x" text="Higher engagement rates when content aligns with audience behavior vs. arbitrary posting schedules." />
        <Stat stat="71%" text="Increase in qualified traffic when content is engagement-focused vs. just promotional." />
        <Stat stat="3.0x" text="Better brand awareness when social content builds relationships vs. just broadcasting messages." />
      </StatsWithGraph>

      {/* Testimonials */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="Social content that transformed activation"
        subheadline={
          <p>
            See how comprehensive social content systems have helped brands build awareness, trust, and relationships that drive qualified traffic.
          </p>
        }
      >
        <Testimonial
          quote={
            <p>
              Before working with Magnet, our social content felt like we were just posting to post. The audience-aligned strategy 
              they created understands when our audience is most receptive and what moves them to action. Our engagement rates have 
              quadrupled, and we&apos;re driving much more qualified traffic.
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
          name="Amanda Rodriguez"
          byline="Head of Social Media at EngageCo"
        />
        <Testimonial
          quote={
            <p>
              The engagement-focused content system Magnet built for us has been incredible. Instead of just posting, we&apos;re creating 
              content with purpose that builds relationships. This has made our social presence much more effective, and we&apos;re seeing 
              real results in terms of awareness and qualified traffic.
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
          name="Kevin Park"
          byline="VP of Marketing at ContentLab"
        />
        <Testimonial
          quote={
            <p>
              Magnet&apos;s social content strategy transformed how we approach social media. The audience-aligned approach means our 
              content performs better because it&apos;s designed for how audiences actually consume content. The engagement-focused 
              creation means every piece serves a purpose. Our social presence is now a powerful activation channel.
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
          name="Sarah Kim"
          byline="Director of Social at SocialCo"
        />
      </TestimonialThreeColumnGrid>

      {/* Approach */}
      <Approach
        id="approach"
        eyebrow="Our Method"
        headline="How we build brands"
        subheadline={
          <p>
            We follow a proven four-stage approach to create brands that drive real business results.
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

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="Questions about social content">
        <Faq
          id="faq-1"
          question="What's the difference between social content and just posting?"
          answer="Posting is one-way broadcasting. Social content is comprehensive strategies that align with how audiences consume content, when they're most receptive, and what moves them to action. Content systems create content with purpose—every piece serves a role in building awareness, trust, or relationships. When social content is done right, it builds relationships and drives qualified traffic."
        />
        <Faq
          id="faq-2"
          question="How do you align content with audience behavior?"
          answer="We analyze when your audience is most active, what formats they prefer, what content they engage with, and what moves them to action. Then we build content strategies that align with these behaviors—posting when audiences are receptive, using formats they prefer, and creating content that drives engagement. This audience-aligned approach means content performs better because it's designed for how audiences actually consume content."
        />
        <Faq
          id="faq-3"
          question="What makes content engagement-focused?"
          answer="Engagement-focused content serves a purpose—it builds awareness, educates, entertains, or moves audiences toward action. Every piece of content is designed to drive engagement, not just fill a feed. This means content provides value that audiences want to engage with, creating relationships that drive qualified traffic."
        />
        <Faq
          id="faq-4"
          question="How long does it take to see results from social content?"
          answer="You'll typically see improvements in engagement rates within the first month as audience-aligned strategies are implemented. The real impact—brand awareness, trust, relationships, and qualified traffic—builds over 2-3 months as content systems mature and audiences engage more consistently."
        />
        <Faq
          id="faq-5"
          question="Can social content work for B2B companies?"
          answer="Absolutely. B2B social content is especially valuable because it builds thought leadership, facilitates professional relationships, and drives qualified leads. We build B2B social content systems that align with how professionals consume content, when they're most receptive, and what moves them to engage. B2B social content often becomes a competitive advantage."
        />
        <Faq
          id="faq-6"
          question="How do you measure social content success?"
          answer="We measure success through multiple metrics: engagement rates, reach, brand awareness, website traffic, lead generation, and ultimately, revenue. But the real measure is whether social content builds relationships and drives qualified traffic. We track both quantitative metrics and qualitative outcomes to continuously improve content systems."
        />
      </FAQsTwoColumnAccordion>

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Ready to create social content that engages?"
        subheadline={
          <p>
            Let&apos;s create social content systems that drive activation. Build comprehensive strategies that align with audience 
            behavior and focus on engagement.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="#" size="lg">
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
