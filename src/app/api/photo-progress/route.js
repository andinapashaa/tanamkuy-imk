import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/prisma'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')
  const plantId = formData.get('plantId')
  const day = parseInt(formData.get('day'))

  if (!file || !plantId || isNaN(day)) {
    return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  const fileName = `${uuidv4()}.png`
  const filePath = path.join(uploadDir, fileName)
  const publicUrl = `/uploads/${fileName}`

  await writeFile(filePath, buffer)

  const created = await prisma.photoProgress.create({
    data: {
      plantId,
      day,
      imageUrl: publicUrl,
    },
  })

  return NextResponse.json(created)
}
