import { createGroq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { getContext } from '@/lib/context'
import { PLATFORM_PROMPTS, Platform } from '@/lib/prompts'
import { NextResponse } from 'next/server'

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  try {
    const { platform, segment, topic, additionalContext, count = 1 } = await req.json()

    if (!PLATFORM_PROMPTS[platform as Platform]) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
    }

    const context = getContext()

    const systemPrompt = `You are an expert B2B copywriter trained in David Ogilvy's principles, writing for Magnet.

MAGNET CONTEXT - Use these facts in your copy:

BRAND & VOICE:
${context.brand}

STRATEGY & POSITIONING:
${context.strategy}

TARGET CUSTOMERS:
${context.icp}

COPYWRITING PRINCIPLES (David Ogilvy):
1. "The consumer isn't a moron; she is your wife" - Write with respect and intelligence
2. Use specific facts and figures, not vague claims
3. Long copy sells better than short copy when it's good
4. Headlines should promise a benefit
5. Include news and useful information
6. Be specific - "This product increased sales by 23%" beats "This product increases sales"

TASK:
${PLATFORM_PROMPTS[platform as Platform]}

Generate ${count} ${count > 1 ? 'distinct variations' : 'variation'}. Each should be unique with different angles, benefits, or approaches.

CRITICAL: Return ONLY a raw JSON object. Format:
${count > 1 ? '{"variations": [variation1, variation2, ...]}' : 'Just the variation object itself'}

Do not wrap in markdown. No text before or after JSON.`

    const userPrompt = `Target segment: ${segment}
Topic/focus: ${topic}
${additionalContext ? `Additional context: ${additionalContext}` : ''}

Generate ${count} high-quality ${count > 1 ? 'variations' : 'variation'} using Magnet's actual services, methodology, and positioning.`

    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: count > 1 ? 2000 : 1000,
    })

    // Parse the JSON response, stripping markdown if present
    let text = result.text.trim()
    
    // Remove markdown code blocks if present
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }
    
    const parsed = JSON.parse(text)
    
    // Handle both single and multiple variations
    const variations = count > 1 && parsed.variations ? parsed.variations : [parsed]
    
    // Analyze sentiment for each variation
    const analyzed = variations.map((content: any) => ({
      content,
      score: analyzeAdQuality(content, platform as Platform),
    }))

    return NextResponse.json({ 
      variations: analyzed,
      count: analyzed.length 
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

// Analyze ad quality based on conversion optimization principles
function analyzeAdQuality(content: any, platform: Platform): {
  overall: number
  specificity: number
  clarity: number
  urgency: number
  credibility: number
  feedback: string[]
} {
  const feedback: string[] = []
  let specificity = 5
  let clarity = 5
  let urgency = 5
  let credibility = 5

  // Get all text content
  const allText = Object.values(content).join(' ').toLowerCase()

  // Check for generic phrases (reduce score)
  const genericPhrases = ['grow your', 'drive revenue', 'boost sales', 'increase profits', 'improve performance']
  if (genericPhrases.some(phrase => allText.includes(phrase))) {
    specificity -= 2
    feedback.push('⚠️ Contains generic phrases - be more specific')
  }

  // Check for numbers/specifics (increase score)
  if (/\d+%|\d+x|\$\d+/.test(allText)) {
    specificity += 2
    credibility += 1
    feedback.push('✓ Includes specific numbers')
  }

  // Check for methodology/process words (increase credibility)
  const methodWords = ['framework', 'system', 'process', 'methodology', 'architecture']
  if (methodWords.some(word => allText.includes(word))) {
    credibility += 1
    feedback.push('✓ References methodology')
  }

  // Check copy length (platform-specific)
  if (platform === 'facebook' && content.primaryText) {
    if (content.primaryText.length < 50) {
      clarity -= 2
      feedback.push('⚠️ Primary text too short - use more copy')
    } else if (content.primaryText.length > 100) {
      feedback.push('✓ Good use of available space')
    }
  }

  // Check for urgency indicators
  const urgencyWords = ['now', 'today', 'limited', 'exclusive', 'only']
  if (urgencyWords.some(word => allText.includes(word))) {
    urgency += 1
    feedback.push('✓ Includes urgency')
  }

  // Check for clear CTA/benefit
  const benefitWords = ['save', 'increase', 'reduce', 'improve', 'achieve', 'build', 'scale']
  if (benefitWords.some(word => allText.includes(word))) {
    clarity += 1
  }

  // Normalize scores to 0-10
  specificity = Math.max(0, Math.min(10, specificity))
  clarity = Math.max(0, Math.min(10, clarity))
  urgency = Math.max(0, Math.min(10, urgency))
  credibility = Math.max(0, Math.min(10, credibility))

  const overall = Math.round((specificity + clarity + urgency + credibility) / 4)

  return {
    overall,
    specificity,
    clarity,
    urgency,
    credibility,
    feedback,
  }
}
