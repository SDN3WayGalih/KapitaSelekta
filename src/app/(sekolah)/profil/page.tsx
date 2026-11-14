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

const FALLBACK_SEJARAH = `SDN 3 Way Galih adalah sekolah dasar negeri yang berlokasi di Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan. Sejak berdiri, sekolah ini berkomitmen memberikan layanan pendidikan dasar yang berkualitas bagi masyarakat sekitar.\n\nDengan dukungan guru-guru bersertifikasi dan fasilitas yang terus ditingkatkan, SDN 3 Way Galih telah meluluskan ribuan siswa yang melanjutkan ke jenjang pendidikan yang lebih tinggi dengan bekal ilmu dan karakter yang kuat.`

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

