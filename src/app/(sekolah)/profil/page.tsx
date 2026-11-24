import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { Award, BookOpen, Clock, Landmark, School, Users, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/sekolah/Interactive'
import { DUMMY_PROFIL_SEKOLAH } from '@/utilities/sekolahData'
import {
  DirektoriGuru,
  FotoPegawai,
  KartuPegawaiItem,
  type KartuPegawai,
} from '@/components/sekolah/DirektoriGuru'
import { getProfilSekolah } from '@/utilities/sekolahData'

export const metadata: Metadata = { title: 'Profil Sekolah' }

const INFO_ICONS: Record<string, LucideIcon> = {
  NPSN: School,
  Status: Landmark,
  Akreditasi: Award,
  Kurikulum: BookOpen,
  'Jumlah Rombel': Users,
  'Jam Belajar': Clock,
}

const FALLBACK_MISI = [
  'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan.',
  'Menanamkan nilai karakter dan akhlak mulia dalam setiap kegiatan.',
  'Mengembangkan potensi peserta didik melalui kegiatan ekstrakurikuler.',
  'Mewujudkan lingkungan sekolah yang bersih, hijau, dan sehat.',
  'Menjalin kemitraan yang harmonis dengan orang tua dan masyarakat.',
]

const FALLBACK_INFO = [
  { label: 'NPSN', value: '10801831' },
  { label: 'Status Sekolah', value: 'Negeri' },
  { label: 'Akreditasi', value: 'Peringkat A' },
  { label: 'Kurikulum', value: 'Kurikulum Merdeka' },
  { label: 'Jumlah Rombel', value: '12 Rombongan Belajar' },
  { label: 'Jam Pelayanan Belajar', value: 'Senin - Jumat, 07.00 - 12.30 WIB' },
]

const FALLBACK_STRUKTUR = [
  { jabatan: 'Kepala Sekolah', nama: 'Miftah Danuri Latif, S.Pd.I' },
  { jabatan: 'Komite Sekolah', nama: 'Joko Sopramono' },
  { jabatan: 'Bendahara Sekolah', nama: 'Yuli Hartati, S.Pd' },
  { jabatan: 'Operator Sekolah', nama: 'Baron Aji Wibowo, SE' },
  { jabatan: 'Penjaga Sekolah', nama: 'Elmiyati' },
  { jabatan: 'Guru', nama: 'Yuli Hartati, S.Pd' },
  { jabatan: 'Guru', nama: 'Puji Lestari, S.Pd' },
  { jabatan: 'Guru', nama: 'Sri Sugiyanti, S.Pd' },
  { jabatan: 'Guru', nama: 'Tefi Mustika Sari, S.Pd' },
  { jabatan: 'Guru', nama: 'Mariyatun, S.Pd' },
  { jabatan: 'Guru', nama: 'Titi Rahmawati, S.Pd' },
  { jabatan: 'Guru', nama: 'Rita Gestari, S.Pd' },
  { jabatan: 'Guru', nama: 'Kiki Rezky Armania, S.Pd' },
  { jabatan: 'Guru', nama: 'Liling Cahyani, S.Pd' },
  { jabatan: 'Guru', nama: 'Susanto, S.Ag' },
  { jabatan: 'Guru', nama: 'Baron Aji Wibowo, SE' },
  { jabatan: 'Guru', nama: 'Wiwin Yusnita, S.Pd.I' },
  { jabatan: 'Guru', nama: 'Niken Azzahra, S.Pd' },
  { jabatan: 'Pelatih Pramuka', nama: 'Fadhel' },
  { jabatan: 'Pelatih Pramuka', nama: 'Femy' },
]

type AnggotaStruktur = { jabatan: string; nama: string; foto?: string | null }

/**
 * Mengelompokkan anggota ke posisi bagan berdasarkan teks jabatan,
 * sehingga admin cukup mengisi nama + jabatan di panel admin.
 */
function susunBagan(list: AnggotaStruktur[]) {
  // Satu orang bisa punya beberapa baris (mis. Bendahara + Guru); fotonya cukup di salah satu.
  const fotoPerNama = new Map<string, string>()
  for (const s of list) if (s.foto && !fotoPerNama.has(s.nama)) fotoPerNama.set(s.nama, s.foto)
  const lengkap = list.map((s) => ({ ...s, foto: s.foto ?? fotoPerNama.get(s.nama) ?? null }))

  const kepala = lengkap.find((s) => /kepala/i.test(s.jabatan))
  const komite = lengkap.filter((s) => /komite/i.test(s.jabatan))
  const pembina = lengkap.filter((s) => /pelatih|pembina/i.test(s.jabatan))
  const guru = lengkap.filter((s) => s !== kepala && /guru/i.test(s.jabatan))
  const staf = lengkap.filter(
    (s) => s !== kepala && !komite.includes(s) && !guru.includes(s) && !pembina.includes(s),
  )
  return { kepala, komite, guru, staf, pembina }
}

function KotakBagan({ anggota, jabatan, className = '' }: { anggota?: AnggotaStruktur; jabatan?: string; className?: string }) {
  return (
    <div className={`bagan-box ${className}`}>
      <div className="bagan-head">{jabatan ?? anggota?.jabatan}</div>
      {anggota && (
        <div className="bagan-body">
          {anggota.foto !== undefined && <FotoPegawai url={anggota.foto} nama={anggota.nama} className="bagan-foto" />}
          <span>{anggota.nama}</span>
        </div>
      )}
    </div>
  )
}

function BaganStruktur({ data }: { data: ReturnType<typeof susunBagan> }) {
  const { kepala, komite, guru, staf } = data
  return (
    <div className="bagan" role="group" aria-label="Bagan struktur organisasi sekolah">
      <div className="bagan-top">
        <div className="bagan-komite">
          {komite.map((k) => (
            <KotakBagan key={k.nama} anggota={k} />
          ))}
        </div>
        {kepala && <KotakBagan className="bagan-kepala" anggota={kepala} />}
        <div aria-hidden="true" />
      </div>

      <div className="bagan-mid">
        <div className="bagan-staf">
          {staf.map((s) => (
            <KotakBagan key={`${s.nama}-${s.jabatan}`} anggota={s} />
          ))}
        </div>
        <div className="bagan-spine" aria-hidden="true" />
        {guru.length > 0 && (
          <div className="bagan-box bagan-guru">
            <div className="bagan-head">Dewan Guru</div>
            <ul>
              {guru.map((g) => (
                <li key={g.nama}>{g.nama}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bagan-bottom">
        <KotakBagan className="bagan-siswa" jabatan="Peserta Didik" />
      </div>
    </div>
  )
}

/** Data kartu untuk direktori: guru beserta jabatan tambahannya, lalu tenaga kependidikan & pembina. */
function susunDirektori({ guru, staf, pembina }: ReturnType<typeof susunBagan>) {
  const namaGuru = new Set(guru.map((g) => g.nama))
  const kartuGuru: KartuPegawai[] = guru.map((g) => ({
    nama: g.nama,
    peran: g.jabatan,
    fotoUrl: g.foto,
    tambahan: staf.filter((s) => s.nama === g.nama).map((s) => s.jabatan),
  }))
  const kartuLain: KartuPegawai[] = [...staf.filter((s) => !namaGuru.has(s.nama)), ...pembina].map((s) => ({
    nama: s.nama,
    peran: s.jabatan,
    fotoUrl: s.foto,
  }))
  return { kartuGuru, kartuLain }
}

const FALLBACK_VISI =
  'Terwujudnya peserta didik yang cerdas, berkarakter, berakhlak mulia, dan berwawasan lingkungan.'

const FALLBACK_SEJARAH = `UPTD SD Negeri 3 Way Galih merupakan salah satu lembaga pendidikan dasar yang berada di wilayah Desa Way Galih, Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Provinsi Lampung. Sekolah Dasar Negeri yang berlokasi di Dusun V.b, Desa Way Galih, Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Lampung, dengan NPSN 10800130 tercatat berdiri pada 11 Maret 1978 dengan nomor SK pendirian 82.2/023/PS/1978 di bawah pembinaan kementerian pendidikan dan pemerintah daerah. Pernah mewakili Kabupaten Lampung Selatan pada ajang Lomba UKS tingkat Provinsi Lampung.\n\nSekolah ini hadir sebagai salah satu bentuk komitmen dalam menyediakan layanan pendidikan dasar bagi masyarakat, khususnya dalam memberikan kesempatan kepada anak-anak untuk memperoleh pendidikan yang layak, berkualitas, dan berkarakter. Seiring dengan perkembangan zaman, UPTD SD Negeri 3 Way Galih terus berupaya meningkatkan mutu pendidikan, baik dari segi proses pembelajaran, pengembangan kompetensi pendidik dan tenaga kependidikan, penyediaan sarana dan prasarana, maupun pembentukan karakter peserta didik.\n\nDengan semangat kebersamaan dan gotong royong, sekolah terus berbenah dan berinovasi untuk menciptakan lingkungan belajar yang aman, nyaman, inklusif, dan menyenangkan. Pemanfaatan teknologi dalam pembelajaran juga menjadi bagian dari upaya sekolah untuk mengikuti perkembangan pendidikan di era digital. Hingga saat ini, UPTD SD Negeri 3 Way Galih terus berkomitmen menjadi lembaga pendidikan yang mampu mencetak generasi penerus bangsa yang beriman, berakhlak mulia, cerdas, kreatif, mandiri, serta memiliki karakter Profil Pelajar Pancasila.\n\n“Bersama Mewujudkan Pendidikan Bermutu dan Generasi Berprestasi.”`

export default async function ProfilPage() {
  const profil = await getProfilSekolah()
  const hasCmsProfile = profil !== DUMMY_PROFIL_SEKOLAH

  const visi = profil?.visi ?? (hasCmsProfile ? '' : FALLBACK_VISI)
  const misi = profil?.misi?.length ? profil.misi : hasCmsProfile ? [] : FALLBACK_MISI
  const sejarah = profil?.sejarah ?? (hasCmsProfile ? '' : FALLBACK_SEJARAH)
  const info = profil?.infoItems?.length ? profil.infoItems : hasCmsProfile ? [] : FALLBACK_INFO
  const struktur = profil?.struktur?.length
    ? profil.struktur.map((s) => ({ jabatan: s.position, nama: s.name, foto: s.photoUrl ?? null }))
    : hasCmsProfile ? [] : FALLBACK_STRUKTUR
  const statistik = profil?.statItems ?? []
  const bagan = susunBagan(struktur)
  const { kartuGuru, kartuLain } = susunDirektori(bagan)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Profil Sekolah</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / Profil Sekolah
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Visi dan Misi</h2>
          </div>
          <div className="vm-grid reveal-group">
            <div className="vm-card visi">
              <h3>Visi Sekolah</h3>
              <p>"{visi}"</p>
            </div>
            <div className="vm-card misi">
              <h3>Misi Sekolah</h3>
              <ol>
                {misi.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2>Sejarah Singkat</h2>
          </Reveal>
          <Reveal>
            <div style={{ maxWidth: 820, margin: '0 auto', color: '#4b5563', fontSize: 16 }}>
              {sejarah.split('\n\n').map((para) => (
                <p key={para.slice(0, 20)} style={{ marginBottom: 16 }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <div className="info-grid reveal-group">
            {info.map((i) => {
              const Icon = INFO_ICONS[i.label]
              return (
                <Reveal className="info-item" key={i.label}>
                  <span className="info-label">
                    {Icon && <Icon aria-hidden="true" size={16} strokeWidth={2} />}
                    <small>{i.label}</small>
                  </span>
                  <strong>{i.value}</strong>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {statistik.length > 0 && (
        <section className="section" aria-labelledby="statistik-title">
          <div className="container">
            <div className="section-head"><h2 id="statistik-title">Statistik Sekolah</h2></div>
            <div className="info-grid reveal-group">
              {statistik.map((item) => (
                <Reveal className="info-item" key={item.label}>
                  <strong>{item.value.toLocaleString('id-ID')}{item.suffix ?? ''}</strong>
                  <small>{item.label}</small>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Struktur Organisasi</h2>
          </div>
          <BaganStruktur data={bagan} />
        </div>
      </section>

      {kartuGuru.length > 0 && (
        <section className="section section-alt" id="dewan-guru">
          <div className="container">
            <div className="section-head">
              <h2>Dewan Guru</h2>
              <p className="section-subtitle">Pendidik yang mengajar dan membimbing peserta didik UPTD SD Negeri 3 Way Galih.</p>
            </div>
            <DirektoriGuru items={kartuGuru} />
          </div>
        </section>
      )}

      {kartuLain.length > 0 && (
        <section className="section" id="tenaga-kependidikan">
          <div className="container">
            <div className="section-head">
              <h2>Tenaga Kependidikan &amp; Pembina</h2>
            </div>
            <div className="pegawai-grid pegawai-grid-kecil">
              {kartuLain.map((k) => (
                <KartuPegawaiItem key={`${k.nama}-${k.peran}`} item={k} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

