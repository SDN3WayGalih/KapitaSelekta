/**
 * Unggah foto dari folder "Data SDN 3 Way Galih" ke Media (admin), dikelompokkan
 * per folder. Foto BELUM dipasang ke galeri/struktur; itu dilakukan lewat admin.
 * Aman diulang: foto yang nama filenya sudah ada dilewati.
 *
 * Jalankan: pnpm tsx src/scripts/import-dokumentasi.ts
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const ROOT = path.resolve(process.cwd(), 'Data SDN 3 Way Galih')
const ctx = { disableRevalidate: true }

/** Folder sumber -> nama folder di Media. */
const FOLDER: Record<string, string> = {
  'Foto Kepala Sekolah': 'Struktur Organisasi',
  'Foto Kegiatan': 'Foto Kegiatan',
  'Logo dan Foto Gedung': 'Gedung & Logo',
  'Foto Berita dan Prestasi': 'Berita & Prestasi',
}

/** Deskripsi foto (alt). Yang tidak ada di sini memakai nama file yang dirapikan. */
const DESKRIPSI: Record<string, string> = {
  'Kepsek.jpg': 'Miftah Danuri Latif, S.Pd.I (Kepala Sekolah)',
  'BARON AJI WIBOWO, S.E.JPG': 'Baron Aji Wibowo, SE',
  'KIKI REZKY ARMANIA, S.Pd.JPG': 'Kiki Rezky Armania, S.Pd',
  'Liling cahyani, S.Pd.JPG': 'Liling Cahyani, S.Pd',
  'Mariyatun, S.Pd.PNG': 'Mariyatun, S.Pd',
  'Niken azzahra, S.Pd.JPG': 'Niken Azzahra, S.Pd',
  'Puji lestari, S.Pd.JPG': 'Puji Lestari, S.Pd',
  'Rita gestari, S.Pd.JPG': 'Rita Gestari, S.Pd',
  'SRI SUGIYANTI, S.Pd.JPG': 'Sri Sugiyanti, S.Pd',
  'Susanto, S.Ag.PNG': 'Susanto, S.Ag',
  'Tefi mustika sari, S.Pd.PNG': 'Tefi Mustika Sari, S.Pd',
  'Titi rahmawati, S.Pd.JPG': 'Titi Rahmawati, S.Pd',
  'Wiwin Yusnita, S.Pd.PNG': 'Wiwin Yusnita, S.Pd.I',
  'YULI HARTATI, S.Pd.JPG': 'Yuli Hartati, S.Pd',
  'Fadhel (pelatih pramuka) .PNG': 'Fadhel (Pelatih Pramuka)',
  'Femy (pelatih pramuka) .PNG': 'Femy (Pelatih Pramuka)',
  'eb91b929-f99c-4da6-9294-7c7edaf09cb5.jpg': 'Penerimaan piala prestasi lomba',
  '844A9157-473D-45FD-8F82-D8C3DE745963-3186-000000B278949629.jpg': 'Tim futsal siswa bersama guru pendamping',
  'B8DAD4A2-D2BC-4F14-A49F-7B4640679C36-37802-000004A807B991FB.jpg': 'Kegiatan guru di aula',
  'HUTPRAM BERSAMA BUPATI .JPG': 'Peringatan Hari Pramuka bersama Bupati',
  'Upacara Hutpram di sd 3 .JPG': 'Upacara Hari Pramuka di SDN 3 Way Galih',
  'Upacra 17 dilapangan desa waygalih.JPG': 'Upacara 17 Agustus di Lapangan Desa Way Galih',
  'Poto tahunan kelas 6 2025 - 2026.JPG': 'Foto tahunan kelas 6 tahun ajaran 2025/2026',
  'Penanaman pohon asuh guru p3k.JPG': 'Penanaman pohon asuh guru PPPK',
  'Ppl annur .JPG': 'Mahasiswa PPL Annur',
  'b0675965-3bb4-4a88-9642-c1993d65e3b0.jpg': 'Logo Tim Digitalisasi Pembelajaran SDN 3 Way Galih',
  'IMG_6169.PNG': 'Logo Komunitas Belajar Teamistry',
  'IMG_6263.JPG': 'Gedung SDN 3 Way Galih',
  'IMG_6261.JPG': 'Gerbang sekolah',
  'IMG_6269.JPG': 'Papan nama sekolah',
}

// Foto kepala sekolah sudah diunggah manual lewat admin (Kepsek.jpg)
const LEWATI = new Set(['Kepsek.jpg'])

function rapikan(file: string) {
  const nama = file.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim()
  return nama.charAt(0).toUpperCase() + nama.slice(1)
}

function slug(name: string) {
  return name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function run() {
  const payload = await getPayload({ config: configPromise })
  let baru = 0
  let lewat = 0

  for (const [sumber, namaFolder] of Object.entries(FOLDER)) {
    const ada = await payload.find({
      collection: 'payload-folders',
      where: { name: { equals: namaFolder } },
      limit: 1,
      depth: 0,
    })
    const folder =
      ada.docs[0] ??
      (await payload.create({ collection: 'payload-folders', data: { name: namaFolder, folderType: ['media'] } }))
    payload.logger.info(`Folder "${namaFolder}"`)

    const files = fs.readdirSync(path.join(ROOT, sumber)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
    for (const file of files) {
      const isPng = /\.png$/i.test(file)
      const filename = `${slug(file)}.${isPng ? 'png' : 'jpg'}`
      const sudah = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, depth: 0 })
      if (LEWATI.has(file) || sudah.docs[0]) {
        lewat++
        continue
      }

      // Foto kamera 2-4 MB cukup 1920px untuk web
      let img = sharp(path.join(ROOT, sumber, file))
        .rotate()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      img = isPng ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 82, mozjpeg: true })
      const data = await img.toBuffer()

      await payload.create({
        collection: 'media',
        data: { alt: DESKRIPSI[file] ?? rapikan(file), folder: folder.id },
        file: { data, mimetype: isPng ? 'image/png' : 'image/jpeg', name: filename, size: data.length },
        context: ctx,
      })
      baru++
      payload.logger.info(`  ↑ ${filename} (${Math.round(data.length / 1024)} KB)`)
    }
  }

  payload.logger.info(`✅ Selesai: ${baru} foto diunggah, ${lewat} dilewati.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Gagal:', err)
  process.exit(1)
})
