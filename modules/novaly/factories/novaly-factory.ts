import { createBitacoraLogger } from "@/modules/bitacora/factories/bitacora.factory"
import { EnviarLeadNovalyUseCase } from "@/modules/novaly/application/use-cases/enviar-lead-novaly.use-case"
import { NovalyHttpClient } from "@/modules/novaly/infrastructure/http/novaly.http-client"

/**
 * Composition root del módulo Novaly.
 *
 * Conecta:
 * - `NovalyHttpClient` → adaptador de salida HTTP (INovalyClient)
 * - `createBitacoraLogger()` → logger de auditoría (IBitacoraLogPort)
 */
export function novalyFactory() {
  return {
    enviarLead: new EnviarLeadNovalyUseCase(
      new NovalyHttpClient(),
      createBitacoraLogger()
    ),
  }
}
