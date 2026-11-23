import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { Award, BookOpen, Clock, Landmark, School, Users, type LucideIcon } from 'lucide-react'

import { SchoolIcon } from '@/components/sekolah/Icons'
import { Reveal } from '@/components/sekolah/Interactive'
import { getProfilSekolah } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'Profil Sekolah' }

const INFO_ICONS: Record<string, LucideIcon> = {
  NPSN: School,
  Status: Landmark,
  Akreditasi: Award,
  Kurikulum: BookOpen,
  'Jumlah Rombel': Users,
  'Jam Belajar': Clock,
}

const FALLBACK_MISI = [
  'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan.',
  'Menanamkan nilai karakter dan akhlak mulia dalam setiap kegiatan.',
  'Mengembangkan potensi peserta didik melalui kegiatan ekstrakurikuler.',
  'Mewujudkan lingkungan sekolah yang bersih, hijau, dan sehat.',
  'Menjalin kemitraan yang harmonis dengan orang tua dan masyarakat.',
]

const FALLBACK_INFO = [
  { label: 'NPSN', value: '10801831' },
  { label: 'Status Sekolah', value: 'Negeri' },
  { label: 'Akreditasi', value: 'Peringkat A' },
  { label: 'Kurikulum', value: 'Kurikulum Merdeka' },
  { label: 'Jumlah Rombel', value: '12 Rombongan Belajar' },
  { label: 'Jam Pelayanan Belajar', value: 'Senin - Jumat, 07.00 - 12.30 WIB' },
]

const FALLBACK_STRUKTUR = [
  { jabatan: 'Pimpinan Lembaga', nama: 'Kepala Sekolah' },
  { jabatan: 'Bidang Kurikulum & Akademik', nama: 'Koordinator Kurikulum' },
  { jabatan: 'Administrasi & Data Pokok', nama: 'Tata Usaha' },
  { jabatan: 'Kemitraan & Perwakilan Wali Murid', nama: 'Komite Sekolah' },
]

const FALLBACK_VISI =
  'Terwujudnya peserta didik yang cerdas, berkarakter, berakhlak mulia, dan berwawasan lingkungan.'

const FALLBACK_SEJARAH = `UPTD SD Negeri 3 Way Galih merupakan salah satu lembaga pendidikan dasar yang berada di wilayah Desa Way Galih, Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Provinsi Lampung. Sekolah Dasar Negeri yang berlokasi di Dusun V.b, Desa Way Galih, Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Lampung, dengan NPSN 10800130 tercatat berdiri pada 11 Maret 1978 dengan nomor SK pendirian 82.2/023/PS/1978 di bawah pembinaan kementerian pendidikan dan pemerintah daerah. Pernah mewakili Kabupaten Lampung Selatan pada ajang Lomba UKS tingkat Provinsi Lampung.\n\nSekolah ini hadir sebagai salah satu bentuk komitmen dalam menyediakan layanan pendidikan dasar bagi masyarakat, khususnya dalam memberikan kesempatan kepada anak-anak untuk memperoleh pendidikan yang layak, berkualitas, dan berkarakter. Seiring dengan perkembangan zaman, UPTD SD Negeri 3 Way Galih terus berupaya meningkatkan mutu pendidikan, baik dari segi proses pembelajaran, pengembangan kompetensi pendidik dan tenaga kependidikan, penyediaan sarana dan prasarana, maupun pembentukan karakter peserta didik.\n\nDengan semangat kebersamaan dan gotong royong, sekolah terus berbenah dan berinovasi untuk menciptakan lingkungan belajar yang aman, nyaman, inklusif, dan menyenangkan. Pemanfaatan teknologi dalam pembelajaran juga menjadi bagian dari upaya sekolah untuk mengikuti perkembangan pendidikan di era digital. Hingga saat ini, UPTD SD Negeri 3 Way Galih terus berkomitmen menjadi lembaga pendidikan yang mampu mencetak generasi penerus bangsa yang beriman, berakhlak mulia, cerdas, kreatif, mandiri, serta memiliki karakter Profil Pelajar Pancasila.\n\n“Bersama Mewujudkan Pendidikan Bermutu dan Generasi Berprestasi.”`

export default async function ProfilPage() {
  const profil = await getProfilSekolah()

  const visi = profil?.visi ?? FALLBACK_VISI
  const misi = profil?.misi?.length ? profil.misi : FALLBACK_MISI
  const sejarah = profil?.sejarah ?? FALLBACK_SEJARAH
  const info = profil?.infoItems?.length ? profil.infoItems : FALLBACK_INFO
  const struktur = profil?.struktur?.length
    ? profil.struktur.map((s) => ({ jabatan: s.position, nama: s.name }))
    : FALLBACK_STRUKTUR

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Profil Sekolah</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / Profil Sekolah
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Visi dan Misi</h2>
          </div>
          <div className="vm-grid reveal-group">
            <div className="vm-card visi">
              <h3>Visi Sekolah</h3>
              <p>"{visi}"</p>
            </div>
            <div className="vm-card misi">
              <h3>Misi Sekolah</h3>
              <ol>
                {misi.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2>Sejarah Singkat</h2>
          </Reveal>
          <Reveal>
            <div style={{ maxWidth: 820, margin: '0 auto', color: '#4b5563', fontSize: 16 }}>
              {sejarah.split('\n\n').map((para) => (
                <p key={para.slice(0, 20)} style={{ marginBottom: 16 }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <div className="info-grid reveal-group">
            {info.map((i) => {
              const Icon = INFO_ICONS[i.label]
              return (
                <Reveal className="info-item" key={i.label}>
                  <span className="info-label">
                    {Icon && <Icon aria-hidden="true" size={16} strokeWidth={2} />}
                    <small>{i.label}</small>
                  </span>
                  <strong>{i.value}</strong>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Struktur Organisasi</h2>
          </div>
          <div className="org-grid reveal-group">
            {struktur.map((s) => (
              <div className="org-card" key={s.jabatan}>
                <div className="org-avatar" aria-hidden="true">
                  <SchoolIcon size={28} />
                </div>
                <strong>{s.nama}</strong>
                <small>{s.jabatan}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

