'use client'

import React, { useEffect, useRef, useState } from 'react'

/** Animasi reveal saat elemen masuk viewport (pengganti .reveal dari script.js) */
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

/** Item FAQ dengan buka/tutup (accordion) */
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
      {items.map((item, i) => (
        <div
          className={`accordion-item reveal${openIndex === i ? ' open' : ''}`}
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <button
            className="accordion-head"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            type="button"
          >
            {item.question}
            <span className="acc-icon">{openIndex === i ? '–' : '+'}</span>
          </button>
          <div
            className="accordion-body"
            style={
              openIndex === i
                ? { maxHeight: refs.current[i]?.scrollHeight ?? 500 }
                : undefined
            }
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Grid berita dengan tab filter kategori */
export function NewsTabs({ news }: { news: NewsItem[] }) {
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', 'berita', 'prestasi', 'pengumuman']

  return (
    <>
      <div className="tabs reveal" id="newsTabs">
        {categories.map((cat) => (
          <button
            className={`tab${filter === cat ? ' active' : ''}`}
            key={cat}
            onClick={() => setFilter(cat)}
            type="button"
          >
            {cat === 'all' ? 'Semua' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="news-grid reveal-group" id="newsGrid">
        {news
          .filter((n) => filter === 'all' || n.category === filter)
          .map((n) => (
            <article className={`news-card reveal${filter === 'all' || n.category === filter ? '' : ' hidden-card'}`} data-cat={n.category} key={n.title}>
              <div className={`news-thumb ${n.thumbClass}`}>
                <span className="news-cat">{n.categoryLabel}</span>
              </div>
              <div className="news-body">
                <small>{n.date}</small>
                <h3>{n.title}</h3>
                <a className="news-link" href="#">
                  Baca Selengkapnya &rarr;
                </a>
              </div>
            </article>
          ))}
      </div>
      <div className="center reveal">
        <button className="btn btn-navy" type="button">
          Muat Lebih Banyak
        </button>
      </div>
    </>
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

/** Galeri dengan lightbox */
export type GalleryItem = { caption: string; imageUrl?: string | null }

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
          <div className="gallery-item reveal" key={`${item.caption}-${i}`} onClick={() => setActive(item)}>
            {item.imageUrl ? (
              <img alt={item.caption} src={item.imageUrl} />
            ) : (
              <span>{item.caption}</span>
            )}
          </div>
        ))}
      </div>
      <div
        className={`lightbox${show ? ' show' : ''}`}
        id="lightbox"
        onClick={() => setActive(null)}
      >
        <button aria-label="Tutup" className="lightbox-close" type="button">
          &times;
        </button>
        <div className="lightbox-box">
          {active?.imageUrl ? (
            <img alt={active.caption} src={active.imageUrl} />
          ) : (
            <span>Foto</span>
          )}
        </div>
        <p id="lightboxCaption">{active?.caption}</p>
      </div>
    </>
  )
}

/** Formulir kontak sederhana (demo, belum terhubung backend) */
export function ContactForm() {
  const [success, setSuccess] = useState(false)

  return (
    <Reveal className="contact-form">
      <h3>Kirim Pesan</h3>
      <div className={`form-success${success ? ' show' : ''}`} id="formSuccess">
        Pesan Anda berhasil dikirim. Terima kasih telah menghubungi kami!
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
          <input id="nama" name="nama" placeholder="Nama Anda" required type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="email@contoh.com" required type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="subjek">Subjek</label>
          <input id="subjek" name="subjek" placeholder="Perihal pesan" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="pesan">Pesan</label>
          <textarea id="pesan" name="pesan" placeholder="Tulis pesan Anda di sini..." required />
        </div>
        <button className="btn btn-gold" style={{ width: '100%' }} type="submit">
          Kirim Pesan
        </button>
      </form>
    </Reveal>
  )
}

