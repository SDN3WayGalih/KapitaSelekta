/**
 * Terjemahan editor teks (Lexical). Paket @payloadcms/richtext-lexical belum
 * menyediakan Bahasa Indonesia, sehingga tanpa ini editor menampilkan kunci
 * mentah seperti "lexical:general:placeholder".
 */
export const lexicalId = {
  general: {
    placeholder: 'Mulai menulis di sini…',
    slashMenuBasicGroupLabel: 'Dasar',
    slashMenuListGroupLabel: 'Daftar',
    toolbarItemsActive: '{{count}} aktif',
  },
  align: {
    alignCenterLabel: 'Rata Tengah',
    alignJustifyLabel: 'Rata Kiri-Kanan',
    alignLeftLabel: 'Rata Kiri',
    alignRightLabel: 'Rata Kanan',
  },
  blockquote: { label: 'Kutipan' },
  blocks: {
    inlineBlocks: {
      create: 'Buat {{label}}',
      edit: 'Ubah {{label}}',
      label: 'Blok Sisipan',
      remove: 'Hapus {{label}}',
    },
    label: 'Blok',
  },
  heading: { label: 'Judul {{headingLevel}}' },
  horizontalRule: { label: 'Garis Pemisah' },
  indent: { decreaseLabel: 'Kurangi Indentasi', increaseLabel: 'Tambah Indentasi' },
  link: { label: 'Tautan', loadingWithEllipsis: 'Memuat…' },
  checklist: { label: 'Daftar Centang' },
  orderedList: { label: 'Daftar Bernomor' },
  unorderedList: { label: 'Daftar Berpoin' },
  paragraph: { label: 'Paragraf', label2: 'Teks Biasa' },
  relationship: { label: 'Tautan ke Konten' },
  textState: { defaultStyle: 'Gaya bawaan' },
  upload: { label: 'Gambar / File' },
}
