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
/* Berita (Posts) & Detail Berita                                     */
/* ------------------------------------------------------------------ */

export type BeritaDetail = {
  slug: string
  title: string
  category: 'berita' | 'prestasi' | 'pengumuman'
  categoryLabel: string
  date: string
  author: string
  readTime: string
  excerpt: string
  thumbClass: string
  paragraphs: string[]
  subheadings?: { title: string; content: string[] }[]
  keyPoints?: string[]
  quote?: { text: string; source: string }
  tags: string[]
}

export const DUMMY_BERITA_DETAIL_LIST: BeritaDetail[] = [
  {
    slug: 'website-resmi-sekolah',
    title: 'SDN 3 Way Galih Luncurkan Website Resmi Sekolah',
    category: 'berita',
    categoryLabel: 'Berita',
    date: '20 Sep 2026',
    author: 'Humas SDN 3 Way Galih',
    readTime: '3 menit baca',
    excerpt:
      'Website resmi sekolah kini hadir sebagai sarana informasi, keterbukaan publik, dan publikasi kegiatan bagi seluruh warga sekolah.',
    thumbClass: 'thumb-1',
    paragraphs: [
      'Dalam rangka menyongsong era transformasi digital dan meningkatkan keterbukaan informasi publik, SDN 3 Way Galih secara resmi meluncurkan portal website sekolah beralamat resmi. Peluncuran ini menjadi tonggak penting dalam upaya sekolah memberikan pelayanan informasi yang cepat, transparan, dan terpercaya bagi seluruh orang tua, siswa, serta masyarakat umum.',
      'Acara peluncuran website dihadiri langsung oleh Kepala Sekolah, segenap dewan guru, perwakilan komite sekolah, serta perwakilan pengurus paguyuban wali murid. Platform ini dirancang dengan antarmuka yang bersih, responsif di semua perangkat ponsel cerdas, serta mengutamakan kemudahan navigasi.',
    ],
    subheadings: [
      {
        title: 'Komitmen Keterbukaan Informasi dan Literasi Digital',
        content: [
          'Kepala SDN 3 Way Galih menyampaikan bahwa di era modern saat ini, kehadiran website institusi pendidikan bukan lagi pelengkap, melainkan kebutuhan esensial. Melalui portal ini, orang tua dapat memantau kalender kegiatan akademik, jadwal ujian, program ekstrakurikuler, dan perkembangan sekolah secara real-time.',
          'Platform ini juga menjadi media apresiasi dan publikasi karya serta prestasi siswa dan guru, sekaligus mempermudah masyarakat luar untuk mengenal profil keunggulan SDN 3 Way Galih.',
        ],
      },
      {
        title: 'Fitur dan Kanal Layanan Terpadu',
        content: [
          'Website resmi sekolah memuat berbagai kanal informasi terpadu yang dapat diakses dengan mudah:',
        ],
      },
    ],
    keyPoints: [
      'Profil lengkap sekolah, visi misi terukur, dan susunan dewan guru profesional.',
      'Berita terkini, liputan prestasi lomba akademik & non-akademik, serta dokumentasi galeri foto kegiatan belajar.',
      'Sistem informasi terintegrasi untuk alur pendaftaran, jadwal, berkas persyaratan, dan formulir PPDB online.',
      'Jadwal agenda kegiatan sekolah, kalender pendidikan semesteran, serta saluran kontak pengaduan dan saran.',
    ],
    quote: {
      text: 'Website ini kami hadirkan sebagai jembatan silaturahmi dan kemitraan erat antara pihak sekolah, dewan guru, dan seluruh wali murid demi mendampingi tumbuh kembang putra-putri kita dengan optimal.',
      source: 'Kepala SDN 3 Way Galih',
    },
    tags: ['Digitalisasi', 'Informasi', 'Website', 'Sekolah Penggerak'],
  },
  {
    slug: 'juara-1-lomba-matematika',
    title: 'Siswa SDN 3 Way Galih Juara 1 Lomba Matematika Tingkat Kecamatan',
    category: 'prestasi',
    categoryLabel: 'Prestasi',
    date: '12 Sep 2026',
    author: 'Koordinator Pembina Prestasi',
    readTime: '4 menit baca',
    excerpt:
      'Siswa kelas 5 berhasil meraih juara pertama pada lomba matematika tingkat kecamatan setelah bersaing ketat dengan puluhan sekolah.',
    thumbClass: 'thumb-2',
    paragraphs: [
      'Prestasi membanggakan kembali ditorehkan oleh siswa SDN 3 Way Galih di ajang kompetisi sains dan logika. Pada perhelatan Olimpiade Matematika dan Sains Tingkat Kecamatan yang diselenggarakan akhir pekan lalu, ananda Ahmad Fauzi, siswa berprestasi dari kelas 5A, sukses membawa pulang medali emas sebagai Juara 1.',
      'Ajang bergengsi tahunan ini diikuti oleh lebih dari 45 peserta terbaik yang merupakan perwakilan terpilih dari seluruh sekolah dasar negeri dan swasta se-kecamatan. Tahapan kompetisi berlangsung ketat melalui babak penyisihan teori tertulis, penalaran logika analitis, hingga sesi adu cepat tangkas pemecahan studi kasus geometri.',
    ],
    subheadings: [
      {
        title: 'Perjalanan Latihan dan Dedikasi Bimbingan',
        content: [
          'Capaian gemilang ini tidak diraih secara instan, melainkan melalui kerja keras, latihan disiplin, dan bimbingan terarah oleh guru pembina olimpiade sekolah selama dua bulan penuh menjelang perlombaan.',
          'Materi pembinaan difokuskan pada penguasaan soal-soal bernalar tinggi (Higher Order Thinking Skills / HOTS), pemahaman pola bilangan majemuk, logika aritmatika praktis, serta teknik manajemen waktu saat menghadapi soal-soal bertingkat.',
        ],
      },
      {
        title: 'Langkah Lanjutan Menuju Tingkat Kabupaten',
        content: [
          'Keberhasilan ini menghantarkan ananda Ahmad Fauzi menjadi wakil tunggal dari kecamatan untuk melaju ke Olimpiade Matematika Tingkat Kabupaten yang akan datang. Pihak sekolah telah menyiapkan program mentoring khusus untuk mematangkan kesiapan mental dan penguasaan materi lanjutan.',
        ],
      },
    ],
    keyPoints: [
      'Meraih skor sempurna pada babak eksplorasi penalaran geometri dan pemecahan masalah analitik.',
      'Menerima trofi kejuaraan, medali emas, dan piagam penghargaan dari Koordinator Wilayah Pendidikan Kecamatan.',
      'Mendapatkan beasiswa pembinaan prestasi belajar dari pihak komite dan sekolah.',
    ],
    quote: {
      text: 'Matematika itu bukan sekadar menghafal rumus, melainkan belajar bagaimana cara berpikir logis, runtut, dan pantang menyerah mencari solusi.',
      source: 'Guru Pembimbing Olimpiade Sains',
    },
    tags: ['Prestasi', 'Olimpiade', 'Matematika', 'Siswa Berprestasi'],
  },
  {
    slug: 'upacara-bendera-perdana',
    title: 'Upacara Bendera Perdana Semester Ganjil Berjalan Khidmat',
    category: 'berita',
    categoryLabel: 'Berita',
    date: '5 Sep 2026',
    author: 'Bidang Kesiswaan',
    readTime: '3 menit baca',
    excerpt:
      'Upacara bendera perdana semester ganjil berlangsung khidmat di lapangan sekolah dengan penekanan nilai-nilai karakter dan kedisiplinan.',
    thumbClass: 'thumb-3',
    paragraphs: [
      'Mengawali aktivitas pekan perdana pembelajaran semester ganjil tahun ajaran baru, keluarga besar SDN 3 Way Galih melaksanakan upacara bendera dengan suasana yang sangat khidmat, tertib, dan penuh semangat di lapangan utama sekolah.',
      'Upacara diikuti oleh seluruh peserta didik dari kelas 1 sampai kelas 6, kepala sekolah, jajaran dewan guru, serta tenaga kependidikan. Seluruh peserta upacara mengenakan seragam putih-merah lengkap dengan topi dan dasi sebagai wujud kedisiplinan berbusana.',
    ],
    subheadings: [
      {
        title: 'Amanat Pembina: Disiplin Diri dan Karakter Berkeadaban',
        content: [
          'Bertindak selaku pembina upacara, Kepala Sekolah menyampaikan pesan mengenai pentingnya menanamkan Profil Pelajar Pancasila dalam keseharian. Beliau mengajak seluruh siswa untuk memupuk rasa saling menghargai, menjauhi perilaku perundungan (bullying), serta giat merawat kebersihan ruang kelas dan halaman sekolah.',
          'Beliau juga menyapa hangat para peserta didik baru kelas 1 yang kini telah resmi menjadi bagian dari keluarga besar SDN 3 Way Galih, memotivasi mereka untuk berani bertanya dan bersahabat dengan semua teman.',
        ],
      },
      {
        title: 'Petugas Upacara dan Paduan Suara Tampil Memukau',
        content: [
          'Pasukan pengibar bendera yang dipercayakan kepada siswa kelas 6 menjalankan prosesi pengibaran Sang Saka Merah Putih dengan langkah tegap dan sinkron. Tim paduan suara sekolah juga melantunkan lagu kebangsaan Indonesia Raya dan Mengheningkan Cipta dengan harmonisasi yang menggetarkan.',
        ],
      },
    ],
    keyPoints: [
      'Penegasan komitmen sekolah sebagai lingkungan belajar ramah anak dan bebas perundungan.',
      'Pemberian apresiasi piala bergilir kepada kelas terbersih dan terdisiplin pekan ini.',
      'Pembiasaan ikrar janji siswa untuk rajin belajar, patuh pada guru dan orang tua.',
    ],
    quote: {
      text: 'Sekolah bukan hanya tempat menuntut ilmu pengetahuan, melainkan rumah kedua tempat kita melatih pekerti mulia, ketulusan, dan adab yang baik.',
      source: 'Kepala Sekolah SDN 3 Way Galih',
    },
    tags: ['Upacara', 'Kesiswaan', 'Kedisiplinan', 'Pendidikan Karakter'],
  },
  {
    slug: 'jadwal-ppdb-diumumkan',
    title: 'Jadwal PPDB Tahun Ajaran 2026/2027 Resmi Diumumkan',
    category: 'pengumuman',
    categoryLabel: 'Pengumuman',
    date: '28 Agu 2026',
    author: 'Panitia PPDB 2026',
    readTime: '4 menit baca',
    excerpt:
      'Jadwal resmi penerimaan peserta didik baru tahun ajaran 2026/2027 telah diumumkan beserta alur, kuota, dan persyaratan dokumen lengkap.',
    thumbClass: 'thumb-1',
    paragraphs: [
      'Panitia Penerimaan Peserta Didik Baru (PPDB) SDN 3 Way Galih secara resmi mempublikasikan pengumuman jadwal pelaksanaan, alur pendaftaran, kuota rombongan belajar, dan persyaratan berkas untuk calon siswa baru tahun pelajaran 2026/2027.',
      'Penyampaian informasi ini dilakukan secara transparan melalui papan pengumuman sekolah, surat pemberitahuan ke lingkungan sekitar, serta portal website resmi sekolah agar seluruh orang tua dapat mempersiapkan dokumen yang dibutuhkan dengan matang.',
    ],
    subheadings: [
      {
        title: 'Garis Waktu dan Jadwal Tahapan Pelaksanaan',
        content: [
          'Proses PPDB tahun ini dirancang fleksibel melalui loket pendaftaran di sekolah maupun pendaftaran daring untuk memberikan kenyamanan maksimal bagi para calon wali murid:',
        ],
      },
      {
        title: 'Ketentuan dan Dokumen Persyaratan',
        content: [
          'Sesuai regulasi pendidikan nasional, prioritas utama diberikan kepada calon siswa yang berusia 7 tahun ke atas atau minimal berusia 6 tahun per 1 Juli 2026. Pendaftaran tidak dipungut biaya apapun (100% gratis).',
        ],
      },
    ],
    keyPoints: [
      'Sosialisasi & Konsultasi Berkas Persyaratan: 15 Mei – 31 Mei 2026',
      'Pendaftaran & Verifikasi Dokumen Asli: 1 Juni – 20 Juni 2026 (Pukul 08.00 - 12.00 WIB)',
      'Pengumuman Hasil Seleksi Calon Siswa Baru: 28 Juni 2026',
      'Daftar Ulang dan Pembagian Perlengkapan Siswa: 1 Juli – 5 Juli 2026',
      'Masa Pengenalan Lingkungan Sekolah (MPLS): 13 Juli – 15 Juli 2026',
    ],
    quote: {
      text: 'Kami menyambut dengan tangan terbuka kehadiran calon siswa baru untuk bertumbuh bersama menjadi insan yang cerdas, beriman, dan berakhlak mulia di SDN 3 Way Galih.',
      source: 'Ketua Panitia PPDB 2026',
    },
    tags: ['PPDB 2026', 'Pendaftaran', 'Calon Siswa', 'Pengumuman Resmi'],
  },
  {
    slug: 'semarak-lomba-17-agustus',
    title: 'Semarak Lomba 17 Agustus: Merdeka Belajar, Merdeka Berkreasi',
    category: 'berita',
    categoryLabel: 'Berita',
    date: '17 Agu 2026',
    author: 'Panitia Peringatan HUT RI',
    readTime: '3 menit baca',
    excerpt:
      'Rangkaian lomba tradisional dan edukatif memeriahkan peringatan HUT Kemerdekaan RI di lingkungan sekolah dengan keceriaan siswa.',
    thumbClass: 'thumb-2',
    paragraphs: [
      'Gegap gempita kemeriahan Hari Ulang Tahun ke-81 Kemerdekaan Republik Indonesia terpancar jelas di SDN 3 Way Galih. Ratusan siswa, bapak ibu guru, serta paguyuban wali murid berpadu dalam rangkaian perlombaan bernuansa kebersamaan dan sportivitas yang mengusung tema "Merdeka Belajar, Merdeka Berkreasi".',
      'Halaman dan aula sekolah dipenuhi hiasan merah putih serta umbul-umbul karya daur ulang kreatif siswa. Suasana tawa, sorak-sorai, dan tepuk tangan riuh terdengar sepanjang jalannya aneka perlombaan.',
    ],
    subheadings: [
      {
        title: 'Kategori Perlombaan Kelas Rendah dan Kelas Tinggi',
        content: [
          'Agar seluruh siswa dapat berpartisipasi dengan aman dan riang, cabang lomba disesuaikan dengan kelompok jenjang usia. Kelas 1 sampai 3 berkompetisi dalam lomba memindahkan bendera mini ke dalam botol, balap kelereng dengan sendok, menyanyi lagu kebangsaan, dan mewarnai pahlawan kemerdekaan.',
          'Sedangkan bagi kelas 4 sampai 6, perlombaan melibatkan ketangkasan fisik dan kerja sama regu, seperti lomba tarik tambang antarkelas, cerdas cermat sejarah perjuangan bangsa, balap karung berhelm pengaman, dan memasukkan paku beregu.',
        ],
      },
      {
        title: 'Menghidupkan Spirit Gotong Royong',
        content: [
          'Selain melatih kelincahan dan daya juang, perlombaan ini bertujuan menanamkan empati dan jiwa gotong royong di antara anak-anak sejak bangku sekolah dasar. Seluruh pemenang berhak mendapatkan paket perlengkapan sekolah dan buku ensiklopedia anak.',
        ],
      },
    ],
    keyPoints: [
      'Partisipasi aktif 100% siswa sekolah dari kelas 1 sampai kelas 6.',
      'Melatih sportivitas, daya juang pantang menyerah, dan kolaborasi beregu.',
      'Penyerahan hadiah edukatif, piala apresiasi, dan tumpeng kemerdekaan bersama.',
    ],
    quote: {
      text: 'Semangat pantang menyerah anak-anak saat lomba adalah cerminan semangat para pahlawan kita. Ini momen emas menanamkan cinta tanah air secara menyenangkan.',
      source: 'Koordinator Acara Semarak HUT RI',
    },
    tags: ['HUT RI', 'Lomba Tradisional', 'Kemerdekaan', 'Kegiatan Siswa'],
  },
  {
    slug: 'tim-futsal-melaju-final',
    title: 'Tim Futsal Sekolah Melaju ke Final Turnamen Antar-SD',
    category: 'prestasi',
    categoryLabel: 'Prestasi',
    date: '8 Agu 2026',
    author: 'Pembina Ekstrakurikuler Olahraga',
    readTime: '3 menit baca',
    excerpt:
      'Tim futsal sekolah sukses melangkah ke babak final turnamen antar-SD se-Kabupaten setelah memenangkan duel semifinal dramatis.',
    thumbClass: 'thumb-3',
    paragraphs: [
      'Kabar membanggakan datang dari bidang olahraga. Tim futsal putra kebanggaan SDN 3 Way Galih berhasil mengukir sejarah dengan menembus babak Grand Final Turnamen Futsal Pelajar Antar-SD se-Kabupaten setelah menaklukkan lawan tangguh dalam pertandingan semifinal yang sangat dramatis.',
      'Bertanding di hadapan ratusan suporter di GOR Gelora Pemuda, kedua tim memperagakan permainan sepak bola cepat dan saling berbalas serangan. Skor imbang 2-2 bertahan hingga peluit akhir babak normal dibunyikan oleh wasit.',
    ],
    subheadings: [
      {
        title: 'Penampilan Gemilang di Babak Adu Penalti',
        content: [
          'Ketegangan memuncak saat pertandingan harus ditentukan melalui babak adu tendangan penalti. Penjaga gawang utama SDN 3 Way Galih, ananda Rizky, menjadi bintang lapangan setelah sukses memblok dua tembakan penalti penyerang lawan dengan penyelamatan akrobatik.',
          'Ketenangan ketiga eksekutor penalti sekolah berhasil mengunci kemenangan adu penalti dengan skor 3-2, disambut sorak sujud syukur seluruh pemain dan ofisial tim.',
        ],
      },
      {
        title: 'Menjaga Fokus Menatap Partai Puncak',
        content: [
          'Pelatih tim mengingatkan para pemain untuk tidak cepat puas dan tetap rendah hati. Latihan pemulihan fisik dan evaluasi taktik transisi bertahan telah disiapkan untuk menghadapi laga final yang akan dilangsungkan akhir pekan nanti.',
        ],
      },
    ],
    keyPoints: [
      'Kemenangan dramatis adu penalti 3-2 setelah duel sengit 2-2 di waktu reguler.',
      'Dua penyelamatan krusial kiper mengantarkan tim melaju ke partai puncak.',
      'Dukungan penuh dewan guru dan paguyuban orang tua yang hadir langsung di tribun arena.',
    ],
    quote: {
      text: 'Kunci kemenangan kami adalah disiplin posisi, saling percaya satu sama lain, dan doa dari guru serta orang tua di rumah.',
      source: 'Kapten Tim Futsal SDN 3 Way Galih',
    },
    tags: ['Futsal', 'Olahraga', 'Prestasi Sekolah', 'Ekstrakurikuler'],
  },
]

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

    if (docs && docs.length > 0) {
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
    }
  } catch {
    // fallback ke dummy
  }

  return DUMMY_BERITA_DETAIL_LIST.slice(0, limit).map((d) => ({
    category: d.category,
    categoryLabel: d.categoryLabel,
    date: d.date,
    excerpt: d.excerpt,
    slug: d.slug,
    thumbClass: d.thumbClass,
    title: d.title,
  }))
}

export async function getBeritaBySlug(slug: string): Promise<BeritaDetail | null> {
  const dummy = DUMMY_BERITA_DETAIL_LIST.find((item) => item.slug === slug)

  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1,
      overrideAccess: false,
      where: {
        slug: { equals: slug },
        _status: { equals: 'published' },
      },
    })

    if (docs && docs[0]) {
      const post = docs[0]
      const cat = (post.postType ?? 'berita') as NewsItem['category']
      const catLabel =
        post.postType === 'prestasi'
          ? 'Prestasi'
          : post.postType === 'pengumuman'
            ? 'Pengumuman'
            : 'Berita'

      // Ekstraksi paragraf teks jika konten disimpan di Lexical rich text
      const extractedParagraphs: string[] = []
      if (post.content && typeof post.content === 'object' && 'root' in (post.content as any)) {
        const root = (post.content as any).root
        if (Array.isArray(root?.children)) {
          for (const node of root.children) {
            if (node.type === 'paragraph' && Array.isArray(node.children)) {
              const text = node.children
                .map((c: any) => c.text || '')
                .join('')
                .trim()
              if (text) extractedParagraphs.push(text)
            }
          }
        }
      }

      return {
        slug: post.slug ?? slug,
        title: post.title,
        category: cat,
        categoryLabel: catLabel,
        date: formatTanggalPenuh(post.publishedAt) || dummy?.date || 'Terbaru',
        author: dummy?.author || 'Humas SDN 3 Way Galih',
        readTime: dummy?.readTime || '3 menit baca',
        excerpt: post.excerpt || dummy?.excerpt || '',
        thumbClass: dummy?.thumbClass || 'thumb-1',
        paragraphs:
          extractedParagraphs.length > 0
            ? extractedParagraphs
            : dummy?.paragraphs || [post.excerpt || ''],
        subheadings: dummy?.subheadings,
        keyPoints: dummy?.keyPoints,
        quote: dummy?.quote,
        tags: dummy?.tags || [catLabel, 'SDN 3 Way Galih'],
      }
    }
  } catch {
    // fallback ke dummy
  }

  return dummy || null
}

export async function getAllBeritaSlugs(): Promise<string[]> {
  const slugs = new Set<string>(DUMMY_BERITA_DETAIL_LIST.map((d) => d.slug))
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
      where: { _status: { equals: 'published' } },
    })
    for (const d of docs) {
      if (d.slug) slugs.add(d.slug)
    }
  } catch {}
  return Array.from(slugs)
}

export async function getBeritaTerkait(currentSlug: string, limit = 3): Promise<NewsItem[]> {
  const all = await getBerita(12)
  const filtered = all.filter((n) => n.slug && n.slug !== currentSlug)
  if (filtered.length >= limit) return filtered.slice(0, limit)

  const dummyFiltered = DUMMY_BERITA_DETAIL_LIST.filter((d) => d.slug !== currentSlug).map((d) => ({
    category: d.category,
    categoryLabel: d.categoryLabel,
    date: d.date,
    excerpt: d.excerpt,
    slug: d.slug,
    thumbClass: d.thumbClass,
    title: d.title,
  }))

  const combined = [...filtered]
  for (const item of dummyFiltered) {
    if (!combined.some((c) => c.slug === item.slug)) {
      combined.push(item)
    }
  }
  return combined.slice(0, limit)
}

/* ------------------------------------------------------------------ */
/* Agenda                                                              */
/* ------------------------------------------------------------------ */

export const DUMMY_AGENDA_LIST: AgendaItem[] = [
  {
    date: '10',
    month: 'Okt',
    title: 'Penilaian Tengah Semester Ganjil',
    detail: 'Seluruh kelas 1-6 • Pukul 07.30 - 11.30 WIB',
  },
  {
    date: '28',
    month: 'Okt',
    title: 'Upacara Hari Sumpah Pemuda',
    detail: 'Lapangan utama sekolah • Pukul 07.00 WIB',
  },
  {
    date: '15',
    month: 'Nov',
    title: 'Lomba Kreativitas dan Seni Budaya Siswa',
    detail: 'Aula serbaguna sekolah • Pukul 08.00 WIB',
  },
  {
    date: '25',
    month: 'Nov',
    title: 'Peringatan Hari Guru Nasional',
    detail: 'Halaman sekolah • Pukul 07.30 WIB',
  },
  {
    date: '10',
    month: 'Des',
    title: 'Penilaian Akhir Semester (PAS) Ganjil',
    detail: 'Seluruh ruang kelas • Pukul 07.30 WIB',
  },
  {
    date: '20',
    month: 'Des',
    title: 'Pembagian Buku Laporan Hasil Belajar (Rapor)',
    detail: 'Ruang kelas masing-masing bersama orang tua • Pukul 08.30 WIB',
  },
]

export async function getAgenda(limit = 6): Promise<AgendaItem[]> {
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
      },
    })

    if (docs && docs.length > 0) {
      return docs.map((item) => {
        const tgl = formatTanggal(item.date)
        return {
          date: tgl.date,
          detail: [item.location, item.time].filter(Boolean).join(' • '),
          month: tgl.month,
          title: item.title,
        }
      })
    }
  } catch {
    // fallback ke dummy
  }

  return DUMMY_AGENDA_LIST.slice(0, limit)
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const DUMMY_FAQ_LIST: FaqItem[] = [
  {
    question: 'Kapan pendaftaran PPDB tahun ajaran baru dibuka?',
    answer:
      'Pendaftaran PPDB dibuka mulai awal bulan Juni hingga akhir Juni setiap tahunnya. Jadwal dan alur pendaftaran resmi dapat diperoleh di sekretariat sekolah atau menu PPDB website ini.',
  },
  {
    question: 'Apa saja berkas administrasi yang wajib dipersiapkan?',
    answer:
      'Berkas utama meliputi fotokopi Akta Kelahiran (2 lembar), fotokopi Kartu Keluarga (2 lembar), pas foto calon siswa 3x4 (2 lembar), dan formulir pendaftaran yang diisi lengkap.',
  },
  {
    question: 'Apakah ada biaya seleksi atau formulir pendaftaran?',
    answer:
      'Tidak ada. Seluruh proses seleksi dan pendaftaran peserta didik baru di SDN 3 Way Galih bebas biaya (100% gratis).',
  },
  {
    question: 'Berapa ketentuan usia calon peserta didik kelas 1?',
    answer:
      'Prioritas utama diberikan kepada calon siswa berusia 7 tahun ke atas, atau minimal berusia 6 tahun per 1 Juli tahun berjalan dengan pembuktian Akta Kelahiran yang sah.',
  },
  {
    question: 'Bagaimana alur pendaftaran dan verifikasi berkas?',
    answer:
      'Calon wali murid mengambil formulir di loket sekolah, mengisi data, menyerahkan berkas persyaratan untuk diverifikasi panitia, dan menunggu pengumuman hasil seleksi terbuka.',
  },
  {
    question: 'Apakah ada masa orientasi pengenalan sekolah (MPLS)?',
    answer:
      'Ya, seluruh siswa baru akan mengikuti Masa Pengenalan Lingkungan Sekolah (MPLS) selama 3 hari pertama masuk sekolah untuk beradaptasi dengan lingkungan sekolah secara ramah dan menyenangkan.',
  },
]

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

    if (docs && docs.length > 0) {
      return docs.map((doc) => ({
        answer: doc.answer,
        question: doc.question,
      }))
    }
  } catch {
    // fallback ke dummy
  }

  return DUMMY_FAQ_LIST.slice(0, limit)
}

/* ------------------------------------------------------------------ */
/* Galeri                                                              */
/* ------------------------------------------------------------------ */

export const DUMMY_GALERI_LIST: GaleriItem[] = [
  { caption: 'Upacara Bendera Hari Senin di Lapangan Sekolah', imageUrl: null },
  { caption: 'Kegiatan Belajar Mengajar Kurikulum Merdeka di Kelas', imageUrl: null },
  { caption: 'Latihan Ekstrakurikuler Pramuka Regu Penggalang', imageUrl: null },
  { caption: 'Pentas Seni Budaya dan Kreativitas Siswa', imageUrl: null },
  { caption: 'Pertandingan Futsal Persahabatan Antar-Kelas', imageUrl: null },
  { caption: 'Penghijauan dan Perawatan Kebun Sekolah Sehat', imageUrl: null },
  { caption: 'Pembinaan Karakter dan Literasi Al-Qur\'an Pagi', imageUrl: null },
  { caption: 'Praktek Sains dan Percobaan Menyenangkan di Kelas', imageUrl: null },
  { caption: 'Pemberian Piagam Apresiasi Prestasi Siswa Berbakat', imageUrl: null },
]

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

    if (docs && docs.length > 0) {
      return docs.map((doc) => {
        const image = typeof doc.image === 'object' ? doc.image : null
        return {
          caption: doc.title,
          imageUrl: image?.url ?? null,
        }
      })
    }
  } catch {
    // fallback ke dummy
  }

  return DUMMY_GALERI_LIST.slice(0, limit)
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

export const DUMMY_PROFIL_SEKOLAH: ProfilSekolahData = {
  badgeItems: [
    { icon: 'award', label: 'Akreditasi A' },
    { icon: 'school', label: 'Sekolah Penggerak' },
    { icon: 'shield', label: 'Bebas Perundungan' },
    { icon: 'academic', label: 'Guru Bersertifikasi' },
    { icon: 'leaf', label: 'Lingkungan Asri' },
  ],
  footerAddress: 'Jl. Pendidikan No. 3, Way Galih\nKec. Tanjung Bintang, Lampung Selatan',
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
    'Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan.',
    'Menanamkan nilai karakter dan akhlak mulia dalam setiap kegiatan.',
    'Mengembangkan potensi peserta didik melalui kegiatan ekstrakurikuler.',
    'Mewujudkan lingkungan sekolah yang bersih, hijau, dan sehat.',
    'Menjalin kemitraan yang harmonis dengan orang tua dan masyarakat.',
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
}

export const DUMMY_PPDB: PpdbData = {
  academicYear: '2026/2027',
  bannerDescription: 'Informasi jadwal tahapan, persyaratan administrasi, dan alur pendaftaran siswa baru.',
  bannerTitle: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
  requirements: [
    'Fotokopi Kartu Keluarga (KK), 2 lembar',
    'Fotokopi Akta Kelahiran, 2 lembar',
    'Pas foto anak ukuran 3x4, 2 lembar',
    'Usia minimal 6 tahun pada 1 Juli 2026',
    'Mengisi formulir pendaftaran yang disediakan panitia',
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
}

export async function getProfilSekolah(): Promise<ProfilSekolahData | null> {
  try {
    const payload = await getClient()
    const global = await payload.findGlobal({ slug: 'profil-sekolah' })
    if (global && global.heroTitle) {
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
    }
  } catch {
    // fallback ke dummy
  }

  return DUMMY_PROFIL_SEKOLAH
}

export async function getPpdb(): Promise<PpdbData | null> {
  try {
    const payload = await getClient()
    const global = await payload.findGlobal({ slug: 'ppdb' })
    if (global && global.academicYear) {
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
    }
  } catch {
    // fallback ke dummy
  }

  return DUMMY_PPDB
}