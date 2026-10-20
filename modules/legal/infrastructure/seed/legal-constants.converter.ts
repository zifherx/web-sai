export interface LegacyParrafo {
  readonly id: string
  readonly text: string
}

export interface LegacySection {
  readonly id: string
  readonly title?: string
  readonly indentLevel?: 0 | 1 | 2
  readonly parrafos: readonly LegacyParrafo[]
}

interface JsonMark {
  type: string
}
interface JsonNode {
  type: string
  attrs?: Record<string, unknown>
  content?: JsonNode[]
  text?: string
  marks?: JsonMark[]
}
export interface JsonDoc {
  type: "doc"
  content: JsonNode[]
}

const BULLET = /^-\s+/
const LETTER = /^([a-z])\)\s*/i

export function normalizeText(text: string): string {
  return text.replace(/\t/g, " ").replace(/ {2,}/g, " ").trim()
}

export function parseInline(text: string): JsonNode[] {
  const nodes: JsonNode[] = []
  const pattern = /\*\*(.+?)\*\*/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last)
      nodes.push({ type: "text", text: text.slice(last, index) })
    const bold = match[1] ?? ""
    if (bold)
      nodes.push({ type: "text", text: bold, marks: [{ type: "bold" }] })
    last = index + match[0].length
  }
  if (last < text.length) nodes.push({ type: "text", text: text.slice(last) })
  return nodes.filter((n) => (n.text ?? "").length > 0)
}

function paragraph(text: string, indent: number): JsonNode {
  const content = parseInline(text)
  return {
    type: "paragraph",
    attrs: { indent },
    ...(content.length > 0 ? { content } : {}),
  }
}

function listItem(text: string): JsonNode {
  return { type: "listItem", content: [paragraph(text, 0)] }
}

type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "letter"; letter: string; text: string }

function classify(raw: string): Block | null {
  const text = normalizeText(raw)
  if (!text) return null
  if (BULLET.test(text))
    return { kind: "bullet", text: text.replace(BULLET, "") }
  const letter = LETTER.exec(text)
  if (letter?.[1]) {
    return {
      kind: "letter",
      letter: letter[1].toLowerCase(),
      text: text.replace(LETTER, ""),
    }
  }
  return { kind: "paragraph", text }
}

function sectionToNodes(
  section: LegacySection,
  headingLevel: 2 | 3
): JsonNode[] {
  const indent = section.indentLevel ?? 0
  const nodes: JsonNode[] = []

  const title = normalizeText(section.title ?? "")
  if (title) {
    nodes.push({
      type: "heading",
      attrs: { level: headingLevel, indent },
      content: parseInline(title),
    })
  }

  const blocks = section.parrafos
    .map((p) => classify(p.text))
    .filter((b): b is Block => b !== null)

  for (let i = 0; i < blocks.length; ) {
    const block = blocks[i]
    if (!block) break

    if (block.kind === "paragraph") {
      nodes.push(paragraph(block.text, indent))
      i++
      continue
    }

    const items: Block[] = []
    while (i < blocks.length && blocks[i]?.kind === block.kind) {
      items.push(blocks[i] as Block)
      i++
    }

    if (block.kind === "bullet") {
      nodes.push({
        type: "bulletList",
        attrs: { indent },
        content: items.map((it) => listItem(it.text)),
      })
    } else {
      const first = block.letter.charCodeAt(0) - "a".charCodeAt(0) + 1
      nodes.push({
        type: "orderedList",
        attrs: { indent, start: first, type: "a" },
        content: items.map((it) => listItem(it.text)),
      })
    }
  }

  return nodes
}

export function sectionsToRichContent(
  sections: readonly LegacySection[],
  headingLevel: 2 | 3 = 2
): JsonDoc {
  const content = sections.flatMap((s) => sectionToNodes(s, headingLevel))
  return {
    type: "doc",
    content: content.length > 0 ? content : [{ type: "paragraph" }],
  }
}
