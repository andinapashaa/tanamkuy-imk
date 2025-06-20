'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DashboardPage() {
  const router = useRouter()
  const [plants, setPlants] = useState([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const selectedPlant = localStorage.getItem('tanaman')
    if (selectedPlant) {
      let img = ''
      if (selectedPlant === 'Tomat') img = '/images/tomat.png'
      else if (selectedPlant === 'Anggur') img = '/images/anggur.jpg'
      else if (selectedPlant === 'Cabai') img = '/images/cabai.jpg'

      const isAlreadyAdded = plants.some(plant => plant.name === selectedPlant)
      if (!isAlreadyAdded) {
        setPlants(prev => [...prev, { name: selectedPlant, img }])
      }

      localStorage.removeItem('tanaman') // Biar ga nambah terus tiap reload
    }
  }, [plants])

  const handleSelectPlant = (plant) => {
    router.push('/plant/${plant.toLowerCase()}/step/1')
  }

  const handleAddPlant = () => {
    router.push('/tambah-tanaman')
  }

  return (
    <div className="min-h-screen bg-[#f1f4e8]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#e1e4b5]">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo-tanamkuy.png" alt="TanamKuy Logo" width={40} height={40} />
          <span className="text-sm font-medium text-gray-700">TanamKuy</span>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-700">
            Hallo, <span className="font-bold text-[#362b1f]">{userName}</span>
          </p>
          <span className="text-xl">👤</span>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="px-6 py-6">
        <h1 className="text-xl font-semibold mb-4">Your Plant</h1>

        <div className="space-y-3">
          {plants.map((plant, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-sm rounded-md p-3 cursor-pointer"
              onClick={() => handleSelectPlant(plant.name)}
            >
              <Image src={plant.img} alt={plant.name} width={50} height={50} className="rounded-md" />
              <span className="ml-4 text-gray-800">{plant.name}</span>
            </div>
          ))}
        </div>

        {/* Tombol Tambah */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleAddPlant}
            className="bg-[#7d844d] hover:bg-[#6a7340] text-white px-6 py-2 rounded-full"
          >
            Add my plant
          </button>
        </div>
      </div>
    </div>
  )
}