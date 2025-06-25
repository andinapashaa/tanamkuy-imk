'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthForm({ type }) {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  // Bersihkan localStorage kalau user tidak valid
  useEffect(() => {
    const stored = localStorage.getItem('user')
    try {
      const parsed = stored ? JSON.parse(stored) : null
      if (!parsed?.id || !parsed?.email) {
        localStorage.removeItem('user')
      }
    } catch {
      localStorage.removeItem('user')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('Data form dikirim:', form) // ← DEBUG

    const res = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    console.log('Response dari API:', data) // ← DEBUG

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push(type === 'register' ? '/login' : '/dashboard')
    } else {
      if (type === 'register' && data?.error?.toLowerCase().includes('terdaftar')) {
        alert('Email sudah terdaftar, silakan login.')
        router.push('/login')
      } else {
        alert(`Gagal ${type}: ${data?.error || 'Terjadi kesalahan'}`)
      }
    }
  }

  const inputStyle =
    'rounded-full p-3 bg-[#f0f3e9] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7d844d] text-black'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      {type === 'register' && (
        <input
          type="text"
          placeholder="Nama"
          className={inputStyle}
          required
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className={inputStyle}
        required
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
      />
      <input
        type="password"
        placeholder="Password"
        className={inputStyle}
        required
        onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
      />
      <button
        type="submit"
        className={`rounded-full p-3 ${
          type === 'login' ? 'bg-[#717b4a]' : 'bg-[#b5be74]'
        } text-white font-bold`}
      >
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  )
}
