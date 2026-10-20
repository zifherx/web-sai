import { type ContentRevisionDTO } from "@/modules/legal/application/dto/legal.dto"
import { type LegalSlug } from "@/modules/legal/domain/entities/legal-page"
import { LegalPageNotFoundError } from "@/modules/legal/domain/errors/legal.error"
import { type ILegalPageRepository } from "@/modules/legal/domain/repositories/legal-page.repository"
import { VersionedContentMapper } from "@/shared/application/content-versioning/versioned-content.mapper"
import { ContentRevisionNotFoundError } from "@/shared/domain/content-versioning/content-versioning.error"
import { type IContentRevisionRepository } from "@/shared/domain/ports/content-revision.repository"

export class GetLegalPageRevisionUseCase {
  constructor(
    private readonly pages: ILegalPageRepository,
    private readonly revisions: IContentRevisionRepository
  ) {}

  async execute(
    slug: LegalSlug,
    revisionId: string
  ): Promise<ContentRevisionDTO> {
    const page = await this.pages.findBySlug(slug)
    if (!page) throw new LegalPageNotFoundError(slug)

    const revision = await this.revisions.findById(revisionId)
    if (!revision || !revision.belongsTo("legal-page", page.id)) {
      throw new ContentRevisionNotFoundError(revisionId)
    }
    return VersionedContentMapper.toRevisionDTO(revision)
  }
}
