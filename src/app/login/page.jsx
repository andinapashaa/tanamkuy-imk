'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.id && parsed?.email) {
          router.push('/dashboard') // ⬅️ Jika sudah login, langsung ke dashboard
        }
      } catch {
        localStorage.removeItem('user') // Hapus kalau data rusak
      }
    }
  }, [router])

  return (
    <div className="flex min-h-screen">
      {/* KIRI: Logo dan brand */}
      <div className="w-1/2 bg-[#E1E4B5] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo-tanamkuy.png"
            alt="TanamKuy Logo"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>

      {/* KANAN: Form Login */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h2 className="text-3xl font-bold text-[#5b6739] mb-6">Login</h2>
        <AuthForm type="login" />
        <p className="mt-4 text-sm">
          Belum punya akun?{' '}
          <Link href="/register" className="text-green-700 underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}
