'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthForm({ type }) {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('user', JSON.stringify(data.user || form))
      document.cookie = `token=true; path=/`
      router.push('/dashboard')
    } else {
      alert('Gagal ' + type)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      {type === 'register' && (
        <input
          type="text"
          placeholder="Nama"
          className="rounded-full p-3 bg-[#f0f3e9]"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="rounded-full p-3 bg-[#f0f3e9]"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="rounded-full p-3 bg-[#f0f3e9]"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
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
