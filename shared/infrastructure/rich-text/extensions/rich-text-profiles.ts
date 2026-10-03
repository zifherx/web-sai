import { RichContentProfile } from "@/shared/domain/rich-text/rich-content"
import { Indent } from "@/shared/infrastructure/rich-text/extensions/indent.extension"
import type { Extensions } from "@tiptap/core"
import { TableKit } from "@tiptap/extension-table"
import StarterKit from "@tiptap/starter-kit"

/**
 * ÚNICA fuente de verdad de las extensiones por perfil.
 * La usan: el validador del servidor, el renderer público (fase 5)
 * y el editor del CMS (fase 6). Agregar un formato = tocar solo este archivo.
 *
 * Nota: en Tiptap v3 `OrderedList` ya soporta el atributo `type`
 * ("1" | "a" | "A" | "i" | "I") e incluso lo detecta al pegar desde Word,
 * por lo que las listas con letras NO requieren extensión propia.
 */

/** Niveles de título permitidos. H1 se reserva para el título de la página. */
export const HEADING_LEVELS = [2, 3] as const

export const ORDERED_LIST_TYPES = ["1", "a", "A", "i", "I"] as const

/**
 * Enlaces: el editor acepta https, mailto y tel. El servidor lo vuelve a
 * validar (`TiptapRichContentProcessor`), que es la barrera real.
 */
const linkConfig = () => ({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["mailto", "tel"],
})

function legalStarterKit() {
  return StarterKit.configure({
    heading: { levels: [...HEADING_LEVELS] },
    code: false,
    codeBlock: false,
    link: linkConfig(),
  })
}

export function richTextExtensions(profile: RichContentProfile): Extensions {
  switch (profile) {
    case "legal-page":
      return [legalStarterKit(), Indent]

    case "legal-promotion":
      return [
        legalStarterKit(),
        Indent,
        TableKit.configure({ table: { resizable: false } }),
      ]

    case "vehicle-legal-note":
      // Nota corta junto al precio: solo párrafos, negrita, cursiva, subrayado y enlaces.
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
