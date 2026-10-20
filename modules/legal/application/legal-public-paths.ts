import {
  LEGAL_SLUGS,
  type LegalSlug,
} from "@/modules/legal/domain/entities/legal-page"

export const legalPagePath = (slug: LegalSlug): string => `/legal/${slug}`

export const LEGAL_PROMOTIONS_PATH = legalPagePath("promociones")

export const ALL_LEGAL_PATHS: readonly string[] = LEGAL_SLUGS.map(legalPagePath)
