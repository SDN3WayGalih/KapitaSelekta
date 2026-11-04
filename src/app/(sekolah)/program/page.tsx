import type { Metadata } from 'next'
import React from 'react'

import { Reveal } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Program Sekolah' }

const PROGRAM = [
  {
    icon: '📖',
    title: 'Gerakan Literasi Sekolah',
    desc: 'Pembiasaan membaca 15 menit sebelum pembelajaran, pojok baca di setiap kelas, dan perpustakaan yang aktif menumbuhkan minat baca siswa.',
  },
  {
    icon: '🌳',
    title: 'Sekolah Adiwiyata',
    desc: 'Program penghijauan, bank sampah, dan kebiasaan hidup bersih untuk mewujudkan lingkungan sekolah yang asri dan sehat.',
  },
  {
    icon: '💻',
    title: 'Digitalisasi Pembelajaran',
    desc: 'Pemanfaatan media digital interaktif dan website sekolah sebagai sarana informasi serta publikasi kegiatan sekolah.',
  },
  {
    icon: '🧠',
    title: 'Pembinaan Karakter',
    desc: 'Shalat dhuha berjamaah, pembiasaan 5S (Senyum, Salam, Sapa, Sopan, Santun), dan kegiatan keagamaan rutin.',
  },
]

const EKSKUL = [
  { icon: '⛺', nama: 'Pramuka', jadwal: 'Setiap Jumat sore' },
  { icon: '⚽', nama: 'Futsal', jadwal: 'Setiap Rabu sore' },
  { icon: '🎤', nama: 'Seni Tari & Musik', jadwal: 'Setiap Kamis sore' },
  { icon: '🥇', nama: 'Pencak Silat', jadwal: 'Setiap Sabtu pagi' },
  { icon: '🗣️', nama: "Tahfidz Qur'an", jadwal: 'Setiap Selasa pagi' },
  { icon: '🎨', nama: 'Menggambar', jadwal: 'Setiap Senin sore' },
]

export default function ProgramPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Program Sekolah</h1>
          <p className="breadcrumb">
            <a href="/">Beranda</a> / Program Sekolah
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Unggulan</span>
            <h2>Program Prioritas</h2>
          </Reveal>
          <div className="program-grid reveal-group">
            {PROGRAM.map((p) => (
              <Reveal className="program-card" key={p.title}>
                <div className="program-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-label">Pengembangan Diri</span>
            <h2>Ekstrakurikuler</h2>
          </Reveal>
          <div className="ekskul-grid reveal-group">
            {EKSKUL.map((e) => (
              <Reveal className="ekskul-item" key={e.nama}>
                <span className="ekskul-icon">{e.icon}</span>
                <h4>{e.nama}</h4>
                <p>{e.jadwal}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
