import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { revalidateSekolahGlobal } from '../hooks/revalidateSekolah'

export const ProfilSekolah: GlobalConfig = {
  slug: 'profil-sekolah',
  label: 'Profil Sekolah',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    description: 'Konten profil sekolah: sambutan, visi-misi, statistik, dan kontak. Tampil di beranda dan halaman profil.',
    group: 'Konten Sekolah',
  },
  hooks: {
    afterChange: [revalidateSekolahGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identitas',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Foto Beranda (gedung sekolah)',
            },
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
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'URL Sematan Google Maps',
              admin: { description: 'Gunakan URL embed dari Google Maps, bukan URL peta biasa.' },
            },
            { name: 'officeHours', type: 'text', label: 'Jam Pelayanan' },
            { name: 'whatsappNumber', type: 'text', label: 'Nomor WhatsApp Admin', admin: { description: 'Format internasional tanpa tanda +, contoh 62812…' } },
            { name: 'ppdbUrl', type: 'text', label: 'Tautan Situs PPDB Resmi' },
          ],
        },
        {
          label: 'Sambutan',
          fields: [
            {
              name: 'sambutanPhoto',
              type: 'upload',
              relationTo: 'media',
              label: 'Foto Kepala Sekolah',
            },
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
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                {
                  name: 'misiItem',
                  type: 'textarea',
                  label: 'Poin Misi',
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
          label: 'Program Sekolah',
          fields: [
            {
              name: 'featuredPrograms',
              type: 'array',
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                { name: 'title', type: 'text', label: 'Nama Program', required: true },
                { name: 'description', type: 'textarea', label: 'Deskripsi Program', required: true },
              ],
              label: 'Program Unggulan',
              labels: { singular: 'Program', plural: 'Program Unggulan' },
            },
            {
              name: 'extracurriculars',
              type: 'array',
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                { name: 'name', type: 'text', label: 'Nama Ekstrakurikuler', required: true },
                { name: 'schedule', type: 'text', label: 'Jadwal', required: true },
              ],
              label: 'Ekstrakurikuler',
              labels: { singular: 'Ekstrakurikuler', plural: 'Ekstrakurikuler' },
            },
          ],
        },
        {
          label: 'Info Sekolah',
          fields: [
            {
              name: 'infoItems',
              type: 'array',
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Nama Info (contoh: NPSN)',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Isi',
                  required: true,
                },
              ],
              labels: {
                singular: 'Info',
                plural: 'Info Sekolah',
              },
              label: 'Info Sekolah',
            },
            {
              name: 'struktur',
              type: 'array',
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Nama Lengkap & Gelar',
                  required: true,
                },
                {
                  name: 'position',
                  type: 'text',
                  label: 'Jabatan',
                  required: true,
                  admin: {
                    description:
                      'Menentukan posisi di bagan: "Kepala", "Komite", "Guru", "Pelatih"/"Pembina", selain itu masuk kolom staf.',
                  },
                },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Foto',
                },
              ],
              label: 'Struktur Sekolah',
              labels: {
                singular: 'Anggota',
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
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  label: 'Angka',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                  label: 'Tanda di belakang angka',
                  admin: {
                    description: 'Contoh: + (untuk menampilkan 300+)',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Keterangan (contoh: Siswa Aktif)',
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
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabel#RowLabel' },
              },
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Ikon',
                  admin: {
                    description: 'Emoji atau simbol, contoh: 🏫',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Teks Badge',
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