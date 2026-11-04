import type { Metadata } from 'next'
import React from 'react'

import { GalleryGrid, Reveal } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Galeri' }

const GALLERY = [
  'Kegiatan Belajar Mengajar',
  'Upacara Bendera',
  'Ekstrakurikuler Pramuka',
  'Lomba 17 Agustus',
  'Latihan Futsal',
  'Seni Tari Daerah',
  'Gerakan Literasi',
  'Kerja Bakti Sekolah',
  'Wisuda Kelas 6',
]

export default function GaleriPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Galeri Sekolah</h1>
          <p className="breadcrumb">
            <a href="/">Beranda</a> / Galeri
          </p>
        </div>
      </section>

      <section className="section gallery-page">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Dokumentasi</span>
            <h2>Momen & Kegiatan</h2>
            <p style={{ color: 'var(--gray)', marginTop: 10 }}>Klik foto untuk melihat lebih besar.</p>
          </Reveal>
          <GalleryGrid items={GALLERY} />
        </div>
      </section>
    </>
  )
}
