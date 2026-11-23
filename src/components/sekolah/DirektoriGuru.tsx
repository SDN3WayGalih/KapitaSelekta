'use client'

import React, { useMemo, useState } from 'react'

export type KartuPegawai = {
  nama: string
  /** Label utama di atas nama, mis. "Guru" atau "Pelatih Pramuka". */
  peran: string
  /** Jabatan tambahan, mis. "Bendahara Sekolah". */
  tambahan?: string[]
  fotoUrl?: string | null
}

/** Inisial dari nama tanpa gelar, mis. "Joko Sopramono" -> "JS", "Elmiyati" -> "EL". */
export function inisial(nama: string) {
  const kata = nama.split(',')[0].trim().split(/\s+/).filter(Boolean)
  if (kata.length === 0) return '?'
  if (kata.length === 1) return kata[0].slice(0, 2).toUpperCase()
  return (kata[0][0] + kata[kata.length - 1][0]).toUpperCase()
}

export function FotoPegawai({ url, nama, className = '' }: { url?: string | null; nama: string; className?: string }) {
  if (!url) {
    return (
      <div className={`pegawai-foto pegawai-foto-inisial ${className}`} role="img" aria-label={`Inisial ${nama}`}>
        <span>{inisial(nama)}</span>
      </div>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={`pegawai-foto ${className}`} src={url} alt={`Foto ${nama}`} loading="lazy" />
}

export function KartuPegawaiItem({ item }: { item: KartuPegawai }) {
  return (
    <article className="pegawai-card">
      <FotoPegawai url={item.fotoUrl} nama={item.nama} />
      <div className="pegawai-info">
        <span className="pegawai-peran">{item.peran}</span>
        <h3>{item.nama}</h3>
        {item.tambahan?.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>
    </article>
  )
}

/** Grid kartu guru dengan pencarian nama, mengikuti pola direktori dosen. */
export function DirektoriGuru({ items }: { items: KartuPegawai[] }) {
  const [q, setQ] = useState('')
  const hasil = useMemo(() => {
    const kata = q.trim().toLowerCase()
    return kata ? items.filter((g) => g.nama.toLowerCase().includes(kata)) : items
  }, [items, q])

  return (
    <div className="direktori">
      <div className="direktori-bar">
        <label className="direktori-cari">
          <span className="sr-only">Cari guru</span>
          <input
            type="search"
            placeholder="Cari nama guru…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <p className="direktori-jumlah" aria-live="polite">
          {hasil.length} guru
        </p>
      </div>
      {hasil.length > 0 ? (
        <div className="pegawai-grid">
          {hasil.map((g) => (
            <KartuPegawaiItem key={g.nama} item={g} />
          ))}
        </div>
      ) : (
        <p className="direktori-kosong">Tidak ada guru dengan nama “{q}”.</p>
      )}
    </div>
  )
}
