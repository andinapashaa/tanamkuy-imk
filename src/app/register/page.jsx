'use client'

import AuthForm from '@/components/AuthForm'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.id && parsed?.email) {
          router.push('/dashboard')
        }
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [router])

  return (
    <div className="flex min-h-screen">
      {/* KIRI: Logo TanamKuy */}
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

      {/* KANAN: Form Register */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h2 className="text-3xl font-bold text-[#5b6739] mb-6">Register</h2>
        <AuthForm type="register" />
        <p className="mt-4 text-sm">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-green-700 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
