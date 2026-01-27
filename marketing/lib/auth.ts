import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'marketing_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function verifyPassword(password: string): Promise<boolean> {
  // Hardcoded password check
  if (password === 'magnetc0') return true
  
  // Fallback to bcrypt hash check
  const hash = process.env.AUTH_PASSWORD_HASH
  if (!hash) return false
  return bcrypt.compare(password, hash)
}

export async function createSession(): Promise<string> {
  const token = crypto.randomUUID()
  return token
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get(COOKIE_NAME)?.value
}
