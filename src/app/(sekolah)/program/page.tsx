import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import {
  ActivityIcon,
  AwardIcon,
  BookOpenIcon,
  CompassIcon,
  LeafIcon,
  MonitorIcon,
  MusicIcon,
  PaletteIcon,
  SparklesIcon,
} from '@/components/sekolah/Icons'
import { Reveal } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Program Sekolah' }

const PROGRAM = [
  {
    icon: <BookOpenIcon size={30} />,
    title: 'Gerakan Literasi Sekolah',
    desc: 'Pembiasaan membaca 15 menit sebelum pembelajaran, pojok baca di setiap kelas, dan perpustakaan aktif untuk menumbuhkan minat baca siswa.',
  },
  {
    icon: <LeafIcon size={30} />,
    title: 'Sekolah Adiwiyata',
    desc: 'Program penghijauan, bank sampah terpadu, dan pembiasaan hidup bersih untuk mewujudkan lingkungan belajar yang asri dan sehat.',
  },
  {
    icon: <MonitorIcon size={30} />,
    title: 'Digitalisasi Pembelajaran',
    desc: 'Pemanfaatan media pembelajaran interaktif berbasis komputer dan website resmi sebagai saluran informasi kegiatan peserta didik.',
  },
  {
    icon: <SparklesIcon size={30} />,
    title: 'Pembinaan Karakter & Religi',
    desc: 'Shalat dhuha berjamaah, pembiasaan 5S (Senyum, Salam, Sapa, Sopan, Santun), dan pendampingan budi pekerti sehari-hari.',
  },
]

const EKSKUL = [
  { icon: <CompassIcon size={26} />, nama: 'Pramuka', jadwal: 'Setiap Jumat sore' },
  { icon: <ActivityIcon size={26} />, nama: 'Futsal & Olahraga', jadwal: 'Setiap Rabu sore' },
  { icon: <MusicIcon size={26} />, nama: 'Seni Tari & Musik', jadwal: 'Setiap Kamis sore' },
  { icon: <AwardIcon size={26} />, nama: 'Pencak Silat', jadwal: 'Setiap Sabtu pagi' },
  { icon: <BookOpenIcon size={26} />, nama: "Tahfidz Qur'an", jadwal: 'Setiap Selasa pagi' },
  { icon: <PaletteIcon size={26} />, nama: 'Seni Rupa & Menggambar', jadwal: 'Setiap Senin sore' },
]

export default function ProgramPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Program & Kurikulum Sekolah</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / Program Sekolah
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Program Unggulan</h2>
          </div>
          <div className="program-grid reveal-group">
            {PROGRAM.map((p) => (
              <div className="program-card" key={p.title}>
                <div className="program-icon" aria-hidden="true">
                  {p.icon}
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Ekstrakurikuler</h2>
          </div>
          <div className="ekskul-grid reveal-group">
            {EKSKUL.map((e) => (
              <div className="ekskul-item" key={e.nama}>
                <span className="ekskul-icon" aria-hidden="true">
                  {e.icon}
                </span>
                <h4>{e.nama}</h4>
                <p>{e.jadwal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
