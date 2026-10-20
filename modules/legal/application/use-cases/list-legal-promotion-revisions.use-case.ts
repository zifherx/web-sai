import { type ContentRevisionSummaryDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalPromotionNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { VersionedContentMapper } from "@/shared/application/content-versioning/versioned-content.mapper"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"

export class ListLegalPromotionRevisionsUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly revisions: IContentRevisionRepository
  ) {}

  async execute(id: string): Promise<ContentRevisionSummaryDTO[]> {
    const promotion = await this.promotions.findById(id)
    if (!promotion) throw new LegalPromotionNotFoundError(id)
    const items = await this.revisions.findByEntity(
      "legal-promotion",
      promotion.id
    )
    return items.map((r) => VersionedContentMapper.toRevisionSummaryDTO(r))
  }
}
