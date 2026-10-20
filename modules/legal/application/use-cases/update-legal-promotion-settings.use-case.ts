import {
  type LegalPromotionDTO,
  type UpdateLegalPromotionSettingsDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LEGAL_PROMOTIONS_PATH } from "@/modules/legal/application/legal-public-paths"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { LegalPromotionEntity } from "@/modules/legal/domain/entities/legal-promotion"
import { LegalPromotionNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IContentCache } from "@/shared/domain/ports/content-cache.port"

export class UpdateLegalPromotionSettingsUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly cache: IContentCache,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    id: string,
    dto: UpdateLegalPromotionSettingsDTO
  ): Promise<LegalPromotionDTO> {
    LegalPromotionEntity.assertValidRange(dto.validFrom, dto.validTo)

    const updated = await this.promotions.updateSettings(id, dto)
    if (!updated) throw new LegalPromotionNotFoundError(id)

    if (updated.versioned.published) {
      this.cache.invalidatePaths([LEGAL_PROMOTIONS_PATH])
    }
    return LegalMapper.toPromotionDTO(updated, this.clock())
  }
}
