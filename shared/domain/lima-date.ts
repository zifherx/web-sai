/**
 * Fechas de calendario en hora de Lima (UTC-05:00, sin horario de verano).
 *
 * Una vigencia "del 21/09 al 31/10" significa: desde las 00:00 del 21/09
 * hasta las 23:59:59.999 del 31/10, ambas en hora de Lima.
 */
const LIMA_OFFSET_MS = 5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

function parseDateOnly(date: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!match) throw new Error(`Fecha inválida (se espera YYYY-MM-DD): ${date}`)
  const [, y, m, d] = match
  return Date.UTC(Number(y), Number(m) - 1, Number(d))
}

/** "2026-09-21" → 2026-09-21T05:00:00.000Z (00:00 en Lima). */
export function limaStartOfDay(date: string): Date {
  return new Date(parseDateOnly(date) + LIMA_OFFSET_MS)
}

/** "2026-10-31" → 2026-11-01T04:59:59.999Z (23:59:59.999 en Lima). */
export function limaEndOfDay(date: string): Date {
  return new Date(parseDateOnly(date) + LIMA_OFFSET_MS + DAY_MS - 1)
}

/** Date → "YYYY-MM-DD" según el calendario de Lima. */
export function toLimaDateOnly(date: Date): string {
  return new Date(date.getTime() - LIMA_OFFSET_MS).toISOString().slice(0, 10)
}
