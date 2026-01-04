import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN environment variable')
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

// Departments
const departments = [
  {
    _id: 'dept-design',
    _type: 'department',
    title: 'Design',
    slug: { _type: 'slug', current: 'design' },
    order: 1,
  },
  {
    _id: 'dept-development',
    _type: 'department',
    title: 'Development',
    slug: { _type: 'slug', current: 'development' },
    order: 2,
  },
  {
    _id: 'dept-marketing',
    _type: 'department',
    title: 'Marketing',
    slug: { _type: 'slug', current: 'marketing' },
    order: 3,
  },
  {
    _id: 'dept-client-services',
    _type: 'department',
    title: 'Client Services',
    slug: { _type: 'slug', current: 'client-services' },
    order: 4,
  },
]

// Job Locations
const jobLocations = [
  {
    _id: 'loc-cincinnati',
    _type: 'jobLocation',
    title: 'Cincinnati, Ohio',
    slug: { _type: 'slug', current: 'cincinnati-ohio' },
    city: 'Cincinnati',
    state: 'Ohio',
    order: 1,
  },
  {
    _id: 'loc-salt-lake-city',
    _type: 'jobLocation',
    title: 'Salt Lake City, Utah',
    slug: { _type: 'slug', current: 'salt-lake-city-utah' },
    city: 'Salt Lake City',
    state: 'Utah',
    order: 2,
  },
  {
    _id: 'loc-irvine',
    _type: 'jobLocation',
    title: 'Irvine, California',
    slug: { _type: 'slug', current: 'irvine-california' },
    city: 'Irvine',
    state: 'California',
    order: 3,
  },
]

// Job Types
const jobTypes = [
  {
    _id: 'jobtype-hybrid-full-time',
    _type: 'jobType',
    title: 'Hybrid / Full Time',
    slug: { _type: 'slug', current: 'hybrid-full-time' },
  },
]

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

// Jobs
const jobs = [
  {
    _id: 'job-senior-ui-ux-designer',
    _type: 'job',
    title: 'Senior UI/UX Designer',
    slug: { _type: 'slug', current: 'senior-ui-ux-designer' },
    department: { _type: 'reference', _ref: 'dept-design' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc3' },
    ],
    isActive: true,
    headline: 'Create Beautiful, Intuitive Digital Experiences',
    intro: [
      textBlock('intro1', "At Magnet, we believe exceptional design is the foundation of every successful digital product. We're looking for a Senior UI/UX Designer who can transform complex ideas into elegant, user-centered solutions that drive results for our clients."),
      textBlock('intro2', "You'll work alongside our talented team of developers, strategists, and marketers to create websites, applications, and digital experiences that not only look stunning but also convert visitors into customers. Your designs will directly impact our clients' success and help shape the future of digital marketing."),
    ],
    aboutRole: [
      textBlock('about1', "As a Senior UI/UX Designer at Magnet, you'll lead the design process from concept to completion. You'll collaborate closely with clients to understand their brand, audience, and business goals, then translate those insights into compelling visual designs and intuitive user experiences. You'll work on a diverse range of projects—from responsive websites and e-commerce platforms to marketing landing pages and web applications."),
    ],
    responsibilities: [
      textBlock('resp1', 'Lead the design process for web projects, creating wireframes, prototypes, and high-fidelity designs that balance aesthetics with functionality.'),
      textBlock('resp2', 'Conduct user research, usability testing, and gather feedback to inform design decisions and improve user experiences.'),
      textBlock('resp3', 'Collaborate with developers to ensure designs are implemented accurately and maintain design integrity across all devices and browsers.'),
      textBlock('resp4', 'Present design concepts to clients, articulate design rationale, and incorporate feedback to refine solutions.'),
      textBlock('resp5', 'Maintain and evolve design systems, style guides, and component libraries to ensure consistency across projects.'),
      textBlock('resp6', 'Mentor junior designers and contribute to the growth of our design practice through knowledge sharing and best practices.'),
    ],
    qualifications: [
      textBlock('qual1', '5+ years of experience in UI/UX design with a strong portfolio showcasing web design projects and user-centered design thinking.'),
      textBlock('qual2', 'Proficiency in design tools such as Figma, Adobe Creative Suite, and prototyping tools like Framer or Principle.'),
      textBlock('qual3', 'Strong understanding of responsive design, accessibility standards (WCAG), and modern web design principles.'),
      textBlock('qual4', 'Experience with user research methodologies, usability testing, and data-driven design decisions.'),
      textBlock('qual5', 'Excellent communication skills and ability to present design work confidently to clients and stakeholders.'),
      textBlock('qual6', 'Understanding of front-end development principles and ability to collaborate effectively with developers.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Join a team that values creativity, innovation, and the impact of great design. At Magnet, you'll work on diverse projects for exciting clients, have the opportunity to shape our design practice, and grow your career in a supportive, collaborative environment. We offer competitive compensation, flexible work arrangements, and the chance to make a real difference in how businesses connect with their audiences online."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-full-stack-web-developer',
    _type: 'job',
    title: 'Full-Stack Web Developer',
    slug: { _type: 'slug', current: 'full-stack-web-developer' },
    department: { _type: 'reference', _ref: 'dept-development' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc3' },
    ],
    isActive: true,
    headline: 'Build High-Performance Web Solutions',
    intro: [
      textBlock('intro1', "Magnet is seeking a talented Full-Stack Web Developer to join our development team. You'll work on a variety of projects, from custom websites and e-commerce platforms to web applications and marketing tools that help our clients achieve their digital goals."),
      textBlock('intro2', "We're looking for someone who is passionate about writing clean, efficient code and building solutions that are both powerful and maintainable. You'll collaborate with designers, marketers, and project managers to bring innovative ideas to life."),
    ],
    aboutRole: [
      textBlock('about1', "As a Full-Stack Web Developer at Magnet, you'll be responsible for building and maintaining web applications across the entire stack. You'll work with modern technologies and frameworks to create fast, scalable, and secure solutions. From database design to front-end implementation, you'll have the opportunity to work on diverse projects and solve complex technical challenges."),
    ],
    responsibilities: [
      textBlock('resp1', 'Develop responsive, performant web applications using modern frameworks and technologies (React, Next.js, Node.js, etc.).'),
      textBlock('resp2', 'Design and implement RESTful APIs, database schemas, and backend services that power our web applications.'),
      textBlock('resp3', 'Collaborate with designers to implement pixel-perfect UI components and ensure seamless user experiences.'),
      textBlock('resp4', 'Write clean, maintainable, and well-documented code following best practices and coding standards.'),
      textBlock('resp5', 'Optimize applications for performance, SEO, and accessibility across all devices and browsers.'),
      textBlock('resp6', 'Participate in code reviews, testing, and deployment processes to ensure quality and reliability.'),
    ],
    qualifications: [
      textBlock('qual1', '4+ years of experience in full-stack web development with proficiency in JavaScript/TypeScript, HTML, and CSS.'),
      textBlock('qual2', 'Strong experience with modern frameworks (React, Next.js, Vue, or similar) and backend technologies (Node.js, Python, PHP, etc.).'),
      textBlock('qual3', 'Experience with database design and management (PostgreSQL, MySQL, MongoDB, or similar).'),
      textBlock('qual4', 'Familiarity with version control (Git), CI/CD pipelines, and cloud platforms (AWS, Vercel, etc.).'),
      textBlock('qual5', 'Understanding of web performance optimization, security best practices, and SEO principles.'),
      textBlock('qual6', 'Strong problem-solving skills and ability to work independently as well as collaboratively in a team environment.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Work on exciting projects with cutting-edge technologies while being part of a supportive team that values innovation and continuous learning. At Magnet, you'll have opportunities to grow your skills, work on diverse challenges, and make a meaningful impact on our clients' success. We offer competitive benefits, flexible work arrangements, and a culture that celebrates technical excellence."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-paid-ads-specialist',
    _type: 'job',
    title: 'Paid Ads Specialist',
    slug: { _type: 'slug', current: 'paid-ads-specialist' },
    department: { _type: 'reference', _ref: 'dept-marketing' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
    ],
    isActive: true,
    headline: 'Drive Growth Through Strategic Paid Advertising',
    intro: [
      textBlock('intro1', "Magnet is looking for a Paid Ads Specialist who can create and manage high-performing advertising campaigns across Google Ads, Meta, LinkedIn, and other platforms. You'll help our clients reach their target audiences and achieve their marketing goals through data-driven paid media strategies."),
      textBlock('intro2', "If you're passionate about digital advertising, love analyzing data to optimize campaigns, and thrive in a fast-paced environment, this role is for you."),
    ],
    aboutRole: [
      textBlock('about1', "As a Paid Ads Specialist at Magnet, you'll manage paid advertising campaigns for multiple clients across various industries. You'll be responsible for campaign strategy, execution, optimization, and reporting. Your work will directly impact our clients' revenue and growth, making this a high-impact role with opportunities for significant professional development."),
    ],
    responsibilities: [
      textBlock('resp1', 'Develop and execute paid advertising strategies across Google Ads, Meta, LinkedIn, and other ad platforms.'),
      textBlock('resp2', 'Create compelling ad copy, design ad creative, and optimize landing pages to maximize conversion rates.'),
      textBlock('resp3', 'Monitor campaign performance, analyze data, and make data-driven optimizations to improve ROI and achieve client goals.'),
      textBlock('resp4', 'Conduct keyword research, audience targeting, and A/B testing to continuously improve campaign performance.'),
      textBlock('resp5', 'Prepare and present regular performance reports to clients, explaining results and recommendations.'),
      textBlock('resp6', 'Stay current with platform updates, industry trends, and best practices in paid advertising.'),
    ],
    qualifications: [
      textBlock('qual1', '3+ years of experience managing paid advertising campaigns, preferably in an agency environment.'),
      textBlock('qual2', 'Certifications in Google Ads, Meta Blueprint, or other relevant advertising platforms are highly preferred.'),
      textBlock('qual3', 'Strong analytical skills and experience with analytics tools (Google Analytics, Facebook Analytics, etc.).'),
      textBlock('qual4', 'Experience with conversion tracking, pixel implementation, and attribution modeling.'),
      textBlock('qual5', 'Excellent communication skills and ability to explain complex concepts to clients in clear, actionable terms.'),
      textBlock('qual6', 'Self-motivated with strong attention to detail and ability to manage multiple campaigns simultaneously.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Join a team of marketing experts where your work directly drives client success. You'll work with diverse clients, manage substantial ad budgets, and have the opportunity to grow your expertise in paid advertising. We offer competitive compensation, professional development opportunities, and a collaborative environment where your ideas and contributions are valued."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-search-marketer',
    _type: 'job',
    title: 'Search Marketer',
    slug: { _type: 'slug', current: 'search-marketer' },
    department: { _type: 'reference', _ref: 'dept-marketing' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc2' },
    ],
    isActive: true,
    headline: 'Optimize Visibility and Drive Organic Growth',
    intro: [
      textBlock('intro1', "Magnet is seeking a Search Marketer to help our clients improve their search engine visibility and drive organic traffic through SEO and search marketing strategies. You'll work on technical SEO, content optimization, link building, and local SEO to help businesses rank higher and attract more qualified visitors."),
      textBlock('intro2', "If you're passionate about search engines, love diving into analytics, and enjoy the challenge of improving rankings, we want to hear from you."),
    ],
    aboutRole: [
      textBlock('about1', "As a Search Marketer at Magnet, you'll develop and execute comprehensive SEO strategies for our clients. You'll conduct technical audits, optimize content, build quality backlinks, and track performance to ensure our clients achieve their organic search goals. This role requires a mix of technical skills, analytical thinking, and creative problem-solving."),
    ],
    responsibilities: [
      textBlock('resp1', 'Conduct comprehensive SEO audits, identify technical issues, and develop action plans to improve search rankings.'),
      textBlock('resp2', 'Perform keyword research, competitive analysis, and develop content strategies aligned with search intent.'),
      textBlock('resp3', 'Optimize website content, meta tags, and on-page elements to improve search visibility and click-through rates.'),
      textBlock('resp4', 'Build and maintain quality backlinks through outreach, partnerships, and content marketing initiatives.'),
      textBlock('resp5', 'Monitor search rankings, track performance metrics, and provide regular reports with insights and recommendations.'),
      textBlock('resp6', 'Stay current with search engine algorithm updates, SEO best practices, and industry trends.'),
    ],
    qualifications: [
      textBlock('qual1', '3+ years of experience in SEO and search marketing, with proven results improving organic search rankings.'),
      textBlock('qual2', 'Strong understanding of technical SEO, including site architecture, crawlability, indexing, and Core Web Vitals.'),
      textBlock('qual3', 'Experience with SEO tools such as Ahrefs, SEMrush, Moz, Screaming Frog, and Google Search Console.'),
      textBlock('qual4', 'Knowledge of HTML, CSS, and basic web development concepts to communicate effectively with developers.'),
      textBlock('qual5', 'Strong analytical skills and experience with Google Analytics and other analytics platforms.'),
      textBlock('qual6', 'Excellent written communication skills and ability to create SEO-friendly content and outreach materials.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Work with a team that values data-driven strategies and long-term results. You'll have the opportunity to work on diverse projects, see measurable impact from your efforts, and continuously grow your expertise in search marketing. We offer competitive benefits, professional development opportunities, and a culture that encourages innovation and continuous learning."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-copywriter',
    _type: 'job',
    title: 'Copywriter',
    slug: { _type: 'slug', current: 'copywriter' },
    department: { _type: 'reference', _ref: 'dept-marketing' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc3' },
    ],
    isActive: true,
    headline: 'Craft Compelling Copy That Converts',
    intro: [
      textBlock('intro1', "Magnet is looking for a talented Copywriter who can create persuasive, engaging copy that drives action. You'll write for websites, landing pages, email campaigns, social media, and advertising across a variety of industries and client needs."),
      textBlock('intro2', 'If you have a way with words, understand what motivates people to take action, and can adapt your voice to different brands and audiences, this role is perfect for you.'),
    ],
    aboutRole: [
      textBlock('about1', "As a Copywriter at Magnet, you'll be responsible for creating compelling copy that helps our clients connect with their audiences and achieve their marketing goals. You'll work closely with designers, strategists, and clients to understand brand voice, target audience, and objectives, then craft copy that resonates and converts. From headlines to long-form content, you'll write across all channels and formats."),
    ],
    responsibilities: [
      textBlock('resp1', 'Write compelling copy for websites, landing pages, email campaigns, social media, and paid advertising.'),
      textBlock('resp2', 'Collaborate with designers and strategists to ensure copy and design work together to create cohesive, effective campaigns.'),
      textBlock('resp3', 'Adapt writing style and tone to match different brand voices and target audiences across various industries.'),
      textBlock('resp4', 'Conduct research to understand client industries, competitors, and target audiences to inform copy strategy.'),
      textBlock('resp5', 'Edit and proofread copy to ensure accuracy, clarity, and consistency with brand guidelines.'),
      textBlock('resp6', 'Participate in client meetings, present copy concepts, and incorporate feedback to refine messaging.'),
    ],
    qualifications: [
      textBlock('qual1', '3+ years of copywriting experience, preferably in an agency or marketing environment, with a strong portfolio showcasing diverse writing samples.'),
      textBlock('qual2', 'Exceptional writing skills with ability to write clear, persuasive copy that drives action and engagement.'),
      textBlock('qual3', 'Understanding of marketing principles, conversion optimization, and how copy influences user behavior.'),
      textBlock('qual4', 'Ability to adapt writing style to different brands, industries, and audiences while maintaining authenticity.'),
      textBlock('qual5', 'Strong research skills and ability to quickly understand complex topics and translate them into accessible copy.'),
      textBlock('qual6', 'Excellent communication skills and ability to collaborate effectively with team members and clients.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Join a creative team where your words have real impact. You'll work on diverse projects, collaborate with talented designers and strategists, and see your copy drive results for clients. We offer competitive compensation, opportunities for professional growth, and a supportive environment where creativity and innovation are encouraged."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-graphic-designer',
    _type: 'job',
    title: 'Graphic Designer',
    slug: { _type: 'slug', current: 'graphic-designer' },
    department: { _type: 'reference', _ref: 'dept-design' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc2' },
    ],
    isActive: true,
    headline: 'Create Visual Brand Experiences',
    intro: [
      textBlock('intro1', "Magnet is seeking a Graphic Designer to create stunning visual designs for our clients' digital and print marketing materials. You'll work on brand identities, marketing collateral, social media graphics, and web design elements that help businesses stand out and connect with their audiences."),
      textBlock('intro2', "If you're a creative problem-solver with a strong eye for design and a passion for creating beautiful, effective visuals, we'd love to have you on our team."),
    ],
    aboutRole: [
      textBlock('about1', "As a Graphic Designer at Magnet, you'll create visual designs that bring brands to life across various platforms and mediums. You'll work on everything from logo design and brand identity to social media graphics, marketing materials, and web design elements. You'll collaborate with our team of designers, developers, and marketers to ensure visual consistency and brand alignment across all touchpoints."),
    ],
    responsibilities: [
      textBlock('resp1', 'Create visual designs for websites, social media, marketing materials, and brand identity projects.'),
      textBlock('resp2', 'Develop brand guidelines, style guides, and design systems to ensure visual consistency across all client materials.'),
      textBlock('resp3', 'Collaborate with UI/UX designers, developers, and marketers to create cohesive visual experiences.'),
      textBlock('resp4', 'Prepare design files for production, ensuring proper formatting and specifications for web and print.'),
      textBlock('resp5', 'Present design concepts to clients, incorporate feedback, and refine designs to meet project objectives.'),
      textBlock('resp6', 'Stay current with design trends, tools, and best practices to continuously improve design quality.'),
    ],
    qualifications: [
      textBlock('qual1', '3+ years of graphic design experience with a strong portfolio showcasing diverse design work across digital and print mediums.'),
      textBlock('qual2', 'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign) and modern design tools (Figma, Sketch).'),
      textBlock('qual3', 'Strong understanding of typography, color theory, composition, and visual hierarchy.'),
      textBlock('qual4', 'Experience with brand identity design, logo creation, and developing comprehensive brand guidelines.'),
      textBlock('qual5', 'Knowledge of print production processes and web design principles for digital applications.'),
      textBlock('qual6', 'Excellent communication skills and ability to present design work and rationale to clients and team members.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Work on exciting projects with creative freedom to explore new ideas and push boundaries. You'll collaborate with a talented team, work with diverse clients, and see your designs come to life across various platforms. We offer competitive benefits, professional development opportunities, and a culture that celebrates creativity and innovation."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-marketing-strategist',
    _type: 'job',
    title: 'Marketing Strategist',
    slug: { _type: 'slug', current: 'marketing-strategist' },
    department: { _type: 'reference', _ref: 'dept-marketing' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc3' },
    ],
    isActive: true,
    headline: 'Develop Data-Driven Marketing Strategies',
    intro: [
      textBlock('intro1', "Magnet is looking for a Marketing Strategist who can develop comprehensive marketing strategies that drive growth for our clients. You'll analyze markets, understand customer behavior, and create integrated marketing plans that leverage multiple channels and tactics to achieve business objectives."),
      textBlock('intro2', "If you're strategic, analytical, and passionate about helping businesses grow through effective marketing, this role offers the opportunity to make a significant impact."),
    ],
    aboutRole: [
      textBlock('about1', "As a Marketing Strategist at Magnet, you'll work closely with clients to understand their business goals, target audiences, and competitive landscape. You'll develop comprehensive marketing strategies, create roadmaps, and guide execution across digital channels. Your strategic thinking will help shape how our clients connect with their audiences and achieve their growth objectives."),
    ],
    responsibilities: [
      textBlock('resp1', 'Conduct market research, competitive analysis, and customer research to inform marketing strategy development.'),
      textBlock('resp2', 'Develop comprehensive marketing strategies and roadmaps that align with client business objectives and budgets.'),
      textBlock('resp3', 'Create integrated marketing plans that leverage multiple channels (SEO, paid ads, content, email, social, etc.).'),
      textBlock('resp4', 'Analyze marketing performance data, identify insights, and make recommendations to optimize strategies and improve ROI.'),
      textBlock('resp5', 'Present strategies and recommendations to clients, explaining rationale and expected outcomes.'),
      textBlock('resp6', 'Collaborate with cross-functional teams to ensure strategy is executed effectively and aligned with client goals.'),
    ],
    qualifications: [
      textBlock('qual1', '5+ years of experience in marketing strategy, preferably in an agency environment, with proven success developing and executing marketing plans.'),
      textBlock('qual2', 'Strong analytical skills and experience with marketing analytics tools (Google Analytics, marketing automation platforms, etc.).'),
      textBlock('qual3', 'Deep understanding of digital marketing channels, tactics, and how they work together in integrated campaigns.'),
      textBlock('qual4', 'Experience with market research, customer segmentation, and developing buyer personas.'),
      textBlock('qual5', 'Excellent presentation and communication skills with ability to explain complex strategies to diverse audiences.'),
      textBlock('qual6', 'Strategic thinking with ability to see the big picture while also focusing on tactical execution details.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Join a team where strategic thinking is valued and your ideas shape client success. You'll work on diverse projects, collaborate with talented marketers and creatives, and see your strategies drive real results. We offer competitive compensation, opportunities for professional growth, and a culture that encourages innovation and strategic excellence."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-content-strategist',
    _type: 'job',
    title: 'Content Strategist',
    slug: { _type: 'slug', current: 'content-strategist' },
    department: { _type: 'reference', _ref: 'dept-marketing' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
    ],
    isActive: true,
    headline: 'Shape Content That Engages and Converts',
    intro: [
      textBlock('intro1', "Magnet is seeking a Content Strategist to develop content strategies that help our clients engage their audiences, build authority, and drive business results. You'll plan content across blogs, social media, email, and other channels to support marketing goals and create meaningful connections with customers."),
      textBlock('intro2', "If you're strategic, creative, and understand how content can drive business outcomes, this role offers the opportunity to shape content programs that make a real impact."),
    ],
    aboutRole: [
      textBlock('about1', "As a Content Strategist at Magnet, you'll develop comprehensive content strategies that align with client marketing objectives and audience needs. You'll plan content calendars, identify content opportunities, and guide content creation across various formats and channels. Your strategic thinking will help ensure content drives engagement, builds brand authority, and supports conversion goals."),
    ],
    responsibilities: [
      textBlock('resp1', 'Develop content strategies and editorial calendars that align with client marketing goals and audience needs.'),
      textBlock('resp2', 'Conduct content audits, competitive research, and keyword research to identify content opportunities.'),
      textBlock('resp3', 'Create content briefs and guidelines for writers and creators to ensure consistency and quality.'),
      textBlock('resp4', 'Plan content across multiple channels (blog, social media, email, video, etc.) to create integrated content experiences.'),
      textBlock('resp5', 'Analyze content performance, identify what resonates with audiences, and optimize strategies based on data.'),
      textBlock('resp6', 'Collaborate with SEO specialists, copywriters, and designers to ensure content is optimized and visually compelling.'),
    ],
    qualifications: [
      textBlock('qual1', '4+ years of experience in content strategy or content marketing, with proven success developing and executing content programs.'),
      textBlock('qual2', 'Strong understanding of content marketing principles, SEO, and how content drives business outcomes.'),
      textBlock('qual3', 'Experience with content planning tools, editorial calendars, and content management systems.'),
      textBlock('qual4', 'Knowledge of different content formats (blog posts, social media, email, video, etc.) and when to use each.'),
      textBlock('qual5', 'Strong analytical skills and ability to measure content performance and ROI.'),
      textBlock('qual6', 'Excellent communication skills and ability to collaborate effectively with writers, designers, and clients.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Work in a creative environment where content strategy is valued and your ideas shape how brands connect with their audiences. You'll work on diverse projects, collaborate with talented creators, and see your content strategies drive engagement and results. We offer competitive benefits, professional development opportunities, and a culture that celebrates creativity and strategic thinking."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-project-manager',
    _type: 'job',
    title: 'Project Manager',
    slug: { _type: 'slug', current: 'project-manager' },
    department: { _type: 'reference', _ref: 'dept-client-services' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc2' },
    ],
    isActive: true,
    headline: 'Lead Projects to Successful Completion',
    intro: [
      textBlock('intro1', "Magnet is looking for a Project Manager to oversee web development, design, and marketing projects from initiation to completion. You'll work closely with clients, designers, developers, and marketers to ensure projects are delivered on time, within budget, and exceed expectations."),
      textBlock('intro2', "If you're organized, detail-oriented, and thrive on bringing order to complex projects, this role offers the opportunity to make a significant impact on client success and team efficiency."),
    ],
    aboutRole: [
      textBlock('about1', "As a Project Manager at Magnet, you'll be the central point of coordination for multiple client projects. You'll manage timelines, budgets, resources, and communication to ensure smooth project execution. You'll work with cross-functional teams to remove obstacles, facilitate collaboration, and ensure everyone has what they need to deliver exceptional work."),
    ],
    responsibilities: [
      textBlock('resp1', 'Plan and manage project timelines, budgets, and resources to ensure successful project delivery.'),
      textBlock('resp2', 'Facilitate communication between clients and internal teams, ensuring clear expectations and regular updates.'),
      textBlock('resp3', 'Identify and mitigate project risks, resolve issues, and remove obstacles that could impact project success.'),
      textBlock('resp4', 'Coordinate with designers, developers, and marketers to ensure seamless collaboration and workflow.'),
      textBlock('resp5', 'Track project progress, manage change requests, and ensure deliverables meet quality standards.'),
      textBlock('resp6', 'Conduct project retrospectives and identify opportunities to improve processes and efficiency.'),
    ],
    qualifications: [
      textBlock('qual1', '4+ years of project management experience, preferably in a digital agency or web development environment.'),
      textBlock('qual2', 'Experience managing multiple projects simultaneously with varying timelines and complexity.'),
      textBlock('qual3', 'Strong organizational skills and attention to detail with ability to track multiple moving parts.'),
      textBlock('qual4', 'Excellent communication and interpersonal skills with ability to work effectively with diverse teams and clients.'),
      textBlock('qual5', 'Familiarity with project management tools (Asana, Monday.com, Jira, etc.) and methodologies (Agile, Scrum).'),
      textBlock('qual6', 'Problem-solving mindset with ability to think critically and make decisions under pressure.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Join a team where your organizational skills and leadership make a real difference. You'll work on exciting projects, collaborate with talented professionals, and see your efforts directly contribute to client success and team efficiency. We offer competitive compensation, professional development opportunities, and a culture that values clear communication and effective project delivery."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'job-account-manager',
    _type: 'job',
    title: 'Account Manager',
    slug: { _type: 'slug', current: 'account-manager' },
    department: { _type: 'reference', _ref: 'dept-client-services' },
    jobType: { _type: 'reference', _ref: 'jobtype-hybrid-full-time' },
    locations: [
      { _type: 'reference', _ref: 'loc-cincinnati', _key: 'loc1' },
      { _type: 'reference', _ref: 'loc-salt-lake-city', _key: 'loc2' },
      { _type: 'reference', _ref: 'loc-irvine', _key: 'loc3' },
    ],
    isActive: true,
    headline: 'Build Strong Client Relationships',
    intro: [
      textBlock('intro1', "Magnet is seeking an Account Manager to serve as the primary point of contact for our clients, ensuring their needs are met and their marketing goals are achieved. You'll build strong relationships, understand client businesses, and coordinate with our team to deliver exceptional service and results."),
      textBlock('intro2', "If you're client-focused, relationship-driven, and passionate about helping businesses succeed, this role offers the opportunity to make a meaningful impact on client satisfaction and business growth."),
    ],
    aboutRole: [
      textBlock('about1', "As an Account Manager at Magnet, you'll be responsible for managing client relationships and ensuring their success with our services. You'll serve as the bridge between clients and our internal team, understanding client needs, communicating regularly, and ensuring projects and campaigns are aligned with their business objectives. Your relationship-building skills will be key to client retention and growth."),
    ],
    responsibilities: [
      textBlock('resp1', 'Serve as the primary point of contact for assigned clients, building strong relationships and ensuring client satisfaction.'),
      textBlock('resp2', 'Understand client businesses, goals, and challenges to provide strategic guidance and recommendations.'),
      textBlock('resp3', 'Coordinate with internal teams (design, development, marketing) to ensure client needs are met and projects are delivered successfully.'),
      textBlock('resp4', 'Conduct regular client meetings, provide updates on project progress and campaign performance.'),
      textBlock('resp5', 'Identify opportunities to expand services and grow client accounts through upselling and cross-selling.'),
      textBlock('resp6', 'Resolve client issues, manage expectations, and ensure clear communication throughout the client lifecycle.'),
    ],
    qualifications: [
      textBlock('qual1', '3+ years of account management experience, preferably in a digital agency or marketing services environment.'),
      textBlock('qual2', 'Strong relationship-building skills with ability to connect with clients and understand their business needs.'),
      textBlock('qual3', 'Excellent communication skills, both written and verbal, with ability to present ideas and results professionally.'),
      textBlock('qual4', 'Understanding of digital marketing, web development, and design services to effectively communicate with clients and internal teams.'),
      textBlock('qual5', 'Experience managing multiple client accounts simultaneously while maintaining high levels of service.'),
      textBlock('qual6', 'Problem-solving mindset with ability to navigate challenges and find solutions that benefit both clients and the agency.'),
    ],
    whyJoinUs: [
      textBlock('why1', "Work in a client-focused environment where building relationships and ensuring client success is at the heart of what we do. You'll work with diverse clients, collaborate with talented teams, and see your efforts directly contribute to client growth and satisfaction. We offer competitive compensation, professional development opportunities, and a culture that values client relationships and exceptional service."),
    ],
    publishedAt: '2025-01-01T10:00:00Z',
  },
]

const categories = [
  {
    _id: 'category-paid-media',
    _type: 'category',
    title: 'Paid Media',
    slug: { _type: 'slug', current: 'paid-media' },
    phase: 'activation',
    description: 'Predictable acquisition through targeted advertising.',
  },
  {
    _id: 'category-search-marketing',
    _type: 'category',
    title: 'Search Marketing',
    slug: { _type: 'slug', current: 'search-marketing' },
    phase: 'activation',
    description: 'Compounding visibility through SEO and content.',
  },
  {
    _id: 'category-branding',
    _type: 'category',
    title: 'Branding',
    slug: { _type: 'slug', current: 'branding' },
    phase: 'foundation',
    description: 'Positioning, narrative, and identity systems.',
  },
  {
    _id: 'category-websites',
    _type: 'category',
    title: 'Websites',
    slug: { _type: 'slug', current: 'websites' },
    phase: 'foundation',
    description: 'Digital experiences that convert.',
  },
]

const posts = [
  {
    _id: 'post-strategy-decks-lie',
    _type: 'post',
    title: 'Strategy Decks Lie',
    slug: { _type: 'slug', current: 'strategy-decks-lie' },
    postType: 'article',
    summary:
      'Most strategy lives in slides. Ours ships in code. The difference is everything.',
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Every agency shows you a beautiful strategy deck. Positioning frameworks. Customer journey maps. Messaging hierarchies. Then they hand it off to execution teams who have never seen it.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'problem',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'The deck becomes a PDF in a folder. The website becomes a compromise. The gap between strategy and execution grows until they have nothing to do with each other.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'solution',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'We encode strategy directly into the system. Messaging lives in components. Conversion paths are designed, not discovered. Analytics measure what we said we would measure. The strategy is the execution.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: { _type: 'reference', _ref: 'category-websites' },
    publishedAt: '2025-12-15T10:00:00Z',
  },
  {
    _id: 'post-keyword-not-strategy',
    _type: 'post',
    title: "The Keyword Isn't the Strategy",
    slug: { _type: 'slug', current: 'keyword-isnt-the-strategy' },
    postType: 'article',
    summary:
      'Ranking for keywords is easy. Ranking for the right intent is the hard part.',
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Most SEO programs start with a keyword list. Volume. Difficulty. Competition. Then content gets written to hit those targets. Traffic goes up. Pipeline stays flat.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'insight',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: "The keyword isn't the strategy. Intent is. A page ranking #1 for the wrong intent is worthless. A page ranking #4 for high-intent buyers prints money. Map intent first. Keywords follow.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: { _type: 'reference', _ref: 'category-search-marketing' },
    publishedAt: '2025-12-20T10:00:00Z',
  },
  {
    _id: 'post-qualified-over-quantity',
    _type: 'post',
    title: 'Qualified Over Quantity',
    slug: { _type: 'slug', current: 'qualified-over-quantity' },
    postType: 'article',
    summary:
      "Your pipeline isn't a leads problem. It's a qualification problem.",
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Marketing teams celebrate lead volume. Sales teams complain about lead quality. Both are measuring the wrong thing.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'insight',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'The real metric is revenue per visitor. Not leads. Not MQLs. Revenue. Work backwards from there, and the system designs itself.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: { _type: 'reference', _ref: 'category-paid-media' },
    publishedAt: '2025-12-28T10:00:00Z',
  },
  {
    _id: 'post-fewer-options-close-faster',
    _type: 'post',
    title: 'Fewer Options Close Faster',
    slug: { _type: 'slug', current: 'fewer-options-close-faster' },
    postType: 'article',
    summary:
      'Choice paralysis kills deals. Structured offers accelerate them.',
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'We audited 47 B2B websites last quarter. The average had 6+ service pages, 3+ pricing tiers, and no clear recommendation. Visitors left confused.',
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'solution',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: "The fix isn't more content. It's less choice. One recommended path. One primary CTA. Clear packaging that signals confidence. Decision speed is a conversion lever most teams ignore.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: { _type: 'reference', _ref: 'category-websites' },
    publishedAt: '2026-01-02T10:00:00Z',
  },
  {
    _id: 'post-positioning-is-infrastructure',
    _type: 'post',
    title: 'Positioning Is Infrastructure',
    slug: { _type: 'slug', current: 'positioning-is-infrastructure' },
    postType: 'article',
    summary:
      'Most companies treat positioning as a one-time exercise. It should be the foundation everything else builds on.',
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: "You can't out-execute bad positioning. Great ads won't save a confused value prop. A beautiful website won't convert if visitors don't understand what you do.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'insight',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Positioning is infrastructure. It determines what you say, who you say it to, and how everything else gets built. Fix it first. Then scale.',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
    category: { _type: 'reference', _ref: 'category-branding' },
    publishedAt: '2026-01-03T10:00:00Z',
  },
]

async function seed() {
  console.log('Seeding departments...')

  for (const department of departments) {
    await client.createOrReplace(department)
    console.log(`  ✓ ${department.title}`)
  }

  console.log('\nSeeding job locations...')

  for (const location of jobLocations) {
    await client.createOrReplace(location)
    console.log(`  ✓ ${location.title}`)
  }

  console.log('\nSeeding job types...')

  for (const jobType of jobTypes) {
    await client.createOrReplace(jobType)
    console.log(`  ✓ ${jobType.title}`)
  }

  console.log('\nSeeding jobs...')

  for (const job of jobs) {
    await client.createOrReplace(job)
    console.log(`  ✓ ${job.title}`)
  }

  console.log('\nSeeding categories...')

  for (const category of categories) {
    await client.createOrReplace(category)
    console.log(`  ✓ ${category.title}`)
  }

  console.log('\nSeeding posts...')

  for (const post of posts) {
    await client.createOrReplace(post)
    console.log(`  ✓ ${post.title}`)
  }

  console.log('\n✅ Seed complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

