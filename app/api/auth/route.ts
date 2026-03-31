import { NextResponse } from 'next/server'

// Utiliser "admin" par défaut si la variable est absente OU vide
const ADMIN_SECRET = (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length > 0) 
  ? process.env.ADMIN_PASSWORD 
  : "admin"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    
    // Trim pour éviter les espaces invisibles ajoutés par les téléphones
    const cleanUser = username?.trim()
    const cleanPass = password?.trim()

    if (cleanUser === "admin" && cleanPass === ADMIN_SECRET) {
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ success: false, error: "Identifiants invalides" }, { status: 401 })
  } catch (e) {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 })
  }
}
