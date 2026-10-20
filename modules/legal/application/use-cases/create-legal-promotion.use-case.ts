import {
  type CreateLegalPromotionDTO,
  type LegalPromotionDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { LegalPromotionEntity } from "@/modules/legal/domain/entities/legal-promotion"
import { LegalPromotionSlugTakenError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPromotionRepository } from "@/modules/legal/domain/repositories/legal-promotion.repository"
import { buildContentSnapshot } from "@/shared/application/content-versioning/build-content-snapshot"
import {
  type ContentAuthor,
  VersionedContent,
} from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IRichContentProcessor } from "@/shared/domain/ports/rich-content-processor.port"
import { EMPTY_RICH_CONTENT } from "@/shared/domain/rich-text/rich-content"

export class CreateLegalPromotionUseCase {
  constructor(
    private readonly promotions: ILegalPromotionRepository,
    private readonly processor: IRichContentProcessor,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    dto: CreateLegalPromotionDTO,
    author: ContentAuthor
  ): Promise<LegalPromotionDTO> {
    if (await this.promotions.findBySlug(dto.slug)) {
      throw new LegalPromotionSlugTakenError(dto.slug)
    }
    LegalPromotionEntity.assertValidRange(dto.validFrom, dto.validTo)

    const now = this.clock()
    const snapshot = buildContentSnapshot(
      this.processor,
      {
        title: dto.title,
        content: dto.content ?? EMPTY_RICH_CONTENT,
        seo: null,
      },
      "rich-with-tables"
    )

    const created = await this.promotions.create({
      slug: dto.slug,
      order: await this.promotions.nextOrder(),
      versioned: VersionedContent.createDraft(snapshot, author, now),
      validFrom: dto.validFrom,
      validTo: dto.validTo,
      isActive: dto.isActive,
      attachment: dto.attachment,
    })
    return LegalMapper.toPromotionDTO(created, now)
  }
}
