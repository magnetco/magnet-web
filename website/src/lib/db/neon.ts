import { neon } from '@neondatabase/serverless'

// Lazy initialization to avoid build-time errors when DATABASE_URL is not set
let _sql: ReturnType<typeof neon> | null = null

function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

// Tagged template literal function that lazily initializes the connection
export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  return getSql()(strings, ...values)
}

