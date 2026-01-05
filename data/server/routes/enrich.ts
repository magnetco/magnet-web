import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

async function queryPerplexity(messages: PerplexityMessage[]): Promise<string> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY is not configured')
  }

  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages,
      max_tokens: 1024,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Perplexity API error: ${res.status} ${error}`)
  }

  const data: PerplexityResponse = await res.json()
  return data.choices[0].message.content
}

// Enrich a company
router.post('/companies/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Get current company data
    const companies = await sql`SELECT * FROM companies WHERE id = ${id}`
    if (companies.length === 0) {
      return res.status(404).json({ error: 'Company not found' })
    }

    const company = companies[0]

    // Build context-aware prompt
    const prompt = `Research the company "${company.name}"${company.website ? ` (website: ${company.website})` : ''}.

Return ONLY a JSON object with these fields (use null for unknown):
{
  "website": "https://example.com - their corporate website URL",
  "industry": "comma-separated industries/sectors they operate in (e.g. 'Software, SaaS, Marketing Technology')",
  "size": "employee count range like '50-100' or '1000+'",
  "employee_count": 150,
  "description": "1-2 sentence company description",
  "headquarters": "city, country",
  "founded_year": 2015,
  "annual_revenue": "$10M-$50M or similar range",
  "linkedin_url": "https://linkedin.com/company/...",
  "funding_stage": "Series B, Public, Bootstrapped, etc.",
  "total_funding": "$50M or similar",
  "technologies": "comma-separated tech stack if known",
  "phone": "main company phone if available"
}

Be concise and factual. Return only valid JSON, no markdown.`

    const enrichedData = await queryPerplexity([
      { role: 'system', content: 'You are a business research assistant. Return only valid JSON.' },
      { role: 'user', content: prompt },
    ])

    // Parse the response
    let parsed: Record<string, string | null>
    try {
      // Clean potential markdown code blocks
      const cleaned = enrichedData.replace(/```json\n?|\n?```/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return res.status(500).json({ error: 'Failed to parse enrichment data', raw: enrichedData })
    }

    // Update fields that have new data and were previously empty
    const updates: { field: string; oldValue: string | number | null; newValue: string | number }[] = []

    // Text fields
    const textFieldMappings: Array<{ parsed: string; db: string }> = [
      { parsed: 'website', db: 'website' },
      { parsed: 'industry', db: 'industry' },
      { parsed: 'size', db: 'size' },
      { parsed: 'description', db: 'description' },
      { parsed: 'headquarters', db: 'headquarters' },
      { parsed: 'annual_revenue', db: 'annual_revenue' },
      { parsed: 'linkedin_url', db: 'linkedin_url' },
      { parsed: 'funding_stage', db: 'funding_stage' },
      { parsed: 'total_funding', db: 'total_funding' },
      { parsed: 'technologies', db: 'technologies' },
      { parsed: 'phone', db: 'phone' },
    ]

    for (const { parsed: parsedField, db: dbField } of textFieldMappings) {
      if (parsed[parsedField] && !company[dbField]) {
        updates.push({ field: dbField, oldValue: company[dbField], newValue: parsed[parsedField] })
      }
    }

    // Integer fields
    if (parsed.founded_year && !company.founded_year) {
      const year = typeof parsed.founded_year === 'number' ? parsed.founded_year : parseInt(parsed.founded_year)
      if (!isNaN(year)) {
        updates.push({ field: 'founded_year', oldValue: company.founded_year, newValue: year })
      }
    }
    if (parsed.employee_count && !company.employee_count) {
      const count = typeof parsed.employee_count === 'number' ? parsed.employee_count : parseInt(parsed.employee_count)
      if (!isNaN(count)) {
        updates.push({ field: 'employee_count', oldValue: company.employee_count, newValue: count })
      }
    }

    // Apply updates
    for (const update of updates) {
      const query = `UPDATE companies SET ${update.field} = $1, updated_at = NOW() WHERE id = $2`
      await sql(query, [update.newValue, id])
      await logVersion('companies', parseInt(id), update.field, update.oldValue, update.newValue)
    }

    const updated = await sql`SELECT * FROM companies WHERE id = ${id}`
    res.json({
      success: true,
      enriched: parsed,
      fieldsUpdated: updates.map(u => u.field),
      record: updated[0],
    })
  } catch (error) {
    console.error('Error enriching company:', error)
    res.status(500).json({ error: 'Failed to enrich company', details: String(error) })
  }
})

// Enrich a person
router.post('/people/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const people = await sql`
      SELECT p.*, c.name as company_name 
      FROM people p 
      LEFT JOIN companies c ON p.company_id = c.id 
      WHERE p.id = ${id}
    `
    if (people.length === 0) {
      return res.status(404).json({ error: 'Person not found' })
    }

    const person = people[0]

    const prompt = `Research the professional "${person.name}"${person.company_name ? ` who works at ${person.company_name}` : ''}${person.linkedin_url ? ` (LinkedIn: ${person.linkedin_url})` : ''}.

Return ONLY a JSON object with these fields (use null for unknown):
{
  "title": "their current job title",
  "summary": "1-2 sentence professional background",
  "location": "city, state/country",
  "seniority_level": "Entry, Mid, Senior, Director, VP, or C-Level",
  "department": "Marketing, Engineering, Sales, Finance, Operations, HR, etc.",
  "twitter_url": "https://twitter.com/handle or https://x.com/handle",
  "previous_companies": "comma-separated list of notable prior employers"
}

Be concise and factual. Return only valid JSON, no markdown.`

    const enrichedData = await queryPerplexity([
      { role: 'system', content: 'You are a professional research assistant. Return only valid JSON.' },
      { role: 'user', content: prompt },
    ])

    let parsed: Record<string, string | null>
    try {
      const cleaned = enrichedData.replace(/```json\n?|\n?```/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return res.status(500).json({ error: 'Failed to parse enrichment data', raw: enrichedData })
    }

    const updates: { field: string; oldValue: string | null; newValue: string }[] = []

    const fieldMappings: Array<{ parsed: string; db: string }> = [
      { parsed: 'title', db: 'title' },
      { parsed: 'summary', db: 'notes' },
      { parsed: 'location', db: 'location' },
      { parsed: 'seniority_level', db: 'seniority_level' },
      { parsed: 'department', db: 'department' },
      { parsed: 'twitter_url', db: 'twitter_url' },
      { parsed: 'previous_companies', db: 'previous_companies' },
    ]

    for (const { parsed: parsedField, db: dbField } of fieldMappings) {
      if (parsed[parsedField] && !person[dbField]) {
        updates.push({ field: dbField, oldValue: person[dbField], newValue: parsed[parsedField] })
      }
    }

    for (const update of updates) {
      const query = `UPDATE people SET ${update.field} = $1, updated_at = NOW() WHERE id = $2`
      await sql(query, [update.newValue, id])
      await logVersion('people', parseInt(id), update.field, update.oldValue, update.newValue)
    }

    const updated = await sql`SELECT * FROM people WHERE id = ${id}`
    res.json({
      success: true,
      enriched: parsed,
      fieldsUpdated: updates.map(u => u.field),
      record: updated[0],
    })
  } catch (error) {
    console.error('Error enriching person:', error)
    res.status(500).json({ error: 'Failed to enrich person', details: String(error) })
  }
})

export default router

