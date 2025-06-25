'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function FotoProgresPage() {
  const { id } = useParams()
  const fileInputRef = useRef(null)
  const [photos, setPhotos] = useState([])
  const [user, setUser] = useState(null)

  // Ambil user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Load foto progres dari localStorage berdasarkan ID tanaman
  useEffect(() => {
    const stored = localStorage.getItem(`photos-${id}`)
    if (stored) {
      setPhotos(JSON.parse(stored))
    }
  }, [id])

  // Simpan setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem(`photos-${id}`, JSON.stringify(photos))
  }, [photos, id])

  const handleAddPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos((prev) => [
          ...prev,
          { src: reader.result, day: prev.length + 1 },
        ])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center bg-[#eef1c9] px-6" style={{ height: '60px' }}>
        <div className="h-full">
          <img src="/images/logo-tanamkuy.png" alt="logo" className="h-full object-contain" />
        </div>
        <div className="text-right">
          <p className="text-xl text-[#2e2b1b]">
            Hallo,{' '}
            <em className="text-[#5b6739] font-semibold">
              {user?.name || 'Pengguna'}
            </em>
          </p>
        </div>
      </div>

      {/* Konten */}
      <div className="min-h-screen bg-[#f9fce6] px-6 py-10">
        <h1 className="text-2xl italic text-[#2e2b1b] mb-8">Foto Progres</h1>

        <div className="flex flex-wrap items-start gap-8">
          {photos.map((photo) => (
            <div key={photo.day} className="text-center">
              <img
                src={photo.src}
                alt={`Hari ke-${photo.day}`}
                className="w-[140px] h-[140px] rounded-lg object-cover"
              />
              <p className="italic mt-2 text-[#6b7046]">Hari ke-{photo.day}</p>
            </div>
          ))}

          {/* Tombol tambah */}
          <button
            onClick={handleAddPhoto}
            className="w-[140px] h-[140px] rounded-lg border-2 border-dashed border-[#5b6739] flex justify-center items-center text-6xl text-[#2e2b1b] hover:bg-[#e9edcc]"
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
    </div>
  )
}
