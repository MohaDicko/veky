import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'catalog.json')
const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "admin"

function isAuthorized(req: Request) {
  const authHeader = req.headers.get("authorization")
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

// ✅ Helper universel KV — compatible Vercel KV et Upstash marketplace
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

async function kvGet(key: string): Promise<any> {
  const res = await fetch(`${KV_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    cache: 'no-store'
  })
  const data = await res.json()
  // Upstash retourne { result: "..." } où le résultat est une string JSON
  if (data.result === null || data.result === undefined) return null
  try { return typeof data.result === 'string' ? JSON.parse(data.result) : data.result }
  catch { return data.result }
}

async function kvSet(key: string, value: any): Promise<void> {
  await fetch(`${KV_URL}/set/${key}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(value)
  })
}

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (KV_URL && KV_TOKEN) {
      let items = await kvGet('catalog')
      if (!items) {
        try {
          const fileContents = await fs.readFile(dataFilePath, 'utf8')
          items = JSON.parse(fileContents)
          await kvSet('catalog', items)
        } catch { items = [] }
      }
      return NextResponse.json(items)
    } else {
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      return NextResponse.json(JSON.parse(fileContents))
    }
  } catch (error: any) {
    console.error('[catalog GET]', error)
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: 'Accès Non Autorisé' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const newItem = { id: Date.now().toString(), ...body }

    if (KV_URL && KV_TOKEN) {
      const items: any[] = (await kvGet('catalog')) || []
      items.unshift(newItem)
      await kvSet('catalog', items)
      return NextResponse.json({ success: true, item: newItem })
    } else {
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      const items = JSON.parse(fileContents)
      items.unshift(newItem)
      await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
      return NextResponse.json({ success: true, item: newItem })
    }
  } catch (error: any) {
    const msg = error?.message || String(error)
    console.error('[catalog POST]', error)
    return NextResponse.json({ success: false, error: `Failed to add item: ${msg}` }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: 'Accès Non Autorisé' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ success: false, error: 'No ID provided' }, { status: 400 })

    if (KV_URL && KV_TOKEN) {
      let items: any[] = (await kvGet('catalog')) || []
      items = items.filter((c: any) => c.id !== id)
      await kvSet('catalog', items)
      return NextResponse.json({ success: true })
    } else {
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      let items = JSON.parse(fileContents)
      items = items.filter((c: any) => c.id !== id)
      await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
      return NextResponse.json({ success: true })
    }
  } catch (error: any) {
    const msg = error?.message || String(error)
    console.error('[catalog DELETE]', error)
    return NextResponse.json({ success: false, error: `Failed to delete: ${msg}` }, { status: 500 })
  }
}

