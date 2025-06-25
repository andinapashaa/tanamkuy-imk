'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function PlantStepPage() {
  const { id, day } = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [stepText, setStepText] = useState('')
  const [plantName, setPlantName] = useState('')
  const [ready, setReady] = useState(false)

  // Cek login
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.push('/login')
    } else {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('user')
        router.push('/login')
      }
    }
  }, [router])

  // Hitung hari dari startDate
  useEffect(() => {
    const startDateStr = localStorage.getItem(`startDate-${id}`)
    if (!startDateStr) return setReady(false)

    const startDate = new Date(startDateStr)
    const now = new Date()
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
    setReady(diffDays + 1 >= parseInt(day))
  }, [id, day])

  // Ambil langkah dari backend
  useEffect(() => {
    async function fetchSteps() {
      try {
        const res = await fetch(`/api/plant/${id}`)
        const data = await res.json()
        const steps = data.type?.steps || []
        const name = data.type?.name || 'Tanaman'
        setPlantName(name)

        if (steps.length > 0) {
          const formatted = steps.map((s, i) => `${i + 1}. ${s}`).join('\n')
          setStepText(formatted)
        } else {
          setStepText('Belum ada langkah.')
        }
      } catch {
        setStepText('Gagal mengambil data langkah.')
      }
    }

    if (ready && day === '1') fetchSteps()
  }, [id, day, ready])

  if (!user) return <p className="text-center mt-20">Loading...</p>

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#f9fce6]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#eef1c9] px-6 h-[60px]">
          <img src="/images/logo-tanamkuy.png" className="h-full object-contain" alt="logo" />
          <p className="text-xl text-[#2e2b1b]">
            Hallo, <em className="font-semibold italic">{user?.name}</em> <span></span>
          </p>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <p className="italic text-xl text-[#2e2b1b]">
            Hari ke-{day} belum bisa dimulai. Silakan kembali besok 🌱
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9fce6] text-[#2e2b1b]">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#eef1c9] px-6 h-[60px]">
        <img src="/images/logo-tanamkuy.png" className="h-full object-contain" alt="logo" />
        <p className="text-xl text-[#2e2b1b]">
          Hallo, <em className="font-semibold italic">{user?.name}</em> <span>👤</span>
        </p>
      </div>

      {/* Judul tanaman */}
      <div className="px-6 pt-6">
        <h1 className="text-2xl italic font-medium">{plantName}</h1>
      </div>

      {/* Card langkah hari ke-1 */}
      <div className="mt-8 bg-[#a3ab80] rounded-3xl p-8 max-w-2xl mx-auto text-white text-lg shadow-md text-center">
        <p className="italic text-left mb-2">Hari Ke-{day}</p>
        <p className="italic mb-6">Langkah-Langkah :</p>
        <pre className="text-white italic whitespace-pre-line text-left">
          {stepText || 'Memuat langkah...'}
        </pre>
        <button
          onClick={() => router.push(`/plant/${id}/done?day=${day}`)}
          className="mt-8 bg-[#6e7652] hover:bg-[#5f6545] text-white px-10 py-2 rounded-full"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  )
}
