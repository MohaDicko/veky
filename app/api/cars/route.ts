import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'cars.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    return NextResponse.json(JSON.parse(fileContents))
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    const cars = JSON.parse(fileContents)
    
    const newCar = {
      id: Date.now().toString(),
      ...body
    }
    cars.push(newCar)
    
    await fs.writeFile(dataFilePath, JSON.stringify(cars, null, 2))
    return NextResponse.json({ success: true, car: newCar })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add car' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ success: false, error: 'No ID provided' }, { status: 400 })
      
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    let cars = JSON.parse(fileContents)
    cars = cars.filter((c: any) => c.id !== id)
    
    await fs.writeFile(dataFilePath, JSON.stringify(cars, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete car' }, { status: 500 })
  }
}
