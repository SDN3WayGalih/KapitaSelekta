'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { ArrowUpIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from './Icons'

const NAV_ITEMS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/program', label: 'Program' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/ppdb', label: 'PPDB' },
  { href: '/kontak', label: 'Kontak' },
]

export function Topbar() {
  return (
    <aside aria-label="Informasi kontak cepat" className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-contact">
          <a href="tel:0721123456" className="topbar-link">
            <PhoneIcon size={14} />
            <span>(0721) 123456</span>
          </a>
          <a href="mailto:info@sdn3waygalih.sch.id" className="topbar-link">
            <MailIcon size={14} />
            <span>info@sdn3waygalih.sch.id</span>
          </a>
        </div>
        <Link href="/ppdb" className="btn btn-gold btn-sm">
          PPDB 2026
        </Link>
      </div>
    </aside>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand" aria-label="SDN 3 Way Galih - Beranda">
          <div className="brand-logo" aria-hidden="true">SWG</div>
          <div className="brand-text">
            <strong>SDN 3 WAY GALIH</strong>
            <small>Sekolah Dasar Negeri</small>
          </div>
        </Link>
        <nav
          aria-label="Navigasi Utama"
          className={`nav-menu${open ? ' open' : ''}`}
          id="navMenu"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button
          aria-controls="navMenu"
          aria-expanded={open}
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className={`hamburger${open ? ' open' : ''}`}
          id="hamburger"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer" id="kontak">
      <div className="container footer-inner reveal-group">
        <div className="footer-col reveal">
          <div className="brand">
            <div className="brand-logo" aria-hidden="true">SWG</div>
            <div className="brand-text">
              <strong>SDN 3 WAY GALIH</strong>
              <small>Sekolah Dasar Negeri</small>
            </div>
          </div>
          <p>Mewujudkan peserta didik yang cerdas, berkarakter, dan berakhlak mulia.</p>
        </div>
        <div className="footer-col reveal">
          <h4>Tautan Cepat</h4>
          <Link href="/profil">Profil Sekolah</Link>
          <Link href="/program">Program Unggulan</Link>
          <Link href="/berita">Berita & Kegiatan</Link>
          <Link href="/ppdb">Informasi PPDB</Link>
          <Link href="/galeri">Dokumentasi Galeri</Link>
          <Link href="/kontak">Hubungi Kami</Link>
        </div>
        <div className="footer-col reveal">
          <h4>Kontak Sekolah</h4>
          <p className="footer-contact-item">
            <MapPinIcon size={16} className="footer-icon" />
            <span>
              Jl. Pendidikan No. 3, Way Galih<br />
              Kec. Tanjung Bintang, Lampung Selatan
            </span>
          </p>
          <p className="footer-contact-item">
            <PhoneIcon size={16} className="footer-icon" />
            <a href="tel:0721123456">(0721) 123456</a>
          </p>
          <p className="footer-contact-item">
            <MailIcon size={16} className="footer-icon" />
            <a href="mailto:info@sdn3waygalih.sch.id">info@sdn3waygalih.sch.id</a>
          </p>
          <p className="footer-contact-item">
            <ClockIcon size={16} className="footer-icon" />
            <span>Senin – Jumat, 07.00 – 15.00 WIB</span>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">&copy; 2026 SDN 3 Way Galih. Seluruh hak cipta dilindungi.</div>
      </div>
    </footer>
  )
}

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Kembali ke atas halaman"
      className={`back-to-top${show ? ' show' : ''}`}
      id="backToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      <ArrowUpIcon size={20} />
    </button>
  )
}
