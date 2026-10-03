import {
  ContentRevisionDTO,
  ContentRevisionSummaryDTO,
  VersionedContentDTO,
} from "@/shared/application/content-versioning/versioned-content.dto"
import { ContentRevision } from "@/shared/domain/content-versioning/content-revision"
import { VersionedContent } from "@/shared/domain/content-versioning/versioned-content"

const iso = (d: Date | null): string | null => (d ? d.toISOString() : null)

export const VersionedContentMapper = {
  toDTO(v: VersionedContent): VersionedContentDTO {
    return {
      status: v.status,
      lockVersion: v.lockVersion,
      draft: {
        title: v.draft.title,
        content: v.draft.content,
        seo: v.draft.seo,
        updatedAt: v.draft.updatedAt.toISOString(),
        updatedBy: v.draft.updatedBy,
      },
      published: v.published
        ? {
            title: v.published.title,
            content: v.published.content,
            seo: v.published.seo,
            version: v.published.version,
            publishedAt: v.published.publishedAt.toISOString(),
            publishedBy: v.published.publishedBy,
          }
        : null,
    }
  },

  toRevisionSummaryDTO(r: ContentRevision): ContentRevisionSummaryDTO {
    return {
      id: r.id,
      version: r.version,
      title: r.snapshot.title,
      publishedAt: r.publishedAt.toISOString(),
      publishedBy: r.publishedBy,
      note: r.note,
    }
  },

  toRevisionDTO(r: ContentRevision): ContentRevisionDTO {
    return {
      ...VersionedContentMapper.toRevisionSummaryDTO(r),
      content: r.snapshot.content,
      plainText: r.snapshot.plainText,
      seo: r.snapshot.seo,
      operational: r.operational
        ? {
            validFrom: iso(r.operational.validFrom),
            validTo: iso(r.operational.validTo),
            isActive: r.operational.isActive,
          }
        : null,
    }
  },
}
