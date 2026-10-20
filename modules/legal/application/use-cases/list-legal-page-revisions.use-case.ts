import { type ContentRevisionSummaryDTO } from "@/modules/legal/application/dto/legal.dto"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { VersionedContentMapper } from "@/shared/application/content-versioning/versioned-content.mapper"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"

export class ListLegalPageRevisionsUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly revisions: IContentRevisionRepository
  ) {}

  async execute(slug: LegalSlug): Promise<ContentRevisionSummaryDTO[]> {
    const page = await this.pages.findBySlug(slug)
    if (!page) throw new LegalPageNotFoundError(slug)
    const items = await this.revisions.findByEntity("legal-page", page.id)
    return items.map((r) => VersionedContentMapper.toRevisionSummaryDTO(r))
  }
}
