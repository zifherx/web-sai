import {
  type LegalPageDTO,
  type LegalPageSummaryDTO,
  type LegalPromotionDTO,
  type LegalPromotionSummaryDTO,
  type PublicLegalPageDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { type LegalPageEntity } from "@/modules/legal/domain/entities/legal-page"
import { type LegalPromotionEntity } from "@/modules/legal/domain/entities/legal-promotion"
import { type VehicleLegalNoteView } from "@/modules/legal/domain/repositories/vehicle-legal-notes.reader"
import { VersionedContentMapper } from "@/shared/application/content-versioning/versioned-content.mapper"
import { type ContentPublication } from "@/shared/domain/content-versioning/versioned-content"
import { toLimaDateOnly } from "@/shared/domain/lima-date"

const limaDate = (d: Date | null): string | null =>
  d ? toLimaDateOnly(d) : null

export const LegalMapper = {
  toPageSummaryDTO(page: LegalPageEntity): LegalPageSummaryDTO {
    const { draft, published } = page.versioned
    return {
      id: page.id,
      slug: page.slug,
      title: draft.title,
      status: page.versioned.status,
      lockVersion: page.versioned.lockVersion,
      draftUpdatedAt: draft.updatedAt.toISOString(),
      draftUpdatedBy: draft.updatedBy,
      publishedVersion: published?.version ?? null,
      publishedAt: published?.publishedAt.toISOString() ?? null,
      publishedBy: published?.publishedBy ?? null,
    }
  },

  toPageDTO(page: LegalPageEntity): LegalPageDTO {
    return {
      id: page.id,
      slug: page.slug,
      ...VersionedContentMapper.toDTO(page.versioned),
    }
  },

  toPromotionSummaryDTO(
    p: LegalPromotionEntity,
    now: Date
  ): LegalPromotionSummaryDTO {
    const { published } = p.versioned
    return {
      id: p.id,
      slug: p.slug,
      title: p.versioned.draft.title,
      status: p.versioned.status,
      publishedVersion: published?.version ?? null,
      publishedAt: published?.publishedAt.toISOString() ?? null,
      validFrom: limaDate(p.validFrom),
      validTo: limaDate(p.validTo),
      isActive: p.isActive,
      order: p.order,
      validity: p.validityStatusAt(now),
    }
  },

  toPromotionDTO(p: LegalPromotionEntity, now: Date): LegalPromotionDTO {
    return {
      id: p.id,
      slug: p.slug,
      ...VersionedContentMapper.toDTO(p.versioned),
      validFrom: limaDate(p.validFrom),
      validTo: limaDate(p.validTo),
      isActive: p.isActive,
      order: p.order,
      validity: p.validityStatusAt(now),
      attachment: p.attachment,
    }
  },

  toPublicPageDTO(
    page: LegalPageEntity,
    publication: ContentPublication,
    promotions: LegalPromotionEntity[],
    vehicleNotes: VehicleLegalNoteView[]
  ): PublicLegalPageDTO {
    return {
      slug: page.slug,
      title: publication.title,
      seo: publication.seo,
      content: publication.content,
      publishedAt: publication.publishedAt.toISOString(),
      promotions: promotions.flatMap((p) =>
        p.versioned.published
          ? [
              {
                slug: p.slug,
                title: p.versioned.published.title,
                content: p.versioned.published.content,
                attachment: p.attachment,
              },
            ]
          : []
      ),
      vehicleNotes: vehicleNotes.map((n) => ({
        vehiculoSlug: n.vehiculoSlug,
        title: n.title,
        content: n.content,
      })),
    }
  },
}
