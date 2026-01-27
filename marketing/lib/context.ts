import fs from 'fs'
import path from 'path'

interface Context {
  brand: string
  strategy: string
  icp: string
}

let cachedContext: Context | null = null

export function getContext(): Context {
  if (cachedContext) return cachedContext

  const contextDir = process.env.CONTEXT_DIR || path.join(process.cwd(), '..', 'context')

  cachedContext = {
    brand: fs.readFileSync(path.join(contextDir, 'BRAND.md'), 'utf-8'),
    strategy: fs.readFileSync(path.join(contextDir, 'STRATEGY.md'), 'utf-8'),
    icp: fs.readFileSync(path.join(contextDir, 'ICP.md'), 'utf-8'),
  }

  return cachedContext
}

// Clear cache (useful for development)
export function clearContextCache() {
  cachedContext = null
}
