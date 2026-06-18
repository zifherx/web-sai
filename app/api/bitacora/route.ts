import { getAllBitacorasHandler } from "@/modules/bitacora/presentation/bitacora.controller"
import { NextRequest } from "next/server"

/**
 * GET /api/bitacoras
 * Registros de auditoría de llamadas HTTP a Novaly (solo CMS autenticado).
 * Filtros: ?from=ISO&to=ISO&responseCode=500
 *
 * Nota: La escritura (create) no tiene endpoint HTTP — la realiza
 * `BitacoraLogger` internamente desde el cliente HTTP de Novaly.
 */
export const GET = (req: NextRequest) => getAllBitacorasHandler(req)
