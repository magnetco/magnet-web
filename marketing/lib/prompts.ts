export const PLATFORM_PROMPTS = {
  google_ad: `Generate Google Ads copy using David Ogilvy's principles - specificity, facts, and compelling benefits.

CRITICAL RULES:
- NO generic phrases like "Grow Your Firm" or "Drive Revenue"
- NO number strings or placeholder text
- USE specific facts from the context about Magnet's services, methodology, and results
- WRITE complete, substantive copy that sells
- INCLUDE concrete benefits and outcomes

Generate:
- headline1: Specific, benefit-driven headline (max 30 characters)
- headline2: Unique angle or proof point (max 30 characters)
- headline3: Clear differentiator (max 30 characters)
- description1: Detailed value proposition with specifics (max 90 characters)
- description2: Additional proof or benefit (max 90 characters)
- path1: Real path from magnet.co (pricing, method, contact, work, team, apply)
- path2: Real sub-path (foundation, activation, acceleration, retention, or service)

David Ogilvy style: "The consumer isn't a moron; she is your wife." Write with respect, specificity, and facts.
Use Magnet's actual services, methodology, and positioning from the context.`,

  linkedin_ad: `Generate LinkedIn Sponsored Content using David Ogilvy's principles.

CRITICAL RULES:
- NO generic phrases - use specific outcomes and methodology
- WRITE for senior B2B decision-makers
- INCLUDE concrete business outcomes from Magnet's work
- USE professional, credible language with substance

Generate:
- introText: Compelling hook with specific insight or outcome (max 150 characters)
- headline: Clear value proposition with specifics (max 70 characters)
- description: Concrete benefit or proof point (max 100 characters)
- ctaButton: One of "Learn more", "Sign up", "Register", "Download", "Get quote", "Apply now", "Contact us"

Write for executives who value precision and results. Use Magnet's actual methodology and positioning.`,

  linkedin_post: `Generate LinkedIn organic post using thought leadership principles.

CRITICAL RULES:
- LEAD with insight, not promotion
- USE specific examples from Magnet's methodology
- WRITE 150-300 characters of substantive content
- NO generic advice - share specific frameworks or insights
- HOOK readers with a counterintuitive truth or specific observation

Generate:
- postText: Thought-provoking insight with specific framework or approach (150-300 characters ideal)
- hashtags: Array of 3-5 relevant, specific hashtags (without #)

Write like a senior strategist sharing hard-won insights. Use Magnet's actual methodology and positioning.`,

  facebook: `Generate Facebook/Instagram ad copy using direct response principles.

CRITICAL RULES:
- NO vague phrases like "Grow Your Firm"
- WRITE complete, compelling copy with specific benefits
- USE concrete outcomes and methodology from context
- INCLUDE urgency or scarcity where appropriate

Generate:
- primaryText: Compelling, specific copy with clear benefit (USE FULL 125 characters)
- headline: Clear, benefit-driven headline (max 40 characters)
- description: Concrete outcome or proof (max 30 characters)
- ctaButton: One of "Learn more", "Sign up", "Shop now", "Book now", "Contact us", "Get offer"

Write for busy professionals scrolling feeds. Make every word count. Use Magnet's positioning.`,

  serp: `Generate SEO metadata using conversion-focused principles.

CRITICAL RULES:
- INCLUDE primary keyword naturally
- WRITE for clicks AND accuracy
- USE specific benefits and outcomes
- NO generic descriptions

Generate:
- title: Keyword-rich, benefit-driven title (max 60 characters)
- description: Compelling description with specific value props (max 160 characters)
- breadcrumbs: Array of 2-3 real URL segments

Write to maximize click-through while accurately representing the page.`,
} as const

export type Platform = keyof typeof PLATFORM_PROMPTS
