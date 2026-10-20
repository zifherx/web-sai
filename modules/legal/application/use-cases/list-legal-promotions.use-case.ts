import { type LegalPromotionSummaryDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"

export class ListLegalPromotionsUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(): Promise<LegalPromotionSummaryDTO[]> {
    const now = this.clock()
    const items = await this.promotions.findAll()
    return items.map((p) => LegalMapper.toPromotionSummaryDTO(p, now))
  }
}
