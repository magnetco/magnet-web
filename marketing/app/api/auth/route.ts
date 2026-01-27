import { verifyPassword, setAuthCookie, clearAuthCookie, createSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password, action } = await req.json()

  if (action === 'logout') {
    await clearAuthCookie()
    return NextResponse.json({ success: true })
  }

  const valid = await verifyPassword(password)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await createSession()
  await setAuthCookie(token)

  return NextResponse.json({ success: true })
}
