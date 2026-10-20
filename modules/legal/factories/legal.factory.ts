import { CreateLegalPromotionUseCase } from "@/modules/legal/application/use-cases/create-legal-promotion.use-case"
import { DeleteLegalPromotionUseCase } from "@/modules/legal/application/use-cases/delete-legal-promotion.use-case"
import { DiscardLegalPageDraftUseCase } from "@/modules/legal/application/use-cases/discard-legal-page-draft.use-case"
import { DiscardLegalPromotionDraftUseCase } from "@/modules/legal/application/use-cases/discard-legal-promotion-draft.use-case"
import { GetLegalPageRevisionUseCase } from "@/modules/legal/application/use-cases/get-legal-page-revision.use-case"
import { GetLegalPageUseCase } from "@/modules/legal/application/use-cases/get-legal-page.use-case"
import { GetLegalPromotionRevisionUseCase } from "@/modules/legal/application/use-cases/get-legal-promotion-revision.use-case"
import { GetLegalPromotionUseCase } from "@/modules/legal/application/use-cases/get-legal-promotion.use-case"
import { GetPublicLegalPageUseCase } from "@/modules/legal/application/use-cases/get-public-legal-page.use-case"
import { ListLegalPageRevisionsUseCase } from "@/modules/legal/application/use-cases/list-legal-page-revisions.use-case"
import { ListLegalPagesUseCase } from "@/modules/legal/application/use-cases/list-legal-pages.use-case"
import { ListLegalPromotionRevisionsUseCase } from "@/modules/legal/application/use-cases/list-legal-promotion-revisions.use-case"
import { ListLegalPromotionsUseCase } from "@/modules/legal/application/use-cases/list-legal-promotions.use-case"
import { PublishLegalPageUseCase } from "@/modules/legal/application/use-cases/publish-legal-page.use-case"
import { PublishLegalPromotionUseCase } from "@/modules/legal/application/use-cases/publish-legal-promotion.use-case"
import { ReorderLegalPromotionsUseCase } from "@/modules/legal/application/use-cases/reorder-legal-promotions.use-case"
import { RestoreLegalPageRevisionUseCase } from "@/modules/legal/application/use-cases/restore-legal-page-revision.use-case"
import { RestoreLegalPromotionRevisionUseCase } from "@/modules/legal/application/use-cases/restore-legal-promotion-revision.use-case"
import { SaveLegalPageDraftUseCase } from "@/modules/legal/application/use-cases/save-legal-page-draft.use-case"
import { SaveLegalPromotionDraftUseCase } from "@/modules/legal/application/use-cases/save-legal-promotion-draft.use-case"
import { SeedLegalContentUseCase } from "@/modules/legal/application/use-cases/seed-legal-content.use-case"
import { UpdateLegalPromotionSettingsUseCase } from "@/modules/legal/application/use-cases/update-legal-promotion-settings.use-case"
import { LegalPageModel } from "@/modules/legal/infrastructure/mongoose/legal-page.schema"
import { LegalPromotionModel } from "@/modules/legal/infrastructure/mongoose/legal-promotion.schema"
import { MongooseLegalPageRepository } from "@/modules/legal/infrastructure/mongoose/mongoose-legal-page.repository"
import { MongooseLegalPromotionRepository } from "@/modules/legal/infrastructure/mongoose/mongoose-legal-promotion.repository"
import { MongooseVehicleLegalNotesReader } from "@/modules/legal/infrastructure/mongoose/mongoose-vehicle-legal-notes.reader"
import {
  VehiculoModel,
  type VehiculoDocument,
} from "@/modules/vehiculo/infrastructure/mongoose/MongooseVehiculoSchema"
import { NextContentCache } from "@/shared/infrastructure/cache/next-content-cache.adapter"
import { ContentRevisionModel } from "@/shared/infrastructure/content-versioning/mongoose/content-revision.schema"
import { MongooseContentRevisionRepository } from "@/shared/infrastructure/content-versioning/mongoose/mongoose-content-revision.repository"
import { MongooseTransactionRunner } from "@/shared/infrastructure/mongoose/mongoose-transaction-runner"
import { TiptapRichContentProcessor } from "@/shared/infrastructure/rich-text/tiptap-rich-content-processor"
import { type Model } from "mongoose"

export function legalFactory() {
  const pages = new MongooseLegalPageRepository(LegalPageModel)
  const promotions = new MongooseLegalPromotionRepository(LegalPromotionModel)
  const revisions = new MongooseContentRevisionRepository(ContentRevisionModel)
  const vehicleNotes = new MongooseVehicleLegalNotesReader(
    VehiculoModel as Model<VehiculoDocument>
  )
  const processor = new TiptapRichContentProcessor()
  const tx = new MongooseTransactionRunner()
  const cache = new NextContentCache()

  return {
    // ── Sitio público ─────────────────────────────────────────────────────────
    getPublicPage: new GetPublicLegalPageUseCase(
      pages,
      promotions,
      vehicleNotes
    ),

    // ── Páginas (CMS) ─────────────────────────────────────────────────────────
    listPages: new ListLegalPagesUseCase(pages),
    getPage: new GetLegalPageUseCase(pages),
    savePageDraft: new SaveLegalPageDraftUseCase(pages, processor),
    publishPage: new PublishLegalPageUseCase(pages, revisions, tx, cache),
    discardPageDraft: new DiscardLegalPageDraftUseCase(pages),
    listPageRevisions: new ListLegalPageRevisionsUseCase(pages, revisions),
    getPageRevision: new GetLegalPageRevisionUseCase(pages, revisions),
    restorePageRevision: new RestoreLegalPageRevisionUseCase(
      pages,
      revisions,
      processor
    ),

    // ── Campañas (CMS) ────────────────────────────────────────────────────────
    listPromotions: new ListLegalPromotionsUseCase(promotions),
    getPromotion: new GetLegalPromotionUseCase(promotions),
    createPromotion: new CreateLegalPromotionUseCase(promotions, processor),
    savePromotionDraft: new SaveLegalPromotionDraftUseCase(
      promotions,
      processor
    ),
    publishPromotion: new PublishLegalPromotionUseCase(
      promotions,
      revisions,
      tx,
      cache
    ),
    discardPromotionDraft: new DiscardLegalPromotionDraftUseCase(promotions),
    updatePromotionSettings: new UpdateLegalPromotionSettingsUseCase(
      promotions,
      cache
    ),
    reorderPromotions: new ReorderLegalPromotionsUseCase(promotions, cache),
    deletePromotion: new DeleteLegalPromotionUseCase(promotions, cache),
    listPromotionRevisions: new ListLegalPromotionRevisionsUseCase(
      promotions,
      revisions
    ),
    getPromotionRevision: new GetLegalPromotionRevisionUseCase(
      promotions,
      revisions
    ),
    restorePromotionRevision: new RestoreLegalPromotionRevisionUseCase(
      promotions,
      revisions,
      processor
    ),

    // ── Migración ─────────────────────────────────────────────────────────────
    seed: new SeedLegalContentUseCase(
      pages,
      promotions,
      revisions,
      processor,
      tx,
      cache
    ),
  }
}
