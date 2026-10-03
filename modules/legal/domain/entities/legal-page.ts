import { VersionedContent } from "@/shared/domain/content-versioning/versioned-content"

/** Las 4 páginas legales son fijas (enlazadas desde el footer). */
export const LEGAL_SLUGS = [
  "accesibilidad",
  "copyright",
  "promociones",
  "terminos",
] as const
export type LegalSlug = (typeof LEGAL_SLUGS)[number]

export class LegalPageEntity {
  constructor(
    public readonly id: string,
    public readonly slug: LegalSlug,
    public readonly versioned: VersionedContent,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isPublished(): boolean {
    return this.versioned.published !== null
  }

  /** La página de promociones compone campañas y notas de vehículos. */
  isPromotionsPage(): boolean {
    return this.slug === "promociones"
  }
}
