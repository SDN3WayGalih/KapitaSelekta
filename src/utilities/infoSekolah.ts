/**
 * Data identitas sekolah (sumber: halaman direktori sekolah). Dipakai sebagai nilai
 * awal profil, seed, dan cadangan halaman bila admin belum mengisi.
 *
 * Sengaja tidak dimasukkan: SK Operasional (tertulis "Perlu Update", tanggal 1910),
 * nomor telepon dan website (kosong di sumber).
 */
export type KelompokInfo = 'informasi' | 'legalitas' | 'sarana'

export type InfoSekolahItem = {
  label: string
  value: string
  kelompok: KelompokInfo
  catatan?: string
}

export const KELOMPOK_INFO: { key: KelompokInfo; judul: string }[] = [
  { key: 'informasi', judul: 'Informasi & Profil Sekolah' },
  { key: 'legalitas', judul: 'Legalitas & Perizinan' },
  { key: 'sarana', judul: 'Sarana & Fasilitas' },
]

export const INFO_SEKOLAH: InfoSekolahItem[] = [
  { label: 'Status & Jenjang', value: 'Negeri (SD)', kelompok: 'informasi' },
  { label: 'Nomor Pokok Sekolah (NPSN)', value: '10800130', kelompok: 'informasi' },
  { label: 'Akreditasi', value: 'Akreditasi B', kelompok: 'informasi' },
  { label: 'Naungan', value: 'Kementerian Pendidikan dan Kebudayaan', kelompok: 'informasi' },
  { label: 'Waktu Penyelenggaraan', value: 'Pagi/6 hari', kelompok: 'informasi' },
  { label: 'Kode Pos', value: '35361', kelompok: 'informasi' },
  { label: 'Alamat Email', value: 'puji.lestari971@yahoo.co.id', kelompok: 'informasi' },

  {
    label: 'SK Pendirian Sekolah',
    value: '82.2/023/PS/1978',
    kelompok: 'legalitas',
    catatan: 'Tanggal: 11 Maret 1978',
  },
  {
    label: 'SK Akreditasi',
    value: '26/BAS-LS/SK/XII/2006',
    kelompok: 'legalitas',
    catatan: 'Tanggal: 29 Desember 2006',
  },
  { label: 'Sertifikasi ISO', value: 'Belum Bersertifikat', kelompok: 'legalitas' },

  { label: 'Luas Tanah', value: '1.500 m²', kelompok: 'sarana' },
  { label: 'Akses Internet', value: 'Tidak Ada', kelompok: 'sarana' },
  { label: 'Sumber Listrik', value: 'PLN', kelompok: 'sarana' },
]

export const ALAMAT_SEKOLAH =
  'Dusun V.b, Desa Way Galih, Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Lampung'
