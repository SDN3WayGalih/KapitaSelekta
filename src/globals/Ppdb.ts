import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Ppdb: GlobalConfig = {
  slug: 'ppdb',
  label: 'PPDB',
  access: {
    read: authenticated,
    update: authenticated,
  },
  admin: {
    description: 'Informasi penerimaan peserta didik baru yang tampil di halaman PPDB dan beranda.',
    group: 'Konten Sekolah',
  },
  fields: [
    {
      name: 'academicYear',
      type: 'text',
      defaultValue: '2026/2027',
      label: 'Tahun Ajaran',
      required: true,
    },
    {
      name: 'bannerTitle',
      type: 'text',
      defaultValue: 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027 Telah Dibuka!',
      label: 'Judul Banner Beranda',
    },
    {
      name: 'bannerDescription',
      type: 'textarea',
      defaultValue: 'Daftarkan putra-putri Anda sekarang. Kuota terbatas, pendaftaran gratis dan mudah.',
      label: 'Deskripsi Banner Beranda',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Alur Pendaftaran',
          fields: [
            {
              name: 'steps',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Judul Langkah',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Keterangan',
                  required: true,
                },
              ],
              label: 'Langkah Pendaftaran',
              labels: {
                singular: 'Langkah',
                plural: 'Langkah Pendaftaran',
              },
            },
          ],
        },
        {
          label: 'Timeline',
          fields: [
            {
              name: 'timeline',
              type: 'array',
              fields: [
                {
                  name: 'date',
                  type: 'text',
                  label: 'Rentang Tanggal',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Kegiatan',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Keterangan',
                  required: true,
                },
              ],
              label: 'Timeline PPDB',
              labels: {
                singular: 'Timeline',
                plural: 'Timeline PPDB',
              },
            },
          ],
        },
        {
          label: 'Persyaratan',
          fields: [
            {
              name: 'requirements',
              type: 'array',
              fields: [
                {
                  name: 'requirement',
                  type: 'text',
                  label: 'Persyaratan',
                  required: true,
                },
              ],
              label: 'Syarat Pendaftaran',
              labels: {
                singular: 'Syarat',
                plural: 'Syarat Pendaftaran',
              },
            },
            {
              name: 'registrationForm',
              type: 'upload',
              admin: {
                description: 'File formulir yang dapat diunduh pengunjung (opsional).',
              },
              label: 'Formulir Pendaftaran',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}