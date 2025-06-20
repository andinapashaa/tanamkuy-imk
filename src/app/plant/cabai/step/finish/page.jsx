'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function FinishStepPage() {
  const router = useRouter()

  const handleUpload = () => {
    alert('Fitur unggah belum tersedia 😄')
    // Di sini bisa diarahkan ke halaman upload jika sudah ada:
    // router.push('/upload')
  }

  const handleHome = () => {
    router.push('/dashboard') // Ganti sesuai lokasi berandamu
  }

  return (
    <div className="min-h-screen bg-[#f1f4e8] flex flex-col justify-center items-center text-center p-6">
      {/* Gambar Ilustrasi */}
      <Image
        src="/images/ilustrasi-tanaman.png" // Pastikan file ini ada di public/images/
        alt="Ilustrasi Tanaman"
        width={300}
        height={300}
        className="mb-6"
      />

      {/* Pesan */}
      <h1 className="text-2xl font-semibold text-[#5b6739] mb-4">Selamat! 🌱</h1>
      <p className="text-gray-700 max-w-md mb-8">
        Kamu telah menyelesaikan proses menanam anggur. Ayo lanjutkan dengan mengunggah foto progres tanamanmu untuk melihat pertumbuhannya!
      </p>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleUpload}
          className="bg-[#7d844d] text-white px-6 py-2 rounded-full hover:bg-[#6b753b] transition"
        >
          Unggah Foto Progres
        </button>
        <button
          onClick={handleHome}
          className="border border-[#7d844d] text-[#7d844d] px-6 py-2 rounded-full hover:bg-[#e1e4b5] transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}