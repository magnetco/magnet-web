import { ApproachItem, ApproachStage } from '@/components/sections/approach'

/**
 * Shared Approach section content used across method pages.
 * This eliminates duplication of the four-stage approach structure.
 */
export function ApproachStages() {
  return (
    <>
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
    </>
  )
}

