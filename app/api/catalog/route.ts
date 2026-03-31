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
    // 1. Tenter de lire dans Vercel KV (Production)
    if (process.env.KV_REST_API_URL) {
      let items = await kv.get('catalog')
      
      // Seed initial si KV est vide (première fois)
      if (!items) {
        try {
          const fileContents = await fs.readFile(dataFilePath, 'utf8')
          items = JSON.parse(fileContents)
          await kv.set('catalog', items)
        } catch { items = [] }
      }
      return NextResponse.json(items)
    }

    // 2. Fallback Local (Développement)
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    return NextResponse.json(JSON.parse(fileContents))
  } catch (error) {
    console.error('[Catalog GET]', error)
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
      // Production - Vercel KV
      const items: any[] = (await kv.get('catalog')) || []
      items.unshift(newItem)
      await kv.set('catalog', items)
      return NextResponse.json({ success: true, item: newItem })
    } else {
      // Local
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      const items = JSON.parse(fileContents)
      items.unshift(newItem)
      await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
      return NextResponse.json({ success: true, item: newItem })
    }
  } catch (error: any) {
    console.error('[Catalog POST]', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: 'Accès Non Autorisé (Admin Password invalid ?)' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ success: false, error: 'ID manquant dans la requête' }, { status: 400 })

    if (process.env.KV_REST_API_URL) {
      // Production - Vercel KV
      const rawItems = await kv.get('catalog')
      let items: any[] = Array.isArray(rawItems) ? rawItems : []
      
      const beforeCount = items.length
      // Utilisation de String(id) pour éviter les erreurs de type 
      items = items.filter((c: any) => String(c.id) !== String(id))
      
      if (items.length === beforeCount) {
        console.warn(`[Catalog DELETE] Aucun item trouvé avec l'id: ${id}`)
      }

      await kv.set('catalog', items)
      return NextResponse.json({ success: true, count: items.length })
    } else {
      // Local
      const fileContents = await fs.readFile(dataFilePath, 'utf8')
      let items = JSON.parse(fileContents)
      items = items.filter((c: any) => String(c.id) !== String(id))
      await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
      return NextResponse.json({ success: true })
    }
  } catch (error: any) {
    const msg = error?.message || String(error)
    console.error('[Catalog DELETE Error]', error)
    return NextResponse.json({ success: false, error: `Erreur serveur: ${msg}` }, { status: 500 })
  }
}




