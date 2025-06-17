'use client'
import Image from 'next/image'

export default function TomatPage() {
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
          src="/images/tomat.png" // Pastikan file ini ada di public/images
          alt="Anggur"
          width={400}
          height={250}
          className="rounded-xl"
        />

        <h2 className="text-xl italic mt-4">ANGGUR</h2>

        <div className="bg-white rounded-2xl mt-4 px-6 py-4 max-w-2xl text-sm text-justify shadow">
          ANGGUR ITU ENAK BANG adalah LOREM IPSUM
          <span className="text-green-700 font-semibold ml-1 cursor-pointer">Read more</span>
        </div>

        <button className="mt-8 bg-[#7d844d] text-white px-8 py-2 rounded-full hover:bg-[#6b753b] transition">
          Mulai menanam !
        </button>
      </div>
    </div>
  )
}
