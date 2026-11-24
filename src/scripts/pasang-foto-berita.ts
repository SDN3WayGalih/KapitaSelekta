/**
 * Memasang Gambar Utama (heroImage) ke berita yang sudah ada, memakai foto
 * yang sudah diunggah ke Media. Berita yang sudah punya gambar dilewati,
 * jadi aman diulang dan tidak menimpa pilihan admin.
 *
 * Jalankan: pnpm tsx src/scripts/pasang-foto-berita.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const ctx = { disableRevalidate: true }

/** [slug berita, file foto di Media] */
const FOTO_BERITA: [string, string][] = [
  ['tim-futsal-melaju-final', 'futsal.jpg'],
  ['semarak-lomba-17-agustus', 'lomba-17-agustus-2026.jpg'],
  ['jadwal-ppdb-diumumkan', 'img-6261.jpg'],
  ['upacara-bendera-perdana', 'upacra-17-dilapangan-desa-waygalih.jpg'],
  ['juara-1-lomba-matematika', 'eb91b929-f99c-4da6-9294-7c7edaf09cb5.jpg'],
  ['website-resmi-sekolah', 'img-6263.jpg'],
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  const semua = await payload.find({ collection: 'media', limit: 500, depth: 0, pagination: false })
  const idDari = new Map(semua.docs.map((m) => [m.filename ?? '', m.id]))

  // Validasi dulu semua nama file sebelum menulis apa pun
  for (const [, file] of FOTO_BERITA) {
    if (!idDari.has(file)) throw new Error(`Foto "${file}" tidak ditemukan di Media`)
  }

  let dipasang = 0
  for (const [slug, file] of FOTO_BERITA) {
    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const post = docs[0]
    if (!post) {
      payload.logger.warn(`Berita "${slug}" tidak ada, dilewati`)
      continue
    }
    if (post.heroImage) continue

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { heroImage: idDari.get(file)! },
      context: ctx,
    })
    dipasang++
  }

  payload.logger.info(`Selesai: ${dipasang} berita diberi Gambar Utama.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
