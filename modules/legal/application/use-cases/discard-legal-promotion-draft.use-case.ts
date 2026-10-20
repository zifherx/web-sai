import {
  type LegalPromotionDTO,
  type LockOnlyDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { LegalPromotionNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { VersionConflictError } from "@/shared/domain/content-versioning/content-versioning.error"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"

export class DiscardLegalPromotionDraftUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    id: string,
    dto: LockOnlyDTO,
    author: ContentAuthor
  ): Promise<LegalPromotionDTO> {
    const promotion = await this.promotions.findById(id)
    if (!promotion) throw new LegalPromotionNotFoundError(id)
    promotion.versioned.assertLockVersion(dto.lockVersion)

    const now = this.clock()
    const next = promotion.versioned.discardDraft(author, now)
    const saved = await this.promotions.saveVersioned(id, next, dto.lockVersion)
    if (!saved) throw new VersionConflictError()
    return LegalMapper.toPromotionDTO(saved, now)
  }
}
