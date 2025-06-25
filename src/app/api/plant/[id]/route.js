import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')
  const id = pathParts[pathParts.length - 1] // ambil bagian akhir path

  console.log('✅ Plant ID:', id)

  if (!id) {
    return NextResponse.json({ error: 'ID tanaman tidak ditemukan' }, { status: 400 })
  }

  try {
    const plant = await prisma.plant.findUnique({
      where: { id },
      include: {
        type: true,
      },
    })

    if (!plant) {
      return NextResponse.json({ error: 'Tanaman tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(plant)
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
