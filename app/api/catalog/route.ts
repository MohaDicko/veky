import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { kv } from '@vercel/kv'

const dataFilePath = path.join(process.cwd(), 'data', 'catalog.json')

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "admin"

function isAuthorized(req: Request) {
  const authHeader = req.headers.get("authorization")
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (process.env.KV_REST_API_URL) {
      let items = await kv.get('catalog')
      
      // Seed from local if KV is empty upon first run
      if (!items) {
         try {
           const fileContents = await fs.readFile(dataFilePath, 'utf8')
           items = JSON.parse(fileContents)
           await kv.set('catalog', items)
         } catch(e) {
           items = []
         }
      }
      return NextResponse.json(items)
    } else {
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      return NextResponse.json(JSON.parse(fileContents))
    }
  } catch (error) {
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
    
    if (process.env.KV_REST_API_URL) {
      let items: any[] = await kv.get('catalog') || []
      items.unshift(newItem)
      await kv.set('catalog', items)
      return NextResponse.json({ success: true, item: newItem })
    } else {
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      const items = JSON.parse(fileContents)
      items.unshift(newItem)
      await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
      return NextResponse.json({ success: true, item: newItem })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add item' }, { status: 500 })
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
      
    if (process.env.KV_REST_API_URL) {
      let items: any[] = await kv.get('catalog') || []
      items = items.filter((c: any) => c.id !== id)
      await kv.set('catalog', items)
      return NextResponse.json({ success: true })
    } else {
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      let items = JSON.parse(fileContents)
      items = items.filter((c: any) => c.id !== id)
      await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete item' }, { status: 500 })
  }
}
