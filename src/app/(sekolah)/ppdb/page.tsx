import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { Accordion, Reveal } from '@/components/sekolah/Interactive'
import { getFaq, getPpdb } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'PPDB' }

const FALLBACK_STEPS = [
  ['1', 'Isi Formulir', 'Ambil formulir di sekolah atau unduh dari website ini.'],
  ['2', 'Serahkan Berkas', 'Serahkan formulir beserta dokumen persyaratan ke panitia PPDB.'],
  ['3', 'Verifikasi', 'Panitia memverifikasi kelengkapan berkas pendaftaran.'],
  ['4', 'Pengumuman', 'Hasil seleksi diumumkan di papan pengumuman dan website.'],
] as const

const FALLBACK_TIMELINE = [
  ['1 – 30 Jun', 'Pendaftaran', 'Pengisian formulir dan penyerahan berkas di sekolah.'],
  ['1 – 5 Jul', 'Verifikasi Berkas', 'Pemeriksaan kelengkapan dokumen oleh panitia.'],
  ['8 Jul', 'Pengumuman Hasil', 'Diumumkan di sekolah dan website resmi.'],
  ['9 – 12 Jul', 'Daftar Ulang', 'Konfirmasi ulang bagi calon siswa yang diterima.'],
] as const

const FALLBACK_SYARAT = [
  'Fotokopi Kartu Keluarga (KK) — 2 lembar',
  'Fotokopi Akta Kelahiran — 2 lembar',
  'Pas foto anak ukuran 3x4 — 2 lembar',
  'Usia minimal 6 tahun pada 1 Juli 2026',
  'Mengisi formulir pendaftaran yang telah disediakan',
]

export default async function PpdbPage() {
  const [ppdb, faqList] = await Promise.all([getPpdb(), getFaq('ppdb', 8)])

  const tahunAjaran = ppdb?.academicYear ?? '2026/2027'
  const steps = ppdb?.steps?.length
    ? ppdb.steps.map((s, i) => [String(i + 1), s.title, s.description] as const)
    : FALLBACK_STEPS
  const timeline = ppdb?.timeline?.length
    ? ppdb.timeline.map((t) => [t.date, t.title, t.description] as const)
    : FALLBACK_TIMELINE
  const syarat = ppdb?.requirements?.length ? ppdb.requirements : FALLBACK_SYARAT
  const faq = faqList.length
    ? faqList
    : [
        {
          answer: 'Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2026, langsung di sekolah atau melalui formulir online.',
          question: 'Kapan pendaftaran PPDB 2026/2027 dibuka?',
        },
        {
          answer: 'Fotokopi Kartu Keluarga, fotokopi Akta Kelahiran, pas foto 3x4 (2 lembar), dan formulir pendaftaran.',
          question: 'Apa saja syarat pendaftaran?',
        },
        {
          answer: 'Tidak ada. Seluruh proses pendaftaran di SDN 3 Way Galih gratis.',
          question: 'Apakah ada biaya pendaftaran?',
        },
        {
          answer: 'Usia minimal 6 tahun pada tanggal 1 Juli 2026, dibuktikan dengan Akta Kelahiran.',
          question: 'Berapa usia minimal calon siswa kelas 1?',
        },
      ]

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>PPDB {tahunAjaran}</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / PPDB
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Pendaftaran</span>
            <h2>Alur Pendaftaran</h2>
          </Reveal>
          <div className="steps reveal-group">
            {steps.map(([num, judul, desc]) => (
              <Reveal className="step-item" key={judul}>
                <div className="step-num">{num}</div>
                <h4>{judul}</h4>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Jadwal</span>
            <h2>Timeline PPDB</h2>
          </Reveal>
          <div className="timeline reveal-group">
            {timeline.map(([tgl, judul, desc]) => (
              <Reveal className="timeline-item" key={judul}>
                <div className="timeline-date">{tgl}</div>
                <div>
                  <h4>{judul}</h4>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Persyaratan</span>
            <h2>Syarat Pendaftaran</h2>
          </Reveal>
          <ul className="syarat-list reveal-group">
            {syarat.map((s) => (
              <Reveal as="li" key={s}>
                {s}
              </Reveal>
            ))}
          </ul>
          <Reveal className="center">
            <div style={{ marginTop: 40 }}>
              <a className="btn btn-gold btn-lg" href="#">
                Unduh Formulir Pendaftaran
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container faq-inner">
          <Reveal className="section-head">
            <span className="section-label">Tanya Jawab</span>
            <h2>FAQ PPDB</h2>
          </Reveal>
          <Accordion items={faq} />
        </div>
      </section>
    </>
  )
}