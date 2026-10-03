import {
  ContentSnapshot,
  SeoMeta,
} from "@/shared/domain/content-versioning/versioned-content"
import { IRichContentProcessor } from "@/shared/domain/ports/rich-content-processor.port"
import { RichContentProfile } from "@/shared/domain/rich-text/rich-content"

export interface ContentSnapshotInput {
  title: string
  content: unknown
  seo: SeoMeta | null
}

/**
 * Valida el JSON enriquecido con el perfil indicado y arma el snapshot
 * (con `plainText` derivado). Lanza `InvalidRichContentError` si no es válido.
 */
export function buildContentSnapshot(
  processor: IRichContentProcessor,
  input: ContentSnapshotInput,
  profile: RichContentProfile
): ContentSnapshot {
  const { content, plainText } = processor.process(input.content, profile)
  return { title: input.title, content, plainText, seo: input.seo }
}
