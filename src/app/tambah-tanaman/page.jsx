'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TambahTanamanPage() {
  const [plantTypes, setPlantTypes] = useState([])
  const [user, setUser] = useState(null)
  const router = useRouter()

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

    async function fetchPlants() {
      const res = await fetch('/api/plant-type')
      const data = await res.json()
      setPlantTypes(data)
    }

    fetchPlants()
  }, [router])

  if (!user) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="min-h-screen bg-[#f9fce6] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#eef1c9] px-6" style={{ height: '60px' }}>
        <div className="h-full">
          <img src="/images/logo-tanamkuy.png" alt="logo" className="h-full object-contain" />
        </div>
        <div className="text-right">
          <p className="text-xl text-[#2e2b1b]">
            Hallo,{' '}
            <em className="text-[#5b6739] font-semibold">
              {user?.name || 'Pengguna'}
            </em>{' '}
          </p>
        </div>
      </div>

      {/* Konten */}
      <div className="p-6">
        <h1 className="text-xl italic mb-6 text-left text-[#2f271b]">Tambah Tanaman</h1>

        <div className="bg-[#AAB07B] p-8 rounded-[50px] max-w-xl mx-auto">
          <p className="text-white italic text-xl mb-6 text-center">Tambah Tanamanmu Sendiri</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {plantTypes.map((plant) => (
              <div
                key={plant.id}
                onClick={() => router.push(`/plant/${plant.name.toLowerCase()}`)}
                className="bg-[#f3f4cf] rounded-xl p-4 w-28 cursor-pointer hover:scale-105 transition duration-200 text-center"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="mx-auto h-14 mb-2 object-contain"
                />
                <p className="italic text-[#747B44] text-sm">{plant.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
