import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'o28dq6x5',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const idsToDelete = [
  'case-study-bsi-engineering',
  'case-study-commonwealth-inc',
  'case-study-okeeffes',
  'case-study-directions-research',
  'case-study-the-grocery-runners',
  'case-study-katz-teller',
  'case-study-trublue-house-care',
  'case-study-wanamakers',
]

async function deleteImported() {
  console.log('🗑️  Deleting incorrectly imported case studies...\n')
  
  for (const id of idsToDelete) {
    try {
      await client.delete(id)
      console.log(`✅ Deleted: ${id}`)
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.log(`⚠️  Not found: ${id}`)
      } else {
        console.error(`❌ Error deleting ${id}:`, error.message)
      }
    }
  }
  
  console.log('\n✨ Cleanup complete!')
}

deleteImported().catch(console.error)
