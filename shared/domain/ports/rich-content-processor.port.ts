import {
  type RichContent,
  type RichContentProfile,
} from "@/shared/domain/rich-text/rich-content"

export interface ProcessedRichContent {
  readonly content: RichContent
  readonly plainText: string
}

export interface IRichContentProcessor {
  process(input: unknown, profile: RichContentProfile): ProcessedRichContent
}
