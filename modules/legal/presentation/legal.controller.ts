import { ResponseFactory } from "@/lib/response-factory"
import {
  CreateLegalPromotionSchema,
  LegalSlugParamSchema,
  LockOnlySchema,
  PromotionIdParamSchema,
  PublishSchema,
  ReorderLegalPromotionsSchema,
  RevisionIdParamSchema,
  SaveLegalPageDraftSchema,
  SaveLegalPromotionDraftSchema,
  UpdateLegalPromotionSettingsSchema,
} from "@/modules/legal/application/dto/legal.dto"
import { LegalSeedUnauthorizedError } from "@/modules/legal/domain/errors/legal.error"
import { legalFactory } from "@/modules/legal/factories/legal.factory"
import {
  isValidSeedSecret,
  type PromotionContext,
  type PromotionRevisionContext,
  type SlugContext,
  type SlugRevisionContext,
} from "@/modules/legal/helpers/legal.helper"
import { buildLegalSeed } from "@/modules/legal/infrastructure/seed/legal-seed.data"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import { type PermissionRequest } from "@/shared/infrastructure/auth/permissions"
import { toContentAuthor } from "@/shared/infrastructure/auth/require-permission"
import { apiHandler } from "@/shared/presentation/api-handler"
import { type NextRequest } from "next/server"

/**
 * Todas las rutas del CMS Legal exigen sesión + permiso.
 * El pipeline (sesión → rate limit → 401/403 → connectDB → headers) lo
 * resuelve `apiHandler`; aquí solo se traduce la sesión a `ContentAuthor`.
 */
function legalHandler(
  req: NextRequest,
  permission: PermissionRequest,
  action: (author: ContentAuthor) => Promise<Response>
): Promise<Response> {
  return apiHandler(req, { access: permission }, ({ sesion }) =>
    action(toContentAuthor(sesion))
  )
}

export function listLegalPagesHandler(req: NextRequest) {
  return legalHandler(req, { legalPage: ["read"] }, async () => {
    const data = await legalFactory().listPages.execute()
    return ResponseFactory.success(data, "Páginas legales obtenidas")
  })
}

export function getLegalPageHandler(req: NextRequest, ctx: SlugContext) {
  return legalHandler(req, { legalPage: ["read"] }, async () => {
    const { slug } = LegalSlugParamSchema.parse(await ctx.params)
    const data = await legalFactory().getPage.execute(slug)
    return ResponseFactory.success(data, "Página legal obtenida")
  })
}

export function saveLegalPageDraftHandler(req: NextRequest, ctx: SlugContext) {
  return legalHandler(req, { legalPage: ["update"] }, async (author) => {
    const { slug } = LegalSlugParamSchema.parse(await ctx.params)
    const body = SaveLegalPageDraftSchema.parse(await req.json())
    const data = await legalFactory().savePageDraft.execute(slug, body, author)
    return ResponseFactory.success(data, "Borrador guardado")
  })
}

export function publishLegalPageHandler(req: NextRequest, ctx: SlugContext) {
  return legalHandler(req, { legalPage: ["publish"] }, async (author) => {
    const { slug } = LegalSlugParamSchema.parse(await ctx.params)
    const body = PublishSchema.parse(await req.json())
    const data = await legalFactory().publishPage.execute(slug, body, author)
    return ResponseFactory.success(data, "Página publicada")
  })
}

export function discardLegalPageDraftHandler(
  req: NextRequest,
  ctx: SlugContext
) {
  return legalHandler(req, { legalPage: ["update"] }, async (author) => {
    const { slug } = LegalSlugParamSchema.parse(await ctx.params)
    const body = LockOnlySchema.parse(await req.json())
    const data = await legalFactory().discardPageDraft.execute(
      slug,
      body,
      author
    )
    return ResponseFactory.success(data, "Cambios descartados")
  })
}

export function listLegalPageRevisionsHandler(
  req: NextRequest,
  ctx: SlugContext
) {
  return legalHandler(req, { legalPage: ["read"] }, async () => {
    const { slug } = LegalSlugParamSchema.parse(await ctx.params)
    const data = await legalFactory().listPageRevisions.execute(slug)
    return ResponseFactory.success(data, "Historial obtenido")
  })
}

export function getLegalPageRevisionHandler(
  req: NextRequest,
  ctx: SlugRevisionContext
) {
  return legalHandler(req, { legalPage: ["read"] }, async () => {
    const params = await ctx.params
    const { slug } = LegalSlugParamSchema.parse(params)
    const { revisionId } = RevisionIdParamSchema.parse(params)
    const data = await legalFactory().getPageRevision.execute(slug, revisionId)
    return ResponseFactory.success(data, "Versión obtenida")
  })
}

export function restoreLegalPageRevisionHandler(
  req: NextRequest,
  ctx: SlugRevisionContext
) {
  return legalHandler(req, { legalPage: ["restore"] }, async (author) => {
    const params = await ctx.params
    const { slug } = LegalSlugParamSchema.parse(params)
    const { revisionId } = RevisionIdParamSchema.parse(params)
    const body = LockOnlySchema.parse(await req.json())
    const data = await legalFactory().restorePageRevision.execute(
      slug,
      revisionId,
      body,
      author
    )
    return ResponseFactory.success(data, "Versión restaurada como borrador")
  })
}

export function listLegalPromotionsHandler(req: NextRequest) {
  return legalHandler(req, { legalPromotion: ["read"] }, async () => {
    const data = await legalFactory().listPromotions.execute()
    return ResponseFactory.success(data, "Campañas obtenidas")
  })
}

export function createLegalPromotionHandler(req: NextRequest) {
  return legalHandler(req, { legalPromotion: ["create"] }, async (author) => {
    const body = CreateLegalPromotionSchema.parse(await req.json())
    const data = await legalFactory().createPromotion.execute(body, author)
    return ResponseFactory.created(data, "Campaña creada")
  })
}

export function reorderLegalPromotionsHandler(req: NextRequest) {
  return legalHandler(req, { legalPromotion: ["update"] }, async () => {
    const body = ReorderLegalPromotionsSchema.parse(await req.json())
    const data = await legalFactory().reorderPromotions.execute(body)
    return ResponseFactory.success(data, "Orden actualizado")
  })
}

export function getLegalPromotionHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["read"] }, async () => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const data = await legalFactory().getPromotion.execute(promotionId)
    return ResponseFactory.success(data, "Campaña obtenida")
  })
}

export function deleteLegalPromotionHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["delete"] }, async () => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const data = await legalFactory().deletePromotion.execute(promotionId)
    return ResponseFactory.success(data, "Campaña eliminada")
  })
}

export function saveLegalPromotionDraftHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["update"] }, async (author) => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const body = SaveLegalPromotionDraftSchema.parse(await req.json())
    const data = await legalFactory().savePromotionDraft.execute(
      promotionId,
      body,
      author
    )
    return ResponseFactory.success(data, "Borrador guardado")
  })
}

export function publishLegalPromotionHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["publish"] }, async (author) => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const body = PublishSchema.parse(await req.json())
    const data = await legalFactory().publishPromotion.execute(
      promotionId,
      body,
      author
    )
    return ResponseFactory.success(data, "Campaña publicada")
  })
}

export function discardLegalPromotionDraftHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["update"] }, async (author) => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const body = LockOnlySchema.parse(await req.json())
    const data = await legalFactory().discardPromotionDraft.execute(
      promotionId,
      body,
      author
    )
    return ResponseFactory.success(data, "Cambios descartados")
  })
}

export function updateLegalPromotionSettingsHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["update"] }, async () => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const body = UpdateLegalPromotionSettingsSchema.parse(await req.json())
    const data = await legalFactory().updatePromotionSettings.execute(
      promotionId,
      body
    )
    return ResponseFactory.success(data, "Configuración actualizada")
  })
}

export function listLegalPromotionRevisionsHandler(
  req: NextRequest,
  ctx: PromotionContext
) {
  return legalHandler(req, { legalPromotion: ["read"] }, async () => {
    const { promotionId } = PromotionIdParamSchema.parse(await ctx.params)
    const data =
      await legalFactory().listPromotionRevisions.execute(promotionId)
    return ResponseFactory.success(data, "Historial obtenido")
  })
}

export function getLegalPromotionRevisionHandler(
  req: NextRequest,
  ctx: PromotionRevisionContext
) {
  return legalHandler(req, { legalPromotion: ["read"] }, async () => {
    const params = await ctx.params
    const { promotionId } = PromotionIdParamSchema.parse(params)
    const { revisionId } = RevisionIdParamSchema.parse(params)
    const data = await legalFactory().getPromotionRevision.execute(
      promotionId,
      revisionId
    )
    return ResponseFactory.success(data, "Versión obtenida")
  })
}

export function restoreLegalPromotionRevisionHandler(
  req: NextRequest,
  ctx: PromotionRevisionContext
) {
  return legalHandler(req, { legalPromotion: ["restore"] }, async (author) => {
    const params = await ctx.params
    const { promotionId } = PromotionIdParamSchema.parse(params)
    const { revisionId } = RevisionIdParamSchema.parse(params)
    const body = LockOnlySchema.parse(await req.json())
    const data = await legalFactory().restorePromotionRevision.execute(
      promotionId,
      revisionId,
      body,
      author
    )
    return ResponseFactory.success(data, "Versión restaurada como borrador")
  })
}

/**
 * POST /api/legal/seed — header `x-seed-secret: <SEED_SECRET>`.
 * Sin sesión (bootstrap por ambiente); limitado por IP con "public-write".
 */
export function seedLegalContentHandler(req: NextRequest) {
  return apiHandler(
    req,
    { access: "public", tier: "public-write" },
    async () => {
      if (!isValidSeedSecret(req.headers.get("x-seed-secret"))) {
        throw new LegalSeedUnauthorizedError()
      }
      const data = await legalFactory().seed.execute(buildLegalSeed())
      return ResponseFactory.success(data, "Seed de contenido legal ejecutado")
    }
  )
}
