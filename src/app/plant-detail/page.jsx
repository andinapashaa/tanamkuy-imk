'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PlantDetailPage() {
  const router = useRouter()
  const [plant, setPlant] = useState(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('selectedPlant')
    if (!stored) router.push('/choose-plant')
    else setPlant(JSON.parse(stored))
  }, [])

  const handleStartPlanting = () => {
    const today = new Date().toISOString()
    localStorage.setItem('plant', JSON.stringify({ ...plant, startedAt: today }))
    router.push('/my-plant') // Halaman monitoring
  }

  if (!plant) return null

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{plant.name}</h1>
      <img src={plant.image} alt={plant.name} className="w-32 h-32 mb-4" />
      <p className="text-gray-700">
        {showMore
          ? `${plant.name} adalah tanaman yang sangat cocok untuk pemula...`
          : `${plant.description}...`}
      </p>
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-green-600 underline mt-2"
      >
        {showMore ? 'See less' : 'See more'}
      </button>

      <button
        onClick={handleStartPlanting}
        className="block mt-6 bg-[#6b8e23] text-white px-6 py-3 rounded-full"
      >
        Mulai Menanam
      </button>
    </div>
  )
}
