import { getPayload } from 'payload'

import config from '../../src/payload.config'

/**
 * User sementara untuk pengujian admin.
 * Email memakai suffix unik per proses agar tidak bentrok dengan akun asli sekolah.
 */
const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const testUser = {
  email: `e2e-test-${runId}@example.com`,
  password: 'E2eTestPassword123!',
  name: 'E2E Test User',
}

async function getDefaultPayload() {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
}

/** Membuat user sementara agar pengujian login admin bisa berjalan. */
export async function seedTestUser(): Promise<void> {
  const payload = await getDefaultPayload()

  await payload.create({
    collection: 'users',
    data: testUser,
  })
}

/** Menghapus user sementara setelah pengujian selesai. */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getDefaultPayload()

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
