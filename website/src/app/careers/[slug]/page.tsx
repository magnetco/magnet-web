import { JobDetail, type JobDetail as JobDetailType } from '@/components/sections/job-detail'

// Sample job data - in a real app, this would come from a CMS or database
const jobData: JobDetailType = {
  id: 'head-of-operations-retail-funds',
  title: 'Head of Operations, Retail Funds',
  type: 'Hybrid / Full Time',
  locations: ['New York City, NY', 'San Francisco, CA'],
  department: 'Asset Management',
  content: {
    headline: 'Opening Retail Access to Venture',
    intro: (
      <>
        <p>
          Innovation builds the future and creates opportunity. Yet everyday investors remain locked out. We're here to
          change that.
        </p>
        <p>
          For decades, only a select few well-connected participants could access America's most promising private
          companies. That changes with USVC: an SEC-registered vehicle designed to open up top-tier, multi-stage venture
          capital to everyone. AngelList is supporting the launch with a strategic partner RIA managing the fund. No
          accreditation. No decades-long lockups. No stacked carry. Just access to tomorrow's defining companies in a
          single ticker.
        </p>
      </>
    ),
    aboutRole: (
      <p>
        You are the engine powering USVC. You will own the end-to-end fund operating model—governance, service-provider
        management, NAV and reporting cycles, audit and filings, distribution and transfer agency coordination. USVC
        will break new ground and this role will require you to write the playbooks, not just follow them. In doing so,
        you will drive innovation, automation and a tech first back office.
      </p>
    ),
    responsibilities: [
      <p key="1">
        Design, document, and run day-to-day fund operations (NAV/reporting, cash & custody, capital activity,
        compliance administration).
      </p>,
      <p key="2">
        Manage service providers (administrator, auditor, custodian, distributor/principal) and board deliverables;
        drive timely public reporting, TSRs, and related filings.
      </p>,
      <p key="3">
        Lead audit planning and execution; maintain PCAOB-grade controls and independence protocols.
      </p>,
      <p key="4">
        Oversee liquidity and repurchase calendars in coordination with portfolio and admin; ensure accurate
        shareholder servicing.
      </p>,
      <p key="5">
        Chair operating cadence with distributor for advertising review and sales enablement.
      </p>,
      <p key="6">
        Build and mentor a high-bar operations team; implement SOPs and risk controls.
      </p>,
    ],
    qualifications: [
      <p key="1">
        '40-Act expertise with 8+ years running operations for registered funds; fluent in board relations, filing
        calendars (N-CSR/N-PORT), TA flows, and quarterly repurchase offers.
      </p>,
      <p key="2">
        Track record leading audits, board cycles, and SEC filings with auditors.
      </p>,
      <p key="3">
        Strong vendor-management skills across admin, custodian, distributor, and counsel.
      </p>,
      <p key="4">Actively applying AI to gain leverage.</p>,
      <p key="5">
        Systems mindset; ability to create effective controls, run-books, and standard operating procedures.
      </p>,
      <p key="6">
        Ability to navigate ambiguity; excellent communication and relationship management skills with trustees and
        regulators.
      </p>,
    ],
    whyJoinUs: (
      <p>
        This is a rare opportunity to reshape how the public invests in innovation. You'll come in at the founding
        level to help build a world-class team at the forefront of venture and fintech, backed by AngelList's platform
        and reputation. If you're ready to build something industry-defining—and unlock access for millions—let's talk.
      </p>
    ),
  },
  applyUrl: '#',
}

export default function Page({ params }: { params: { slug: string } }) {
  // In a real app, you'd fetch the job by slug from a database
  // For now, we'll use the sample data
  return <JobDetail job={jobData} />
}

