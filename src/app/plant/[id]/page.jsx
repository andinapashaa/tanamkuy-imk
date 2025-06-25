'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function PlantDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [plant, setPlant] = useState(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.push('/login')
    } else {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch {
        localStorage.removeItem('user')
        router.push('/login')
      }
    }
  }, [router])

 useEffect(() => {
  async function fetchPlant() {
    const res = await fetch(`/api/plant-type/${id}`)
    if (!res.ok) {
      console.error('Tanaman tidak ditemukan')
      setPlant(null)
      return
    }
    const data = await res.json()
    setPlant(data)
  }
  if (id) fetchPlant()
}, [id])


  if (!plant || !user) return <p className="text-center mt-20">Loading...</p>

const shortDesc = plant.description?.slice(0, 200) || ''
const isLong = (plant.description?.length || 0) > 200


  return (
    <div className="min-h-screen bg-[#f9fce6]">
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

      {/* Konten Detail */}
      <div className="px-6 py-10 text-center">
        <img
          src={plant.image}
          alt={plant.name}
          className="max-h-64 w-full max-w-xl mx-auto rounded-[20px] mb-6 object-contain"
        />
        <h1 className="text-2xl italic text-[#2e2b1b] mb-4">{plant.name}</h1>

        <div className="bg-white rounded-3xl p-6 max-w-3xl mx-auto text-justify text-[#2e2b1b]">
          {showMore ? plant.description : shortDesc}
          {isLong && (
            <span
              onClick={() => setShowMore(!showMore)}
              className="text-[#5b6739] font-semibold cursor-pointer ml-1"
            >
              {showMore ? ' Read less' : ' Read more'}
            </span>
          )}
        </div>

      <button
 onClick={async () => {
  const res = await fetch('/api/my-plants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: plant.name,
      description: plant.description,
      image: plant.image,
      typeId: plant.id,
      userId: user.id
    })
  })

  const data = await res.json()
  if (data?.id) {
    // ✅ Simpan tanggal mulai
    const startKey = `startDate-${data.id}`
    localStorage.setItem(startKey, new Date().toISOString())

    // ✅ Arahkan ke langkah pertama
    router.push(`/plant/${data.id}/step/1`)
  } else {
    alert('Gagal menanam, coba lagi.')
  }
}}

  className="bg-[#7c8553] text-white px-6 py-3 rounded-full mt-8 hover:bg-[#6a7447]"
>
  Mulai menanam !
</button>


      </div>
    </div>
  )
}
