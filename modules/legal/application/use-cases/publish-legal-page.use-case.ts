import {
  type LegalPageDTO,
  type PublishDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { legalPagePath } from "@/modules/legal/application/legal-public-paths"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { ContentRevision } from "@/shared/domain/content-versioning/content-revision"
import { VersionConflictError } from "@/shared/domain/content-versioning/content-versioning.error"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IContentCache } from "@/shared/domain/ports/content-cache.port"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"
import { type ITransactionRunner } from "@/shared/domain/ports/transaction-runner.port"

export class PublishLegalPageUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly revisions: IContentRevisionRepository,
    private readonly tx: ITransactionRunner,
    private readonly cache: IContentCache,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    slug: LegalSlug,
    dto: PublishDTO,
    author: ContentAuthor
  ): Promise<LegalPageDTO> {
    const page = await this.pages.findBySlug(slug)
    if (!page) throw new LegalPageNotFoundError(slug)
    page.versioned.assertLockVersion(dto.lockVersion)

    const { versioned, publication } = page.versioned.publish(
      author,
      this.clock()
    )

    const saved = await this.tx.run(async (tx) => {
      const updated = await this.pages.saveVersioned(
        page.id,
        versioned,
        dto.lockVersion,
        tx
      )
      if (!updated) throw new VersionConflictError()
      await this.revisions.create(
        ContentRevision.fromPublication(
          "legal-page",
          page.id,
          publication,
          dto.note
        ),
        tx
      )
      return updated
    })

    this.cache.invalidatePaths([legalPagePath(slug)])
    return LegalMapper.toPageDTO(saved)
  }
}
