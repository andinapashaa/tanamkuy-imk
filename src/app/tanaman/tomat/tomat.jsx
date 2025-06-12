'use client'
import Image from 'next/image'

export default function TomatPage() {
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
        <Image src="/images/tomat.png" alt="Tomat" width={400} height={250} className="rounded-xl" />

        <h2 className="text-center text-xl italic mt-4">Tomat</h2>

        <div className="bg-white rounded-2xl mt-4 px-6 py-4 max-w-2xl text-sm text-justify shadow">
          Tomat adalah tanaman buah yang mudah tumbuh dan kaya akan vitamin. Curabitur vel porttitor est, id porttitor metus. Fusce vel neque elementum, ullamcorper purus eu, congue sapien. Donec vel ultrices dui.
        </div>

        <button className="mt-8 bg-[#7d844d] text-white px-8 py-2 rounded-full hover:bg-[#6b753b] transition">
          Mulai menanam !
        </button>
      </div>
    </div>
  )
}
