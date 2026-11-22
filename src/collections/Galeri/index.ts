import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import {
  revalidateSekolahAfterChange,
  revalidateSekolahAfterDelete,
} from '../../hooks/revalidateSekolah'

export const Galeri: CollectionConfig = {
  slug: 'galeri',
  labels: {
    singular: 'Foto Galeri',
    plural: 'Galeri',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'updatedAt'],
    description: 'Foto kegiatan sekolah, tampil di beranda dan halaman galeri.',
    group: 'Konten Sekolah',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul/Caption Foto',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Contoh: Kegiatan Belajar, Upacara, Ekstrakurikuler',
      },
      label: 'Kategori Kegiatan',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData?._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
      label: 'Tanggal Publikasi',
    },
  ],
  hooks: {
    afterChange: [revalidateSekolahAfterChange],
    afterDelete: [revalidateSekolahAfterDelete],
  },
  versions: {
    // Tanpa autosave: dengan autosave, setiap klik "Create New" langsung menyimpan
    // draft kosong ke database, sehingga daftar penuh entri tanpa judul.
    drafts: true,
    maxPerDoc: 20,
  },
}
