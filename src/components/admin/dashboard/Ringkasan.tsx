import type { WidgetServerProps } from 'payload'

import React from 'react'

import { IconAgenda, IconBerita, IconFaq, IconGaleri } from '../icons'

type Kartu = {
  slug: 'agenda' | 'faq' | 'galeri' | 'posts'
  label: string
  icon: React.ReactNode
}

const KARTU: Kartu[] = [
  { slug: 'posts', label: 'Berita & Kegiatan', icon: <IconBerita /> },
  { slug: 'agenda', label: 'Agenda Sekolah', icon: <IconAgenda /> },
  { slug: 'galeri', label: 'Foto Galeri', icon: <IconGaleri /> },
  { slug: 'faq', label: 'FAQ', icon: <IconFaq /> },
]

/** Kartu metrik gaya TailAdmin: jumlah konten terbit dan draft per koleksi. */
export default async function Ringkasan({ req }: WidgetServerProps) {
  const adminRoute = req.payload.config.routes.admin

  const data = await Promise.all(
    KARTU.map(async (k) => {
      const [terbit, draft] = await Promise.all([
        req.payload.count({
          collection: k.slug,
          req,
          where: { _status: { equals: 'published' } },
        }),
        req.payload.count({
          collection: k.slug,
          req,
          where: { _status: { equals: 'draft' } },
        }),
      ])
      return { ...k, draft: draft.totalDocs, terbit: terbit.totalDocs }
    }),
  )

  return (
    <div className="ta-metrics">
      {data.map((k) => (
        <a className="ta-card ta-metric" href={`${adminRoute}/collections/${k.slug}`} key={k.slug}>
          <span className="ta-metric__icon">{k.icon}</span>
          <span className="ta-metric__row">
            <span>
              <span className="ta-metric__label">{k.label}</span>
              <span className="ta-metric__value">{k.terbit}</span>
            </span>
            {k.draft > 0 ? (
              <span className="ta-badge ta-badge--warning">{k.draft} draft</span>
            ) : k.terbit > 0 ? (
              <span className="ta-badge ta-badge--success">Semua terbit</span>
            ) : (
              <span className="ta-badge ta-badge--neutral">Belum ada</span>
            )}
          </span>
        </a>
      ))}
    </div>
  )
}
