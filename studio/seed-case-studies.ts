import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: 'o28dq6x5',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

interface CaseStudyData {
  title: string
  slug: string
  client: string
  headline: string
  description: string
  category: 'engineering' | 'full-funnel' | 'websites' | 'ecommerce' | 'other'
  industry: string
  featured: boolean
  challenge: string
  solution: string
  approach?: string
  implementation?: string
  results: Array<{ metric: string; label: string }>
  testimonial?: {
    quote: string
    author: string
    authorRole: string
  }
  services: string[]
  phases: string[]
  heroImageUrl?: string
  publishedAt: string
}

const caseStudiesData: CaseStudyData[] = [
  {
    title: 'BSI Engineering Website Redesign',
    slug: 'bsi-engineering',
    client: 'BSI Engineering',
    headline: "Modernizing a Midwestern Engineering Leader's Website",
    description: 'Complete website redesign for an employee-owned engineering firm serving chemicals, pharmaceuticals, food and beverage, and renewable fuels industries.',
    category: 'websites',
    industry: 'professional-services',
    featured: true,
    challenge: "BSI Engineering, an employee-owned engineering firm serving clients in chemicals, pharmaceuticals, food and beverage, and renewable fuels, partnered with Magnet to completely redesign their website. With a strong reputation built over two decades and a growing portfolio of work, BSI needed a site that better reflected their depth, culture, and technical sophistication—and served as a stronger lead generation platform for their business development team.",
    approach: "We started with stakeholder interviews and a deep dive into BSI's brand positioning. Their leadership team emphasized their unique strengths: employee ownership, cross-disciplinary expertise, and a Midwest-based team that delivers with care. From there, we mapped out a content strategy to better tell that story—one that balanced technical credibility with approachability. We also conducted a comparative audit of other engineering firms to identify opportunities to stand apart—especially in clarity, usability, and visual polish.",
    solution: "We designed and developed the new site using Webflow, giving BSI a scalable, easy-to-manage platform moving forward.",
    implementation: "Key improvements included: A refined, modern UI that reflects BSI's technical professionalism and approachable team culture; A flexible CMS architecture that allows BSI's marketing team to create, update, and manage project case studies, job openings, and team pages with ease; Improved page structure and internal linking to better guide users through services and industry expertise; Optimized performance across all devices, ensuring fast load times and smooth navigation; Integrated analytics and tracking to support ongoing marketing insights.",
    results: [
      { metric: '27%', label: 'Reduction in CPL' },
      { metric: '56%', label: 'Increase in enquiries' },
    ],
    testimonial: {
      quote: "We couldn't be more thrilled with the work Magnet did on our new website! From the initial consultation to the final launch, their team was professional, creative, and incredibly responsive. They took the time to understand our brand, goals, and audience, translating our vision into a stunning, user-friendly website.",
      author: 'Monica Prather',
      authorRole: 'BSI Engineering',
    },
    services: ['website', 'branding'],
    phases: ['foundation', 'activation'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/68851c9745dc217b1043742e_bsi-1.jpg',
    publishedAt: '2024-12-01T00:00:00Z',
  },
  {
    title: 'Commonwealth Inc Logistics Website',
    slug: 'commonwealth-inc',
    client: 'Commonwealth Inc',
    headline: 'A 200% ROI just 3 days after website relaunch',
    description: 'High-performance website for a trusted third-party logistics provider with over 35 years of experience.',
    category: 'websites',
    industry: 'professional-services',
    featured: true,
    challenge: "Commonwealth Inc., a trusted third-party logistics provider with over 35 years of experience, needed a website that reflected its reputation for reliability, efficiency, and industry expertise. With expansive warehousing solutions and multimodal transportation services, the company required a digital platform that would effectively communicate its capabilities while driving customer engagement and lead generation.",
    approach: "A logistics company's website must be clear, intuitive, and action-driven. We developed a streamlined navigation structure that allows visitors to quickly access warehousing, transportation, and industry-specific solutions. Each service page was designed to showcase Commonwealth's expertise with engaging visuals, detailed content, and clear calls to action. With logistics being a highly competitive space, we developed an SEO-focused content strategy that emphasized Commonwealth's differentiators—its 2 million square feet of premium warehousing, multimodal transportation options, and expertise across industries like aerospace, chemicals, and food & beverage.",
    solution: "By integrating strategic keywords, optimizing metadata, and structuring content for readability and engagement, we positioned Commonwealth as a top-tier player in third-party logistics.",
    implementation: "Given the growing number of business decision-makers accessing websites via mobile devices, we implemented a mobile-first approach. The new site is fully responsive, ensuring seamless experiences across all screen sizes. Understanding the importance of inclusivity, we designed the website to meet ADA and WCAG standards. A logistics website isn't just an informational hub—it's a sales tool. We implemented high-impact call-to-action buttons throughout the site, integrated lead forms, and optimized the 'Speak to Sales' feature to streamline the customer inquiry process.",
    results: [
      { metric: '200%', label: 'ROI in 3 days after launch' },
    ],
    testimonial: {
      quote: 'We landed a major client just three days after launch. They mentioned the new website as a key factor—and that single lead already delivered a 200% ROI on the whole website project. Amazing work team Magnet.',
      author: 'Brent Collins',
      authorRole: 'Commonwealth Inc',
    },
    services: ['website', 'search-marketing'],
    phases: ['foundation', 'activation'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/679c1a3d72fa812ea180a339_11.jpg',
    publishedAt: '2024-11-15T00:00:00Z',
  },
  {
    title: "O'Keeffe's Digital Presence Revitalization",
    slug: 'okeeffes',
    client: "O'Keeffe's",
    headline: "Revitalizing a household brand's digital presence",
    description: 'Website redesign for a well-established household skincare brand, completed in a 7-week sprint.',
    category: 'websites',
    industry: 'consumer-products',
    featured: true,
    challenge: "O'Keeffe's, a well-established household name renowned for its Working Hands and other skincare products, approached Magnet to elevate their digital presence. The challenge was to create a website that aligned with their mature brand system while enhancing the online customer experience and product visibility.",
    approach: "Magnet employed a strategic, high-velocity approach: We compressed our typical production timeline into a 7-week sprint, overlapping strategy, creative, implementation, and delivery phases without compromising quality. We conducted a thorough analysis of customer wants, needs, pains, and gains to inform our strategic approach for product landing pages. We developed bespoke landing pages for key products, including Working Hands, optimized to highlight product benefits and align with customer needs. We ensured the new website seamlessly integrated with O'Keeffe's existing brand system, maintaining consistency with their offline presence. We prioritized site speed and responsiveness to deliver a seamless user experience across all devices.",
    solution: "We leveraged cutting-edge web technologies and methodologies including agile development, responsive design with a mobile-first approach, SEO optimization integrated throughout the site architecture, and analytics integration for measuring user engagement and conversion rates.",
    implementation: "The new O'Keeffe's website launched successfully after the 7-week sprint, delivering significant improvements in brand alignment, user engagement, conversion rates, and performance.",
    results: [
      { metric: '30%', label: 'Increase in time on product pages' },
      { metric: '25%', label: 'Decrease in bounce rate' },
      { metric: '20%', label: 'Uplift in conversion rates' },
      { metric: '40%', label: 'Improvement in load times' },
    ],
    testimonial: {
      quote: "Finding a partner for a new website can feel daunting and like you're taking a leap of faith. I felt comfortable with the Magnet team from the very first conversation and my gut was paid off with a well run and implemented project. Highly recommend them for your future work.",
      author: "Barry Williams",
      authorRole: "O'Keeffe's",
    },
    services: ['website', 'branding'],
    phases: ['foundation', 'acceleration'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/67112152c19d83ceb6c2ef5d_02-SGNL-iPad-Mockup.jpg',
    publishedAt: '2024-10-20T00:00:00Z',
  },
  {
    title: 'Directions Group Website Rebrand',
    slug: 'directions-research',
    client: 'Directions Group',
    headline: 'An engaging visual rebrand for a leading Cincinnati based research company',
    description: 'Complete website overhaul for a business insights and analytics company.',
    category: 'websites',
    industry: 'professional-services',
    featured: false,
    challenge: "Directions Group, a distinguished business insights and analytics company, was looking to refresh its brand image with a completely new website. With new pages and services to be added, Directions Group wanted to really let these new aspects of their business shine. Magnet was glad to provide a complete overhaul that not only improved the aesthetics and brand image of the new site, but also improved site performance and user experience.",
    approach: "Our team began with close collaboration and communication with Directions Group team members, identifying strengths and key elements to prioritize with the new design. We then conducted aggressive competitor research to examine how similar companies approach frequent customer pain points, preferences, and overall interaction with these sites. From there, we were able to tailor a custom approach to make Directions Research's new website relevant to client needs, easy to use, and more performant than other competitor websites.",
    solution: "Our team utilized Webflow for this project, as the overall performance and flexibility of the platform was very fitting for a web design project of this scope.",
    implementation: "Our team primarily focused on creating a refreshing website that was not only aesthetically pleasing, but also more intuitive regarding navigation and overall performance. Key aspects included: Clean and crisp site structure, utilizing dynamic colors to improve audience attention; Performance optimization for fast loading times and seamless functionality; Hubspot integrations to better provide administrative use for Directions Research team members; Google Tag Manager and Google Analytics integrations for traffic reports; Responsiveness to ensure excellent user experience on all devices; Continuous assessment and adjustments to maintain optimal performance.",
    results: [
      { metric: '23%', label: 'Increase in decision stage conversions' },
      { metric: '2.8x', label: 'Increase in ad clickthrough rate' },
    ],
    services: ['website', 'branding'],
    phases: ['foundation', 'activation'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/66f8d1d5f4ec4031869cadf5_directions2.jpg',
    publishedAt: '2024-09-15T00:00:00Z',
  },
  {
    title: 'The Grocery Runners Delivery Platform',
    slug: 'the-grocery-runners',
    client: 'The Grocery Runners',
    headline: 'Exciting organic curves and shapes for a growing grocery delivery company',
    description: 'Modern, visually appealing website for an innovative grocery delivery service.',
    category: 'websites',
    industry: 'retail-ecommerce',
    featured: false,
    challenge: "The Grocery Runners, an innovative grocery delivery service, sought to revamp their online presence with a modern, visually appealing, and user-friendly website. They wanted to create a digital platform that would effectively showcase their services while providing a seamless experience for potential customers interested in their grocery delivery solutions.",
    approach: "Our team began the project by identifying key performance indicators and success metrics. We then conducted in-depth research on Grocery Runners' target audience, analyzing their preferences, pain points, and online behavior. This insight allowed us to create a custom-tailored user experience that catered to their specific needs and expectations.",
    solution: "We utilized Webflow as our development tool to rapidly iterate through the design and development process.",
    implementation: "Our team focused on creating an engaging and visually striking website that was responsive and easy to navigate. Key implementation aspects included: Engaging animations to create a dynamic user experience; Performance optimization for fast loading times and seamless functionality; Responsiveness to ensure excellent user experience on all devices; Continuous assessment and adjustments to maintain optimal performance across various devices and browsers.",
    results: [],
    services: ['website'],
    phases: ['foundation'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/6467c281e6e8fff19fe12e27_grocery-3.jpg',
    publishedAt: '2024-08-10T00:00:00Z',
  },
  {
    title: 'Katz Teller Law Firm Website',
    slug: 'katz-teller',
    client: 'Katz Teller',
    headline: 'A fresh look for an established Cincinnati law firm',
    description: 'Website modernization for a 30+ year old Cincinnati law firm.',
    category: 'websites',
    industry: 'legal',
    featured: false,
    challenge: "Katz Teller is an established law firm located in Cincinnati, Ohio, founded in 1988. The law firm has been serving the Cincinnati area for over 30 years, and they needed a website that would keep up with the times and maintain their relevance in the industry. The website was outdated and didn't showcase the full range of services offered by the firm. Katz Teller wanted a website that reflected the professionalism and experience they provide to their clients.",
    approach: "Magnet started the project by meeting with the Katz Teller team to understand their requirements and goals. The team did a round of value proposition design and experience design to narrow down on their audience's needs. Magnet also helped them to identify their target audience and tailor the website content to address their needs. The goal was to make the website easy to navigate, provide quick access to the firm's services, and showcase the firm's expertise and experience in the industry.",
    solution: "Magnet chose to use the Jamstack, combining Vue 3 with Sanity CMS, to provide a scalable solution that was performant, hack-proof and easy for the editorial team at Katz Teller to use.",
    implementation: "The website was built using a modular approach that allowed for easy updates and customization. The new website design was responsive, allowing it to work seamlessly on desktop and mobile devices. Magnet also implemented on-page SEO best practices to ensure the website was optimized for search engines and could rank higher for common search terms.",
    results: [],
    services: ['website', 'search-marketing'],
    phases: ['foundation', 'activation'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/641d058d9454865c17ed62a1_katz-sm.jpg',
    publishedAt: '2024-07-01T00:00:00Z',
  },
  {
    title: 'TruBlue House Care Franchise Platform',
    slug: 'trublue-house-care',
    client: 'TruBlue House Care',
    headline: 'A franchise website platform for a professional services company',
    description: 'Scalable franchise platform for a national home maintenance brand with 50+ locations.',
    category: 'websites',
    industry: 'professional-services',
    featured: false,
    challenge: "TruBlue Total House Care, a trusted national brand for home maintenance, needed a revitalized online presence to further resonate with local markets and reflect modern aesthetics. Our task was to overhaul the franchise website, infusing a fresh, modern look while elevating its functionality to ensure a seamless user experience. This transformation aimed not only to retain the brand's national trust but to bolster its local outreach, paving the way for sustained growth.",
    approach: "We decided to employ a Jamstack approach for the website overhaul. This allowed us to create a modern, functional website that provided flexibility for franchise owners while attracting new customers across the brand. As a thriving franchise with over 50 national locations, it was essential to communicate the brand values and services while allowing owners to customize their locations in a hassle-free way. To ensure the website attracted the right audience, we conducted a comprehensive SEO audit.",
    solution: "We developed a clean, modern user interface design using fresh colors, ample white space, colorful photography, and tactful animation to enhance the user experience.",
    implementation: "During the implementation phase, we focused on creating a robust platform that empowered franchise owners to manage their own profile pages, update their location information, and gather leads. The backend was developed using Laravel, a PHP framework known for its performance and flexibility. We used Nuxt and VueJS to power the frontend. We implemented a headless CMS—Sanity—which allowed us to separate the content management from the frontend presentation.",
    results: [
      { metric: '30%', label: 'Increase in users within 3 months' },
      { metric: '58%', label: 'Increase in pageviews' },
      { metric: '9%', label: 'Growth in session duration' },
    ],
    testimonial: {
      quote: "Magnet's ability to merge their digital expertise with a content strategy has led to a high performing website. Very pleased with the results of our site launch and highly recommend them as a web design agency.",
      author: 'Sean Fitzgerald',
      authorRole: 'TruBlue House Care',
    },
    services: ['website', 'platform-engineering'],
    phases: ['foundation', 'activation'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/64112b7343d5ad25ed7ad065_tru1.jpg',
    publishedAt: '2024-06-15T00:00:00Z',
  },
  {
    title: 'Wanamakers Auction Platform',
    slug: 'wanamakers',
    client: 'Wanamakers',
    headline: 'A bespoke auction platform for a thoroughbred horse trading startup',
    description: 'Custom real-time bidding platform for a prestigious thoroughbred horse auction house.',
    category: 'ecommerce',
    industry: 'other',
    featured: false,
    challenge: "Wanamaker's, a prestigious thoroughbred horse auction house, sought to blend the thrill of live auctions with the digital ease of online bidding. Our mission was to engineer a cutting-edge bidding platform that encapsulated the essence of live auction excitement while introducing the convenience and accessibility of online interactions. This hybrid platform was envisioned to not only broaden Wanamaker's reach but to redefine the bidding experience for its discerning clientele.",
    approach: "We embarked on an immersive discovery phase to learn from international competitors and identify areas of improvement for creating a better user experience for buyers, sellers, and industry experts. The objective was to build a modern, dependable, and user-friendly platform with a robust content management system and powerful real-time bidding software.",
    solution: "The Wanamaker's brand is modern and refined, so the website design needed to reflect its sophistication while increasing its credibility as a newcomer to the market. The design was inspired by mid-century prestige, featuring tan orange with light cream leather, contrasted with a dark, classical navy.",
    implementation: "Building the auction platform from scratch was a considerable undertaking. We developed a custom Laravel, Nuxt, and Stripe platform for high-concurrency, low-latency bidding, setting a performance benchmark for the system of 10,000 active bidders within 100ms of each other with no discernible lag. Websockets was a foundational technology in meeting this metric, with bids updating near-instantaneously even at scale. We modeled and tested highly complex bidding scenarios for months to ensure the platform would be flawless, balanced, and fair at all times.",
    results: [],
    testimonial: {
      quote: "Magnet web design agency is an exceptional partner and asset to my co-founder and I's business. Our business is dependent on the technology behind it and Magnet has been there from the start to ensure our website and the operations related to it are seamless and effective. Working with Gavin, Sarah, and their team is enjoyable and rewarding with the results they are able to achieve.",
      author: 'Jack Carlino',
      authorRole: 'Wanamakers',
    },
    services: ['ecommerce-platform', 'full-stack-development', 'platform-engineering'],
    phases: ['foundation', 'activation', 'acceleration'],
    heroImageUrl: 'https://cdn.prod.website-files.com/6392268cd1a3bc5df594bfa5/6701cebee21727613799a6c2_inglis-6.jpg',
    publishedAt: '2024-05-01T00:00:00Z',
  },
]

// Helper to convert text to Sanity block content
function textToBlocks(text: string) {
  if (!text) return []
  
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  
  return paragraphs.map(paragraph => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substring(7),
        text: paragraph.trim(),
        marks: [],
      },
    ],
    markDefs: [],
  }))
}

async function seedCaseStudies() {
  console.log('🚀 Starting case studies import...\n')

  for (const caseStudy of caseStudiesData) {
    try {
      console.log(`📝 Creating case study: ${caseStudy.client}`)

      const doc = {
        _type: 'caseStudy',
        _id: `case-study-${caseStudy.slug}`,
        title: caseStudy.title,
        slug: {
          _type: 'slug',
          current: caseStudy.slug,
        },
        client: caseStudy.client,
        headline: caseStudy.headline,
        description: caseStudy.description,
        category: caseStudy.category,
        industry: caseStudy.industry,
        featured: caseStudy.featured,
        challenge: textToBlocks(caseStudy.challenge),
        solution: textToBlocks([caseStudy.approach, caseStudy.solution, caseStudy.implementation].filter(Boolean).join('\n\n')),
        results: caseStudy.results.map((r, i) => ({
          _key: `result-${i}`,
          metric: r.metric,
          label: r.label,
        })),
        testimonial: caseStudy.testimonial
          ? {
              quote: caseStudy.testimonial.quote,
              author: caseStudy.testimonial.author,
              authorRole: caseStudy.testimonial.authorRole,
            }
          : undefined,
        services: caseStudy.services,
        phases: [],
        publishedAt: caseStudy.publishedAt,
      }

      await client.create(doc)
      console.log(`✅ Created: ${caseStudy.client}\n`)
    } catch (error) {
      console.error(`❌ Error creating ${caseStudy.client}:`, error)
    }
  }

  console.log('✨ Case studies import complete!')
  console.log(`📊 Total imported: ${caseStudiesData.length} case studies`)
  console.log(`⭐ Featured: ${caseStudiesData.filter(cs => cs.featured).length}`)
}

// Run the seed
seedCaseStudies().catch(console.error)
