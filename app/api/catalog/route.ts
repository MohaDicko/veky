import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { put, list, del } from '@vercel/blob'

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "admin"
const CATALOG_BLOB_NAME = 'catalog-db.json'

function isAuthorized(req: Request) {
  const authHeader = req.headers.get("authorization")
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

async function getCatalogData() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // 1. Chercher le fichier dans le Blob
      const { blobs } = await list({ prefix: CATALOG_BLOB_NAME })
      const catalogBlob = blobs.find(b => b.pathname === CATALOG_BLOB_NAME)

      if (catalogBlob) {
        const response = await fetch(catalogBlob.url)
        return await response.json()
      }
    }
    
    // 2. Fallback local (Seed) si Blob absent ou en mode dev local
    const dataFilePath = path.join(process.cwd(), 'data', 'catalog.json')
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('[Blob DB] Error reading:', error)
    return []
  }
}

async function saveCatalogData(items: any[]) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Mode Production Vercel - Écraser le blob existant
    await put(CATALOG_BLOB_NAME, JSON.stringify(items, null, 2), {
      access: 'public',
      addRandomSuffix: false // Pour garder le même nom
    })
  } else {
    // Mode Local
    const dataFilePath = path.join(process.cwd(), 'data', 'catalog.json')
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
  }
}

export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await getCatalogData()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
     return NextResponse.json({ success: false, error: 'Accès Non Autorisé' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const items = await getCatalogData()
    const newItem = { id: Date.now().toString(), ...body }
    
    items.unshift(newItem)
    await saveCatalogData(items)
    
    return NextResponse.json({ success: true, item: newItem })
  } catch (error: any) {
    console.error('[Blob DB] Post error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
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
      
    let items = await getCatalogData()
    items = items.filter((c: any) => c.id !== id)
    await saveCatalogData(items)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Blob DB] Delete error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}


