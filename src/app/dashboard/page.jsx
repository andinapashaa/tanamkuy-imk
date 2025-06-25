'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.push('/login')
    } else {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)

        fetch(`/api/my-plants?userId=${parsed.id}`)
          .then((res) => res.json())
          .then((data) => {
            setPlants(data)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      } catch {
        localStorage.removeItem('user')
        router.push('/login')
      }
    }
  }, [router])

  // Fungsi ketika tanaman diklik
  const handleClickPlant = (plantId) => {
    const startDateStr = localStorage.getItem(`startDate-${plantId}`)
    if (!startDateStr) {
      alert('Tanaman belum dimulai')
      return
    }

    const startDate = new Date(startDateStr)
    const now = new Date()
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
    const today = diffDays + 1 // Hari ke-N

    router.push(`/plant/${plantId}/step/${today}`)
  }

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>

  return (
    <div className="min-h-screen bg-[#f9fce6] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#eef1c9] px-6" style={{ height: '60px' }}>
        <div className="h-full">
          <img src="/images/logo-tanamkuy.png" alt="logo" className="h-full object-contain" />
        </div>
        <div className="text-right">
          <p className="text-xl text-[#2e2b1b]">
            Hallo, <em className="text-[#5b6739] font-semibold">{user?.name || 'Pengguna'}</em>
          </p>
        </div>
      </div>

      {/* Daftar tanaman */}
      <div className="flex-1 p-6">
        {plants.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Tumbuhanmu</h2>
            <div className="space-y-4">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => handleClickPlant(plant.id)}
                  className="flex items-center bg-white rounded-xl p-4 shadow cursor-pointer hover:bg-[#f1f1f1] transition"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="h-12 w-12 mr-4"
                  />
                  <span className="text-lg text-black">{plant.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center mt-10">
            Kamu belum menanam apa pun.
          </p>
        )}
      </div>

      {/* Tombol Add My Plant */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => router.push('/tambah-tanaman')}
          className="bg-[#717b4a] text-white px-6 py-3 rounded-full"
        >
          Tambah tanaman
        </button>
      </div>

      {/* Tombol Logout */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            localStorage.removeItem('user')
            router.push('/')
          }}
          className="text-sm text-red-600 underline"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
