import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  const url = new URL(request.url)
  const idOrName = url.pathname.split('/').pop()

  if (!idOrName) {
    return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 })
  }

  const plant = await prisma.plantType.findFirst({
    where: {
      OR: [
        { id: idOrName },
        { name: idOrName },
      ],
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      steps: true,
    }
  })

  if (!plant) {
    return NextResponse.json({ error: 'Tanaman tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(plant)
}
