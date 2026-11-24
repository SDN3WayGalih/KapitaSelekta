/**
 * Mengisi "Info Sekolah" di Profil Sekolah dengan data identitas, legalitas, dan sarana
 * (lihat src/utilities/infoSekolah.ts). Menimpa daftar info yang ada, bagian lain profil
 * tidak disentuh.
 *
 * Jalankan: pnpm tsx src/scripts/pasang-info-sekolah.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { INFO_SEKOLAH } from '../utilities/infoSekolah'

async function run() {
  const payload = await getPayload({ config: configPromise })
  await payload.updateGlobal({
    slug: 'profil-sekolah',
    data: { infoItems: INFO_SEKOLAH },
    context: { disableRevalidate: true },
  })
  payload.logger.info(`Selesai: ${INFO_SEKOLAH.length} info sekolah dipasang.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
