import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ArrowRightIcon } from '@/components/sekolah/Icons'
import { NewsTabs, Reveal } from '@/components/sekolah/Interactive'
import { getBerita } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'Berita & Kegiatan' }

export default async function BeritaPage() {
  const news = await getBerita(24)
  const featured = news[0]
  const rest = news.slice(1)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Berita & Kegiatan</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / Berita & Kegiatan
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {featured && (
            <Reveal className="news-featured">
              <div className="news-featured-thumb">
                <span className="news-cat">{featured.categoryLabel}</span>
              </div>
              <div className="news-featured-body">
                <small>{featured.date}</small>
                <h3>{featured.title}</h3>
                <p>{featured.excerpt ?? 'Klik untuk membaca selengkapnya.'}</p>
                <Link className="news-link" href={featured.slug ? `/posts/${featured.slug}` : '#'}>
                  <span>Baca Selengkapnya</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </Reveal>
          )}

          {rest.length > 0 ? (
            <NewsTabs news={rest} />
          ) : (
            <Reveal className="center">
              <p style={{ color: 'var(--gray)' }}>
                Belum ada berita lainnya. Konten dapat ditambahkan melalui admin panel.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
