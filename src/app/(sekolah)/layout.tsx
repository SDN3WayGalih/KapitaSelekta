import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { BackToTop, FooterContent, Navbar, TopbarContent } from '@/components/sekolah/Chrome'
import { getProfilSekolah } from '@/utilities/sekolahData'
import { RevealObserver } from '@/components/sekolah/Interactive'

import './sekolah.css'

export const metadata: Metadata = {
  description: 'Website resmi SDN 3 Way Galih: informasi sekolah, berita, kegiatan, dan PPDB.',
  title: {
    default: 'SDN 3 Way Galih | Sekolah Dasar Negeri',
    template: '%s | SDN 3 Way Galih',
  },
}

export default async function SekolahRootLayout({ children }: { children: React.ReactNode }) {
  const profil = await getProfilSekolah()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="id" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <TopbarContent profil={profil} />
          <Navbar ppdbUrl={profil?.ppdbUrl ?? 'https://sd.spmblampung.com'} />
          <main>{children}</main>
          <FooterContent profil={profil} />
          <BackToTop />
          <RevealObserver />
        </Providers>
      </body>
    </html>
  )
}
