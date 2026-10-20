import {
  type LegalPromotionSummaryDTO,
  type ReorderLegalPromotionsDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LEGAL_PROMOTIONS_PATH } from "@/modules/legal/application/legal-public-paths"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { InvalidPromotionOrderError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IContentCache } from "@/shared/domain/ports/content-cache.port"

export class ReorderLegalPromotionsUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly cache: IContentCache,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    dto: ReorderLegalPromotionsDTO
  ): Promise<LegalPromotionSummaryDTO[]> {
    const current = await this.promotions.findAll()
    const currentIds = new Set(current.map((p) => p.id))
    const isSameSet =
      dto.ids.length === currentIds.size &&
      dto.ids.every((id) => currentIds.has(id))
    if (!isSameSet) throw new InvalidPromotionOrderError()

    await this.promotions.reorder(dto.ids)
    this.cache.invalidatePaths([LEGAL_PROMOTIONS_PATH])

    const now = this.clock()
    const reordered = await this.promotions.findAll()
    return reordered.map((p) => LegalMapper.toPromotionSummaryDTO(p, now))
  }
}
