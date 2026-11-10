# Perubahan Tautan PPDB → Situs SPMB Eksternal

- **Repo:** SDN3WayGalih/KapitaSelekta
- **Branch:** `fix/ppdb-tautan`
- **Commit:** "Arahkan PPDB ke web resmi PPDB"
- **Tanggal:** 9 Nov 2026
- **File diubah:** 1 (`src/components/sekolah/Chrome.tsx`, 16 insertions, 5 deletions)

## Ringkasan

Tautan PPDB di navbar dialihkan dari halaman internal (`/ppdb`) ke situs SPMB eksternal
(`https://sd.pmblampung.com`). Tautan kini terbuka di tab baru dan ditandai ikon panah
timur laut (↗) agar terlihat sebagai tautan keluar.

## Rincian perubahan (`src/components/sekolah/Chrome.tsx`)

### 1. Import ikon (atas file)

```tsx
import { ArrowUpRight } from 'lucide-react'
```

`lucide-react` sudah terpasang di proyek (v0.563.0), tidak perlu instalasi tambahan.

### 2. Menu PPDB di `NAV_ITEMS` (baris 13)

Sebelum:

```tsx
{ href: '/ppdb', label: 'PPDB' },
```

Sesudah:

```tsx
{ href: 'https://sd.pmblampung.com', label: 'PPDB', external: true },
```

Array `NAV_ITEMS` juga diberi tipe `{ href: string; label: string; external?: boolean }[]`
agar properti `external` bisa dipakai. Daftar ini dipakai bersama oleh menu desktop dan
menu mobile (hamburger hanya menampilkan/menyembunyikan daftar yang sama), jadi perubahan
ini berlaku di keduanya tanpa perubahan tambahan.

### 3. Render tautan navbar (blok `NAV_ITEMS.map`, baris 61–67)

Sebelum:

```tsx
<Link
  key={item.href}
  href={item.href}
  className={`nav-link${pathname === item.href ? ' active' : ''}`}
>
  {item.label}
</Link>
```

Sesudah:

```tsx
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
```

### 4. Tombol emas "PPDB 2026" di topbar (`Topbar()`, baris 25–26)

Sebelum:

```tsx
<Link href="/ppdb" className="btn btn-gold btn-sm">
  PPDB 2026
</Link>
```

Sesudah:

```tsx
<a
  href="https://sd.pmblampung.com"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-gold btn-sm"
>
  PPDB 2026 <ArrowUpRight size={14} style={{ marginLeft: 4 }} />
</a>
```

Karena tujuannya web lain, dipakai tag `<a>` biasa (bukan `<Link>` Next.js).

## Yang TIDAK diubah

- Tautan PPDB di **footer** ("Tautan Cepat", baris 105) — masih mengarah ke `/ppdb`.
- Tombol PPDB di **halaman beranda** (`src/app/(sekolah)/page.tsx`, "Info PPDB" dan
  "Daftar Sekarang") — masih mengarah ke `/ppdb`.
- Halaman internal **`/ppdb`** (`src/app/(sekolah)/ppdb/page.tsx`) — masih ada, saat ini
  menjadi halaman yatim (tidak ada lagi tautan navbar yang mengarah ke sana).