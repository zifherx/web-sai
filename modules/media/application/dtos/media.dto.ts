import type {
  EntityType,
  FieldName,
} from "@/modules/media/domain/entities/MediaFile"
import z from "zod"

// ─── Input DTOs (lo que entra al use-case) ───────────────────────────────────

export interface RegisterUploadedFileDto {
  fileKey: string
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedBy: string
}

export interface AssignMediaFileDto {
  mediaFileId: string
  entityType: EntityType
  entityId: string
}

export interface AssignManyMediaFilesDto {
  mediaFileIds: string[]
  entityType: EntityType
  entityId: string
}

export interface ListMediaFilesDto {
  entityType?: EntityType
  entityId?: string
  search?: string
  limit?: number
  offset?: number
}

export interface DeleteMediaFileDto {
  mediaFileId: string
}

export interface DeleteManyMediaFilesDto {
  mediaFileIds: string[]
}

// ─── Output DTOs (lo que sale del use-case hacia presentación) ────────────────

export interface MediaFileResponseDto {
  id: string
  fileKey: string
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
  entityType: EntityType
  entityId: string
  fieldName: FieldName
  isAssigned: boolean
  uploadedBy: string
  createdAt: string // ISO string para serialización segura
  updatedAt: string
}

export interface PaginatedMediaResponseDto {
  data: MediaFileResponseDto[]
  total: number
  limit: number
  offset: number
}

export const AssignSchema = z.object({
  mediaFileId: z.string().length(24, "ID de media inválido"),
  entityType: z.string().min(1),
  entityId: z.string().min(1),
})

export const AssignManySchema = z.object({
  mediaFileIds: z.array(z.string().length(24)).min(1),
  entityType: z.string().min(1),
  entityId: z.string().min(1),
})

export const DeleteManySchema = z.object({
  mediaFileIds: z.array(z.string().length(24)).min(1),
})

export const EntityQuerySchema = z.object({
  entityType: z.string().min(1),
  entityId: z.string().length(24),
})
