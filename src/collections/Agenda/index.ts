import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Agenda: CollectionConfig = {
  slug: 'agenda',
  labels: {
    singular: 'Agenda',
    plural: 'Agenda Sekolah',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'date', 'location', 'updatedAt'],
    description: 'Daftar kegiatan dan jadwal sekolah yang tampil di halaman beranda.',
    group: 'Konten Sekolah',
    useAsTitle: 'title',
  },
  defaultSort: 'date',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nama Kegiatan',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
      label: 'Tanggal',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      admin: {
        description: 'Contoh: 07.30 WIB',
      },
      label: 'Waktu',
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Contoh: Lapangan sekolah',
      },
      label: 'Lokasi',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Keterangan (opsional)',
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