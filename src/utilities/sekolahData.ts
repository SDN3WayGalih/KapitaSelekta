import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { NewsItem } from '@/components/sekolah/Interactive'

/* ------------------------------------------------------------------ */
/* Tipe data untuk frontend (semua opsional supaya fallback aman)      */
/* ------------------------------------------------------------------ */

export type AgendaItem = {
  date: string
  month: string
  title: string
  detail: string
}

export type GaleriItem = {
  caption: string
  imageUrl: string | null
}

export type FaqItem = {
  question: string
  answer: string
}

export type ProfilSekolahData = {
  heroBadge?: string
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  topbarPhone?: string
  topbarEmail?: string
  footerAddress?: string
  footerTagline?: string
  sambutanQuote?: string
  sambutanName?: string
  sambutanTitle?: string
  visi?: string
  misi?: string[]
  sejarah?: string
  infoItems?: { label: string; value: string }[]
  struktur?: { name: string; position: string }[]
  statItems?: { value: number; suffix?: string; label: string }[]
  badgeItems?: { icon?: string; label: string }[]
}

export type PpdbData = {
  academicYear?: string
  bannerTitle?: string
  bannerDescription?: string
  steps?: { title: string; description: string }[]
  timeline?: { date: string; title: string; description: string }[]
  requirements?: string[]
}

/* ------------------------------------------------------------------ */
/* Helper                                                              */
/* ------------------------------------------------------------------ */

const BULAN_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]

function formatTanggal(d: Date | string | null | undefined): { date: string; month: string } {
  const date = d ? new Date(d) : null
  if (!date || Number.isNaN(date.getTime())) return { date: '', month: '' }
  return {
    date: String(date.getDate()),
    month: BULAN_ID[date.getMonth()] ?? '',
  }
}

function formatTanggalPenuh(d: Date | string | null | undefined): string {
  const date = d ? new Date(d) : null
  if (!date || Number.isNaN(date.getTime())) return ''
  return `${date.getDate()} ${BULAN_ID[date.getMonth()]} ${date.getFullYear()}`
}

/** Wrapper getPayload yang bisa dipanggil dari Server Component */
async function getClient() {
  return getPayload({ config: configPromise })
}

/* ------------------------------------------------------------------ */
/* Berita (Posts)                                                      */
/* ------------------------------------------------------------------ */

export async function getBerita(limit = 9): Promise<NewsItem[]> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'posts',
      draft: false,
      limit,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        _status: { equals: 'published' },
      },
    })

    return docs.map((post, i) => ({
      category: (post.postType ?? 'berita') as NewsItem['category'],
      categoryLabel:
        post.postType === 'prestasi'
          ? 'Prestasi'
          : post.postType === 'pengumuman'
            ? 'Pengumuman'
            : 'Berita',
      date: formatTanggalPenuh(post.publishedAt),
      excerpt: post.excerpt ?? undefined,
      slug: post.slug ?? undefined,
      thumbClass: `thumb-${(i % 3) + 1}`,
      title: post.title,
    }))
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ */
/* Agenda                                                              */
/* ------------------------------------------------------------------ */

export async function getAgenda(limit = 5): Promise<AgendaItem[]> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'agenda',
      draft: false,
      limit,
      overrideAccess: false,
      sort: 'date',
      where: {
        _status: { equals: 'published' },
        date: { greater_than_equal: new Date().toISOString().slice(0, 10) },
      },
    })

    return docs.map((item) => {
      const tgl = formatTanggal(item.date)
      return {
        date: tgl.date,
        detail: [item.location, item.time].filter(Boolean).join(' • '),
        month: tgl.month,
        title: item.title,
      }
    })
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export async function getFaq(category?: 'ppdb' | 'umum', limit = 10): Promise<FaqItem[]> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'faq',
      draft: false,
      limit,
      overrideAccess: false,
      sort: 'order',
      where: {
        _status: { equals: 'published' },
        ...(category ? { category: { equals: category } } : {}),
      },
    })

    return docs.map((doc) => ({
      answer: doc.answer,
      question: doc.question,
    }))
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ */
/* Galeri                                                              */
/* ------------------------------------------------------------------ */

export async function getGaleri(limit = 12): Promise<GaleriItem[]> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'galeri',
      depth: 1,
      draft: false,
      limit,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        _status: { equals: 'published' },
      },
    })

    return docs.map((doc) => {
      const image = typeof doc.image === 'object' ? doc.image : null
      return {
        caption: doc.title,
        imageUrl: image?.url ?? null,
      }
    })
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ */
/* Testimoni                                                           */
/* ------------------------------------------------------------------ */

export async function getTestimoni(limit = 6): Promise<
  { name: string; relation: string; quote: string }[]
> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'testimoni',
      draft: false,
      limit,
      overrideAccess: false,
      sort: '-createdAt',
      where: {
        _status: { equals: 'published' },
      },
    })

    return docs.map((doc) => ({
      name: doc.name,
      quote: doc.quote,
      relation: doc.relation,
    }))
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ */
/* Globals                                                             */
/* ------------------------------------------------------------------ */

export async function getProfilSekolah(): Promise<ProfilSekolahData | null> {
  try {
    const payload = await getClient()
    const global = await payload.findGlobal({ slug: 'profil-sekolah' })
    if (!global || !global.heroTitle) return null

    return {
      badgeItems: global.badgeItems?.map((b) => ({ icon: b.icon ?? '', label: b.label })),
      footerAddress: global.footerAddress ?? undefined,
      footerTagline: global.footerTagline ?? undefined,
      heroBadge: global.heroBadge ?? undefined,
      heroDescription: global.heroDescription ?? undefined,
      heroSubtitle: global.heroSubtitle ?? undefined,
      heroTitle: global.heroTitle ?? undefined,
      infoItems: global.infoItems?.map((i) => ({ label: i.label, value: i.value })),
      misi: global.misi?.map((m) => m.misiItem),
      sambutanName: global.sambutanName ?? undefined,
      sambutanQuote: global.sambutanQuote ?? undefined,
      sambutanTitle: global.sambutanTitle ?? undefined,
      sejarah: global.sejarah ?? undefined,
      statItems: global.statItems?.map((s) => ({
        label: s.label,
        suffix: s.suffix ?? undefined,
        value: s.value,
      })),
      struktur: global.struktur?.map((s) => ({ name: s.name, position: s.position })),
      topbarEmail: global.topbarEmail ?? undefined,
      topbarPhone: global.topbarPhone ?? undefined,
      visi: global.visi ?? undefined,
    }
  } catch {
    return null
  }
}

export async function getPpdb(): Promise<PpdbData | null> {
  try {
    const payload = await getClient()
    const global = await payload.findGlobal({ slug: 'ppdb' })
    if (!global || !global.academicYear) return null

    return {
      academicYear: global.academicYear ?? undefined,
      bannerDescription: global.bannerDescription ?? undefined,
      bannerTitle: global.bannerTitle ?? undefined,
      requirements: global.requirements?.map((r) => r.requirement),
      steps: global.steps?.map((s) => ({ description: s.description, title: s.title })),
      timeline: global.timeline?.map((t) => ({
        date: t.date,
        description: t.description,
        title: t.title,
      })),
    }
  } catch {
    return null
  }
}