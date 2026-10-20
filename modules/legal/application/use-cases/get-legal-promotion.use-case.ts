import { type LegalPromotionDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { LegalPromotionNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"

export class GetLegalPromotionUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(id: string): Promise<LegalPromotionDTO> {
    const promotion = await this.promotions.findById(id)
    if (!promotion) throw new LegalPromotionNotFoundError(id)
    return LegalMapper.toPromotionDTO(promotion, this.clock())
  }
}
