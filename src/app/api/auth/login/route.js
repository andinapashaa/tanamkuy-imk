import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Akun tidak ditemukan' }, { status: 401 })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 })
  }

  // Buat response dulu
  const response = NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  })

  // ✅ Set cookie langsung di response
  response.cookies.set('token', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}