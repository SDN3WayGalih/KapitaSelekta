import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import {
  revalidateSekolahAfterChange,
  revalidateSekolahAfterDelete,
} from '../../hooks/revalidateSekolah'

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
