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
          <Reveal className="section-head">
            <span className="section-label">Dokumentasi</span>
            <h2>Momen & Kegiatan</h2>
            <p style={{ color: 'var(--gray)', marginTop: 10 }}>Klik foto untuk melihat lebih besar.</p>
          </Reveal>
          {galeri.length > 0 ? (
            <GalleryGrid items={galeri.map((g) => ({ caption: g.caption, imageUrl: g.imageUrl }))} />
          ) : (
            <Reveal className="center">
              <p style={{ color: 'var(--gray)' }}>
                Belum ada foto. Tambahkan melalui menu Galeri di admin panel.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
