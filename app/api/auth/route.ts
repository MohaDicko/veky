import { NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "admin"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    if (username === "admin" && password === ADMIN_SECRET) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ success: false }, { status: 401 })
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
