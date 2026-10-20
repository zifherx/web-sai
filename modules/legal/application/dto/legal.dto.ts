import {
  LEGAL_SLUGS,
  type LegalSlug,
} from "@/modules/legal/domain/entities/legal-page"
import {
  type PromotionAttachment,
  type PromotionValidityStatus,
} from "@/modules/legal/domain/entities/legal-promotion"
import {
  ObjectIdSchema,
  SaveDraftSchema,
  type VersionedContentDTO,
} from "@/shared/application/content-versioning/versioned-content.dto"
import {
  type ContentAuthor,
  type PublicationStatus,
  type SeoMeta,
} from "@/shared/domain/content-versioning/versioned-content"
import { limaEndOfDay, limaStartOfDay } from "@/shared/domain/lima-date"
import { type RichContent } from "@/shared/domain/rich-text/rich-content"
import { z } from "zod"
export {
  LockOnlySchema,
  PublishSchema,
  RevisionIdParamSchema,
} from "@/shared/application/content-versioning/versioned-content.dto"
export type {
  ContentRevisionDTO,
  ContentRevisionSummaryDTO,
  LockOnlyDTO,
  PublishDTO,
  SaveDraftDTO,
} from "@/shared/application/content-versioning/versioned-content.dto"

export const LegalSlugParamSchema = z.object({ slug: z.enum(LEGAL_SLUGS) })
export const PromotionIdParamSchema = z.object({ promotionId: ObjectIdSchema })

export const PromotionSlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Solo minúsculas, números y guiones")

const ValidFromSchema = z.iso
  .date()
  .nullable()
  .default(null)
  .transform((d) => (d ? limaStartOfDay(d) : null))

const ValidToSchema = z.iso
  .date()
  .nullable()
  .default(null)
  .transform((d) => (d ? limaEndOfDay(d) : null))

/** Solo URLs de UploadThing `<APP_ID>.ufs.sh` (utfs.io es poco confiable). */
export const PromotionAttachmentSchema = z.object({
  url: z.url({ protocol: /^https$/, hostname: /^[a-z0-9-]+\.ufs\.sh$/i }),
  name: z.string().trim().min(1).max(120),
})

export const SaveLegalPageDraftSchema = SaveDraftSchema
export const SaveLegalPromotionDraftSchema = SaveDraftSchema.omit({ seo: true })
export type SaveLegalPromotionDraftDTO = z.infer<
  typeof SaveLegalPromotionDraftSchema
>

export const CreateLegalPromotionSchema = z.object({
  slug: PromotionSlugSchema,
  title: z.string().trim().min(1).max(200),
  content: z.unknown().optional(),
  validFrom: ValidFromSchema,
  validTo: ValidToSchema,
  isActive: z.boolean().default(true),
  attachment: PromotionAttachmentSchema.nullable().default(null),
})
export type CreateLegalPromotionDTO = z.infer<typeof CreateLegalPromotionSchema>

export const UpdateLegalPromotionSettingsSchema = z.object({
  validFrom: ValidFromSchema,
  validTo: ValidToSchema,
  isActive: z.boolean(),
  attachment: PromotionAttachmentSchema.nullable().default(null),
})
export type UpdateLegalPromotionSettingsDTO = z.infer<
  typeof UpdateLegalPromotionSettingsSchema
>

export const ReorderLegalPromotionsSchema = z.object({
  ids: z
    .array(ObjectIdSchema)
    .min(1)
    .refine((ids) => new Set(ids).size === ids.length, "IDs duplicados"),
})
export type ReorderLegalPromotionsDTO = z.infer<
  typeof ReorderLegalPromotionsSchema
>

export interface LegalPageSummaryDTO {
  id: string
  slug: LegalSlug
  title: string
  status: PublicationStatus
  lockVersion: number
  draftUpdatedAt: string
  draftUpdatedBy: ContentAuthor
  publishedVersion: number | null
  publishedAt: string | null
  publishedBy: ContentAuthor | null
}

export interface LegalPageDTO extends VersionedContentDTO {
  id: string
  slug: LegalSlug
}

interface PromotionOperationalDTO {
  validFrom: string | null
  validTo: string | null
  isActive: boolean
  order: number
  validity: PromotionValidityStatus
}

export interface LegalPromotionSummaryDTO extends PromotionOperationalDTO {
  id: string
  slug: string
  title: string
  status: PublicationStatus
  publishedVersion: number | null
  publishedAt: string | null
}

export interface LegalPromotionDTO
  extends VersionedContentDTO, PromotionOperationalDTO {
  id: string
  slug: string
  attachment: PromotionAttachment | null
}

export interface PublicLegalPromotionDTO {
  slug: string
  title: string
  content: RichContent
  attachment: PromotionAttachment | null
}

export interface PublicVehicleLegalNoteDTO {
  vehiculoSlug: string
  title: string
  content: RichContent
}

export interface PublicLegalPageDTO {
  slug: LegalSlug
  title: string
  seo: SeoMeta | null
  content: RichContent
  publishedAt: string
  promotions: PublicLegalPromotionDTO[]
  vehicleNotes: PublicVehicleLegalNoteDTO[]
}

export interface LegalSeedPage {
  slug: LegalSlug
  title: string
  content: unknown
  seo: SeoMeta | null
}

export interface LegalSeedPromotion {
  slug: string
  title: string
  content: unknown
  validFrom: Date | null
  validTo: Date | null
  isActive: boolean
}

export interface LegalSeedInput {
  pages: LegalSeedPage[]
  promotions: LegalSeedPromotion[]
}

export interface LegalSeedResultDTO {
  created: string[]
  skipped: string[]
}
