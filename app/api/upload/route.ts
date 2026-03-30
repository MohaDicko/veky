import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { put } from '@vercel/blob'

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "admin"

function isAuthorized(req: Request) {
  const authHeader = req.headers.get("authorization")
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
     return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 })
    }

    const urls: string[] = []

    for (const file of files) {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        // Mode Vercel (Production)
        const blob = await put(file.name, file, { access: 'public' })
        urls.push(blob.url)
      } else {
        // Mode Local
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        await mkdir(uploadDir, { recursive: true }).catch(() => {})
        
        const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`
        const filePath = path.join(uploadDir, fileName)
        
        await writeFile(filePath, buffer)
        urls.push(`/uploads/${fileName}`)
      }
    }

    return NextResponse.json({ success: true, urls })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}

