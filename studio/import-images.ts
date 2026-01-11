import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN or SANITY_API_TOKEN environment variable')
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

interface CsvRow {
  Name: string
  Slug: string
  Client: string
  'Cover Image': string
  'Thumbnail Image': string
  'Hero Image': string
  'First Images': string
  'Second Images': string
  'Third Images': string
  'Fourth Images': string
  [key: string]: string
}

interface SanityCaseStudy {
  _id: string
  slug: { current: string }
  client: string
}

// Parse semicolon-separated image URLs
function parseImageUrls(value: string): string[] {
  if (!value || value.trim() === '') return []
  return value
    .split(';')
    .map((url) => url.trim())
    .filter((url) => url.length > 0 && url.startsWith('http'))
}

// Download image from URL and upload to Sanity
async function uploadImageFromUrl(
  url: string,
  filename?: string
): Promise<{ _type: 'reference'; _ref: string } | null> {
  try {
    console.log(`    Downloading: ${url.substring(0, 80)}...`)
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`    Failed to fetch ${url}: ${response.status}`)
      return null
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    // Extract filename from URL if not provided
    if (!filename) {
      const urlPath = new URL(url).pathname
      filename = path.basename(urlPath) || 'image.jpg'
    }

    console.log(`    Uploading to Sanity: ${filename}`)
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename,
      contentType,
    })

    console.log(`    ✓ Uploaded: ${asset._id}`)
    return { _type: 'reference', _ref: asset._id }
  } catch (error) {
    console.error(`    ✗ Error uploading ${url}:`, error)
    return null
  }
}

// Create image object for Sanity
function createImageObject(assetRef: { _type: 'reference'; _ref: string }, key: string) {
  return {
    _type: 'image',
    _key: key,
    asset: assetRef,
  }
}

async function importImages() {
  console.log('=== Importing Images from Webflow CSV to Sanity ===\n')

  // Read and parse CSV
  const csvPath = path.resolve(__dirname, '../context/legacy-content/Case Studies.csv')
  console.log(`Reading CSV from: ${csvPath}\n`)

  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const parseResult = Papa.parse<CsvRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  })

  if (parseResult.errors.length > 0) {
    console.error('CSV parsing errors:', parseResult.errors)
  }

  const csvRows = parseResult.data
  console.log(`Found ${csvRows.length} rows in CSV\n`)

  // Fetch existing case studies from Sanity
  console.log('Fetching existing case studies from Sanity...')
  const existingCaseStudies = await client.fetch<SanityCaseStudy[]>(
    `*[_type == "caseStudy"]{ _id, slug, client }`
  )
  console.log(`Found ${existingCaseStudies.length} case studies in Sanity\n`)

  // Create lookup map by slug
  const caseStudyBySlug = new Map<string, SanityCaseStudy>()
  for (const cs of existingCaseStudies) {
    if (cs.slug?.current) {
      caseStudyBySlug.set(cs.slug.current, cs)
    }
  }

  // Process each CSV row
  let processed = 0
  let skipped = 0
  let errors = 0

  for (const row of csvRows) {
    const csvSlug = row.Slug?.trim()
    const client_name = row.Client?.trim()

    if (!csvSlug) {
      console.log(`Skipping row with no slug: ${row.Name}`)
      skipped++
      continue
    }

    // Try to find matching case study in Sanity
    const sanityCaseStudy = caseStudyBySlug.get(csvSlug)

    if (!sanityCaseStudy) {
      console.log(`No matching Sanity case study for slug: ${csvSlug} (${client_name})`)
      skipped++
      continue
    }

    console.log(`\n[${processed + 1}] Processing: ${client_name} (${csvSlug})`)
    console.log(`  Sanity ID: ${sanityCaseStudy._id}`)

    // Collect images to upload
    const heroImageUrl = row['Hero Image']?.trim() || row['Cover Image']?.trim()
    const galleryUrls = [
      ...parseImageUrls(row['First Images']),
      ...parseImageUrls(row['Second Images']),
      ...parseImageUrls(row['Third Images']),
      ...parseImageUrls(row['Fourth Images']),
    ]

    // Track what to update
    const updates: Record<string, unknown> = {}

    // Upload hero image
    if (heroImageUrl) {
      console.log('  Uploading hero image...')
      const heroAssetRef = await uploadImageFromUrl(heroImageUrl)
      if (heroAssetRef) {
        updates.heroImage = {
          _type: 'image',
          asset: heroAssetRef,
        }
      }
    }

    // Upload gallery images
    if (galleryUrls.length > 0) {
      console.log(`  Uploading ${galleryUrls.length} gallery images...`)
      const galleryImages: Array<{
        _type: 'image'
        _key: string
        asset: { _type: 'reference'; _ref: string }
      }> = []

      for (let i = 0; i < galleryUrls.length; i++) {
        const assetRef = await uploadImageFromUrl(galleryUrls[i])
        if (assetRef) {
          galleryImages.push(createImageObject(assetRef, `gallery-${i}`))
        }
      }

      if (galleryImages.length > 0) {
        updates.galleryImages = galleryImages
      }
    }

    // Update Sanity document
    if (Object.keys(updates).length > 0) {
      try {
        console.log('  Updating Sanity document...')
        await client.patch(sanityCaseStudy._id).set(updates).commit()
        console.log(`  ✓ Updated ${client_name}`)
        processed++
      } catch (error) {
        console.error(`  ✗ Failed to update ${client_name}:`, error)
        errors++
      }
    } else {
      console.log('  No images to upload')
      skipped++
    }
  }

  console.log('\n=== Import Complete ===')
  console.log(`Processed: ${processed}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Errors: ${errors}`)
}

importImages().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
