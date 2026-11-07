import Link from 'next/link'
import React from 'react'

import { Accordion, Counter, GalleryGrid, NewsTabs, Reveal } from '@/components/sekolah/Interactive'
import type { NewsItem } from '@/components/sekolah/Interactive'
import {
  AcademicCapIcon,
  ArrowRightIcon,
  AwardIcon,
  LeafIcon,
  SchoolIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
} from '@/components/sekolah/Icons'
import {
  getAgenda,
  getBerita,
  getFaq,
  getGaleri,
  getProfilSekolah,
  getTestimoni,
} from '@/utilities/sekolahData'

/* Icon mapping untuk badge keunggulan tanpa emoji */
function renderBadgeIcon(label: string) {
  const lower = label.toLowerCase()
  if (lower.includes('akreditasi') || lower.includes('prestasi')) return <AwardIcon size={28} />
  if (lower.includes('penggerak') || lower.includes('gedung') || lower.includes('sekolah')) return <SchoolIcon size={28} />
  if (lower.includes('bullying') || lower.includes('aman') || lower.includes('ramah')) return <ShieldCheckIcon size={28} />
  if (lower.includes('guru') || lower.includes('sertifikasi') || lower.includes('didik')) return <AcademicCapIcon size={28} />
  if (lower.includes('asri') || lower.includes('lingkungan') || lower.includes('adiwiyata')) return <LeafIcon size={28} />
  return <SparklesIcon size={28} />
}

const FALLBACK_BADGES = [
  { label: 'Akreditasi A' },
  { label: 'Sekolah Penggerak' },
  { label: 'Bebas Bullying' },
  { label: 'Guru Bersertifikasi' },
  { label: 'Lingkungan Asri' },
]

const FALLBACK_NEWS: NewsItem[] = [
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
]

const FALLBACK_GALLERY = [
  'Kegiatan Belajar Mengajar',
  'Upacara Bendera',
  'Kegiatan Pramuka',
  'Lomba 17 Agustus',
  'Pentas Seni Siswa',
  'Wisuda Kelas 6',
]

const FALLBACK_FAQ = [
  {
    answer:
      'Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2026. Pendaftaran dapat dilakukan langsung di sekolah atau melalui formulir online yang tersedia di website ini.',
    question: 'Kapan pendaftaran PPDB 2026/2027 dibuka?',
  },
  {
    answer:
      'Fotokopi Kartu Keluarga, fotokopi Akta Kelahiran, pas foto anak ukuran 3x4 (2 lembar), dan mengisi formulir pendaftaran yang telah disediakan.',
    question: 'Apa saja syarat pendaftaran?',
  },
  {
    answer: 'Tidak ada. Seluruh proses pendaftaran peserta didik baru di SDN 3 Way Galih gratis.',
    question: 'Apakah ada biaya pendaftaran?',
  },
  {
    answer: 'Usia minimal 6 tahun pada tanggal 1 Juli 2026, dibuktikan dengan Akta Kelahiran.',
    question: 'Berapa usia minimal calon siswa kelas 1?',
  },
]

const FALLBACK_AGENDA = [
  { date: '10', detail: 'Seluruh kelas 1–6 • 07.30 WIB', month: 'Okt', title: 'Ujian Tengah Semester Ganjil' },
  { date: '28', detail: 'Lapangan sekolah • 07.00 WIB', month: 'Okt', title: 'Upacara Hari Sumpah Pemuda' },
  { date: '15', detail: 'Aula sekolah • 08.00 WIB', month: 'Nov', title: 'Lomba Mewarnai Tingkat SD se-Kecamatan' },
]

const FALLBACK_STAT = [
  { label: 'Siswa Aktif', suffix: '+', value: 300 },
  { label: 'Guru & Tendik', suffix: '+', value: 25 },
  { label: 'Rombongan Belajar', value: 12 },
  { label: 'Prestasi Diraih', suffix: '+', value: 50 },
]

const FALLBACK_TESTI = [
  { name: 'Ibu Ratna', quote: 'Guru-gurunya ramah dan perhatian. Anak saya jadi semangat berangkat sekolah setiap pagi.', relation: 'Wali murid kelas 3' },
  { name: 'Bapak Hendra', quote: 'Fasilitasnya lengkap dan lingkungannya aman. Informasi sekolah juga mudah diakses lewat website ini.', relation: 'Wali murid kelas 5' },
]

export default async function BerandaPage() {
  const [profil, news, galeri, faqList, agendaList, testiList] = await Promise.all([
    getProfilSekolah(),
    getBerita(6),
    getGaleri(6),
    getFaq('ppdb', 6),
    getAgenda(3),
    getTestimoni(2),
  ])

  const badges = profil?.badgeItems?.length ? profil.badgeItems : FALLBACK_BADGES
  const newsItems = news.length ? news : FALLBACK_NEWS
  const galleryItems = galeri.length
    ? galeri.map((g) => ({ caption: g.caption, imageUrl: g.imageUrl }))
    : FALLBACK_GALLERY
  const faq = faqList.length ? faqList : FALLBACK_FAQ
  const agenda = agendaList.length ? agendaList : FALLBACK_AGENDA
  const stats = profil?.statItems?.length ? profil.statItems : FALLBACK_STAT
  const testimoni = testiList.length ? testiList : FALLBACK_TESTI

  const heroBadge = profil?.heroBadge ?? 'Selamat Datang di Website Resmi'
  const heroTitle = profil?.heroTitle ?? 'SDN 3 Way Galih'
  const heroSubtitle = profil?.heroSubtitle ?? 'Mencetak Generasi Cerdas & Berkarakter'
  const heroDescription =
    profil?.heroDescription ??
    'Sekolah dasar negeri yang menghadirkan lingkungan belajar yang aman, menyenangkan, dan penuh prestasi untuk putra-putri Anda.'
  const sambutanQuote =
    profil?.sambutanQuote ??
    '"Assalamu\'alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi SDN 3 Way Galih. Website ini kami hadirkan sebagai sarana informasi, publikasi kegiatan, dan jembatan komunikasi antara sekolah dengan orang tua serta masyarakat. Mari bersama-sama memajukan pendidikan anak-anak kita."'
  const sambutanName = profil?.sambutanName ?? 'Drs. H. Nama Kepala Sekolah, M.Pd.'
  const sambutanTitle = profil?.sambutanTitle ?? 'Kepala SDN 3 Way Galih'

  return (
    <>
      <section className="hero" id="beranda">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-text">
            <Reveal as="span" className="hero-badge">
              <SparklesIcon size={16} />
              <span>{heroBadge}</span>
            </Reveal>
            <Reveal as="div">
              <h1>
                {heroTitle}
                <br />
                <span>{heroSubtitle}</span>
              </h1>
            </Reveal>
            <Reveal as="div">
              <p>{heroDescription}</p>
            </Reveal>
            <Reveal className="hero-cta">
              <Link className="btn btn-gold" href="/profil">
                <span>Jelajahi Profil</span>
                <ArrowRightIcon size={16} />
              </Link>
              <Link className="btn btn-outline-light" href="/ppdb">
                Info PPDB 2026
              </Link>
            </Reveal>
          </div>
          <Reveal className="hero-media">
            <div className="hero-photo-card">
              <div className="hero-photo-illustration">
                <SchoolIcon size={64} className="hero-ill-icon" />
                <span className="hero-photo-label">Gedung SDN 3 Way Galih</span>
              </div>
            </div>
            <div className="hero-card-float">
              <strong>300+</strong>
              <small>Siswa Aktif Terdaftar</small>
            </div>
          </Reveal>
        </div>
        <div className="hero-wave" />
      </section>

      <section className="badges" id="program">
        <div className="container badges-inner reveal-group">
          {badges.map((b) => (
            <Reveal className="badge-item" key={b.label}>
              <span className="badge-icon-box">
                {renderBadgeIcon(b.label)}
              </span>
              <p>{b.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sambutan section" id="profil">
        <div className="container sambutan-inner">
          <Reveal className="sambutan-photo">
            <div className="photo-circle" aria-label="Foto Kepala Sekolah">
              <UserIcon size={72} />
            </div>
          </Reveal>
          <Reveal className="sambutan-text">
            <span className="section-label">Kata Sambutan</span>
            <h2>Kepala Sekolah</h2>
            <blockquote>{sambutanQuote}</blockquote>
            <p className="sambutan-nama">
              <strong>{sambutanName}</strong>
              <small>{sambutanTitle}</small>
            </p>
            <Link className="btn btn-outline-navy" href="/profil">
              <span>Baca Profil Lengkap</span>
              <ArrowRightIcon size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="ppdb-banner" id="ppdb">
        <div className="container">
          <Reveal className="ppdb-card">
            <div className="ppdb-text">
              <span className="ppdb-tag">Tahun Ajaran 2026/2027</span>
              <h2>Penerimaan Peserta Didik Baru</h2>
              <p>Daftarkan putra-putri Anda sekarang. Kuota terbatas, pendaftaran gratis dan mudah.</p>
            </div>
            <Link className="btn btn-gold btn-lg" href="/ppdb">
              <span>Daftar Sekarang</span>
              <ArrowRightIcon size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="berita section" id="berita">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Informasi Terkini</span>
            <h2>Berita & Kegiatan</h2>
          </Reveal>
          <NewsTabs news={newsItems} />
        </div>
      </section>

      <section className="galeri section section-alt" id="galeri">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Dokumentasi</span>
            <h2>Galeri Sekolah</h2>
          </Reveal>
          <GalleryGrid items={galleryItems} />
        </div>
      </section>

      <section className="stats">
        <div className="container stats-inner reveal-group">
          {stats.map((s) => (
            <Reveal className="stat-item" key={s.label}>
              <strong>
                <Counter target={s.value} />
                {s.suffix ?? ''}
              </strong>
              <p>{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="container faq-inner">
          <Reveal className="section-head">
            <span className="section-label">Tanya Jawab</span>
            <h2>FAQ PPDB</h2>
          </Reveal>
          <Accordion items={faq} />
        </div>
      </section>

      <section className="agenda section section-alt" id="agenda">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Kalender Akademik</span>
            <h2>Agenda Sekolah</h2>
          </Reveal>
          <div className="agenda-list reveal-group">
            {agenda.map((a) => (
              <Reveal className="agenda-item" key={a.title}>
                <div className="agenda-date">
                  <strong>{a.date}</strong>
                  <span>{a.month}</span>
                </div>
                <div className="agenda-info">
                  <h3>{a.title}</h3>
                  <p>{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="testimoni section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Kata Mereka</span>
            <h2>Testimoni Wali Murid</h2>
          </Reveal>
          <div className="testi-grid reveal-group">
            {testimoni.map((t) => (
              <Reveal className="testi-card" key={t.name}>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-author">
                  <div className="testi-avatar" aria-hidden="true">
                    <UserIcon size={20} />
                  </div>
                  <p className="testi-name">
                    <strong>{t.name}</strong>
                    <small>{t.relation}</small>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
