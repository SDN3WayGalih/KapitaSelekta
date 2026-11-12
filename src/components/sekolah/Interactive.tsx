'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  ImageIcon,
  ShareIcon,
} from './Icons'

/** Animasi reveal saat elemen masuk viewport */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'strong'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      className={`${className} reveal${visible ? ' visible' : ''}`.trim()}
      ref={ref as never}
    >
      {children}
    </Tag>
  )
}

/** Angka statistik yang beranimasi naik saat terlihat */
export function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setValue(target)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          const duration = 1600
          let start: number | null = null
          const step = (timestamp: number) => {
            if (start === null) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span className="counter" data-target={target} ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

/** Item FAQ dengan buka/tutup (accordion) modern */
export function Accordion({
  items,
  defaultOpenIndex = 0,
}: {
  items: { question: string; answer: string }[]
  defaultOpenIndex?: number | null
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div className="accordion reveal-group">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            className={`accordion-item reveal${isOpen ? ' open' : ''}`}
            key={item.question}
            ref={(el) => {
              refs.current[i] = el
            }}
          >
            <button
              aria-expanded={isOpen}
              className="accordion-head"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              type="button"
            >
              <span>{item.question}</span>
              <span className={`acc-icon${isOpen ? ' is-rotated' : ''}`}>
                <ChevronDownIcon size={18} />
              </span>
            </button>
            <div
              className="accordion-body"
              style={
                isOpen
                  ? { maxHeight: refs.current[i]?.scrollHeight ?? 500 }
                  : { maxHeight: 0 }
              }
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export type NewsItem = {
  title: string
  date: string
  category: 'berita' | 'prestasi' | 'pengumuman'
  categoryLabel: string
  thumbClass: string
  excerpt?: string
  slug?: string
}

/** Grid berita dengan tab filter kategori */
export function NewsTabs({ news }: { news: NewsItem[] }) {
  const [filter, setFilter] = useState<string>('all')

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'berita', label: 'Berita' },
    { key: 'prestasi', label: 'Prestasi' },
    { key: 'pengumuman', label: 'Pengumuman' },
  ]

  const filtered = news.filter((n) => filter === 'all' || n.category === filter)

  return (
    <>
      <div className="tabs reveal" id="newsTabs" role="tablist">
        {categories.map((cat) => (
          <button
            aria-selected={filter === cat.key}
            className={`tab${filter === cat.key ? ' active' : ''}`}
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            role="tab"
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="news-grid reveal-group" id="newsGrid">
        {filtered.map((n) => (
          <article
            className="news-card reveal"
            data-cat={n.category}
            key={`${n.title}-${n.date}`}
          >
            <div className={`news-thumb ${n.thumbClass}`}>
              <span className="news-cat">{n.categoryLabel}</span>
            </div>
            <div className="news-body">
              <small>{n.date}</small>
              <h3>{n.title}</h3>
              {n.excerpt && <p className="news-excerpt">{n.excerpt}</p>}
              <Link className="news-link" href={n.slug ? `/berita/${n.slug}` : '#'}>
                <span>Baca Selengkapnya</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export type GalleryItem = { caption: string; imageUrl?: string | null }

/** Galeri dengan lightbox */
export function GalleryGrid({ items }: { items: (string | GalleryItem)[] }) {
  const normalized: GalleryItem[] = items.map((i) =>
    typeof i === 'string' ? { caption: i, imageUrl: null } : i,
  )
  const [active, setActive] = useState<GalleryItem | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const show = active !== null

  return (
    <>
      <div className="gallery-grid reveal-group">
        {normalized.map((item, i) => (
          <button
            type="button"
            className="gallery-item reveal"
            key={`${item.caption}-${i}`}
            onClick={() => setActive(item)}
            aria-label={`Lihat foto: ${item.caption}`}
          >
            {item.imageUrl ? (
              <img alt={item.caption} src={item.imageUrl} />
            ) : (
              <div className="gallery-placeholder">
                <ImageIcon size={32} />
                <span>{item.caption}</span>
              </div>
            )}
          </button>
        ))}
      </div>
      <div
        className={`lightbox${show ? ' show' : ''}`}
        id="lightbox"
        onClick={() => setActive(null)}
        role="dialog"
        aria-modal="true"
        aria-hidden={!show}
      >
        <button
          aria-label="Tutup pratinjau foto"
          className="lightbox-close"
          onClick={() => setActive(null)}
          type="button"
        >
          <CloseIcon size={28} />
        </button>
        <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
          {active?.imageUrl ? (
            <img alt={active.caption} src={active.imageUrl} />
          ) : (
            <div className="lightbox-empty">
              <ImageIcon size={48} />
              <span>{active?.caption}</span>
            </div>
          )}
        </div>
        <p id="lightboxCaption">{active?.caption}</p>
      </div>
    </>
  )
}

/** Formulir kontak interaktif */
export function ContactForm() {
  const [success, setSuccess] = useState(false)

  return (
    <Reveal className="contact-form">
      <h3>Kirim Pesan</h3>
      <div
        aria-live="polite"
        className={`form-success${success ? ' show' : ''}`}
        id="formSuccess"
      >
        <CheckIcon size={18} />
        <span>Pesan Anda berhasil dikirim. Terima kasih telah menghubungi kami!</span>
      </div>
      <form
        id="contactForm"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          setSuccess(true)
          ;(e.target as HTMLFormElement).reset()
          setTimeout(() => setSuccess(false), 5000)
        }}
      >
        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap</label>
          <input id="nama" name="nama" placeholder="Contoh: Budi Santoso" required type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="budi@email.com" required type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="subjek">Subjek</label>
          <input id="subjek" name="subjek" placeholder="Perihal pertanyaan / masukan" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="pesan">Pesan</label>
          <textarea id="pesan" name="pesan" placeholder="Tuliskan pesan Anda secara jelas..." required />
        </div>
        <button className="btn btn-gold" style={{ width: '100%' }} type="submit">
          Kirim Pesan
        </button>
      </form>
    </Reveal>
  )
}

/** Tombol bagikan artikel dengan fallback salin tautan */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (typeof window === 'undefined') return
    try {
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        try {
          await navigator.share({
            title,
            url: window.location.href,
          })
          return
        } catch {
          // Jika pengguna membatalkan atau tidak support, fallback ke clipboard
        }
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="btn btn-outline-navy article-share-btn"
      aria-label="Bagikan artikel ini"
    >
      {copied ? (
        <>
          <CheckIcon size={16} />
          <span>Tautan Tersalin!</span>
        </>
      ) : (
        <>
          <ShareIcon size={16} />
          <span>Bagikan Berita</span>
        </>
      )}
    </button>
  )
}


/** Observer global: menambahkan class `visible` ke semua elemen `.reveal` saat masuk viewport */
export function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    const scan = (root: ParentNode) => {
      root.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el))
    }
    scan(document)

    // Tangkap elemen baru (navigasi halaman, filter tab, dll.)
    const mo = new MutationObserver(() => scan(document))
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])

  return null
}
