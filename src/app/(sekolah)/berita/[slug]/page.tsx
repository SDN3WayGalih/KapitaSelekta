import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  QuoteIcon,
  SchoolIcon,
  TagIcon,
  UserIcon,
} from '@/components/sekolah/Icons'
import { Reveal, ShareButton } from '@/components/sekolah/Interactive'
import {
  getAllBeritaSlugs,
  getBeritaBySlug,
  getBeritaTerkait,
  getProfilSekolah,
} from '@/utilities/sekolahData'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllBeritaSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const detail = await getBeritaBySlug(decodedSlug)

  if (!detail) {
    return {
      title: 'Berita Tidak Ditemukan',
    }
  }

  return {
    title: detail.title,
    description: detail.excerpt,
    openGraph: {
      title: `${detail.title} | SDN 3 Way Galih`,
      description: detail.excerpt,
      type: 'article',
    },
  }
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const [detail, relatedNews, profil] = await Promise.all([
    getBeritaBySlug(decodedSlug),
    getBeritaTerkait(decodedSlug, 3),
    getProfilSekolah(),
  ])

  if (!detail) {
    notFound()
  }

  const phone = profil?.topbarPhone ?? '(0721) 123456'
  const email = profil?.topbarEmail ?? 'info@sdn3waygalih.sch.id'

  return (
    <>
      {/* Hero Header & Breadcrumb */}
      <section className="page-hero article-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/berita">Berita & Kegiatan</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{detail.categoryLabel}</span>
          </nav>

          <div className="article-hero-meta-top">
            <span className={`news-cat ${detail.thumbClass}`}>{detail.categoryLabel}</span>
            <span className="article-read-badge">
              <ClockIcon size={14} />
              <span>{detail.readTime}</span>
            </span>
          </div>

          <h1 className="article-hero-title">{detail.title}</h1>

          <div className="article-hero-meta-bottom">
            <div className="meta-pill">
              <CalendarIcon size={16} />
              <span>{detail.date}</span>
            </div>
            <div className="meta-pill">
              <UserIcon size={16} />
              <span>{detail.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content & Sidebar */}
      <section className="section article-section">
        <div className="container article-layout">
          {/* Kolom Utama Artikel */}
          <article className="article-content-wrapper">
            {/* Visual Header Banner */}
            <div className={`article-visual-card ${detail.thumbClass}`}>
              <div className="article-visual-overlay">
                <SchoolIcon size={64} className="article-visual-icon" />
                <span className="article-visual-badge">Publikasi Resmi SDN 3 Way Galih</span>
              </div>
            </div>

            {/* Paragraf Lead / Ringkasan */}
            {detail.excerpt && (
              <div className="article-lead">
                <p>{detail.excerpt}</p>
              </div>
            )}

            {/* Paragraf Utama */}
            <div className="article-prose">
              {detail.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {/* Kutipan Narasumber */}
              {detail.quote && (
                <blockquote className="article-quote-box">
                  <QuoteIcon size={32} className="article-quote-icon" />
                  <p className="article-quote-text">"{detail.quote.text}"</p>
                  <cite className="article-quote-source">{detail.quote.source}</cite>
                </blockquote>
              )}

              {/* Subheading Sections */}
              {detail.subheadings &&
                detail.subheadings.map((sub, idx) => (
                  <section key={idx} className="article-sub-block">
                    <h2>{sub.title}</h2>
                    {sub.content.map((c, cIdx) => (
                      <p key={cIdx}>{c}</p>
                    ))}
                  </section>
                ))}

              {/* Poin-Poin Penting */}
              {detail.keyPoints && detail.keyPoints.length > 0 && (
                <div className="article-keypoints-box">
                  <h3>Poin Penting & Ketentuan:</h3>
                  <ul className="article-keypoints-list">
                    {detail.keyPoints.map((point, idx) => (
                      <li key={idx}>
                        <CheckIcon size={18} className="keypoint-check" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tags & Aksi Artikel */}
            <footer className="article-footer">
              <div className="article-tags-wrap">
                <span className="article-tags-label">
                  <TagIcon size={15} />
                  <span>Topik:</span>
                </span>
                <div className="article-tags-list">
                  {detail.tags.map((t, idx) => (
                    <span key={idx} className="article-tag-pill">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="article-actions-bar">
                <Link href="/berita" className="btn btn-outline-navy article-back-btn">
                  <ArrowLeftIcon size={16} />
                  <span>Kembali ke Berita</span>
                </Link>
                <ShareButton title={detail.title} />
              </div>
            </footer>
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Widget Berita Terkait / Lainnya */}
            <div className="sidebar-widget">
              <h3 className="sidebar-widget-title">Berita Lainnya</h3>
              <div className="sidebar-news-list">
                {relatedNews.map((rn) => (
                  <article key={rn.slug} className="sidebar-news-item">
                    <span className="sidebar-news-date">{rn.date}</span>
                    <h4 className="sidebar-news-heading">
                      <Link href={rn.slug ? `/berita/${rn.slug}` : '/berita'}>{rn.title}</Link>
                    </h4>
                    <span className="sidebar-news-cat">{rn.categoryLabel}</span>
                  </article>
                ))}
              </div>
              <Link href="/berita" className="sidebar-more-link">
                <span>Lihat Semua Berita</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            {/* Widget Banner PPDB */}
            <div className="sidebar-widget sidebar-ppdb-card">
              <span className="sidebar-ppdb-tag">Informasi PPDB</span>
              <h4>Penerimaan Peserta Didik Baru</h4>
              <p>SDN 3 Way Galih membuka pendaftaran calon siswa baru tahun ajaran 2026/2027.</p>
              <Link href="/ppdb" className="btn btn-gold btn-sm">
                Pelajari Alur PPDB
              </Link>
            </div>

            {/* Widget Kontak Cepat */}
            <div className="sidebar-widget sidebar-contact-card">
              <h3 className="sidebar-widget-title">Pusat Informasi</h3>
              <p className="sidebar-contact-desc">
                Memiliki pertanyaan seputar kegiatan atau berita sekolah? Hubungi kami:
              </p>
              <ul className="sidebar-contact-list">
                <li>
                  <PhoneIcon size={16} />
                  <span>{phone}</span>
                </li>
                <li>
                  <MailIcon size={16} />
                  <span>{email}</span>
                </li>
              </ul>
              <Link href="/kontak" className="sidebar-more-link" style={{ marginTop: '12px' }}>
                <span>Hubungi Sekolah</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Bagian Bawah: Rekomendasi 3 Berita Lainnya */}
      <section className="section article-bottom-section">
        <div className="container">
          <div className="section-head">
            <h2>Berita & Kegiatan Lainnya</h2>
          </div>

          <div className="news-grid">
            {relatedNews.map((n) => (
              <Reveal key={n.slug} className="news-card">
                <div className={`news-thumb ${n.thumbClass}`}>
                  <span className="news-cat">{n.categoryLabel}</span>
                </div>
                <div className="news-body">
                  <small>{n.date}</small>
                  <h3>{n.title}</h3>
                  {n.excerpt && <p className="news-excerpt">{n.excerpt}</p>}
                  <Link className="news-link" href={n.slug ? `/berita/${n.slug}` : '/berita'}>
                    <span>Baca Selengkapnya</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

