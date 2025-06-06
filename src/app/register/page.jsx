'use client'

import AuthForm from '@/components/AuthForm'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
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
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h2 className="text-3xl font-bold text-[#5b6739] mb-6">Register</h2>
        <AuthForm type="register" />
      </div>
    </div>
  )
}
