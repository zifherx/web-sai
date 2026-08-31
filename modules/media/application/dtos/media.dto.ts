import type {
  EntityType,
  FieldName,
} from "@/modules/media/domain/entities/MediaFile"
import z from "zod"

const entityTypeEnum = z.enum([
  "marca",
  "portada",
  "sede",
  "vehiculo",
  "unassigned",
])
const fieldNameEnum = z.enum([
  "imageUrl",
  "galeria[].imageUrl",
  "colores[].carColor",
])

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
  fieldName?: FieldName
}

export interface AssignManyMediaFilesDto {
  mediaFileIds: string[]
  entityType: EntityType
  entityId: string
  fieldName?: FieldName
}

export interface DeleteMediaFileDto {
  mediaFileId: string
}

export interface DeleteManyMediaFilesDto {
  mediaFileIds: string[]
}

export interface RenameMediaFileDto {
  mediaFileId: string
  fileName: string
}

export interface ListMediaFilesDto {
  entityType?: EntityType
  entityId?: string
  search?: string
  limit?: number
  offset?: number
}

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
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedMediaResponseDto {
  data: MediaFileResponseDto[]
  total: number
  limit: number
  offset: number
}

export const EntityQuerySchema = z.object({
  entityType: entityTypeEnum,
  entityId: z.string().min(1),
})

export const AssignSchema = z.object({
  mediaFileId: z.string().min(1),
  entityType: entityTypeEnum,
  entityId: z.string().min(1),
  fieldName: fieldNameEnum.optional(),
})

export const AssignManySchema = z.object({
  mediaFileIds: z.array(z.string().min(1)).min(1),
  entityType: entityTypeEnum,
  entityId: z.string().min(1),
  fieldName: fieldNameEnum.optional(),
})

export const DeleteManySchema = z.object({
  mediaFileIds: z.array(z.string().min(1)).min(1),
})

export const RenameSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
})
