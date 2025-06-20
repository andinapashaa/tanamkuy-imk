'use client'

import { useRouter } from 'next/navigation'

export default function AnggurStep1() {
  const router = useRouter()

  const handleNextStep = () => {
    router.push('/plant/anggur/step/2')
  }

  return (
    <div className="min-h-screen bg-[#F7FAED] px-6 py-4">
      <header className="flex items-center justify-between bg-[#EEF2C2] px-4 py-2 rounded">
        <div className="flex items-center space-x-2">
          <img src="/images/logo-tanamkuy.png" alt="Logo" className="h-10 w-auto" />
          <span className="font-semibold text-lg text-[#4E472A]">TanamKuy</span>
        </div>
        <div className="text-[#4E472A] italic font-medium">Hallo, <span className="not-italic font-bold">Henny</span> 👤</div>
      </header>

      <main className="mt-8 text-[#3F2E1D]">
        <h1 className="text-xl italic mb-4">ANGGUR</h1>

        <div className="bg-[#A6AD78] rounded-2xl p-6 text-white max-w-md mx-auto shadow-md">
          <p className="italic mb-2">Hari Ke-1</p>
          <h2 className="text-center italic mb-4">Langkah Pertama :</h2>
          <ol className="list-decimal list-inside space-y-2 text-lg italic">
            <li>Siapkan benih ANGGUR unggul.</li>
            <li>Siapkan media tanam: pot/tanah, campur tanah + kompos.</li>
          </ol>

          <div className="mt-6 text-center">
            <button
              onClick={handleNextStep}
              className="bg-[#6E754E] hover:bg-[#5e6842] text-white px-6 py-2 rounded-full transition"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}