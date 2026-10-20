const LIMA_OFFSET_MS = 5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

function parseDateOnly(date: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!match) throw new Error(`Fecha inválida (se espera YYYY-MM-DD): ${date}`)
  const [, y, m, d] = match
  return Date.UTC(Number(y), Number(m) - 1, Number(d))
}

export function limaStartOfDay(date: string): Date {
  return new Date(parseDateOnly(date) + LIMA_OFFSET_MS)
}

export function limaEndOfDay(date: string): Date {
  return new Date(parseDateOnly(date) + LIMA_OFFSET_MS + DAY_MS - 1)
}

export function toLimaDateOnly(date: Date): string {
  return new Date(date.getTime() - LIMA_OFFSET_MS).toISOString().slice(0, 10)
}
