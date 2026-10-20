import {
  type LegalPageDTO,
  type LockOnlyDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { VersionConflictError } from "@/shared/domain/content-versioning/content-versioning.error"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"

export class DiscardLegalPageDraftUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    slug: LegalSlug,
    dto: LockOnlyDTO,
    author: ContentAuthor
  ): Promise<LegalPageDTO> {
    const page = await this.pages.findBySlug(slug)
    if (!page) throw new LegalPageNotFoundError(slug)
    page.versioned.assertLockVersion(dto.lockVersion)

    const next = page.versioned.discardDraft(author, this.clock())
    const saved = await this.pages.saveVersioned(page.id, next, dto.lockVersion)
    if (!saved) throw new VersionConflictError()
    return LegalMapper.toPageDTO(saved)
  }
}
