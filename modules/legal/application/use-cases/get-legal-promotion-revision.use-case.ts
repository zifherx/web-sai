import { type ContentRevisionDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalPromotionNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { VersionedContentMapper } from "@/shared/application/content-versioning/versioned-content.mapper"
import { ContentRevisionNotFoundError } from "@/shared/domain/content-versioning/content-versioning.error"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"

export class GetLegalPromotionRevisionUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly revisions: IContentRevisionRepository
  ) {}

  async execute(id: string, revisionId: string): Promise<ContentRevisionDTO> {
    const promotion = await this.promotions.findById(id)
    if (!promotion) throw new LegalPromotionNotFoundError(id)

    const revision = await this.revisions.findById(revisionId)
    if (!revision || !revision.belongsTo("legal-promotion", promotion.id)) {
      throw new ContentRevisionNotFoundError(revisionId)
    }
    return VersionedContentMapper.toRevisionDTO(revision)
  }
}
