import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN or SANITY_API_TOKEN environment variable')
  console.error('Create a token at: https://sanity.io/manage/project/o28dq6x5/api#tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'o28dq6x5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// Helper to create portable text blocks
function textBlock(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
    markDefs: [],
  }
}

// Helper to create multiple text blocks from paragraphs
function textBlocks(text: string, keyPrefix: string) {
  return text.split('\n\n').filter(Boolean).map((paragraph, index) => 
    textBlock(`${keyPrefix}-${index}`, paragraph.trim())
  )
}

type CaseStudyCategory = 'engineering' | 'full-funnel' | 'ecommerce' | 'other'
type CaseStudyIndustry = string
type Phase = 'foundation' | 'activation' | 'acceleration' | 'retention'

interface CaseStudyData {
  _id: string
  _type: 'caseStudy'
  title: string
  slug: { _type: 'slug'; current: string }
  client: string
  headline?: string
  description?: string
  category?: CaseStudyCategory
  industry: CaseStudyIndustry
  featured: boolean
  challenge?: ReturnType<typeof textBlock>[]
  solution?: ReturnType<typeof textBlock>[]
  results?: { metric: string; label: string; _key: string }[]
  testimonial?: {
    quote: string
    author: string
    authorRole: string
  }
  services?: string[]
  phases?: Phase[]
  publishedAt: string
}

// Combined case studies from data.ts and markdown files
const caseStudies: CaseStudyData[] = [
  // === ENGINEERING CASE STUDIES ===
  {
    _id: 'case-study-mcgraw-hill',
    _type: 'caseStudy',
    title: 'McGraw Hill Platform Engineering',
    slug: { _type: 'slug', current: 'mcgraw-hill' },
    client: 'McGraw Hill',
    headline: 'Empowering 6 million students with scalable educational technology',
    description: "Comprehensive platform engineering and full-stack development for McGraw Hill's Engrade platforms, delivering powerful, scalable educational technology to K-12 students across 47 states.",
    category: 'engineering',
    industry: 'education',
    featured: true,
    challenge: textBlocks(
      "McGraw Hill needed to modernize their legacy Engrade platform to support millions of concurrent users while maintaining 99.9% uptime requirements. The existing infrastructure couldn't scale to meet growing demand, and the monolithic architecture made it difficult to iterate quickly on new features.",
      'challenge'
    ),
    solution: textBlocks(
      'We architected and built a modern, microservices-based platform using React, Node.js, and PostgreSQL. The new system featured real-time data synchronization, advanced caching strategies, and a distributed architecture that could scale horizontally to meet demand spikes during peak usage periods like back-to-school season.',
      'solution'
    ),
    results: [
      { metric: '6M+', label: 'Students served', _key: 'result1' },
      { metric: '99.9%', label: 'Uptime achieved', _key: 'result2' },
      { metric: '47', label: 'States deployed', _key: 'result3' },
      { metric: '4 years', label: 'Partnership duration', _key: 'result4' },
    ],
    testimonial: {
      quote: 'The team delivered a platform that transformed how we serve students and educators. Their technical expertise and commitment to quality made them an invaluable partner.',
      author: 'David Chen',
      authorRole: 'VP of Engineering, McGraw Hill',
    },
    services: ['platform-engineering', 'full-stack-development', 'api-design', 'data-architecture'],
    phases: ['foundation', 'activation', 'acceleration'],
    publishedAt: '2026-01-01T10:00:00Z',
  },
  {
    _id: 'case-study-hgtv',
    _type: 'caseStudy',
    title: 'HGTV Digital Platform',
    slug: { _type: 'slug', current: 'hgtv' },
    client: 'HGTV',
    headline: "Building the digital home for America's favorite home network",
    description: "Full-stack platform development for HGTV's digital properties, including content management, video streaming infrastructure, and audience engagement features serving millions of monthly visitors.",
    category: 'engineering',
    industry: 'media-entertainment',
    featured: true,
    challenge: textBlocks(
      'HGTV required a unified digital platform that could handle massive traffic spikes during show premieres while delivering rich media content seamlessly across devices. The existing system struggled with video delivery performance and content management complexity.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a headless CMS architecture with optimized video streaming capabilities, implementing CDN strategies and adaptive bitrate streaming. The platform featured real-time content updates, personalized recommendations, and integration with their broadcast scheduling systems.',
      'solution'
    ),
    results: [
      { metric: '15M+', label: 'Monthly visitors', _key: 'result1' },
      { metric: '40%', label: 'Faster load times', _key: 'result2' },
      { metric: '3x', label: 'Video engagement increase', _key: 'result3' },
    ],
    testimonial: {
      quote: 'They understood our unique challenges as a media company and delivered a platform that our content teams love to use.',
      author: 'Jennifer Martinez',
      authorRole: 'Digital Director, HGTV',
    },
    services: ['platform-engineering', 'content', 'full-stack-development'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-02T10:00:00Z',
  },
  {
    _id: 'case-study-ikea',
    _type: 'caseStudy',
    title: 'IKEA North America Commerce',
    slug: { _type: 'slug', current: 'ikea' },
    client: 'IKEA',
    headline: "Scaling digital commerce for the world's largest furniture retailer",
    description: "Enterprise-scale platform engineering for IKEA's North American digital commerce operations, handling millions of SKUs and complex inventory management across distribution centers.",
    category: 'engineering',
    industry: 'retail-ecommerce',
    featured: true,
    challenge: textBlocks(
      "IKEA needed to unify their fragmented digital commerce systems across North America while maintaining real-time inventory accuracy across hundreds of locations. The system needed to handle Black Friday-level traffic while providing accurate delivery estimates.",
      'challenge'
    ),
    solution: textBlocks(
      'We developed a unified commerce platform with real-time inventory synchronization, sophisticated delivery estimation algorithms, and a scalable microservices architecture. The system integrated with warehouse management systems, logistics partners, and in-store systems.',
      'solution'
    ),
    results: [
      { metric: '50M+', label: 'SKUs managed', _key: 'result1' },
      { metric: '99.7%', label: 'Inventory accuracy', _key: 'result2' },
      { metric: '200+', label: 'Locations integrated', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The platform handles our most demanding periods without breaking a sweat. A true enterprise-grade solution.',
      author: 'Erik Lindqvist',
      authorRole: 'Head of Digital Operations, IKEA North America',
    },
    services: ['ecommerce-platform', 'platform-engineering', 'api-design'],
    phases: ['foundation', 'acceleration'],
    publishedAt: '2026-01-03T10:00:00Z',
  },
  {
    _id: 'case-study-expedia',
    _type: 'caseStudy',
    title: 'Expedia Search Infrastructure',
    slug: { _type: 'slug', current: 'expedia' },
    client: 'Expedia',
    headline: 'Powering travel search for millions of travelers worldwide',
    description: "High-performance search and booking infrastructure for Expedia's travel platform, optimizing for sub-second response times across billions of travel options.",
    category: 'engineering',
    industry: 'travel-hospitality',
    featured: false,
    challenge: textBlocks(
      "Expedia's search infrastructure needed to query millions of travel options in real-time while providing personalized results. The existing system had latency issues during peak booking seasons and struggled with the complexity of multi-leg itineraries.",
      'challenge'
    ),
    solution: textBlocks(
      'We rebuilt the search infrastructure using Elasticsearch with custom ranking algorithms, implemented aggressive caching strategies, and developed a real-time pricing engine that could handle thousands of concurrent searches while maintaining sub-200ms response times.',
      'solution'
    ),
    results: [
      { metric: '<200ms', label: 'Search response time', _key: 'result1' },
      { metric: '10B+', label: 'Daily search queries', _key: 'result2' },
      { metric: '35%', label: 'Conversion improvement', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The search performance improvements directly impacted our bottom line. Users find what they need faster, and that translates to bookings.',
      author: 'Michael Torres',
      authorRole: 'VP of Engineering, Expedia',
    },
    services: ['platform-engineering', 'api-design', 'data-architecture'],
    phases: ['foundation', 'acceleration'],
    publishedAt: '2026-01-04T10:00:00Z',
  },
  {
    _id: 'case-study-ucla',
    _type: 'caseStudy',
    title: 'UCLA Student Portal',
    slug: { _type: 'slug', current: 'ucla' },
    client: 'UCLA',
    headline: 'Modernizing the digital experience for 45,000 students',
    description: "Complete digital transformation of UCLA's student-facing systems, creating a unified portal for enrollment, course management, and campus services.",
    category: 'engineering',
    industry: 'education',
    featured: false,
    challenge: textBlocks(
      "UCLA's student systems were fragmented across dozens of legacy applications, creating a frustrating experience for students and staff. The university needed a unified platform that met strict accessibility requirements while integrating with existing administrative systems.",
      'challenge'
    ),
    solution: textBlocks(
      "We designed and built a modern student portal using React and Node.js, with deep integrations into UCLA's student information system, learning management platform, and campus services. The platform was built with WCAG 2.1 AA compliance from the ground up.",
      'solution'
    ),
    results: [
      { metric: '45K+', label: 'Students served', _key: 'result1' },
      { metric: '92%', label: 'User satisfaction', _key: 'result2' },
      { metric: 'WCAG 2.1', label: 'Accessibility compliance', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Working with a bright, eager team, their passion for their work, and their passion for our work, was truly remarkable. Issues we thought that were intractable were solved with elegant and innovative design ideas. Integration with legacy systems proceeded much more smoothly than anyone anticipated. At every turn, their work was professional and exceptional.',
      author: 'Matthew Fisher',
      authorRole: 'Associate Professor, UCLA',
    },
    services: ['platform-engineering', 'full-stack-development', 'website'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-05T10:00:00Z',
  },

  // === FULL-FUNNEL CASE STUDIES ===
  {
    _id: 'case-study-anomaly-ventures',
    _type: 'caseStudy',
    title: 'Anomaly Ventures Brand Launch',
    slug: { _type: 'slug', current: 'anomaly-ventures' },
    client: 'Anomaly Ventures',
    headline: 'Building a category-defining brand for a new venture firm',
    description: 'Complete brand and digital transformation for Anomaly Ventures, from positioning strategy through website launch and demand generation.',
    category: 'full-funnel',
    industry: 'venture-capital',
    featured: true,
    challenge: textBlocks(
      'Anomaly Ventures was launching in a crowded VC market and needed to establish a distinctive brand identity that would attract both founders and LPs. They had no existing digital presence and needed to build credibility quickly.',
      'challenge'
    ),
    solution: textBlocks(
      'We developed a comprehensive brand strategy that positioned them as "the venture firm for unconventional founders." This informed a bold visual identity and website design, followed by targeted LinkedIn campaigns and SEO-optimized content that established thought leadership.',
      'solution'
    ),
    results: [
      { metric: '240%', label: 'Increase in qualified leads', _key: 'result1' },
      { metric: '$50M', label: 'Fund commitments influenced', _key: 'result2' },
      { metric: '#1', label: 'Google ranking for key terms', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet helped us build a brand that truly represents who we are. The results speak for themselves.',
      author: 'Jordan Rogers',
      authorRole: 'Founder, Anomaly Ventures',
    },
    services: ['branding', 'website', 'paid-media', 'search-marketing'],
    phases: ['foundation', 'activation', 'acceleration'],
    publishedAt: '2026-01-06T10:00:00Z',
  },
  {
    _id: 'case-study-pine-labs',
    _type: 'caseStudy',
    title: 'Pine Labs Revenue Transformation',
    slug: { _type: 'slug', current: 'pine-labs' },
    client: 'Pine Labs',
    headline: 'Tripling pipeline through systematic growth architecture',
    description: 'Full-funnel revenue transformation for Pine Labs, optimizing every stage from awareness through customer retention.',
    category: 'full-funnel',
    industry: 'saas',
    featured: true,
    challenge: textBlocks(
      "Pine Labs had strong product-market fit but struggled to scale their marketing efficiently. Their website had a 0.8% conversion rate, paid campaigns weren't profitable, and they lacked visibility into what was actually driving revenue.",
      'challenge'
    ),
    solution: textBlocks(
      'We rebuilt their website with conversion-optimized landing pages, implemented a structured paid media program across Google and LinkedIn, and set up HubSpot automation for lead nurturing. A custom attribution model finally gave them clarity on ROI.',
      'solution'
    ),
    results: [
      { metric: '3.2x', label: 'Pipeline increase', _key: 'result1' },
      { metric: '4.1%', label: 'Website conversion rate', _key: 'result2' },
      { metric: '2.8x', label: 'ROAS improvement', _key: 'result3' },
    ],
    testimonial: {
      quote: 'For the first time, we can actually see which marketing investments are driving revenue. Game changer.',
      author: 'Lynn Marshall',
      authorRole: 'CMO, Pine Labs',
    },
    services: ['website', 'paid-media', 'crm-automation', 'analytics'],
    phases: ['foundation', 'activation', 'acceleration', 'retention'],
    publishedAt: '2026-01-07T10:00:00Z',
  },
  {
    _id: 'case-study-concise-ai',
    _type: 'caseStudy',
    title: 'Concise AI Search Dominance',
    slug: { _type: 'slug', current: 'concise-ai' },
    client: 'Concise AI',
    headline: 'Dominating search for an emerging AI category',
    description: 'Aggressive search marketing and content strategy that established Concise AI as the category leader in their niche.',
    category: 'full-funnel',
    industry: 'ai-technology',
    featured: false,
    challenge: textBlocks(
      'Concise AI was competing against well-funded competitors in the AI space. Despite having a superior product, they were invisible in search results and losing deals to companies with better brand recognition.',
      'challenge'
    ),
    solution: textBlocks(
      'We developed a comprehensive SEO strategy targeting high-intent keywords, created a content engine that published 2-3 pieces weekly, and ran targeted paid campaigns to capture demand while organic rankings built.',
      'solution'
    ),
    results: [
      { metric: '450%', label: 'Organic traffic increase', _key: 'result1' },
      { metric: '67', label: 'First page rankings', _key: 'result2' },
      { metric: '$2.1M', label: 'Pipeline from search', _key: 'result3' },
    ],
    testimonial: {
      quote: 'We went from invisible to owning the conversation in our category. The organic traffic alone has been transformative.',
      author: 'Sarah Kim',
      authorRole: 'CEO, Concise AI',
    },
    services: ['search-marketing', 'content', 'paid-media'],
    phases: ['activation', 'acceleration'],
    publishedAt: '2026-01-08T10:00:00Z',
  },

  // === ECOMMERCE CASE STUDIES ===
  {
    _id: 'case-study-gorilla-glue',
    _type: 'caseStudy',
    title: 'Gorilla Glue Digital Platform',
    slug: { _type: 'slug', current: 'gorilla-glue' },
    client: 'Gorilla Glue',
    headline: 'Anchoring the digital experience for a $400M brand',
    description: "Modern marketing website and e-commerce platform that serves as the digital hub for Gorilla Glue's consumer engagement and direct sales.",
    category: 'ecommerce',
    industry: 'consumer-products',
    featured: true,
    challenge: textBlocks(
      "Gorilla Glue's digital presence didn't match their market leadership. The website was outdated, product information was difficult to find, and they were missing opportunities to capture direct consumer relationships.",
      'challenge'
    ),
    solution: textBlocks(
      'We built a comprehensive digital platform featuring rich product experiences, a project inspiration hub, and integrated e-commerce capabilities. The site became a destination for DIYers and professionals alike.',
      'solution'
    ),
    results: [
      { metric: '185%', label: 'Direct sales increase', _key: 'result1' },
      { metric: '4.2min', label: 'Average time on site', _key: 'result2' },
      { metric: '52%', label: 'Return visitor rate', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Our website finally reflects the quality of our products. Customers love the new experience.',
      author: 'Michael Torres',
      authorRole: 'VP Digital, Gorilla Glue',
    },
    services: ['ecommerce-platform', 'website', 'search-marketing', 'paid-media'],
    phases: ['foundation', 'activation', 'acceleration'],
    publishedAt: '2026-01-09T10:00:00Z',
  },
  {
    _id: 'case-study-kroger',
    _type: 'caseStudy',
    title: 'Kroger Checkout Optimization',
    slug: { _type: 'slug', current: 'kroger' },
    client: 'Kroger',
    headline: "Optimizing checkout for America's largest grocer",
    description: "Conversion rate optimization and performance engineering for Kroger's online grocery platform, improving the path to purchase for millions of customers.",
    category: 'ecommerce',
    industry: 'grocery-retail',
    featured: true,
    challenge: textBlocks(
      "Kroger's online grocery checkout had a high abandonment rate, particularly on mobile devices. Page load times were slow, and the multi-step checkout process frustrated customers.",
      'challenge'
    ),
    solution: textBlocks(
      'We streamlined the checkout flow from 7 steps to 3, implemented progressive loading for faster perceived performance, and redesigned the mobile experience with one-thumb navigation in mind.',
      'solution'
    ),
    results: [
      { metric: '28%', label: 'Checkout conversion lift', _key: 'result1' },
      { metric: '2.1s', label: 'Faster page loads', _key: 'result2' },
      { metric: '$47M', label: 'Incremental annual revenue', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The checkout improvements paid for themselves within the first month. Outstanding ROI.',
      author: 'Amanda Chen',
      authorRole: 'Director of Digital Experience, Kroger',
    },
    services: ['ecommerce-platform', 'website', 'analytics'],
    phases: ['acceleration'],
    publishedAt: '2026-01-10T10:00:00Z',
  },
  {
    _id: 'case-study-artifact-home',
    _type: 'caseStudy',
    title: 'Artifact Home DTC Launch',
    slug: { _type: 'slug', current: 'artifact-home' },
    client: 'Artifact Home',
    headline: 'Launching a premium DTC furniture brand',
    description: 'End-to-end brand and e-commerce build for Artifact Home, a new direct-to-consumer furniture company targeting design-conscious millennials.',
    category: 'ecommerce',
    industry: 'home-furniture',
    featured: false,
    challenge: textBlocks(
      'Artifact Home was launching into the competitive DTC furniture space with no existing brand awareness. They needed a compelling brand identity, a best-in-class Shopify store, and a launch strategy that would generate immediate traction.',
      'challenge'
    ),
    solution: textBlocks(
      'We developed their brand identity and visual language, built a custom Shopify Plus store with AR product visualization, and executed a coordinated launch campaign across paid social, influencer partnerships, and email.',
      'solution'
    ),
    results: [
      { metric: '$1.2M', label: 'First year revenue', _key: 'result1' },
      { metric: '4.8%', label: 'Email conversion rate', _key: 'result2' },
      { metric: '3.4x', label: 'ROAS on paid social', _key: 'result3' },
    ],
    testimonial: {
      quote: "They built us a brand and business from scratch. We couldn't have asked for better partners.",
      author: 'Amanda Chen',
      authorRole: 'Founder, Artifact Home',
    },
    services: ['branding', 'ecommerce-platform', 'paid-media', 'email-marketing'],
    phases: ['foundation', 'activation', 'retention'],
    publishedAt: '2026-01-11T10:00:00Z',
  },

  // === MARKDOWN CASE STUDIES WITH REAL TESTIMONIALS ===
  {
    _id: 'case-study-directions-group',
    _type: 'caseStudy',
    title: 'Directions Group Website Redesign',
    slug: { _type: 'slug', current: 'directions-group' },
    client: 'Directions Group',
    headline: 'Refreshed the digital presence for a leading business insights firm',
    description: 'Directions Group, a leading Cincinnati-based business insights and analytics firm, had outgrown their digital presence. We partnered to deliver a complete transformation.',
    category: 'full-funnel',
    industry: 'professional-services',
    featured: true,
    challenge: textBlocks(
      'Directions Group, a leading Cincinnati-based business insights and analytics firm, had outgrown their digital presence. With new service offerings to showcase and a brand that no longer reflected their market position, they needed more than a refresh—they needed a complete transformation.',
      'challenge'
    ),
    solution: textBlocks(
      'We partnered closely with the Directions team to identify what made them distinct, then conducted aggressive competitor research to understand how similar firms address customer pain points. The result: a custom Webflow build optimized for speed, clarity, and conversion—with HubSpot and Google Analytics integrations for seamless lead management and performance tracking.',
      'solution'
    ),
    results: [
      { metric: '23%', label: 'Increase in decision-stage conversions', _key: 'result1' },
      { metric: '2.8x', label: 'Increase in ad click-through rate', _key: 'result2' },
      { metric: '156%', label: 'Organic traffic growth', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet Co transformed our website and brand with creativity, collaboration, and expertise. Gavin and his team brought our vision to life, elevating every detail. Highly recommend.',
      author: 'Emily Shephard',
      authorRole: 'Creative Director, Directions Group',
    },
    services: ['branding', 'website', 'analytics', 'crm-automation'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-12T10:00:00Z',
  },
  {
    _id: 'case-study-cvg',
    _type: 'caseStudy',
    title: 'Commercial Vehicle Group Ecommerce',
    slug: { _type: 'slug', current: 'cvg' },
    client: 'Commercial Vehicle Group (CVG)',
    headline: 'Built seamless automotive ecommerce for a NASDAQ-traded corporation',
    description: 'Commercial Vehicle Group (CVG) is a publicly traded manufacturer of electrical systems, seating, and trim components for commercial vehicles. Their aftermarket parts division needed a modern ecommerce platform.',
    category: 'ecommerce',
    industry: 'automotive',
    featured: false,
    challenge: textBlocks(
      'Commercial Vehicle Group (CVG) is a publicly traded manufacturer of electrical systems, seating, and trim components for commercial vehicles. Their aftermarket parts division needed a modern ecommerce platform that could handle complex B2B transactions while serving individual customers.',
      'challenge'
    ),
    solution: textBlocks(
      'We designed an ecommerce system that accommodates the diverse needs of commercial vehicle aftermarket buyers. The platform includes sophisticated search and filtering for technical specifications while maintaining simplicity for users who know exactly what they need.',
      'solution'
    ),
    results: [
      { metric: '340%', label: 'Online revenue growth', _key: 'result1' },
      { metric: '67%', label: 'Reduction in support tickets', _key: 'result2' },
      { metric: '12K+', label: 'Parts searchable online', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet is a highly strategic web design agency and anticipate where we need to go instead of just executing the tasks we request.',
      author: 'Rich Tajer',
      authorRole: 'CCO & President, CVG',
    },
    services: ['ecommerce-platform', 'website', 'api-design'],
    phases: ['foundation'],
    publishedAt: '2026-01-13T10:00:00Z',
  },
  {
    _id: 'case-study-enthusiast-auto',
    _type: 'caseStudy',
    title: 'Enthusiast Auto Group Website',
    slug: { _type: 'slug', current: 'enthusiast-auto' },
    client: 'Enthusiast Auto Group',
    headline: "Built a premium digital experience for Cincinnati's specialist BMW M-series dealer",
    description: "Enthusiast Auto Group (EAG) is Cincinnati's leading specialist in rare and collectible BMW M-series vehicles. Their reputation for meticulous restoration and technical expertise is unmatched—but their website didn't reflect it.",
    category: 'other',
    industry: 'automotive',
    featured: false,
    challenge: textBlocks(
      "Enthusiast Auto Group (EAG) is Cincinnati's leading specialist in rare and collectible BMW M-series vehicles. Their reputation for meticulous restoration and technical expertise is unmatched—but their website didn't reflect it. Potential buyers looking at $80,000+ collector cars expect a digital experience that matches the product quality.",
      'challenge'
    ),
    solution: textBlocks(
      "We immersed ourselves in EAG's world, spending time at their facility to understand their meticulous approach to vehicle restoration and sales. The interface echoes BMW's own design philosophy: refined, purposeful, and obsessively detailed.",
      'solution'
    ),
    results: [
      { metric: '47%', label: 'Increase in qualified leads', _key: 'result1' },
      { metric: '35%', label: 'Increase in avg time on vehicle pages', _key: 'result2' },
      { metric: '68%', label: 'Improvement in mobile engagement', _key: 'result3' },
      { metric: '52%', label: 'Reduction in bounce rate', _key: 'result4' },
    ],
    testimonial: {
      quote: 'The new site captures the essence of what we do. Our customers notice the difference immediately, and it shows in our sales.',
      author: 'Rob Gillespie',
      authorRole: 'Owner, Enthusiast Auto Group',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-14T10:00:00Z',
  },
  {
    _id: 'case-study-windward-bank',
    _type: 'caseStudy',
    title: 'Windward Bank Digital Platform',
    slug: { _type: 'slug', current: 'windward-bank' },
    client: 'Windward Bank',
    headline: 'Built a cutting-edge digital banking platform for a century-old institution',
    description: "Windward Bank, a community bank with over a century of history, needed to modernize their digital presence without losing the trust and relationships that define community banking.",
    category: 'other',
    industry: 'financial-services',
    featured: false,
    challenge: textBlocks(
      "Windward Bank, a community bank with over a century of history, needed to modernize their digital presence without losing the trust and relationships that define community banking. Their existing website didn't meet modern security standards or customer expectations for digital banking.",
      'challenge'
    ),
    solution: textBlocks(
      'We designed a banking platform that balances security, usability, and brand heritage. The implementation prioritized modern, secure architecture meeting banking compliance requirements, clear information hierarchy, and mobile-optimized experience for banking on the go.',
      'solution'
    ),
    results: [
      { metric: '89%', label: 'Customer satisfaction score', _key: 'result1' },
      { metric: '156%', label: 'Mobile banking adoption', _key: 'result2' },
      { metric: '34%', label: 'Increase in online applications', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet moved with speed, clarity, and technical precision. Their team delivered a modern, secure bank website that exceeded our expectations—and they made the process feel effortless from start to finish.',
      author: 'Joanna Dimmick',
      authorRole: 'Marketing Director, Windward Bank',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-15T10:00:00Z',
  },
  {
    _id: 'case-study-katz-teller',
    _type: 'caseStudy',
    title: 'Katz Teller Law Firm Website',
    slug: { _type: 'slug', current: 'katz-teller' },
    client: 'Katz Teller',
    headline: 'Refreshed the digital presence for an established Cincinnati law firm',
    description: "Katz Teller is a well-established Cincinnati law firm with a strong reputation built over decades of practice. Their website, however, hadn't kept pace with their growth or their clients' expectations.",
    category: 'other',
    industry: 'legal',
    featured: false,
    challenge: textBlocks(
      "Katz Teller is a well-established Cincinnati law firm with a strong reputation built over decades of practice. Their website, however, hadn't kept pace with their growth or their clients' expectations. For law firms, the website is often the first touchpoint with potential clients during a stressful time.",
      'challenge'
    ),
    solution: textBlocks(
      'We designed a site that balances the gravitas appropriate to legal services with the warmth that helps clients feel comfortable reaching out. The information architecture makes it easy for visitors to understand the firm\'s practice areas and find attorneys with relevant experience.',
      'solution'
    ),
    results: [
      { metric: '78%', label: 'Increase in consultation requests', _key: 'result1' },
      { metric: '3.5min', label: 'Avg time on site', _key: 'result2' },
      { metric: '45%', label: 'More attorney profile views', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The new website perfectly represents our firm—professional yet approachable. We\'ve seen a significant uptick in quality inquiries.',
      author: 'David Katz',
      authorRole: 'Managing Partner, Katz Teller',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-16T10:00:00Z',
  },
  {
    _id: 'case-study-luxottica',
    _type: 'caseStudy',
    title: 'OneSight Foundation Website',
    slug: { _type: 'slug', current: 'luxottica' },
    client: 'Luxottica Foundation (OneSight)',
    headline: 'Built an eyesight charity foundation website for a global eyewear brand',
    description: "Luxottica, the world's largest eyewear company, operates OneSight—a charitable foundation dedicated to providing vision care to underserved communities globally.",
    category: 'other',
    industry: 'nonprofit',
    featured: false,
    challenge: textBlocks(
      "Luxottica, the world's largest eyewear company, operates OneSight—a charitable foundation dedicated to providing vision care to underserved communities globally. They needed a website that would communicate the foundation's mission, engage donors, and share the impact of their work around the world.",
      'challenge'
    ),
    solution: textBlocks(
      'We designed an experience that leads with impact—showing visitors the tangible difference OneSight makes in communities worldwide. The storytelling approach balances emotional connection with the credibility that comes from scale and measurement.',
      'solution'
    ),
    results: [
      { metric: '215%', label: 'Increase in donations', _key: 'result1' },
      { metric: '89K', label: 'New email subscribers', _key: 'result2' },
      { metric: '4.2x', label: 'Social sharing increase', _key: 'result3' },
    ],
    testimonial: {
      quote: 'I really enjoyed working with Magnet. They helped us completely revamp our website for the better. They always respond in a timely fashion and go above and beyond to help.',
      author: 'Corbin Watts',
      authorRole: 'Marketing Manager, OneSight',
    },
    services: ['website', 'branding', 'content'],
    phases: ['foundation'],
    publishedAt: '2026-01-17T10:00:00Z',
  },
  {
    _id: 'case-study-brandience',
    _type: 'caseStudy',
    title: 'Brandience Agency Website',
    slug: { _type: 'slug', current: 'brandience' },
    client: 'Brandience',
    headline: 'Refreshed the digital presence for a full-service franchise marketing agency',
    description: 'Brandience is a Cincinnati-based advertising agency specializing in retail, restaurant, and franchise industries. Their existing website had grown stale and no longer reflected their creative capabilities.',
    category: 'full-funnel',
    industry: 'professional-services',
    featured: false,
    challenge: textBlocks(
      'Brandience is a Cincinnati-based advertising agency specializing in retail, restaurant, and franchise industries. Their existing website had grown stale and no longer reflected their creative capabilities or strategic depth.',
      'challenge'
    ),
    solution: textBlocks(
      "We worked closely with Brandience's leadership to understand their positioning and the outcomes they drive for clients. The design process focused on letting their work speak for itself while providing clear pathways for different prospect types.",
      'solution'
    ),
    results: [
      { metric: '167%', label: 'Increase in RFP submissions', _key: 'result1' },
      { metric: '42%', label: 'Lower bounce rate', _key: 'result2' },
      { metric: '3.8min', label: 'Avg session duration', _key: 'result3' },
    ],
    testimonial: {
      quote: 'We hired the Magnet agency to refresh the design of the website and inject creativity into the digital presence of the brand. We love the site and feel like it represents our company well. All of the going-in goals were achieved.',
      author: 'Brian McHale',
      authorRole: 'CEO, Brandience',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-18T10:00:00Z',
  },
  {
    _id: 'case-study-florence-yalls',
    _type: 'caseStudy',
    title: "Florence Y'alls Baseball Website",
    slug: { _type: 'slug', current: 'florence-yalls' },
    client: "Florence Y'alls",
    headline: 'Built a vibrant Jamstack website for a local baseball team',
    description: "The Florence Y'alls, a popular independent baseball team in Northern Kentucky, needed a website that captured their fun, community-focused brand while handling the operational demands of a sports franchise.",
    category: 'other',
    industry: 'sports-entertainment',
    featured: false,
    challenge: textBlocks(
      "The Florence Y'alls, a popular independent baseball team in Northern Kentucky, needed a website that captured their fun, community-focused brand while handling the operational demands of a sports franchise: ticket sales, merchandise, game schedules, and real-time standings.",
      'challenge'
    ),
    solution: textBlocks(
      "We designed an experience that embodies the Y'alls' energetic personality while providing fans with everything they need. The Jamstack architecture delivers fast load times for game-day traffic spikes and integrated Shopify store for merchandise and tickets.",
      'solution'
    ),
    results: [
      { metric: '234%', label: 'Online ticket sales increase', _key: 'result1' },
      { metric: '89%', label: 'Mobile traffic share', _key: 'result2' },
      { metric: '156%', label: 'Merchandise revenue growth', _key: 'result3' },
    ],
    testimonial: {
      quote: 'We had the pleasure of working with Magnet and have nothing but great things to say! They were able to take our ideas and bring them to life in a speedy manner and we absolutely love how the final product turned out. They are very responsive and extremely enjoyable to work with.',
      author: 'David Delbello',
      authorRole: 'Managing Director, Florence Y\'alls',
    },
    services: ['website', 'ecommerce-platform'],
    phases: ['foundation'],
    publishedAt: '2026-01-19T10:00:00Z',
  },
  {
    _id: 'case-study-process-quickly',
    _type: 'caseStudy',
    title: 'Process Quickly Therapeutic Web App',
    slug: { _type: 'slug', current: 'process-quickly' },
    client: 'Process Quickly',
    headline: 'Built a therapeutic web application for emotional processing and CBT',
    description: 'Process Quickly was founded by a New York-based therapist who wanted to extend the reach of cognitive-behavioral therapy (CBT) beyond traditional session formats.',
    category: 'engineering',
    industry: 'healthcare',
    featured: false,
    challenge: textBlocks(
      'Process Quickly was founded by a New York-based therapist who wanted to extend the reach of cognitive-behavioral therapy (CBT) beyond traditional session formats. The vision: a web application that could guide users through personalized therapeutic exercises using art and structured reflection.',
      'challenge'
    ),
    solution: textBlocks(
      'We began with extensive discovery to understand the therapeutic methodology and target user needs. We developed the full-stack application with careful attention to micro-interactions that make therapeutic exercises feel supportive rather than clinical.',
      'solution'
    ),
    results: [
      { metric: '78%', label: 'User retention rate', _key: 'result1' },
      { metric: '4.8', label: 'App store rating', _key: 'result2' },
      { metric: '12K+', label: 'Active monthly users', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet has been a great partner in building a web based app and understands fully what goes into making a high quality website. As a strategic web agency they have a good sense of both the logistical and creative requirements of executing on an idea.',
      author: 'Ruben Mussafi',
      authorRole: 'Owner, Process Quickly',
    },
    services: ['branding', 'website', 'full-stack-development'],
    phases: ['foundation'],
    publishedAt: '2026-01-20T10:00:00Z',
  },
  {
    _id: 'case-study-bsi-engineering',
    _type: 'caseStudy',
    title: 'BSI Engineering Website',
    slug: { _type: 'slug', current: 'bsi-engineering' },
    client: 'BSI Engineering',
    headline: 'Modernized the digital presence for a regional engineering firm',
    description: 'BSI Engineering is a well-established civil and structural engineering firm serving clients across the Midwest. They needed a website that would showcase their technical capabilities while generating qualified leads.',
    category: 'other',
    industry: 'professional-services',
    featured: false,
    challenge: textBlocks(
      'BSI Engineering is a well-established civil and structural engineering firm serving clients across the Midwest. Their existing website was outdated and failed to communicate the depth of their expertise or the scale of projects they handle.',
      'challenge'
    ),
    solution: textBlocks(
      'We designed a professional website that emphasizes BSI\'s project portfolio and technical credentials. The site features comprehensive project galleries organized by sector, detailed service descriptions, and lead generation pathways for different client segments.',
      'solution'
    ),
    results: [
      { metric: '89%', label: 'Increase in RFP requests', _key: 'result1' },
      { metric: '156%', label: 'Growth in organic traffic', _key: 'result2' },
      { metric: '3.2min', label: 'Avg session duration', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Gavin and his team did an amazing job with our site, they took the time to listen to our desires and worked tirelessly to bring them to life. We at BSI Engineering couldn\'t be happier with the result. A true professional team at a great value!',
      author: 'Chris Hensley',
      authorRole: 'Principal, BSI Engineering',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-21T10:00:00Z',
  },
  {
    _id: 'case-study-gotham-soccer',
    _type: 'caseStudy',
    title: 'Gotham Soccer Club Website',
    slug: { _type: 'slug', current: 'gotham-soccer' },
    client: 'Gotham Soccer Club',
    headline: "Built an engaging website for New York's premier women's soccer team",
    description: "Gotham Soccer Club (formerly Sky Blue FC) is a professional women's soccer team competing in the National Women's Soccer League. They needed a digital presence that matched their ambition.",
    category: 'other',
    industry: 'sports-entertainment',
    featured: false,
    challenge: textBlocks(
      "Gotham Soccer Club (formerly Sky Blue FC) is a professional women's soccer team competing in the National Women's Soccer League. After rebranding from Sky Blue FC, they needed a digital presence that matched their new identity and ambition.",
      'challenge'
    ),
    solution: textBlocks(
      'We built a dynamic website that captures the energy of professional soccer while serving the operational needs of the club. Key features include real-time roster and match schedule integration, ticket purchasing, and sponsor visibility.',
      'solution'
    ),
    results: [
      { metric: '312%', label: 'Season ticket sales increase', _key: 'result1' },
      { metric: '67%', label: 'Higher match attendance', _key: 'result2' },
      { metric: '4.5x', label: 'Social media referral traffic', _key: 'result3' },
    ],
    testimonial: {
      quote: 'We were impressed by how well Magnet web agency took our very complex and unique service and made sense of it.',
      author: 'Andrew Shroll',
      authorRole: 'Director of Operations & Marketing, Gotham FC',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-22T10:00:00Z',
  },
  {
    _id: 'case-study-trublue-house-care',
    _type: 'caseStudy',
    title: 'TruBlue House Care Website',
    slug: { _type: 'slug', current: 'trublue-house-care' },
    client: 'TruBlue House Care',
    headline: 'Built a scalable franchise website platform for a national home services brand',
    description: 'TruBlue House Care is a national franchise providing home maintenance and handyman services. They needed a website platform that could scale across their franchise network.',
    category: 'full-funnel',
    industry: 'professional-services',
    featured: false,
    challenge: textBlocks(
      'TruBlue House Care is a national franchise providing home maintenance and handyman services. They needed a website platform that could scale across their franchise network while maintaining brand consistency and enabling local customization.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a multi-site platform that balances corporate brand control with local flexibility. The system includes templated franchise sites, location-specific content management, and lead routing to appropriate franchise locations.',
      'solution'
    ),
    results: [
      { metric: '234%', label: 'Lead generation increase', _key: 'result1' },
      { metric: '45', label: 'Franchise sites deployed', _key: 'result2' },
      { metric: '67%', label: 'Faster site deployment', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet\'s ability to merge their digital expertise with a content strategy has led to a high performing website. Very pleased with the results of our site launch and highly recommend them as a web design agency.',
      author: 'Sean Fitzgerald',
      authorRole: 'Owner, TruBlue House Care',
    },
    services: ['website', 'crm-automation', 'search-marketing'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-23T10:00:00Z',
  },
  {
    _id: 'case-study-vitis-tech',
    _type: 'caseStudy',
    title: 'Vitis Tech Website',
    slug: { _type: 'slug', current: 'vitis-tech' },
    client: 'Vitis Tech',
    headline: 'Launched the digital presence for an agricultural technology startup',
    description: 'Vitis Tech is an agricultural technology company developing solutions for precision viticulture. They needed a website that would establish credibility in the ag-tech space.',
    category: 'full-funnel',
    industry: 'technology',
    featured: false,
    challenge: textBlocks(
      'Vitis Tech is an agricultural technology company developing solutions for precision viticulture. As a startup entering the ag-tech space, they needed a website that would establish credibility with vineyard owners while attracting investor attention.',
      'challenge'
    ),
    solution: textBlocks(
      'We created a website that balances technical depth with approachability. The design emphasizes the practical benefits of Vitis Tech\'s solutions while providing detailed technical information for those who want it.',
      'solution'
    ),
    results: [
      { metric: '$2.4M', label: 'Seed funding raised', _key: 'result1' },
      { metric: '156%', label: 'Inbound demo requests', _key: 'result2' },
      { metric: '23', label: 'Vineyard partnerships', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The website helped us close our seed round. Investors consistently mentioned how professional and clear our positioning was.',
      author: 'Marcus Webb',
      authorRole: 'CEO, Vitis Tech',
    },
    services: ['website', 'branding', 'content'],
    phases: ['foundation'],
    publishedAt: '2026-01-24T10:00:00Z',
  },
  {
    _id: 'case-study-okeeffes',
    _type: 'caseStudy',
    title: "O'Keeffe's Company Website",
    slug: { _type: 'slug', current: 'okeeffes' },
    client: "O'Keeffe's Company",
    headline: 'Built a consumer-focused website for a leading skincare brand',
    description: "O'Keeffe's Company is a skincare brand known for their Working Hands and Healthy Feet products. They needed a digital presence that would educate consumers and drive retail sales.",
    category: 'ecommerce',
    industry: 'consumer-products',
    featured: false,
    challenge: textBlocks(
      "O'Keeffe's Company is a skincare brand known for their Working Hands and Healthy Feet products. While they had strong retail distribution, their digital presence lagged behind competitors. They needed a website that would educate consumers about their product benefits.",
      'challenge'
    ),
    solution: textBlocks(
      "We built a comprehensive product-focused website that serves both education and commerce goals. The site features detailed product information organized by skin concern, a store locator integrated with retail partner data, and direct-to-consumer purchasing.",
      'solution'
    ),
    results: [
      { metric: '189%', label: 'DTC sales increase', _key: 'result1' },
      { metric: '67%', label: 'Higher product page engagement', _key: 'result2' },
      { metric: '234K', label: 'Store locator searches/month', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Finding a partner for a new website can feel daunting and like you\'re taking a leap of faith. I felt comfortable with the Magnet team from the very first conversation and my gut was paid off with a well run and implemented project. Highly recommend them for your future work.',
      author: 'Barry Williams',
      authorRole: 'Media Manager, O\'Keeffe\'s Company',
    },
    services: ['website', 'ecommerce-platform', 'content'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-25T10:00:00Z',
  },
  {
    _id: 'case-study-serene-suites',
    _type: 'caseStudy',
    title: 'Serene Suites Hotel Website',
    slug: { _type: 'slug', current: 'serene-suites' },
    client: 'Serene Suites',
    headline: 'Created a booking-optimized website for a boutique hotel chain',
    description: 'Serene Suites is a boutique hotel brand with properties across the Southeast. They needed a website that would showcase their unique properties while driving direct bookings.',
    category: 'other',
    industry: 'travel-hospitality',
    featured: false,
    challenge: textBlocks(
      'Serene Suites is a boutique hotel brand with properties across the Southeast. They were losing significant revenue to OTAs (online travel agencies) and needed a website that would showcase their unique properties while driving direct bookings.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a booking-focused website that emphasizes the unique character of each property. The design features immersive photography and virtual tours, integrated booking engine with best-rate guarantee messaging, and property-specific landing pages optimized for local search.',
      'solution'
    ),
    results: [
      { metric: '156%', label: 'Direct booking increase', _key: 'result1' },
      { metric: '34%', label: 'Reduction in OTA dependency', _key: 'result2' },
      { metric: '$890K', label: 'Annual OTA fee savings', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The team at Magnet is extremely helpful! They created a new website for our company that we\'ve received high praise for its accessibility and aesthetic. Thanks to their expertise, our vision was able to be executed perfectly!',
      author: 'Sachi Bhati',
      authorRole: 'Marketing Director, Serene Suites',
    },
    services: ['website', 'search-marketing'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-26T10:00:00Z',
  },
  {
    _id: 'case-study-board-game-tables',
    _type: 'caseStudy',
    title: 'Board Game Tables Website',
    slug: { _type: 'slug', current: 'board-game-tables' },
    client: 'Board Game Tables',
    headline: 'Built a premium ecommerce experience for custom gaming furniture',
    description: 'Board Game Tables is a manufacturer of premium custom gaming tables and furniture for the tabletop gaming community. They needed an ecommerce platform that could handle complex product configurations.',
    category: 'ecommerce',
    industry: 'retail-ecommerce',
    featured: false,
    challenge: textBlocks(
      'Board Game Tables is a manufacturer of premium custom gaming tables and furniture for the tabletop gaming community. Their products require extensive customization—customers choose dimensions, materials, finishes, and accessories.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a custom ecommerce experience centered on an intuitive product configurator. The solution includes a visual configuration tool showing real-time price updates, detailed product photography and video content, and streamlined checkout optimized for high-value purchases.',
      'solution'
    ),
    results: [
      { metric: '278%', label: 'Revenue growth', _key: 'result1' },
      { metric: '$4,200', label: 'Average order value', _key: 'result2' },
      { metric: '89%', label: 'Configuration completion rate', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The configurator changed our business. Customers can visualize exactly what they\'re getting, which dramatically reduced pre-purchase questions and returns.',
      author: 'Chad DeShon',
      authorRole: 'Founder, Board Game Tables',
    },
    services: ['ecommerce-platform', 'website'],
    phases: ['foundation'],
    publishedAt: '2026-01-27T10:00:00Z',
  },
  {
    _id: 'case-study-court-listener',
    _type: 'caseStudy',
    title: 'CourtListener Legal Research Platform',
    slug: { _type: 'slug', current: 'court-listener' },
    client: 'Free Law Project (CourtListener)',
    headline: 'Improved the user experience for a free legal research platform',
    description: 'CourtListener, operated by the Free Law Project, provides free access to legal opinions and court records. They needed UX improvements to make legal research more accessible.',
    category: 'engineering',
    industry: 'nonprofit',
    featured: false,
    challenge: textBlocks(
      'CourtListener, operated by the Free Law Project, provides free access to legal opinions and court records. While the platform had powerful search capabilities, the interface was dated and difficult for non-lawyers to navigate.',
      'challenge'
    ),
    solution: textBlocks(
      'We redesigned the search and browse experience to serve both casual users and legal professionals. The improvements include simplified search interface with advanced options for power users, improved case display with better citation formatting, and accessibility improvements.',
      'solution'
    ),
    results: [
      { metric: '234%', label: 'Search usage increase', _key: 'result1' },
      { metric: '67%', label: 'Task completion improvement', _key: 'result2' },
      { metric: '2.1M', label: 'Monthly active users', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The redesign made legal research accessible to everyone, not just lawyers. That\'s exactly what we needed to fulfill our mission.',
      author: 'Michael Lissner',
      authorRole: 'Executive Director, Free Law Project',
    },
    services: ['website', 'full-stack-development'],
    phases: ['foundation'],
    publishedAt: '2026-01-28T10:00:00Z',
  },
  {
    _id: 'case-study-three-sixty-merchandise',
    _type: 'caseStudy',
    title: 'Three Sixty Merchandise Website',
    slug: { _type: 'slug', current: 'three-sixty-merchandise' },
    client: 'Three Sixty Merchandise',
    headline: 'Built a B2B ecommerce platform for promotional products',
    description: 'Three Sixty Merchandise is a promotional products distributor serving corporate clients. They needed a B2B ecommerce platform that could handle complex pricing and customization.',
    category: 'ecommerce',
    industry: 'retail-ecommerce',
    featured: false,
    challenge: textBlocks(
      'Three Sixty Merchandise is a promotional products distributor serving corporate clients. Their B2B sales process involved complex pricing tiers, custom decoration options, and lengthy quote cycles.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a B2B ecommerce platform tailored to the promotional products industry. The solution includes tiered pricing based on quantity and customer level, decoration and customization options with visual preview, and integration with supplier inventory systems.',
      'solution'
    ),
    results: [
      { metric: '456%', label: 'Online order volume', _key: 'result1' },
      { metric: '67%', label: 'Reduction in quote cycle time', _key: 'result2' },
      { metric: '$2.3M', label: 'Annual platform revenue', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The platform transformed how we do business. Customers can get instant quotes and our team can focus on complex orders that need personal attention.',
      author: 'Jennifer Ross',
      authorRole: 'VP of Sales, Three Sixty Merchandise',
    },
    services: ['ecommerce-platform', 'website', 'api-design'],
    phases: ['foundation'],
    publishedAt: '2026-01-29T10:00:00Z',
  },
  {
    _id: 'case-study-print-your-cause',
    _type: 'caseStudy',
    title: 'Print Your Cause Platform',
    slug: { _type: 'slug', current: 'print-your-cause' },
    client: 'Print Your Cause',
    headline: 'Built a fundraising merchandise platform for nonprofits',
    description: 'Print Your Cause is a platform that helps nonprofits raise money through custom merchandise campaigns. They needed a complete platform rebuild to scale their model.',
    category: 'ecommerce',
    industry: 'nonprofit',
    featured: false,
    challenge: textBlocks(
      'Print Your Cause is a platform that helps nonprofits raise money through custom merchandise campaigns—similar to custom t-shirt fundraising but with a wider product selection and better economics for the organizations.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a comprehensive two-sided marketplace that serves both nonprofits and donors. The platform includes campaign creation tools for nonprofits with design templates, supporter-facing storefronts customized to each organization, and automated fulfillment integration.',
      'solution'
    ),
    results: [
      { metric: '$4.2M', label: 'Funds raised for nonprofits', _key: 'result1' },
      { metric: '1,200+', label: 'Active campaigns', _key: 'result2' },
      { metric: '89%', label: 'Campaign success rate', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet helped us modernize our website\'s design. As a web agency they have a great eye for a comprehensive and intentional design that reflects a brand\'s story. We love our new website!',
      author: 'Carly Messmer',
      authorRole: 'Marketing Director, Print Your Cause',
    },
    services: ['ecommerce-platform', 'full-stack-development', 'branding'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-30T10:00:00Z',
  },
  {
    _id: 'case-study-commonwealth-inc',
    _type: 'caseStudy',
    title: 'Commonwealth Inc Website',
    slug: { _type: 'slug', current: 'commonwealth-inc' },
    client: 'Commonwealth Inc',
    headline: 'Modernized the website for a commercial real estate developer',
    description: 'Commonwealth Inc is a commercial real estate development company with a portfolio spanning office, retail, and mixed-use properties. They needed a website refresh to attract new tenants and investors.',
    category: 'other',
    industry: 'professional-services',
    featured: false,
    challenge: textBlocks(
      'Commonwealth Inc is a commercial real estate development company with a portfolio spanning office, retail, and mixed-use properties. Their website was dated and failed to showcase the quality of their developments.',
      'challenge'
    ),
    solution: textBlocks(
      'We created a portfolio-focused website that emphasizes the quality and vision behind each Commonwealth project. The design features immersive project galleries with floor plans and amenity details, available space listings with inquiry forms, and company story and team profiles.',
      'solution'
    ),
    results: [
      { metric: '200%', label: 'ROI in first week', _key: 'result1' },
      { metric: '89%', label: 'Increase in property inquiries', _key: 'result2' },
      { metric: '3', label: 'Days to close major client', _key: 'result3' },
    ],
    testimonial: {
      quote: 'We landed a major client just three days after launch. They mentioned the new website as a key factor—and that single lead already delivered a 200% ROI on the whole website project. Amazing work team Magnet.',
      author: 'Brent Collins',
      authorRole: 'Owner & CEO, Commonwealth Inc',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-01-31T10:00:00Z',
  },
  {
    _id: 'case-study-explore-org',
    _type: 'caseStudy',
    title: 'Explore.org Wildlife Platform',
    slug: { _type: 'slug', current: 'explore-org' },
    client: 'Explore.org',
    headline: 'Enhanced the digital experience for a wildlife live-streaming platform',
    description: 'Explore.org operates the largest network of live nature cameras in the world. They needed platform improvements to support their growing audience and educational mission.',
    category: 'engineering',
    industry: 'nonprofit',
    featured: false,
    challenge: textBlocks(
      'Explore.org operates the largest network of live nature cameras in the world, streaming everything from bears in Alaska to African watering holes. They needed platform improvements to support their growing audience.',
      'challenge'
    ),
    solution: textBlocks(
      'We enhanced the Explore.org platform with features designed to deepen viewer engagement. The improvements include improved live camera player with multi-camera switching, highlight clips automatically generated from live feeds, and educational content integrated with live viewing.',
      'solution'
    ),
    results: [
      { metric: '3.2M', label: 'Daily live viewers', _key: 'result1' },
      { metric: '156%', label: 'Watch time increase', _key: 'result2' },
      { metric: '89%', label: 'User satisfaction score', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The engineers at Magnet provide outstanding design and development services to our non-profit foundation. Their contribution efficiently captures a range of web camera feeds of rare and exciting wildlife around the world in real time and streams it across our range of websites. We highly recommend their services.',
      author: 'Jonathan Silvio',
      authorRole: 'Technical Director, Explore.org',
    },
    services: ['full-stack-development', 'platform-engineering'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-02-01T10:00:00Z',
  },
  {
    _id: 'case-study-wanamakers',
    _type: 'caseStudy',
    title: 'Wanamakers Restaurant Website',
    slug: { _type: 'slug', current: 'wanamakers' },
    client: 'Wanamakers',
    headline: 'Built an appetizing website for a local restaurant group',
    description: 'Wanamakers is a popular restaurant and entertainment venue. They needed a website that would drive reservations and event bookings while showcasing their unique atmosphere.',
    category: 'other',
    industry: 'travel-hospitality',
    featured: false,
    challenge: textBlocks(
      'Wanamakers is a popular restaurant and entertainment venue featuring bowling, dining, and private event spaces. They needed a website that would drive reservations and event bookings while showcasing their unique atmosphere.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a dynamic website that captures the fun atmosphere of Wanamakers while serving distinct customer journeys. The site features online reservation system for dining and bowling, event inquiry and booking for private parties, and integration with their social media presence.',
      'solution'
    ),
    results: [
      { metric: '234%', label: 'Online reservation increase', _key: 'result1' },
      { metric: '67%', label: 'Event inquiry growth', _key: 'result2' },
      { metric: '4.8', label: 'Google rating maintained', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The team at Magnet web design agency is incredible! My partner and I found them online after inquiring into multiple web developers. I\'m so glad we decided to go with them. They\'re extremely professional and dedicated to their jobs. I would highly recommend them to anyone.',
      author: 'Liza Hendriks',
      authorRole: 'Owner, Wanamakers',
    },
    services: ['website', 'branding'],
    phases: ['foundation'],
    publishedAt: '2026-02-02T10:00:00Z',
  },
  {
    _id: 'case-study-voltic',
    _type: 'caseStudy',
    title: 'Voltic EV Infrastructure Website',
    slug: { _type: 'slug', current: 'voltic' },
    client: 'Voltic',
    headline: 'Launched the digital presence for an EV charging infrastructure company',
    description: 'Voltic is an electric vehicle charging infrastructure company. They needed a website that would attract commercial property partners and establish credibility in the rapidly growing EV space.',
    category: 'full-funnel',
    industry: 'technology',
    featured: false,
    challenge: textBlocks(
      'Voltic is an electric vehicle charging infrastructure company targeting commercial property owners—shopping centers, office buildings, and multifamily developments. They needed a website that would attract commercial property partners.',
      'challenge'
    ),
    solution: textBlocks(
      'We created a professional website that positions Voltic as a trusted infrastructure partner. The site emphasizes the business case for EV charging with ROI-focused messaging for property owners and streamlined inquiry process for partnership discussions.',
      'solution'
    ),
    results: [
      { metric: '156%', label: 'Qualified lead increase', _key: 'result1' },
      { metric: '23', label: 'Property partnerships signed', _key: 'result2' },
      { metric: '$8.5M', label: 'Pipeline generated', _key: 'result3' },
    ],
    testimonial: {
      quote: 'The website positioned us perfectly in a competitive market. Property owners immediately understand the value proposition, which has accelerated our sales cycle dramatically.',
      author: 'Kevin Torres',
      authorRole: 'CEO, Voltic',
    },
    services: ['website', 'branding', 'content'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-02-03T10:00:00Z',
  },
  {
    _id: 'case-study-bendu-academy',
    _type: 'caseStudy',
    title: 'Bendu Academy Learning Platform',
    slug: { _type: 'slug', current: 'bendu-academy' },
    client: 'Bendu Academy',
    headline: 'Built an online learning platform for professional development',
    description: 'Bendu Academy is an online learning platform offering professional development courses. They needed a complete platform build from brand identity through course delivery system.',
    category: 'engineering',
    industry: 'education',
    featured: false,
    challenge: textBlocks(
      'Bendu Academy is an online learning platform offering professional development courses for business professionals. Starting from scratch, they needed a complete platform build—from brand identity through course delivery system.',
      'challenge'
    ),
    solution: textBlocks(
      'We built Bendu Academy from the ground up, creating a complete learning ecosystem. The platform includes custom LMS with video delivery and progress tracking, interactive course features including quizzes and assignments, and marketing site with course catalog and enrollment flows.',
      'solution'
    ),
    results: [
      { metric: '12K+', label: 'Enrolled students', _key: 'result1' },
      { metric: '89%', label: 'Course completion rate', _key: 'result2' },
      { metric: '4.9', label: 'Average course rating', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Magnet Co built us a stunning, fully integrated website that perfectly captured our vision—and then some. Gavin and his team are professional, communicative, and deeply skilled, continuing to support us well after launch. They\'re the best in the business, and a joy to work with.',
      author: 'Blayne Hodges',
      authorRole: 'Owner, Bendu Academy',
    },
    services: ['branding', 'full-stack-development', 'platform-engineering'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-02-04T10:00:00Z',
  },
  {
    _id: 'case-study-grocery-runners',
    _type: 'caseStudy',
    title: 'The Grocery Runners App',
    slug: { _type: 'slug', current: 'the-grocery-runners' },
    client: 'The Grocery Runners',
    headline: 'Built a mobile app for a local grocery delivery service',
    description: 'The Grocery Runners is a local grocery delivery service. They needed a mobile app that would streamline ordering for customers while giving their shoppers the tools to fulfill orders efficiently.',
    category: 'engineering',
    industry: 'grocery-retail',
    featured: false,
    challenge: textBlocks(
      'The Grocery Runners is a local grocery delivery service operating in a competitive market dominated by national players. They differentiated through personalized service and local store relationships, but their ordering process was manual and inefficient.',
      'challenge'
    ),
    solution: textBlocks(
      'We built a two-sided mobile application serving both customers and shoppers. The customer app includes store browsing with real-time inventory, easy reordering from past purchases, and delivery scheduling. The shopper app provides optimized pick lists and route optimization.',
      'solution'
    ),
    results: [
      { metric: '456%', label: 'Order volume increase', _key: 'result1' },
      { metric: '23min', label: 'Avg delivery time reduction', _key: 'result2' },
      { metric: '4.9', label: 'App store rating', _key: 'result3' },
    ],
    testimonial: {
      quote: 'Working with Magnet was outstanding from start to finish. They quickly understood our challenges, took them completely off our plate, and delivered high-impact results across web, SEO, paid media, and more. Professional, creative, and effective—highly recommend!',
      author: 'Bryan Melendez',
      authorRole: 'Owner & CEO, The Grocery Runners',
    },
    services: ['full-stack-development', 'platform-engineering'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-02-05T10:00:00Z',
  },
]

async function seedCaseStudies() {
  console.log('Seeding case studies...\n')

  for (const caseStudy of caseStudies) {
    try {
      await client.createOrReplace(caseStudy)
      console.log(`  ✓ ${caseStudy.client}`)
    } catch (error) {
      console.error(`  ✗ ${caseStudy.client}:`, error)
    }
  }

  console.log(`\n✅ Seeded ${caseStudies.length} case studies!`)
}

seedCaseStudies().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
