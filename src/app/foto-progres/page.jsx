'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

export default function FotoProgresPage() {
  const fileInputRef = useRef(null)
  const [photos, setPhotos] = useState([]) // 👉 Mulai dari kosong

  const handleAddPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)

      // Tambahkan foto baru
      setPhotos((prev) => [
        ...prev,
        { src: imageUrl, day: prev.length + 1 },
      ])
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f4e8] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-[#5b6739]">← Foto Progres</h1>
        <p className="text-gray-700">Hallo, <i>Henny</i> 👤</p>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        {photos.map((photo) => (
          <div key={photo.day} className="text-center">
            <Image
              src={photo.src}
              alt={`Hari ke-${photo.day}`}
              width={120}
              height={120}
              className="rounded-md object-cover"
            />
            <p className="italic mt-2">Hari ke-{photo.day}</p>
          </div>
        ))}

        {/* Tombol Tambah */}
        <button
          onClick={handleAddPhoto}
          className="w-[120px] h-[120px] border-2 border-dashed border-[#7d844d] flex justify-center items-center text-4xl text-[#5b6739] hover:bg-[#e1e4b5]"
        >
          +
        </button>

        {/* Input file */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  )
}
