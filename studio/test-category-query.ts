import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'o28dq6x5',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function testCategoryQuery() {
  console.log('🔍 Testing category queries...\n')
  
  const caseStudiesByCategoryQuery = `
    *[_type == "caseStudy" && category == $category] | order(featured desc, publishedAt desc) {
      _id,
      title,
      slug,
      client,
      headline,
      description,
      category,
      featured
    }
  `
  
  console.log('📁 Websites category:')
  const websites = await client.fetch(caseStudiesByCategoryQuery, { category: 'websites' })
  console.log(`  Found ${websites.length} case studies`)
  websites.forEach((cs: any) => {
    console.log(`  - ${cs.client} ${cs.featured ? '⭐' : ''}`)
  })
  
  console.log('\n📁 Full-Funnel category:')
  const fullFunnel = await client.fetch(caseStudiesByCategoryQuery, { category: 'full-funnel' })
  console.log(`  Found ${fullFunnel.length} case studies`)
  fullFunnel.forEach((cs: any) => {
    console.log(`  - ${cs.client} ${cs.featured ? '⭐' : ''}`)
  })
  
  console.log('\n📁 Engineering category:')
  const engineering = await client.fetch(caseStudiesByCategoryQuery, { category: 'engineering' })
  console.log(`  Found ${engineering.length} case studies`)
  engineering.forEach((cs: any) => {
    console.log(`  - ${cs.client} ${cs.featured ? '⭐' : ''}`)
  })
}

testCategoryQuery().catch(console.error)
