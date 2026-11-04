import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ContactForm, Reveal } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Kontak Kami' }

const CARDS = [
  { icon: '📍', label: 'Alamat', value: 'Jl. Pendidikan No. 3, Way Galih, Tanjung Bintang, Lampung Selatan' },
  { icon: '☎', label: 'Telepon', value: '(0721) 123456' },
  { icon: '✉', label: 'Email', value: 'info@sdn3waygalih.sch.id' },
  { icon: '🕐', label: 'Jam Layanan', value: 'Senin – Jumat\n07.00 – 15.00 WIB' },
]

export default function KontakPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Kontak Kami</h1>
          <p className="breadcrumb"><Link href="/">Beranda</Link> / Kontak</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-cards">
              {CARDS.map((card) => (
                <div className="contact-card" key={card.label}>
                  <span className="cc-icon">{card.icon}</span>
                  <strong>{card.label}</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>{card.value}</p>
                </div>
              ))}
            </div>
            <div className="map-placeholder"><span>Peta Lokasi Sekolah</span></div>
          </Reveal>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
