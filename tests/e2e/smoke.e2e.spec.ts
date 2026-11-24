import { test, expect } from '@playwright/test'

/**
 * Smoke test — memastikan hal-hal paling dasar berfungsi sebelum pengujian lanjutan.
 * Dijalankan cepat: hanya cek status HTTP, heading utama, dan error console.
 */

const routes = ['/', '/profil', '/program', '/berita', '/galeri', '/ppdb', '/kontak']

test.describe('Smoke test', () => {
  test('admin panel merespons', async ({ request }) => {
    const response = await request.get('/admin')
    expect(response.status()).toBe(200)
  })

  for (const route of routes) {
    test(`halaman ${route} merespons 200 dan merender`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text())
      })

      const response = await page.goto(route)
      expect(response?.status(), `status ${route}`).toBe(200)

      await expect(page.locator('h1').first()).toBeVisible()
      await expect(page.locator('footer')).toBeVisible()

      // hydration / runtime JS errors tidak boleh muncul di console
      const realErrors = consoleErrors.filter(
        (e) => !e.includes('net::') && !e.includes('favicon'),
      )
      expect(realErrors, `console error di ${route}`).toEqual([])
    })
  }

  test('simpan screenshot bukti: beranda desktop dan login admin', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')
    await expect(page.locator('h1').first()).toBeVisible()
    await page.screenshot({ path: 'docs/test-evidence/beranda-desktop.png', fullPage: true })

    await page.goto('/admin/login')
    await expect(page.locator('input').first()).toBeVisible()
    await page.screenshot({ path: 'docs/test-evidence/admin-login.png', fullPage: true })
  })

  test('health API Payload merespons', async ({ request }) => {
    const response = await request.get('/api/users?limit=1')
    // 200 (ada user) atau 403/401 (akses ditolak) — yang penting API hidup
    expect([200, 401, 403]).toContain(response.status())
  })
})
