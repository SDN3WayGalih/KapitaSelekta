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

async function run() {
  const payload = await getPayload({ config: configPromise })

  // Seed dijalankan di luar request Next.js, jadi hook revalidate dimatikan.
  const ctx = { disableRevalidate: true }

  payload.logger.info('— Membersihkan data lama...')
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
  payload.logger.info('— Mengisi Agenda...')
  const agendaData = [
    { date: '2026-10-10', title: 'Ujian Tengah Semester Ganjil', location: 'Seluruh kelas 1–6', time: '07.30 WIB' },
    { date: '2026-10-28', title: 'Upacara Hari Sumpah Pemuda', location: 'Lapangan sekolah', time: '07.00 WIB' },
    { date: '2026-11-15', title: 'Lomba Mewarnai Tingkat SD se-Kecamatan', location: 'Aula sekolah', time: '08.00 WIB' },
  ]
  for (const item of agendaData) {
    await payload.create({ collection: 'agenda', data: { ...item, _status: 'published' }, context: ctx })
  }

  /* -------------------------------- FAQ ------------------------------- */
  payload.logger.info('— Mengisi FAQ...')
  const faqData = [
    {
      order: 1,
      question: 'Kapan pendaftaran PPDB 2026/2027 dibuka?',
      answer:
        'Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2026. Pendaftaran dapat dilakukan langsung di sekolah atau melalui formulir online yang tersedia di website ini.',
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

  /* ----------------------------- TESTIMONI ---------------------------- */
  payload.logger.info('— Mengisi Testimoni...')
  const testiData = [
    {
      name: 'Ibu Ratna',
      quote: 'Guru-gurunya ramah dan perhatian. Anak saya jadi semangat berangkat sekolah setiap pagi.',
      relation: 'Wali murid kelas 3',
    },
    {
      name: 'Bapak Hendra',
      quote:
        'Fasilitasnya lengkap dan lingkungannya aman. Informasi sekolah juga mudah diakses lewat website ini.',
      relation: 'Wali murid kelas 5',
    },
  ]
  for (const item of testiData) {
    await payload.create({ collection: 'testimoni', data: { ...item, _status: 'published' }, context: ctx })
  }

  /* -------------------------------- BERITA ---------------------------- */
  payload.logger.info('— Mengisi Berita...')
  const beritaData: {
    title: string
    postType: 'berita' | 'prestasi' | 'pengumuman'
    excerpt: string
    slug: string
    publishedAt: string
  }[] = [
    {
      excerpt: 'Website resmi sekolah kini hadir sebagai sarana informasi dan publikasi kegiatan.',
      postType: 'berita',
      publishedAt: '2026-09-20T08:00:00.000Z',
      slug: 'website-resmi-sekolah',
      title: 'SDN 3 Way Galih Luncurkan Website Resmi Sekolah',
    },
    {
      excerpt: 'Siswa kelas 5 berhasil meraih juara pertama pada lomba matematika tingkat kecamatan.',
      postType: 'prestasi',
      publishedAt: '2026-09-12T08:00:00.000Z',
      slug: 'juara-1-lomba-matematika',
      title: 'Siswa SDN 3 Way Galih Juara 1 Lomba Matematika Tingkat Kecamatan',
    },
    {
      excerpt: 'Upacara bendera perdana semester ganjil berlangsung khidmat di lapangan sekolah.',
      postType: 'berita',
      publishedAt: '2026-09-05T08:00:00.000Z',
      slug: 'upacara-bendera-perdana',
      title: 'Upacara Bendera Perdana Semester Ganjil Berjalan Khidmat',
    },
    {
      excerpt: 'Jadwal resmi penerimaan peserta didik baru tahun ajaran 2026/2027 telah diumumkan.',
      postType: 'pengumuman',
      publishedAt: '2026-08-28T08:00:00.000Z',
      slug: 'jadwal-ppdb-diumumkan',
      title: 'Jadwal PPDB Tahun Ajaran 2026/2027 Resmi Diumumkan',
    },
    {
      excerpt: 'Berbagai lomba memeriahkan peringatan HUT Kemerdekaan RI di lingkungan sekolah.',
      postType: 'berita',
      publishedAt: '2026-08-17T08:00:00.000Z',
      slug: 'semarak-lomba-17-agustus',
      title: 'Semarak Lomba 17 Agustus: Merdeka Belajar, Merdeka Berkreasi',
    },
    {
      excerpt: 'Tim futsal sekolah berhasil melaju ke babak final turnamen antar-SD.',
      postType: 'prestasi',
      publishedAt: '2026-08-08T08:00:00.000Z',
      slug: 'tim-futsal-melaju-final',
      title: 'Tim Futsal Sekolah Melaju ke Final Turnamen Antar-SD',
    },
  ]
  for (const item of beritaData) {
    const existing = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: item.slug,
        },
      },
      limit: 1,
    })

    const postPayload = {
      ...item,
      _status: 'published' as const,
      content: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: item.excerpt,
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              type: 'paragraph',
              version: 1,
            },
          ],
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
  payload.logger.info('— Mengisi Profil Sekolah...')
  await payload.updateGlobal({
    slug: 'profil-sekolah',
    data: {
      badgeItems: [
        { icon: 'award', label: 'Akreditasi A' },
        { icon: 'school', label: 'Sekolah Penggerak' },
        { icon: 'shield', label: 'Bebas Bullying' },
        { icon: 'academic', label: 'Guru Bersertifikasi' },
        { icon: 'leaf', label: 'Lingkungan Asri' },
      ],
      footerAddress: 'Jl. Pendidikan No. 3, Way Galih\nKec. Tanjung Bintang, Lampung Selatan',
      footerTagline: 'Mewujudkan peserta didik yang cerdas, berkarakter, dan berakhlak mulia.',
      heroBadge: 'Selamat Datang di Website Resmi',
      heroDescription:
        'Sekolah dasar negeri yang menghadirkan lingkungan belajar yang aman, menyenangkan, dan penuh prestasi untuk putra-putri Anda.',
      heroSubtitle: 'Mencetak Generasi Cerdas & Berkarakter',
      heroTitle: 'SDN 3 Way Galih',
      infoItems: [
        { label: 'NPSN', value: '1080XXXX' },
        { label: 'Status', value: 'Negeri' },
        { label: 'Akreditasi', value: 'A' },
        { label: 'Kurikulum', value: 'Kurikulum Merdeka' },
        { label: 'Jumlah Rombel', value: '12 Rombongan Belajar' },
        { label: 'Jam Belajar', value: 'Senin – Jumat, 07.00 – 12.30' },
      ],
      misi: [
        { misiItem: 'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan.' },
        { misiItem: 'Menanamkan nilai karakter dan akhlak mulia dalam setiap kegiatan.' },
        { misiItem: 'Mengembangkan potensi peserta didik melalui kegiatan ekstrakurikuler.' },
        { misiItem: 'Mewujudkan lingkungan sekolah yang bersih, hijau, dan sehat.' },
        { misiItem: 'Menjalin kemitraan yang harmonis dengan orang tua dan masyarakat.' },
      ],
      sambutanName: 'Drs. H. Nama Kepala Sekolah, M.Pd.',
      sambutanQuote:
        "Assalamu'alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi SDN 3 Way Galih. Website ini kami hadirkan sebagai sarana informasi, publikasi kegiatan, dan jembatan komunikasi antara sekolah dengan orang tua serta masyarakat. Mari bersama-sama memajukan pendidikan anak-anak kita.",
      sambutanTitle: 'Kepala SDN 3 Way Galih',
      sejarah:
        'SDN 3 Way Galih adalah sekolah dasar negeri yang berlokasi di Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan. Sejak berdiri, sekolah ini berkomitmen memberikan layanan pendidikan dasar yang berkualitas bagi masyarakat sekitar.\n\nDengan dukungan guru-guru bersertifikasi dan fasilitas yang terus ditingkatkan, SDN 3 Way Galih telah meluluskan ribuan siswa yang melanjutkan ke jenjang pendidikan yang lebih tinggi dengan bekal ilmu dan karakter yang kuat.',
      statItems: [
        { label: 'Siswa Aktif', suffix: '+', value: 300 },
        { label: 'Guru & Tendik', suffix: '+', value: 25 },
        { label: 'Rombongan Belajar', value: 12 },
        { label: 'Prestasi Diraih', suffix: '+', value: 50 },
      ],
      struktur: [
        { name: 'Drs. H. Nama Kepala Sekolah, M.Pd.', position: 'Kepala Sekolah' },
        { name: 'Nama Wakil, S.Pd.', position: 'Wakil Kepala Sekolah' },
        { name: 'Nama TU, S.E.', position: 'Kepala Tata Usaha' },
        { name: 'Nama Komite', position: 'Ketua Komite Sekolah' },
      ],
      topbarEmail: 'info@sdn3waygalih.sch.id',
      topbarPhone: '(0721) 123456',
      visi: 'Terwujudnya peserta didik yang cerdas, berkarakter, berakhlak mulia, dan berwawasan lingkungan.',
    },
  })

  /* --------------------------------- PPDB ----------------------------- */
  payload.logger.info('— Mengisi PPDB...')
  await payload.updateGlobal({
    slug: 'ppdb',
    data: {
      academicYear: '2026/2027',
      bannerDescription: 'Daftarkan putra-putri Anda sekarang. Kuota terbatas, pendaftaran gratis dan mudah.',
      bannerTitle: 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027 Telah Dibuka!',
      requirements: [
        { requirement: 'Fotokopi Kartu Keluarga (KK) — 2 lembar' },
        { requirement: 'Fotokopi Akta Kelahiran — 2 lembar' },
        { requirement: 'Pas foto anak ukuran 3x4 — 2 lembar' },
        { requirement: 'Usia minimal 6 tahun pada 1 Juli 2026' },
        { requirement: 'Mengisi formulir pendaftaran yang telah disediakan' },
      ],
      steps: [
        { description: 'Ambil formulir di sekolah atau unduh dari website ini.', title: 'Isi Formulir' },
        {
          description: 'Serahkan formulir beserta dokumen persyaratan ke panitia PPDB.',
          title: 'Serahkan Berkas',
        },
        { description: 'Panitia memverifikasi kelengkapan berkas pendaftaran.', title: 'Verifikasi' },
        {
          description: 'Hasil seleksi diumumkan di papan pengumuman dan website.',
          title: 'Pengumuman',
        },
      ],
      timeline: [
        {
          date: '1 – 30 Jun',
          description: 'Pengisian formulir dan penyerahan berkas di sekolah.',
          title: 'Pendaftaran',
        },
        {
          date: '1 – 5 Jul',
          description: 'Pemeriksaan kelengkapan dokumen oleh panitia.',
          title: 'Verifikasi Berkas',
        },
        { date: '8 Jul', description: 'Diumumkan di sekolah dan website resmi.', title: 'Pengumuman Hasil' },
        {
          date: '9 – 12 Jul',
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
