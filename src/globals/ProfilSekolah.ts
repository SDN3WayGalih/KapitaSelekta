import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const ProfilSekolah: GlobalConfig = {
  slug: 'profil-sekolah',
  label: 'Profil Sekolah',
  access: {
    read: authenticated,
    update: authenticated,
  },
  admin: {
    description: 'Konten profil sekolah: sambutan, visi-misi, statistik, dan kontak. Tampil di beranda dan halaman profil.',
    group: 'Konten Sekolah',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identitas',
          fields: [
            {
              name: 'heroBadge',
              type: 'text',
              defaultValue: 'Selamat Datang di Website Resmi',
              label: 'Teks Badge Beranda',
            },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'SDN 3 Way Galih',
              label: 'Judul Beranda',
              required: true,
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              defaultValue: 'Mencetak Generasi Cerdas & Berkarakter',
              label: 'Subjudul Beranda',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue:
                'Sekolah dasar negeri yang menghadirkan lingkungan belajar yang aman, menyenangkan, dan penuh prestasi untuk putra-putri Anda.',
              label: 'Deskripsi Beranda',
            },
            {
              name: 'topbarPhone',
              type: 'text',
              defaultValue: '(0721) 123456',
              label: 'Telepon (Topbar & Footer)',
            },
            {
              name: 'topbarEmail',
              type: 'email',
              defaultValue: 'info@sdn3waygalih.sch.id',
              label: 'Email (Topbar & Footer)',
            },
            {
              name: 'footerAddress',
              type: 'textarea',
              defaultValue: 'Jln. Desa nagaria No.Kel, Way Galih\nKec. Tj. Bintang, Kabupaten Lampung Selatan, Lampung 35361',
              label: 'Alamat (Footer)',
            },
            {
              name: 'footerTagline',
              type: 'text',
              defaultValue: 'Mewujudkan peserta didik yang cerdas, berkarakter, dan berakhlak mulia.',
              label: 'Tagline (Footer)',
            },
          ],
        },
        {
          label: 'Sambutan',
          fields: [
            {
              name: 'sambutanQuote',
              type: 'textarea',
              label: 'Isi Sambutan Kepala Sekolah',
            },
            {
              name: 'sambutanName',
              type: 'text',
              label: 'Nama Kepala Sekolah',
            },
            {
              name: 'sambutanTitle',
              type: 'text',
              defaultValue: 'Kepala SDN 3 Way Galih',
              label: 'Jabatan',
            },
          ],
        },
        {
          label: 'Visi Misi',
          fields: [
            {
              name: 'visi',
              type: 'textarea',
              label: 'Visi',
            },
            {
              name: 'misi',
              type: 'array',
              fields: [
                {
                  name: 'misiItem',
                  type: 'textarea',
                  required: true,
                },
              ],
              label: 'Misi (satu baris per poin)',
            },
            {
              name: 'sejarah',
              type: 'textarea',
              label: 'Sejarah Singkat',
            },
          ],
        },
        {
          label: 'Info Sekolah',
          fields: [
            {
              name: 'infoItems',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
              labels: {
                singular: 'Info',
                plural: 'Info Sekolah',
              },
            },
            {
              name: 'struktur',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'position',
                  type: 'text',
                  required: true,
                },
              ],
              label: 'Struktur Sekolah',
              labels: {
                singular: 'Pejabat',
                plural: 'Struktur Organisasi',
              },
            },
          ],
        },
        {
          label: 'Statistik & Badge',
          fields: [
            {
              name: 'statItems',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                  admin: {
                    description: 'Contoh: + (untuk menampilkan 300+)',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              label: 'Statistik',
              labels: {
                singular: 'Statistik',
                plural: 'Angka Statistik',
              },
            },
            {
              name: 'badgeItems',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'Emoji atau simbol, contoh: 🏫',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              label: 'Badge Keunggulan',
              labels: {
                singular: 'Badge',
                plural: 'Badge Keunggulan',
              },
            },
          ],
        },
      ],
    },
  ],
}