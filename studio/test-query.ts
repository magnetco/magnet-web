import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'o28dq6x5',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testQuery() {
  console.log('🔍 Querying case studies...\n')
  
  const query = '*[_type == "caseStudy"]{_id, title, client, category, featured, slug}'
  const caseStudies = await client.fetch(query)
  
  console.log(`Found ${caseStudies.length} case studies:\n`)
  caseStudies.forEach((cs: any) => {
    console.log(`- ${cs.client} (${cs.category}) ${cs.featured ? '⭐' : ''}`)
    console.log(`  ID: ${cs._id}`)
    console.log(`  Slug: ${cs.slug?.current || 'NO SLUG'}`)
    console.log('')
  })
}

testQuery().catch(console.error)
