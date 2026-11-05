# Website SDN 3 Way Galih

Website resmi **SDN 3 Way Galih** (Tanjung Bintang, Lampung Selatan).

Dibangun dengan **Next.js 16** (App Router) + **Payload CMS 3** dalam satu codebase, dengan database **Supabase (PostgreSQL)**.

> Berawal dari [Payload Website Template](https://github.com/payloadcms/payload/blob/3.x/templates/website) yang telah disesuaikan untuk kebutuhan website sekolah.

---

## Daftar Isi

1. [Gambaran Sistem](#gambaran-sistem)
2. [Menjalankan di Lokal](#menjalankan-di-lokal)
3. [Struktur Folder](#struktur-folder)
4. [Mengelola Konten (CMS)](#mengelola-konten-cms)
5. [Cara Kerja Data Mengalir](#cara-kerja-data-mengalir)
6. [Menambah Fitur Baru](#menambah-fitur-baru)
7. [Perintah yang Tersedia](#perintah-yang-tersedia)
8. [Deploy](#deploy)
9. [Troubleshooting](#troubleshooting)

---

## Gambaran Sistem

```
┌──────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Admin Panel    │────▶│  Payload CMS     │────▶│    Supabase     │
│  /admin (guru)   │     │  (Next.js API)   │     │  (PostgreSQL)   │
└──────────────────┘     └────────┬─────────┘     └─────────────────┘
                                  │ payload.find()
                                  ▼
                         ┌──────────────────┐
                         │  Halaman Publik  │
                         │  / /profil /berita│
                         │  /galeri /ppdb   │
                         └──────────────────┘
```

Ada **dua area** di satu aplikasi:

| Area | URL | Untuk siapa |
|---|---|---|
| Website publik | `/`, `/profil`, `/program`, `/berita`, `/galeri`, `/ppdb`, `/kontak` | Pengunjung |
| Admin panel | `/admin` | Guru/admin sekolah mengelola konten |

---

## Menjalankan di Lokal

### Prasyarat

- **Node.js** 22.23.4+ atau 24.22.1+ (lihat `engines` di `package.json`)
- **pnpm** 9+ — project ini **wajib** pakai pnpm (bukan npm/yarn)
- Akses ke project **Supabase** (connection string database)

### Langkah

```bash
# 1. Install dependency
pnpm install

# 2. Siapkan environment
cp .env.example .env
```

Buka `.env`, lalu isi `DATABASE_URL` dengan connection string Supabase Anda. Password database bisa dilihat/di-reset di **Supabase Dashboard → Project Settings → Database**.

```bash
# 3. Buat tabel di database
pnpm payload migrate

# 4. Isi konten awal sekolah (opsional, tapi disarankan)
pnpm seed:sekolah

# 5. Jalankan
pnpm dev
```

Buka **http://localhost:3000**.

### Environment Variables

| Variabel | Wajib | Keterangan |
|---|---|---|
| `DATABASE_URL` | ✅ | Connection string Postgres Supabase |
| `PAYLOAD_SECRET` | ✅ | Kunci enkripsi token login admin |
| `NEXT_PUBLIC_SERVER_URL` | ✅ | URL server, tanpa trailing slash |
| `CRON_SECRET` | — | Untuk endpoint cron (scheduled publish) |
| `PREVIEW_SECRET` | — | Untuk URL preview konten draft |

> `PAYLOAD_SECRET` di `.env.example` hanya untuk development. **Ganti dengan string acak baru sebelum deploy production**, karena file `.env.example` ikut ter-commit ke GitHub.

---

## Struktur Folder

```
src/
├── app/
│   ├── (sekolah)/              # ── WEBSITE PUBLIK ──
│   │   ├── layout.tsx          # Topbar + Navbar + Footer
│   │   ├── page.tsx            # Beranda
│   │   ├── profil/page.tsx
│   │   ├── program/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── galeri/page.tsx
│   │   ├── ppdb/page.tsx
│   │   ├── kontak/page.tsx
│   │   ├── sekolah.css         # Styling website sekolah
│   │   └── img/                # Gambar statis (foto hero)
│   │
│   ├── (payload)/              # ── ADMIN PANEL ──
│   │   └── admin/              # /admin
│   │
│   └── (frontend)/             # Route bawaan template (posts, search, preview)
│
├── collections/                # Definisi tabel/konten Payload
│   ├── Posts/index.ts          #   → Berita & Kegiatan
│   ├── Agenda/index.ts         #   → Agenda Sekolah
│   ├── Faq/index.ts            #   → FAQ
│   ├── Galeri/index.ts         #   → Galeri foto
│   ├── Testimoni/index.ts      #   → Testimoni wali murid
│   ├── Media.ts                #   → Upload gambar
│   ├── Categories.ts           #   → Kategori berita
│   ├── Users/index.ts          #   → Akun admin
│   └── Pages/index.ts          #   → Halaman bebas (layout builder)
│
├── globals/                    # Konten tunggal (bukan daftar)
│   ├── ProfilSekolah.ts        #   → Hero, sambutan, visi-misi, struktur, statistik
│   └── Ppdb.ts                 #   → Alur, timeline, syarat PPDB
│
├── components/sekolah/         # Komponen UI website sekolah
│   ├── Chrome.tsx              #   → Topbar, Navbar, Footer, BackToTop
│   └── Interactive.tsx         #   → Reveal, Counter, Accordion, NewsTabs,
│                               #     GalleryGrid, ContactForm
│
├── utilities/
│   ├── sekolahData.ts          # ★ Pengambil data dari Payload + fallback
│   └── getURL.ts
│
├── scripts/
│   └── seed-sekolah.ts         # Script isi data awal
│
├── migrations/                 # Riwayat perubahan schema database
├── payload.config.ts           # Konfigurasi utama Payload
└── payload-types.ts            # TypeScript types (auto-generate)
```

---

## Mengelola Konten (CMS)

### Login pertama kali

1. Buka **http://localhost:3000/admin**
2. Payload meminta membuat **akun admin pertama** — isi email & password
3. Setelah itu login seperti biasa

### Menu yang tersedia

Semua ada di grup **"Konten Sekolah"**:

| Menu | Isi yang dikelola | Tampil di |
|---|---|---|
| **Berita & Kegiatan** | Berita/prestasi/pengumuman + gambar + tanggal | `/berita`, beranda |
| **Agenda Sekolah** | Jadwal kegiatan (tanggal, waktu, lokasi) | beranda |
| **FAQ** | Tanya-jawab, kategori PPDB/Umum | beranda, `/ppdb` |
| **Testimoni Wali Murid** | Kutipan wali murid | beranda |
| **Galeri** | Foto kegiatan (upload) | `/galeri`, beranda |
| **Profil Sekolah** | Hero, sambutan kepsek, visi-misi, sejarah, info, struktur, statistik, badge | beranda, `/profil` |
| **PPDB** | Tahun ajaran, banner, alur, timeline, syarat | `/ppdb`, beranda |
| **Media** | Semua gambar yang di-upload | — |

### Hal penting

- **Konten harus berstatus `Published`** agar tampil di website. Draft tidak tampil.
- **Gambar di-upload dulu ke Media**, lalu dipilih dari field upload. Jadi urutannya: Media → konten.
- Kalau sebuah bagian **belum diisi di CMS**, halaman menampilkan **konten contoh (fallback)** agar tidak kosong. Fallback ini tertulis di kode tiap halaman.

---

## Cara Kerja Data Mengalir

Ini bagian terpenting untuk melanjutkan project.

### 1. Halaman publik mengambil data lewat `sekolahData.ts`

Semua pengambilan data terpusat di **`src/utilities/sekolahData.ts`**:

| Fungsi | Mengambil dari |
|---|---|
| `getBerita(limit)` | collection `posts` |
| `getAgenda(limit)` | collection `agenda` |
| `getFaq(category, limit)` | collection `faq` |
| `getGaleri(limit)` | collection `galeri` |
| `getTestimoni(limit)` | collection `testimoni` |
| `getProfilSekolah()` | global `profil-sekolah` |
| `getPpdb()` | global `ppdb` |

Setiap fungsi **mengembalikan array kosong / null bila gagal** (misal database belum siap), sehingga halaman tidak pernah crash.

### 2. Halaman memakai pola "ambil → fallback → render"

Contoh dari `src/app/(sekolah)/page.tsx`:

```tsx
export default async function BerandaPage() {
  // 1. Ambil dari CMS
  const [profil, news, faqList] = await Promise.all([
    getProfilSekolah(),
    getBerita(6),
    getFaq('ppdb', 6),
  ])

  // 2. Pakai data CMS, atau fallback statis bila kosong
  const newsItems = news.length ? news : FALLBACK_NEWS
  const faq = faqList.length ? faqList : FALLBACK_FAQ

  // 3. Render
  return (
    <section className="berita section">
      <NewsTabs news={newsItems} />
      <Accordion items={faq} />
    </section>
  )
}
```

Karena halaman berisi `async` dan memanggil Payload, **jangan tambahkan `'use client'`** di file `page.tsx`. Komponen interaktif yang butuh state/hook sudah dipisah ke `Interactive.tsx` (yang memang `'use client'`).

### 3. Konvensi

- **Satu fungsi per jenis konten** di `sekolahData.ts` — jangan query Payload langsung dari halaman.
- **Selalu sediakan fallback** agar tampilan tidak rusak saat CMS kosong.
- **Format tanggal** ditangani di `sekolahData.ts` (helper `formatTanggal`, `formatTanggalPenuh`), bukan di komponen.

---

## Menambah Fitur Baru

### Kasus A: Menambah field pada konten yang sudah ada

Misal ingin menambah field **"penulis"** pada Berita:

1. Buka `src/collections/Posts/index.ts`, tambahkan field:

```ts
{
  name: 'author',
  type: 'text',
  label: 'Penulis',
}
```

2. Buat & jalankan migrasi:

```bash
pnpm payload migrate:create
pnpm payload migrate
```

3. Generate ulang TypeScript types:

```bash
pnpm generate:types
```

4. Kalau perlu ditampilkan, sesuaikan `getBerita()` di `sekolahData.ts` dan komponennya.

### Kasus B: Menambah bagian/collection baru

Misal ingin **Prestasi Siswa** terpisah dari Berita:

1. Buat `src/collections/Prestasi/index.ts` (contoh: tiru `Agenda/index.ts`)
2. Daftarkan di `src/payload.config.ts`:

```ts
import { Prestasi } from './collections/Prestasi'
// ...
collections: [..., Prestasi],
```

3. Buat migrasi:

```bash
pnpm payload migrate:create && pnpm payload migrate && pnpm generate:types
```

4. Tambahkan fungsi pengambil di `sekolahData.ts`:

```ts
export async function getPrestasi(limit = 6) {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'prestasi',
      draft: false,
      limit,
      where: { _status: { equals: 'published' } },
    })
    return docs.map(...)
  } catch {
    return []
  }
}
```

5. Pakai di halaman.

### Kasus C: Menambah halaman baru

1. Buat folder + `page.tsx` di `src/app/(sekolah)/`, misal `ekstrakurikuler/page.tsx`
2. Tulis seperti halaman lain (async server component, ambil data, fallback, render)
3. Tambahkan link di `src/components/sekolah/Chrome.tsx` pada array `NAV_ITEMS`

### Kasus D: Mengubah tampilan

- **Ganti warna/ukuran/font** → `src/app/(sekolah)/sekolah.css` (pakai CSS variable seperti `var(--navy)`, `var(--gold)`, `var(--gray)`)
- **Ubah struktur HTML** → komponen di `src/app/(sekolah)/*.tsx`
- **Ubah perilaku interaktif** (accordion, tab, lightbox, counter) → `src/components/sekolah/Interactive.tsx`
- **Ubah navbar/footer** → `src/components/sekolah/Chrome.tsx`

### Mengisi ulang data awal

```bash
pnpm seed:sekolah
```

Script ini menghapus data lama pada collection konten sekolah lalu mengisi ulang dari `src/scripts/seed-sekolah.ts`. **Aman dijalankan berulang** dan boleh diedit untuk menyesuaikan data awal.

---

## Perintah yang Tersedia

| Perintah | Fungsi |
|---|---|
| `pnpm dev` | Dev server (http://localhost:3000) |
| `pnpm build` | Build production |
| `pnpm start` | Jalankan hasil build |
| `pnpm lint` | Cek linting |
| `pnpm payload migrate` | Jalankan migrasi database |
| `pnpm payload migrate:create` | Buat file migrasi setelah ubah schema |
| `pnpm generate:types` | Generate ulang TypeScript types |
| `pnpm seed:sekolah` | Isi data awal konten sekolah |
| `pnpm test:int` | Integration test (vitest) |
| `pnpm test:e2e` | End-to-end test (playwright) |

---

## Deploy

Project **tidak memakai Docker** — database sudah di Supabase (cloud), jadi aplikasi cukup dijalankan sebagai aplikasi Node.js biasa.

### Vercel (paling mudah)

1. Hubungkan repo GitHub ke Vercel
2. Set environment variable di dashboard Vercel (isi sesuai `.env.example`)
3. **Build command**:

```bash
pnpm payload migrate && pnpm build
```

### VPS / server biasa

```bash
pnpm install
pnpm payload migrate
pnpm build
pnpm start
```

> Sebelum production: ganti `PAYLOAD_SECRET`, `CRON_SECRET`, dan `PREVIEW_SECRET` dengan nilai acak baru.

---

## Troubleshooting

| Gejala | Penyebab & Solusi |
|---|---|
| **Project Supabase paused**, semua query gagal | Supabase free tier auto-pause bila lama tidak aktif. Buka dashboard Supabase → **Restore project**. |
| **`pnpm payload migrate` timeout / menggantung** | Dev server memegang lock database. Hentikan `pnpm dev` dulu, baru jalankan migrasi. |
| **Migrasi bertanya konfirmasi "data loss will occur"** | Wajar saat dev mode sudah pernah `push` schema. Jawab `y`, atau jalankan `echo "y" \| pnpm payload migrate`. |
| **Error `Invariant: static generation store missing` saat seed** | Hook revalidate dipanggil di luar request Next.js. Seed sudah menangani ini via `context: { disableRevalidate: true }` — pastikan opsi itu ada saat menambah operasi create baru. |
| **Halaman admin error hydration (Next 16)** | Sudah dimitigasi lewat `admin.suppressHydrationWarning: true` di `payload.config.ts`. Refresh penuh dengan `Ctrl + Shift + R`. |
| **`Missing <html> and <body> tags in the root layout`** | Route group `(sekolah)` adalah root layout terpisah dan **wajib** punya `<html>` + `<body>`. Jangan dihapus dari `(sekolah)/layout.tsx`. |
| **Konten sudah diisi tapi tidak muncul** | Pastikan statusnya **Published**, bukan Draft. |
| **Gambar tidak tampil** | Gambar harus di-upload lewat menu **Media** dulu, baru dipilih di field upload konten. |
| **`ERR_PNPM_IGNORED_BUILDS`** | Jalankan `pnpm approve-builds`, atau pastikan `pnpm-workspace.yaml` memuat `allowBuilds: esbuild: true`. |

---

## Yang Belum Dikerjakan

Bagian ini memudahkan penerus project mengetahui pekerjaan yang tersisa:

- [ ] **Halaman Program & Kontak** masih statis (belum ada collection CMS-nya)
- [ ] **Halaman detail berita** (`/berita/[slug]`) belum dibuat — kartu berita belum bisa diklik
- [ ] **Formulir kontak** masih demo (belum mengirim email / menyimpan pesan)
- [ ] **Upload gambar nyata** — foto hero dan galeri masih placeholder
- [ ] **Muat Lebih Banyak** di daftar berita belum aktif (masih tombol statis)
- [ ] **Akun admin production** dan penggantian semua secret
- [ ] **Domain sekolah** (`.sch.id`) dan SEO lanjutan
