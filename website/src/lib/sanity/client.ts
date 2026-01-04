import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'o28dq6x5',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-01-03',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

