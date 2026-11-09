'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'


const NAV_ITEMS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/program', label: 'Program' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: 'https://sd.spmblampung.com', label: 'PPDB', external: true},
  { href: '/kontak', label: 'Kontak' },
]

export function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-contact">
          <span>&#9742; (0721) 123456</span>
          <span>&#9993; info@sdn3waygalih.sch.id</span>
        </div>
        <a
          href="https://sd.pmblampung.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold btn-sm"
        >
          PPDB 2026 <ArrowUpRight size={14} style={{ marginLeft: 4 }} />
        </a>
      </div>
    </div>
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

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand">
          <div className="brand-logo">SWG</div>
          <div className="brand-text">
            <strong>SDN 3 WAY GALIH</strong>
            <small>Sekolah Dasar Negeri</small>
          </div>
        </Link>
        <nav className={`nav-menu${open ? ' open' : ''}`} id="navMenu">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`nav-link${pathname === item.href ? ' active' : ''}`}
            >
              {item.label}
              {item.external && <ArrowUpRight size={14} style={{ marginLeft: 4 }} />}
            </Link>

          ))}
        </nav>
        <button
          aria-expanded={open}
          aria-label="Buka menu navigasi"
          className={`hamburger${open ? ' open' : ''}`}
          id="hamburger"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
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
            <div className="brand-logo">SWG</div>
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
          <Link href="/berita">Berita</Link>
          <Link href="https://sd.spmblampung.com">PPDB</Link>
          <Link href="/galeri">Galeri</Link>
        </div>
        <div className="footer-col reveal">
          <h4>Kontak</h4>
          <p>
            Jl. Pendidikan No. 3, Way Galih
            <br />
            Kec. Tanjung Bintang, Lampung Selatan
          </p>
          <p>
            (0721) 123456
            <br />
            info@sdn3waygalih.sch.id
          </p>
          <p>Senin – Jumat, 07.00 – 15.00 WIB</p>
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
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Kembali ke atas"
      className={`back-to-top${show ? ' show' : ''}`}
      id="backToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      &#8593;
    </button>
  )
}
