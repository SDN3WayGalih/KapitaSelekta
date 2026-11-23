import { postgresAdapter } from '@payloadcms/db-postgres'
import { id } from '@payloadcms/translations/languages/id'
import { lexicalId } from './i18n/lexicalId'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Agenda } from './collections/Agenda'
import { Categories } from './collections/Categories'
import { Faq } from './collections/Faq'
import { Galeri } from './collections/Galeri'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Testimoni } from './collections/Testimoni'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Ppdb } from './globals/Ppdb'
import { ProfilSekolah } from './globals/ProfilSekolah'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // Format tanggal Indonesia, mis. "10 November 2026, 14.36"
    dateFormat: "d MMMM yyyy, HH.mm",
    // Suppress React hydration warnings di admin panel (dev-only, Next 16 + Turbopack
    // menyuntikkan <style> yang berbeda antara server dan client).
    // Lihat: https://github.com/payloadcms/payload/issues/16288
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: ' - Admin SDN 3 Way Galih',
    },
    components: {
      // Tampilan admin mengikuti TailAdmin (tailadmin.com); gayanya ada di app/(payload)/custom.scss
      graphics: {
        Icon: '@/components/admin/Graphics#Icon',
        Logo: '@/components/admin/Graphics#Logo',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    dashboard: {
      widgets: [
        {
          slug: 'panduan',
          Component: '@/components/admin/dashboard/Panduan',
          label: 'Panduan singkat',
          minWidth: 'large',
        },
        {
          slug: 'ringkasan',
          Component: '@/components/admin/dashboard/Ringkasan',
          label: 'Ringkasan konten',
          minWidth: 'medium',
        },
        {
          slug: 'berita-terbaru',
          Component: '@/components/admin/dashboard/BeritaTerbaru',
          label: 'Berita terbaru',
          minWidth: 'medium',
        },
        {
          slug: 'agenda-mendatang',
          Component: '@/components/admin/dashboard/AgendaMendatang',
          label: 'Agenda mendatang',
          minWidth: 'small',
        },
        {
          slug: 'aksi-cepat',
          Component: '@/components/admin/dashboard/AksiCepat',
          label: 'Aksi cepat',
          minWidth: 'medium',
        },
      ],
      defaultLayout: [
        { widgetSlug: 'ringkasan', width: 'full' },
        { widgetSlug: 'berita-terbaru', width: 'large' },
        { widgetSlug: 'agenda-mendatang', width: 'small' },
        { widgetSlug: 'aksi-cepat', width: 'full' },
        { widgetSlug: 'panduan', width: 'full' },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  // Urutan ini juga urutan menu di sidebar admin: konten sekolah dulu.
  collections: [Posts, Agenda, Galeri, Faq, Testimoni, Media, Pages, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [ProfilSekolah, Ppdb, Header, Footer],
  plugins,
  // Koleksi folder dibuat Payload setelah plugin berjalan, jadi namanya diatur di sini
  folders: {
    collectionOverrides: [
      ({ collection }) => ({
        ...collection,
        labels: { singular: 'Folder', plural: 'Folder' },
        admin: { ...collection.admin, hideAPIURL: true },
      }),
    ],
  },
  // Panel admin sepenuhnya berbahasa Indonesia. Beberapa istilah dibuat lebih
  // gamblang untuk admin sekolah yang tidak terbiasa dengan CMS.
  i18n: {
    fallbackLanguage: 'id',
    supportedLanguages: { id },
    translations: {
      id: {
        general: {
          payloadSettings: 'Pengaturan Tampilan',
          untitled: 'Belum ada judul',
          createNew: 'Tambah Baru',
          noLabel: '(belum diisi)',
        },
        version: {
          publishChanges: 'Terbitkan ke Website',
          saveDraft: 'Simpan Draf (belum tampil)',
          unpublish: 'Sembunyikan dari Website',
        },
        upload: {
          dragAndDropHere: 'atau tarik foto ke sini',
        },
        fields: {
          chooseFromExisting: 'Pilih dari Media',
        },
        folder: {
          browseByFolder: 'Folder Media',
        },
        lexical: lexicalId,
      },
    },
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
