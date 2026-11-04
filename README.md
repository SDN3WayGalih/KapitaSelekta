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
| `pnpm generate:types` | Generate ulang TypeScript types dari schema Payload |
| `pnpm lint` | Cek linting |

## Catatan Pengembangan

- **UI sekolah saat ini masih hardcoded** di komponen React (`src/app/(sekolah)/`). Tahap berikutnya adalah menghubungkan konten tersebut ke koleksi Payload agar bisa diedit dari admin panel.
- Project memakai **pnpm** — gunakan `pnpm`, bukan `npm`/`yarn`, agar lockfile tetap konsisten.
- Schema database dikelola lewat migrasi Payload. Setelah mengubah koleksi/field, jalankan `pnpm payload migrate:create` lalu `pnpm payload migrate`.
- File `.env` dan `.mcp.json` **tidak boleh di-commit** (sudah ada di `.gitignore`).

## Deploy

Project bisa di-deploy ke Vercel atau VPS seperti aplikasi Next.js pada umumnya. Pastikan environment variable di atas diset di server, lalu jalankan `pnpm payload migrate` sebelum `pnpm start`.
