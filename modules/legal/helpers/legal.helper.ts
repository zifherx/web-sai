import { timingSafeEqual } from "node:crypto"

export type SlugContext = { params: Promise<{ slug: string }> }
export type PromotionContext = { params: Promise<{ promotionId: string }> }
export type SlugRevisionContext = {
  params: Promise<{ slug: string; revisionId: string }>
}
export type PromotionRevisionContext = {
  params: Promise<{ promotionId: string; revisionId: string }>
}

export function isValidSeedSecret(received: string | null): boolean {
  const expected = process.env.SEED_SECRET
  if (!expected || !received) return false
  const a = Buffer.from(received)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}
