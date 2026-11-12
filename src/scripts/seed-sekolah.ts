/**
 * Seed konten awal website SDN 3 Way Galih.
 *
 * Jalankan: pnpm seed:sekolah
 *
 * Script ini mengisi collection dan global Payload dengan konten
 * statis yang sebelumnya ditulis langsung di komponen React.
 * Aman dijalankan berulang: data lama dihapus lebih dulu.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { DUMMY_BERITA_DETAIL_LIST } from '../utilities/sekolahData'

async function run() {
  const payload = await getPayload({ config: configPromise })

  // Seed dijalankan di luar request Next.js, jadi hook revalidate dimatikan.
  const ctx = { disableRevalidate: true }

  payload.logger.info('Membersihkan data lama...')
  for (const collection of ['agenda', 'faq', 'galeri', 'testimoni', 'posts'] as const){
    const existing = await payload.find({collection, limit: 500, depth: 0})
    for (const doc of existing.docs){
      await payload.delete({
        collection,
        id: doc.id,
        context: ctx
      })
    }
  }

  /* ------------------------------ AGENDA ------------------------------ */
  payload.logger.info('Mengisi Agenda...')
  const agendaData = [
    { date: '2026-10-10', title: 'Penilaian Tengah Semester Ganjil', location: 'Seluruh kelas 1-6', time: '07.30 WIB' },
    { date: '2026-10-28', title: 'Upacara Hari Sumpah Pemuda', location: 'Lapangan sekolah', time: '07.00 WIB' },
    { date: '2026-11-15', title: 'Lomba Kreativitas dan Seni Siswa', location: 'Aula sekolah', time: '08.00 WIB' },
  ]
  for (const item of agendaData) {
    await payload.create({ collection: 'agenda', data: { ...item, _status: 'published' }, context: ctx })
  }

  /* -------------------------------- FAQ ------------------------------- */
  payload.logger.info('Mengisi FAQ...')
  const faqData = [
    {
      order: 1,
      question: 'Kapan pendaftaran PPDB 2026/2027 dibuka?',
      answer:
        'Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2026 langsung di sekretariat sekolah.',
    },
    {
      order: 2,
      question: 'Apa saja syarat pendaftaran?',
      answer:
        'Fotokopi Kartu Keluarga, fotokopi Akta Kelahiran, pas foto anak ukuran 3x4 (2 lembar), dan mengisi formulir pendaftaran yang telah disediakan.',
    },
    {
      order: 3,
      question: 'Apakah ada biaya pendaftaran?',
      answer: 'Tidak ada. Seluruh proses pendaftaran peserta didik baru di SDN 3 Way Galih gratis.',
    },
    {
      order: 4,
      question: 'Berapa usia minimal calon siswa kelas 1?',
      answer: 'Usia minimal 6 tahun pada tanggal 1 Juli 2026, dibuktikan dengan Akta Kelahiran.',
    },
  ]
  for (const item of faqData) {
    await payload.create({
      collection: 'faq',
      data: { ...item, category: 'ppdb', _status: 'published' },
      context: ctx,
    })
  }

  /* -------------------------------- BERITA ---------------------------- */
  payload.logger.info('Mengisi Berita...')
  for (const item of DUMMY_BERITA_DETAIL_LIST) {
    const existing = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: item.slug,
        },
      },
      limit: 1,
    })

    const children = item.paragraphs.map((para) => ({
      children: [
        {
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: para,
          type: 'text',
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'paragraph',
      version: 1,
    }))

    const postPayload = {
      title: item.title,
      slug: item.slug,
      postType: item.category,
      excerpt: item.excerpt,
      _status: 'published' as const,
      publishedAt: new Date().toISOString(),
      content: {
        root: {
          children,
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
    }

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        context: ctx,
        data: postPayload,
      })
    } else {
      await payload.create({
        collection: 'posts',
        context: ctx,
        data: postPayload,
      })
    }
  }

  /* ---------------------------- PROFIL SEKOLAH ------------------------ */
  payload.logger.info('Mengisi Profil Sekolah...')
  await payload.updateGlobal({
    slug: 'profil-sekolah',
    data: {
      badgeItems: [
        { icon: 'award', label: 'Akreditasi A' },
        { icon: 'school', label: 'Sekolah Penggerak' },
        { icon: 'shield', label: 'Bebas Perundungan' },
        { icon: 'academic', label: 'Guru Bersertifikasi' },
        { icon: 'leaf', label: 'Lingkungan Asri' },
      ],
      footerAddress: 'Jln. Desa nagaria No.Kel, Way Galih\nKec. Tj. Bintang, Kabupaten Lampung Selatan, Lampung 35361',
      footerTagline: 'Mewujudkan peserta didik yang cerdas, berkarakter, dan berakhlak mulia.',
      heroBadge: 'Website Resmi',
      heroDescription:
        'Mewujudkan lingkungan pendidikan dasar yang aman, disiplin, berakhlak mulia, dan berorientasi pada perkembangan karakter serta potensi setiap peserta didik.',
      heroSubtitle: 'Sekolah Dasar Negeri Tanjung Bintang',
      heroTitle: 'SDN 3 Way Galih',
      infoItems: [
        { label: 'NPSN', value: '10801831' },
        { label: 'Status', value: 'Negeri' },
        { label: 'Akreditasi', value: 'Peringkat A' },
        { label: 'Kurikulum', value: 'Kurikulum Merdeka' },
        { label: 'Jumlah Rombel', value: '12 Rombongan Belajar' },
        { label: 'Jam Belajar', value: 'Senin - Jumat, 07.00 - 12.30 WIB' },
      ],
      misi: [
        { misiItem: 'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan.' },
        { misiItem: 'Menanamkan nilai karakter dan akhlak mulia dalam setiap kegiatan.' },
        { misiItem: 'Mengembangkan potensi peserta didik melalui kegiatan ekstrakurikuler.' },
        { misiItem: 'Mewujudkan lingkungan sekolah yang bersih, hijau, dan sehat.' },
        { misiItem: 'Menjalin kemitraan yang harmonis dengan orang tua dan masyarakat.' },
      ],
      sambutanName: 'Kepala Sekolah',
      sambutanQuote:
        "Assalamu'alaikum warahmatullahi wabarakatuh. Selamat datang di portal resmi SDN 3 Way Galih. Website ini kami hadirkan sebagai sarana informasi resmi seputar kegiatan akademik, program kesiswaan, tata tertib, dan alur penerimaan peserta didik baru bagi seluruh orang tua dan masyarakat.",
      sambutanTitle: 'SDN 3 Way Galih, Tanjung Bintang',
      sejarah:
        'SDN 3 Way Galih adalah sekolah dasar negeri yang berlokasi di Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan. Sejak berdiri, sekolah ini berkomitmen memberikan layanan pendidikan dasar yang berkualitas bagi masyarakat sekitar.\n\nDengan dukungan guru-guru bersertifikasi dan fasilitas yang terus ditingkatkan, SDN 3 Way Galih telah meluluskan ribuan siswa yang melanjutkan ke jenjang pendidikan yang lebih tinggi dengan bekal ilmu dan karakter yang kuat.',
      statItems: [
        { label: 'Akreditasi', suffix: '', value: 1 },
        { label: 'Rombongan Belajar', suffix: '', value: 12 },
      ],
      struktur: [
        { name: 'Kepala Sekolah', position: 'Pimpinan Lembaga' },
        { name: 'Koordinator Kurikulum', position: 'Bidang Kurikulum & Akademik' },
        { name: 'Tata Usaha', position: 'Administrasi & Data Pokok' },
        { name: 'Komite Sekolah', position: 'Kemitraan & Perwakilan Wali Murid' },
      ],
      topbarEmail: 'info@sdn3waygalih.sch.id',
      topbarPhone: '(0721) 123456',
      visi: 'Terwujudnya peserta didik yang cerdas, berkarakter, berakhlak mulia, dan berwawasan lingkungan.',
    },
  })

  /* --------------------------------- PPDB ----------------------------- */
  payload.logger.info('Mengisi PPDB...')
  await payload.updateGlobal({
    slug: 'ppdb',
    data: {
      academicYear: '2026/2027',
      bannerDescription: 'Informasi jadwal tahapan, persyaratan administrasi, dan alur pendaftaran siswa baru.',
      bannerTitle: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
      requirements: [
        { requirement: 'Fotokopi Kartu Keluarga (KK), 2 lembar' },
        { requirement: 'Fotokopi Akta Kelahiran, 2 lembar' },
        { requirement: 'Pas foto anak ukuran 3x4, 2 lembar' },
        { requirement: 'Usia minimal 6 tahun pada 1 Juli 2026' },
        { requirement: 'Mengisi formulir pendaftaran yang disediakan panitia' },
      ],
      steps: [
        { description: 'Ambil formulir di sekretariat panitia PPDB sekolah pada jam pelayanan.', title: 'Pengambilan Formulir' },
        {
          description: 'Serahkan formulir yang telah diisi beserta berkas persyaratan administrasi ke panitia PPDB.',
          title: 'Penyerahan Dokumen',
        },
        { description: 'Panitia memverifikasi keabsahan data kependudukan dan usia calon peserta didik.', title: 'Verifikasi Data' },
        {
          description: 'Hasil seleksi diumumkan di papan pengumuman dan website.',
          title: 'Pengumuman',
        },
      ],
      timeline: [
        {
          date: '1 - 30 Jun',
          description: 'Pengisian formulir dan penyerahan berkas di sekolah.',
          title: 'Pendaftaran',
        },
        {
          date: '1 - 5 Jul',
          description: 'Pemeriksaan kelengkapan dokumen oleh panitia.',
          title: 'Verifikasi Berkas',
        },
        { date: '8 Jul', description: 'Diumumkan di sekolah dan website resmi.', title: 'Pengumuman Hasil' },
        {
          date: '9 - 12 Jul',
          description: 'Konfirmasi ulang bagi calon siswa yang diterima.',
          title: 'Daftar Ulang',
        },
      ],
    },
  })

  payload.logger.info('✅ Seed selesai. Data sekolah sudah tersimpan di database.')
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seed gagal:', err)
  process.exit(1)
})
