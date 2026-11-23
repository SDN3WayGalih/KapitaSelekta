/**
 * Memasang foto yang sudah ada di Media ke Profil Sekolah (struktur, sambutan,
 * beranda) dan Galeri. Jalankan setelah import-dokumentasi.ts.
 * Aman diulang: item galeri yang fotonya sudah dipakai dilewati.
 *
 * Jalankan: pnpm tsx src/scripts/pasang-foto.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const ctx = { disableRevalidate: true }

/** Struktur sesuai PDF. Satu orang boleh muncul dua kali (staf + guru). [nama, jabatan, file foto] */
const STRUKTUR: [string, string, string | null][] = [
  ['Miftah Danuri Latif, S.Pd.I', 'Kepala Sekolah', 'Kepsek.jpg'],
  ['Joko Sopramono', 'Komite Sekolah', null],
  ['Yuli Hartati, S.Pd', 'Bendahara Sekolah', 'yuli-hartati-s-pd.jpg'],
  ['Baron Aji Wibowo, SE', 'Operator Sekolah', 'baron-aji-wibowo-s-e.jpg'],
  ['Elmiyati', 'Penjaga Sekolah', null],
  ['Yuli Hartati, S.Pd', 'Guru', 'yuli-hartati-s-pd.jpg'],
  ['Puji Lestari, S.Pd', 'Guru', 'puji-lestari-s-pd.jpg'],
  ['Sri Sugiyanti, S.Pd', 'Guru', 'sri-sugiyanti-s-pd.jpg'],
  ['Tefi Mustika Sari, S.Pd', 'Guru', 'tefi-mustika-sari-s-pd.png'],
  ['Mariyatun, S.Pd', 'Guru', 'mariyatun-s-pd.png'],
  ['Titi Rahmawati, S.Pd', 'Guru', 'titi-rahmawati-s-pd.jpg'],
  ['Rita Gestari, S.Pd', 'Guru', 'rita-gestari-s-pd.jpg'],
  ['Kiki Rezky Armania, S.Pd', 'Guru', 'kiki-rezky-armania-s-pd.jpg'],
  ['Liling Cahyani, S.Pd', 'Guru', 'liling-cahyani-s-pd.jpg'],
  ['Susanto, S.Ag', 'Guru', 'susanto-s-ag.png'],
  ['Baron Aji Wibowo, SE', 'Guru', 'baron-aji-wibowo-s-e.jpg'],
  ['Wiwin Yusnita, S.Pd.I', 'Guru', 'wiwin-yusnita-s-pd.png'],
  ['Niken Azzahra, S.Pd', 'Guru', 'niken-azzahra-s-pd.jpg'],
  ['Fadhel', 'Pelatih Pramuka', 'fadhel-pelatih-pramuka.png'],
  ['Femy', 'Pelatih Pramuka', 'femy-pelatih-pramuka.png'],
]

/** Galeri: [file, judul, kategori]. Urutan = urutan tampil (terbaru di atas). */
const GALERI: [string, string, string][] = [
  ['eb91b929-f99c-4da6-9294-7c7edaf09cb5.jpg', 'Penerimaan Piala Prestasi Lomba', 'Prestasi'],
  ['lomba-17-agustus-2026.jpg', 'Lomba 17 Agustus 2026', 'Kegiatan'],
  ['upacra-17-dilapangan-desa-waygalih.jpg', 'Upacara 17 Agustus di Lapangan Desa Way Galih', 'Kegiatan'],
  ['hutpram-bersama-bupati.jpg', 'Peringatan Hari Pramuka bersama Bupati', 'Kegiatan'],
  ['upacara-hutpram-di-sd-3.jpg', 'Upacara Hari Pramuka di SDN 3 Way Galih', 'Kegiatan'],
  ['lomba-futsal-segugus.jpg', 'Lomba Futsal Segugus', 'Kegiatan'],
  ['844a9157-473d-45fd-8f82-d8c3de745963-3186-000000b278949629.jpg', 'Tim Futsal Siswa bersama Guru Pendamping', 'Kegiatan'],
  ['lomba-senam-kreasi-segugus.jpg', 'Lomba Senam Kreasi Segugus', 'Kegiatan'],
  ['poto-tahunan-kelas-6-2025-2026.jpg', 'Foto Tahunan Kelas 6 Tahun Ajaran 2025/2026', 'Kegiatan'],
  ['halal-bihalal-guru-dan-murid.jpg', 'Halal Bihalal Guru dan Murid', 'Kegiatan'],
  ['bimbingan-teknis-guru.jpg', 'Bimbingan Teknis Guru', 'Kegiatan'],
  ['komunitas-belajar-guru-sd-3.jpg', 'Komunitas Belajar Guru SDN 3 Way Galih', 'Kegiatan'],
  ['menanam-pohon-bersama-komunitas.jpg', 'Menanam Pohon bersama Komunitas', 'Kegiatan'],
  ['penanaman-pohon-asuh-guru-p3k.jpg', 'Penanaman Pohon Asuh Guru PPPK', 'Kegiatan'],
  ['ppl-annur.jpg', 'Mahasiswa PPL Annur', 'Kegiatan'],
  ['b8dad4a2-d2bc-4f14-a49f-7b4640679c36-37802-000004a807b991fb.jpg', 'Kegiatan Guru di Aula', 'Kegiatan'],
  ['img-9064.jpg', 'Ibadah Bersama Siswa di Halaman Sekolah', 'Kegiatan'],
  ['img-7258.jpg', 'Foto Bersama Warga Sekolah', 'Kegiatan'],
  ['img-5348.jpg', 'Kegiatan Siswa di Lapangan', 'Kegiatan'],
  ['img-5362.jpg', 'Kegiatan Bersama Warga Sekolah', 'Kegiatan'],
  ['img-5424.jpg', 'Kegiatan Luar Sekolah bersama Siswa', 'Kegiatan'],
  ['img-5732.jpg', 'Permainan Kelompok Siswa', 'Kegiatan'],
  ['img-4714.jpg', 'Foto Bersama Siswa dan Guru', 'Kegiatan'],
  ['img-0662.jpg', 'Foto Bersama Dewan Guru', 'Kegiatan'],
  ['img-6811.jpg', 'Kegiatan Bersama Guru', 'Kegiatan'],
  ['img-0487.jpg', 'Guru di Gerbang Sekolah', 'Kegiatan'],
  ['img-6263.jpg', 'Gedung SDN 3 Way Galih', 'Gedung & Fasilitas'],
  ['img-6261.jpg', 'Gerbang Sekolah', 'Gedung & Fasilitas'],
  ['img-6269.jpg', 'Papan Nama Sekolah', 'Gedung & Fasilitas'],
  ['img-6264.jpg', 'Halaman dan Ruang Kelas', 'Gedung & Fasilitas'],
  ['img-6265.jpg', 'Lingkungan Sekolah', 'Gedung & Fasilitas'],
  ['img-6266.jpg', 'Ruang Kelas', 'Gedung & Fasilitas'],
  ['img-6267.jpg', 'Halaman Sekolah', 'Gedung & Fasilitas'],
  ['img-6268.jpg', 'Bangunan Sekolah', 'Gedung & Fasilitas'],
]

const FOTO_SAMBUTAN = 'Kepsek.jpg'
const FOTO_BERANDA = 'img-6263.jpg'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const semua = await payload.find({ collection: 'media', limit: 500, depth: 0, pagination: false })
  const idDari = new Map(semua.docs.map((m) => [m.filename ?? '', m.id]))
  const cari = (file: string | null) => {
    if (!file) return null
    const id = idDari.get(file)
    if (!id) throw new Error(`Foto "${file}" tidak ditemukan di Media`)
    return id
  }

  // Validasi dulu semua nama file sebelum menulis apa pun
  STRUKTUR.forEach(([, , f]) => cari(f))
  GALERI.forEach(([f]) => cari(f))

  payload.logger.info('Profil Sekolah: struktur, foto sambutan, foto beranda...')
  await payload.updateGlobal({
    slug: 'profil-sekolah',
    data: {
      struktur: STRUKTUR.map(([name, position, f]) => ({ name, position, photo: cari(f) })),
      sambutanPhoto: cari(FOTO_SAMBUTAN),
      heroImage: cari(FOTO_BERANDA),
    },
    context: ctx,
  })

  payload.logger.info('Galeri...')
  const now = Date.now()
  let baru = 0
  for (const [i, [file, title, category]] of GALERI.entries()) {
    const image = cari(file)!
    const ada = await payload.find({ collection: 'galeri', where: { image: { equals: image } }, limit: 1, depth: 0 })
    if (ada.docs[0]) continue
    await payload.create({
      collection: 'galeri',
      data: { title, image, category, publishedAt: new Date(now - i * 60_000).toISOString(), _status: 'published' },
      context: ctx,
    })
    baru++
  }

  payload.logger.info(`✅ Selesai: ${STRUKTUR.length} anggota struktur, ${baru} item galeri baru.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Gagal:', err)
  process.exit(1)
})
