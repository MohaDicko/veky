import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'catalog.json')

// Le mot de passe ultra-sécurisé de la multinationale (L'administrateur peut le changer ici)
const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "aya2026!secure"

function isAuthorized(req: Request) {
  const authHeader = req.headers.get("authorization")
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    return NextResponse.json(JSON.parse(fileContents))
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
     return NextResponse.json({ success: false, error: 'Accès Non Autorisé (Hacking Attempt Blocked)' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const items = JSON.parse(fileContents)
    
    const newItem = {
      id: Date.now().toString(),
      ...body
    }
    items.unshift(newItem)
    
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add item' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
     return NextResponse.json({ success: false, error: 'Accès Non Autorisé (Hacking Attempt Blocked)' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ success: false, error: 'No ID provided' }, { status: 400 })
      
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    let items = JSON.parse(fileContents)
    items = items.filter((c: any) => c.id !== id)
    
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete item' }, { status: 500 })
  }
}
