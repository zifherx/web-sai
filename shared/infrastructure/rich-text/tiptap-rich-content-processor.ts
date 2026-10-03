import {
  IRichContentProcessor,
  ProcessedRichContent,
} from "@/shared/domain/ports/rich-content-processor.port"
import {
  InvalidRichContentError,
  RichContent,
  RichContentProfile,
} from "@/shared/domain/rich-text/rich-content"
import { MAX_INDENT } from "@/shared/infrastructure/rich-text/extensions/indent.extension"
import {
  HEADING_LEVELS,
  ORDERED_LIST_TYPES,
  richTextExtensions,
} from "@/shared/infrastructure/rich-text/extensions/rich-text-profiles"
import { getSchema } from "@tiptap/core"
import type { Node as PMNode, Schema } from "@tiptap/pm/model"

/** Límite de tamaño del JSON serializado (≈ 300 KB). */
export const MAX_RICH_CONTENT_BYTES = 300_000

/** https://, mailto:, tel:, ruta interna "/..." (no "//") o ancla "#...". */
const ALLOWED_HREF = /^(https:\/\/|mailto:|tel:|\/(?!\/)|#)/i

/** Los esquemas se construyen una vez por perfil (instancia serverless). */
const schemaCache = new Map<RichContentProfile, Schema>()

function schemaFor(profile: RichContentProfile): Schema {
  let schema = schemaCache.get(profile)
  if (!schema) {
    schema = getSchema(richTextExtensions(profile))
    schemaCache.set(profile, schema)
  }
  return schema
}

function isDocLike(input: unknown): input is { type: "doc" } {
  return (
    typeof input === "object" &&
    input !== null &&
    !Array.isArray(input) &&
    (input as { type?: unknown }).type === "doc"
  )
}

/**
 * Adaptador Tiptap del puerto `IRichContentProcessor`.
 *
 * 1. Tamaño máximo.
 * 2. Esquema ProseMirror del perfil: rechaza nodos/marcas no permitidos
 *    y descarta atributos desconocidos (`nodeFromJSON` + `check`).
 * 3. Reglas adicionales que el esquema no expresa: protocolos de enlace,
 *    niveles de título, rango de sangría y tipo de lista.
 *
 * No requiere DOM ni instancia de editor: corre en el runtime Node de Vercel.
 */
export class TiptapRichContentProcessor implements IRichContentProcessor {
  process(input: unknown, profile: RichContentProfile): ProcessedRichContent {
    if (!isDocLike(input)) {
      throw new InvalidRichContentError(
        'se esperaba un documento { type: "doc" }'
      )
    }
    if (JSON.stringify(input).length > MAX_RICH_CONTENT_BYTES) {
      throw new InvalidRichContentError("el documento excede el tamaño máximo")
    }

    let doc: PMNode
    try {
      doc = schemaFor(profile).nodeFromJSON(input)
      doc.check()
    } catch (err) {
      const detail =
        err instanceof Error ? err.message : "estructura no permitida"
      throw new InvalidRichContentError(`estructura no permitida (${detail})`)
    }

    assertBusinessRules(doc)

    return {
      content: doc.toJSON() as RichContent,
      plainText: doc.textBetween(0, doc.content.size, "\n", "\n").trim(),
    }
  }
}

function assertBusinessRules(doc: PMNode): void {
  doc.descendants((node) => {
    for (const mark of node.marks) {
      if (mark.type.name === "link") {
        const href = String(mark.attrs.href ?? "")
        if (!ALLOWED_HREF.test(href)) {
          throw new InvalidRichContentError(`enlace no permitido: "${href}"`)
        }
      }
    }

    const { name } = node.type
    if (
      name === "heading" &&
      !(HEADING_LEVELS as readonly number[]).includes(node.attrs.level)
    ) {
      throw new InvalidRichContentError(
        `nivel de título no permitido: ${node.attrs.level}`
      )
    }
    if ("indent" in node.attrs) {
      const indent = node.attrs.indent
      if (!Number.isInteger(indent) || indent < 0 || indent > MAX_INDENT) {
        throw new InvalidRichContentError(
          `sangría fuera de rango: ${String(indent)}`
        )
      }
    }
    if (name === "orderedList") {
      const type = node.attrs.type
      if (
        type !== null &&
        !(ORDERED_LIST_TYPES as readonly string[]).includes(type)
      ) {
        throw new InvalidRichContentError(
          `tipo de lista no permitido: ${String(type)}`
        )
      }
    }
    return true
  })
}
