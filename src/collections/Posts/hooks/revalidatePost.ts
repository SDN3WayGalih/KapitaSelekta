import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import {
  revalidateSekolahAfterChange,
  revalidateSekolahAfterDelete,
} from '../../../hooks/revalidateSekolah'

// Berita tampil di beranda, /berita, dan /berita/[slug]. Dulu hook ini me-revalidate
// /posts/[slug] (rute bawaan template), sehingga halaman sekolah tidak pernah ikut diperbarui.
export const revalidatePost: CollectionAfterChangeHook<Post> = (args) => {
  const { doc, previousDoc, req } = args
  const terlihat = doc._status === 'published' || previousDoc?._status === 'published'

  if (!req.context.disableRevalidate && terlihat) {
    try {
      revalidateTag('posts-sitemap', 'max')
    } catch {
      // di luar server Next.js (mis. skrip seed), abaikan
    }
  }

  return revalidateSekolahAfterChange(args as Parameters<CollectionAfterChangeHook>[0]) as Post
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = (args) => {
  if (!args.req.context.disableRevalidate) {
    try {
      revalidateTag('posts-sitemap', 'max')
    } catch {
      // di luar server Next.js, abaikan
    }
  }

  return revalidateSekolahAfterDelete(args as Parameters<CollectionAfterDeleteHook>[0]) as Post
}
