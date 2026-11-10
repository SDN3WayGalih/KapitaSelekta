import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ContactForm, Reveal } from '@/components/sekolah/Interactive'

export const metadata: Metadata = { title: 'Kontak Kami' }

const WA_ADMIN = '6281234567890'

// Alamat lengkap sekolah — dipakai kartu Alamat dan peta Google Maps di bawah.
const SCHOOL_ADDRESS =
  'Jln. Desa nagaria No.Kel, Way Galih, Kec. Tj. Bintang, Kabupaten Lampung Selatan, Lampung 35361'

// Embed Google Maps tanpa API key (q + output=embed).
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(SCHOOL_ADDRESS)}&output=embed`

// Ikon hitam-putih (SVG) agar selaras dengan ikon telepon dan email.
const ICON_MAP_PIN = (
  <svg aria-hidden="true" fill="currentColor" height="30" viewBox="0 0 24 24" width="30">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const ICON_WHATSAPP = (
  <svg aria-hidden="true" fill="currentColor" height="30" viewBox="0 0 24 24" width="30">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)


const ICON_CLOCK = (
  <svg aria-hidden="true" fill="currentColor" height="30" viewBox="0 0 24 24" width="30">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
)

const CARDS = [
  { icon: ICON_MAP_PIN, label: 'Alamat', value: SCHOOL_ADDRESS },
  { icon: '☎', label: 'Telepon', value: '(0721) 123456' },
  { icon: '✉', label: 'Email', value: 'info@sdn3waygalih.sch.id' },
  { icon: ICON_CLOCK, label: 'Jam Layanan', value: 'Senin – Jumat\n07.00 – 15.00 WIB' },
  
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
              <Link
                className="contact-card contact-card-link contact-card-wa"
                href={`https://wa.me/${WA_ADMIN}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="cc-icon">{ICON_WHATSAPP}</span>
                <strong>WhatsApp Admin</strong>
                <p>Chat langsung dengan admin sekolah via WhatsApp</p>
                <span className="wa-cta">Chat via WhatsApp ↗</span>
              </Link>
            </div>
            <div className="map-embed">
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAPS_EMBED_URL}
                title="Peta Lokasi SDN 3 Way Galih"
              />
            </div>
          </Reveal>
          <ContactForm />
        </div>
      </section>
    </>
  )
}