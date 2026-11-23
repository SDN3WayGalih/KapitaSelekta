import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

/** Nama Indonesia + keterangan untuk koleksi teknis (termasuk bawaan plugin). */
const LABEL_TEKNIS: Record<string, { singular: string; plural: string; description: string }> = {
  pages: { singular: 'Halaman', plural: 'Halaman Tambahan', description: 'Halaman bebas di luar menu utama. Jarang perlu diubah.' },
  categories: { singular: 'Kategori', plural: 'Kategori Berita', description: 'Pengelompokan berita. Jarang perlu diubah.' },
  redirects: { singular: 'Pengalihan', plural: 'Pengalihan Alamat', description: 'Teknis: mengarahkan alamat lama ke alamat baru.' },
  forms: { singular: 'Formulir', plural: 'Formulir', description: 'Teknis: susunan formulir di website.' },
  'form-submissions': { singular: 'Kiriman', plural: 'Kiriman Formulir', description: 'Pesan yang dikirim pengunjung lewat formulir website.' },
  search: { singular: 'Hasil', plural: 'Indeks Pencarian', description: 'Teknis: diisi otomatis, tidak perlu diubah.' },
}

/** Format tanggal Indonesia di kolom isian, mis. "24 November 2026, 00.55". */
function formatTanggalIndonesia<T>(fields: T[]): T[] {
  return fields.map((f) => {
    const field = f as Record<string, unknown>
    const salin: Record<string, unknown> = { ...field }
    if (field.type === 'date') {
      const admin = (field.admin ?? {}) as { date?: { pickerAppearance?: string; displayFormat?: string } }
      const tampilan = admin.date?.pickerAppearance
      if (!admin.date?.displayFormat && tampilan !== 'timeOnly' && tampilan !== 'monthOnly') {
        salin.admin = {
          ...admin,
          date: { ...admin.date, displayFormat: tampilan === 'dayOnly' ? 'd MMMM yyyy' : 'd MMMM yyyy, HH.mm' },
        }
      }
    }
    if (Array.isArray(field.fields)) salin.fields = formatTanggalIndonesia(field.fields)
    if (Array.isArray(field.tabs)) {
      salin.tabs = (field.tabs as Record<string, unknown>[]).map((t) => ({
        ...t,
        fields: formatTanggalIndonesia((t.fields as unknown[]) ?? []),
      }))
    }
    return salin as T
  })
}

/**
 * Plugin terakhir: merapikan panel admin agar ramah pengguna awam.
 * - Menyembunyikan tab "API" (hanya berguna untuk pengembang).
 * - Memberi nama Indonesia pada koleksi teknis.
 */
const ramahAdmin: Plugin = (config) => ({
  ...config,
  collections: config.collections?.map((c) => {
    const label = LABEL_TEKNIS[c.slug]
    return {
      ...c,
      fields: formatTanggalIndonesia(c.fields),
      ...(label && { labels: { singular: label.singular, plural: label.plural } }),
      admin: {
        ...c.admin,
        hideAPIURL: true,
        ...(label && { description: label.description }),
      },
    }
  }),
  globals: config.globals?.map((g) => ({
    ...g,
    fields: formatTanggalIndonesia(g.fields),
    ...(g.slug === 'header' && { label: 'Menu Atas Website' }),
    ...(g.slug === 'footer' && { label: 'Bagian Bawah Website' }),
    admin: { ...g.admin, hideAPIURL: true },
  })),
})

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      admin: { group: 'Lanjutan' },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      admin: { group: 'Lanjutan' },
    },
    formOverrides: {
      admin: { group: 'Lanjutan' },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      admin: { group: 'Lanjutan' },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // Foto disimpan di Supabase Storage (S3-compatible) agar bisa diakses dari
  // semua lingkungan. Tanpa variabel S3_* di .env, upload kembali ke public/media.
  s3Storage({
    enabled: Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID),
    collections: {
      media: {
        // Bucket publik: browser mengambil file langsung dari CDN Supabase.
        disablePayloadAccessControl: true,
        generateFileURL: ({ filename, prefix }) =>
          [process.env.S3_PUBLIC_URL, prefix, filename].filter(Boolean).join('/'),
      },
    },
    bucket: process.env.S3_BUCKET || '',
    config: {
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
    },
  }),
  ramahAdmin,
]
