import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Tomat
  await prisma.plantType.upsert({
    where: { name: 'tomat' },
    update: {}, // tidak update apapun jika sudah ada
    create: {
      name: 'tomat',
      image: '/images/tomato.png',
      description: 'Tomat atau rangam (Solanum lycopersicum) adalah tumbuhan dari keluarga Terong-terongan, tumbuhan asli Amerika Tengah dan Selatan, dari Meksiko sampai Peru...',
      steps: [
        'Siapkan pot dan tanah yang subur',
        'Tanam benih tomat ke dalam tanah',
        'Sirami secukupnya',
        'Cek kelembapan tanah keesokan harinya',
        'Pastikan tanaman mendapatkan sinar matahari'
      ]
    }
  })

  // Cabai
  await prisma.plantType.upsert({
    where: { name: 'cabai' },
    update: {},
    create: {
      name: 'cabai',
      image: '/images/cabai.png',
      description: 'Cabai adalah buah dan tumbuhan anggota genus Capsicum...',
      steps: [
        'Siapkan  media tanam di polybag',
        'Tanam benih cabai ke dalam lubang kecil',
        'Sirami setiap pagi',
        'Cek pertumbuhan tunas setiap hari',
        'Pindahkan ke tempat yang cukup cahaya'
      ]
    }
  })

  // Anggur
  await prisma.plantType.upsert({
    where: { name: 'anggur' },
    update: {},
    create: {
      name: 'anggur',
      image: '/images/anggur.png',
      description: 'Anggur adalah buah yang berasal dari tanaman perdu merambat...',
      steps: [
        'Isi pot dengan air dan media tanam',
        'Tebar benih kangkung secara merata',
        'Pastikan air tetap bersih dan tidak tergenang',
        'Lihat pertumbuhan daun pada hari ke-3',
        'Siap panen dalam waktu seminggu'
      ]
    }
  })

  console.log('✅ 3 tanaman berhasil di-*seed* tanpa duplikat.')
}

main()
  .catch((e) => {
    console.error('❌ Gagal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
