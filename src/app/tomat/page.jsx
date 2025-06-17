'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TomatPage() {
  const router = useRouter()

  const handleStartPlanting = () => {
    router.push('/plant/tomat/step/1/') // Ini akan memanggil halaman 1.jsx
  }

  return (
    <div className="min-h-screen bg-[#f1f4e8] px-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#e1e4b5]">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo-tanamkuy.png" alt="TanamKuy Logo" width={40} height={40} />
          <span className="text-sm font-medium text-gray-700">TanamKuy</span>
        </div>
        <p className="text-sm text-gray-700">
          Hallo, <em>Henny</em> <span className="ml-2">⬤</span>
        </p>
      </div>

      {/* Konten */}
      <div className="flex flex-col items-center mt-10 text-center">
        <Image
          src="/images/tomat.png"
          alt="Tomat"
          width={400}
          height={250}
          className="rounded-xl"
        />

        <h2 className="text-xl italic mt-4">Tomat</h2>

        <div className="bg-white rounded-2xl mt-4 px-6 py-4 max-w-2xl text-sm text-justify shadow">
          Tomat adalah tanaman buah yang mudah tumbuh dan kaya akan vitamin.
          Curabitur vel porttitor est, id porttitor metus.
          Fusce vel neque elementum, ullamcorper purus eu, congue sapien.
          Donec vel ultrices dui. Pellentesque egestas purus sapien, quis tempus urna volutpat id.
          Etiam consequat ex a dignissim semper. Mauris auctor erat id vulputate molestie.
          <span className="text-green-700 font-semibold ml-1 cursor-pointer">Read more</span>
        </div>

        <button
          className="mt-8 bg-[#7d844d] text-white px-8 py-2 rounded-full hover:bg-[#6b753b] transition"
          onClick={handleStartPlanting}
        >
          Mulai menanam !
        </button>
      </div>
    </div>
  )
}
