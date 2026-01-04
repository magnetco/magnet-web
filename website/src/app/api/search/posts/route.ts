import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import { NextResponse } from 'next/server'

const searchPostsQuery = groq`
  *[_type == "post"] {
    _id,
    title,
    slug,
    summary
  }
`

export async function GET() {
  try {
    const posts = await client.fetch(searchPostsQuery)
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json([])
  }
}

