import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin panel — end-to-end', () => {
  test.beforeEach(async () => {
    await seedTestUser()
  })

  test.afterEach(async () => {
    await cleanupTestUser()
  })

  test('login lalu tampilkan dashboard', async ({ page }) => {
    await login({ page, user: testUser })
    await expect(page).toHaveURL(/\/admin(?:\/)?$/)
    await expect(page.locator('body')).toContainText(/Dashboard/i)
  })

  test('menu koleksi konten sekolah dapat dibuka', async ({ page }) => {
    await login({ page, user: testUser })
    for (const [slug, heading] of [
      ['agenda', 'Agenda'],
      ['faq', 'FAQ'],
      ['galeri', 'Galeri'],
      ['testimoni', 'Testimoni'],
    ]) {
      await page.goto(`/admin/collections/${slug}`)
      await expect(page.locator('h1').first(), `heading koleksi ${slug}`).toContainText(heading)
    }
  })

  test('halaman edit profil global dapat dibuka', async ({ page }) => {
    await login({ page, user: testUser })
    await page.goto('/admin/globals/profil-sekolah')
    await expect(page.locator('h1').first()).toContainText(/Profil Sekolah/i)
  })
})
