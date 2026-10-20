import { type RichContentProfile } from "@/shared/domain/rich-text/rich-content"
import { Indent } from "@/shared/infrastructure/rich-text/extensions/indent.extension"
import type { Extensions } from "@tiptap/core"
import { TableKit } from "@tiptap/extension-table"
import StarterKit from "@tiptap/starter-kit"

export const HEADING_LEVELS = [2, 3] as const

export const ORDERED_LIST_TYPES = ["1", "a", "A", "i", "I"] as const

const linkConfig = () => ({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["mailto", "tel"],
})

function fullStarterKit() {
  return StarterKit.configure({
    heading: { levels: [...HEADING_LEVELS] },
    code: false,
    codeBlock: false,
    link: linkConfig(),
  })
}

export function richTextExtensions(profile: RichContentProfile): Extensions {
  switch (profile) {
    case "rich":
      return [fullStarterKit(), Indent]

    case "rich-with-tables":
      return [
        fullStarterKit(),
        Indent,
        TableKit.configure({ table: { resizable: false } }),
      ]

    case "minimal":
      return [
        StarterKit.configure({
          heading: false,
          blockquote: false,
          bulletList: false,
          orderedList: false,
          listItem: false,
          listKeymap: false,
          code: false,
          codeBlock: false,
          horizontalRule: false,
          strike: false,
          link: linkConfig(),
        }),
      ]
  }
}
