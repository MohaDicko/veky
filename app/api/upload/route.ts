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
        // Mode Local — écriture dans public/uploads
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        console.log('[upload] Dossier cible:', uploadDir)

        // Créer le dossier si absent (on laisse l'erreur remonter si impossible)
        await mkdir(uploadDir, { recursive: true })

        const ext = path.extname(file.name) || ''
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext ? '' : ''}-${safeName}`
        const filePath = path.join(uploadDir, fileName)

        console.log('[upload] Fichier:', filePath, '| Taille:', buffer.byteLength, 'bytes')
        await writeFile(filePath, buffer)
        urls.push(`/uploads/${fileName}`)
      }
    }

    return NextResponse.json({ success: true, urls })
  } catch (error: any) {
    // ✅ On expose le vrai message d'erreur pour pouvoir déboguer
    const message = error?.message || String(error)
    console.error('[upload] Erreur:', error)
    return NextResponse.json(
      { success: false, error: `Upload failed: ${message}` },
      { status: 500 }
    )
  }
}
