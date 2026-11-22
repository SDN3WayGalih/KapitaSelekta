import type { WidgetServerProps } from 'payload'

import React from 'react'

const JENIS: Record<string, string> = {
  berita: 'Berita',
  pengumuman: 'Pengumuman',
  prestasi: 'Prestasi',
}

const formatTanggal = (iso?: null | string) =>
  iso ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(iso)) : '-'

/** Tabel "Recent Orders" ala TailAdmin, berisi 6 berita yang terakhir diubah. */
export default async function BeritaTerbaru({ req }: WidgetServerProps) {
  const adminRoute = req.payload.config.routes.admin
  const { docs } = await req.payload.find({
    collection: 'posts',
    depth: 0,
    draft: true,
    limit: 6,
    req,
    select: { _status: true, postType: true, title: true, updatedAt: true },
    sort: '-updatedAt',
  })

  return (
    <section className="ta-card ta-panel">
      <header className="ta-panel__head">
        <div>
          <h3 className="ta-panel__title">Berita terbaru</h3>
          <p className="ta-panel__sub">Terakhir diubah di panel admin</p>
        </div>
        <a className="ta-btn ta-btn--outline" href={`${adminRoute}/collections/posts`}>
          Lihat semua
        </a>
      </header>

      {docs.length === 0 ? (
        <p className="ta-empty">
          Belum ada berita.{' '}
          <a href={`${adminRoute}/collections/posts/create`}>Tulis berita pertama</a>
        </p>
      ) : (
        <div className="ta-table-wrap">
          <table className="ta-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th className="ta-hide-sm">Jenis</th>
                <th className="ta-hide-sm">Diubah</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <a
                      className="ta-table__title"
                      href={`${adminRoute}/collections/posts/${doc.id}`}
                    >
                      {doc.title || '(tanpa judul)'}
                    </a>
                  </td>
                  <td className="ta-hide-sm">{JENIS[doc.postType ?? ''] ?? '-'}</td>
                  <td className="ta-hide-sm ta-table__muted">{formatTanggal(doc.updatedAt)}</td>
                  <td>
                    {doc._status === 'published' ? (
                      <span className="ta-badge ta-badge--success">Terbit</span>
                    ) : (
                      <span className="ta-badge ta-badge--warning">Draft</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
