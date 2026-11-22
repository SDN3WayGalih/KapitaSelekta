import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

import { revalidatePath } from 'next/cache'

/**
 * Halaman publik sekolah (beranda, /berita, /galeri, /ppdb, dst.) dirender statis saat build.
 * Tanpa revalidate, perubahan dari admin baru tampil setelah deploy ulang.
 *
 * Satu perubahan konten bisa muncul di beberapa halaman (mis. profil sekolah dipakai di
 * header/footer semua halaman), jadi yang di-revalidate adalah seluruh layout root.
 * Untuk website sekolah dengan beberapa halaman saja, ini murah dan tidak ada halaman yang terlewat.
 */
const revalidateSitusSekolah = (req: PayloadRequest, sumber: string) => {
  if (req.context?.disableRevalidate) return

  try {
    revalidatePath('/', 'layout')
    req.payload.logger.info(`Revalidate website sekolah (perubahan: ${sumber})`)
  } catch {
    // revalidatePath hanya bisa dipanggil di dalam server Next.js.
    // Saat dijalankan dari skrip (mis. `pnpm seed:sekolah`) panggilan ini gagal, dan itu wajar.
    req.payload.logger.debug(`Lewati revalidate (${sumber}): bukan di dalam server Next.js`)
  }
}

export const revalidateSekolahAfterChange: CollectionAfterChangeHook = ({
  collection,
  doc,
  previousDoc,
  req,
}) => {
  const versioned = Boolean(collection.versions?.drafts)
  // Draft yang belum pernah terbit tidak tampil di website, jadi tidak perlu revalidate.
  const pernahTerbit =
    !versioned || doc?._status === 'published' || previousDoc?._status === 'published'

  if (pernahTerbit) revalidateSitusSekolah(req, collection.slug)
  return doc
}

export const revalidateSekolahAfterDelete: CollectionAfterDeleteHook = ({
  collection,
  doc,
  req,
}) => {
  revalidateSitusSekolah(req, collection.slug)
  return doc
}

export const revalidateSekolahGlobal: GlobalAfterChangeHook = ({ doc, global, req }) => {
  revalidateSitusSekolah(req, global.slug)
  return doc
}
