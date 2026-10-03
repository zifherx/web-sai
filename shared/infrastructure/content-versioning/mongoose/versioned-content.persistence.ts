import {
  ContentAuthor,
  SeoMeta,
  VersionedContent,
} from "@/shared/domain/content-versioning/versioned-content"
import { RichContent } from "@/shared/domain/rich-text/rich-content"
import {
  ContentAuthorDoc,
  SeoMetaDoc,
  VersionedContentDocFields,
} from "@/shared/infrastructure/content-versioning/mongoose/versioned-content.subschema"

const toAuthor = (a: ContentAuthorDoc): ContentAuthor => ({
  userId: a.userId,
  name: a.name,
})

const toSeo = (s: SeoMetaDoc | null | undefined): SeoMeta | null =>
  s ? { title: s.title, description: s.description } : null

/** Documento (lean) → value object. Siempre con constructor, nunca literal. */
export function toVersionedContent(
  doc: VersionedContentDocFields
): VersionedContent {
  const { draft, published } = doc
  return new VersionedContent(
    {
      title: draft.title,
      content: draft.content as RichContent,
      plainText: draft.plainText ?? "",
      seo: toSeo(draft.seo),
      updatedAt: draft.updatedAt,
      updatedBy: toAuthor(draft.updatedBy),
    },
    published
      ? {
          title: published.title,
          content: published.content as RichContent,
          plainText: published.plainText ?? "",
          seo: toSeo(published.seo),
          version: published.version,
          publishedAt: published.publishedAt,
          publishedBy: toAuthor(published.publishedBy),
        }
      : null,
    doc.lockVersion ?? 0
  )
}

/** Value object → campos a persistir (`$set` o `create`). */
export function fromVersionedContent(
  v: VersionedContent
): VersionedContentDocFields {
  return {
    draft: {
      title: v.draft.title,
      content: v.draft.content as Record<string, unknown>,
      plainText: v.draft.plainText,
      seo: v.draft.seo ? { ...v.draft.seo } : null,
      updatedAt: v.draft.updatedAt,
      updatedBy: { ...v.draft.updatedBy },
    },
    published: v.published
      ? {
          title: v.published.title,
          content: v.published.content as Record<string, unknown>,
          plainText: v.published.plainText,
          seo: v.published.seo ? { ...v.published.seo } : null,
          version: v.published.version,
          publishedAt: v.published.publishedAt,
          publishedBy: { ...v.published.publishedBy },
        }
      : null,
    lockVersion: v.lockVersion,
  }
}
