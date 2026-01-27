import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'o28dq6x5',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const updates = [
  { id: 'case-study-bsi-engineering', category: 'websites' },
  { id: 'case-study-commonwealth-inc', category: 'websites' },
  { id: 'case-study-windward-bank', category: 'websites' },
  { id: 'case-study-katz-teller', category: 'websites' },
  { id: 'case-study-wanamakers', category: 'websites' },
  { id: 'case-study-enthusiast-auto', category: 'websites' },
  { id: 'case-study-florence-yalls', category: 'websites' },
  { id: 'case-study-gotham-soccer', category: 'websites' },
  { id: 'case-study-luxottica', category: 'websites' },
  { id: 'case-study-serene-suites', category: 'websites' },
]

async function updateCategories() {
  console.log('🔄 Updating case study categories...\n')

  for (const update of updates) {
    try {
      await client
        .patch(update.id)
        .set({ category: update.category })
        .commit()
      
      console.log(`✅ Updated ${update.id} → ${update.category}`)
    } catch (error: any) {
      console.error(`❌ Error updating ${update.id}:`, error.message)
    }
  }

  console.log('\n✨ Category updates complete!')
  
  // Verify the updates
  console.log('\n🔍 Verifying updates...')
  const websitesCaseStudies = await client.fetch(
    '*[_type == "caseStudy" && category == "websites"]{_id, client, category}'
  )
  console.log(`\nFound ${websitesCaseStudies.length} case studies in "websites" category:`)
  websitesCaseStudies.forEach((cs: any) => {
    console.log(`  - ${cs.client}`)
  })
}

updateCategories().catch(console.error)
