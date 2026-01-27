import { neon } from '@neondatabase/serverless'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables
const envPath = path.join(__dirname, '../.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      process.env[key] = value
    }
  })
}

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not found in .env file')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

interface PageSection {
  section_type: string
  section_name?: string
  headline?: string
  subheadline?: string
  body_copy?: string
  cta_text?: string
  sort_order: number
}

interface LandingPage {
  name: string
  slug: string
  file_path: string
  url_path: string
  sections: PageSection[]
}

// Define the pages to sync
const PAGES_TO_SYNC = [
  {
    name: 'Homepage',
    slug: 'home',
    file_path: 'website/src/app/page.tsx',
    url_path: '/',
  },
  {
    name: 'Websites Service',
    slug: 'websites',
    file_path: 'website/src/app/websites/page.tsx',
    url_path: '/websites',
  },
  {
    name: 'Branding Service',
    slug: 'branding',
    file_path: 'website/src/app/branding/page.tsx',
    url_path: '/branding',
  },
  {
    name: 'Paid Media Service',
    slug: 'ads',
    file_path: 'website/src/app/ads/page.tsx',
    url_path: '/ads',
  },
  {
    name: 'Search Marketing Service',
    slug: 'search',
    file_path: 'website/src/app/search/page.tsx',
    url_path: '/search',
  },
  {
    name: 'Engineering Service',
    slug: 'engineering',
    file_path: 'website/src/app/engineering/page.tsx',
    url_path: '/engineering',
  },
]

// Helper function to clean JSX content and extract text
function cleanJSXContent(content: string): string {
  if (!content) return ''
  
  // Remove JSX tags but keep the text content
  let cleaned = content
    .replace(/<[^>]+>/g, ' ') // Remove HTML/JSX tags
    .replace(/\{[^}]*\}/g, ' ') // Remove JSX expressions
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  return cleaned
}

// Extract text from a prop value (handles strings and JSX)
function extractPropValue(content: string, propName: string): string | null {
  // Try to match string prop: propName="value" or propName='value'
  const stringMatch = content.match(new RegExp(`${propName}=["']([^"']+)["']`))
  if (stringMatch) {
    return stringMatch[1]
  }
  
  // Try to match JSX prop: propName={<>...</>} or propName={<p>...</p>}
  const jsxMatch = content.match(new RegExp(`${propName}=\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`, 's'))
  if (jsxMatch) {
    return cleanJSXContent(jsxMatch[1])
  }
  
  return null
}

// Extract multiline JSX content between tags
function extractJSXBlock(content: string, startPattern: string, endPattern: string = '>'): string | null {
  const regex = new RegExp(`${startPattern}([\\s\\S]*?)${endPattern}`, 'm')
  const match = content.match(regex)
  if (match) {
    return cleanJSXContent(match[1])
  }
  return null
}

// Parse a single component and extract its copy
function parseComponent(componentMatch: string, componentType: string, sortOrder: number): PageSection | null {
  const section: PageSection = {
    section_type: componentType,
    sort_order: sortOrder,
  }
  
  // Extract common props
  const headline = extractPropValue(componentMatch, 'headline')
  const subheadline = extractPropValue(componentMatch, 'subheadline')
  const eyebrow = extractPropValue(componentMatch, 'eyebrow')
  const title = extractPropValue(componentMatch, 'title')
  const description = extractPropValue(componentMatch, 'description')
  
  if (headline) section.headline = headline
  if (subheadline) section.subheadline = subheadline
  if (eyebrow && !headline) section.headline = eyebrow
  if (title && !headline) section.headline = title
  if (description && !subheadline) section.subheadline = description
  
  // Only return if we extracted something meaningful
  if (section.headline || section.subheadline || section.body_copy) {
    return section
  }
  
  return null
}

// Extract all sections from a page file
function extractSections(filePath: string): PageSection[] {
  const absolutePath = path.join(process.cwd(), '..', filePath)
  
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠️  File not found: ${filePath}`)
    return []
  }
  
  const content = fs.readFileSync(absolutePath, 'utf8')
  const sections: PageSection[] = []
  let sortOrder = 0
  
  // Component patterns to look for
  const componentPatterns = [
    { pattern: /<HeroLeftAlignedWithDemo[\s\S]*?\/>/g, type: 'hero' },
    { pattern: /<HeroCenteredWithDemo[\s\S]*?\/>/g, type: 'hero' },
    { pattern: /<FeaturesBentoGrid[\s\S]*?\/>/g, type: 'features' },
    { pattern: /<StatsWithGraph[\s\S]*?<\/StatsWithGraph>/g, type: 'stats' },
    { pattern: /<TestimonialsAnimatedGrid[\s\S]*?\/>/g, type: 'testimonials' },
    { pattern: /<TestimonialLargeQuote[\s\S]*?\/>/g, type: 'testimonial' },
    { pattern: /<CallToActionWithEmail[\s\S]*?\/>/g, type: 'cta' },
    { pattern: /<FAQsWithChat[\s\S]*?\/>/g, type: 'faq' },
    { pattern: /<PricingCompact[\s\S]*?\/>/g, type: 'pricing' },
    { pattern: /<PricingWebsites[\s\S]*?\/>/g, type: 'pricing' },
    { pattern: /<PricingBranding[\s\S]*?\/>/g, type: 'pricing' },
    { pattern: /<IndustriesGrid[\s\S]*?\/>/g, type: 'industries' },
  ]
  
  // Find all component matches with their positions
  const matches: Array<{ match: string; type: string; position: number }> = []
  
  for (const { pattern, type } of componentPatterns) {
    const regex = new RegExp(pattern.source, pattern.flags)
    let match
    while ((match = regex.exec(content)) !== null) {
      matches.push({
        match: match[0],
        type,
        position: match.index,
      })
    }
  }
  
  // Sort by position in file to maintain page order
  matches.sort((a, b) => a.position - b.position)
  
  // Parse each match
  for (const { match, type } of matches) {
    const section = parseComponent(match, type, sortOrder)
    if (section) {
      sections.push(section)
      sortOrder++
    }
  }
  
  return sections
}

// Upsert a landing page and its sections
async function syncPage(page: typeof PAGES_TO_SYNC[0]) {
  console.log(`\n📄 Syncing: ${page.name}`)
  console.log(`   File: ${page.file_path}`)
  
  // Extract sections from the file
  const sections = extractSections(page.file_path)
  console.log(`   Found ${sections.length} sections`)
  
  if (sections.length === 0) {
    console.log(`   ⚠️  No sections found, skipping`)
    return
  }
  
  try {
    // Upsert the landing page
    const pageResult = await sql`
      INSERT INTO marketing_landing_pages (name, slug, file_path, url_path, status)
      VALUES (${page.name}, ${page.slug}, ${page.file_path}, ${page.url_path}, 'active')
      ON CONFLICT (slug) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        file_path = EXCLUDED.file_path,
        url_path = EXCLUDED.url_path,
        updated_at = NOW()
      RETURNING id
    `
    
    const pageId = pageResult[0].id
    
    // Delete existing sections
    await sql`DELETE FROM marketing_page_sections WHERE page_id = ${pageId}`
    
    // Insert new sections
    for (const section of sections) {
      await sql`
        INSERT INTO marketing_page_sections (
          page_id, section_type, section_name, headline, subheadline, 
          body_copy, cta_text, sort_order
        )
        VALUES (
          ${pageId}, ${section.section_type}, ${section.section_name || null},
          ${section.headline || null}, ${section.subheadline || null},
          ${section.body_copy || null}, ${section.cta_text || null},
          ${section.sort_order}
        )
      `
    }
    
    console.log(`   ✓ Synced ${sections.length} sections`)
  } catch (error) {
    console.error(`   ✗ Error syncing page:`, error)
  }
}

// Main sync function
async function main() {
  console.log('🚀 Starting landing pages sync...\n')
  console.log(`Database: ${process.env.DATABASE_URL?.split('@')[1]?.split('?')[0] || 'unknown'}\n`)
  
  for (const page of PAGES_TO_SYNC) {
    await syncPage(page)
  }
  
  console.log('\n✅ Sync complete!\n')
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
