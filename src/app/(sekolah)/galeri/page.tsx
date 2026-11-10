import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { GalleryGrid, Reveal } from '@/components/sekolah/Interactive'
import { getGaleri } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'Galeri' }

export default async function GaleriPage() {
  const galeri = await getGaleri(24)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Galeri Sekolah</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / Galeri
          </p>
        </div>
      </section>

      <section className="section gallery-page">
        <div className="container">
          <div className="section-head">
            <h2>Dokumentasi Kegiatan Siswa</h2>
            <p style={{ color: 'var(--gray)', marginTop: 8 }}>Dokumentasi aktivitas pembelajaran, ekstrakurikuler, dan acara sekolah.</p>
          </div>
          {galeri.length > 0 ? (
            <GalleryGrid items={galeri.map((g) => ({ caption: g.caption, imageUrl: g.imageUrl }))} />
          ) : (
            <div className="center">
              <p style={{ color: 'var(--gray)' }}>
                Belum ada foto. Tambahkan melalui menu Galeri di admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
