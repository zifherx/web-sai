import { Extension, type CommandProps } from "@tiptap/core"

export const MAX_INDENT = 3
export const INDENTABLE_NODE_TYPES = [
  "paragraph",
  "heading",
  "bulletList",
  "orderedList",
] as const

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      /** Aumenta la sangría del bloque (o bloques) seleccionado. */
      indent: () => ReturnType
      /** Disminuye la sangría del bloque (o bloques) seleccionado. */
      outdent: () => ReturnType
    }
  }
}

const clampIndent = (value: number): number =>
  Math.min(MAX_INDENT, Math.max(0, Math.trunc(value)))

function changeIndent(delta: 1 | -1) {
  return ({ state, tr, dispatch }: CommandProps): boolean => {
    const { from, to } = state.selection
    let changed = false

    state.doc.nodesBetween(from, to, (node, pos) => {
      const isIndentable = (
        INDENTABLE_NODE_TYPES as readonly string[]
      ).includes(node.type.name)
      if (!isIndentable) return true // seguir buscando dentro

      const current = Number(node.attrs.indent ?? 0)
      const next = clampIndent(current + delta)
      if (next !== current) {
        tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next })
        changed = true
      }
      // Una lista se sangra completa: no descender a sus párrafos internos.
      return false
    })

    if (changed && dispatch) dispatch(tr)
    return changed
  }
}

/**
 * Sangría de bloques (0 a MAX_INDENT) — no existe extensión oficial gratuita.
 *
 * Se serializa como `data-indent="n"`; el estilo lo define `.legal-content`
 * en `globals.css`, igual en el editor y en el sitio público.
 *
 * Atajos: Mod-] / Mod-[ (Tab queda reservado para anidar listas).
 * Isomórfica: sin node views, se usa en servidor (validación) y cliente.
 */
export const Indent = Extension.create({
  name: "indent",

  addGlobalAttributes() {
    return [
      {
        types: [...INDENTABLE_NODE_TYPES],
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) =>
              clampIndent(Number(element.getAttribute("data-indent") ?? 0)),
            renderHTML: (attributes) =>
              attributes.indent
                ? { "data-indent": String(attributes.indent) }
                : {},
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent: () => changeIndent(1),
      outdent: () => changeIndent(-1),
    }
  },

  addKeyboardShortcuts() {
    return {
      "Mod-]": () => this.editor.commands.indent(),
      "Mod-[": () => this.editor.commands.outdent(),
    }
  },
})
