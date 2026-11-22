import type { WidgetServerProps } from 'payload'

import React from 'react'

import { IconAgenda, IconBerita, IconGaleri, IconPpdb, IconSekolah, IconWebsite } from '../icons'

/** Tombol pintas untuk pekerjaan yang paling sering dilakukan guru/operator. */
export default function AksiCepat({ req }: WidgetServerProps) {
  const a = req.payload.config.routes.admin

  const aksi = [
    { href: `${a}/collections/posts/create`, icon: <IconBerita />, label: 'Tulis berita' },
    { href: `${a}/collections/agenda/create`, icon: <IconAgenda />, label: 'Tambah agenda' },
    { href: `${a}/collections/galeri/create`, icon: <IconGaleri />, label: 'Unggah foto galeri' },
    { href: `${a}/globals/ppdb`, icon: <IconPpdb />, label: 'Atur info PPDB' },
    { href: `${a}/globals/profil-sekolah`, icon: <IconSekolah />, label: 'Ubah profil sekolah' },
  ]

  return (
    <section className="ta-card ta-panel">
      <header className="ta-panel__head">
        <h3 className="ta-panel__title">Aksi cepat</h3>
        <a className="ta-btn ta-btn--primary" href="/" rel="noopener noreferrer" target="_blank">
          <IconWebsite />
          Buka website
        </a>
      </header>
      <div className="ta-actions">
        {aksi.map((x) => (
          <a className="ta-action" href={x.href} key={x.href}>
            <span className="ta-action__icon">{x.icon}</span>
            {x.label}
          </a>
        ))}
      </div>
    </section>
  )
}
