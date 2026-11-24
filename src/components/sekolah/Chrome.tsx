'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { ProfilSekolahData } from '@/utilities/sekolahData'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Interactive'


import { ArrowUpIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from './Icons'

export function TopbarContent({ profil }: { profil: ProfilSekolahData | null }) {
  const phone = profil?.topbarPhone ?? '(0721) 123456'
  const email = profil?.topbarEmail ?? 'info@sdn3waygalih.sch.id'
  const ppdbUrl = profil?.ppdbUrl ?? 'https://sd.spmblampung.com'
  const academicYear = new Date().getFullYear()

  return (
    <aside aria-label="Informasi kontak cepat" className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-contact">
          <a href={`tel:${phone.replace(/[^+\\d]/g, '')}`} className="topbar-link">
            <PhoneIcon size={14} />
            <span>{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="topbar-link">
            <MailIcon size={14} />
            <span>{email}</span>
          </a>
        </div>
        <a
          href={ppdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold btn-sm"
        >
          PPDB {academicYear} <ArrowUpRight size={14} style={{ marginLeft: 4 }} />
        </a>
      </div>
    </aside>
  )
}

export function Navbar({ ppdbUrl = 'https://sd.spmblampung.com' }: { ppdbUrl?: string }) {
  const pathname = usePathname()
  const navItems = [
    { href: '/', label: 'Beranda' },
    { href: '/profil', label: 'Profil' },
    { href: '/program', label: 'Program' },
    { href: '/berita', label: 'Berita' },
    { href: '/galeri', label: 'Galeri' },
    { href: ppdbUrl, label: 'PPDB', external: true },
    { href: '/kontak', label: 'Kontak' },
  ]
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
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
                {item.external && <ArrowUpRight size={14} style={{ marginLeft: 4 }} />}
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

export function FooterContent({ profil }: { profil: ProfilSekolahData | null }) {
  const phone = profil?.topbarPhone ?? '(0721) 123456'
  const email = profil?.topbarEmail ?? 'info@sdn3waygalih.sch.id'
  const address = profil?.footerAddress ?? 'Jln. Desa nagaria No.Kel, Way Galih\\nKec. Tj. Bintang, Kabupaten Lampung Selatan, Lampung 35361'
  const tagline = profil?.footerTagline ?? 'Mewujudkan peserta didik yang cerdas, berkarakter, dan berakhlak mulia.'
  const ppdbUrl = profil?.ppdbUrl ?? 'https://sd.spmblampung.com'
  const officeHours = profil?.officeHours ?? 'Senin - Jumat, 07.00 - 15.00 WIB'

  return (
    <footer className="footer" id="kontak">
      <div className="container footer-inner reveal-group">
        <Reveal className="footer-col">
          <div className="brand">
            <div className="brand-logo" aria-hidden="true">SWG</div>
            <div className="brand-text">
              <strong>SDN 3 WAY GALIH</strong>
              <small>Sekolah Dasar Negeri</small>
            </div>
          </div>
          <p>{tagline}</p>
        </Reveal>
        <Reveal className="footer-col">
          <h4>Tautan Cepat</h4>
          <Link href="/profil">Profil Sekolah</Link>
          <Link href="/program">Program Unggulan</Link>
          <Link href="/berita">Berita & Kegiatan</Link>
          <Link href={ppdbUrl} target="_blank" rel="noopener noreferrer">
            Informasi PPDB
          </Link>
          <Link href="/galeri">Dokumentasi Galeri</Link>
          <Link href="/kontak">Hubungi Kami</Link>
        </Reveal>
        <Reveal className="footer-col">
          <h4>Kontak Sekolah</h4>
          <p className="footer-contact-item">
            <MapPinIcon size={16} className="footer-icon" />
            <span style={{ whiteSpace: 'pre-line' }}>{address}</span>
          </p>
          <p className="footer-contact-item">
            <PhoneIcon size={16} className="footer-icon" />
            <a href={`tel:${phone.replace(/[^+\\d]/g, '')}`}>{phone}</a>
          </p>
          <p className="footer-contact-item">
            <MailIcon size={16} className="footer-icon" />
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="footer-contact-item">
            <ClockIcon size={16} className="footer-icon" />
            <span>{officeHours}</span>
          </p>
        </Reveal>
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
