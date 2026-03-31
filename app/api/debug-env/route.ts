import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // On ne loggue QUE les noms des clés pour identifier celles de Vercel/Upstash
  const keys = Object.keys(process.env).sort()
  return NextResponse.json({ keys })
}
