import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  const { plantId } = params

  const photos = await prisma.photoProgress.findMany({
    where: { plantId },
    orderBy: { day: 'asc' },
  })

  return NextResponse.json(photos)
}
