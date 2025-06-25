import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req) {
  const body = await req.json()
  const newPlant = await prisma.plant.create({
    data: {
      name: body.name,
      image: body.image,
      description: body.description,
      typeId: body.typeId,
      userId: body.userId,
    },
  })
  return NextResponse.json(newPlant, { status: 201 })
}

// ✅ Tambahkan ini:
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID tidak ditemukan' }, { status: 400 })
  }

  const plants = await prisma.plant.findMany({
    where: { userId },
    include: { type: true }, // kalau mau sekaligus dapatkan type
  })

  return NextResponse.json(plants)
}
