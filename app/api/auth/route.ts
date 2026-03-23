import { NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "aya2026!secure"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (token === ADMIN_SECRET) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ success: false }, { status: 401 })
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
