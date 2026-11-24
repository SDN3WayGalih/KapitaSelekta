/**
 * Mengunggah Hero.jpeg (folder root) ke Media dan memasangnya sebagai foto hero beranda
 * (Profil Sekolah > Gambar Hero). Aman diulang: bila sudah ada di Media, tidak diunggah lagi.
 *
 * Jalankan: pnpm tsx src/scripts/pasang-hero.ts
 */
import 'dotenv/config'
import path from 'path'
import sharp from 'sharp'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const SUMBER = path.resolve(process.cwd(), 'Hero.jpeg')
const NAMA_FILE = 'hero.jpg'
const ctx = { disableRevalidate: true }

async function run() {
  const payload = await getPayload({ config: configPromise })

  let media = (
    await payload.find({ collection: 'media', where: { filename: { equals: NAMA_FILE } }, limit: 1, depth: 0 })
  ).docs[0]

  if (!media) {
    const data = await sharp(SUMBER)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()

    const folder = (
      await payload.find({ collection: 'payload-folders', where: { name: { equals: 'Gedung & Logo' } }, limit: 1, depth: 0 })
    ).docs[0]

    media = await payload.create({
      collection: 'media',
      data: { alt: 'Gerbang dan halaman depan SDN 3 Way Galih', ...(folder ? { folder: folder.id } : {}) },
      file: { data, mimetype: 'image/jpeg', name: NAMA_FILE, size: data.length },
      context: ctx,
    })
    payload.logger.info(`Diunggah: ${NAMA_FILE} (${Math.round(data.length / 1024)} KB)`)
  }

  await payload.updateGlobal({ slug: 'profil-sekolah', data: { heroImage: media.id }, context: ctx })
  payload.logger.info('Selesai: foto hero beranda dipasang.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
