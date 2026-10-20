import {
  type LegalPromotionDTO,
  type PublishDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LEGAL_PROMOTIONS_PATH } from "@/modules/legal/application/legal-public-paths"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { LegalPromotionNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { ContentRevision } from "@/shared/domain/content-versioning/content-revision"
import { VersionConflictError } from "@/shared/domain/content-versioning/content-versioning.error"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IContentCache } from "@/shared/domain/ports/content-cache.port"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"
import { type ITransactionRunner } from "@/shared/domain/ports/transaction-runner.port"

export class PublishLegalPromotionUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly revisions: IContentRevisionRepository,
    private readonly tx: ITransactionRunner,
    private readonly cache: IContentCache,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    id: string,
    dto: PublishDTO,
    author: ContentAuthor
  ): Promise<LegalPromotionDTO> {
    const promotion = await this.promotions.findById(id)
    if (!promotion) throw new LegalPromotionNotFoundError(id)
    promotion.versioned.assertLockVersion(dto.lockVersion)

    const now = this.clock()
    const { versioned, publication } = promotion.versioned.publish(author, now)

    const saved = await this.tx.run(async (tx) => {
      const updated = await this.promotions.saveVersioned(
        id,
        versioned,
        dto.lockVersion,
        tx
      )
      if (!updated) throw new VersionConflictError()
      await this.revisions.create(
        ContentRevision.fromPublication(
          "legal-promotion",
          id,
          publication,
          dto.note,
          promotion.operationalSnapshot()
        ),
        tx
      )
      return updated
    })

    this.cache.invalidatePaths([LEGAL_PROMOTIONS_PATH])
    return LegalMapper.toPromotionDTO(saved, now)
  }
}
