import {
  ContentAuthor,
  PublicationStatus,
  SeoMeta,
} from "@/shared/domain/content-versioning/versioned-content"
import { RichContent } from "@/shared/domain/rich-text/rich-content"
import { z } from "zod"

// ── Esquemas de entrada (compartidos con los formularios del CMS) ────────────

export const ObjectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Identificador inválido")

export const LockVersionSchema = z.number().int().nonnegative()

export const SeoMetaSchema = z.object({
  title: z.string().trim().min(1).max(70),
  description: z.string().trim().min(1).max(170),
})

/**
 * Cuerpo de "Guardar borrador". `content` llega como `unknown`: su
 * validación real la hace `IRichContentProcessor` contra el esquema Tiptap.
 */
export const SaveDraftSchema = z.object({
  title: z.string().trim().min(1).max(200),
  content: z.unknown(),
  seo: SeoMetaSchema.nullable().default(null),
  lockVersion: LockVersionSchema,
})
export type SaveDraftDTO = z.infer<typeof SaveDraftSchema>

export const PublishSchema = z.object({
  lockVersion: LockVersionSchema,
  note: z.string().trim().max(300).nullable().default(null),
})
export type PublishDTO = z.infer<typeof PublishSchema>

export const LockOnlySchema = z.object({ lockVersion: LockVersionSchema })
export type LockOnlyDTO = z.infer<typeof LockOnlySchema>

export const RevisionIdParamSchema = z.object({ revisionId: ObjectIdSchema })

// ── DTOs de respuesta ────────────────────────────────────────────────────────

export interface ContentDraftDTO {
  title: string
  content: RichContent
  seo: SeoMeta | null
  updatedAt: string
  updatedBy: ContentAuthor
}

export interface ContentPublicationDTO {
  title: string
  content: RichContent
  seo: SeoMeta | null
  version: number
  publishedAt: string
  publishedBy: ContentAuthor
}

export interface VersionedContentDTO {
  status: PublicationStatus
  lockVersion: number
  draft: ContentDraftDTO
  published: ContentPublicationDTO | null
}

export interface ContentRevisionSummaryDTO {
  id: string
  version: number
  title: string
  publishedAt: string
  publishedBy: ContentAuthor
  note: string | null
}

export interface ContentRevisionDTO extends ContentRevisionSummaryDTO {
  content: RichContent
  plainText: string
  seo: SeoMeta | null
  operational: {
    validFrom: string | null
    validTo: string | null
    isActive: boolean
  } | null
}
