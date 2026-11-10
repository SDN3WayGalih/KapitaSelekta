import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/sekolah/Icons'
import { ContactForm, Reveal } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Kontak Kami' }

const CARDS = [
  {
    icon: <MapPinIcon size={24} />,
    label: 'Alamat Sekolah',
    value: 'Jl. Pendidikan No. 3, Way Galih\nTanjung Bintang, Lampung Selatan',
  },
  {
    icon: <PhoneIcon size={24} />,
    label: 'Telepon Kantor',
    value: '(0721) 123456',
  },
  {
    icon: <MailIcon size={24} />,
    label: 'Email Resmi',
    value: 'info@sdn3waygalih.sch.id',
  },
  {
    icon: <ClockIcon size={24} />,
    label: 'Jam Pelayanan',
    value: 'Senin - Jumat\n07.00 - 15.00 WIB',
  },
]

export default function KontakPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Kontak & Lokasi Sekolah</h1>
          <p className="breadcrumb">
            <Link href="/">Beranda</Link> / Kontak
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="contact-cards">
              {CARDS.map((card) => (
                <div className="contact-card" key={card.label}>
                  <span className="cc-icon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <strong>{card.label}</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>{card.value}</p>
                </div>
              ))}
            </div>
            <div className="map-placeholder">
              <MapPinIcon size={32} />
              <span>Lokasi SDN 3 Way Galih (Tanjung Bintang, Lampung Selatan)</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
