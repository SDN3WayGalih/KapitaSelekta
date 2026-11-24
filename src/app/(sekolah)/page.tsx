import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { Award, BadgeCheck, Leaf, Rocket, ShieldCheck, Star } from 'lucide-react'

import { SchoolIcon, UserIcon } from '@/components/sekolah/Icons'
import {
  GalleryGrid,
  NewsItem,
  NewsTabs,
  SambutanRingkas,
} from '@/components/sekolah/Interactive'
import {
  getAgenda,
  getBerita,
  getGaleri,
  getProfilSekolah,
} from '@/utilities/sekolahData'

export const metadata: Metadata = {
  title: 'Beranda | SDN 3 Way Galih',
}

// Perubahan dari admin langsung me-revalidate halaman ini (lihat hooks/revalidateSekolah.ts).
// Render ulang per jam tetap perlu agar agenda yang tanggalnya sudah lewat ikut turun.
export const revalidate = 3600

/** Ikon lencana dipilih dari kata kunci di teks, sehingga admin cukup menulis teksnya. */
function renderBadgeIcon(label: string) {
  const t = label.toLowerCase()
  const has = (...kata: string[]) => kata.some((k) => t.includes(k))
  const props = { 'aria-hidden': true, size: 26, strokeWidth: 1.9 } as const
  if (has('akreditasi', 'unggul', 'prestasi', 'juara')) return <Award {...props} />
  if (has('penggerak', 'inovasi', 'merdeka')) return <Rocket {...props} />
  if (has('bullying', 'perundungan', 'aman', 'ramah')) return <ShieldCheck {...props} />
  if (has('guru', 'sertifikasi', 'didik', 'tenaga')) return <BadgeCheck {...props} />
  if (has('asri', 'lingkungan', 'adiwiyata', 'hijau')) return <Leaf {...props} />
  return <Star {...props} />
}

const FALLBACK_BADGES = [
  { label: 'Akreditasi A' },
  { label: 'Sekolah Penggerak' },
  { label: 'Bebas Perundungan' },
  { label: 'Guru Bersertifikasi' },
  { label: 'Lingkungan Asri' },
]

const FALLBACK_NEWS: NewsItem[] = [
  {
    category: 'berita',
    categoryLabel: 'Berita',
    date: '20 Sep 2026',
    excerpt: 'Website resmi sekolah kini hadir sebagai sarana informasi dan publikasi kegiatan.',
    slug: 'website-resmi-sekolah',
    thumbClass: 'thumb-1',
    title: 'SDN 3 Way Galih Luncurkan Website Resmi Sekolah',
  },
  {
    category: 'prestasi',
    categoryLabel: 'Prestasi',
    date: '12 Sep 2026',
    excerpt: 'Siswa kelas 5 berhasil meraih juara pertama pada lomba matematika tingkat kecamatan.',
    slug: 'juara-1-lomba-matematika',
    thumbClass: 'thumb-2',
    title: 'Siswa SDN 3 Way Galih Juara 1 Lomba Matematika Tingkat Kecamatan',
  },
  {
    category: 'berita',
    categoryLabel: 'Berita',
    date: '5 Sep 2026',
    excerpt: 'Upacara bendera perdana semester ganjil berlangsung khidmat di lapangan sekolah.',
    slug: 'upacara-bendera-perdana',
    thumbClass: 'thumb-3',
    title: 'Upacara Bendera Perdana Semester Ganjil Berjalan Khidmat',
  },
  {
    category: 'pengumuman',
    categoryLabel: 'Pengumuman',
    date: '28 Agu 2026',
    excerpt: 'Jadwal resmi penerimaan peserta didik baru tahun ajaran 2026/2027 telah diumumkan.',
    slug: 'jadwal-ppdb-diumumkan',
    thumbClass: 'thumb-1',
    title: 'Jadwal PPDB Tahun Ajaran 2026/2027 Resmi Diumumkan',
  },
  {
    category: 'berita',
    categoryLabel: 'Berita',
    date: '17 Agu 2026',
    excerpt: 'Berbagai lomba memeriahkan peringatan HUT Kemerdekaan RI di lingkungan sekolah.',
    slug: 'semarak-lomba-17-agustus',
    thumbClass: 'thumb-2',
    title: 'Semarak Lomba 17 Agustus: Merdeka Belajar, Merdeka Berkreasi',
  },
  {
    category: 'prestasi',
    categoryLabel: 'Prestasi',
    date: '8 Agu 2026',
    excerpt: 'Tim futsal sekolah berhasil melaju ke babak final turnamen antar-SD.',
    slug: 'tim-futsal-melaju-final',
    thumbClass: 'thumb-3',
    title: 'Tim Futsal Sekolah Melaju ke Final Turnamen Antar-SD',
  },
]

const FALLBACK_GALLERY = [
  'Kegiatan Belajar Mengajar',
  'Upacara Bendera',
  'Kegiatan Pramuka',
  'Lomba 17 Agustus',
  'Pentas Seni Siswa',
  'Pramuka dan Pembiasaan Karakter',
]

const FALLBACK_AGENDA = [
  { date: '10', detail: 'Seluruh kelas 1-6, 07.30 WIB', month: 'Okt', title: 'Penilaian Tengah Semester Ganjil' },
  { date: '28', detail: 'Lapangan sekolah, 07.00 WIB', month: 'Okt', title: 'Upacara Hari Sumpah Pemuda' },
  { date: '15', detail: 'Aula sekolah, 08.00 WIB', month: 'Nov', title: 'Lomba Kreativitas dan Seni Siswa' },
]

export default async function BerandaPage() {
  const [profil, news, galeri, agendaList] = await Promise.all([
    getProfilSekolah(),
    getBerita(6),
    getGaleri(6),
    getAgenda(3),
  ])

  const badges = profil?.badgeItems?.length ? profil.badgeItems : FALLBACK_BADGES
  const newsItems = news.length ? news : FALLBACK_NEWS
  const galleryItems = galeri.length
    ? galeri.map((g) => ({ caption: g.caption, imageUrl: g.imageUrl, thumbUrl: g.thumbUrl }))
    : FALLBACK_GALLERY
  const agenda = agendaList.length ? agendaList : FALLBACK_AGENDA

  const heroTitle = profil?.heroTitle ?? 'SDN 3 Way Galih'
  const heroSubtitle = 'Sekolah Dasar Negeri Tanjung Bintang'
  const heroDescription =
    profil?.heroDescription ??
    'Mewujudkan lingkungan pendidikan dasar yang aman, disiplin, berakhlak mulia, dan berorientasi pada perkembangan karakter serta potensi setiap peserta didik.'
  const sambutanQuote =
    profil?.sambutanQuote ??
    '"Assalamu\'alaikum warahmatullahi wabarakatuh. Selamat datang di portal resmi SDN 3 Way Galih. Website ini kami hadirkan sebagai sarana informasi resmi seputar kegiatan akademik, program kesiswaan, tata tertib, dan alur penerimaan peserta didik baru bagi seluruh orang tua dan masyarakat."'
  const sambutanName = profil?.sambutanName ?? 'Kepala Sekolah'
  const sambutanTitle = profil?.sambutanTitle ?? 'SDN 3 Way Galih, Tanjung Bintang'

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="beranda">
        <div
          className={`hero-bg${profil?.heroImageUrl ? ' has-photo' : ''}`}
          style={profil?.heroImageUrl ? ({ '--hero-photo': `url("${profil.heroImageUrl}")` } as React.CSSProperties) : undefined}
        />
        <div className={`container hero-inner${profil?.heroImageUrl ? ' hero-inner-solo' : ''}`}>
          <div className="hero-text">
            <h1 className="hero-heading">
              {heroTitle}
              <span className="hero-sub">{heroSubtitle}</span>
            </h1>
            <p className="hero-desc">{heroDescription}</p>
            <div className="hero-cta">
              <Link className="btn btn-gold" href="/profil">
                Profil Sekolah
              </Link>
              <Link className="btn btn-outline-light" href="https://sd.spmblampung.com" target="_blank" rel="noopener noreferrer">
                Informasi PPDB 2026/2027
              </Link>
            </div>
          </div>
          {!profil?.heroImageUrl && (
            <div className="hero-media">
              <div className="hero-photo-card">
                <div className="hero-photo-illustration">
                  <SchoolIcon size={64} className="hero-ill-icon" />
                  <span className="hero-photo-label">SDN 3 Way Galih</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Badges / Keunggulan Pokok */}
      <section className="badges" id="program">
        <div className="container badges-inner reveal-group">
          {badges.map((b) => (
            <div className="badge-item" key={b.label}>
              <span className="badge-icon-box">
                {renderBadgeIcon(b.label)}
              </span>
              <p>{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="sambutan section" id="profil">
        <div className="container sambutan-inner">
          <div className="sambutan-photo">
            {profil?.sambutanPhotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="photo-circle photo-circle-img" src={profil.sambutanPhotoUrl} alt={`Foto ${sambutanName}`} />
            ) : (
              <div className="photo-circle" aria-label="Kepala Sekolah">
                <SchoolIcon size={56} />
              </div>
            )}
          </div>
          <div className="sambutan-text">
            <h2>Sambutan Kepala Sekolah</h2>
            <SambutanRingkas text={sambutanQuote} />
            <p className="sambutan-nama">
              <strong>{sambutanName}</strong>
              <small>{sambutanTitle}</small>
            </p>
            <div>
              <Link className="btn btn-outline-navy" href="/profil">
                Profil Lengkap Sekolah
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Informasi PPDB */}
      <section className="ppdb-banner" id="ppdb">
        <div className="container">
          <div className="ppdb-card">
            <div className="ppdb-text">
              <span className="ppdb-tag">Tahun Ajaran 2026/2027</span>
              <h2>Penerimaan Peserta Didik Baru (PPDB)</h2>
              <p>Informasi jadwal tahapan, persyaratan administrasi, dan alur pendaftaran siswa baru.</p>
            </div>
            <Link className="btn btn-gold btn-lg" href="https://sd.spmblampung.com" target="_blank" rel="noopener noreferrer">
              Pelajari Alur PPDB
            </Link>
          </div>
        </div>
      </section>

      {/* Berita & Kegiatan */}
      <section className="berita section" id="berita">
        <div className="container">
          <div className="section-head">
            <h2>Berita & Kegiatan Sekolah</h2>
            <p className="section-subtitle">Informasi seputar aktivitas belajar, prestasi lomba, dan pengumuman sekolah.</p>
          </div>
          <NewsTabs news={newsItems} />
        </div>
      </section>

      {/* Agenda Sekolah */}
      <section className="agenda section" id="agenda">
        <div className="container">
          <div className="section-head">
            <h2>Agenda Kegiatan Sekolah</h2>
            <p className="section-subtitle">Jadwal kegiatan akademik dan agenda penting mendatang.</p>
          </div>
          <div className="agenda-list reveal-group">
            {agenda.map((a) => (
              <div className="agenda-item" key={a.title}>
                <div className="agenda-date">
                  <strong>{a.date}</strong>
                  <span>{a.month}</span>
                </div>
                <div className="agenda-info">
                  <h3>{a.title}</h3>
                  <p>{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dokumentasi Galeri */}
      <section className="galeri section" id="galeri">
        <div className="container">
          <div className="section-head">
            <h2>Dokumentasi Sekolah</h2>
            <p className="section-subtitle">Galeri foto kegiatan belajar mengajar dan ekstrakurikuler.</p>
          </div>
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  )
}
