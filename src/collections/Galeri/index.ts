import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

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
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 20,
  },
}