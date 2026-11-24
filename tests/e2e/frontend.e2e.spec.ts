import { test, expect } from '@playwright/test'

const schoolRoutes = [
  { path: '/', heading: 'SDN 3 Way Galih' },
  { path: '/profil', heading: 'Profil Sekolah' },
  { path: '/program', heading: 'Program' },
  { path: '/berita', heading: 'Berita & Kegiatan' },
  { path: '/galeri', heading: 'Galeri Sekolah' },
  { path: '/ppdb', heading: 'PPDB' },
  { path: '/kontak', heading: 'Kontak & Lokasi Sekolah' },
]

test.describe('Frontend sekolah — end-to-end dan black-box', () => {
  test('smoke: seluruh halaman utama memuat heading yang benar', async ({ page }) => {
    for (const route of schoolRoutes) {
      const response = await page.goto(route.path)
      expect(response?.status(), `${route.path} HTTP status`).toBe(200)
      await expect(page.locator('h1').first(), `${route.path} h1`).toContainText(route.heading)
      await expect(page.locator('body')).not.toContainText('Application error')
    }
  })

  test('navigasi utama menuju halaman-halaman sekolah', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Navigasi Utama' }).getByRole('link', { name: 'Profil' }).click()
    await expect(page).toHaveURL(/\/profil$/)
    await expect(page.locator('h1').first()).toContainText('Profil Sekolah')
    await page.getByRole('navigation', { name: 'Navigasi Utama' }).getByRole('link', { name: 'Berita' }).click()
    await expect(page).toHaveURL(/\/berita$/)
  })

  test('filter berita menyaring kartu sesuai kategori', async ({ page }) => {
    await page.goto('/berita')
    const tabs = page.getByRole('tab')
    await expect(tabs).toHaveCount(4)
    await page.getByRole('tab', { name: 'Prestasi' }).click()
    await expect(page.getByRole('tab', { name: 'Prestasi' })).toHaveAttribute('aria-selected', 'true')
    const cards = page.locator('#newsGrid .news-card')
    await expect(cards).toHaveCount(await cards.count())
    for (const card of await cards.all()) await expect(card).toHaveAttribute('data-cat', 'prestasi')
  })

  test('form kontak menampilkan konfirmasi dan mereset isian', async ({ page }) => {
    await page.goto('/kontak')
    await page.getByLabel('Nama Lengkap').fill('Pengujian E2E')
    await page.getByLabel('Email', { exact: true }).fill('e2e@example.com')
    await page.getByLabel('Subjek').fill('Uji formulir')
    await page.getByLabel('Pesan').fill('Pesan pengujian formulir kontak.')
    await page.getByRole('button', { name: 'Kirim Pesan' }).click()
    await expect(page.locator('#formSuccess')).toContainText('Pesan Anda berhasil dikirim')
    await expect(page.getByLabel('Nama Lengkap')).toHaveValue('')
  })

  test('menu PPDB mengarah ke situs resmi pada tab baru', async ({ page }) => {
    await page.goto('/')
    const ppdbLink = page.getByRole('navigation', { name: 'Navigasi Utama' }).getByRole('link', { name: /PPDB/ })
    await expect(ppdbLink).toHaveAttribute('href', 'https://sd.spmblampung.com')
    await expect(ppdbLink).toHaveAttribute('target', '_blank')
    await expect(ppdbLink).toHaveAttribute('rel', /noopener/)
  })

  test('berita dapat dibuka dan halaman detail menampilkan isi serta tombol bagikan', async ({ page }) => {
    const response = await page.goto('/berita')
    expect(response?.status()).toBe(200)
    const firstNews = page.locator('a.news-link[href^="/berita/"]').first()
    await expect(firstNews).toBeVisible()
    const href = await firstNews.getAttribute('href')
    expect(href).toMatch(/^\/berita\/[a-z0-9-]+$/)
    await firstNews.click()
    await expect(page).toHaveURL(new RegExp(`${href?.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`))
    await expect(page.locator('h1').first()).not.toBeEmpty()
    await expect(page.getByRole('button', { name: 'Bagikan artikel ini' })).toBeVisible()
  })

  test('galeri: buka lalu tutup lightbox dengan Escape', async ({ page }) => {
    await page.goto('/galeri')
    const imageButton = page.locator('.gallery-item').first()
    await expect(imageButton).toBeVisible()
    await imageButton.click()
    const dialog = page.locator('#lightbox')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    /*
     * Lightbox disembunyikan lewat opacity CSS, sehingga toBeHidden tidak bisa
     * dipakai. Gunakan aria-hidden dan class .show sebagai penanda status.
     */
    await expect(dialog).toHaveAttribute('aria-hidden', 'true')
    await expect(dialog).not.toHaveClass(/show/)
  })

  test('black-box: lebar ponsel tidak menimbulkan scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    for (const path of ['/', '/profil', '/berita', '/galeri', '/kontak']) {
      await page.goto(path)
      const dimensions = await page.evaluate(() => ({
        body: document.body.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }))
      expect(dimensions.body, `${path} horizontal overflow`).toBeLessThanOrEqual(dimensions.viewport + 1)
    }
  })

  test('black-box: navigasi mobile dapat dibuka dan ditutup', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const menu = page.getByRole('navigation', { name: 'Navigasi Utama' })
    const toggle = page.getByRole('button', { name: 'Buka menu navigasi' })
    await toggle.click()
    await expect(page.getByRole('button', { name: 'Tutup menu navigasi' })).toHaveAttribute('aria-expanded', 'true')
    await expect(menu.getByRole('link', { name: 'Profil' })).toBeVisible()
  })
})
