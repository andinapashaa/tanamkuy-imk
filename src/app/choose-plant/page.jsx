'use client'
import { useRouter } from 'next/navigation'

const plants = [
  { name: 'Bayam', image: '/bayam.png', description: 'Sayuran hijau cepat panen' },
  { name: 'Tomat', image: '/tomat.png', description: 'Buah merah segar' },
  { name: 'Cabe', image: '/cabe.png', description: 'Pedas dan bergizi' },
]

export default function ChoosePlantPage() {
  const router = useRouter()

  const handleSelect = (plant) => {
    localStorage.setItem('selectedPlant', JSON.stringify(plant))
    router.push('/plant-detail')
  }

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <div
          key={plant.name}
          className="border rounded-xl p-4 text-center hover:shadow-lg cursor-pointer"
          onClick={() => handleSelect(plant)}
        >
          <img src={plant.image} alt={plant.name} className="w-24 h-24 mx-auto mb-2" />
          <h2 className="text-lg font-bold">{plant.name}</h2>
          <p className="text-sm text-gray-600">{plant.description}</p>
        </div>
      ))}
    </div>
  )
}
