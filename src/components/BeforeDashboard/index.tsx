import type { ServerProps } from 'payload'

import React from 'react'

/** Judul halaman dashboard gaya TailAdmin. Widget di bawahnya diatur di `admin.dashboard`. */
const BeforeDashboard: React.FC<ServerProps> = ({ user }) => {
  const nama = (user as { name?: null | string } | undefined)?.name?.trim()

  return (
    <div className="ta-page-head">
      <div>
        <h1 className="ta-page-head__title">Dashboard</h1>
        <p className="ta-page-head__sub">
          {nama ? `Halo, ${nama}. ` : ''}Kelola konten website SDN 3 Way Galih dari sini.
        </p>
      </div>
    </div>
  )
}

export default BeforeDashboard
