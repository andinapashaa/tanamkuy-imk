'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DonePlantPage() {
  const { id } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const day = searchParams.get('day')

  const [user, setUser] = useState(null)
  const [plantName, setPlantName] = useState('')

  // Ambil user dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  // Ambil nama tanaman dari API
  useEffect(() => {
    async function fetchPlant() {
      try {
        const res = await fetch(`/api/plant/${id}`)
        const data = await res.json()
        setPlantName(data?.type?.name || '')
      } catch {
        setPlantName('')
      }
    }
    fetchPlant()
  }, [id])

  return (
    <div className="min-h-screen bg-[#f9fce6] text-[#2e2b1b]">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#eef1c9] px-6 h-[60px]">
        <img src="/images/logo-tanamkuy.png" alt="logo" className="h-full object-contain" />
        <p className="text-xl">
          Hallo, <em className="italic font-medium">{user?.name || '...'}</em> <span></span>
        </p>
      </div>

      {/* Nama tanaman */}
      <div className="px-6 pt-6">
        <h1 className="text-2xl italic font-medium">{plantName}</h1>
      </div>

      {/* Card konten */}
      <div className="mt-8 bg-[#a3ab80] rounded-3xl p-8 max-w-xl mx-auto text-center shadow-md text-white">
        <p className="italic text-left mb-4">Hari ke-{day}</p>

        <div className="flex justify-center mb-6">
          <img
            src={day === '1' ? '/images/pot-seed.png' : '/images/pot-water.png'}
            alt="Pot"
            className="w-40 h-40"
          />
        </div>

        <p className="text-lg italic mb-8 whitespace-pre-line leading-relaxed">
  {day === '1'
    ? `Menanam ${plantName?.toLowerCase()} mu hari pertama telah berhasil\njangan lupa tugas mu dihari ke-2 besok !`
    : `Hari ke-${day} selesai.\nPastikan tanaman tetap sehat untuk tumbuh!`}
</p>


        <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
          <button
            onClick={() => router.push('/upload')}
            className="bg-[#cddc8c] py-2 rounded-full text-[#2e2b1b] font-medium"
          >
            Unggah Foto
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-[#6a7447] py-2 rounded-full text-white font-medium"
          >
            Beranda
          </button>
        </div>
      </div>
    </div>
  )
}
