import { type PublicLegalPageDTO } from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { type IVehicleLegalNotesReader } from "@/modules/legal/domain/repositories/vehicle-legal-notes.reader"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"

export class GetPublicLegalPageUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly promotions: ILegalPromotionRepository,
    private readonly vehicleNotes: IVehicleLegalNotesReader,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(slug: LegalSlug): Promise<PublicLegalPageDTO> {
    const page = await this.pages.findBySlug(slug)
    const publication = page?.versioned.published
    if (!page || !publication) throw new LegalPageNotFoundError(slug)

    if (!page.isPromotionsPage()) {
      return LegalMapper.toPublicPageDTO(page, publication, [], [])
    }

    const now = this.clock()
    const [promotions, notes] = await Promise.all([
      this.promotions.findActivePublished(),
      this.vehicleNotes.findPublishedForLegalPage(),
    ])

    return LegalMapper.toPublicPageDTO(
      page,
      publication,
      promotions.filter((p: any) => p.isVisibleAt(now)),
      notes
    )
  }
}
