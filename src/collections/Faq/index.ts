import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Faq: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['question', 'category', 'order'],
    description: 'Pertanyaan yang sering diajukan, tampil di beranda dan halaman PPDB.',
    group: 'Konten Sekolah',
    useAsTitle: 'question',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Pertanyaan',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      label: 'Jawaban',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        description: 'Menentukan di halaman mana FAQ ini ditampilkan.',
      },
      defaultValue: 'ppdb',
      label: 'Kategori',
      options: [
        { label: 'PPDB', value: 'ppdb' },
        { label: 'Umum', value: 'umum' },
      ],
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Urutan tampil, angka kecil lebih dulu.',
        position: 'sidebar',
      },
      defaultValue: 0,
      label: 'Urutan',
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