import type { WidgetServerProps } from 'payload'

import React from 'react'

/** Daftar agenda terbit yang tanggalnya hari ini atau sesudahnya. */
export default async function AgendaMendatang({ req }: WidgetServerProps) {
  const adminRoute = req.payload.config.routes.admin
  const awalHariIni = new Date()
  awalHariIni.setHours(0, 0, 0, 0)

  const { docs } = await req.payload.find({
    collection: 'agenda',
    depth: 0,
    limit: 5,
    req,
    select: { date: true, location: true, time: true, title: true },
    sort: 'date',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { date: { greater_than_equal: awalHariIni.toISOString() } },
      ],
    },
  })

  return (
    <section className="ta-card ta-panel">
      <header className="ta-panel__head">
        <div>
          <h3 className="ta-panel__title">Agenda mendatang</h3>
          <p className="ta-panel__sub">Yang tampil di beranda</p>
        </div>
      </header>

      {docs.length === 0 ? (
        <p className="ta-empty">
          Tidak ada agenda mendatang.
          <br />
          <a href={`${adminRoute}/collections/agenda/create`}>+ Tambah agenda</a>
        </p>
      ) : (
        <ul className="ta-agenda">
          {docs.map((doc) => {
            const d = new Date(doc.date)
            return (
              <li key={doc.id}>
                <a className="ta-agenda__item" href={`${adminRoute}/collections/agenda/${doc.id}`}>
                  <span className="ta-agenda__date">
                    <strong>{d.getDate()}</strong>
                    {new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(d)}
                  </span>
                  <span className="ta-agenda__body">
                    <span className="ta-agenda__title">{doc.title}</span>
                    <span className="ta-agenda__meta">
                      {[doc.time, doc.location].filter(Boolean).join(' · ') || 'Waktu belum diisi'}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
