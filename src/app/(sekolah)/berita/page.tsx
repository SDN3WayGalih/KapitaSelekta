import type { Metadata } from 'next'
import React from 'react'

import { NewsTabs, Reveal } from '@/components/sekolah/Interactive'
import type { NewsItem } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Berita & Kegiatan' }

const FEATURED = {
  date: '20 September 2026',
  title: 'SDN 3 Way Galih Luncurkan Website Resmi Sekolah',
  excerpt:
    'Website ini menjadi sarana informasi, publikasi kegiatan, dan pemasaran sekolah kepada masyarakat. Guru dan admin dapat memposting berita dengan mudah melalui sistem CMS yang ramah pengguna.',
}

const NEWS: NewsItem[] = [
  {
    category: 'prestasi',
    categoryLabel: 'Prestasi',
    date: '12 Sep 2026',
    thumbClass: 'thumb-1',
    title: 'Siswa SDN 3 Way Galih Juara 1 Lomba Matematika Tingkat Kecamatan',
  },
  {
    category: 'berita',
    categoryLabel: 'Berita',
    date: '5 Sep 2026',
    thumbClass: 'thumb-2',
    title: 'Upacara Bendera Perdana Semester Ganjil Berjalan Khidmat',
  },
  {
    category: 'pengumuman',
    categoryLabel: 'Pengumuman',
    date: '28 Agu 2026',
    thumbClass: 'thumb-3',
    title: 'Jadwal PPDB Tahun Ajaran 2026/2027 Resmi Diumumkan',
  },
  {
    category: 'berita',
    categoryLabel: 'Berita',
    date: '17 Agu 2026',
    thumbClass: 'thumb-1',
    title: 'Semarak Lomba 17 Agustus: Merdeka Belajar, Merdeka Berkreasi',
  },
  {
    category: 'prestasi',
    categoryLabel: 'Prestasi',
    date: '8 Agu 2026',
    thumbClass: 'thumb-2',
    title: 'Tim Futsal Sekolah Melaju ke Final Turnamen Antar-SD',
  },
  {
    category: 'pengumuman',
    categoryLabel: 'Pengumuman',
    date: '1 Agu 2026',
    thumbClass: 'thumb-3',
    title: 'Pembagian Rapor Semester Genap & Libur Kenaikan Kelas',
  },
]

export default function BeritaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Berita & Kegiatan</h1>
          <p className="breadcrumb">
            <a href="/">Beranda</a> / Berita & Kegiatan
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="news-featured">
            <div className="news-featured-thumb">
              <span className="news-cat">Berita Utama</span>
            </div>
            <div className="news-featured-body">
              <small>{FEATURED.date}</small>
              <h3>{FEATURED.title}</h3>
              <p>{FEATURED.excerpt}</p>
              <a className="news-link" href="#">
                Baca Selengkapnya &rarr;
              </a>
            </div>
          </Reveal>

          <NewsTabs news={NEWS} />
        </div>
      </section>
    </>
  )
}
