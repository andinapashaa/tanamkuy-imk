import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const { email, password, name } = await req.json()

  // Validasi basic
  if (!email || !password || !name) {
    return NextResponse.json(
      { error: 'Email, password, dan nama wajib diisi' },
      { status: 400 }
    )
  }

  // Cek apakah email sudah terdaftar
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: 'Email sudah terdaftar' },
      { status: 400 }
    )
  }

  // 🔒 Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10)

  // Simpan user baru
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  // ⛔ Jangan kirim password ke client
  return NextResponse.json(
    { user: { id: user.id, email: user.email, name: user.name } },
    { status: 201 }
  )
}
