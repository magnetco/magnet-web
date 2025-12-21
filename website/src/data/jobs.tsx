import React from 'react'
import type { Job } from '@/components/sections/careers-listing'
import type { JobDetail } from '@/components/sections/job-detail'

// Basic job listing data
export const jobs: Job[] = [
  {
    id: 'senior-ui-ux-designer',
    title: 'Senior UI/UX Designer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Design',
  },
  {
    id: 'full-stack-web-developer',
    title: 'Full-Stack Web Developer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Development',
  },
  {
    id: 'paid-ads-specialist',
    title: 'Paid Ads Specialist',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah'],
    department: 'Marketing',
  },
  {
    id: 'search-marketer',
    title: 'Search Marketer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Irvine, California'],
    department: 'Marketing',
  },
  {
    id: 'copywriter',
    title: 'Copywriter',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Marketing',
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Irvine, California'],
    department: 'Design',
  },
  {
    id: 'marketing-strategist',
    title: 'Marketing Strategist',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Marketing',
  },
  {
    id: 'content-strategist',
    title: 'Content Strategist',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah'],
    department: 'Marketing',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Irvine, California'],
    department: 'Client Services',
  },
  {
    id: 'account-manager',
    title: 'Account Manager',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Client Services',
  },
]

// Full job detail data
export const jobDetails: Record<string, JobDetail> = {
  'senior-ui-ux-designer': {
    id: 'senior-ui-ux-designer',
    title: 'Senior UI/UX Designer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Design',
    content: {
      headline: 'Create Beautiful, Intuitive Digital Experiences',
      intro: (
        <>
          <p>
            At Magnet, we believe exceptional design is the foundation of every successful digital product. We're looking
            for a Senior UI/UX Designer who can transform complex ideas into elegant, user-centered solutions that drive
            results for our clients.
          </p>
          <p>
            You'll work alongside our talented team of developers, strategists, and marketers to create websites,
            applications, and digital experiences that not only look stunning but also convert visitors into customers.
            Your designs will directly impact our clients' success and help shape the future of digital marketing.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Senior UI/UX Designer at Magnet, you'll lead the design process from concept to completion. You'll
          collaborate closely with clients to understand their brand, audience, and business goals, then translate those
          insights into compelling visual designs and intuitive user experiences. You'll work on a diverse range of
          projects—from responsive websites and e-commerce platforms to marketing landing pages and web applications.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Lead the design process for web projects, creating wireframes, prototypes, and high-fidelity designs that
          balance aesthetics with functionality.
        </p>,
        <p key="2">
          Conduct user research, usability testing, and gather feedback to inform design decisions and improve user
          experiences.
        </p>,
        <p key="3">
          Collaborate with developers to ensure designs are implemented accurately and maintain design integrity across
          all devices and browsers.
        </p>,
        <p key="4">
          Present design concepts to clients, articulate design rationale, and incorporate feedback to refine solutions.
        </p>,
        <p key="5">
          Maintain and evolve design systems, style guides, and component libraries to ensure consistency across
          projects.
        </p>,
        <p key="6">
          Mentor junior designers and contribute to the growth of our design practice through knowledge sharing and best
          practices.
        </p>,
      ],
      qualifications: [
        <p key="1">
          5+ years of experience in UI/UX design with a strong portfolio showcasing web design projects and user-centered
          design thinking.
        </p>,
        <p key="2">
          Proficiency in design tools such as Figma, Adobe Creative Suite, and prototyping tools like Framer or Principle.
        </p>,
        <p key="3">
          Strong understanding of responsive design, accessibility standards (WCAG), and modern web design principles.
        </p>,
        <p key="4">
          Experience with user research methodologies, usability testing, and data-driven design decisions.
        </p>,
        <p key="5">
          Excellent communication skills and ability to present design work confidently to clients and stakeholders.
        </p>,
        <p key="6">
          Understanding of front-end development principles and ability to collaborate effectively with developers.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Join a team that values creativity, innovation, and the impact of great design. At Magnet, you'll work on
          diverse projects for exciting clients, have the opportunity to shape our design practice, and grow your career
          in a supportive, collaborative environment. We offer competitive compensation, flexible work arrangements, and
          the chance to make a real difference in how businesses connect with their audiences online.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'full-stack-web-developer': {
    id: 'full-stack-web-developer',
    title: 'Full-Stack Web Developer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Development',
    content: {
      headline: 'Build High-Performance Web Solutions',
      intro: (
        <>
          <p>
            Magnet is seeking a talented Full-Stack Web Developer to join our development team. You'll work on a variety
            of projects, from custom websites and e-commerce platforms to web applications and marketing tools that help
            our clients achieve their digital goals.
          </p>
          <p>
            We're looking for someone who is passionate about writing clean, efficient code and building solutions that
            are both powerful and maintainable. You'll collaborate with designers, marketers, and project managers to
            bring innovative ideas to life.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Full-Stack Web Developer at Magnet, you'll be responsible for building and maintaining web applications
          across the entire stack. You'll work with modern technologies and frameworks to create fast, scalable, and
          secure solutions. From database design to front-end implementation, you'll have the opportunity to work on
          diverse projects and solve complex technical challenges.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Develop responsive, performant web applications using modern frameworks and technologies (React, Next.js,
          Node.js, etc.).
        </p>,
        <p key="2">
          Design and implement RESTful APIs, database schemas, and backend services that power our web applications.
        </p>,
        <p key="3">
          Collaborate with designers to implement pixel-perfect UI components and ensure seamless user experiences.
        </p>,
        <p key="4">
          Write clean, maintainable, and well-documented code following best practices and coding standards.
        </p>,
        <p key="5">
          Optimize applications for performance, SEO, and accessibility across all devices and browsers.
        </p>,
        <p key="6">
          Participate in code reviews, testing, and deployment processes to ensure quality and reliability.
        </p>,
      ],
      qualifications: [
        <p key="1">
          4+ years of experience in full-stack web development with proficiency in JavaScript/TypeScript, HTML, and CSS.
        </p>,
        <p key="2">
          Strong experience with modern frameworks (React, Next.js, Vue, or similar) and backend technologies (Node.js,
          Python, PHP, etc.).
        </p>,
        <p key="3">
          Experience with database design and management (PostgreSQL, MySQL, MongoDB, or similar).
        </p>,
        <p key="4">
          Familiarity with version control (Git), CI/CD pipelines, and cloud platforms (AWS, Vercel, etc.).
        </p>,
        <p key="5">
          Understanding of web performance optimization, security best practices, and SEO principles.
        </p>,
        <p key="6">
          Strong problem-solving skills and ability to work independently as well as collaboratively in a team
          environment.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Work on exciting projects with cutting-edge technologies while being part of a supportive team that values
          innovation and continuous learning. At Magnet, you'll have opportunities to grow your skills, work on diverse
          challenges, and make a meaningful impact on our clients' success. We offer competitive benefits, flexible work
          arrangements, and a culture that celebrates technical excellence.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'paid-ads-specialist': {
    id: 'paid-ads-specialist',
    title: 'Paid Ads Specialist',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah'],
    department: 'Marketing',
    content: {
      headline: 'Drive Growth Through Strategic Paid Advertising',
      intro: (
        <>
          <p>
            Magnet is looking for a Paid Ads Specialist who can create and manage high-performing advertising campaigns
            across Google Ads, Meta, LinkedIn, and other platforms. You'll help our clients reach their target
            audiences and achieve their marketing goals through data-driven paid media strategies.
          </p>
          <p>
            If you're passionate about digital advertising, love analyzing data to optimize campaigns, and thrive in a
            fast-paced environment, this role is for you.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Paid Ads Specialist at Magnet, you'll manage paid advertising campaigns for multiple clients across
          various industries. You'll be responsible for campaign strategy, execution, optimization, and reporting. Your
          work will directly impact our clients' revenue and growth, making this a high-impact role with opportunities
          for significant professional development.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Develop and execute paid advertising strategies across Google Ads, Meta, LinkedIn, and other ad platforms.
        </p>,
        <p key="2">
          Create compelling ad copy, design ad creative, and optimize landing pages to maximize conversion rates.
        </p>,
        <p key="3">
          Monitor campaign performance, analyze data, and make data-driven optimizations to improve ROI and achieve
          client goals.
        </p>,
        <p key="4">
          Conduct keyword research, audience targeting, and A/B testing to continuously improve campaign performance.
        </p>,
        <p key="5">
          Prepare and present regular performance reports to clients, explaining results and recommendations.
        </p>,
        <p key="6">
          Stay current with platform updates, industry trends, and best practices in paid advertising.
        </p>,
      ],
      qualifications: [
        <p key="1">
          3+ years of experience managing paid advertising campaigns, preferably in an agency environment.
        </p>,
        <p key="2">
          Certifications in Google Ads, Meta Blueprint, or other relevant advertising platforms are highly preferred.
        </p>,
        <p key="3">
          Strong analytical skills and experience with analytics tools (Google Analytics, Facebook Analytics, etc.).
        </p>,
        <p key="4">
          Experience with conversion tracking, pixel implementation, and attribution modeling.
        </p>,
        <p key="5">
          Excellent communication skills and ability to explain complex concepts to clients in clear, actionable terms.
        </p>,
        <p key="6">
          Self-motivated with strong attention to detail and ability to manage multiple campaigns simultaneously.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Join a team of marketing experts where your work directly drives client success. You'll work with diverse
          clients, manage substantial ad budgets, and have the opportunity to grow your expertise in paid advertising.
          We offer competitive compensation, professional development opportunities, and a collaborative environment where
          your ideas and contributions are valued.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'search-marketer': {
    id: 'search-marketer',
    title: 'Search Marketer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Irvine, California'],
    department: 'Marketing',
    content: {
      headline: 'Optimize Visibility and Drive Organic Growth',
      intro: (
        <>
          <p>
            Magnet is seeking a Search Marketer to help our clients improve their search engine visibility and drive
            organic traffic through SEO and search marketing strategies. You'll work on technical SEO, content
            optimization, link building, and local SEO to help businesses rank higher and attract more qualified
            visitors.
          </p>
          <p>
            If you're passionate about search engines, love diving into analytics, and enjoy the challenge of improving
            rankings, we want to hear from you.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Search Marketer at Magnet, you'll develop and execute comprehensive SEO strategies for our clients. You'll
          conduct technical audits, optimize content, build quality backlinks, and track performance to ensure our
          clients achieve their organic search goals. This role requires a mix of technical skills, analytical thinking,
          and creative problem-solving.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Conduct comprehensive SEO audits, identify technical issues, and develop action plans to improve search
          rankings.
        </p>,
        <p key="2">
          Perform keyword research, competitive analysis, and develop content strategies aligned with search intent.
        </p>,
        <p key="3">
          Optimize website content, meta tags, and on-page elements to improve search visibility and click-through rates.
        </p>,
        <p key="4">
          Build and maintain quality backlinks through outreach, partnerships, and content marketing initiatives.
        </p>,
        <p key="5">
          Monitor search rankings, track performance metrics, and provide regular reports with insights and
          recommendations.
        </p>,
        <p key="6">
          Stay current with search engine algorithm updates, SEO best practices, and industry trends.
        </p>,
      ],
      qualifications: [
        <p key="1">
          3+ years of experience in SEO and search marketing, with proven results improving organic search rankings.
        </p>,
        <p key="2">
          Strong understanding of technical SEO, including site architecture, crawlability, indexing, and Core Web Vitals.
        </p>,
        <p key="3">
          Experience with SEO tools such as Ahrefs, SEMrush, Moz, Screaming Frog, and Google Search Console.
        </p>,
        <p key="4">
          Knowledge of HTML, CSS, and basic web development concepts to communicate effectively with developers.
        </p>,
        <p key="5">
          Strong analytical skills and experience with Google Analytics and other analytics platforms.
        </p>,
        <p key="6">
          Excellent written communication skills and ability to create SEO-friendly content and outreach materials.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Work with a team that values data-driven strategies and long-term results. You'll have the opportunity to work
          on diverse projects, see measurable impact from your efforts, and continuously grow your expertise in search
          marketing. We offer competitive benefits, professional development opportunities, and a culture that encourages
          innovation and continuous learning.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'copywriter': {
    id: 'copywriter',
    title: 'Copywriter',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Marketing',
    content: {
      headline: 'Craft Compelling Copy That Converts',
      intro: (
        <>
          <p>
            Magnet is looking for a talented Copywriter who can create persuasive, engaging copy that drives action. You'll
            write for websites, landing pages, email campaigns, social media, and advertising across a variety of
            industries and client needs.
          </p>
          <p>
            If you have a way with words, understand what motivates people to take action, and can adapt your voice to
            different brands and audiences, this role is perfect for you.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Copywriter at Magnet, you'll be responsible for creating compelling copy that helps our clients connect
          with their audiences and achieve their marketing goals. You'll work closely with designers, strategists, and
          clients to understand brand voice, target audience, and objectives, then craft copy that resonates and converts.
          From headlines to long-form content, you'll write across all channels and formats.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Write compelling copy for websites, landing pages, email campaigns, social media, and paid advertising.
        </p>,
        <p key="2">
          Collaborate with designers and strategists to ensure copy and design work together to create cohesive,
          effective campaigns.
        </p>,
        <p key="3">
          Adapt writing style and tone to match different brand voices and target audiences across various industries.
        </p>,
        <p key="4">
          Conduct research to understand client industries, competitors, and target audiences to inform copy strategy.
        </p>,
        <p key="5">
          Edit and proofread copy to ensure accuracy, clarity, and consistency with brand guidelines.
        </p>,
        <p key="6">
          Participate in client meetings, present copy concepts, and incorporate feedback to refine messaging.
        </p>,
      ],
      qualifications: [
        <p key="1">
          3+ years of copywriting experience, preferably in an agency or marketing environment, with a strong portfolio
          showcasing diverse writing samples.
        </p>,
        <p key="2">
          Exceptional writing skills with ability to write clear, persuasive copy that drives action and engagement.
        </p>,
        <p key="3">
          Understanding of marketing principles, conversion optimization, and how copy influences user behavior.
        </p>,
        <p key="4">
          Ability to adapt writing style to different brands, industries, and audiences while maintaining authenticity.
        </p>,
        <p key="5">
          Strong research skills and ability to quickly understand complex topics and translate them into accessible copy.
        </p>,
        <p key="6">
          Excellent communication skills and ability to collaborate effectively with team members and clients.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Join a creative team where your words have real impact. You'll work on diverse projects, collaborate with
          talented designers and strategists, and see your copy drive results for clients. We offer competitive
          compensation, opportunities for professional growth, and a supportive environment where creativity and
          innovation are encouraged.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'graphic-designer': {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Irvine, California'],
    department: 'Design',
    content: {
      headline: 'Create Visual Brand Experiences',
      intro: (
        <>
          <p>
            Magnet is seeking a Graphic Designer to create stunning visual designs for our clients' digital and print
            marketing materials. You'll work on brand identities, marketing collateral, social media graphics, and web
            design elements that help businesses stand out and connect with their audiences.
          </p>
          <p>
            If you're a creative problem-solver with a strong eye for design and a passion for creating beautiful,
            effective visuals, we'd love to have you on our team.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Graphic Designer at Magnet, you'll create visual designs that bring brands to life across various
          platforms and mediums. You'll work on everything from logo design and brand identity to social media graphics,
          marketing materials, and web design elements. You'll collaborate with our team of designers, developers, and
          marketers to ensure visual consistency and brand alignment across all touchpoints.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Create visual designs for websites, social media, marketing materials, and brand identity projects.
        </p>,
        <p key="2">
          Develop brand guidelines, style guides, and design systems to ensure visual consistency across all client
          materials.
        </p>,
        <p key="3">
          Collaborate with UI/UX designers, developers, and marketers to create cohesive visual experiences.
        </p>,
        <p key="4">
          Prepare design files for production, ensuring proper formatting and specifications for web and print.
        </p>,
        <p key="5">
          Present design concepts to clients, incorporate feedback, and refine designs to meet project objectives.
        </p>,
        <p key="6">
          Stay current with design trends, tools, and best practices to continuously improve design quality.
        </p>,
      ],
      qualifications: [
        <p key="1">
          3+ years of graphic design experience with a strong portfolio showcasing diverse design work across digital and
          print mediums.
        </p>,
        <p key="2">
          Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign) and modern design tools (Figma, Sketch).
        </p>,
        <p key="3">
          Strong understanding of typography, color theory, composition, and visual hierarchy.
        </p>,
        <p key="4">
          Experience with brand identity design, logo creation, and developing comprehensive brand guidelines.
        </p>,
        <p key="5">
          Knowledge of print production processes and web design principles for digital applications.
        </p>,
        <p key="6">
          Excellent communication skills and ability to present design work and rationale to clients and team members.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Work on exciting projects with creative freedom to explore new ideas and push boundaries. You'll collaborate
          with a talented team, work with diverse clients, and see your designs come to life across various platforms. We
          offer competitive benefits, professional development opportunities, and a culture that celebrates creativity and
          innovation.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'marketing-strategist': {
    id: 'marketing-strategist',
    title: 'Marketing Strategist',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Marketing',
    content: {
      headline: 'Develop Data-Driven Marketing Strategies',
      intro: (
        <>
          <p>
            Magnet is looking for a Marketing Strategist who can develop comprehensive marketing strategies that drive
            growth for our clients. You'll analyze markets, understand customer behavior, and create integrated marketing
            plans that leverage multiple channels and tactics to achieve business objectives.
          </p>
          <p>
            If you're strategic, analytical, and passionate about helping businesses grow through effective marketing,
            this role offers the opportunity to make a significant impact.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Marketing Strategist at Magnet, you'll work closely with clients to understand their business goals,
          target audiences, and competitive landscape. You'll develop comprehensive marketing strategies, create
          roadmaps, and guide execution across digital channels. Your strategic thinking will help shape how our clients
          connect with their audiences and achieve their growth objectives.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Conduct market research, competitive analysis, and customer research to inform marketing strategy development.
        </p>,
        <p key="2">
          Develop comprehensive marketing strategies and roadmaps that align with client business objectives and budgets.
        </p>,
        <p key="3">
          Create integrated marketing plans that leverage multiple channels (SEO, paid ads, content, email, social, etc.).
        </p>,
        <p key="4">
          Analyze marketing performance data, identify insights, and make recommendations to optimize strategies and
          improve ROI.
        </p>,
        <p key="5">
          Present strategies and recommendations to clients, explaining rationale and expected outcomes.
        </p>,
        <p key="6">
          Collaborate with cross-functional teams to ensure strategy is executed effectively and aligned with client goals.
        </p>,
      ],
      qualifications: [
        <p key="1">
          5+ years of experience in marketing strategy, preferably in an agency environment, with proven success
          developing and executing marketing plans.
        </p>,
        <p key="2">
          Strong analytical skills and experience with marketing analytics tools (Google Analytics, marketing automation
          platforms, etc.).
        </p>,
        <p key="3">
          Deep understanding of digital marketing channels, tactics, and how they work together in integrated campaigns.
        </p>,
        <p key="4">
          Experience with market research, customer segmentation, and developing buyer personas.
        </p>,
        <p key="5">
          Excellent presentation and communication skills with ability to explain complex strategies to diverse audiences.
        </p>,
        <p key="6">
          Strategic thinking with ability to see the big picture while also focusing on tactical execution details.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Join a team where strategic thinking is valued and your ideas shape client success. You'll work on diverse
          projects, collaborate with talented marketers and creatives, and see your strategies drive real results. We
          offer competitive compensation, opportunities for professional growth, and a culture that encourages innovation
          and strategic excellence.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'content-strategist': {
    id: 'content-strategist',
    title: 'Content Strategist',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah'],
    department: 'Marketing',
    content: {
      headline: 'Shape Content That Engages and Converts',
      intro: (
        <>
          <p>
            Magnet is seeking a Content Strategist to develop content strategies that help our clients engage their
            audiences, build authority, and drive business results. You'll plan content across blogs, social media,
            email, and other channels to support marketing goals and create meaningful connections with customers.
          </p>
          <p>
            If you're strategic, creative, and understand how content can drive business outcomes, this role offers the
            opportunity to shape content programs that make a real impact.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Content Strategist at Magnet, you'll develop comprehensive content strategies that align with client
          marketing objectives and audience needs. You'll plan content calendars, identify content opportunities, and
          guide content creation across various formats and channels. Your strategic thinking will help ensure content
          drives engagement, builds brand authority, and supports conversion goals.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Develop content strategies and editorial calendars that align with client marketing goals and audience needs.
        </p>,
        <p key="2">
          Conduct content audits, competitive research, and keyword research to identify content opportunities.
        </p>,
        <p key="3">
          Create content briefs and guidelines for writers and creators to ensure consistency and quality.
        </p>,
        <p key="4">
          Plan content across multiple channels (blog, social media, email, video, etc.) to create integrated content
          experiences.
        </p>,
        <p key="5">
          Analyze content performance, identify what resonates with audiences, and optimize strategies based on data.
        </p>,
        <p key="6">
          Collaborate with SEO specialists, copywriters, and designers to ensure content is optimized and visually
          compelling.
        </p>,
      ],
      qualifications: [
        <p key="1">
          4+ years of experience in content strategy or content marketing, with proven success developing and executing
          content programs.
        </p>,
        <p key="2">
          Strong understanding of content marketing principles, SEO, and how content drives business outcomes.
        </p>,
        <p key="3">
          Experience with content planning tools, editorial calendars, and content management systems.
        </p>,
        <p key="4">
          Knowledge of different content formats (blog posts, social media, email, video, etc.) and when to use each.
        </p>,
        <p key="5">
          Strong analytical skills and ability to measure content performance and ROI.
        </p>,
        <p key="6">
          Excellent communication skills and ability to collaborate effectively with writers, designers, and clients.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Work in a creative environment where content strategy is valued and your ideas shape how brands connect with
          their audiences. You'll work on diverse projects, collaborate with talented creators, and see your content
          strategies drive engagement and results. We offer competitive benefits, professional development opportunities,
          and a culture that celebrates creativity and strategic thinking.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'project-manager': {
    id: 'project-manager',
    title: 'Project Manager',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Irvine, California'],
    department: 'Client Services',
    content: {
      headline: 'Lead Projects to Successful Completion',
      intro: (
        <>
          <p>
            Magnet is looking for a Project Manager to oversee web development, design, and marketing projects from
            initiation to completion. You'll work closely with clients, designers, developers, and marketers to ensure
            projects are delivered on time, within budget, and exceed expectations.
          </p>
          <p>
            If you're organized, detail-oriented, and thrive on bringing order to complex projects, this role offers the
            opportunity to make a significant impact on client success and team efficiency.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As a Project Manager at Magnet, you'll be the central point of coordination for multiple client projects. You'll
          manage timelines, budgets, resources, and communication to ensure smooth project execution. You'll work with
          cross-functional teams to remove obstacles, facilitate collaboration, and ensure everyone has what they need to
          deliver exceptional work.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Plan and manage project timelines, budgets, and resources to ensure successful project delivery.
        </p>,
        <p key="2">
          Facilitate communication between clients and internal teams, ensuring clear expectations and regular updates.
        </p>,
        <p key="3">
          Identify and mitigate project risks, resolve issues, and remove obstacles that could impact project success.
        </p>,
        <p key="4">
          Coordinate with designers, developers, and marketers to ensure seamless collaboration and workflow.
        </p>,
        <p key="5">
          Track project progress, manage change requests, and ensure deliverables meet quality standards.
        </p>,
        <p key="6">
          Conduct project retrospectives and identify opportunities to improve processes and efficiency.
        </p>,
      ],
      qualifications: [
        <p key="1">
          4+ years of project management experience, preferably in a digital agency or web development environment.
        </p>,
        <p key="2">
          Experience managing multiple projects simultaneously with varying timelines and complexity.
        </p>,
        <p key="3">
          Strong organizational skills and attention to detail with ability to track multiple moving parts.
        </p>,
        <p key="4">
          Excellent communication and interpersonal skills with ability to work effectively with diverse teams and clients.
        </p>,
        <p key="5">
          Familiarity with project management tools (Asana, Monday.com, Jira, etc.) and methodologies (Agile, Scrum).
        </p>,
        <p key="6">
          Problem-solving mindset with ability to think critically and make decisions under pressure.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Join a team where your organizational skills and leadership make a real difference. You'll work on exciting
          projects, collaborate with talented professionals, and see your efforts directly contribute to client success and
          team efficiency. We offer competitive compensation, professional development opportunities, and a culture that
          values clear communication and effective project delivery.
        </p>
      ),
    },
    applyUrl: '#',
  },
  'account-manager': {
    id: 'account-manager',
    title: 'Account Manager',
    type: 'Hybrid / Full Time',
    locations: ['Cincinnati, Ohio', 'Salt Lake City, Utah', 'Irvine, California'],
    department: 'Client Services',
    content: {
      headline: 'Build Strong Client Relationships',
      intro: (
        <>
          <p>
            Magnet is seeking an Account Manager to serve as the primary point of contact for our clients, ensuring their
            needs are met and their marketing goals are achieved. You'll build strong relationships, understand client
            businesses, and coordinate with our team to deliver exceptional service and results.
          </p>
          <p>
            If you're client-focused, relationship-driven, and passionate about helping businesses succeed, this role
            offers the opportunity to make a meaningful impact on client satisfaction and business growth.
          </p>
        </>
      ),
      aboutRole: (
        <p>
          As an Account Manager at Magnet, you'll be responsible for managing client relationships and ensuring their
          success with our services. You'll serve as the bridge between clients and our internal team, understanding
          client needs, communicating regularly, and ensuring projects and campaigns are aligned with their business
          objectives. Your relationship-building skills will be key to client retention and growth.
        </p>
      ),
      responsibilities: [
        <p key="1">
          Serve as the primary point of contact for assigned clients, building strong relationships and ensuring client
          satisfaction.
        </p>,
        <p key="2">
          Understand client businesses, goals, and challenges to provide strategic guidance and recommendations.
        </p>,
        <p key="3">
          Coordinate with internal teams (design, development, marketing) to ensure client needs are met and projects are
          delivered successfully.
        </p>,
        <p key="4">
          Conduct regular client meetings, provide updates on project progress and campaign performance.
        </p>,
        <p key="5">
          Identify opportunities to expand services and grow client accounts through upselling and cross-selling.
        </p>,
        <p key="6">
          Resolve client issues, manage expectations, and ensure clear communication throughout the client lifecycle.
        </p>,
      ],
      qualifications: [
        <p key="1">
          3+ years of account management experience, preferably in a digital agency or marketing services environment.
        </p>,
        <p key="2">
          Strong relationship-building skills with ability to connect with clients and understand their business needs.
        </p>,
        <p key="3">
          Excellent communication skills, both written and verbal, with ability to present ideas and results
          professionally.
        </p>,
        <p key="4">
          Understanding of digital marketing, web development, and design services to effectively communicate with clients
          and internal teams.
        </p>,
        <p key="5">
          Experience managing multiple client accounts simultaneously while maintaining high levels of service.
        </p>,
        <p key="6">
          Problem-solving mindset with ability to navigate challenges and find solutions that benefit both clients and the
          agency.
        </p>,
      ],
      whyJoinUs: (
        <p>
          Work in a client-focused environment where building relationships and ensuring client success is at the heart of
          what we do. You'll work with diverse clients, collaborate with talented teams, and see your efforts directly
          contribute to client growth and satisfaction. We offer competitive compensation, professional development
          opportunities, and a culture that values client relationships and exceptional service.
        </p>
      ),
    },
    applyUrl: '#',
  },
}

// Helper function to get job detail by slug
export function getJobDetailBySlug(slug: string): JobDetail | undefined {
  return jobDetails[slug]
}

// Helper function to get all job slugs
export function getAllJobSlugs(): string[] {
  return jobs.map((job) => job.id)
}

