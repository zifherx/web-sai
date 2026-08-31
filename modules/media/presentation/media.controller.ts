import { ResponseFactory } from "@/lib"
import {
  AssignManySchema,
  AssignSchema,
  DeleteManySchema,
  EntityQuerySchema,
  RenameSchema,
} from "@/modules/media/application/dtos/media.dto"
import { EntityType } from "@/modules/media/domain/entities/MediaFile"
import { mediaFactory } from "@/modules/media/factories/media.factory"
import {
  IdContext,
  withRateLimitHeaders,
} from "@/modules/media/helpers/media.helper"
import { parseMediaQueryParams } from "@/modules/media/helpers/parse-media-query-params.helper"
import { mediaRateLimit } from "@/modules/media/presentation/media.ratelimit"
import { resolveUserId } from "@/shared/infrastructure/auth/resolve-user-id"
import { connectDB } from "@/shared/infrastructure/connection"
import { withHandler } from "@/shared/presentation/with-handler"
import { NextRequest } from "next/server"

/**
 * GET /api/media
 * Lista archivos con filtros y paginación. Solo CMS autenticado.
 */
export function listMediaFilesHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    await connectDB()
    const dto = parseMediaQueryParams(req.nextUrl.searchParams)
    const useCases = mediaFactory()
    const data = await useCases.list.execute(dto)

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Archivos de media obtenidos"),
      rl.headers
    )
  })
}

/**
 * GET /api/media/entity
 * Archivos asociados a una entidad concreta. Solo CMS autenticado.
 * Query params: entityType, entityId
 */
export function getMediaByEntityHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { entityType, entityId } = EntityQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )
    await connectDB()
    const useCases = mediaFactory()
    const data = await useCases.getByEntity.execute({
      entityType: entityType as EntityType,
      entityId,
    })

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Archivos de entidad obtenidos"),
      rl.headers
    )
  })
}

/**
 * POST /api/media/assign
 * Asigna un MediaFile a una entidad. Solo CMS autenticado.
 */
export function assignMediaFileHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const body = AssignSchema.parse(await req.json())
    await connectDB()
    const useCases = mediaFactory()
    const data = await useCases.assign.execute({
      mediaFileId: body.mediaFileId,
      entityType: body.entityType as EntityType,
      entityId: body.entityId,
    })

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Archivo asignado correctamente"),
      rl.headers
    )
  })
}

/**
 * POST /api/media/assign-many
 * Asignación masiva de archivos a una entidad. Solo CMS autenticado.
 */
export function assignManyMediaFilesHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const body = AssignManySchema.parse(await req.json())
    await connectDB()
    const useCases = mediaFactory()
    const data = await useCases.assignMany.execute({
      mediaFileIds: body.mediaFileIds,
      entityType: body.entityType as EntityType,
      entityId: body.entityId,
    })

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Archivos asignados correctamente"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/media/[id]
 * Elimina un archivo del CDN y de MongoDB. Solo CMS autenticado.
 */
export function deleteMediaFileHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = await ctx.params
    await connectDB()
    const useCases = mediaFactory()
    await useCases.delete.execute({ mediaFileId: id })

    return withRateLimitHeaders(
      ResponseFactory.success(null, "Archivo eliminado correctamente"),
      rl.headers
    )
  })
}

/**
 * DELETE /api/media/delete-many
 * Eliminación batch. Una sola llamada a UploadThing. Solo CMS autenticado.
 */
export function deleteManyMediaFilesHandler(req: NextRequest) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const body = DeleteManySchema.parse(await req.json())
    await connectDB()
    const useCases = mediaFactory()
    await useCases.deleteMany.execute({ mediaFileIds: body.mediaFileIds })

    return withRateLimitHeaders(
      ResponseFactory.success(null, "Archivos eliminados correctamente"),
      rl.headers
    )
  })
}

/**
 * PATCH /api/media/[id]/rename
 * Renombra un archivo en UploadThing y sincroniza Mongo. Solo CMS autenticado.
 */
export function renameMediaFileHandler(req: NextRequest, ctx: IdContext) {
  return withHandler(async () => {
    const rl = await mediaRateLimit(req)
    if (!rl.allowed) return rl.response!

    resolveUserId(req)
    const { id } = await ctx.params
    const body = RenameSchema.parse(await req.json())
    await connectDB()
    const useCases = mediaFactory()
    const data = await useCases.rename.execute({
      mediaFileId: id,
      fileName: body.fileName,
    })

    return withRateLimitHeaders(
      ResponseFactory.success(data, "Archivo renombrado correctamente"),
      rl.headers
    )
  })
}
