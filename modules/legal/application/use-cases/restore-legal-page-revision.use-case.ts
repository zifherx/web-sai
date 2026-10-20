import {
  type LegalPageDTO,
  type LockOnlyDTO,
} from "@/modules/legal/application/dto/legal.dto"
import { LegalMapper } from "@/modules/legal/application/ports/legal.mapper"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { buildContentSnapshot } from "@/shared/application/content-versioning/build-content-snapshot"
import {
  ContentRevisionNotFoundError,
  VersionConflictError,
} from "@/shared/domain/content-versioning/content-versioning.error"
import { type ContentAuthor } from "@/shared/domain/content-versioning/versioned-content"
import { type Clock, systemClock } from "@/shared/domain/ports/clock.port"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"
import { type IRichContentProcessor } from "@/shared/domain/ports/rich-content-processor.port"

export class RestoreLegalPageRevisionUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly revisions: IContentRevisionRepository,
    private readonly processor: IRichContentProcessor,
    private readonly clock: Clock = systemClock
  ) {}

  async execute(
    slug: LegalSlug,
    revisionId: string,
    dto: LockOnlyDTO,
    author: ContentAuthor
  ): Promise<LegalPageDTO> {
    const page = await this.pages.findBySlug(slug)
    if (!page) throw new LegalPageNotFoundError(slug)
    page.versioned.assertLockVersion(dto.lockVersion)

    const revision = await this.revisions.findById(revisionId)
    if (!revision || !revision.belongsTo("legal-page", page.id)) {
      throw new ContentRevisionNotFoundError(revisionId)
    }

    const snapshot = buildContentSnapshot(
      this.processor,
      revision.snapshot,
      "rich"
    )
    const next = page.versioned.restoreDraft(snapshot, author, this.clock())

    const saved = await this.pages.saveVersioned(page.id, next, dto.lockVersion)
    if (!saved) throw new VersionConflictError()
    return LegalMapper.toPageDTO(saved)
  }
}
