import type { WidgetServerProps } from 'payload'

import React from 'react'

/**
 * Panduan singkat untuk admin sekolah: arti status dan langkah tugas yang
 * paling sering dilakukan. Ditulis dalam bahasa sehari-hari, tanpa istilah teknis.
 */
export default function Panduan({ req }: WidgetServerProps) {
  const a = req.payload.config.routes.admin

  const tugas = [
    {
      judul: 'Menulis berita',
      href: `${a}/collections/posts/create`,
      langkah: [
        'Isi Judul Berita dan Ringkasan.',
        'Tambahkan Gambar Utama dan tulis Isi Berita.',
        'Klik tombol biru "Terbitkan ke Website".',
      ],
    },
    {
      judul: 'Menambah foto galeri',
      href: `${a}/collections/galeri/create`,
      langkah: [
        'Tulis judul foto, misalnya "Upacara 17 Agustus 2026".',
        'Klik tombol biru "Unggah Foto Baru", lalu pilih foto dari komputer.',
        'Klik "Terbitkan ke Website".',
      ],
    },
    {
      judul: 'Mengubah data guru / struktur',
      href: `${a}/globals/profil-sekolah`,
      langkah: [
        'Klik kotak "Info Sekolah", lalu klik baris nama orang yang ingin diubah.',
        'Ubah nama, jabatan, atau foto.',
        'Klik tombol biru "Simpan" di kanan atas.',
      ],
    },
  ]

  return (
    <section className="ta-card ta-panel ta-panduan">
      <header className="ta-panel__head">
        <div>
          <h3 className="ta-panel__title">Panduan singkat</h3>
          <p className="ta-panel__sub">Baca ini dulu jika baru pertama kali memakai panel admin.</p>
        </div>
      </header>

      <div className="ta-panduan__status">
        <div className="ta-panduan__item">
          <span className="ta-badge ta-badge--warning">Draf</span>
          <p>
            Tersimpan, tetapi <strong>belum tampil</strong> di website. Aman untuk tulisan yang belum selesai.
          </p>
        </div>
        <div className="ta-panduan__item">
          <span className="ta-badge ta-badge--success">Terbit</span>
          <p>
            Sudah <strong>tampil di website</strong> dan bisa dilihat semua orang.
          </p>
        </div>
        <div className="ta-panduan__item">
          <span className="ta-panduan__req">*</span>
          <p>Tanda bintang merah berarti kolom itu wajib diisi.</p>
        </div>
      </div>

      <div className="ta-panduan__tugas">
        {tugas.map((t) => (
          <div className="ta-panduan__kartu" key={t.judul}>
            <h4>{t.judul}</h4>
            <ol>
              {t.langkah.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ol>
            <a className="ta-panduan__link" href={t.href}>
              Mulai sekarang
            </a>
          </div>
        ))}
      </div>

      <p className="ta-panduan__catatan">
        Perubahan tidak sengaja? Setiap berita menyimpan riwayat versi di tab <strong>Versi</strong>, jadi isi
        lama bisa dipulihkan.
      </p>
    </section>
  )
}
