import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { CheckIcon } from '@/components/sekolah/Icons'
import { Accordion, Reveal } from '@/components/sekolah/Interactive'
import { getFaq, getPpdb } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'PPDB' }

const FALLBACK_STEPS = [
  ['1', 'Pengambilan Formulir', 'Formulir pendaftaran dapat diambil langsung di sekretariat panitia PPDB sekolah pada jam pelayanan.'],
  ['2', 'Penyerahan Dokumen', 'Serahkan formulir yang telah diisi beserta berkas persyaratan administrasi ke panitia PPDB.'],
  ['3', 'Verifikasi Data', 'Panitia memverifikasi keabsahan data kependudukan dan usia calon peserta didik.'],
  ['4', 'Pengumuman & Daftar Ulang', 'Hasil seleksi diumumkan secara terbuka di papan pengumuman sekolah dan portal resmi.'],
] as const

const FALLBACK_TIMELINE = [
  ['1 - 30 Jun', 'Pendaftaran', 'Pengambilan formulir dan penyerahan berkas di loket PPDB sekolah.'],
  ['1 - 5 Jul', 'Verifikasi Berkas', 'Pemeriksaan kelengkapan dokumen administratif oleh panitia.'],
  ['8 Jul', 'Pengumuman Hasil', 'Diumumkan secara terbuka di sekolah dan website resmi.'],
  ['9 - 12 Jul', 'Daftar Ulang', 'Konfirmasi ulang berkas bagi calon peserta didik yang diterima.'],
] as const

const FALLBACK_SYARAT = [
  'Fotokopi Kartu Keluarga (KK), 2 lembar',
  'Fotokopi Akta Kelahiran, 2 lembar',
  'Pas foto calon siswa ukuran 3x4 (2 lembar)',
  'Usia minimal 6 tahun pada tanggal 1 Juli 2026',
  'Mengisi formulir pendaftaran yang disediakan panitia di sekolah',
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
          answer: 'Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2026 langsung di sekretariat sekolah.',
          question: 'Kapan pendaftaran PPDB 2026/2027 dibuka?',
        },
        {
          answer: 'Fotokopi Kartu Keluarga, fotokopi Akta Kelahiran, pas foto 3x4 (2 lembar), dan formulir pendaftaran.',
          question: 'Apa saja syarat pendaftaran?',
        },
        {
          answer: 'Tidak ada. Seluruh proses pendaftaran di SDN 3 Way Galih gratis tanpa dipungut biaya apapun.',
          question: 'Apakah ada biaya pendaftaran?',
        },
        {
          answer: 'Usia minimal 6 tahun pada tanggal 1 Juli 2026, dibuktikan dengan Akta Kelahiran resmi.',
          question: 'Berapa usia minimal calon siswa kelas 1?',
        },
      ]

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Penerimaan Peserta Didik Baru (PPDB) {tahunAjaran}</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / PPDB
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Tahapan Pendaftaran</h2>
          </div>
          <div className="steps reveal-group">
            {steps.map(([num, judul, desc]) => (
              <div className="step-item" key={judul}>
                <div className="step-num">{num}</div>
                <h4>{judul}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Jadwal Pelaksanaan PPDB</h2>
          </div>
          <div className="timeline reveal-group">
            {timeline.map(([tgl, judul, desc]) => (
              <div className="timeline-item" key={judul}>
                <div className="timeline-date">{tgl}</div>
                <div>
                  <h4>{judul}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Syarat Pendaftaran</h2>
          </div>
          <ul className="syarat-list reveal-group">
            {syarat.map((s) => (
              <li key={s}>
                <span className="syarat-icon" aria-hidden="true">
                  <CheckIcon size={18} />
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="center" style={{ marginTop: 36 }}>
            <div className="ppdb-help-card">
              <p>Formulir pendaftaran dan informasi detail dapat diperoleh langsung di kantor sekolah pada jam kerja.</p>
              <Link className="btn btn-gold btn-lg" href="/kontak">
                Hubungi Panitia PPDB
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-inner">
          <div className="section-head">
            <h2>Tanya Jawab PPDB</h2>
          </div>
          <Accordion items={faq} />
        </div>
      </section>
    </>
  )
}

