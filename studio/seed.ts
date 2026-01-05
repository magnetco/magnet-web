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

// Team Members
const teamMembers = [
  {
    _id: 'team-gavin-hall',
    _type: 'teamMember',
    name: 'Gavin Hall',
    slug: { _type: 'slug', current: 'gavin-hall' },
    role: 'CEO & Creative Director',
    bio: [
      textBlock('bio1', `Our founder studied architecture before falling in love with the web — a shift that sparked two decades of designing and building high-performance platforms with precision, purpose, and a systems mindset. Since launching Magnet in 2004, he's led digital projects across Europe, the Middle East, and North America, scaling teams and crafting platforms for ambitious brands.`),
      textBlock('bio2', `A strategist at heart and designer by instinct, he shapes the Foundation phase — ensuring every project begins with clear positioning, coherent narrative, and technical architecture that supports growth. Now based in Cincinnati, he remains joyfully obsessed with mountains, snowboarding, and medium roast single-origin coffee.`),
    ],
    order: 1,
    isActive: true,
  },
  {
    _id: 'team-sarah-littlefield',
    _type: 'teamMember',
    name: 'Sarah Littlefield',
    slug: { _type: 'slug', current: 'sarah-littlefield' },
    role: 'Chief Strategy Officer',
    bio: [
      textBlock('bio1', `Cornell-educated and committed to human-centered design, Sarah blends strategic thinking, clear communication, and UX insight to help organizations simplify complexity and connect with the people they serve.`),
      textBlock('bio2', `With a background in healthcare, education, and the nonprofit world, she's led large-scale digital initiatives for St. Elizabeth Healthcare and McGraw Hill Education — bringing clarity, alignment, and purpose to every project. She leads our messaging systems and ICP research, translating customer motivations into frameworks that guide everything from homepage copy to paid campaigns. She's also the type who can solve a content challenge and write a jingle — often in the same meeting.`),
    ],
    order: 2,
    isActive: true,
  },
  {
    _id: 'team-andrew-gaynor',
    _type: 'teamMember',
    name: 'Andrew Gaynor',
    slug: { _type: 'slug', current: 'andrew-gaynor' },
    role: 'Production Director',
    bio: [
      textBlock('bio1', `Our endlessly dependable cornerstone of Magnet's operations plays a vital role in driving projects forward — translating client needs into clear production plans, aligning teams, and ensuring nothing slips through the cracks.`),
      textBlock('bio2', `With a sharp eye for scope, timelines, and risk, Andrew brings structure and calm to fast-moving work. From Discovery through Launch, he orchestrates the Acceleration phase — making sure that offers, landing experiences, and sales enablement assets ship on time and at quality. He's a skilled communicator and trusted liaison, helping clients feel supported while keeping our remote team focused and in sync. Thoughtful, organized, and unflappable, he's one of the key reasons things at Magnet just work.`),
    ],
    order: 3,
    isActive: true,
  },
  {
    _id: 'team-mike-heggie',
    _type: 'teamMember',
    name: 'Mike Heggie',
    slug: { _type: 'slug', current: 'mike-heggie' },
    role: 'Chief Technology Officer',
    bio: [
      textBlock('bio1', `Magnet's quietly brilliant technical lead, Mike is a calm, collaborative thinker with a gift for turning complexity into clarity. He leads the architecture and execution of our most demanding web projects, always favoring thoughtful, client-first solutions over flashy tech.`),
      textBlock('bio2', `With deep experience in full-stack development and systems integration, he ensures our Digital Experience work is fast, accessible, and built for long-term maintainability. Every tracking layer, every CRM integration, every conversion flow runs through his exacting standards. Now based in Salt Lake City, Mike spends his time outside work exploring the mountains and refining no-code workflows — all while lending steady insight to every technical decision we make.`),
    ],
    order: 4,
    isActive: true,
  },
  {
    _id: 'team-alex-topal',
    _type: 'teamMember',
    name: 'Alex Topal',
    slug: { _type: 'slug', current: 'alex-topal' },
    role: 'Engineering Director',
    bio: [
      textBlock('bio1', `With over 24 years of experience in advanced software engineering, Alex brings deep technical insight and thoughtful leadership to every project he touches. As Magnet's most senior engineer, he's spent the last 15 years designing scalable systems, solving complex challenges, and guiding our development team through everything from web architecture to DevOps and data infrastructure.`),
      textBlock('bio2', `A former computer science professor with two master's degrees, Alex combines academic depth with real-world execution. Whether architecting robust digital platforms or mentoring engineers, he approaches every problem with clarity, precision, and a solutions-first mindset — making him an essential force behind Magnet's technical success.`),
    ],
    order: 5,
    isActive: true,
  },
  {
    _id: 'team-michael-casner',
    _type: 'teamMember',
    name: 'Michael Casner',
    slug: { _type: 'slug', current: 'michael-casner' },
    role: 'Marketing Director',
    bio: [
      textBlock('bio1', `Based in Southern California, Michael leads our Activation phase — turning on demand through paid media, search marketing, and performance campaigns. Specializing in PPC advertising, SEO, and geo-targeting, he combines analytical insight with strategic vision to deliver measurable growth.`),
      textBlock('bio2', `From channel strategy through scaling, he ensures every campaign is structured for predictable acquisition and continuous optimization. Known for creative problem-solving and process improvements, Michael consistently drives operational efficiency, increases profitability, and mentors teams to achieve both company objectives and their own professional development goals.`),
    ],
    order: 6,
    isActive: true,
  },
  {
    _id: 'team-eugene-vasylenko',
    _type: 'teamMember',
    name: 'Eugene Vasylenko',
    slug: { _type: 'slug', current: 'eugene-vasylenko' },
    role: 'App Developer',
    bio: [
      textBlock('bio1', `Our principled and versatile app developer with over 20 years of experience, based in London, UK, with a sharp command of both mobile and web technologies. Equally fluent in Swift, Flutter, PHP, Python, and JavaScript, he builds scalable, performant applications across platforms — always with clean architecture and long-term maintainability in mind.`),
      textBlock('bio2', `With a deep respect for engineering fundamentals and a keen eye on emerging tech, Eugene is also at the forefront of integrating AI-assisted development tools into his workflow. He brings rigor, speed, and forward-thinking innovation to every build — from native mobile apps to complex web systems — without ever compromising on code quality or clarity.`),
    ],
    order: 7,
    isActive: true,
  },
  {
    _id: 'team-nazar-bodak',
    _type: 'teamMember',
    name: 'Nazar Bodak',
    slug: { _type: 'slug', current: 'nazar-bodak' },
    role: 'Frontend Developer',
    bio: [
      textBlock('bio1', `Our frontend developer is known for pairing deep technical expertise with high spirits and an easy sense of humor. Originally from Lviv and now based in the U.S., he brings a rare mix of professionalism, warmth, and sharp engineering talent to every project.`),
      textBlock('bio2', `Fluent in TypeScript, HTML, and CSS, Nazar builds scalable APIs, clean interfaces, and reliable systems that hold up under pressure. He's equally comfortable architecting complex backend services or polishing frontend details — always with a clear eye for user experience and performance. Whether shipping code or lifting team morale, Nazar leads with care, clarity, and craft.`),
    ],
    order: 8,
    isActive: true,
  },
  {
    _id: 'team-martin-stark',
    _type: 'teamMember',
    name: 'Martin Stark',
    slug: { _type: 'slug', current: 'martin-stark' },
    role: 'Design Lead',
    bio: [
      textBlock('bio1', `With over 15 years of industry experience crafting digital interfaces that prioritize clarity, restraint, and purpose. Rooted in the belief that the best design disappears into the experience, his work reflects a deep understanding of hierarchy, whitespace, and human attention.`),
      textBlock('bio2', `Martin favors systems over decoration, and timeless design principles over fleeting trends — always aiming to make the complex feel simple. His approach to UI Design ensures our Digital Experience work is not just beautiful, but strategically structured for conversion and long-term brand coherence.`),
    ],
    order: 9,
    isActive: true,
  },
  {
    _id: 'team-irakli-lolashvili',
    _type: 'teamMember',
    name: 'Irakli Lolashvili',
    slug: { _type: 'slug', current: 'irakli-lolashvili' },
    role: 'Design Lead',
    bio: [
      textBlock('bio1', `Our meticulous product designer brings a touch of magic to Magnet. Originally from Tbilisi, Georgia, Irakli has an incredible eye for detail and a passion for crafting UI/UX designs that are both clear and delightfully intuitive. His absolute attention to every pixel ensures that our products are not just beautiful but also a joy to use.`),
      textBlock('bio2', `With his friendly approach and innovative thinking, Irakli turns complex ideas into simple, engaging experiences. His work on UX Architecture and UI Design shapes how users flow through our digital experiences — from first touch to conversion.`),
    ],
    order: 10,
    isActive: true,
  },
  {
    _id: 'team-george-zhulov',
    _type: 'teamMember',
    name: 'George Zhulov',
    slug: { _type: 'slug', current: 'george-zhulov' },
    role: 'Senior Frontend Engineer',
    bio: [
      textBlock('bio1', `Our senior frontend engineer with over a decade of experience transforming complex systems into clear, intuitive user interfaces. With a background spanning healthcare, finance, and telecom, he's led frontend efforts for high-load applications and B2B platforms used in over 40 global markets. Calm under pressure and deeply product-minded, George brings precision and empathy to every technical decision — always building with the user in mind.`),
      textBlock('bio2', `Equally skilled in systems architecture and team mentorship, he excels at scaling codebases, improving workflows, and elevating engineering standards across the board. Based in Cannes, France, George is driven by a fascination with systems thinking — from development pipelines to the psychology of decision-making. When he's not writing code, he's likely exploring investment strategies, tinkering with automated trading models, or pondering the deeper architecture of human will.`),
    ],
    order: 11,
    isActive: true,
  },
  {
    _id: 'team-katie-zeek',
    _type: 'teamMember',
    name: 'Katie Zeek',
    slug: { _type: 'slug', current: 'katie-zeek' },
    role: 'Sales Director',
    bio: [
      textBlock('bio1', `Our high-energy, high-empathy sales leader thrives at the intersection of storytelling, systems, and client success. She brings a decade of experience helping creative and digital teams build lasting relationships with the right clients — not just more of them.`),
      textBlock('bio2', `Her approach is equal parts relational and operational: aligning Magnet's growth strategy with what prospects actually need, and equipping the team with better processes, messaging, and momentum. She's worked with startups, agencies, and global brands alike — always focusing on clarity, trust, and value. When she's not deep in leading a pitch, you can find her traveling, trying a new restaurant, or perfecting her workflow setup.`),
    ],
    order: 12,
    isActive: true,
  },
  {
    _id: 'team-andrew-skrypnik',
    _type: 'teamMember',
    name: 'Andrew Skrypnik',
    slug: { _type: 'slug', current: 'andrew-skrypnik' },
    role: 'Full-Stack Developer',
    bio: [
      textBlock('bio1', `Our seasoned full-stack engineer with over a decade of experience specializing in PHP, Laravel, and Magento. Known for his analytical mindset and calm precision, he thrives in complex enterprise environments — whether optimizing legacy systems, scaling dev teams, or driving measurable improvements across codebases and workflows.`),
      textBlock('bio2', `With a strong foundation in backend architecture and a pragmatic approach to technical leadership, Andrew brings clarity to large-scale challenges. He's especially skilled at process optimization and KPI-driven delivery, combining clean engineering practices with a deep understanding of business impact. Relentlessly curious and quietly exacting, Andrew continues to evolve his craft while helping teams deliver better software at scale.`),
    ],
    order: 13,
    isActive: true,
  },
  {
    _id: 'team-nathan-metzler',
    _type: 'teamMember',
    name: 'Nathan Metzler',
    slug: { _type: 'slug', current: 'nathan-metzler' },
    role: 'Brand Designer',
    bio: [
      textBlock('bio1', `Nathan specializes in the intersection of typography and brand identity. With a background in lettering, wordmark design, and custom type development, he brings a distinct visual language to every project — helping shape brands that are not only seen, but felt.`),
      textBlock('bio2', `From early moodboards and sketch exploration to vector refinement and typographic systems, he plays a key role in our Identity Design and Systemization work — transforming abstract brand ideas into cohesive, high-impact visual identities. His deep understanding of how type communicates allows him to anchor each design in a clear, intentional voice — one that extends seamlessly across websites, interfaces, packaging, and beyond.`),
    ],
    order: 14,
    isActive: true,
  },
]

// Case Studies
const caseStudies = [
  {
    _id: 'case-study-directions-group',
    _type: 'caseStudy',
    title: 'Directions Group Website Redesign',
    slug: { _type: 'slug', current: 'directions-group' },
    client: 'Directions Group',
    industry: 'professional-services',
    featured: true,
    challenge: [
      textBlock(
        'challenge1',
        'Directions Group, a leading Cincinnati-based business insights and analytics firm, had outgrown their digital presence. With new service offerings to showcase and a brand that no longer reflected their market position, they needed more than a refresh—they needed a complete transformation.'
      ),
    ],
    solution: [
      textBlock(
        'solution1',
        'We partnered closely with the Directions team to identify what made them distinct, then conducted aggressive competitor research to understand how similar firms address customer pain points. The result: a custom Webflow build optimized for speed, clarity, and conversion—with HubSpot and Google Analytics integrations for seamless lead management and performance tracking.'
      ),
    ],
    results: [
      { metric: '23%', label: 'Increase in decision-stage conversions', _key: 'result1' },
      { metric: '2.8x', label: 'Increase in ad click-through rate', _key: 'result2' },
    ],
    services: ['branding', 'website', 'analytics', 'crm-automation'],
    phases: ['foundation', 'activation'],
    publishedAt: '2026-01-04T10:00:00Z',
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
  console.log('Seeding job locations...')

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

  console.log('\nSeeding team members...')

  for (const member of teamMembers) {
    await client.createOrReplace(member)
    console.log(`  ✓ ${member.name}`)
  }

  console.log('\nSeeding case studies...')

  for (const caseStudy of caseStudies) {
    await client.createOrReplace(caseStudy)
    console.log(`  ✓ ${caseStudy.client}`)
  }

  console.log('\n✅ Seed complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

