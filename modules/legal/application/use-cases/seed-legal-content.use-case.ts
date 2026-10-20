import {
  type LegalSeedInput,
  type LegalSeedResultDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { ALL_LEGAL_PATHS } from "@/modules/legal/application/legal-public-paths"
import { LegalPromotionEntity } from "@/modules/legal/domain/entities/legal-promotion"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { buildContentSnapshot } from "@/shared/application/content-versioning/build-content-snapshot"
import { ContentRevision } from "@/shared/domain/content-versioning/content-revision"
import {
  type ContentAuthor,
  VersionedContent,
} from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IContentCache } from "@/shared/domain/ports/content-cache.port"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"
import { type IRichContentProcessor } from "@/shared/domain/ports/rich-content-processor.port"
import { type ITransactionRunner } from "@/shared/domain/ports/transaction-runner.port"

export const SEED_AUTHOR: ContentAuthor = {
  userId: "system-seed",
  name: "Migración inicial",
}
const SEED_NOTE = "Migración inicial desde constants/legal.constants.ts"

export class SeedLegalContentUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly promotions: ILegalPromotionRepository,
    private readonly revisions: IContentRevisionRepository,
    private readonly processor: IRichContentProcessor,
    private readonly tx: ITransactionRunner,
    private readonly cache: IContentCache,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(seed: LegalSeedInput): Promise<LegalSeedResultDTO> {
    const now = this.clock()
    const result: LegalSeedResultDTO = { created: [], skipped: [] }

    for (const page of seed.pages) {
      const key = `page:${page.slug}`
      if (await this.pages.findBySlug(page.slug)) {
        result.skipped.push(key)
        continue
      }
      const versioned = VersionedContent.createPublished(
        buildContentSnapshot(this.processor, page, "rich"),
        SEED_AUTHOR,
        now
      )
      const publication = versioned.published
      if (!publication)
        throw new Error("createPublished debe devolver una publicación")

      await this.tx.run(async (tx) => {
        const created = await this.pages.create(
          { slug: page.slug, versioned },
          tx
        )
        await this.revisions.create(
          ContentRevision.fromPublication(
            "legal-page",
            created.id,
            publication,
            SEED_NOTE
          ),
          tx
        )
      })
      result.created.push(key)
    }

    for (const [index, promo] of seed.promotions.entries()) {
      const key = `promotion:${promo.slug}`
      if (await this.promotions.findBySlug(promo.slug)) {
        result.skipped.push(key)
        continue
      }
      LegalPromotionEntity.assertValidRange(promo.validFrom, promo.validTo)

      const versioned = VersionedContent.createPublished(
        buildContentSnapshot(
          this.processor,
          { title: promo.title, content: promo.content, seo: null },
          "rich-with-tables"
        ),
        SEED_AUTHOR,
        now
      )
      const publication = versioned.published
      if (!publication)
        throw new Error("createPublished debe devolver una publicación")

      await this.tx.run(async (tx) => {
        const created = await this.promotions.create(
          {
            slug: promo.slug,
            order: index + 1,
            versioned,
            validFrom: promo.validFrom,
            validTo: promo.validTo,
            isActive: promo.isActive,
            attachment: null,
          },
          tx
        )
        await this.revisions.create(
          ContentRevision.fromPublication(
            "legal-promotion",
            created.id,
            publication,
            SEED_NOTE,
            created.operationalSnapshot()
          ),
          tx
        )
      })
      result.created.push(key)
    }

    if (result.created.length > 0) this.cache.invalidatePaths(ALL_LEGAL_PATHS)
    return result
  }
}
