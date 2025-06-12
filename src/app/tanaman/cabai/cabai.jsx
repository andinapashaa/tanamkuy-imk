'use client'
import Image from 'next/image'

export default function CabaiPage() {
  return (
    <div className="min-h-screen bg-[#f1f4e8] px-6">
      <div className="flex items-center justify-between px-6 py-4 bg-[#e1e4b5]">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo-tanamkuy.png" alt="TanamKuy Logo" width={40} height={40} />
          <span className="text-sm font-medium text-gray-700">TanamKuy</span>
        </div>
        <p className="text-sm text-gray-700">Hallo, <em>Henny</em></p>
      </div>

      <div className="flex flex-col items-center mt-10">
        <Image src="/images/cabai.jpg" alt="Cabai" width={400} height={250} className="rounded-xl" />

        <h2 className="text-center text-xl italic mt-4">Cabai</h2>

        <div className="bg-white rounded-2xl mt-4 px-6 py-4 max-w-2xl text-sm text-justify shadow">
          Cabai adalah tanaman pedas favorit dapur. Tumbuh baik di tanah subur dengan penyinaran matahari penuh. Cocok ditanam di pekarangan rumah.
        </div>

        <button className="mt-8 bg-[#7d844d] text-white px-8 py-2 rounded-full hover:bg-[#6b753b] transition">
          Mulai menanam !
        </button>
      </div>
    </div>
  )
}
