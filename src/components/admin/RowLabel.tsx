'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

type Baris = Record<string, unknown>

const teks = (v: unknown) => (typeof v === 'string' || typeof v === 'number' ? String(v).trim() : '')

/**
 * Judul baris array yang menampilkan isinya (bukan "Item 01"), supaya admin
 * bisa menemukan baris yang ingin diubah tanpa membuka satu per satu.
 */
export const RowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<Baris>()
  const nomor = String((rowNumber ?? 0) + 1).padStart(2, '0')

  // Struktur organisasi: "Nama — Jabatan"
  if (teks(data?.name) && teks(data?.position)) {
    return (
      <span>
        {nomor}. <strong>{teks(data.name)}</strong> — {teks(data.position)}
      </span>
    )
  }
  // Info sekolah / statistik: "Label: Nilai"
  if (teks(data?.label) && teks(data?.value)) {
    return (
      <span>
        {nomor}. {teks(data.label)}: <strong>{teks(data.value)}</strong>
      </span>
    )
  }

  const utama =
    teks(data?.title) || teks(data?.label) || teks(data?.misiItem) || teks(data?.requirement) || teks(data?.name)
  const potong = utama.length > 80 ? `${utama.slice(0, 80)}…` : utama

  return (
    <span>
      {nomor}. {potong || <em>(belum diisi)</em>}
    </span>
  )
}
