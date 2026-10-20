import {
  type ContentSnapshot,
  type SeoMeta,
} from "@/shared/domain/content-versioning/versioned-content"
import { type IRichContentProcessor } from "@/shared/domain/ports/rich-content-processor.port"
import { type RichContentProfile } from "@/shared/domain/rich-text/rich-content"

export interface ContentSnapshotInput {
  title: string
  content: unknown
  seo: SeoMeta | null
}

export function buildContentSnapshot(
  processor: IRichContentProcessor,
  input: ContentSnapshotInput,
  profile: RichContentProfile
): ContentSnapshot {
  const { content, plainText } = processor.process(input.content, profile)
  return { title: input.title, content, plainText, seo: input.seo }
}
