# Website SDN 3 Way Galih

Website resmi **SDN 3 Way Galih** (Tanjung Bintang, Lampung Selatan) yang dibangun dengan [Next.js](https://nextjs.org) (App Router) dan [Payload CMS](https://payloadcms.com) 3. Konten dikelola lewat admin panel, data disimpan di **Supabase (PostgreSQL)**.

> Project ini berawal dari [Payload Website Template](https://github.com/payloadcms/payload/blob/3.x/templates/website) yang sudah disesuaikan untuk kebutuhan website sekolah.

## Fitur

- **7 halaman website sekolah**: Beranda, Profil, Program, Berita, Galeri, PPDB, dan Kontak
- **Admin panel Payload** untuk mengelola konten (halaman, berita, media, kategori)
- **Database Supabase** (PostgreSQL) dengan sistem migrasi schema
- Draft, live preview, SEO, pencarian, dan redirect (bawaan template Payload)

## Struktur Project

```
src/app/
  (sekolah)/          UI website sekolah (yang tampil ke publik)
    layout.tsx        Topbar, navbar, footer
    page.tsx          Halaman beranda (/)
    profil/ program/ berita/ galeri/ ppdb/ kontak/   Halaman lainnya
    sekolah.css       Styling website sekolah
    img/              Aset gambar (foto hero)
  (payload)/          Admin panel Payload (/admin)
  (frontend)/         Route bawaan template (posts, search, preview)

src/components/sekolah/
  Chrome.tsx          Topbar, Navbar, Footer, BackToTop
  Interactive.tsx     Animasi reveal, counter, accordion, tab berita, lightbox, form kontak

src/collections/      Definisi koleksi Payload (Pages, Posts, Media, dll)
src/payload.config.ts Konfigurasi utama Payload
```

## Menjalankan di Lokal

### Prasyarat

- Node.js sesuai `engines` di `package.json` (22.23.4+ atau 24.22.1+)
- [pnpm](https://pnpm.io) versi 9 atau lebih baru
- Akses ke project Supabase (connection string database)

### Langkah

```bash
# 1. Install dependency
pnpm install

# 2. Siapkan environment
cp .env.example .env
# lalu isi DATABASE_URL di .env dengan password database Supabase Anda

# 3. Jalankan migrasi database (membuat tabel di Supabase)
pnpm payload migrate

# 4. Jalankan dev server
pnpm dev
```

Buka:

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin (buat user admin pertama saat pertama kali dibuka)

### Environment Variables

| Variabel | Keterangan |
|---|---|
| `DATABASE_URL` | Connection string Postgres Supabase (wajib) |
| `PAYLOAD_SECRET` | Secret untuk enkripsi token login admin (wajib) |
| `NEXT_PUBLIC_SERVER_URL` | URL server, tanpa trailing slash |
| `CRON_SECRET` | Secret untuk endpoint cron (opsional di dev) |
| `PREVIEW_SECRET` | Secret untuk URL preview draft (opsional di dev) |

Detail lengkap ada di `.env.example`.

## Script yang Tersedia

| Perintah | Fungsi |
|---|---|
| `pnpm dev` | Dev server (http://localhost:3000) |
| `pnpm build` | Build production |
| `pnpm start` | Jalankan hasil build |
| `pnpm payload migrate` | Jalankan migrasi database |
| `pnpm payload migrate:create` | Buat file migrasi baru setelah ubah schema |
| `pnpm seed:sekolah` | Isi data awal sekolah (agenda, FAQ, berita, testimoni, profil, PPDB) |
| `pnpm generate:types` | Generate ulang TypeScript types dari schema Payload |
| `pnpm lint` | Cek linting |

## Mengelola Konten (CMS)

1. Buka `http://localhost:3000/admin`
2. Saat pertama kali dibuka, buat akun admin (email + password)
3. Setelah login, tersedia menu berikut pada grup **Konten Sekolah**:

| Menu | Isi |
|---|---|
| **Berita & Kegiatan** | Berita, prestasi, pengumuman (dengan gambar, ringkasan, tanggal terbit) |
| **Agenda Sekolah** | Jadwal kegiatan (tanggal, waktu, lokasi) |
| **FAQ** | Pertanyaan umum, kategori PPDB/Umum |
| **Testimoni Wali Murid** | Kutipan dari wali murid |
| **Galeri** | Foto kegiatan (upload gambar) |
| **Profil Sekolah** | Hero beranda, sambutan, visi-misi, sejarah, info, struktur, statistik, badge |
| **PPDB** | Tahun ajaran, banner, alur, timeline, syarat pendaftaran |
| **Media** | Semua file gambar yang di-upload |

Semua konten tersebut langsung tampil di website setelah dipublikasikan (status **Published**). Bila sebuah bagian belum diisi di CMS, halaman akan menampilkan konten contoh (fallback) agar tampilan tidak kosong.

### Mengisi data awal

```bash
pnpm seed:sekolah
```

Perintah ini mengisi collection dan global dengan konten awal sekolah. Aman dijalankan berulang — data lama pada collection konten sekolah akan diganti.

## Catatan Pengembangan

- Project memakai **pnpm** — gunakan `pnpm`, bukan `npm`/`yarn`, agar lockfile tetap konsisten.
- Schema database dikelola lewat migrasi Payload. Setelah mengubah koleksi/field, jalankan `pnpm payload migrate:create` lalu `pnpm payload migrate`.
- Saat migrasi, hentikan `pnpm dev` dulu agar koneksi database tidak terkunci.
- File `.env` dan `.mcp.json` **tidak boleh di-commit** (sudah ada di `.gitignore`).

## Deploy

Project ini **tidak memakai Docker**. Database sudah di Supabase (cloud), jadi aplikasi cukup dijalankan sebagai aplikasi Node.js biasa:

- **Vercel** (paling mudah): hubungkan repo GitHub, set environment variable dari `.env.example` di dashboard Vercel, dan tambahkan perintah `pnpm payload migrate` di build command sebelum `pnpm build`.
- **VPS / server biasa**: install Node.js + pnpm, clone repo, isi `.env`, lalu:

```bash
pnpm install
pnpm payload migrate
pnpm build
pnpm start
```
