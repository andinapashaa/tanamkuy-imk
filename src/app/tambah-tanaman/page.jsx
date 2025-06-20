'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TambahTanamanPage() {
  const router = useRouter()

  const handleSelectPlant = (plant) => {
  localStorage.setItem('tanaman', plant.toLowerCase())
  router.push(`/${plant.toLowerCase()}`)
}

  return (
    <div className="min-h-screen bg-[#f1f4e8]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#e1e4b5]">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo-tanamkuy.png" alt="TanamKuy Logo" width={40} height={40} />
          <span className="text-sm font-medium text-gray-700">TanamKuy</span>
        </div>
        <p className="text-sm text-gray-700">Hallo, <em>Selamat Datang</em></p>
      </div>

      {/* Konten Tambah Tanaman */}
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-xl italic mb-6">Tambah Tanaman</h1>

        <div className="bg-[#9da978] p-6 rounded-3xl">
          <p className="text-white text-lg italic text-center mb-4">Tambah Tanamanmu Sendiri</p>

          <div className="grid grid-cols-3 gap-4">
            {/* Tomat */}
            <div
              onClick={() => handleSelectPlant('Tomat')}
              className="bg-[#e6ebbc] rounded-xl p-4 flex flex-col items-center cursor-pointer hover:shadow-md"
            >
              <Image src="/images/tomat.png" alt="Tomat" width={60} height={60} />
              <p className="mt-2 text-[#6d7a45] italic">Tomat</p>
            </div>

            {/* Anggur */}
            <div
              onClick={() => handleSelectPlant('Anggur')}
              className="bg-[#eac89f] rounded-xl p-4 flex flex-col items-center cursor-pointer hover:shadow-md"
            >
              <Image src="/images/anggur.jpg" alt="Anggur" width={60} height={60} />
              <p className="mt-2 text-[#6d7a45] italic">Anggur</p>
            </div>

            {/* Cabai */}
            <div
              onClick={() => handleSelectPlant('Cabai')}
              className="bg-[#eac89f] rounded-xl p-4 flex flex-col items-center cursor-pointer hover:shadow-md"
            >
              <Image src="/images/cabai.jpg" alt="Cabai" width={60} height={60} />
              <p className="mt-2 text-[#6d7a45] italic">Cabai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}