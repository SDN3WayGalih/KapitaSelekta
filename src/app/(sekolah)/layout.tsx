import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { BackToTop, Footer, Navbar, Topbar } from '@/components/sekolah/Chrome'

import './sekolah.css'

export const metadata: Metadata = {
  description: 'Website resmi SDN 3 Way Galih: informasi sekolah, berita, kegiatan, dan PPDB.',
  title: {
    default: 'SDN 3 Way Galih | Sekolah Dasar Negeri',
    template: '%s | SDN 3 Way Galih',
  },
}

export default function SekolahRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="id" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <Topbar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}
