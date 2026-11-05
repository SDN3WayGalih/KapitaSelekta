import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Testimoni: CollectionConfig = {
  slug: 'testimoni',
  labels: {
    singular: 'Testimoni',
    plural: 'Testimoni Wali Murid',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'relation', 'updatedAt'],
    description: 'Kata-kata dari wali murid, tampil di halaman beranda.',
    group: 'Konten Sekolah',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      label: 'Isi Testimoni',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nama',
      required: true,
    },
    {
      name: 'relation',
      type: 'text',
      admin: {
        description: 'Contoh: Wali murid kelas 3',
      },
      label: 'Keterangan',
      required: true,
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